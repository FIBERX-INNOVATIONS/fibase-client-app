import { CSRF_TOKEN_FOR } from "@/configs/csrf_config";

import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";

import type { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import type { AppWebhookDeliveryTestFormDataInterface, FieldValidator } from "@/types/form_data_type";

import type { FormViewComputedDataInterface, FormViewComponentsInterface } from "@/ui_types/form_view_type";

import type {
    AppWebhookDeliveryTestFieldsType,
    AppWebhookDeliveryTestFormPropsInterface,
    AppWebhookDeliveryTestFormStateInterface
} from "@/ui_types/app_webhook_delivery_view_type";

import AuthAPIService from "@/api_services/auth_api_service";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import AppWebhookDeliveryValidator from "@/validators/app_webhook_delivery_validator";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

import AppWebhookDeliveryAPIService from "@/api_services/app_webhook_delivery_api_service";

import type AppWebhookDeliveryTestFormViewController from "@/controllers/app_webhook_delivery/test_form_view_controller";

class AppWebhookDeliveryTestFormViewActionHandler extends BaseFormActionHandler<
    AppWebhookDeliveryTestFormDataInterface,
    AppWebhookDeliveryTestFieldsType,
    AppWebhookDeliveryTestFormPropsInterface,
    AppWebhookDeliveryTestFormStateInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
> {
    private is_submitting = false;

    // Method to initialise the destination field and its validation using the shared form handler.
    constructor(controller: AppWebhookDeliveryTestFormViewController) {
        super(controller, "app_webhook_delivery_test_form_view_action_handler", { app_id: "", csrf_token: null });
        this.validators = this.getValidators();
    }

    // Method to require destination selection before enabling submission.
    protected getSubmitRequiredFields(): "app_id"[] {
        return ["app_id"];
    }

    // Method to bind the registered-app field validator.
    protected getValidators(): Partial<
        Record<keyof AppWebhookDeliveryTestFormDataInterface, FieldValidator<AppWebhookDeliveryTestFormDataInterface>>
    > {
        return { app_id: AppWebhookDeliveryValidator.validateAppId };
    }

    // Method to submit one authorized test event and refresh delivery history after acceptance.
    public handleOnFormSubmitBtnClick = async (): Promise<ButtonActionMethodReturnInterface> => {
        if (this.is_submitting) {
            return { status: false, msg: "" };
        }

        this.hideErrorAlert();

        if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.TEST)) {
            this.showErrorAlert("error", "permission_denied");
            return { status: false, msg: this.getContentMessage("permission_denied") };
        }

        const app_id = this.form_data.app_id?.trim() ?? "";
        const validation = AppWebhookDeliveryValidator.validateAppId(app_id);

        if (!validation.status) {
            this.showErrorAlert("error", "invalid_registered_app_id");
            return { status: false, msg: validation.msg };
        }

        this.is_submitting = true;

        try {
            // Request a fresh token for each attempt, including retries after a consumed token.
            const token_response = await AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.APP_WEBHOOK_DELIVERY);

            if (token_response.status === "logout") {
                await this.controller.router.push("/logout");
                return { status: false, msg: this.getContentMessage("session_expired") };
            }

            if (token_response.status !== "success" || !token_response.data?.token) {
                const message_key = token_response.msg ?? "invalid_csrf_token";
                this.showErrorAlert("error", message_key);
                return { status: false, msg: this.getContentMessage(message_key) };
            }

            const response = await AppWebhookDeliveryAPIService.testDelivery({
                app_id,
                csrf_token: token_response.data.token
            });

            if (response.status === "logout") {
                await this.controller.router.push("/logout");
                return { status: false, msg: this.getContentMessage("session_expired") };
            }

            if (response.status !== "success" || !response.data?.public_id) {
                const message_key = response.msg ?? "error_occurred";
                this.showErrorAlert("error", message_key);
                return { status: false, msg: this.getContentMessage(message_key) };
            }

            StatusAlertTriggerUtil.triggerAlert(
                "success",
                response.msg ?? "app_webhook_test_queued_successfully",
                5,
                undefined,
                true
            );

            this.controller.event_bus?.emit("on_new_record_created", { record: response.data, re_fetch: true });

            return {
                status: true,
                msg: this.getContentMessage(response.msg ?? "app_webhook_test_queued_successfully")
            };
        } catch (error: unknown) {
            this.showErrorAlert("error", "error_occurred");

            return { status: false, msg: this.getContentMessage("error_occurred") };
        } finally {
            this.is_submitting = false;
        }
    };
}

export default AppWebhookDeliveryTestFormViewActionHandler;
