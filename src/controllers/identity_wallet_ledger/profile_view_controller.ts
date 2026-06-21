import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    ProfileViewStateDataInterface
} from "@/ui_types/profile_view_type";

import {
    IdentityWalletLedgerProfileViewComponentsInterface,
    IdentityWalletLedgerProfileViewComputedDataInterface,
    IdentityWalletLedgerProfileViewPropsInterface
} from "@/ui_types/identity_wallet_ledger_profile_view_type";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";
class IdentityWalletLedgerProfileViewController extends BaseProfileViewController<
    IdentityWalletLedgerRecordInterface,
    IdentityWalletLedgerProfileViewPropsInterface,
    ProfileViewStateDataInterface<IdentityWalletLedgerRecordInterface>,
    IdentityWalletLedgerProfileViewComputedDataInterface,
    IdentityWalletLedgerProfileViewComponentsInterface
> {
    public readonly content_key = "identity_wallet_ledger";

    public content_obj = {} as ProfileViewContentTextInterface;

    // Method to initialise an in-memory ledger record profile without a detail request.
    constructor(props: IdentityWalletLedgerProfileViewPropsInterface) {
        super(props, "identity_wallet_ledger_profile_view");
    }

    // Method to map ledger detail content fields to their content-resource keys.
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            empty_value_text: `${base_content_key}.empty_value_text`,
            movement_title_text: `${base_content_key}.sections.movement.title_text`,
            entry_type_label_text: `${base_content_key}.sections.movement.entry_type_label_text`,
            direction_label_text: `${base_content_key}.sections.movement.direction_label_text`,
            balance_field_label_text: `${base_content_key}.sections.movement.balance_field_label_text`,
            amount_label_text: `${base_content_key}.sections.movement.amount_label_text`,
            before_label_text: `${base_content_key}.sections.movement.before_label_text`,
            after_label_text: `${base_content_key}.sections.movement.after_label_text`,
            context_title_text: `${base_content_key}.sections.context.title_text`,
            transaction_label_text: `${base_content_key}.sections.context.transaction_label_text`,
            wallet_label_text: `${base_content_key}.sections.context.wallet_label_text`,
            identity_label_text: `${base_content_key}.sections.context.identity_label_text`,
            currency_label_text: `${base_content_key}.sections.context.currency_label_text`,
            created_at_label_text: `${base_content_key}.sections.context.created_at_label_text`,
            created_by_label_text: `${base_content_key}.sections.context.created_by_label_text`,
            description_title_text: `${base_content_key}.sections.description.title_text`,
            no_description_text: `${base_content_key}.sections.description.empty_text`,
            reason_title_text: `${base_content_key}.sections.reason.title_text`,
            no_reason_text: `${base_content_key}.sections.reason.empty_text`,
            metadata_title_text: `${base_content_key}.sections.metadata.title_text`,
            no_metadata_text: `${base_content_key}.sections.metadata.empty_text`
        };
    }

    // Method to provide ledger modal copy when content has not loaded.
    protected getProfileViewContentFallbacks(): Partial<ProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            empty_value_text: "-",
            movement_title_text: "Balance Movement",
            entry_type_label_text: "Entry Type:",
            direction_label_text: "Direction:",
            balance_field_label_text: "Balance Field:",
            amount_label_text: "Amount:",
            before_label_text: "Before:",
            after_label_text: "After:",
            context_title_text: "Ledger Context",
            transaction_label_text: "Transaction:",
            wallet_label_text: "Wallet:",
            identity_label_text: "Identity:",
            currency_label_text: "Currency:",
            created_at_label_text: "Created At:",
            created_by_label_text: "Created By:",
            description_title_text: "Description",
            no_description_text: "No description was recorded.",
            reason_title_text: "Reason",
            no_reason_text: "No reason was recorded.",
            metadata_title_text: "Metadata",
            no_metadata_text: "No metadata was recorded."
        };
    }

    // Method to format a ledger amount using its currency projection.
    private formatAmount(record: IdentityWalletLedgerRecordInterface, value?: number): string {
        const currency = record.currency ?? record.wallet?.currency;

        return DisplayFormatterUtil.formatCurrencyAmount(value, {
            precision: currency?.precision,
            symbol: currency?.symbol,
            empty_value: this.content_obj.empty_value_text
        });
    }

    // Method to resolve the matching balance value around a ledger movement.
    private getBalanceValue(record: IdentityWalletLedgerRecordInterface, position: "before" | "after"): string {
        const balance_key = `${record.balance_field}_${position}` as
            | "available_balance_before"
            | "available_balance_after"
            | "locked_balance_before"
            | "locked_balance_after"
            | "pending_balance_before"
            | "pending_balance_after"
            | "refunded_balance_before"
            | "refunded_balance_after";

        return this.formatAmount(record, record[balance_key]);
    }

    // Method to resolve the most specific actor attached to the ledger entry.
    private getCreatedBy(record: IdentityWalletLedgerRecordInterface): string {
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

    // Method to expose wallet profile UI components.
    protected getUIComponents(): IdentityWalletLedgerProfileViewComponentsInterface {
        return {
            ...super.getUIComponents(),
            ProfileValue: this.getProfileValueComponent({ value_class_style: "break-all" })
        };
    }

    // Method to derive all display values from the ledger record supplied by the list.
    protected getUIComputedData(): ComputedDefinitionType<IdentityWalletLedgerProfileViewComputedDataInterface> {
        return {
            entry_type_text: () => DisplayFormatterUtil.formatLabel(this.state_refs.profile_record.value?.entry_type),
            direction_text: () => DisplayFormatterUtil.formatLabel(this.state_refs.profile_record.value?.direction),
            balance_field_text: () => DisplayFormatterUtil.formatLabel(this.state_refs.profile_record.value?.balance_field),
            amount_text: () => {
                const record = this.state_refs.profile_record.value;
                return this.formatAmount(record, record?.amount);
            },
            before_balance_text: () => {
                const record = this.state_refs.profile_record.value;
                return this.getBalanceValue(record, "before");
            },
            after_balance_text: () => {
                const record = this.state_refs.profile_record.value;
                return this.getBalanceValue(record, "after");
            },
            transaction_text: () =>
                this.state_refs.profile_record.value?.transaction?.public_id || this.content_obj.empty_value_text,
            wallet_text: () => this.state_refs.profile_record.value?.wallet?.public_id || this.content_obj.empty_value_text,
            identity_text: () => this.state_refs.profile_record.value?.identity?.public_id || this.content_obj.empty_value_text,
            currency_text: () => {
                const record = this.state_refs.profile_record.value;
                const currency = record?.currency ?? record?.wallet?.currency;
                return currency ? `${currency.code.toUpperCase()} — ${currency.name}` : this.content_obj.empty_value_text;
            },
            created_at_text: () =>
                DisplayFormatterUtil.formatDateTime(
                    this.state_refs.profile_record.value?.created_at,
                    this.content_obj.empty_value_text
                ),
            created_by_text: () => this.getCreatedBy(this.state_refs.profile_record.value),
            metadata_text: () => {
                const metadata = this.state_refs.profile_record.value?.metadata;
                return metadata && Object.keys(metadata).length ? JSON.stringify(metadata, null, 2) : "";
            }
        };
    }

    // Method to skip fetching because the complete ledger row is supplied by the list view.
    protected async handleOnMountedLogic(): Promise<void> {
        return;
    }
}

export default IdentityWalletLedgerProfileViewController;
