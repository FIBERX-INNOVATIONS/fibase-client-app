import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_REGISTERED_APP_LOGO_URL } from "@/configs";

import {
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface,
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    RegisteredAppProfileViewContentKeysInterface,
    RegisteredAppProfileViewContentTextInterface
} from "@/ui_types/profile_view_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import RegisteredAppProfileViewActionHandler from "@/action_handlers/registered_app/profile_view_action_handler";

class RegisteredAppProfileViewController extends BaseProfileViewController<RegisteredAppRecordInterface> {
    public readonly content_key: string = "registered_app";

    public action_handler: RegisteredAppProfileViewActionHandler;

    public content_obj: RegisteredAppProfileViewContentKeysInterface =
        {} as RegisteredAppProfileViewContentKeysInterface;

    constructor(props: ProfileViewPropsInterface<RegisteredAppRecordInterface>) {
        super(props);

        this.action_handler = new RegisteredAppProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    // Method to get child profile view content keys, which returns the specific content keys for the registered app profile view, extending the base content keys with additional keys specific to the registered app profile view, allowing for organized management of content keys for different sections of the profile view such as header, app information, auth details, social links, created by, updated by, roles, and additional URLs sections
    protected getChildProfileViewContentKeys(): Partial<RegisteredAppProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            app_logo_alt_text: `${base_content_key}.header.app_logo_alt_text`,
            prefix_label_text: `${base_content_key}.header.prefix_label_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            app_information_title_text: `${base_content_key}.sections.app_information.title_text`,
            app_id_label_text: `${base_content_key}.sections.app_information.app_id_label_text`,
            status_label_text: `${base_content_key}.sections.app_information.status_label_text`,
            active_status_text: `${base_content_key}.sections.app_information.active_status_text`,
            inactive_status_text: `${base_content_key}.sections.app_information.inactive_status_text`,
            created_label_text: `${base_content_key}.sections.app_information.created_label_text`,
            updated_label_text: `${base_content_key}.sections.app_information.updated_label_text`,
            auth_details_title_text: `${base_content_key}.sections.auth_details.title_text`,
            algorithm_label_text: `${base_content_key}.sections.auth_details.algorithm_label_text`,
            version_label_text: `${base_content_key}.sections.auth_details.version_label_text`,
            last_rotated_label_text: `${base_content_key}.sections.auth_details.last_rotated_label_text`,
            social_links_title_text: `${base_content_key}.sections.social_links.title_text`,
            created_by_title_text: `${base_content_key}.sections.created_by.title_text`,
            updated_by_title_text: `${base_content_key}.sections.updated_by.title_text`,
            roles_title_text: `${base_content_key}.sections.roles.title_text`,
            additional_urls_title_text: `${base_content_key}.sections.additional_urls.title_text`,
            facebook_alt_text: `${base_content_key}.sections.social_links.facebook_alt_text`,
            twitter_alt_text: `${base_content_key}.sections.social_links.twitter_alt_text`,
            telegram_alt_text: `${base_content_key}.sections.social_links.telegram_alt_text`,
            linkedin_alt_text: `${base_content_key}.sections.social_links.linkedin_alt_text`,
            instagram_alt_text: `${base_content_key}.sections.social_links.instagram_alt_text`,
            whatsapp_alt_text: `${base_content_key}.sections.social_links.whatsapp_alt_text`,
            youtube_alt_text: `${base_content_key}.sections.social_links.youtube_alt_text`
        };
    }

    // Method to provide fallback content text for the profile view, which returns default content text values for various content keys used in the registered app profile view, ensuring that there are sensible default values for content such as loading text, no description text, app logo alt text, prefix label, empty value text, section titles and labels, and social link alt texts, which can be used in cases where the content manager does not provide specific values for these keys
    protected getProfileViewContentFallbacks(): Partial<RegisteredAppProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks()
            // loading_text: "Loading...",
            // no_description_text: "No description provided.",
            // app_logo_alt_text: "App logo",
            // prefix_label_text: "Prefix:",
            // empty_value_text: "-",
            // app_information_title_text: "App Information",
            // app_id_label_text: "App ID:",
            // status_label_text: "Status:",
            // active_status_text: "Active",
            // inactive_status_text: "Inactive",
            // created_label_text: "Created:",
            // updated_label_text: "Updated:",
            // auth_details_title_text: "Auth Details",
            // algorithm_label_text: "Algorithm:",
            // version_label_text: "Version:",
            // last_rotated_label_text: "Last Rotated:",
            // social_links_title_text: "Social Links",
            // created_by_title_text: "Created By",
            // updated_by_title_text: "Updated By",
            // roles_title_text: "Roles",
            // additional_urls_title_text: "Additional URLs",
            // facebook_alt_text: "Facebook",
            // twitter_alt_text: "Twitter Link",
            // telegram_alt_text: "Telegram Link",
            // linkedin_alt_text: "LinkedIn Link",
            // instagram_alt_text: "Instagram Link",
            // whatsapp_alt_text: "WhatsApp Link",
            // youtube_alt_text: "YouTube Link"
        };
    }

    // Method to handle getting computed data
    protected getUIComputedData(): ComputedDefinitionType<
        Partial<ProfileViewComputedDataInterface>
    > {
        return {
            app_logo_url: () => {
                const record = this.getProfileRecord();

                if (record.logo_url) {
                    return record?.logo_url;
                }

                return DEFUALT_REGISTERED_APP_LOGO_URL;
            },

            creator_member_profile_photo_url: () => {
                const record = this.getProfileRecord();

                if (record?.creator?.profile_photo_link) {
                    return record?.creator?.profile_photo_link;
                }

                return DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            updator_member_profile_photo_url: () => {
                const record = this.getProfileRecord();

                if (record?.updater?.profile_photo_link) {
                    return record?.updater?.profile_photo_link;
                }

                return DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            readable_created_at: () => {
                const record = this.getProfileRecord();

                if (record?.created_at) {
                    return InputTransformerUtil.formatReadableDateTime(record.created_at);
                }

                return this.content_obj.empty_value_text;
            },

            readable_updated_at: () => {
                const record = this.getProfileRecord();

                if (record?.updated_at) {
                    return InputTransformerUtil.formatReadableDateTime(record.updated_at);
                }

                return this.content_obj.empty_value_text;
            },

            readable_last_key_rotated_at: () => {
                const record = this.getProfileRecord();

                if (record?.auth?.last_key_rotated_at) {
                    return InputTransformerUtil.formatReadableDateTime(
                        record?.auth?.last_key_rotated_at
                    );
                }

                return this.content_obj.empty_value_text;
            },

            fb_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.fb_social_link ?? "";
            },

            instagram_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.instagram_social_link ?? "";
            },

            twitter_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.twitter_social_link ?? "";
            },

            email_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.email_social_link ?? "";
            },

            telegram_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.telegram_social_link ?? "";
            },

            linkedin_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.linkedin_social_link ?? "";
            },

            youtube_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.youtube_social_link ?? "";
            },

            whatsapp_social_link: () => {
                const record = this.getProfileRecord();
                return record?.social_links?.whatsapp_social_link ?? "";
            }
        } as ComputedDefinitionType<ProfileViewComputedDataInterface>;
    }
}

export default RegisteredAppProfileViewController;
