import {
    CreatePaymentProviderPayloadInterface,
    UpdatePaymentProviderPayloadInterface
} from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class PaymentProviderValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    // Method to get localized API/content messages.
    protected static getContentMessage(message_key: string): string {
        return PaymentProviderValidator.content_manager.getAPIResponseValue(message_key);
    }

    // Method to validate payment provider code.
    public static validateCode = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_code") };
        }

        if (value && !/^[a-zA-Z0-9_-]{2,50}$/.test(value.trim())) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_code") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate payment provider name.
    public static validateName = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_name") };
        }

        if (value && !InputValidatorUtil.isValidNamey(value.trim())) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_name") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider description.
    public static validateDescription = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && !InputValidatorUtil.isValidLongText(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_description")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider type.
    public static validateProviderType = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && !/^[a-zA-Z0-9_-]{2,50}$/.test(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_type")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider logo URL.
    public static validateLogoUrl = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && !InputValidatorUtil.isValidURL(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_logo_url")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider website URL.
    public static validateWebsiteUrl = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && !InputValidatorUtil.isValidURL(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_website_url")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate and clean create payment provider input.
    public static validateCreatePaymentProviderInput(
        form_data: CreatePaymentProviderPayloadInterface
    ): ValidationResultInterface<CreatePaymentProviderPayloadInterface> {
        const { csrf_token, code, name, description, provider_type, logo_url, website_url } =
            form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateCode(code).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_code" };
        }
        if (!this.validateName(name).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_name" };
        }
        if (!this.validateDescription(description).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_description" };
        }
        if (!this.validateProviderType(provider_type).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_type" };
        }
        if (!this.validateLogoUrl(logo_url).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_logo_url" };
        }
        if (!this.validateWebsiteUrl(website_url).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_website_url" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                code: code.trim(),
                name: name.trim(),
                description: description?.trim() || null,
                provider_type: provider_type?.trim() || undefined,
                logo_url: logo_url?.trim() || null,
                website_url: website_url?.trim() || null
            }
        };
    }

    // Method to validate and clean update payment provider input.
    public static validateUpdatePaymentProviderInput(
        form_data: UpdatePaymentProviderPayloadInterface
    ): ValidationResultInterface<UpdatePaymentProviderPayloadInterface> {
        const { csrf_token, code, name, description, provider_type, logo_url, website_url } =
            form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (code !== undefined && !this.validateCode(code).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_code" };
        }
        if (name !== undefined && !this.validateName(name).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_name" };
        }
        if (!this.validateDescription(description).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_description" };
        }
        if (!this.validateProviderType(provider_type).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_type" };
        }
        if (!this.validateLogoUrl(logo_url).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_logo_url" };
        }
        if (!this.validateWebsiteUrl(website_url).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_website_url" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                ...(code !== undefined ? { code: code.trim() } : {}),
                ...(name !== undefined ? { name: name.trim() } : {}),
                ...(description !== undefined ? { description: description?.trim() || null } : {}),
                ...(provider_type !== undefined ? { provider_type: provider_type?.trim() } : {}),
                ...(logo_url !== undefined ? { logo_url: logo_url?.trim() || null } : {}),
                ...(website_url !== undefined ? { website_url: website_url?.trim() || null } : {})
            }
        };
    }
}

export default PaymentProviderValidator;
