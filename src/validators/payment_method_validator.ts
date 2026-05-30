import {
    CreatePaymentMethodPayloadInterface,
    UpdatePaymentMethodPayloadInterface
} from "@/types/form_data_type";

import { PaymentMethodMetadataInterface } from "@/types/api_service_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class PaymentMethodValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    // Method to get localized API/content messages.
    protected static getContentMessage(message_key: string): string {
        return PaymentMethodValidator.content_manager.getAPIResponseValue(message_key);
    }

    // Method to validate payment method code.
    public static validateCode = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_payment_method_code") };
        }

        if (value && !/^[a-zA-Z0-9_-]{2,50}$/.test(value.trim())) {
            return { status: false, msg: this.getContentMessage("invalid_payment_method_code") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate payment method name.
    public static validateName = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_payment_method_name") };
        }

        if (value && !InputValidatorUtil.isValidNamey(value.trim())) {
            return { status: false, msg: this.getContentMessage("invalid_payment_method_name") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional payment method description.
    public static validateDescription = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && !InputValidatorUtil.isValidLongText(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_method_description")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional payment method icon URL.
    public static validateIconUrl = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && !InputValidatorUtil.isValidURL(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_method_icon_url")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional sort order.
    public static validateSortOrder = (value?: number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined) {
            return { status: true, msg: "" };
        }

        if (!Number.isInteger(Number(value)) || Number(value) < 0) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_method_sort_order")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate a nullable positive amount.
    private static validateNullableAmount = (
        value?: number | null,
        message_key: string = "invalid_payment_amount"
    ): ActionMethodRetrunInterface => {
        if (value === null || value === undefined) {
            return { status: true, msg: "" };
        }

        if (Number.isNaN(Number(value)) || Number(value) < 0) {
            return { status: false, msg: this.getContentMessage(message_key) };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional metadata arrays.
    private static validateStringList = (
        value: unknown,
        message_key: string
    ): ActionMethodRetrunInterface => {
        if (value === undefined || value === null) {
            return { status: true, msg: "" };
        }

        if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
            return { status: false, msg: this.getContentMessage(message_key) };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional payment method metadata.
    public static validateMetadata = (
        metadata?: PaymentMethodMetadataInterface | null
    ): ActionMethodRetrunInterface => {
        if (!metadata) {
            return { status: true, msg: "" };
        }

        if (typeof metadata !== "object" || Array.isArray(metadata)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_method_metadata")
            };
        }

        const country_validation = this.validateStringList(
            metadata.supported_country_codes,
            "invalid_payment_method_supported_country_codes"
        );
        if (!country_validation.status) return country_validation;

        const currency_validation = this.validateStringList(
            metadata.supported_currency_codes,
            "invalid_payment_method_supported_currency_codes"
        );
        if (!currency_validation.status) return currency_validation;

        const min_validation = this.validateNullableAmount(metadata.min_amount);
        if (!min_validation.status) return min_validation;

        const max_validation = this.validateNullableAmount(metadata.max_amount);
        if (!max_validation.status) return max_validation;

        if (
            metadata.min_amount !== null &&
            metadata.min_amount !== undefined &&
            metadata.max_amount !== null &&
            metadata.max_amount !== undefined &&
            Number(metadata.min_amount) > Number(metadata.max_amount)
        ) {
            return { status: false, msg: this.getContentMessage("invalid_payment_amount_range") };
        }

        return { status: true, msg: "" };
    };

    // Method to clean optional payment method metadata.
    private static sanitizeMetadata = (
        metadata?: PaymentMethodMetadataInterface | null
    ): PaymentMethodMetadataInterface | null => {
        if (!metadata) {
            return null;
        }

        return {
            ...metadata,
            display_name: metadata.display_name?.trim() || null,
            display_description: metadata.display_description?.trim() || null,
            display_group: metadata.display_group?.trim() || null,
            processing_time_text: metadata.processing_time_text?.trim() || null,
            fee_label: metadata.fee_label?.trim() || null,
            min_amount: metadata.min_amount ?? null,
            max_amount: metadata.max_amount ?? null
        };
    };

    // Method to validate and clean create payment method input.
    public static validateCreatePaymentMethodInput(
        form_data: CreatePaymentMethodPayloadInterface
    ): ValidationResultInterface<CreatePaymentMethodPayloadInterface> {
        const { csrf_token, code, name, description, icon_url, sort_order, metadata } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateCode(code).status)
            return { v_state: false, v_msg: "invalid_payment_method_code" };
        if (!this.validateName(name).status)
            return { v_state: false, v_msg: "invalid_payment_method_name" };
        if (!this.validateDescription(description).status) {
            return { v_state: false, v_msg: "invalid_payment_method_description" };
        }
        if (!this.validateIconUrl(icon_url).status) {
            return { v_state: false, v_msg: "invalid_payment_method_icon_url" };
        }
        if (!this.validateSortOrder(sort_order).status) {
            return { v_state: false, v_msg: "invalid_payment_method_sort_order" };
        }
        if (!this.validateMetadata(metadata).status) {
            return { v_state: false, v_msg: "invalid_payment_method_metadata" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                code: code.trim(),
                name: name.trim(),
                description: description?.trim() || null,
                icon_url: icon_url?.trim() || null,
                sort_order: sort_order ?? null,
                metadata: this.sanitizeMetadata(metadata)
            }
        };
    }

    // Method to validate and clean update payment method input.
    public static validateUpdatePaymentMethodInput(
        form_data: UpdatePaymentMethodPayloadInterface
    ): ValidationResultInterface<UpdatePaymentMethodPayloadInterface> {
        const { csrf_token, code, name, description, icon_url, sort_order, metadata } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (code !== undefined && !this.validateCode(code).status) {
            return { v_state: false, v_msg: "invalid_payment_method_code" };
        }
        if (name !== undefined && !this.validateName(name).status) {
            return { v_state: false, v_msg: "invalid_payment_method_name" };
        }
        if (!this.validateDescription(description).status) {
            return { v_state: false, v_msg: "invalid_payment_method_description" };
        }
        if (!this.validateIconUrl(icon_url).status) {
            return { v_state: false, v_msg: "invalid_payment_method_icon_url" };
        }
        if (!this.validateSortOrder(sort_order).status) {
            return { v_state: false, v_msg: "invalid_payment_method_sort_order" };
        }
        if (!this.validateMetadata(metadata).status) {
            return { v_state: false, v_msg: "invalid_payment_method_metadata" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                ...(code !== undefined ? { code: code.trim() } : {}),
                ...(name !== undefined ? { name: name.trim() } : {}),
                ...(description !== undefined ? { description: description?.trim() || null } : {}),
                ...(icon_url !== undefined ? { icon_url: icon_url?.trim() || null } : {}),
                ...(sort_order !== undefined ? { sort_order: sort_order ?? null } : {}),
                ...(metadata !== undefined ? { metadata: this.sanitizeMetadata(metadata) } : {})
            }
        };
    }
}

export default PaymentMethodValidator;
