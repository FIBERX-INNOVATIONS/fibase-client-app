import {
    CreatePaymentProviderMethodPayloadInterface,
    UpdatePaymentProviderMethodPayloadInterface
} from "@/types/form_data_type";

import { PaymentConfigDirectionType } from "@/types/api_service_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

import BaseValidator from "@/validators/base_validator";

class PaymentProviderMethodValidator extends BaseValidator {
    // Method to validate payment provider id input.
    public static validateProviderId = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_id") };
        }

        if (!/^\d+$/.test(String(value)) || Number(value) <= 0) {
            return { status: false, msg: this.getContentMessage("invalid_payment_provider_id") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate payment method id input.
    public static validatePaymentMethodId = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_payment_method_id") };
        }

        if (!/^\d+$/.test(String(value)) || Number(value) <= 0) {
            return { status: false, msg: this.getContentMessage("invalid_payment_method_id") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate payment direction input.
    public static validateDirection = (value?: PaymentConfigDirectionType | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_method_direction")
            };
        }

        if (!["deposit", "withdrawal"].includes(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_method_direction")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate optional provider method code.
    public static validateProviderMethodCode = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: true, msg: "" };
        }

        if (value && !/^[a-zA-Z0-9_-]{2,80}$/.test(value.trim())) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_payment_provider_method_code")
            };
        }

        return { status: true, msg: "" };
    };

    // Method to validate an optional payment amount.
    public static validateAmount = (value?: number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined) {
            return { status: true, msg: "" };
        }

        if (!Number.isFinite(Number(value)) || Number(value) < 0) {
            return { status: false, msg: this.getContentMessage("invalid_payment_amount") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate min and max amount range.
    public static validateAmountRange = (
        min_amount?: number | null,
        max_amount?: number | null
    ): ActionMethodRetrunInterface => {
        if (
            min_amount !== null &&
            min_amount !== undefined &&
            max_amount !== null &&
            max_amount !== undefined &&
            Number(min_amount) > Number(max_amount)
        ) {
            return { status: false, msg: this.getContentMessage("invalid_payment_amount_range") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate and clean create payment provider method input.
    public static validateCreatePaymentProviderMethodInput(
        form_data: CreatePaymentProviderMethodPayloadInterface
    ): ValidationResultInterface<CreatePaymentProviderMethodPayloadInterface> {
        const { csrf_token, provider_id, payment_method_id, direction, provider_method_code, min_amount, max_amount } =
            form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateProviderId(provider_id).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_id" };
        }
        if (!this.validatePaymentMethodId(payment_method_id).status) {
            return { v_state: false, v_msg: "invalid_payment_method_id" };
        }
        if (!this.validateDirection(direction).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_method_direction" };
        }
        if (!this.validateProviderMethodCode(provider_method_code).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_method_code" };
        }
        if (!this.validateAmount(min_amount).status || !this.validateAmount(max_amount).status) {
            return { v_state: false, v_msg: "invalid_payment_amount" };
        }
        if (!this.validateAmountRange(min_amount, max_amount).status) {
            return { v_state: false, v_msg: "invalid_payment_amount_range" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                provider_id,
                payment_method_id,
                direction,
                provider_method_code: provider_method_code?.trim() || null,
                min_amount: min_amount ?? null,
                max_amount: max_amount ?? null
            }
        };
    }

    // Method to validate and clean update payment provider method input.
    public static validateUpdatePaymentProviderMethodInput(
        form_data: UpdatePaymentProviderMethodPayloadInterface
    ): ValidationResultInterface<UpdatePaymentProviderMethodPayloadInterface> {
        const { csrf_token, provider_id, payment_method_id, direction, provider_method_code, min_amount, max_amount } =
            form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (provider_id !== undefined && !this.validateProviderId(provider_id).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_id" };
        }
        if (payment_method_id !== undefined && !this.validatePaymentMethodId(payment_method_id).status) {
            return { v_state: false, v_msg: "invalid_payment_method_id" };
        }
        if (direction !== undefined && !this.validateDirection(direction).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_method_direction" };
        }
        if (!this.validateProviderMethodCode(provider_method_code).status) {
            return { v_state: false, v_msg: "invalid_payment_provider_method_code" };
        }
        if (!this.validateAmount(min_amount).status || !this.validateAmount(max_amount).status) {
            return { v_state: false, v_msg: "invalid_payment_amount" };
        }
        if (!this.validateAmountRange(min_amount, max_amount).status) {
            return { v_state: false, v_msg: "invalid_payment_amount_range" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                ...(provider_id !== undefined ? { provider_id } : {}),
                ...(payment_method_id !== undefined ? { payment_method_id } : {}),
                ...(direction !== undefined ? { direction } : {}),
                ...(provider_method_code !== undefined ? { provider_method_code: provider_method_code?.trim() || null } : {}),
                ...(min_amount !== undefined ? { min_amount: min_amount ?? null } : {}),
                ...(max_amount !== undefined ? { max_amount: max_amount ?? null } : {})
            }
        };
    }
}

export default PaymentProviderMethodValidator;
