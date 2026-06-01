import { CSRF_TOKEN_FOR } from "@/configs";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    AppCurrencyActionFormDataInterface,
    AppCurrencyToggleDefaultFormDataInterface
} from "@/types/form_data_type";

import {
    AppCurrencyDecisionPromptRecordInterface,
    AppCurrencyDecisionViewPropsInterface,
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import AuthAPIService from "@/api_services/auth_api_service";

import CurrencyAPIService from "@/api_services/currency_api_service";

import CurrencyValidator from "@/validators/currency_validator";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class AppCurrencyDecisionViewActionHandler extends BaseDeleteViewActionHandler<
    AppCurrencyDecisionPromptRecordInterface,
    AppCurrencyDecisionViewPropsInterface,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            AppCurrencyDecisionPromptRecordInterface,
            AppCurrencyDecisionViewPropsInterface,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "app_currency_decision_view_action_handler");

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    // Method to get CSRf Token
    private getCsrfToken = async (): Promise<string> => {
        const csrf_token_result = await AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.APP_CURRECY);

        return csrf_token_result.data?.token ?? "";
    };

    // Method to handle un assign action
    private handleUnAssignAction = async (): Promise<void> => {
        const csrf_token = await this.getCsrfToken();
        const form_data: AppCurrencyActionFormDataInterface = {
            csrf_token,
            app_id: this.props.app_id,
            currency_list: this.props.currency_codes,
            action: "unassign"
        };

        const { v_state, v_msg, v_data } = CurrencyValidator.validateAppCurrencyInput(form_data);

        if (!v_state || !v_data) {
            return StatusAlertTriggerUtil.triggerAlert("error", v_msg, 4, undefined, true);
        }

        const result = await CurrencyAPIService.handleAppCurrencyAction(v_data);
        const msg = result?.msg ?? "error_occurred";
        const status = result?.status?.toLowerCase();

        if (!result || status === "error") {
            return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
        }

        if (status === "logout") {
            this.controller.router.push("/logout");
            return StatusAlertTriggerUtil.triggerAlert(
                "error",
                "session_expired",
                4,
                undefined,
                true
            );
        }

        if (status === "success") {
            await this.props.on_success?.({
                action: "unassign",
                app_id: v_data.app_id,
                currency_codes: v_data.currency_list,
                record: this.props.currency_record,
                response: result
            });

            return StatusAlertTriggerUtil.triggerAlert(result.status, msg, 4, undefined, true);
        }

        return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
    };

    // Method to handle set as default action
    private handleSetDefaultAction = async (): Promise<void> => {
        const csrf_token = await this.getCsrfToken();
        const currency_code_or_id =
            this.props.currency_codes[0] ?? this.props.currency_record?.code ?? "";
        const form_data: AppCurrencyToggleDefaultFormDataInterface = {
            csrf_token,
            app_id: this.props.app_id,
            currency_code_or_id
        };

        const { v_state, v_msg, v_data } =
            CurrencyValidator.validateSetAppDefaultCurrencyInput(form_data);

        if (!v_state || !v_data) {
            return StatusAlertTriggerUtil.triggerAlert("error", v_msg, 4, undefined, true);
        }

        const result = await CurrencyAPIService.toggleDefaultCurrency(v_data);
        const msg = result?.msg ?? "error_occurred";
        const status = result?.status?.toLowerCase();

        if (!result || status === "error") {
            return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
        }

        if (status === "logout") {
            this.controller.router.push("/logout");
            return StatusAlertTriggerUtil.triggerAlert(
                "error",
                "session_expired",
                4,
                undefined,
                true
            );
        }

        if (status === "success") {
            await this.props.on_success?.({
                action: "set_default",
                app_id: v_data.app_id,
                currency_codes: [v_data.currency_code_or_id],
                record: this.props.currency_record,
                response: result
            });

            return StatusAlertTriggerUtil.triggerAlert(result.status, msg, 4, undefined, true);
        }

        return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
    };

    // Method to handle the confirm delete action for the delete view, which calls the delete record method and handles the response to show appropriate success or error messages based on the result of the delete operation. It also calls the on_delete_success callback if the delete operation is successful.
    public override handleConfirmDelete = async (): Promise<void> => {
        try {
            if (this.props.action === "set_default") {
                return await this.handleSetDefaultAction();
            }

            return await this.handleUnAssignAction();
        } catch (error: unknown) {
            this.logError("handleConfirmDelete", error);
            return StatusAlertTriggerUtil.triggerAlert(
                "error",
                "error_occurred",
                4,
                undefined,
                true
            );
        }
    };
}

export default AppCurrencyDecisionViewActionHandler;
