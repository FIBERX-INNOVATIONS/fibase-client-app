import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

class LedgerDisplayFormatterUtil {
    // Method to format a ledger amount using its currency projection.
    public static formatAmount(record: IdentityWalletLedgerRecordInterface, value?: number, empty_value?: string): string {
        const currency = record.currency ?? record.wallet?.currency;

        return DisplayFormatterUtil.formatCurrencyAmount(value, {
            precision: currency?.precision,
            symbol: currency?.symbol,
            empty_value
        });
    }

    // Method to resolve the matching balance value around a ledger movement.
    public static getBalanceValue(
        record: IdentityWalletLedgerRecordInterface,
        position: "before" | "after",
        empty_value?: string
    ): string {
        const balance_key = `${record.balance_field}_${position}` as
            | "available_balance_before"
            | "available_balance_after"
            | "locked_balance_before"
            | "locked_balance_after"
            | "pending_balance_before"
            | "pending_balance_after"
            | "refunded_balance_before"
            | "refunded_balance_after";

        return this.formatAmount(record, record[balance_key], empty_value);
    }

    // Method to resolve the most specific actor attached to a ledger entry.
    public static getCreatedBy(record: IdentityWalletLedgerRecordInterface): string {
        const member = record.created_by_member;

        if (member) {
            return (
                member.full_name || [member.first_name, member.last_name].filter(Boolean).join(" ") || member.email || "Member"
            );
        }

        if (record.created_by_identity) {
            return `Identity: ${record.created_by_identity.public_id}`;
        }

        if (record.created_by_app) {
            return `App: ${record.created_by_app.name || record.created_by_app.public_id}`;
        }

        return "System";
    }
}

export default LedgerDisplayFormatterUtil;
