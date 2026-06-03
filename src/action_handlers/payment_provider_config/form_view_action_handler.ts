import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import {
    PaymentProviderConfigCredentialsInterface,
    PaymentProviderConfigRecordInterface,
    PaymentProviderConfigSettingsInterface
} from "@/types/api_service_type";

import { PaymentProviderConfigFieldsType } from "@/types/form_fields_type";

import {
    CreatePaymentProviderConfigPayloadInterface,
    FieldValidator,
    PaymentProviderConfigFormDataInterface,
    UpdatePaymentProviderConfigPayloadInterface
} from "@/types/form_data_type";

import {
    ButtonActionMethodReturnInterface,
    ButtonUIPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    PaymentProviderConfigFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentProviderConfigValidator from "@/validators/payment_provider_config_validator";

import PaymentProviderConfigAPIService from "@/api_services/payment_provider_config_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

class PaymentProviderConfigFormViewActionHandler extends BaseFormActionHandler<
    PaymentProviderConfigFormDataInterface,
    PaymentProviderConfigFieldsType,
    FormViewPropsInterface<PaymentProviderConfigRecordInterface>,
    PaymentProviderConfigFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private static readonly credential_keys = [
        "api_key",
        "secret_key",
        "public_key",
        "private_key",
        "client_id",
        "client_secret",
        "merchant_id",
        "account_id",
        "username",
        "password",
        "webhook_hash",
        "webhook_secret",
        "signing_secret"
    ] as const;

    private static readonly setting_keys = [
        "webhook_url",
        "callback_url",
        "redirect_url",
        "success_url",
        "failure_url",
        "settlement_currency",
        "default_currency",
        "payout_schedule",
        "capture_mode",
        "timeout_ms"
    ] as const;

    constructor(
        controller: BaseController<
            FormViewPropsInterface<PaymentProviderConfigRecordInterface>,
            PaymentProviderConfigFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_provider_config_form_view_action_handler",
            PaymentProviderConfigFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record.
    private static getFormDataValue(
        record?: PaymentProviderConfigRecordInterface
    ): PaymentProviderConfigFormDataInterface {
        return {
            csrf_token: null,
            provider_id: record?.provider_id ?? "",
            environment: record?.environment ?? "test",
            api_key: "",
            secret_key: "",
            public_key: "",
            private_key: "",
            client_id: "",
            client_secret: "",
            merchant_id: "",
            account_id: "",
            username: "",
            password: "",
            webhook_hash: "",
            webhook_secret: "",
            signing_secret: "",
            webhook_url: record?.settings?.webhook_url ?? "",
            callback_url: record?.settings?.callback_url ?? "",
            redirect_url: record?.settings?.redirect_url ?? "",
            success_url: record?.settings?.success_url ?? "",
            failure_url: record?.settings?.failure_url ?? "",
            settlement_currency: record?.settings?.settlement_currency ?? "",
            default_currency: record?.settings?.default_currency ?? "",
            payout_schedule: record?.settings?.payout_schedule ?? "",
            capture_mode: record?.settings?.capture_mode ?? "",
            timeout_ms: record?.settings?.timeout_ms ?? ""
        };
    }

    // Method to get field validators.
    protected getValidators(): Partial<
        Record<
            keyof PaymentProviderConfigFormDataInterface,
            FieldValidator<PaymentProviderConfigFormDataInterface>
        >
    > {
        const credential_validator = PaymentProviderConfigValidator.validateCredentialValue;

        return {
            provider_id: PaymentProviderConfigValidator.validateProviderId,
            environment: PaymentProviderConfigValidator.validateEnvironment,
            api_key: credential_validator,
            secret_key: credential_validator,
            public_key: credential_validator,
            private_key: credential_validator,
            client_id: credential_validator,
            client_secret: credential_validator,
            merchant_id: credential_validator,
            account_id: credential_validator,
            username: credential_validator,
            password: credential_validator,
            webhook_hash: credential_validator,
            webhook_secret: credential_validator,
            signing_secret: credential_validator,
            webhook_url: PaymentProviderConfigValidator.validateURLSetting,
            callback_url: PaymentProviderConfigValidator.validateURLSetting,
            redirect_url: PaymentProviderConfigValidator.validateURLSetting,
            success_url: PaymentProviderConfigValidator.validateURLSetting,
            failure_url: PaymentProviderConfigValidator.validateURLSetting,
            settlement_currency: PaymentProviderConfigValidator.validateSettingValue,
            default_currency: PaymentProviderConfigValidator.validateSettingValue,
            payout_schedule: PaymentProviderConfigValidator.validateSettingValue,
            capture_mode: PaymentProviderConfigValidator.validateSettingValue,
            timeout_ms: PaymentProviderConfigValidator.validateTimeoutMs
        };
    }

    // Method to get required fields for submit.
    protected getSubmitRequiredFields(): (keyof PaymentProviderConfigFormDataInterface & string)[] {
        return ["provider_id", "environment"];
    }

    // Method to build credentials payload from flat form fields.
    private buildCredentialsPayload(
        form_data: PaymentProviderConfigFormDataInterface
    ): PaymentProviderConfigCredentialsInterface | undefined {
        const credentials =
            PaymentProviderConfigFormViewActionHandler.credential_keys.reduce<PaymentProviderConfigCredentialsInterface>(
                (result, key) => {
                    const value = form_data[key]?.trim();

                    if (value) {
                        result[key] = value;
                    }

                    return result;
                },
                {}
            );

        return Object.keys(credentials).length ? credentials : undefined;
    }

    // Method to build settings payload from flat form fields.
    private buildSettingsPayload(
        form_data: PaymentProviderConfigFormDataInterface
    ): PaymentProviderConfigSettingsInterface | undefined {
        const original_settings = this.controller.props.record?.settings ?? {};
        const settings =
            PaymentProviderConfigFormViewActionHandler.setting_keys.reduce<PaymentProviderConfigSettingsInterface>(
                (result, key) => {
                    const raw_value = form_data[key];
                    const value =
                        raw_value === null || raw_value === undefined
                            ? ""
                            : String(raw_value).trim();

                    if (value || Object.prototype.hasOwnProperty.call(original_settings, key)) {
                        result[key] = value || null;
                    }

                    return result;
                },
                {}
            );

        return Object.keys(settings).length ? settings : undefined;
    }

    // Method to build create/update API payload from form data.
    private buildAPIPayload(
        form_data: PaymentProviderConfigFormDataInterface
    ): CreatePaymentProviderConfigPayloadInterface | UpdatePaymentProviderConfigPayloadInterface {
        const credentials = this.buildCredentialsPayload(form_data);
        const settings = this.buildSettingsPayload(form_data);

        return {
            csrf_token: form_data.csrf_token ?? "",
            provider_id: form_data.provider_id,
            environment: form_data.environment,
            ...(credentials ? { credentials } : {}),
            ...(settings ? { settings } : {})
        };
    }

    // Method to handle form submit button click.
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as PaymentProviderConfigFormDataInterface;
            const record_id = this.controller.props.record?.id;
            const payload = this.buildAPIPayload(form_data);
            const validation_result = record_id
                ? PaymentProviderConfigValidator.validateUpdatePaymentProviderConfigInput(payload)
                : PaymentProviderConfigValidator.validateCreatePaymentProviderConfigInput(
                      payload as CreatePaymentProviderConfigPayloadInterface
                  );
            const { v_state, v_msg, v_data } = validation_result;

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const result = record_id
                ? await PaymentProviderConfigAPIService.updatePaymentProviderConfig(
                      record_id,
                      v_data
                  )
                : await PaymentProviderConfigAPIService.createPaymentProviderConfig(
                      v_data as CreatePaymentProviderConfigPayloadInterface
                  );

            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.provider_id) {
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const record_payload: NewRecordCreated<PaymentProviderConfigRecordInterface> = {
                record: data,
                re_fetch: true
            };

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit payment provider config form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default PaymentProviderConfigFormViewActionHandler;
