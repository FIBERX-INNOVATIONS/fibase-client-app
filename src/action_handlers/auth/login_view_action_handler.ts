import BaseController from "@ui/version_3/base_classes/base_controller";

import { GlobalEventTypes } from "@/types/global_events_type";

import { FieldValidator, LoginFormDataInterface } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface
} from "@/ui_types/login_view_type";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import LoginValidator from "@/validators/login_validator";
import AuthAPIService from "@/api_services/auth_api_service";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";


class LoginViewActionHandler extends BaseFormActionHandler<
    LoginFormDataInterface,
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface,
    GlobalEventTypes
>{
    
    constructor(
        controller: BaseController<
            LoginViewPropsInterface,
            LoginViewStateDataInterface,
            LoginViewComputedDataInterface,
            LoginViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        const form_data = { csrf_token: null, username: null, password: null };

        super(controller, "login_view_action_handler", form_data);

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;

    }


    protected getValidators(): Partial<Record<keyof LoginFormDataInterface, FieldValidator<LoginFormDataInterface>>> {
        return {
            username: LoginValidator.validateUsernameField,

            password: LoginValidator.validatePasswordField
        }
    }

    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> =>  {
        this.hideErrorAlert();

        try {
            const form_data             = (this.form_data) as LoginFormDataInterface;
            const { v_state, v_msg }    = LoginValidator.validateLoginInput(form_data);

            if(!v_state) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const { status, msg, data } = await AuthAPIService.logIn(form_data);

            if(status !== "success" || !data) {
                this.showErrorAlert("error", msg, 5);
                return { status: false, msg: v_msg };
            }

            StatusAlertTriggerUtil.triggerAlert(status, msg, 4, "/two-factor-login");

            return { status: true, msg: "login_successful" };
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred" );
            return { status: false, msg: "error_occurred" };
        } 
    }

}

export default LoginViewActionHandler;