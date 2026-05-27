import { TwoFactorLoginFieldsType } from "@/types/form_fields_type";

import { GlobalEventTypes } from "@/types/global_events_type";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import { FieldValidator, TwoFactorFormDataInterface } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

import {
    FormViewComputedDataInterface,
    FormViewPropsWithClassStyles,
    TwoFactorLoginViewStateDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import TwoFactorLoginValidator from "@/validators/two_factor_login_validator";

import AuthAPIService from "@/api_services/auth_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

class TwoFactorLoginViewActionHandler extends BaseFormActionHandler<
    TwoFactorFormDataInterface,
    TwoFactorLoginFieldsType,
    FormViewPropsWithClassStyles<AuthsViewClassStylesInterface>,
    TwoFactorLoginViewStateDataInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseController<
            FormViewPropsWithClassStyles<AuthsViewClassStylesInterface>,
            TwoFactorLoginViewStateDataInterface,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        const form_data = { csrf_token: null, otp_code: null };

        super(controller, "two_factor_login_view_action_handler", form_data);

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    protected getValidators(): Partial<
        Record<keyof TwoFactorFormDataInterface, FieldValidator<TwoFactorFormDataInterface>>
    > {
        return {
            otp_code: TwoFactorLoginValidator.validateOtpCodeField
        };
    }

    protected getSubmitRequiredFields(): (keyof TwoFactorFormDataInterface & string)[] {
        return ["otp_code"];
    }

    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as TwoFactorFormDataInterface;
            form_data.otp_code = Array.isArray(form_data.otp_code)
                ? form_data.otp_code?.join("")
                : form_data.otp_code;
            const { v_state, v_msg } =
                TwoFactorLoginValidator.validateTwoFactorLoginInput(form_data);

            if (!v_state) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const { status, msg, data } = await AuthAPIService.twoFactorLogin(form_data);

            if (status === "logout") {
                await this.controller.router.push("/login");
                return { status: false, msg };
            } else if (status !== "success" || !data) {
                this.showErrorAlert("error", msg, 5);
                return { status: false, msg };
            }

            StatusAlertTriggerUtil.triggerAlert(status, msg, 4, "/dashboard");

            return { status: true, msg: "login_successful" };
        } catch (error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default TwoFactorLoginViewActionHandler;
