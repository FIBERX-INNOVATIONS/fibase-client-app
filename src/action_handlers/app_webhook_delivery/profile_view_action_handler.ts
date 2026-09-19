import type { AppWebhookDeliveryRecordInterface } from "@/types/app_webhook_delivery_type";
import type { ProfileViewStateDataInterface } from "@/ui_types/profile_view_type";
import type {
    AppWebhookDeliveryProfilePropsInterface,
    AppWebhookDeliveryProfileComputedInterface
} from "@/ui_types/app_webhook_delivery_view_type";
import type AppWebhookDeliveryProfileViewController from "@/controllers/app_webhook_delivery/profile_view_controller";
import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";
import AppWebhookDeliveryAPIService from "@/api_services/app_webhook_delivery_api_service";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";
import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";

class AppWebhookDeliveryProfileViewActionHandler extends BaseProfileViewActionHandler<
    AppWebhookDeliveryRecordInterface,
    AppWebhookDeliveryProfilePropsInterface,
    ProfileViewStateDataInterface<AppWebhookDeliveryRecordInterface>,
    AppWebhookDeliveryProfileComputedInterface
> {
    // Method to load delivery details only while the member has record-view permission.
    constructor(controller: AppWebhookDeliveryProfileViewController) {
        super(controller, "app_webhook_delivery_profile_view_action_handler", async (record_id) => {
            if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.VIEW)) {
                StatusAlertTriggerUtil.triggerAlert("error", "permission_denied");
                return { status: "error", msg: "permission_denied" };
            }
            const response = await AppWebhookDeliveryAPIService.getDelivery(record_id);
            if (response.status === "error") {
                StatusAlertTriggerUtil.triggerAlert("error", response.msg ?? "error_occurred");
            }
            return response;
        });
    }
}

export default AppWebhookDeliveryProfileViewActionHandler;
