import BaseController from "@ui/version_3/base_classes/base_controller";

import { GlobalEventTypes } from "@/types/global_events_type";

import { FieldValidator, RegisteredAppFromDataInterface } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    FormViewStateDataInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    RegisteredAppFormState
} from "@/ui_types/form_view_type";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import RegisteredAppValidator from "@/validators/registered_app_validator";
import RegisteredAppAPIService from "@/api_services/registered_app_api_service";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";


class FormViewActionHandler extends BaseFormActionHandler<
    RegisteredAppFromDataInterface,
    FormViewPropsInterface,
    RegisteredAppFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
>{
    
    constructor(
        controller: BaseController<
            FormViewPropsInterface,
            RegisteredAppFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        const form_data = { csrf_token: null, username: null, password: null };

        super(controller, "registered_app_form_view_action_handler", form_data);

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;

    }


    protected getValidators(): Partial<Record<keyof RegisteredAppFromDataInterface, FieldValidator<RegisteredAppFromDataInterface>>> {
        return {
            name: RegisteredAppValidator.validateNameField,

            prefix: RegisteredAppValidator.validatePrefixField,

            description: RegisteredAppValidator.validateDescriptionField,

            base_url: RegisteredAppValidator.validateBaseUrlField,

            logo_url: RegisteredAppValidator.validateLogoUrlField,

            social_links: RegisteredAppValidator.validateSocialLinks,

            urls: RegisteredAppValidator.validateUrls
        }
    }

    public handleOnBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> =>  {
        this.hideErrorAlert();

        try {
            const form_data             = (this.form_data) as RegisteredAppFromDataInterface;
            const { v_state, v_msg }    = RegisteredAppValidator.validateRegisteredAppInput(form_data);

            if(!v_state) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const { status, msg, data } = await RegisteredAppAPIService.createRegisteredApp(form_data);

            if(status !== "success" || !data) {
                this.showErrorAlert("error", msg, 5);
                return { status: false, msg: v_msg };
            }

            StatusAlertTriggerUtil.triggerAlert(status, msg, 4);

            return { status: true, msg: "login_successful" };
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred" );
            return { status: false, msg: "error_occurred" };
        } 
    }

}

export default FormViewActionHandler;