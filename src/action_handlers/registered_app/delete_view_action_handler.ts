import { GlobalEventTypes } from "@/types/global_events_type";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class RegisteredAppDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    RegisteredAppRecordInterface,
    DeleteViewPropsInterface<RegisteredAppRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            RegisteredAppRecordInterface,
            DeleteViewPropsInterface<RegisteredAppRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "registered_app_delete_view_action_handler",
            RegisteredAppAPIService.deleteRegisteredApp
        );

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    protected getRecordId(record: RegisteredAppRecordInterface): string | null {
        return record.public_id || this.props.record_id || null;
    }
}

export default RegisteredAppDeleteViewActionHandler;
