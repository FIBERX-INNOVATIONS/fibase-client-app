import { Component, defineComponent, h, PropType } from "vue";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { TabsUIPropsInterface } from "@ui/version_3/ui_types/tabs_ui_type";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { TransactionRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import {
    TransactionProfileValueItemInterface,
    TransactionProfileViewComponentsInterface,
    TransactionProfileViewComputedDataInterface,
    TransactionProfileViewStateDataInterface
} from "@/ui_types/transaction_profile_view_type";

import { IdentityProfileViewClassStylesInterface } from "@/ui_types/identity_profile_view_type";

import TabsUI from "@ui/version_3/components/TabsUI.vue";

import TabsUIPropsBuilder from "@ui/version_3/props_builder/tabs_ui_props_builder";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import TransactionProfileViewClassStyles from "@/class_styles/transaction_profile_view_class_styles";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import TransactionProfileViewActionHandler from "@/action_handlers/transaction/profile_view_action_handler";

class TransactionProfileViewController extends BaseProfileViewController<
    TransactionRecordInterface,
    ProfileViewPropsInterface<TransactionRecordInterface>,
    TransactionProfileViewStateDataInterface,
    TransactionProfileViewComputedDataInterface,
    TransactionProfileViewComponentsInterface
> {
    public readonly content_key = "transaction";

    public readonly class_styles: IdentityProfileViewClassStylesInterface;

    public action_handler: TransactionProfileViewActionHandler;

    public content_obj = {} as ProfileViewContentTextInterface;

    // Method to initialise the tabbed transaction profile and detail action handler.
    constructor(props: ProfileViewPropsInterface<TransactionRecordInterface>) {
        super(props, "transaction_profile_view", TransactionProfileViewClassStyles);

        this.class_styles = {
            ...TransactionProfileViewClassStyles,
            ...(props.class_styles ?? {})
        } as IdentityProfileViewClassStylesInterface;
        this.action_handler = new TransactionProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    // Method to get content text with a local fallback.
    private getContent(key: string, fallback: string): string {
        return this.content_manager.get<string>(key, fallback) ?? fallback;
    }

    // Method to configure profile and receipts tabs while keeping profile active initially.
    private getTabsProps(): TabsUIPropsInterface {
        const base = `${this.getBaseContentKey()}.tabs`;

        return TabsUIPropsBuilder.getReactivePropsObject(
            "TransactionProfileTabs",
            [
                {
                    tab_key: "profile",
                    slot_name: "profile",
                    label_text: this.getContent(`${base}.profile_tab.label_text`, "Profile"),
                    tab_icon: this.getContent(`${base}.profile_tab.tab_icon`, "view_eye_svg_icon") as SVGIconKey
                },
                {
                    tab_key: "receipts",
                    slot_name: "receipts",
                    label_text: this.getContent(`${base}.receipts_tab.label_text`, "Receipts"),
                    tab_icon: this.getContent(`${base}.receipts_tab.tab_icon`, "identification_card_svg_icon") as SVGIconKey
                }
            ],
            {
                data_props: { active_tab_key: "profile" },
                class_styles: this.class_styles.tabs_class_styles
            }
        );
    }

    // Method to map transaction profile copy to content-resource keys.
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        const base = this.getBaseContentKey();

        return {
            empty_value_text: `${base}.empty_value_text`,
            fallback_name_text: `${base}.header.fallback_name_text`,
            public_id_label_text: `${base}.header.public_id_label_text`,
            amounts_title_text: `${base}.sections.amounts.title_text`,
            amount_label_text: `${base}.sections.amounts.amount_label_text`,
            fee_amount_label_text: `${base}.sections.amounts.fee_amount_label_text`,
            net_amount_label_text: `${base}.sections.amounts.net_amount_label_text`,
            currency_label_text: `${base}.sections.amounts.currency_label_text`,
            references_title_text: `${base}.sections.references.title_text`,
            app_reference_label_text: `${base}.sections.references.app_reference_label_text`,
            provider_reference_label_text: `${base}.sections.references.provider_reference_label_text`,
            external_reference_label_text: `${base}.sections.references.external_reference_label_text`,
            parties_title_text: `${base}.sections.parties.title_text`,
            initiated_by_label_text: `${base}.sections.parties.initiated_by_label_text`,
            source_identity_label_text: `${base}.sections.parties.source_identity_label_text`,
            source_wallet_label_text: `${base}.sections.parties.source_wallet_label_text`,
            destination_identity_label_text: `${base}.sections.parties.destination_identity_label_text`,
            destination_wallet_label_text: `${base}.sections.parties.destination_wallet_label_text`,
            external_destination_label_text: `${base}.sections.parties.external_destination_label_text`,
            processing_title_text: `${base}.sections.processing.title_text`,
            app_label_text: `${base}.sections.processing.app_label_text`,
            provider_label_text: `${base}.sections.processing.provider_label_text`,
            payment_method_label_text: `${base}.sections.processing.payment_method_label_text`,
            provider_account_label_text: `${base}.sections.processing.provider_account_label_text`,
            description_title_text: `${base}.sections.description.title_text`,
            description_label_text: `${base}.sections.description.description_label_text`,
            reason_label_text: `${base}.sections.description.reason_label_text`,
            relationship_title_text: `${base}.sections.relationship.title_text`,
            parent_transaction_label_text: `${base}.sections.relationship.parent_transaction_label_text`,
            current_receipt_label_text: `${base}.sections.relationship.current_receipt_label_text`,
            timeline_title_text: `${base}.sections.timeline.title_text`,
            created_at_label_text: `${base}.sections.timeline.created_at_label_text`,
            updated_at_label_text: `${base}.sections.timeline.updated_at_label_text`,
            initiated_at_label_text: `${base}.sections.timeline.initiated_at_label_text`,
            authorized_at_label_text: `${base}.sections.timeline.authorized_at_label_text`,
            settled_at_label_text: `${base}.sections.timeline.settled_at_label_text`,
            failed_at_label_text: `${base}.sections.timeline.failed_at_label_text`,
            cancelled_at_label_text: `${base}.sections.timeline.cancelled_at_label_text`,
            reversed_at_label_text: `${base}.sections.timeline.reversed_at_label_text`,
            refunded_at_label_text: `${base}.sections.timeline.refunded_at_label_text`,
            receipts_coming_soon_text: `${base}.receipts_view.coming_soon_text`
        };
    }

    // Method to provide readable transaction profile fallbacks.
    protected getProfileViewContentFallbacks(): Partial<ProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading transaction details...",
            empty_value_text: "-",
            fallback_name_text: "Transaction",
            public_id_label_text: "Transaction ID",
            amounts_title_text: "Amounts",
            amount_label_text: "Amount",
            fee_amount_label_text: "Fee",
            net_amount_label_text: "Net Amount",
            currency_label_text: "Currency",
            references_title_text: "References",
            app_reference_label_text: "App Reference",
            provider_reference_label_text: "Provider Reference",
            external_reference_label_text: "External Reference",
            parties_title_text: "Parties",
            initiated_by_label_text: "Initiated By",
            source_identity_label_text: "Source Identity",
            source_wallet_label_text: "Source Wallet",
            destination_identity_label_text: "Destination Identity",
            destination_wallet_label_text: "Destination Wallet",
            external_destination_label_text: "External Destination",
            processing_title_text: "Processing",
            app_label_text: "App",
            provider_label_text: "Provider",
            payment_method_label_text: "Payment Method",
            provider_account_label_text: "Provider Account",
            description_title_text: "Description",
            description_label_text: "Description",
            reason_label_text: "Reason",
            relationship_title_text: "Related Records",
            parent_transaction_label_text: "Parent Transaction",
            current_receipt_label_text: "Current Receipt",
            timeline_title_text: "Timeline",
            created_at_label_text: "Created",
            updated_at_label_text: "Updated",
            initiated_at_label_text: "Initiated",
            authorized_at_label_text: "Authorized",
            settled_at_label_text: "Settled",
            failed_at_label_text: "Failed",
            cancelled_at_label_text: "Cancelled",
            reversed_at_label_text: "Reversed",
            refunded_at_label_text: "Refunded",
            receipts_coming_soon_text: "Receipt history will be added in the next module slice."
        };
    }

    // Method to expose tabs alongside shared profile components.
    protected getUIComponents(): TransactionProfileViewComponentsInterface {
        const base_components = super.getUIComponents();

        return {
            ...base_components,
            TabsUI,
            ProfileSection: this.getProfileSectionComponent(base_components.ProfileValue)
        };
    }

    // Method to build a reusable transaction profile section component.
    private getProfileSectionComponent(profile_value_component: Component): Component {
        const class_styles = this.class_styles;

        return defineComponent({
            name: "TransactionProfileSection",
            props: {
                title: { type: String, required: true },
                items: {
                    type: Array as PropType<TransactionProfileValueItemInterface[]>,
                    default: () => {
                        return [];
                    }
                }
            },
            // Method to render a titled group of transaction profile values.
            setup(section_props) {
                return () => {
                    return h("section", { class: class_styles.grid_class_style?.grid_wrapper_class_style }, [
                        h("h4", { class: class_styles.small_bold_underlined_text_class_style }, section_props.title),
                        ...section_props.items.map((item) => {
                            return h(profile_value_component, { key: item.label, ...item });
                        })
                    ]);
                };
            }
        });
    }

    // Method to initialise the transaction profile tab state.
    protected getUIStateData(): TransactionProfileViewStateDataInterface {
        return {
            ...super.getUIStateData(),
            tabs_props: this.getTabsProps()
        };
    }

    // Method to get the latest transaction detail record.
    private getRecord(): TransactionRecordInterface {
        return this.state_refs.profile_record.value;
    }

    // Method to get the configured empty display value.
    private getEmptyValue(): string {
        return this.content_obj.empty_value_text || "-";
    }

    // Method to create a consistently shaped profile value row.
    private makeItem(icon: SVGIconKey, label: string, value: string | number): TransactionProfileValueItemInterface {
        return { icon, label, value };
    }

    // Method to format an amount with the transaction currency projection.
    private formatAmount(value?: number): string {
        return DisplayFormatterUtil.formatCurrencyAmount(value, {
            precision: this.getRecord()?.currency?.precision,
            symbol: this.getRecord()?.currency?.symbol,
            empty_value: this.getEmptyValue()
        });
    }

    // Method to format a linked provider-style record.
    private formatLinkedRecord(
        record?: { name?: string; code?: string; public_id?: string; account_reference?: string | null } | null
    ): string {
        return record?.name || record?.code || record?.account_reference || record?.public_id || this.getEmptyValue();
    }

    // Method to format the initiating actor in priority order.
    private getInitiatedByText(): string {
        const record = this.getRecord();
        const member = record?.initiated_by_member;
        const member_name = [member?.first_name, member?.last_name].filter(Boolean).join(" ");

        return (
            record?.initiated_by_identity?.public_id ||
            member?.full_name ||
            member_name ||
            member?.email ||
            record?.initiated_by_app?.name ||
            this.getEmptyValue()
        );
    }

    // Method to format external destination information safely for display.
    private getExternalDestinationText(): string {
        const record = this.getRecord();
        const destination = record?.external_destination_snapshot ?? record?.destination_external_account;

        if (!destination) return this.getEmptyValue();

        return String(destination.name ?? destination.account_name ?? destination.reference ?? JSON.stringify(destination));
    }

    // Method to get a string property from a generic related record.
    private getRelatedRecordValue(record: Record<string, unknown> | null | undefined, key: string): string {
        const value = record?.[key];
        return typeof value === "string" || typeof value === "number" ? String(value) : this.getEmptyValue();
    }

    // Method to derive transaction profile sections from the fetched detail record.
    protected getUIComputedData(): ComputedDefinitionType<TransactionProfileViewComputedDataInterface> {
        return {
            loading_icon_html: () => String(getSVGIconValue("loading_svg_icon") ?? ""),
            transaction_title: () => this.getRecord()?.public_id || this.content_obj.fallback_name_text,
            transaction_subtitle: () =>
                `${DisplayFormatterUtil.formatLabel(this.getRecord()?.transaction_type)} / ${DisplayFormatterUtil.formatLabel(this.getRecord()?.direction)}`,
            status_text: () => DisplayFormatterUtil.formatLabel(this.getRecord()?.status, this.getEmptyValue()),
            status_badge_class: () => {
                const status = this.getRecord()?.status?.toLowerCase();
                return ["settled", "completed", "successful"].includes(status ?? "")
                    ? this.class_styles.active_badge_class_style
                    : this.class_styles.inactive_badge_class_style;
            },
            amount_items: () => {
                const record = this.getRecord();
                return [
                    this.makeItem(
                        "dollar_currency_svg_icon",
                        this.content_obj.amount_label_text,
                        this.formatAmount(record?.amount)
                    ),
                    this.makeItem(
                        "dollar_currency_svg_icon",
                        this.content_obj.fee_amount_label_text,
                        this.formatAmount(record?.fee_amount)
                    ),
                    this.makeItem(
                        "dollar_currency_svg_icon",
                        this.content_obj.net_amount_label_text,
                        this.formatAmount(record?.net_amount)
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.currency_label_text,
                        record?.currency
                            ? `${record.currency.code.toUpperCase()} — ${record.currency.name}`
                            : this.getEmptyValue()
                    )
                ];
            },
            reference_items: () => {
                const record = this.getRecord();
                return [
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.public_id_label_text,
                        record?.public_id || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.app_reference_label_text,
                        record?.app_reference || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.provider_reference_label_text,
                        record?.provider_reference || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.external_reference_label_text,
                        record?.external_reference || this.getEmptyValue()
                    )
                ];
            },
            party_items: () => {
                const record = this.getRecord();
                return [
                    this.makeItem("member_icon", this.content_obj.initiated_by_label_text, this.getInitiatedByText()),
                    this.makeItem(
                        "member_icon",
                        this.content_obj.source_identity_label_text,
                        record?.source_identity?.public_id || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "wallet_svg_icon",
                        this.content_obj.source_wallet_label_text,
                        record?.source_wallet?.public_id || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "member_icon",
                        this.content_obj.destination_identity_label_text,
                        record?.destination_identity?.public_id || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "wallet_svg_icon",
                        this.content_obj.destination_wallet_label_text,
                        record?.destination_wallet?.public_id || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.external_destination_label_text,
                        this.getExternalDestinationText()
                    )
                ];
            },
            processing_items: () => {
                const record = this.getRecord();
                return [
                    this.makeItem(
                        "rectangle_window_group_svg_icon",
                        this.content_obj.app_label_text,
                        record?.app?.name || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "payment_providers_svg_icon",
                        this.content_obj.provider_label_text,
                        this.formatLinkedRecord(record?.provider)
                    ),
                    this.makeItem(
                        "payment_methods_svg_icon",
                        this.content_obj.payment_method_label_text,
                        this.formatLinkedRecord(record?.payment_method)
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.provider_account_label_text,
                        this.formatLinkedRecord(record?.identity_provider_account)
                    )
                ];
            },
            relationship_items: () => {
                const record = this.getRecord();
                return [
                    this.makeItem(
                        "chain_link_svg_icon",
                        this.content_obj.parent_transaction_label_text,
                        record?.parent_transaction?.public_id || record?.parent_transaction_public_id || this.getEmptyValue()
                    ),
                    this.makeItem(
                        "identification_card_svg_icon",
                        this.content_obj.current_receipt_label_text,
                        this.getRelatedRecordValue(record?.current_receipt, "public_id")
                    )
                ];
            },
            timeline_items: () => {
                const record = this.getRecord();
                return [
                    [this.content_obj.created_at_label_text, record?.created_at],
                    [this.content_obj.updated_at_label_text, record?.updated_at],
                    [this.content_obj.initiated_at_label_text, record?.initiated_at],
                    [this.content_obj.authorized_at_label_text, record?.authorized_at],
                    [this.content_obj.settled_at_label_text, record?.settled_at],
                    [this.content_obj.failed_at_label_text, record?.failed_at],
                    [this.content_obj.cancelled_at_label_text, record?.cancelled_at],
                    [this.content_obj.reversed_at_label_text, record?.reversed_at],
                    [this.content_obj.refunded_at_label_text, record?.refunded_at]
                ].map(([label, value]) =>
                    this.makeItem(
                        "clock_svg_icon",
                        String(label),
                        DisplayFormatterUtil.formatDateTime(value, this.getEmptyValue())
                    )
                );
            }
        };
    }
}

export default TransactionProfileViewController;
