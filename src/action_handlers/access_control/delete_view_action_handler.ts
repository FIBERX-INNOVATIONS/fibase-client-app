import { GlobalEventTypes } from "@/types/global_events_type";

import { RoleRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import AccessControlAPIService from "@/api_services/access_control_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class AccessControlDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    RoleRecordInterface,
    DeleteViewPropsInterface<RoleRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            RoleRecordInterface,
            DeleteViewPropsInterface<RoleRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "access_control_delete_view_action_handler", AccessControlAPIService.deleteRole);

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    protected getRecordId(record: RoleRecordInterface): string | null {
        return record.id?.toString() || this.props.record_id || null;
    }
}

export default AccessControlDeleteViewActionHandler;
