import {
    CreateCurrencyPaymentProviderMethodPayloadInterface,
    UpdateCurrencyPaymentProviderMethodPayloadInterface
} from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

import BaseValidator from "@/validators/base_validator";

class CurrencyPaymentProviderMethodValidator extends BaseValidator {
    // Method to validate currency id input.
    public static validateCurrencyId = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_currency_id") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate provider method id input.
    public static validateProviderMethodId = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_provider_method_id") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate an optional payment amount.
    public static validateAmount = (value?: number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined) {
            return { status: true, msg: "" };
        }

        if (Number.isNaN(Number(value)) || Number(value) < 0) {
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

    // Method to validate and clean create currency payment provider method input.
    public static validateCreateCurrencyPaymentProviderMethodInput(
        form_data: CreateCurrencyPaymentProviderMethodPayloadInterface
    ): ValidationResultInterface<CreateCurrencyPaymentProviderMethodPayloadInterface> {
        const { csrf_token, currency_id, provider_method_id, min_amount, max_amount } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateCurrencyId(currency_id).status) {
            return { v_state: false, v_msg: "invalid_currency_id" };
        }
        if (!this.validateProviderMethodId(provider_method_id).status) {
            return { v_state: false, v_msg: "invalid_provider_method_id" };
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
                currency_id,
                provider_method_id,
                min_amount: min_amount ?? null,
                max_amount: max_amount ?? null
            }
        };
    }

    // Method to validate and clean update currency payment provider method input.
    public static validateUpdateCurrencyPaymentProviderMethodInput(
        form_data: UpdateCurrencyPaymentProviderMethodPayloadInterface
    ): ValidationResultInterface<UpdateCurrencyPaymentProviderMethodPayloadInterface> {
        const { csrf_token, currency_id, provider_method_id, min_amount, max_amount } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (currency_id !== undefined && !this.validateCurrencyId(currency_id).status) {
            return { v_state: false, v_msg: "invalid_currency_id" };
        }
        if (provider_method_id !== undefined && !this.validateProviderMethodId(provider_method_id).status) {
            return { v_state: false, v_msg: "invalid_provider_method_id" };
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
                ...(currency_id !== undefined ? { currency_id } : {}),
                ...(provider_method_id !== undefined ? { provider_method_id } : {}),
                ...(min_amount !== undefined ? { min_amount: min_amount ?? null } : {}),
                ...(max_amount !== undefined ? { max_amount: max_amount ?? null } : {})
            }
        };
    }
}

export default CurrencyPaymentProviderMethodValidator;
