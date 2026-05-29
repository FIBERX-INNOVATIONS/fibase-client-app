import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import CurrencyProfileViewActionHandler from "@/action_handlers/currency/profile_view_action_handler";

import {
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import {
    DEFAULT_MEMBER_PROFILE_PHOTO_URL,
    DEFUALT_REGISTERED_APP_LOGO_URL
} from "@/configs/constants";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

class CurrencyProfileViewController extends BaseProfileViewController<CurrencyRecordInterface> {
    public readonly content_key: string = "currency";

    public action_handler: CurrencyProfileViewActionHandler;

    constructor(props: ProfileViewPropsInterface<CurrencyRecordInterface>) {
        super(props);

        this.action_handler = new CurrencyProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);

        this.getComponentDefinition();
    }

    public getPageContentKey(): string {
        return this.content_key;
    }

    protected getChildUIComputedData(): ComputedDefinitionType<
        Partial<ProfileViewComputedDataInterface>
    > {
        return {
            logo_url: () => {
                const record = this.state_refs.profile_record.value;
                return record?.logo_url || DEFUALT_REGISTERED_APP_LOGO_URL;
            },

            readable_created_at: () => {
                const record = this.state_refs.profile_record.value;
                return record?.created_at
                    ? InputTransformerUtil.formatReadableDateTime(record.created_at)
                    : "-";
            },

            readable_updated_at: () => {
                const record = this.state_refs.profile_record.value;
                return record?.updated_at
                    ? InputTransformerUtil.formatReadableDateTime(record.updated_at)
                    : "-";
            },

            creator_member_profile_photo_url: () => {
                return (
                    this.state_refs.profile_record.value?.creator?.profile_photo_link ||
                    DEFAULT_MEMBER_PROFILE_PHOTO_URL
                );
            },

            updator_member_profile_photo_url: () => {
                return (
                    this.state_refs.profile_record.value?.updater?.profile_photo_link ||
                    DEFAULT_MEMBER_PROFILE_PHOTO_URL
                );
            }
        };
    }
}

export default CurrencyProfileViewController;
