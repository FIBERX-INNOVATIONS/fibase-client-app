import { GlobalEventTypes } from "@/types/global_events_type";
import { ToastStatusType } from "@ui/version_3/ui_types/toaster_ui_type";
import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import { EventBusType } from "@ui/version_3/utils/event_bus_util";
import { EventBus } from "@/utils/global_event_bus_util";

class StatusAlertTriggerUtil {
    public static event_bus: EventBusType<GlobalEventTypes> | null = EventBus;

    public static content_manager: ContentManagerUtil = ContentManagerUtil.getInstance();

    public static triggerAlert = (
        status: string,
        message_key: string,
        duration_in_sec: number = 4,
        redirect_url?: string,
        close_modal: boolean = true
    ): void => {
        if (!StatusAlertTriggerUtil.event_bus) {
            return;
        }

        const msg = StatusAlertTriggerUtil.content_manager?.getAPIResponseValue(message_key);
        const status_alert_options = {
            duration: duration_in_sec * 1000,
            redirect_url,
            close_modal
        };
        const status_alert_payload = { status, msg, options: status_alert_options };

        StatusAlertTriggerUtil.event_bus.emit("alert_status_updated", status_alert_payload);
        return;
    };
}

export default StatusAlertTriggerUtil;
