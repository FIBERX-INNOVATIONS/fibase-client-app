import { RoleRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import AccessControlDeleteViewActionHandler from "@/action_handlers/access_control/delete_view_action_handler";

class AccessControlDeleteViewController extends BaseDeleteViewController<
    RoleRecordInterface,
    DeleteViewPropsInterface<RoleRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: AccessControlDeleteViewActionHandler;

    constructor(props: DeleteViewPropsInterface<RoleRecordInterface>) {
        super(props, "access_control_delete_view");

        this.action_handler = new AccessControlDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default AccessControlDeleteViewController;
