import {
    CreatePaymentProviderConfigPayloadInterface,
    UpdatePaymentProviderConfigPayloadInterface
} from "@/types/form_data_type";

import {
    PaymentProviderConfigCredentialsInterface,
    PaymentProviderConfigEnvironmentType,
    PaymentProviderConfigFeeStructureType,
    PaymentProviderConfigSettingsInterface
} from "@/types/api_service_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

import BaseValidator from "@/validators/base_validator";

class PaymentProviderConfigValidator extends BaseValidator {
    // Method to validate payment provider id input.
    public static validateProviderId = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_id") };
        }

        if (!/^\d+$/.test(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_id") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate payment provider config environment.
    public static validateEnvironment = (value?: PaymentProviderConfigEnvironmentType | null): ActionMethodRetrunInterface => {
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

    // Method to validate an optional provider credential value.
    public static validateCredentialValue = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (typeof value !== "string" || value.trim().length > 5000) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_credentials")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate an optional provider setting value.
    public static validateSettingValue = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (typeof value !== "string" || value.trim().length > 5000) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_settings")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate an optional provider URL setting.
    public static validateURLSetting = (value?: string | null): ActionMethodRetrunInterface => {
        const value_validation = this.validateSettingValue(value);

        if (!value_validation.status || InputValidatorUtil.isEmpty(value)) {
            return value_validation;
        }

        if (value && !InputValidatorUtil.isValidURL(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_url")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate an optional timeout in milliseconds.
    public static validateTimeoutMs = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        const timeout_ms = Number(value);

        if (!Number.isInteger(timeout_ms) || timeout_ms < 0) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_config_timeout_ms")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional transaction fee JSON input.
    public static validateTransactionFees = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        try {
            const transaction_fees = JSON.parse(value ?? "");

            if (
                !transaction_fees ||
                typeof transaction_fees !== "object" ||
                Array.isArray(transaction_fees) ||
                !["deposit", "withdrawal"].some((key) => {
                    return key in transaction_fees;
                })
            ) {
                return { status: false, msg: this.getContentMessage("invalid_payment_provider_config_settings") };
            }
        } catch {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_config_settings") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate a single or ranged transaction fee structure.
    private static validateFeeStructure(value: PaymentProviderConfigFeeStructureType | null): boolean {
        if (value === null) {
            return true;
        }

        if (!value || typeof value !== "object") {
            return false;
        }

        if (value.type === "range") {
            return (
                Array.isArray(value.ranges) &&
                value.ranges.length > 0 &&
                value.ranges.every((range) => {
                    return (
                        ["flat", "percentage"].includes(range.type) &&
                        !InputValidatorUtil.isEmpty(range.min) &&
                        !InputValidatorUtil.isEmpty(range.max) &&
                        !InputValidatorUtil.isEmpty(range.fee_amount)
                    );
                })
            );
        }

        return ["flat", "percentage"].includes(value.type) && !InputValidatorUtil.isEmpty(value.fee_amount);
    }

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

        const has_invalid_value = Object.values(credentials).some((value) => !this.validateCredentialValue(value).status);

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
            if (key.endsWith("_url") && value && (typeof value !== "string" || !InputValidatorUtil.isValidURL(value.trim()))) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_payment_provider_config_url")
                };
            }

            if (["timeout_ms", "recv_window"].includes(key) && !this.validateTimeoutMs(value as number | null).status) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_payment_provider_config_timeout_ms")
                };
            }

            if (
                key.startsWith("supports_") ||
                ["create_sub_account", "create_dedicated_account", "requires_provider_kyc_for_subaccount"].includes(key)
            ) {
                if (value !== undefined && typeof value !== "boolean") {
                    return {
                        status: false,
                        msg: this.getContentMessage("invalid_payment_provider_config_settings")
                    };
                }
            }

            if (["supported_methods", "supported_currencies"].includes(key)) {
                if (
                    !Array.isArray(value) ||
                    value.some((item) => {
                        return typeof item !== "string" || InputValidatorUtil.isEmpty(item);
                    })
                ) {
                    return {
                        status: false,
                        msg: this.getContentMessage("invalid_payment_provider_config_settings")
                    };
                }
            }

            if (
                key === "account_strategy" &&
                value !== undefined &&
                ![
                    "none",
                    "provider_customer",
                    "virtual_account",
                    "main_wallet_address",
                    "sub_account",
                    "wallet_address"
                ].includes(String(value))
            ) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_payment_provider_config_settings")
                };
            }

            if (key === "transaction_fees" && value) {
                if (
                    typeof value !== "object" ||
                    Array.isArray(value) ||
                    !Object.values(value).every((fee_structure) => {
                        return this.validateFeeStructure(fee_structure as PaymentProviderConfigFeeStructureType | null);
                    })
                ) {
                    return {
                        status: false,
                        msg: this.getContentMessage("invalid_payment_provider_config_settings")
                    };
                }
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

        const clean_entries = Object.entries(credentials).map(([key, value]) => {
            return [key, value?.trim() || null];
        });

        return Object.fromEntries(clean_entries) as PaymentProviderConfigCredentialsInterface;
    };

    // Method to clean provider settings.
    private static sanitizeSettings = (
        settings?: PaymentProviderConfigSettingsInterface | null
    ): PaymentProviderConfigSettingsInterface | null => {
        if (!settings) {
            return null;
        }

        const clean_entries = Object.entries(settings).map(([key, value]) => {
            if (typeof value === "string") {
                return [key, value.trim() || null];
            }

            if (Array.isArray(value)) {
                return [
                    key,
                    value.map((item) => {
                        return typeof item === "string" ? item.trim().toUpperCase() : item;
                    })
                ];
            }

            return [key, value];
        });

        return Object.fromEntries(clean_entries) as PaymentProviderConfigSettingsInterface;
    };

    // Method to validate and clean create payment provider config input.
    public static validateCreatePaymentProviderConfigInput(
        form_data: CreatePaymentProviderConfigPayloadInterface
    ): ValidationResultInterface<CreatePaymentProviderConfigPayloadInterface> {
        const { csrf_token, provider_id, environment, credentials, settings } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateProviderId(provider_id).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_id" };
        }
        if (!this.validateEnvironment(environment).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_environment" };
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
                credentials: this.sanitizeCredentials(credentials),
                settings: this.sanitizeSettings(settings)
            }
        };
    }

    // Method to validate and clean update payment provider config input.
    public static validateUpdatePaymentProviderConfigInput(
        form_data: UpdatePaymentProviderConfigPayloadInterface
    ): ValidationResultInterface<UpdatePaymentProviderConfigPayloadInterface> {
        const { csrf_token, provider_id, environment, credentials, settings } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (provider_id !== undefined && !this.validateProviderId(provider_id).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_id" };
        }
        if (!this.validateEnvironment(environment).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_config_environment" };
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
                ...(credentials !== undefined ? { credentials: this.sanitizeCredentials(credentials) } : {}),
                ...(settings !== undefined ? { settings: this.sanitizeSettings(settings) } : {})
            }
        };
    }
}

export default PaymentProviderConfigValidator;
