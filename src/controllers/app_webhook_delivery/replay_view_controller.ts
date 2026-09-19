import type { AppWebhookDeliveryRecordInterface } from "@/types/app_webhook_delivery_type";
import type { AppWebhookDeliveryReplayPropsInterface } from "@/ui_types/app_webhook_delivery_view_type";
import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";
import AppWebhookDeliveryReplayViewActionHandler from "@/action_handlers/app_webhook_delivery/replay_view_action_handler";

class AppWebhookDeliveryReplayViewController extends BaseDeleteViewController<AppWebhookDeliveryRecordInterface> {
    // Method to reuse the application's decision prompt lifecycle for replay confirmation.
    constructor(props: AppWebhookDeliveryReplayPropsInterface) {
        super(props, "app_webhook_delivery_replay_view");
        this.setDeleteActionHandler(new AppWebhookDeliveryReplayViewActionHandler(this));
    }
}

export default AppWebhookDeliveryReplayViewController;
