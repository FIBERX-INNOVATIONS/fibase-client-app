import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { MemberRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import { MemberActivationLinkPayload } from "@/types/form_data_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class MemberProfileSendActivationLinkViewActionHandler extends BaseDeleteViewActionHandler<
    MemberRecordInterface,
    DeleteViewPropsInterface<MemberRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            MemberRecordInterface,
            DeleteViewPropsInterface<MemberRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "member_profile_send_activation_link_view_action_handler");

        this.delete_record_method = this.sendActivationLink;

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    private sendActivationLink = async (
        record_id: string,
        reason_text?: string
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        const csrf_token = await this.fetchFormCSRFToken(CSRF_TOKEN_FOR.MEMBER_SETUP_LINK);

        if (!csrf_token) {
            return { status: "error", msg: "invalid_csrf_token" };
        }

        const payload: MemberActivationLinkPayload = {
            csrf_token,
            reason: reason_text?.trim() || null
        };

        const result = await MemberProfileAPIService.sendMemberActivationLink(record_id, payload);

        return {
            status: result?.status ?? "error",
            msg: result?.msg ?? "error_occurred",
            data: this.props.record,
            full_response: result?.full_response
        };
    };
}

export default MemberProfileSendActivationLinkViewActionHandler;
