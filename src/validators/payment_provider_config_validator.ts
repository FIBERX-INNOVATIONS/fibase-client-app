import {
    CreatePaymentProviderConfigPayloadInterface,
    UpdatePaymentProviderConfigPayloadInterface
} from "@/types/form_data_type";

import {
    PaymentProviderConfigCredentialsInterface,
    PaymentProviderConfigEnvironmentType,
    PaymentProviderConfigSettingsInterface
} from "@/types/api_service_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class PaymentProviderConfigValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    // Method to get localized API/content messages.
    protected static getContentMessage(message_key: string): string {
        return PaymentProviderConfigValidator.content_manager.getAPIResponseValue(message_key);
    }

    // Method to validate payment provider id input.
    public static validateProviderId = (
        value?: string | number | null
    ): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_id") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate payment provider config environment.
    public static validateEnvironment = (
        value?: PaymentProviderConfigEnvironmentType | null
    ): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (!["test", "live"].includes(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_environment")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider account reference.
    public static validateAccountReference = (
        value?: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && value.trim().length > 150) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_account_reference")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider credentials.
    public static validateCredentials = (
        credentials?: PaymentProviderConfigCredentialsInterface | null
    ): ActionMethodRetrunInterface => {
        if (!credentials) {
            return { status: true, msg: "" };
        }

        if (typeof credentials !== "object" || Array.isArray(credentials)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_credentials")
            };
        }

        const has_invalid_value = Object.values(credentials).some((value) => {
            return value !== null && value !== undefined && typeof value !== "string";
        });

        if (has_invalid_value) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_credentials")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider settings.
    public static validateSettings = (
        settings?: PaymentProviderConfigSettingsInterface | null
    ): ActionMethodRetrunInterface => {
        if (!settings) {
            return { status: true, msg: "" };
        }

        if (typeof settings !== "object" || Array.isArray(settings)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_settings")
            };
        }

        for (const [key, value] of Object.entries(settings)) {
            if (value !== null && value !== undefined && typeof value !== "string") {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_payment_provider_config_settings")
                };
            }

            if (key.endsWith("_url") && value && !InputValidatorUtil.isValidURL(value.trim())) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_payment_provider_config_url")
                };
            }
        }

        return { status: true, msg: "" };
    };

    // Method to clean provider credentials.
    private static sanitizeCredentials = (
        credentials?: PaymentProviderConfigCredentialsInterface | null
    ): PaymentProviderConfigCredentialsInterface | null => {
        if (!credentials) {
            return null;
        }

        const clean_credentials: PaymentProviderConfigCredentialsInterface = {};

        Object.entries(credentials).forEach(([key, value]) => {
            clean_credentials[key] = value?.trim() || null;
        });

        return clean_credentials;
    };

    // Method to clean provider settings.
    private static sanitizeSettings = (
        settings?: PaymentProviderConfigSettingsInterface | null
    ): PaymentProviderConfigSettingsInterface | null => {
        if (!settings) {
            return null;
        }

        const clean_settings: PaymentProviderConfigSettingsInterface = {};

        Object.entries(settings).forEach(([key, value]) => {
            clean_settings[key] = value?.trim() || null;
        });

        return clean_settings;
    };

    // Method to validate and clean create payment provider config input.
    public static validateCreatePaymentProviderConfigInput(
        form_data: CreatePaymentProviderConfigPayloadInterface
    ): ValidationResultInterface<CreatePaymentProviderConfigPayloadInterface> {
        const { csrf_token, provider_id, environment, account_reference, credentials, settings } =
            form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateProviderId(provider_id).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_id" };
        }
        if (!this.validateEnvironment(environment).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_environment" };
        }
        if (!this.validateAccountReference(account_reference).status) {
            return {
                v_state: false,
                v_msg: "invalid_payment_provider_config_account_reference"
            };
        }
        if (!this.validateCredentials(credentials).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_credentials" };
        }
        if (!this.validateSettings(settings).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_settings" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                provider_id,
                environment: environment ?? "test",
                account_reference: account_reference?.trim() || null,
                credentials: this.sanitizeCredentials(credentials),
                settings: this.sanitizeSettings(settings)
            }
        };
    }

    // Method to validate and clean update payment provider config input.
    public static validateUpdatePaymentProviderConfigInput(
        form_data: UpdatePaymentProviderConfigPayloadInterface
    ): ValidationResultInterface<UpdatePaymentProviderConfigPayloadInterface> {
        const { csrf_token, provider_id, environment, account_reference, credentials, settings } =
            form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (provider_id !== undefined && !this.validateProviderId(provider_id).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_id" };
        }
        if (!this.validateEnvironment(environment).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_environment" };
        }
        if (!this.validateAccountReference(account_reference).status) {
            return {
                v_state: false,
                v_msg: "invalid_payment_provider_config_account_reference"
            };
        }
        if (!this.validateCredentials(credentials).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_credentials" };
        }
        if (!this.validateSettings(settings).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_settings" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                ...(provider_id !== undefined ? { provider_id } : {}),
                ...(environment !== undefined ? { environment } : {}),
                ...(account_reference !== undefined
                    ? { account_reference: account_reference?.trim() || null }
                    : {}),
                ...(credentials !== undefined
                    ? { credentials: this.sanitizeCredentials(credentials) }
                    : {}),
                ...(settings !== undefined ? { settings: this.sanitizeSettings(settings) } : {})
            }
        };
    }
}

export default PaymentProviderConfigValidator;
