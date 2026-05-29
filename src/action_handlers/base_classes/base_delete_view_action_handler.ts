import { GlobalEventTypes } from "@/types/global_events_type";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import {
    DeleteRecordMethod,
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

class BaseDeleteViewActionHandler<
    T extends object = Record<string, unknown>,
    Props extends DeleteViewPropsInterface<T> = DeleteViewPropsInterface<T>,
    State extends DeleteViewStateDataInterface = DeleteViewStateDataInterface,
    Computed extends DeleteViewComputedDataInterface = DeleteViewComputedDataInterface,
    Components extends DeleteViewComponentsInterface = DeleteViewComponentsInterface,
    Events extends GlobalEventTypes = GlobalEventTypes
> extends BaseActionHandler<Props, State, Computed, Components, Events> {
    public readonly name: string;

    protected content_manager = ContentManagerUtil.getInstance();

    protected delete_record_method?: DeleteRecordMethod<T>;

    constructor(
        controller: BaseDeleteViewController<T, Props, State, Computed, Components, Events>,
        name: string = "base_delete_view_action_handler",
        delete_record_method?: DeleteRecordMethod<T>
    ) {
        super(controller, name);

        this.name = name;

        this.delete_record_method = delete_record_method;

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    // Method to get content messages based on the content keys, which are used to fetch the appropriate text content for the UI components in the delete view.
    protected getContentMessage = (message_key: string): string => {
        return this.content_manager.getAPIResponseValue(message_key);
    };

    // Method to get record id from the record object, which is used to identify the specific record that is being deleted. This method can be overridden in subclasses if the record id is stored in a different way.
    protected getRecordId(record: T): string | null {
        return this.props.record_id?.toString() || null;
    }

    // Method to handle the cancel action for the delete view, which emits an event to close the modal when the user cancels the delete action.
    public handleCancelDelete = async (): Promise<void> => {
        this.controller.event_bus?.emit("close_modal", {});
    };

    // Method to handle the confirm delete action for the delete view, which calls the delete record method and handles the response to show appropriate success or error messages based on the result of the delete operation. It also calls the on_delete_success callback if the delete operation is successful.
    public handleConfirmDelete = async (): Promise<void> => {
        try {
            const record = this.props.record;
            const record_id = this.getRecordId(record);

            if (!record_id) {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error",
                    "record_not_found",
                    4,
                    undefined,
                    true
                );
            }

            if (!this.delete_record_method) {
                throw new Error("delete_record_method not defined");
            }

            const result = await this.delete_record_method(record_id);
            const msg = result?.msg ?? "error_occurred";
            const status = result?.status?.toLowerCase();

            if (!result || status === "error") {
                return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
            }

            if (status === "logout") {
                this.controller.router.push("/logout");
                return StatusAlertTriggerUtil.triggerAlert(
                    "error",
                    "session_expired",
                    4,
                    undefined,
                    true
                );
            }

            if (status === "success") {
                await this.props.on_delete_success?.(record, result);
                return StatusAlertTriggerUtil.triggerAlert(result.status, msg, 4, undefined, true);
            }

            return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
        } catch (error: unknown) {
            this.logError("handleConfirmDelete", error);
            return StatusAlertTriggerUtil.triggerAlert(
                "error",
                "error_occurred",
                4,
                undefined,
                true
            );
        }
    };
}

export default BaseDeleteViewActionHandler;
