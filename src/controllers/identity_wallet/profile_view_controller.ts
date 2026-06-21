import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import {
    IdentityWalletProfileValueItemInterface,
    IdentityWalletProfileViewComponentsInterface,
    IdentityWalletProfileViewComputedDataInterface,
    IdentityWalletProfileViewPropsInterface
} from "@/ui_types/identity_wallet_profile_view_type";

import {
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    ProfileViewStateDataInterface
} from "@/ui_types/profile_view_type";

import { IdentityProfileViewClassStylesInterface } from "@/ui_types/identity_profile_view_type";

import IdentityWalletProfileViewClassStyles from "@/class_styles/identity_wallet_profile_view_class_styles";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import IdentityWalletProfileViewActionHandler from "@/action_handlers/identity_wallet/profile_view_action_handler";

class IdentityWalletProfileViewController extends BaseProfileViewController<
    IdentityWalletRecordInterface,
    IdentityWalletProfileViewPropsInterface,
    ProfileViewStateDataInterface<IdentityWalletRecordInterface>,
    IdentityWalletProfileViewComputedDataInterface,
    IdentityWalletProfileViewComponentsInterface
> {
    public readonly content_key = "identity_wallet";

    public readonly class_styles: IdentityProfileViewClassStylesInterface;

    public action_handler: IdentityWalletProfileViewActionHandler;

    public content_obj = {} as ProfileViewContentTextInterface;

    // Method to initialise the routed wallet profile and its detail action handler.
    constructor(props: IdentityWalletProfileViewPropsInterface) {
        super(props, "identity_wallet_profile_view", IdentityWalletProfileViewClassStyles);

        this.class_styles = {
            ...IdentityWalletProfileViewClassStyles,
            ...(props.class_styles ?? {})
        } as IdentityProfileViewClassStylesInterface;

        this.action_handler = new IdentityWalletProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    // Method to map wallet profile content fields to their content-resource keys.
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            empty_value_text: `${base_content_key}.empty_value_text`,
            wallet_breadcrumb_text: `${base_content_key}.breadcrumb.wallet_text`,
            active_status_text: `${base_content_key}.status.active_text`,
            inactive_status_text: `${base_content_key}.status.inactive_text`,
            deleted_status_text: `${base_content_key}.status.deleted_text`,
            fiat_type_text: `${base_content_key}.status.fiat_text`,
            crypto_type_text: `${base_content_key}.status.crypto_text`,
            information_title_text: `${base_content_key}.sections.information.title_text`,
            public_id_label_text: `${base_content_key}.sections.information.public_id_label_text`,
            status_label_text: `${base_content_key}.sections.information.status_label_text`,
            active_label_text: `${base_content_key}.sections.information.active_label_text`,
            balance_title_text: `${base_content_key}.sections.balances.title_text`,
            available_balance_label_text: `${base_content_key}.sections.balances.available_label_text`,
            locked_balance_label_text: `${base_content_key}.sections.balances.locked_label_text`,
            pending_balance_label_text: `${base_content_key}.sections.balances.pending_label_text`,
            refunded_balance_label_text: `${base_content_key}.sections.balances.refunded_label_text`,
            totals_title_text: `${base_content_key}.sections.totals.title_text`,
            total_credit_label_text: `${base_content_key}.sections.totals.credit_label_text`,
            total_debit_label_text: `${base_content_key}.sections.totals.debit_label_text`,
            currency_title_text: `${base_content_key}.sections.currency.title_text`,
            currency_code_label_text: `${base_content_key}.sections.currency.code_label_text`,
            currency_name_label_text: `${base_content_key}.sections.currency.name_label_text`,
            currency_precision_label_text: `${base_content_key}.sections.currency.precision_label_text`,
            currency_type_label_text: `${base_content_key}.sections.currency.type_label_text`,
            owner_title_text: `${base_content_key}.sections.owner.title_text`,
            identity_id_label_text: `${base_content_key}.sections.owner.identity_id_label_text`,
            identity_type_label_text: `${base_content_key}.sections.owner.identity_type_label_text`,
            identity_status_label_text: `${base_content_key}.sections.owner.identity_status_label_text`,
            timeline_title_text: `${base_content_key}.sections.timeline.title_text`,
            created_at_label_text: `${base_content_key}.sections.timeline.created_at_label_text`,
            updated_at_label_text: `${base_content_key}.sections.timeline.updated_at_label_text`
        };
    }

    // Method to provide readable wallet profile copy when content has not loaded.
    protected getProfileViewContentFallbacks(): Partial<ProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading wallet details...",
            empty_value_text: "-",
            wallet_breadcrumb_text: "Wallet",
            active_status_text: "Active",
            inactive_status_text: "Inactive",
            deleted_status_text: "Deleted",
            fiat_type_text: "Fiat",
            crypto_type_text: "Crypto",
            information_title_text: "Wallet Information",
            public_id_label_text: "Public ID",
            status_label_text: "Status",
            active_label_text: "Active State",
            balance_title_text: "Balances",
            available_balance_label_text: "Available",
            locked_balance_label_text: "Locked",
            pending_balance_label_text: "Pending",
            refunded_balance_label_text: "Refunded",
            totals_title_text: "Lifetime Totals",
            total_credit_label_text: "Total Credit",
            total_debit_label_text: "Total Debit",
            currency_title_text: "Currency",
            currency_code_label_text: "Code",
            currency_name_label_text: "Name",
            currency_precision_label_text: "Precision",
            currency_type_label_text: "Type",
            owner_title_text: "Owner",
            identity_id_label_text: "Identity",
            identity_type_label_text: "Identity Type",
            identity_status_label_text: "Identity Status",
            timeline_title_text: "Timeline",
            created_at_label_text: "Created",
            updated_at_label_text: "Updated"
        };
    }

    // Method to format wallet amounts using the linked currency precision and symbol.
    private formatAmount(record: IdentityWalletRecordInterface, value?: number): string {
        return DisplayFormatterUtil.formatCurrencyAmount(value, {
            precision: record.currency?.precision,
            symbol: record.currency?.symbol,
            empty_value: this.content_obj.empty_value_text
        });
    }

    // Method to create a consistently shaped profile value item.
    private makeItem(icon: SVGIconKey, label: string, value: string | number): IdentityWalletProfileValueItemInterface {
        return { icon, label, value };
    }

    // Method to derive wallet summary cards from the latest fetched record.
    protected getUIComputedData(): ComputedDefinitionType<IdentityWalletProfileViewComputedDataInterface> {
        return {
            loading_icon_html: () => {
                return String(getSVGIconValue("loading_svg_icon") ?? "");
            },

            wallet_title: () => {
                return this.state_refs.profile_record.value?.public_id || this.props.record_id;
            },

            wallet_subtitle: () => {
                const currency = this.state_refs.profile_record.value?.currency;
                return currency ? `${currency.code.toUpperCase()} — ${currency.name}` : this.content_obj.empty_value_text;
            },

            wallet_status_text: () => {
                return DisplayFormatterUtil.formatLabel(
                    this.state_refs.profile_record.value?.status,
                    this.content_obj.empty_value_text
                );
            },

            wallet_status_badge_class: () => {
                return this.state_refs.profile_record.value?.is_active
                    ? this.class_styles.active_badge_class_style
                    : this.class_styles.inactive_badge_class_style;
            },

            wallet_is_deleted: () => {
                return Boolean(this.state_refs.profile_record.value?.is_deleted);
            },

            information_items: () => {
                const record = this.state_refs.profile_record.value;

                return [
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.public_id_label_text,
                        record?.public_id || "-"
                    ),
                    this.makeItem(
                        "horizontal_filters_svg_icon",
                        this.content_obj.status_label_text,
                        DisplayFormatterUtil.formatLabel(record?.status, this.content_obj.empty_value_text)
                    ),
                    this.makeItem(
                        "check_circle_svg_icon",
                        this.content_obj.active_label_text,
                        record?.is_active ? this.content_obj.active_status_text : this.content_obj.inactive_status_text
                    )
                ];
            },

            balance_items: () => {
                const record = this.state_refs.profile_record.value;
                return [
                    this.makeItem(
                        "dollar_currency_svg_icon",
                        this.content_obj.available_balance_label_text,
                        this.formatAmount(record, record?.available_balance)
                    ),
                    this.makeItem(
                        "padlock_closed_svg_icon",
                        this.content_obj.locked_balance_label_text,
                        this.formatAmount(record, record?.locked_balance)
                    ),
                    this.makeItem(
                        "clock_svg_icon",
                        this.content_obj.pending_balance_label_text,
                        this.formatAmount(record, record?.pending_balance)
                    ),
                    this.makeItem(
                        "arrow_long_down_svg_icon",
                        this.content_obj.refunded_balance_label_text,
                        this.formatAmount(record, record?.refunded_balance)
                    )
                ];
            },

            total_items: () => {
                const record = this.state_refs.profile_record.value;
                return [
                    this.makeItem(
                        "arrow_long_down_svg_icon",
                        this.content_obj.total_credit_label_text,
                        this.formatAmount(record, record?.total_credit)
                    ),
                    this.makeItem(
                        "arrow_long_right_svg_icon",
                        this.content_obj.total_debit_label_text,
                        this.formatAmount(record, record?.total_debit)
                    )
                ];
            },

            currency_items: () => {
                const currency = this.state_refs.profile_record.value?.currency;
                return [
                    this.makeItem(
                        "dollar_currency_svg_icon",
                        this.content_obj.currency_code_label_text,
                        currency?.code?.toUpperCase() || "-"
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.currency_name_label_text,
                        currency?.name || "-"
                    ),
                    this.makeItem(
                        "numbered_list_svg_icon",
                        this.content_obj.currency_precision_label_text,
                        currency?.precision ?? "-"
                    ),
                    this.makeItem(
                        "horizontal_filters_svg_icon",
                        this.content_obj.currency_type_label_text,
                        currency
                            ? currency.is_fiat
                                ? this.content_obj.fiat_type_text
                                : this.content_obj.crypto_type_text
                            : "-"
                    )
                ];
            },

            owner_items: () => {
                const identity = this.state_refs.profile_record.value?.identity;
                return [
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.identity_id_label_text,
                        identity?.public_id || this.props.identity_public_id || "-"
                    ),
                    this.makeItem(
                        "member_icon",
                        this.content_obj.identity_type_label_text,
                        DisplayFormatterUtil.formatLabel(identity?.identity_type, this.content_obj.empty_value_text)
                    ),
                    this.makeItem(
                        "horizontal_filters_svg_icon",
                        this.content_obj.identity_status_label_text,
                        DisplayFormatterUtil.formatLabel(identity?.status, this.content_obj.empty_value_text)
                    )
                ];
            },

            timeline_items: () => {
                const record = this.state_refs.profile_record.value;
                return [
                    this.makeItem(
                        "clock_svg_icon",
                        this.content_obj.created_at_label_text,
                        DisplayFormatterUtil.formatDateTime(record?.created_at, this.content_obj.empty_value_text)
                    ),
                    this.makeItem(
                        "clock_svg_icon",
                        this.content_obj.updated_at_label_text,
                        DisplayFormatterUtil.formatDateTime(record?.updated_at, this.content_obj.empty_value_text)
                    )
                ];
            }
        };
    }
}

export default IdentityWalletProfileViewController;
