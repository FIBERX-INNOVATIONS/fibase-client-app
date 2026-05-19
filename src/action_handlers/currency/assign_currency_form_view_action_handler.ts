import BaseController from "@ui/version_3/base_classes/base_controller";

import { GlobalEventTypes } from "@/types/global_events_type";

import { FieldValidator, AppCurrencyActionFromDataInterface } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    AssignCurrencyFormViewPropsInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    AppCurrencyFormState
} from "@/ui_types/form_view_type";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import CurrencyValidator from "@/validators/currency_validator";
import CurrencyAPIService from "@/api_services/currency_api_service";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

class AssignCurrencyFormViewActionHandler extends BaseFormActionHandler<
    AppCurrencyActionFromDataInterface,
    AssignCurrencyFormViewPropsInterface,
    AppCurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseController<
            AssignCurrencyFormViewPropsInterface,
            AppCurrencyFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "assign_currency_form_view_action_handler", {});

        this.form_data = this.getFormDataValue();

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    protected getFormDataValue(): AppCurrencyActionFromDataInterface {
        const currency_list = this.controller?.props?.currency_codes ?? [];
        const app_id = this.controller?.props?.app_id ?? this.controller.props?.app?.public_id ?? "";

        return {
            csrf_token: null,
            currency_list,
            app_id,
            action: "assign"
        };
    }

    protected getValidators(): Partial<
        Record<keyof AppCurrencyActionFromDataInterface, FieldValidator<AppCurrencyActionFromDataInterface>>
    > {
        return {};
    }

    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as AppCurrencyActionFromDataInterface;
            const { v_state, v_msg, v_data } = CurrencyValidator.validateAppCurrencyInput(form_data);

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const result = await CurrencyAPIService.handleAppCurrencyAction(v_data);

            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data) {
                this.showErrorAlert("error", msg);
                return { status: false, msg: v_msg };
            }

            const app_currencies_url = `/currencies?app_id=${v_data.app_id}&unassigned_to_app=false`;

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, app_currencies_url, true);

            return { status: true, msg: "login_successful" };
        } catch (error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default AssignCurrencyFormViewActionHandler;
