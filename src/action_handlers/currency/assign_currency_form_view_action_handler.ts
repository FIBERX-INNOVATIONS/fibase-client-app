import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { AppCurrencyFieldsType } from "@/types/form_fields_type";

import { FILE_STORAGE_REFERENCE_TYPE } from "@/configs";

import {
    FieldValidator,
    AppCurrencyActionFormDataInterface,
    AppCurrencyFormDataInterface
} from "@/types/form_data_type";

import {
    ButtonActionMethodReturnInterface,
    ButtonUIPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import {
    AssignCurrencyFormViewPropsInterface,
    AppCurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import CurrencyValidator from "@/validators/currency_validator";

import CurrencyAPIService from "@/api_services/currency_api_service";

import FileStorageAPIService from "@/api_services/file_storage_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

// import {
//     AppCurrencyActionFormDataInterface,
//     AppCurrencyFormDataInterface,
//     AppCurrencyToggleDefaultFormDataInterface,
//     FieldValidator
// } from "@/types/form_data_type";

class AssignCurrencyFormViewActionHandler extends BaseFormActionHandler<
    AppCurrencyActionFormDataInterface,
    AppCurrencyFieldsType,
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
        super(
            controller,
            "currency_form_view_action_handler",
            AssignCurrencyFormViewActionHandler.getFormDataValue(controller.props)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record
    private static getFormDataValue(
        controller_props?: AssignCurrencyFormViewPropsInterface
    ): AppCurrencyFormDataInterface {
        const currency_list = controller_props?.currency_codes ?? [];
        const app_id = controller_props?.app_id ?? controller_props?.app?.public_id ?? "";
        const action = controller_props?.action ?? "assign";

        return {
            csrf_token: null,
            currency_list,
            app_id,
            action
        };
    }

    private normalizeCurrencyList = (
        form_data: AppCurrencyFormDataInterface
    ): (string | number)[] => {
        if (form_data.currency_code_or_id) {
            return [form_data.currency_code_or_id];
        }

        if (Array.isArray(form_data.currency_list)) {
            return form_data.currency_list;
        }

        return [];
    };

    // Method to get field validators
    protected getValidators(): Partial<
        Record<keyof AppCurrencyFormDataInterface, FieldValidator<AppCurrencyFormDataInterface>>
    > {
        return {
            app_id: CurrencyValidator.validateAppIdInput,

            currency_list: CurrencyValidator.validateCurrencyListInput
        };
    }

    // Method to get required fields for submit
    protected getSubmitRequiredFields(): (keyof AppCurrencyFormDataInterface & string)[] {
        return ["app_id", "currency_list"];
    }

    // Method to handle form submit button click
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as AppCurrencyFormDataInterface;

            const { v_state, v_msg, v_data } =
                CurrencyValidator.validateAppCurrencyInput(form_data);

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
            const { action, currency_list: currency_codes, app_id } = v_data;

            if (status !== "success" || !data) {
                this.showErrorAlert("error", msg);
                return { status: false, msg: v_msg };
            }

            await this.props.on_success?.({ action, currency_codes, app_id });
            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);

            return { status: true, msg: "login_successful" };
        } catch (error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default AssignCurrencyFormViewActionHandler;
