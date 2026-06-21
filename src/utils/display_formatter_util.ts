import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

interface CurrencyAmountFormatOptions {
    precision?: number | null;
    symbol?: string | null;
    empty_value?: string;
}

// Centralizes application display formatting while delegating primitive transforms to the UI toolkit.
class DisplayFormatterUtil {
    public static formatLabel(value?: string | null, empty_value = "-"): string {
        if (!value) {
            return empty_value;
        }

        return value.replace(/[_-]+/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
    }

    public static formatDate(value?: string | Date | null, empty_value = "-"): string {
        if (!value) {
            return empty_value;
        }

        const date_value = value instanceof Date ? value.toISOString() : value;

        return InputTransformerUtil.formatReadableDate(date_value);
    }

    public static formatDateTime(value?: string | Date | null, empty_value = "-"): string {
        if (!value) {
            return empty_value;
        }

        const date_value = value instanceof Date ? value.toISOString() : value;

        return InputTransformerUtil.formatReadableDateTime(date_value);
    }

    public static formatAmountLimit(value?: number | string | null, empty_value = "Infinity"): string {
        if (value === null || value === undefined || value === "") {
            return empty_value;
        }

        const amount = Number(value);

        if (!Number.isFinite(amount)) {
            return empty_value;
        }

        return InputTransformerUtil.nFormatter(InputTransformerUtil.roundToTwoDecimalPlaces(amount), 2);
    }

    public static formatCurrencyAmount(value?: number | string | null, options: CurrencyAmountFormatOptions = {}): string {
        const { precision = 2, symbol, empty_value = "-" } = options;

        if (value === null || value === undefined || value === "") {
            return empty_value;
        }

        const amount = Number(value);

        if (!Number.isFinite(amount)) {
            return empty_value;
        }

        const normalized_precision = Math.max(0, precision ?? 2);
        const formatted_amount = amount.toFixed(normalized_precision);

        return symbol ? `${symbol}${formatted_amount}` : formatted_amount;
    }

    public static formatBoolean(value: boolean | null | undefined, true_text = "Yes", false_text = "No"): string {
        return value ? true_text : false_text;
    }

    public static escapeHtml(value: unknown): string {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

export default DisplayFormatterUtil;
