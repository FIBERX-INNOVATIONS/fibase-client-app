import {
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL } from "@/configs";

import { MemberRecordInterface, getMemberFullName } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";
import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import MemberProfileProfileViewActionHandler from "@/action_handlers/member_profile/profile_view_action_handler";
import MemberProfileProfileViewClassStyles from "@/class_styles/member_profile_profile_view_class_styles";
import { MemberProfileProfileViewClassStylesInterface } from "@/ui_types/member_profile_profile_view_type";

class MemberProfileProfileViewController extends BaseProfileViewController<
    MemberRecordInterface,
    ProfileViewPropsInterface<MemberRecordInterface>
> {
    public readonly content_key: string = "member_profile";

    public action_handler: MemberProfileProfileViewActionHandler;

    public readonly class_styles: MemberProfileProfileViewClassStylesInterface;

    public content_obj: ProfileViewContentTextInterface = {} as ProfileViewContentTextInterface;

    constructor(props: ProfileViewPropsInterface<MemberRecordInterface>) {
        super(props, "member_profile_profile_view", MemberProfileProfileViewClassStyles);

        this.class_styles = {
            ...MemberProfileProfileViewClassStyles,
            ...(props.class_styles ?? {})
        } as MemberProfileProfileViewClassStylesInterface;

        this.action_handler = new MemberProfileProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);

        this.getComponentDefinition();
    }

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
            updated_label_text: `${base_content_key}.sections.timeline.updated_label_text`
        };
    }

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
            updated_label_text: "Updated:"
        };
    }

    protected getUIComputedData(): ComputedDefinitionType<any> {
        return {
            profile_photo_url: () => {
                return (
                    this.state_refs.profile_record.value?.profile_photo_link ||
                    DEFAULT_MEMBER_PROFILE_PHOTO_URL
                );
            },

            member_full_name: () => {
                const record = this.state_refs.profile_record.value;
                return (
                    record?.full_name ||
                    getMemberFullName(record) ||
                    this.content_obj.empty_value_text
                );
            },

            readable_dob: () => {
                const dob = this.state_refs.profile_record.value?.dob;
                return dob
                    ? InputTransformerUtil.formatReadableDate(dob)
                    : this.content_obj.empty_value_text;
            },

            readable_created_at: () => {
                const created_at = this.state_refs.profile_record.value?.created_at;
                return created_at
                    ? InputTransformerUtil.formatReadableDateTime(created_at)
                    : this.content_obj.empty_value_text;
            },

            readable_updated_at: () => {
                const updated_at = this.state_refs.profile_record.value?.updated_at;
                return updated_at
                    ? InputTransformerUtil.formatReadableDateTime(updated_at)
                    : this.content_obj.empty_value_text;
            },

            readable_account_locked_until: () => {
                const locked_until =
                    this.state_refs.profile_record.value?.member_auth?.account_locked_until;
                return locked_until
                    ? InputTransformerUtil.formatReadableDateTime(locked_until)
                    : this.content_obj.empty_value_text;
            },

            readable_password_changed_at: () => {
                const changed_at =
                    this.state_refs.profile_record.value?.member_auth?.password_changed_at;
                return changed_at
                    ? InputTransformerUtil.formatReadableDateTime(changed_at)
                    : this.content_obj.empty_value_text;
            },

            readable_last_password_reset_request_at: () => {
                const reset_at =
                    this.state_refs.profile_record.value?.member_auth
                        ?.last_password_reset_request_at;
                return reset_at
                    ? InputTransformerUtil.formatReadableDateTime(reset_at)
                    : this.content_obj.empty_value_text;
            },

            member_roles: () => {
                const record = this.state_refs.profile_record.value;
                const flat_roles = record?.roles ?? [];
                const actor_roles = record?.actor_roles?.map((actor_role) => actor_role.role) ?? [];

                return [...flat_roles, ...actor_roles].filter(Boolean);
            }
        } as ComputedDefinitionType<any>;
    }
}

export default MemberProfileProfileViewController;
