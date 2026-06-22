import { DEFAULT_MEMBER_PROFILE_PHOTO_URL } from "@/configs";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { TabsUIPropsInterface } from "@ui/version_3/ui_types/tabs_ui_type";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { MemberProfileProfileViewClassStylesInterface } from "@/ui_types/member_profile_profile_view_type";

import { ActorRoleInterface, MemberRecordInterface, getMemberFullName } from "@/types/api_service_type";

import {
    MemberProfileViewComponentsInterface,
    MemberProfileViewComputedDataInterface,
    MemberProfileViewStateDataInterface,
    MemberRoleChipInterface,
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import TabsUI from "@ui/version_3/components/TabsUI.vue";

import MemberDevicesView from "@/views/member_profile/MemberDevicesView.vue";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import TabsUIPropsBuilder from "@ui/version_3/props_builder/tabs_ui_props_builder";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import MemberProfileProfileViewClassStyles from "@/class_styles/member_profile_profile_view_class_styles";

import MemberProfileViewActionHandler from "@/action_handlers/member_profile/profile_view_action_handler";

class MemberProfileProfileViewController extends BaseProfileViewController<
    MemberRecordInterface,
    ProfileViewPropsInterface<MemberRecordInterface>,
    MemberProfileViewStateDataInterface,
    MemberProfileViewComputedDataInterface,
    MemberProfileViewComponentsInterface
> {
    public readonly content_key: string = "member_profile";

    public action_handler: MemberProfileViewActionHandler;

    public readonly class_styles: MemberProfileProfileViewClassStylesInterface;

    public content_obj: ProfileViewContentTextInterface = {} as ProfileViewContentTextInterface;

    constructor(props: ProfileViewPropsInterface<MemberRecordInterface>) {
        super(props, "member_profile_profile_view", MemberProfileProfileViewClassStyles);

        this.class_styles = {
            ...MemberProfileProfileViewClassStyles,
            ...(props.class_styles ?? {})
        } as MemberProfileProfileViewClassStylesInterface;

        this.action_handler = new MemberProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);

        this.getComponentDefinition();
    }

    // Method to get content
    private getContent(key: string, fallback: string): string {
        return this.content_manager.get<string>(key, fallback) ?? fallback;
    }

    // Method to get tabs props
    private getTabsProps(): TabsUIPropsInterface {
        const tabs_content_key = `${this.getBaseContentKey()}.tabs`;

        return TabsUIPropsBuilder.getReactivePropsObject(
            "MemberProfileProfileTabs",
            [
                {
                    tab_key: "profile",
                    slot_name: "profile",
                    label_text: this.getContent(`${tabs_content_key}.profile_tab.label_text`, "Profile"),
                    tab_icon: this.getContent(`${tabs_content_key}.profile_tab.tab_icon`, "member_icon") as SVGIconKey
                },
                {
                    tab_key: "devices",
                    slot_name: "devices",
                    label_text: this.getContent(`${tabs_content_key}.devices_tab.label_text`, "Devices"),
                    tab_icon: this.getContent(
                        `${tabs_content_key}.devices_tab.tab_icon`,
                        "identification_card_svg_icon"
                    ) as SVGIconKey
                }
            ],
            {
                data_props: {
                    active_tab_key: "profile"
                },
                class_styles: this.class_styles.tabs_class_styles
            }
        );
    }

    // Method to get empty value content
    private getEmptyValue(): string {
        return this.content_obj.empty_value_text;
    }

    // Method to retrun a readable date format
    private getReadableDate(value?: string | Date | null): string {
        return DisplayFormatterUtil.formatDate(value, this.getEmptyValue());
    }

    // Method to retrun a readable date time format
    private getReadableDateTime(value?: string | Date | null): string {
        return DisplayFormatterUtil.formatDateTime(value, this.getEmptyValue());
    }

    // Method to get child profile props
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            empty_value_text: `${base_content_key}.empty_value_text`,
            member_photo_alt_text: `${base_content_key}.header.member_photo_alt_text`,
            username_label_text: `${base_content_key}.header.username_label_text`,
            email_label_text: `${base_content_key}.header.email_label_text`,
            personal_information_title_text: `${base_content_key}.sections.personal_information.title_text`,
            public_id_label_text: `${base_content_key}.sections.personal_information.public_id_label_text`,
            first_name_label_text: `${base_content_key}.sections.personal_information.first_name_label_text`,
            last_name_label_text: `${base_content_key}.sections.personal_information.last_name_label_text`,
            phone_label_text: `${base_content_key}.sections.personal_information.phone_label_text`,
            gender_label_text: `${base_content_key}.sections.personal_information.gender_label_text`,
            dob_label_text: `${base_content_key}.sections.personal_information.dob_label_text`,
            access_status_title_text: `${base_content_key}.sections.access_status.title_text`,
            active_label_text: `${base_content_key}.sections.access_status.active_label_text`,
            active_status_text: `${base_content_key}.sections.access_status.active_status_text`,
            inactive_status_text: `${base_content_key}.sections.access_status.inactive_status_text`,
            verified_label_text: `${base_content_key}.sections.access_status.verified_label_text`,
            verified_status_text: `${base_content_key}.sections.access_status.verified_status_text`,
            unverified_status_text: `${base_content_key}.sections.access_status.unverified_status_text`,
            two_factor_label_text: `${base_content_key}.sections.access_status.two_factor_label_text`,
            enabled_status_text: `${base_content_key}.sections.access_status.enabled_status_text`,
            disabled_status_text: `${base_content_key}.sections.access_status.disabled_status_text`,
            locked_label_text: `${base_content_key}.sections.access_status.locked_label_text`,
            locked_status_text: `${base_content_key}.sections.access_status.locked_status_text`,
            unlocked_status_text: `${base_content_key}.sections.access_status.unlocked_status_text`,
            deleted_label_text: `${base_content_key}.sections.access_status.deleted_label_text`,
            deleted_status_text: `${base_content_key}.sections.access_status.deleted_status_text`,
            not_deleted_status_text: `${base_content_key}.sections.access_status.not_deleted_status_text`,
            auth_information_title_text: `${base_content_key}.sections.auth_information.title_text`,
            login_attempts_label_text: `${base_content_key}.sections.auth_information.login_attempts_label_text`,
            account_locked_until_label_text: `${base_content_key}.sections.auth_information.account_locked_until_label_text`,
            password_changed_at_label_text: `${base_content_key}.sections.auth_information.password_changed_at_label_text`,
            last_password_reset_request_at_label_text: `${base_content_key}.sections.auth_information.last_password_reset_request_at_label_text`,
            roles_title_text: `${base_content_key}.sections.roles.title_text`,
            no_roles_text: `${base_content_key}.sections.roles.no_roles_text`,
            timeline_title_text: `${base_content_key}.sections.timeline.title_text`,
            created_label_text: `${base_content_key}.sections.timeline.created_label_text`,
            updated_label_text: `${base_content_key}.sections.timeline.updated_label_text`,
            last_login_at_label_text: `${base_content_key}.sections.timeline.last_login_at_label_text`,
            last_activity_at_label_text: `${base_content_key}.sections.timeline.last_activity_at_label_text`,
            recent_activity_count_label_text: `${base_content_key}.sections.timeline.recent_activity_count_label_text`
        };
    }

    // Method to get profile view content fall back
    protected getProfileViewContentFallbacks(): Partial<ProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading member profile...",
            no_description_text: "",
            empty_value_text: "-",
            member_photo_alt_text: "Member profile photo",
            username_label_text: "Username:",
            email_label_text: "Email:",
            personal_information_title_text: "Profile",
            public_id_label_text: "Public ID:",
            first_name_label_text: "First Name:",
            last_name_label_text: "Last Name:",
            phone_label_text: "Phone:",
            gender_label_text: "Gender:",
            dob_label_text: "Date of Birth:",
            access_status_title_text: "Access",
            active_label_text: "Status:",
            active_status_text: "Active",
            inactive_status_text: "Inactive",
            verified_label_text: "Verification:",
            verified_status_text: "Verified",
            unverified_status_text: "Unverified",
            two_factor_label_text: "2FA:",
            enabled_status_text: "Enabled",
            disabled_status_text: "Disabled",
            locked_label_text: "Lock:",
            locked_status_text: "Locked",
            unlocked_status_text: "Unlocked",
            deleted_label_text: "Deleted:",
            deleted_status_text: "Deleted",
            not_deleted_status_text: "Not Deleted",
            auth_information_title_text: "Authentication",
            login_attempts_label_text: "Login Attempts:",
            account_locked_until_label_text: "Locked Until:",
            password_changed_at_label_text: "Password Changed:",
            last_password_reset_request_at_label_text: "Last Reset Request:",
            roles_title_text: "Roles",
            no_roles_text: "No roles assigned",
            timeline_title_text: "Timeline",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            last_login_at_label_text: "Last Login:",
            last_activity_at_label_text: "Last Activity:",
            recent_activity_count_label_text: "Recent Activity Count:"
        };
    }

    // Method to get ui components
    protected getUIComponents(): MemberProfileViewComponentsInterface {
        return {
            ...super.getUIComponents(),
            TabsUI,
            MemberDevicesView
        };
    }

    // Method to get ui state data
    protected getUIStateData(): MemberProfileViewStateDataInterface {
        const base_state = super.getUIStateData();

        return {
            ...base_state,
            content_text: this.content_obj,
            tabs_props: this.getTabsProps()
        };
    }

    // Method to get member record
    private getMemberRecord(): MemberRecordInterface {
        return this.state_refs.profile_record.value;
    }

    // Method to get ui compyted data
    protected getUIComputedData(): ComputedDefinitionType<MemberProfileViewComputedDataInterface> {
        return {
            loading_icon_html: () => String(getSVGIconValue("loading_svg_icon") ?? ""),

            profile_photo_url: () => {
                return this.getMemberRecord()?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            member_full_name: () => {
                const record = this.getMemberRecord();
                return record?.full_name || getMemberFullName(record) || this.getEmptyValue();
            },

            display_username: () => {
                const username = this.getMemberRecord()?.username || this.getEmptyValue();
                return `${this.content_obj.username_label_text} ${username}`;
            },

            display_email: () => {
                const email = this.getMemberRecord()?.email || this.getEmptyValue();
                return `${this.content_obj.email_label_text} ${email}`;
            },

            profile_status_badge_class: () => {
                return this.getMemberRecord()?.is_active
                    ? this.class_styles.active_badge_class_style
                    : this.class_styles.inactive_badge_class_style;
            },

            profile_status_text: () => {
                return this.getMemberRecord()?.is_active
                    ? this.content_obj.active_status_text
                    : this.content_obj.inactive_status_text;
            },

            profile_is_deleted: () => !!this.getMemberRecord()?.is_deleted,

            profile_image_props: () => ({
                id: this.props.record_id.toString(),
                src: this.computed_refs.profile_photo_url.value,
                alt_text: this.content_obj.member_photo_alt_text,
                class_styles: this.class_styles.image_info_class_style
            }),

            member_devices_props: () => ({
                member_public_id: this.getMemberRecord()?.public_id || this.props.record_id,
                class_styles: this.class_styles
            }),

            personal_information_items: () => {
                const record = this.getMemberRecord();

                return [
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.public_id_label_text,
                        value: record?.public_id || this.getEmptyValue()
                    },
                    {
                        icon: "member_icon",
                        label: this.content_obj.first_name_label_text,
                        value: record?.first_name || this.getEmptyValue()
                    },
                    {
                        icon: "member_icon",
                        label: this.content_obj.last_name_label_text,
                        value: record?.last_name || this.getEmptyValue()
                    },
                    {
                        icon: "identification_card_svg_icon",
                        label: this.content_obj.phone_label_text,
                        value: record?.phone || this.getEmptyValue()
                    },
                    {
                        icon: "members_svg_icon",
                        label: this.content_obj.gender_label_text,
                        value: record?.gender || this.getEmptyValue()
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.dob_label_text,
                        value: this.getReadableDate(record?.dob)
                    }
                ];
            },

            access_status_items: () => {
                const record = this.getMemberRecord();

                return [
                    {
                        label: this.content_obj.active_label_text,
                        active: !!record?.is_active,
                        trueText: this.content_obj.active_status_text,
                        falseText: this.content_obj.inactive_status_text
                    },
                    {
                        label: this.content_obj.verified_label_text,
                        active: !!record?.is_verified,
                        trueText: this.content_obj.verified_status_text,
                        falseText: this.content_obj.unverified_status_text
                    },
                    {
                        label: this.content_obj.two_factor_label_text,
                        active: !!record?.is_2fa_enabled,
                        trueText: this.content_obj.enabled_status_text,
                        falseText: this.content_obj.disabled_status_text
                    },
                    {
                        label: this.content_obj.locked_label_text,
                        active: !!record?.is_locked,
                        trueText: this.content_obj.locked_status_text,
                        falseText: this.content_obj.unlocked_status_text,
                        activeIsDanger: true
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

            auth_information_items: () => {
                const member_auth = this.getMemberRecord()?.member_auth;

                return [
                    {
                        icon: "padlock_closed_svg_icon",
                        label: this.content_obj.login_attempts_label_text,
                        value: member_auth?.login_attempts ?? this.getEmptyValue()
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.account_locked_until_label_text,
                        value: this.getReadableDateTime(member_auth?.account_locked_until)
                    },
                    {
                        icon: "key_svg_icon",
                        label: this.content_obj.password_changed_at_label_text,
                        value: this.getReadableDateTime(member_auth?.password_changed_at)
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.last_password_reset_request_at_label_text,
                        value: this.getReadableDateTime(member_auth?.last_password_reset_request_at)
                    }
                ];
            },

            timeline_items: () => {
                const record = this.getMemberRecord();

                return [
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.created_label_text,
                        value: this.getReadableDateTime(record?.created_at)
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.updated_label_text,
                        value: this.getReadableDateTime(record?.updated_at)
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.last_login_at_label_text,
                        value: this.getReadableDateTime(record?.last_login_at)
                    },
                    {
                        icon: "clock_svg_icon",
                        label: this.content_obj.last_activity_at_label_text,
                        value: this.getReadableDateTime(record?.last_activity_at)
                    },
                    {
                        icon: "numbered_list_svg_icon",
                        label: this.content_obj.recent_activity_count_label_text,
                        value: InputTransformerUtil.nFormatter(record?.recent_activity_count) ?? this.getEmptyValue()
                    }
                ];
            },

            member_role_items: () => {
                const record = this.getMemberRecord();
                const flat_roles = record?.roles ?? [];
                const actor_roles = record?.actor_roles?.map((actor_role) => actor_role.role) ?? [];
                const roles = flat_roles.length ? flat_roles : actor_roles;

                return roles.filter(Boolean).map((role: ActorRoleInterface, index): MemberRoleChipInterface => {
                    return {
                        key: role.id || role.symbol || role.name || index,
                        label: role.display_name || role.name || role.symbol || this.getEmptyValue()
                    };
                });
            }
        };
    }

    // method to get on before un mount logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.action_handler.handleBeforeUnmounted();
    }
}

export default MemberProfileProfileViewController;
