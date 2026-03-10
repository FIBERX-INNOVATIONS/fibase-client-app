import BaseController from "@ui/version_3/base_classes/base_controller";

import {
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface
} from "@/ui_types/login_view_type";

import BaseFormActionHandler from "./base_form_action_hanler";


class LoginViewActionHandler extends BaseFormActionHandler<
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface
>{

    constructor(
        controller: BaseController<
            LoginViewPropsInterface,
            LoginViewStateDataInterface,
            LoginViewComputedDataInterface,
            LoginViewComponentsInterface
        >
    ) {

        super(controller, "login_view_action_handler");

    }

}

export default LoginViewActionHandler;