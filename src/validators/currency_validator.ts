import {
    AppCurrencyActionFromDataInterface,
    AppCurrencyActionValidatedFormDataInterface,
    AppCurrencyFormDataInterface,
    AppCurrencyToggleDefaultFormDataInterface,
    AppCurrencyToggleDefaultValidatedformDataInterface,
    CurrencyFromDataInterface,
    CurrencyValidatedFromDataInterface
} from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";
import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";
import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class CurrencyValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    protected static getContentMessage(message_key: string): string {
        return CurrencyValidator.content_manager.getAPIResponseValue(message_key);
    }

    // CODE (e.g. USD, NGN, BTC)
    public static validateCurrencyCode = (value: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_code") };
        }

        if (value && !/^[A-Z0-9]{3,10}$/.test(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_code") };
        }

        return { status: true, msg: "" };
    };

    // NAME
    public static validateCurrencyName = (value: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_name") };
        }

        if (value && !InputValidatorUtil.isValidNamey(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_name") };
        }

        return { status: true, msg: "" };
    };

    // SYMBOL
    public static validateCurrencySymbol = (value: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_symbol") };
        }

        return { status: true, msg: "" };
    };

    // NUMERIC CODE (ISO 4217)
    public static validateNumericCode = (value: string | null): ActionMethodRetrunInterface => {
        if (!value)
            return { status: true, msg: this.getContentMessage("invalid_currency_numeric_code") };

        if (!/^\d{3}$/.test(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_numeric_code") };
        }

        return { status: true, msg: "" };
    };

    // PRECISION
    public static validatePrecision = (value: number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined) {
            return { status: false, msg: this.getContentMessage("invalid_currency_precision") };
        }

        if (value < 0 || value > 12) {
            return { status: false, msg: this.getContentMessage("invalid_currency_precision") };
        }

        return { status: true, msg: "" };
    };

    // MINOR UNIT
    public static validateMinorUnit = (value: number | null): ActionMethodRetrunInterface => {
        if (value === null)
            return { status: true, msg: this.getContentMessage("invalid_currency_minor_unit") };

        if (value < 0) {
            return { status: false, msg: this.getContentMessage("invalid_currency_minor_unit") };
        }

        return { status: true, msg: "" };
    };

    // COUNTRY CODE
    public static validateCountryCode = (value: string | null): ActionMethodRetrunInterface => {
        if (!value)
            return { status: true, msg: this.getContentMessage("invalid_currency_country_code") };

        if (!/^[A-Z]{2}$/.test(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_country_code") };
        }

        return { status: true, msg: "" };
    };

    // LOGO URL
    public static validateLogoUrl = (value: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_logo_url") };
        }

        if (value && !InputValidatorUtil.isValidURL(value)) {
            return { status: false, msg: this.getContentMessage("invalid_currency_logo_url") };
        }

        return { status: true, msg: "" };
    };

    // SORT ORDER
    public static validateSortOrder = (value: number | null): ActionMethodRetrunInterface => {
        if (value === null)
            return { status: true, msg: this.getContentMessage("invalid_currency_sort_order") };

        if (value < 0) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_currency_sort_order_must_be_integer")
            };
        }

        return { status: true, msg: "" };
    };

    public static validateCurrencyInput(
        form_data: CurrencyFromDataInterface
    ): ValidationResultInterface<CurrencyValidatedFromDataInterface> {
        const {
            csrf_token,
            code,
            name,
            symbol,
            numeric_code,
            precision,
            minor_unit,
            country_code,
            is_fiat,
            logo_url,
            sort_order
        } = form_data;

        // CSRF
        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        // FIELD VALIDATIONS
        if (!this.validateCurrencyCode(code).status) {
            return { v_state: false, v_msg: "invalid_currency_code" };
        }

        if (!this.validateCurrencyName(name).status) {
            return { v_state: false, v_msg: "invalid_currency_name" };
        }

        if (!this.validateCurrencySymbol(symbol).status) {
            return { v_state: false, v_msg: "invalid_currency_symbol" };
        }

        if (!this.validateNumericCode(numeric_code).status) {
            return { v_state: false, v_msg: "invalid_currency_numeric_code" };
        }

        if (!this.validatePrecision(precision).status) {
            return { v_state: false, v_msg: "invalid_currency_precision" };
        }

        if (!this.validateMinorUnit(minor_unit).status) {
            return { v_state: false, v_msg: "invalid_currency_minor_unit" };
        }

        if (!this.validateCountryCode(country_code).status) {
            return { v_state: false, v_msg: "invalid_currency_country_code" };
        }

        if (!this.validateLogoUrl(logo_url).status) {
            return { v_state: false, v_msg: "invalid_currency_logo_url" };
        }

        if (!this.validateSortOrder(sort_order).status) {
            return { v_state: false, v_msg: "invalid_currency_sort_order" };
        }

        // =========================
        // 🔥 BUSINESS RULES
        // =========================

        // Fiat must have country + numeric code
        if (is_fiat) {
            if (!country_code || !numeric_code) {
                return { v_state: false, v_msg: "fiat_currency_requires_country_and_numeric_code" };
            }
        }

        // Crypto should not have minor_unit typically
        if (!is_fiat && minor_unit !== null) {
            return { v_state: false, v_msg: "crypto_should_not_have_minor_unit" };
        }

        // =========================
        // ✅ CLEAN DATA
        // =========================

        const v_data: CurrencyValidatedFromDataInterface = {
            csrf_token,
            code: code?.toUpperCase().trim(),
            name: name?.trim(),
            symbol: symbol?.trim(),
            numeric_code: numeric_code ?? null,
            precision,
            minor_unit: minor_unit ?? null,
            country_code: country_code?.toUpperCase() ?? null,
            is_fiat,
            logo_url: logo_url?.trim(),
            sort_order: sort_order ?? null
        };

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data
        };
    }

    public static validateAppCurrencyInput(
        form_data: AppCurrencyActionFromDataInterface | AppCurrencyFormDataInterface
    ): ValidationResultInterface<AppCurrencyActionValidatedFormDataInterface> {
        const { csrf_token, currency_code_or_id, currency_list, action } = form_data;

        const app_id = form_data?.registered_app_id || form_data.app_id;

        // CSRF
        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        const currency_array = currency_code_or_id ? [currency_code_or_id] : (currency_list ?? []);

        if (InputValidatorUtil.isEmpty(app_id) || !app_id) {
            return { v_state: false, v_msg: "invalid_input_app_id" };
        }

        if (
            InputValidatorUtil.isEmpty(action) ||
            !action ||
            !["assign", "unassign"].includes(action)
        ) {
            return { v_state: false, v_msg: "invalid_currency_assign_unassign_action_type" };
        }

        if (!currency_array.length) {
            return { v_state: false, v_msg: "no_currency_provided" };
        }

        const v_data: AppCurrencyActionValidatedFormDataInterface = {
            csrf_token,
            currency_list: currency_array,
            action: action as "assign" | "unassign",
            app_id
        };

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data
        };
    }

    public static validateSetAppDefaultCurrencyInput(
        form_data: AppCurrencyToggleDefaultFormDataInterface
    ): ValidationResultInterface<AppCurrencyToggleDefaultValidatedformDataInterface> {
        const { csrf_token, currency_code_or_id, app_id } = form_data;

        // CSRF
        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (InputValidatorUtil.isEmpty(app_id) || !app_id) {
            return { v_state: false, v_msg: "invalid_input_app_id" };
        }

        if (InputValidatorUtil.isEmpty(currency_code_or_id) || !currency_code_or_id) {
            return { v_state: false, v_msg: "no_currency_provided" };
        }

        const v_data: AppCurrencyToggleDefaultValidatedformDataInterface = {
            csrf_token,
            currency_code_or_id,
            app_id
        };

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data
        };
    }
}

export default CurrencyValidator;
