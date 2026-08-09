import type { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import type { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import type {
    CreateServiceFeeConfigurationPayloadInterface,
    ServiceFeeConfigurationRangePayloadInterface,
    ServiceFeeConfigurationType,
    ServiceFeeTransactionType,
    UpdateServiceFeeConfigurationPayloadInterface
} from "@/types/service_fee_configuration_type";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

import BaseValidator from "@/validators/base_validator";

class ServiceFeeConfigurationValidator extends BaseValidator {
    // Method to normalize a non-negative decimal string without losing precision.
    private static normalizeDecimal(value?: string | number | null): string | null {
        if (value === null || value === undefined || String(value).trim() === "") {
            return null;
        }

        const decimal_value = String(value).trim();

        if (!/^\d{1,18}(?:\.\d{1,18})?$/.test(decimal_value)) {
            return null;
        }

        const [integer_part, fractional_part = ""] = decimal_value.split(".");
        const normalized_integer = integer_part.replace(/^0+(?=\d)/, "") || "0";
        const normalized_fraction = fractional_part.replace(/0+$/, "");

        return `${normalized_integer}${normalized_fraction ? `.${normalized_fraction}` : ""}`;
    }

    // Method to compare two normalized non-negative decimal strings without floating-point conversion.
    private static compareDecimals(left_value: string, right_value: string): number {
        const [left_integer, left_fraction = ""] = left_value.split(".");
        const [right_integer, right_fraction = ""] = right_value.split(".");

        if (left_integer.length !== right_integer.length) {
            return left_integer.length > right_integer.length ? 1 : -1;
        }

        if (left_integer !== right_integer) {
            return left_integer > right_integer ? 1 : -1;
        }

        const fraction_length = Math.max(left_fraction.length, right_fraction.length);
        const normalized_left_fraction = left_fraction.padEnd(fraction_length, "0");
        const normalized_right_fraction = right_fraction.padEnd(fraction_length, "0");

        if (normalized_left_fraction === normalized_right_fraction) {
            return 0;
        }

        return normalized_left_fraction > normalized_right_fraction ? 1 : -1;
    }

    // Method to validate a required record identifier.
    public static validateRequiredId = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || InputValidatorUtil.isEmpty(String(value))) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_record_id") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate a service fee transaction type.
    public static validateTransactionType = (value?: ServiceFeeTransactionType | null): ActionMethodRetrunInterface => {
        if (!value || !["deposit", "withdrawal", "transfer", "exchange"].includes(value)) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_transaction_type") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate a service fee configuration type.
    public static validateFeeType = (value?: ServiceFeeConfigurationType | null): ActionMethodRetrunInterface => {
        if (!value || !["flat", "percentage", "range"].includes(value)) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_type") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate a non-negative fee amount.
    public static validateAmount = (
        value?: string | number | null,
        is_required: boolean = true
    ): ActionMethodRetrunInterface => {
        if (value === null || value === undefined || value === "") {
            return is_required
                ? { status: false, msg: this.getContentMessage("invalid_service_fee_amount") }
                : { status: true, msg: "" };
        }

        if (!this.normalizeDecimal(value)) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_amount") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate the application, provider, and identity scope hierarchy.
    public static validateScope = (
        registered_app_id?: string | number | null,
        provider_id?: string | number | null,
        identity_id?: string | number | null
    ): ActionMethodRetrunInterface => {
        if ((provider_id && !registered_app_id) || (identity_id && (!registered_app_id || !provider_id))) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_configuration_scope") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate a service fee effective date range.
    public static validateEffectiveDates = (
        effective_from?: string | Date | null,
        effective_until?: string | Date | null
    ): ActionMethodRetrunInterface => {
        const from_time = effective_from ? new Date(effective_from).getTime() : null;
        const until_time = effective_until ? new Date(effective_until).getTime() : null;

        if ((from_time !== null && Number.isNaN(from_time)) || (until_time !== null && Number.isNaN(until_time))) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_effective_period") };
        }

        if (from_time !== null && until_time !== null && from_time >= until_time) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_effective_period") };
        }

        return { status: true, msg: "" };
    };

    // Method to validate and normalize range fee rows.
    public static validateRanges(
        ranges?: ServiceFeeConfigurationRangePayloadInterface[]
    ): ValidationResultInterface<ServiceFeeConfigurationRangePayloadInterface[]> {
        if (!ranges?.length) {
            return { v_state: false, v_msg: "service_fee_ranges_required" };
        }

        const normalized_ranges: ServiceFeeConfigurationRangePayloadInterface[] = [];

        for (const range of ranges) {
            const min_value = this.normalizeDecimal(range.min_value);
            const max_value =
                range.max_value === null || range.max_value === undefined || range.max_value === ""
                    ? null
                    : this.normalizeDecimal(range.max_value);
            const amount = this.normalizeDecimal(range.amount);

            if (
                min_value === null ||
                (range.max_value !== null && range.max_value !== undefined && range.max_value !== "" && max_value === null) ||
                (max_value !== null && this.compareDecimals(max_value, min_value) <= 0) ||
                !["flat", "percentage"].includes(range.fee_type) ||
                amount === null ||
                (range.fee_type === "percentage" && this.compareDecimals(amount, "100") > 0)
            ) {
                return { v_state: false, v_msg: "invalid_service_fee_range" };
            }

            normalized_ranges.push({
                min_value,
                max_value,
                fee_type: range.fee_type,
                amount
            });
        }

        const sorted_ranges = [...normalized_ranges].sort((left_range, right_range) => {
            return this.compareDecimals(String(left_range.min_value), String(right_range.min_value));
        });

        if (this.compareDecimals(String(sorted_ranges[0].min_value), "0") !== 0) {
            return { v_state: false, v_msg: "service_fee_ranges_must_start_at_zero" };
        }

        if (sorted_ranges[sorted_ranges.length - 1].max_value !== null) {
            return { v_state: false, v_msg: "service_fee_ranges_must_end_open" };
        }

        for (let index = 1; index < sorted_ranges.length; index += 1) {
            const previous_max = sorted_ranges[index - 1].max_value;
            const current_min = String(sorted_ranges[index].min_value);

            if (
                previous_max === null ||
                previous_max === undefined ||
                this.compareDecimals(String(previous_max), current_min) !== 0
            ) {
                return { v_state: false, v_msg: "non_contiguous_service_fee_ranges" };
            }
        }

        return { v_state: true, v_msg: "valid_input", v_data: sorted_ranges };
    }

    // Method to validate and clean a create service fee configuration payload.
    public static validateCreateInput(
        form_data: CreateServiceFeeConfigurationPayloadInterface
    ): ValidationResultInterface<CreateServiceFeeConfigurationPayloadInterface> {
        if (InputValidatorUtil.isEmpty(form_data.csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateRequiredId(form_data.currency_id).status) {
            return { v_state: false, v_msg: "invalid_service_fee_currency_id" };
        }

        if (!this.validateTransactionType(form_data.transaction_type).status) {
            return { v_state: false, v_msg: "invalid_service_fee_transaction_type" };
        }

        if (!this.validateFeeType(form_data.fee_type).status) {
            return { v_state: false, v_msg: "invalid_service_fee_type" };
        }

        if (!this.validateScope(form_data.registered_app_id, form_data.provider_id, form_data.identity_id).status) {
            return { v_state: false, v_msg: "invalid_service_fee_configuration_scope" };
        }

        const date_result = this.validateEffectiveDates(form_data.effective_from, form_data.effective_until);

        if (!date_result.status) {
            return { v_state: false, v_msg: "invalid_service_fee_effective_period" };
        }

        let amount: string | null = null;
        let ranges: ServiceFeeConfigurationRangePayloadInterface[] = [];

        if (form_data.fee_type === "range") {
            if (form_data.amount !== null && form_data.amount !== undefined && String(form_data.amount).trim() !== "") {
                return { v_state: false, v_msg: "range_service_fee_amount_must_be_empty" };
            }

            const range_result = this.validateRanges(form_data.ranges);

            if (!range_result.v_state || !range_result.v_data) {
                return { v_state: false, v_msg: range_result.v_msg };
            }

            ranges = range_result.v_data;
        } else {
            if (form_data.ranges?.length) {
                return { v_state: false, v_msg: "scalar_service_fee_cannot_have_ranges" };
            }

            if (!this.validateAmount(form_data.amount).status) {
                return { v_state: false, v_msg: "invalid_service_fee_amount" };
            }

            amount = this.normalizeDecimal(form_data.amount);

            if (form_data.fee_type === "percentage" && this.compareDecimals(amount ?? "0", "100") > 0) {
                return { v_state: false, v_msg: "service_fee_percentage_cannot_exceed_100" };
            }
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                ...form_data,
                registered_app_id: form_data.registered_app_id || null,
                provider_id: form_data.provider_id || null,
                identity_id: form_data.identity_id || null,
                amount,
                ranges: form_data.fee_type === "range" ? ranges : [],
                effective_from: form_data.effective_from || null,
                effective_until: form_data.effective_until || null
            }
        };
    }

    // Method to validate and clean an update service fee configuration payload.
    public static validateUpdateInput(
        form_data: UpdateServiceFeeConfigurationPayloadInterface
    ): ValidationResultInterface<UpdateServiceFeeConfigurationPayloadInterface> {
        const create_result = this.validateCreateInput(form_data as CreateServiceFeeConfigurationPayloadInterface);

        return create_result as ValidationResultInterface<UpdateServiceFeeConfigurationPayloadInterface>;
    }
}

export default ServiceFeeConfigurationValidator;
