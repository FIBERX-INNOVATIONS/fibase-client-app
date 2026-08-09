import {
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface,
    PaymentProviderProfileViewContentKeysInterface,
    PaymentProviderProfileViewContentTextInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_PAYMENT_PROVIDER_LOGO_URL } from "@/configs";

import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import PaymentProviderProfileViewActionHandler from "@/action_handlers/payment_provider/profile_view_action_handler";

class PaymentProviderProfileViewController extends BaseProfileViewController<PaymentProviderRecordInterface> {
    public readonly content_key: string = "payment_provider";

    public action_handler: PaymentProviderProfileViewActionHandler;

    public content_obj: PaymentProviderProfileViewContentTextInterface = {} as PaymentProviderProfileViewContentTextInterface;

    constructor(props: ProfileViewPropsInterface<PaymentProviderRecordInterface>) {
        super(props);

        this.action_handler = new PaymentProviderProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    protected getChildProfileViewContentKeys(): Partial<PaymentProviderProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            payment_provider_logo_alt_text: `${base_content_key}.header.payment_provider_logo_alt_text`,
            code_label_text: `${base_content_key}.header.code_label_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            provider_information_title_text: `${base_content_key}.sections.provider_information.title_text`,
            provider_type_label_text: `${base_content_key}.sections.provider_information.provider_type_label_text`,
            website_url_label_text: `${base_content_key}.sections.provider_information.website_url_label_text`,
            no_website_text: `${base_content_key}.sections.provider_information.no_website_text`,
            status_title_text: `${base_content_key}.sections.status.title_text`,
            active_label_text: `${base_content_key}.sections.status.active_label_text`,
            active_status_text: `${base_content_key}.sections.status.active_status_text`,
            inactive_status_text: `${base_content_key}.sections.status.inactive_status_text`,
            created_label_text: `${base_content_key}.sections.status.created_label_text`,
            updated_label_text: `${base_content_key}.sections.status.updated_label_text`,
            created_by_title_text: `${base_content_key}.sections.created_by.title_text`,
            updated_by_title_text: `${base_content_key}.sections.updated_by.title_text`
        };
    }

    protected getProfileViewContentFallbacks(): Partial<PaymentProviderProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading payment provider...",
            no_description_text: "No description provided.",
            payment_provider_logo_alt_text: "Payment provider logo",
            code_label_text: "Code:",
            empty_value_text: "-",
            provider_information_title_text: "Provider Information",
            provider_type_label_text: "Provider Type:",
            website_url_label_text: "Website:",
            no_website_text: "No website configured",
            status_title_text: "Status",
            active_label_text: "Active:",
            active_status_text: "Active",
            inactive_status_text: "Inactive",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            created_by_title_text: "Created By",
            updated_by_title_text: "Updated By"
        };
    }

    protected getUIComputedData(): ComputedDefinitionType<Partial<ProfileViewComputedDataInterface>> {
        return {
            logo_url: () => {
                return this.state_refs.profile_record.value?.logo_url || DEFUALT_PAYMENT_PROVIDER_LOGO_URL;
            },

            readable_provider_type: () => {
                return DisplayFormatterUtil.formatLabel(
                    this.state_refs.profile_record.value?.provider_type,
                    this.content_obj.empty_value_text
                );
            },

            readable_created_at: () => {
                const record = this.state_refs.profile_record.value;
                return record?.created_at
                    ? InputTransformerUtil.formatReadableDateTime(record.created_at)
                    : this.content_obj.empty_value_text;
            },

            readable_updated_at: () => {
                const record = this.state_refs.profile_record.value;
                return record?.updated_at
                    ? InputTransformerUtil.formatReadableDateTime(record.updated_at)
                    : this.content_obj.empty_value_text;
            },

            creator_member_profile_photo_url: () => {
                return this.state_refs.profile_record.value?.creator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            updator_member_profile_photo_url: () => {
                return this.state_refs.profile_record.value?.updator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            }
        };
    }
}

export default PaymentProviderProfileViewController;
