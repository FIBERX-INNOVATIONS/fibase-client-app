import BaseController from "@ui/version_3/base_classes/base_controller";

import { FieldValidator, LoginFormDataInterface } from "@/types/form_data_type";
import {
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface
} from "@/ui_types/login_view_type";

import BaseFormActionHandler from "./base_form_action_hanler";
import LoginValidator from "@/validators/login_validator";


class LoginViewActionHandler extends BaseFormActionHandler<
    LoginFormDataInterface,
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
        const form_data = { csrf_token: null, username: null, password: null };

        super(controller, "login_view_action_handler", form_data);

        this.validators = this.getValidators();

    }


    protected getValidators(): Partial<Record<keyof LoginFormDataInterface, FieldValidator<LoginFormDataInterface>>> {
        return {
            username: LoginValidator.validateUsernameField,

            password: LoginValidator.validatePasswordField
        }
    }

}

export default LoginViewActionHandler;