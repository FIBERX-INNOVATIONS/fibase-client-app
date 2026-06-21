import { Component, defineComponent, h, PropType } from "vue";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL } from "@/configs";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { TabsUIPropsInterface } from "@ui/version_3/ui_types/tabs_ui_type";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import {
    IdentityAppAccountSummaryInterface,
    IdentityContactSummaryInterface,
    IdentityRecordInterface
} from "@/types/api_service_type";

import {
    IdentityAssociationItemInterface,
    IdentityProfileViewClassStylesInterface,
    IdentityProfileViewComponentsInterface,
    IdentityProfileViewComputedDataInterface,
    IdentityProfileViewStateDataInterface
} from "@/ui_types/identity_profile_view_type";

import {
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import TabsUI from "@ui/version_3/components/TabsUI.vue";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import TabsUIPropsBuilder from "@ui/version_3/props_builder/tabs_ui_props_builder";

import IdentityProfileViewClassStyles from "@/class_styles/identity_profile_view_class_styles";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import IdentityProfileViewActionHandler from "@/action_handlers/identity/profile_view_action_handler";

class IdentityProfileViewController extends BaseProfileViewController<
    IdentityRecordInterface,
    ProfileViewPropsInterface<IdentityRecordInterface>,
    IdentityProfileViewStateDataInterface,
    IdentityProfileViewComputedDataInterface,
    IdentityProfileViewComponentsInterface
> {
    public readonly content_key = "identity";

    public readonly class_styles: IdentityProfileViewClassStylesInterface;

    public action_handler: IdentityProfileViewActionHandler;

    public content_obj = {} as ProfileViewContentTextInterface;

    constructor(props: ProfileViewPropsInterface<IdentityRecordInterface>) {
        super(props, "identity_profile_view", IdentityProfileViewClassStyles);

        this.class_styles = {
            ...IdentityProfileViewClassStyles,
            ...(props.class_styles ?? {})
        } as IdentityProfileViewClassStylesInterface;

        this.action_handler = new IdentityProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
        this.getComponentDefinition();
    }

    // Method to get content value from content manager
    private getContent(key: string, fallback: string): string {
        return this.content_manager.get<string>(key, fallback) ?? fallback;
    }

    // Methdo to get tabs props
    private getTabsProps(): TabsUIPropsInterface {
        const tabs_content_key = `${this.getBaseContentKey()}.tabs`;

        return TabsUIPropsBuilder.getReactivePropsObject(
            "IdentityProfileTabs",
            [
                {
                    tab_key: "profile",
                    slot_name: "profile",
                    label_text: this.getContent(`${tabs_content_key}.profile_tab.label_text`, "Profile"),
                    tab_icon: this.getContent(
                        `${tabs_content_key}.profile_tab.tab_icon`,
                        "identification_card_svg_icon"
                    ) as SVGIconKey
                }
            ],
            {
                data_props: { active_tab_key: "profile" },
                class_styles: this.class_styles.tabs_class_styles
            }
        );
    }

    // Method to get profile value component
    private getProfileValueComponent(): Component {
        const class_styles = this.class_styles;

        return defineComponent({
            name: "IdentityProfileValue",
            props: {
                icon: { type: String as PropType<SVGIconKey>, required: true },
                label: { type: String, required: true },
                value: { type: [String, Number], default: "" }
            },
            setup(value_props) {
                return () =>
                    h("p", { class: class_styles.info_row_class_style }, [
                        h("span", {
                            class: class_styles.icon_class_style,
                            innerHTML: String(getSVGIconValue(value_props.icon) ?? "")
                        }),
                        h("span", { class: class_styles.small_bold_key_text_class_style }, value_props.label),
                        h("span", { class: class_styles.small_bold_value_text_class_style }, value_props.value)
                    ]);
            }
        });
    }

    // Method to get status value component
    private getStatusValueComponent(): Component {
        const class_styles = this.class_styles;

        return defineComponent({
            name: "IdentityStatusValue",
            props: {
                label: { type: String, required: true },
                active: { type: Boolean, required: true },
                trueText: { type: String, required: true },
                falseText: { type: String, required: true },
                activeIsDanger: { type: Boolean, default: false }
            },
            setup(status_props) {
                return () => {
                    const positive_class = status_props.activeIsDanger ? "text-red-600" : "text-green-600";
                    const negative_class = status_props.activeIsDanger ? "text-green-600" : "text-red-600";
                    const status_class = status_props.active ? positive_class : negative_class;

                    return h("p", { class: class_styles.info_row_class_style }, [
                        h("span", {
                            class: [class_styles.icon_class_style, status_class],
                            innerHTML: String(
                                getSVGIconValue(status_props.active ? "check_circle_svg_icon" : "x_circile_svg_icon") ?? ""
                            )
                        }),
                        h("span", { class: class_styles.small_bold_key_text_class_style }, status_props.label),
                        h(
                            "span",
                            {
                                class: [class_styles.small_bold_value_text_class_style, status_class]
                            },
                            status_props.active ? status_props.trueText : status_props.falseText
                        )
                    ]);
                };
            }
        });
    }

    // Method to get content keys for view
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        const base = this.getBaseContentKey();

        return {
            empty_value_text: `${base}.empty_value_text`,
            identity_title_text: `${base}.sections.identity.title_text`,
            public_id_label_text: `${base}.sections.identity.public_id_label_text`,
            identity_type_label_text: `${base}.sections.identity.identity_type_label_text`,
            status_label_text: `${base}.sections.identity.status_label_text`,
            merged_into_label_text: `${base}.sections.identity.merged_into_label_text`,
            access_title_text: `${base}.sections.identity.access_title_text`,
            verified_label_text: `${base}.sections.identity.verified_label_text`,
            verified_status_text: `${base}.sections.identity.verified_status_text`,
            unverified_status_text: `${base}.sections.identity.unverified_status_text`,
            deleted_label_text: `${base}.sections.identity.deleted_label_text`,
            deleted_status_text: `${base}.sections.identity.deleted_status_text`,
            not_deleted_status_text: `${base}.sections.identity.not_deleted_status_text`,
            profile_title_text: `${base}.sections.profile.title_text`,
            name_label_text: `${base}.sections.profile.name_label_text`,
            email_label_text: `${base}.sections.profile.email_label_text`,
            phone_label_text: `${base}.sections.profile.phone_label_text`,
            dob_label_text: `${base}.sections.profile.dob_label_text`,
            gender_label_text: `${base}.sections.profile.gender_label_text`,
            nationality_label_text: `${base}.sections.profile.nationality_label_text`,
            country_label_text: `${base}.sections.profile.country_label_text`,
            completeness_label_text: `${base}.sections.profile.completeness_label_text`,
            source_app_title_text: `${base}.sections.source_app.title_text`,
            app_name_label_text: `${base}.sections.source_app.name_label_text`,
            app_prefix_label_text: `${base}.sections.source_app.prefix_label_text`,
            app_public_id_label_text: `${base}.sections.source_app.public_id_label_text`,
            app_status_label_text: `${base}.sections.source_app.status_label_text`,
            wallet_summary_title_text: `${base}.sections.wallet_summary.title_text`,
            total_wallets_label_text: `${base}.sections.wallet_summary.total_wallets_label_text`,
            active_wallets_label_text: `${base}.sections.wallet_summary.active_wallets_label_text`,
            contacts_title_text: `${base}.sections.contacts.title_text`,
            no_contacts_text: `${base}.sections.contacts.no_record_text`,
            app_accounts_title_text: `${base}.sections.app_accounts.title_text`,
            no_app_accounts_text: `${base}.sections.app_accounts.no_record_text`,
            timeline_title_text: `${base}.sections.timeline.title_text`,
            created_at_label_text: `${base}.sections.timeline.created_at_label_text`,
            updated_at_label_text: `${base}.sections.timeline.updated_at_label_text`
        };
    }

    // Method to get content fall back text
    protected getProfileViewContentFallbacks(): Partial<ProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading identity profile...",
            empty_value_text: "-",
            identity_title_text: "Identity",
            public_id_label_text: "Public ID:",
            identity_type_label_text: "Identity Type:",
            status_label_text: "Status:",
            merged_into_label_text: "Merged Into:",
            access_title_text: "Record State",
            verified_label_text: "Verification:",
            verified_status_text: "Verified",
            unverified_status_text: "Unverified",
            deleted_label_text: "Deleted:",
            deleted_status_text: "Deleted",
            not_deleted_status_text: "Active Record",
            profile_title_text: "Profile",
            name_label_text: "Name:",
            email_label_text: "Email:",
            phone_label_text: "Phone:",
            dob_label_text: "Date of Birth:",
            gender_label_text: "Gender:",
            nationality_label_text: "Nationality:",
            country_label_text: "Country of Residence:",
            completeness_label_text: "Completeness:",
            source_app_title_text: "Primary Source App",
            app_name_label_text: "Name:",
            app_prefix_label_text: "Prefix:",
            app_public_id_label_text: "Public ID:",
            app_status_label_text: "Status:",
            wallet_summary_title_text: "Wallet Summary",
            total_wallets_label_text: "Total Wallets:",
            active_wallets_label_text: "Active Wallets:",
            contacts_title_text: "Contacts",
            no_contacts_text: "No contact information",
            app_accounts_title_text: "App Accounts",
            no_app_accounts_text: "No linked app accounts",
            timeline_title_text: "Timeline",
            created_at_label_text: "Created:",
            updated_at_label_text: "Updated:"
        };
    }

    // Method to get ui components
    protected getUIComponents(): IdentityProfileViewComponentsInterface {
        return {
            ...super.getUIComponents(),
            TabsUI,
            ProfileValue: this.getProfileValueComponent(),
            StatusValue: this.getStatusValueComponent()
        };
    }

    // Method to get state data
    protected getUIStateData(): IdentityProfileViewStateDataInterface {
        const base_state = super.getUIStateData();

        return {
            ...base_state,
            tabs_props: this.getTabsProps()
        };
    }

    // Method to get identity record
    private getIdentityRecord(): IdentityRecordInterface {
        return this.state_refs.profile_record.value;
    }

    // Method to get identity profile from identity record
    private getProfile() {
        const record = this.getIdentityRecord();
        return record?.primary_profile ?? record?.profile;
    }

    // Methdo to get empty value text
    private getEmptyValue(): string {
        return this.content_obj.empty_value_text || "-";
    }

    // Method to get readable date time from date input
    private getReadableDateTime(value?: string | null): string {
        return DisplayFormatterUtil.formatDateTime(value, this.getEmptyValue());
    }

    // Method to get readable date from date input
    private getReadableDate(value?: string | null): string {
        return DisplayFormatterUtil.formatDate(value, this.getEmptyValue());
    }

    // Method to get profile display name
    private getDisplayName(): string {
        const profile = this.getProfile();
        const full_name = [profile?.first_name, profile?.middle_name, profile?.last_name].filter(Boolean).join(" ");

        return profile?.display_name || full_name || this.getIdentityRecord()?.public_id || this.getEmptyValue();
    }

    // Method to get contact items from identity record
    private getContactItems(contacts: IdentityContactSummaryInterface[] = []): IdentityAssociationItemInterface[] {
        return contacts.map((contact) => ({
            key: contact.public_id,
            title: DisplayFormatterUtil.formatLabel(contact.contact_type, this.getEmptyValue()),
            subtitle: contact.contact_value,
            details: [
                contact.source_app?.name ? `Source: ${contact.source_app.name}` : "",
                contact.verified_at ? `Verified: ${this.getReadableDateTime(contact.verified_at)}` : ""
            ].filter(Boolean),
            status: contact.is_verified ? "Verified" : "Unverified",
            is_active: contact.is_verified
        }));
    }

    // Method to get app account items
    private getAppAccountItems(accounts: IdentityAppAccountSummaryInterface[] = []): IdentityAssociationItemInterface[] {
        return accounts.map((account) => ({
            key: account.public_id,
            title: account.registered_app?.name || account.external_username || account.public_id,
            subtitle: account.external_username || account.external_public_id || account.external_member_id,
            details: [
                `Account ID: ${account.public_id}`,
                `External status: ${DisplayFormatterUtil.formatLabel(account.external_status, this.getEmptyValue())}`,
                account.last_seen_at ? `Last seen: ${this.getReadableDateTime(account.last_seen_at)}` : ""
            ].filter(Boolean),
            status: account.is_deleted ? "Deleted" : account.is_active ? "Active" : "Inactive",
            is_active: account.is_active && !account.is_deleted
        }));
    }

    // Method to get ui computed data
    protected getUIComputedData(): ComputedDefinitionType<IdentityProfileViewComputedDataInterface> {
        return {
            loading_icon_html: () => String(getSVGIconValue("loading_svg_icon") ?? ""),
            identity_display_name: () => this.getDisplayName(),
            identity_public_id_text: () => this.getIdentityRecord()?.public_id || this.getEmptyValue(),
            identity_type_text: () =>
                DisplayFormatterUtil.formatLabel(this.getIdentityRecord()?.identity_type, this.getEmptyValue()),
            profile_status_text: () => DisplayFormatterUtil.formatLabel(this.getIdentityRecord()?.status, this.getEmptyValue()),
            profile_status_badge_class: () =>
                this.getIdentityRecord()?.status?.toLowerCase() === "active"
                    ? this.class_styles.active_badge_class_style
                    : this.class_styles.inactive_badge_class_style,
            profile_is_deleted: () => !!this.getIdentityRecord()?.is_deleted,
            profile_image_props: () => ({
                id: this.props.record_id,
                src: this.getProfile()?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL,
                alt_text: `${this.getDisplayName()} profile photo`,
                class_styles: this.class_styles.image_info_class_style
            }),
            identity_information_items: () => {
                const record = this.getIdentityRecord();
                return [
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.public_id_label_text,
                        value: record?.public_id || this.getEmptyValue()
                    },
                    {
                        icon: "member_icon",
                        label: this.content_obj.identity_type_label_text,
                        value: DisplayFormatterUtil.formatLabel(record?.identity_type, this.getEmptyValue())
                    },
                    {
                        icon: "check_circle_svg_icon",
                        label: this.content_obj.status_label_text,
                        value: DisplayFormatterUtil.formatLabel(record?.status, this.getEmptyValue())
                    },
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.merged_into_label_text,
                        value: record?.merged_into_identity_public_id || this.getEmptyValue()
                    }
                ];
            },
            access_status_items: () => {
                const record = this.getIdentityRecord();
                return [
                    {
                        label: this.content_obj.verified_label_text,
                        active: !!record?.is_verified,
                        trueText: this.content_obj.verified_status_text,
                        falseText: this.content_obj.unverified_status_text
                    },
                    {
                        label: this.content_obj.deleted_label_text,
                        active: !!record?.is_deleted,
                        trueText: this.content_obj.deleted_status_text,
                        falseText: this.content_obj.not_deleted_status_text,
                        activeIsDanger: true
                    }
                ];
            },
            profile_information_items: () => {
                const profile = this.getProfile();
                return [
                    {
                        icon: "member_icon",
                        label: this.content_obj.name_label_text,
                        value: this.getDisplayName()
                    },
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.email_label_text,
                        value: profile?.primary_email || this.getEmptyValue()
                    },
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.phone_label_text,
                        value: profile?.primary_phone || this.getEmptyValue()
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.dob_label_text,
                        value: this.getReadableDate(profile?.dob)
                    },
                    {
                        icon: "members_svg_icon",
                        label: this.content_obj.gender_label_text,
                        value: DisplayFormatterUtil.formatLabel(profile?.gender, this.getEmptyValue())
                    },
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.nationality_label_text,
                        value: profile?.nationality || this.getEmptyValue()
                    },
                    {
                        icon: "home_svg_icon",
                        label: this.content_obj.country_label_text,
                        value: profile?.country_of_residence || this.getEmptyValue()
                    },
                    {
                        icon: "numbered_list_svg_icon",
                        label: this.content_obj.completeness_label_text,
                        value:
                            profile?.profile_completeness_score !== undefined
                                ? `${profile.profile_completeness_score}%`
                                : this.getEmptyValue()
                    }
                ];
            },
            source_app_items: () => {
                const app = this.getIdentityRecord()?.primary_source_app;
                return [
                    {
                        icon: "square_grid_plus_svg_icon",
                        label: this.content_obj.app_name_label_text,
                        value: app?.name || this.getEmptyValue()
                    },
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.app_prefix_label_text,
                        value: app?.prefix || this.getEmptyValue()
                    },
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.app_public_id_label_text,
                        value: app?.public_id || this.getEmptyValue()
                    },
                    {
                        icon: "check_circle_svg_icon",
                        label: this.content_obj.app_status_label_text,
                        value: app ? (app.is_active ? "Active" : "Inactive") : this.getEmptyValue()
                    }
                ];
            },
            wallet_summary_items: () => {
                const record = this.getIdentityRecord();
                const summary = record?.wallets_summary;
                return [
                    {
                        icon: "numbered_list_svg_icon",
                        label: this.content_obj.total_wallets_label_text,
                        value: summary?.total_wallets ?? record?.wallet_count ?? 0
                    },
                    {
                        icon: "check_circle_svg_icon",
                        label: this.content_obj.active_wallets_label_text,
                        value: summary?.active_wallets ?? this.getEmptyValue()
                    }
                ];
            },
            timeline_items: () => {
                const record = this.getIdentityRecord();
                return [
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.created_at_label_text,
                        value: this.getReadableDateTime(record?.created_at)
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.updated_at_label_text,
                        value: this.getReadableDateTime(record?.updated_at)
                    }
                ];
            },
            contact_items: () => this.getContactItems(this.getIdentityRecord()?.contacts ?? []),
            app_account_items: () => this.getAppAccountItems(this.getIdentityRecord()?.app_accounts ?? [])
        };
    }
}

export default IdentityProfileViewController;
