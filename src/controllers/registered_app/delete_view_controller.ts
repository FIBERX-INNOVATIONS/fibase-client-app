import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import RegisteredAppDeleteViewActionHandler from "@/action_handlers/registered_app/delete_view_action_handler";

class RegisteredAppDeleteViewController extends BaseDeleteViewController<
    RegisteredAppRecordInterface,
    DeleteViewPropsInterface<RegisteredAppRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: RegisteredAppDeleteViewActionHandler;

    constructor(props: DeleteViewPropsInterface<RegisteredAppRecordInterface>) {
        super(props, "registered_app_delete_view");

        this.action_handler = new RegisteredAppDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default RegisteredAppDeleteViewController;
