import { AppWebhookDeliveryStatusEnum } from "@/configs/app_webhook_delivery_config";

import type { APIResponseInterface } from "@ui/version_3/types/util_type";
import type { AppWebhookDeliveryRecordInterface } from "@/types/app_webhook_delivery_type";
import type AppWebhookDeliveryReplayViewController from "@/controllers/app_webhook_delivery/replay_view_controller";
import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";
import AppWebhookDeliveryAPIService from "@/api_services/app_webhook_delivery_api_service";
import AuthAPIService from "@/api_services/auth_api_service";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import { CSRF_TOKEN_FOR } from "@/configs";
import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";

class AppWebhookDeliveryReplayViewActionHandler extends BaseDeleteViewActionHandler<AppWebhookDeliveryRecordInterface> {
    // Method to bind confirmed replays to the existing decision-response lifecycle.
    constructor(controller: AppWebhookDeliveryReplayViewController) {
        super(controller, "app_webhook_delivery_replay_view_action_handler");
        this.delete_record_method = this.replayDelivery;
    }

    // Method to recheck replay eligibility and obtain a fresh one-time CSRF token before submission.
    private replayDelivery = async (record_id: string): Promise<APIResponseInterface<AppWebhookDeliveryRecordInterface>> => {
        if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.REPLAY)) {
            return { status: "error", msg: "permission_denied" };
        }
        if (
            this.props.record.status !== AppWebhookDeliveryStatusEnum.FAILED &&
            this.props.record.status !== AppWebhookDeliveryStatusEnum.DEAD_LETTER
        ) {
            return { status: "error", msg: "app_webhook_delivery_cannot_be_replayed" };
        }

        // Preserve logout responses from token acquisition for the shared response handler.
        const token_response = await AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.APP_WEBHOOK_DELIVERY);
        if (token_response.status !== "success" || !token_response.data?.token) {
            return {
                status: token_response.status === "logout" ? "logout" : "error",
                msg: token_response.msg ?? "invalid_csrf_token"
            };
        }
        return await AppWebhookDeliveryAPIService.replayDelivery(record_id, { csrf_token: token_response.data.token });
    };
}

export default AppWebhookDeliveryReplayViewActionHandler;
