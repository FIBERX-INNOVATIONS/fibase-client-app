import { RoleRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL } from "@/configs";

import {
    ProfileViewContentKeysInterface,
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComponentsInterface,
    AccessControlProfileViewComputedInterface,
    AccessControlProfileViewContentInterface
} from "@/ui_types/profile_view_type";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

class AccessControlProfileViewController extends BaseProfileViewController<
    RoleRecordInterface,
    ProfileViewPropsInterface<RoleRecordInterface>,
    ProfileViewStateDataInterface<RoleRecordInterface>,
    AccessControlProfileViewComputedInterface,
    ProfileViewComponentsInterface
> {
    public readonly content_key: string = "access_control";

    public content_obj: AccessControlProfileViewContentInterface = {} as AccessControlProfileViewContentInterface;

    constructor(props: ProfileViewPropsInterface<RoleRecordInterface>) {
        super(props);
    }

    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            empty_value_text: `${base_content_key}.empty_value_text`,
            role_information_title_text: `${base_content_key}.sections.role_information.title_text`,
            role_id_label_text: `${base_content_key}.sections.role_information.role_id_label_text`,
            symbol_label_text: `${base_content_key}.sections.role_information.symbol_label_text`,
            type_label_text: `${base_content_key}.sections.role_information.type_label_text`,
            status_title_text: `${base_content_key}.sections.status.title_text`,
            system_role_label_text: `${base_content_key}.sections.status.system_role_label_text`,
            member_group_label_text: `${base_content_key}.sections.status.member_group_label_text`,
            yes_text: `${base_content_key}.bool_text.yes`,
            no_text: `${base_content_key}.bool_text.no`,
            system_role_text: `${base_content_key}.role_type.system_role_text`,
            member_group_text: `${base_content_key}.role_type.member_group_text`,
            custom_role_text: `${base_content_key}.role_type.custom_role_text`,
            timeline_title_text: `${base_content_key}.sections.timeline.title_text`,
            created_label_text: `${base_content_key}.sections.timeline.created_label_text`,
            updated_label_text: `${base_content_key}.sections.timeline.updated_label_text`,
            created_by_title_text: `${base_content_key}.sections.created_by.title_text`,
            updated_by_title_text: `${base_content_key}.sections.updated_by.title_text`
        };
    }

    protected getProfileViewContentFallbacks(): Partial<AccessControlProfileViewContentInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading role...",
            no_description_text: "",
            empty_value_text: "-",
            role_information_title_text: "Role Information",
            role_id_label_text: "Role ID:",
            symbol_label_text: "Symbol:",
            type_label_text: "Type:",
            status_title_text: "Role Flags",
            system_role_label_text: "System Role:",
            member_group_label_text: "Member Group:",
            yes_text: "Yes",
            no_text: "No",
            system_role_text: "System Role",
            member_group_text: "Member Group",
            custom_role_text: "Custom Role",
            timeline_title_text: "Timeline",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            created_by_title_text: "Created By",
            updated_by_title_text: "Updated By"
        };
    }

    private getRoleTypeText(record: RoleRecordInterface): string {
        if (record.is_system_role) {
            return this.content_obj.system_role_text;
        }

        if (record.is_member_group) {
            return this.content_obj.member_group_text;
        }

        return this.content_obj.custom_role_text;
    }

    private getBooleanText(value?: boolean): string {
        return value ? this.content_obj.yes_text : this.content_obj.no_text;
    }

    protected getUIComputedData(): ComputedDefinitionType<AccessControlProfileViewComputedInterface> {
        return {
            role_type_text: () => this.getRoleTypeText(this.state_refs.profile_record.value),

            system_role_text: () => this.getBooleanText(this.state_refs.profile_record.value?.is_system_role),

            member_group_text: () => this.getBooleanText(this.state_refs.profile_record.value?.is_member_group),

            readable_created_at: () =>
                DisplayFormatterUtil.formatDateTime(
                    this.state_refs.profile_record.value?.created_at,
                    this.content_obj.empty_value_text
                ),

            readable_updated_at: () =>
                DisplayFormatterUtil.formatDateTime(
                    this.state_refs.profile_record.value?.updated_at,
                    this.content_obj.empty_value_text
                ),

            created_by_member_profile_photo_url: () =>
                this.state_refs.profile_record.value?.creator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL,

            updated_by_member_profile_photo_url: () =>
                this.state_refs.profile_record.value?.updator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL
        };
    }

    protected async handleOnMountedLogic(): Promise<void> {
        return;
    }
}

export default AccessControlProfileViewController;
