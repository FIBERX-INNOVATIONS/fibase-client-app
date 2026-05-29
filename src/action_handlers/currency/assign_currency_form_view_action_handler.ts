import BaseController from "@ui/version_3/base_classes/base_controller";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    AppCurrencyActionFromDataInterface,
    AppCurrencyFormDataInterface,
    AppCurrencyToggleDefaultFormDataInterface,
    FieldValidator
} from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    AssignCurrencyFormViewPropsInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    AppCurrencyFormState
} from "@/ui_types/form_view_type";

import { AppCurrencyFieldsType } from "@/types/form_fields_type";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import CurrencyValidator from "@/validators/currency_validator";
import CurrencyAPIService from "@/api_services/currency_api_service";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

class AssignCurrencyFormViewActionHandler extends BaseFormActionHandler<
    AppCurrencyFormDataInterface,
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
            "assign_currency_form_view_action_handler",
            {} as AppCurrencyFormDataInterface
        );

        this.form_data = this.getFormDataValue();

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
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

    protected getFormDataValue(): AppCurrencyFormDataInterface {
        const currency_list = this.controller?.props?.currency_codes ?? [];
        const app_id =
            this.controller?.props?.app_id ?? this.controller.props?.app?.public_id ?? "";
        const action = this.controller?.props?.action ?? "assign";

        return {
            csrf_token: null,
            currency_list,
            app_id,
            action,
            ...(action === "set_default" ? { currency_code_or_id: currency_list[0] } : {})
        };
    }

    protected getValidators(): Partial<
        Record<keyof AppCurrencyFormDataInterface, FieldValidator<AppCurrencyFormDataInterface>>
    > {
        return {};
    }

    private handleAssignOrUnassignSubmit = async (
        form_data: AppCurrencyFormDataInterface
    ): Promise<ButtonActionMethodReturnInterface> => {
        const action_data: AppCurrencyActionFromDataInterface = {
            csrf_token: form_data.csrf_token,
            app_id: form_data.app_id,
            registered_app_id: form_data.registered_app_id,
            currency_list: this.normalizeCurrencyList(form_data),
            action: form_data.action as "assign" | "unassign"
        };

        const { v_state, v_msg, v_data } = CurrencyValidator.validateAppCurrencyInput(action_data);

        if (!v_state || !v_data) {
            this.showErrorAlert("error", v_msg, 4);
            return { status: false, msg: v_msg };
        }

        const result = await CurrencyAPIService.handleAppCurrencyAction(v_data);

        if (!result) {
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }

        const { status, msg } = result;

        if (status?.toLowerCase() === "logout") {
            this.controller.router.push("/logout");
            this.showErrorAlert("error", "session_expired");
            return { status: false, msg: "session_expired" };
        }

        if (status?.toLowerCase() !== "success") {
            this.showErrorAlert("error", msg);
            return { status: false, msg };
        }

        await this.controller.props.on_success?.({
            action: form_data.action,
            app_id: v_data.app_id,
            currency_codes: v_data.currency_list,
            record: this.controller.props.record,
            response: result
        });

        StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);

        return { status: true, msg };
    };

    private handleSetDefaultSubmit = async (
        form_data: AppCurrencyFormDataInterface
    ): Promise<ButtonActionMethodReturnInterface> => {
        const currency_code_or_id =
            form_data.currency_code_or_id ?? this.normalizeCurrencyList(form_data)[0];

        const default_form_data: AppCurrencyToggleDefaultFormDataInterface = {
            csrf_token: form_data.csrf_token ?? "",
            app_id: form_data.registered_app_id ?? form_data.app_id,
            currency_code_or_id: currency_code_or_id ?? ""
        };

        const { v_state, v_msg, v_data } =
            CurrencyValidator.validateSetAppDefaultCurrencyInput(default_form_data);

        if (!v_state || !v_data) {
            this.showErrorAlert("error", v_msg, 4);
            return { status: false, msg: v_msg };
        }

        const result = await CurrencyAPIService.toggleDefaultCurrency(v_data);

        if (!result) {
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }

        const { status, msg } = result;

        if (status?.toLowerCase() === "logout") {
            this.controller.router.push("/logout");
            this.showErrorAlert("error", "session_expired");
            return { status: false, msg: "session_expired" };
        }

        if (status?.toLowerCase() !== "success") {
            this.showErrorAlert("error", msg);
            return { status: false, msg };
        }

        await this.controller.props.on_success?.({
            action: form_data.action,
            app_id: v_data.app_id,
            currency_codes: [v_data.currency_code_or_id],
            record: this.controller.props.record,
            response: result
        });

        StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);

        return { status: true, msg };
    };

    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as AppCurrencyFormDataInterface;

            if (form_data.action === "set_default") {
                return await this.handleSetDefaultSubmit(form_data);
            }

            return await this.handleAssignOrUnassignSubmit(form_data);
        } catch (error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default AssignCurrencyFormViewActionHandler;
