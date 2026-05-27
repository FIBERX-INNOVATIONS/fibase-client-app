import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import RegisteredAppProfileViewActionHandler from "@/action_handlers/registered_app/profile_view_action_handler";

import {
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import {
    DEFAULT_MEMBER_PROFILE_PHOTO_URL,
    DEFUALT_REGISTERED_APP_LOGO_URL
} from "@/configs/constants";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

class RegisteredAppProfileViewController extends BaseProfileViewController<RegisteredAppRecordInterface> {
    public action_handler: RegisteredAppProfileViewActionHandler;

    constructor(props: ProfileViewPropsInterface) {
        super(props);

        this.action_handler = new RegisteredAppProfileViewActionHandler(this);

        this.getComponentDefinition();
    }

    protected getPageContentKey(): string {
        return "registered_app";
    }

    /**
     * Child computed
     */
    protected getChildUIComputedData(): ComputedDefinitionType<
        Partial<ProfileViewComputedDataInterface>
    > {
        return {
            app_logo_url: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;

                if (record.logo_url) {
                    return record?.logo_url;
                }

                return DEFUALT_REGISTERED_APP_LOGO_URL;
            },

            creator_member_profile_photo_url: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;

                if (record?.creator?.profile_photo_link) {
                    return record?.creator?.profile_photo_link;
                }

                return DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            updator_member_profile_photo_url: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;

                if (record?.updater?.profile_photo_link) {
                    return record?.updater?.profile_photo_link;
                }

                return DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            readable_created_at: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;

                if (record?.created_at) {
                    return InputTransformerUtil.formatReadableDateTime(record.created_at);
                }

                return "-";
            },

            readable_updated_at: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;

                if (record?.updated_at) {
                    return InputTransformerUtil.formatReadableDateTime(record.updated_at);
                }

                return "-";
            },

            readable_last_key_rotated_at: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;

                if (record?.auth?.last_key_rotated_at) {
                    return InputTransformerUtil.formatReadableDateTime(
                        record?.auth?.last_key_rotated_at
                    );
                }

                return "-";
            },

            fb_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.fb_social_link ?? "";
            },

            instagram_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.instagram_social_link ?? "";
            },

            twitter_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.twitter_social_link ?? "";
            },

            email_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.email_social_link ?? "";
            },

            telegram_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.telegram_social_link ?? "";
            },

            linkedin_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.linkedin_social_link ?? "";
            },

            youtube_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.youtube_social_link ?? "";
            },

            whatsapp_social_link: () => {
                const record = (this.state_refs?.profile_record?.value ||
                    this.props.record) as RegisteredAppRecordInterface;
                return record?.social_links?.whatsapp_social_link ?? "";
            }
        } as ComputedDefinitionType<ProfileViewComputedDataInterface>;
    }
}

export default RegisteredAppProfileViewController;
