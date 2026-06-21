import {
    PaymentProviderMethodProfileViewContentKeysInterface,
    PaymentProviderMethodProfileViewContentTextInterface,
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_PAYMENT_PROVIDER_LOGO_URL } from "@/configs";

import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import PaymentProviderMethodProfileViewActionHandler from "@/action_handlers/payment_provider_method/profile_view_action_handler";

class PaymentProviderMethodProfileViewController extends BaseProfileViewController<PaymentProviderMethodRecordInterface> {
    public readonly content_key: string = "payment_provider_method";

    public action_handler: PaymentProviderMethodProfileViewActionHandler;

    public content_obj: PaymentProviderMethodProfileViewContentTextInterface =
        {} as PaymentProviderMethodProfileViewContentTextInterface;

    // Method to initialize profile view controller.
    constructor(props: ProfileViewPropsInterface<PaymentProviderMethodRecordInterface>) {
        super(props);

        this.action_handler = new PaymentProviderMethodProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    // Method to get child profile view content keys.
    protected getChildProfileViewContentKeys(): Partial<PaymentProviderMethodProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            payment_provider_logo_alt_text: `${base_content_key}.header.payment_provider_logo_alt_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            method_information_title_text: `${base_content_key}.sections.method_information.title_text`,
            provider_name_label_text: `${base_content_key}.sections.method_information.provider_name_label_text`,
            provider_code_label_text: `${base_content_key}.sections.method_information.provider_code_label_text`,
            provider_id_label_text: `${base_content_key}.sections.method_information.provider_id_label_text`,
            payment_method_name_label_text: `${base_content_key}.sections.method_information.payment_method_name_label_text`,
            payment_method_code_label_text: `${base_content_key}.sections.method_information.payment_method_code_label_text`,
            payment_method_id_label_text: `${base_content_key}.sections.method_information.payment_method_id_label_text`,
            direction_label_text: `${base_content_key}.sections.method_information.direction_label_text`,
            provider_method_code_label_text: `${base_content_key}.sections.method_information.provider_method_code_label_text`,
            amount_limits_title_text: `${base_content_key}.sections.amount_limits.title_text`,
            min_amount_label_text: `${base_content_key}.sections.amount_limits.min_amount_label_text`,
            max_amount_label_text: `${base_content_key}.sections.amount_limits.max_amount_label_text`,
            status_title_text: `${base_content_key}.sections.status.title_text`,
            active_label_text: `${base_content_key}.sections.status.active_label_text`,
            active_status_text: `${base_content_key}.sections.status.active_status_text`,
            inactive_status_text: `${base_content_key}.sections.status.inactive_status_text`,
            created_label_text: `${base_content_key}.sections.status.created_label_text`,
            updated_label_text: `${base_content_key}.sections.status.updated_label_text`,
            linked_by_title_text: `${base_content_key}.sections.linked_by.title_text`
        };
    }

    // Method to get profile view content fallbacks.
    protected getProfileViewContentFallbacks(): Partial<PaymentProviderMethodProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading payment provider method...",
            no_description_text: "",
            payment_provider_logo_alt_text: "Payment provider logo",
            empty_value_text: "-",
            method_information_title_text: "Method Information",
            provider_name_label_text: "Provider:",
            provider_code_label_text: "Provider Code:",
            provider_id_label_text: "Provider ID:",
            payment_method_name_label_text: "Payment Method:",
            payment_method_code_label_text: "Payment Method Code:",
            payment_method_id_label_text: "Payment Method ID:",
            direction_label_text: "Direction:",
            provider_method_code_label_text: "Provider Method Code:",
            amount_limits_title_text: "Amount Limits",
            min_amount_label_text: "Minimum:",
            max_amount_label_text: "Maximum:",
            status_title_text: "Status",
            active_label_text: "Active:",
            active_status_text: "Active",
            inactive_status_text: "Inactive",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            linked_by_title_text: "Linked By"
        };
    }

    // Method to get UI computed data.
    protected getUIComputedData(): ComputedDefinitionType<Partial<ProfileViewComputedDataInterface>> {
        return {
            logo_url: () => {
                return this.state_refs.profile_record.value?.provider?.logo_url || DEFUALT_PAYMENT_PROVIDER_LOGO_URL;
            },

            formatted_min_amount: () => {
                return DisplayFormatterUtil.formatAmountLimit(Number(this.state_refs.profile_record.value?.min_amount));
            },

            formatted_max_amount: () => {
                return DisplayFormatterUtil.formatAmountLimit(Number(this.state_refs.profile_record.value?.max_amount));
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

            linked_by_member_profile_photo_url: () => {
                return (
                    this.state_refs.profile_record.value?.linked_by_member?.profile_photo_link ||
                    DEFAULT_MEMBER_PROFILE_PHOTO_URL
                );
            }
        };
    }
}

export default PaymentProviderMethodProfileViewController;
