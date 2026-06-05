import {
    CurrencyPaymentProviderMethodProfileViewContentKeysInterface,
    CurrencyPaymentProviderMethodProfileViewContentTextInterface,
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_CURRENCY_LOGO_URL } from "@/configs";

import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import CurrencyPaymentProviderMethodProfileViewActionHandler from "@/action_handlers/currency_payment_provider_method/profile_view_action_handler";

class CurrencyPaymentProviderMethodProfileViewController extends BaseProfileViewController<CurrencyPaymentProviderMethodRecordInterface> {
    public readonly content_key: string = "currency_payment_provider_method";

    public action_handler: CurrencyPaymentProviderMethodProfileViewActionHandler;

    public content_obj: CurrencyPaymentProviderMethodProfileViewContentTextInterface =
        {} as CurrencyPaymentProviderMethodProfileViewContentTextInterface;

    // Method to initialize profile view controller.
    constructor(props: ProfileViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>) {
        super(props);

        this.action_handler = new CurrencyPaymentProviderMethodProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    // Method to get child profile view content keys.
    protected getChildProfileViewContentKeys(): Partial<CurrencyPaymentProviderMethodProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            currency_logo_alt_text: `${base_content_key}.header.currency_logo_alt_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            currency_information_title_text: `${base_content_key}.sections.currency_information.title_text`,
            currency_name_label_text: `${base_content_key}.sections.currency_information.currency_name_label_text`,
            currency_code_label_text: `${base_content_key}.sections.currency_information.currency_code_label_text`,
            currency_id_label_text: `${base_content_key}.sections.currency_information.currency_id_label_text`,
            provider_method_information_title_text: `${base_content_key}.sections.provider_method_information.title_text`,
            provider_name_label_text: `${base_content_key}.sections.provider_method_information.provider_name_label_text`,
            provider_code_label_text: `${base_content_key}.sections.provider_method_information.provider_code_label_text`,
            payment_method_name_label_text: `${base_content_key}.sections.provider_method_information.payment_method_name_label_text`,
            payment_method_code_label_text: `${base_content_key}.sections.provider_method_information.payment_method_code_label_text`,
            provider_method_id_label_text: `${base_content_key}.sections.provider_method_information.provider_method_id_label_text`,
            direction_label_text: `${base_content_key}.sections.provider_method_information.direction_label_text`,
            provider_method_code_label_text: `${base_content_key}.sections.provider_method_information.provider_method_code_label_text`,
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
    protected getProfileViewContentFallbacks(): Partial<CurrencyPaymentProviderMethodProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading currency provider method...",
            no_description_text: "",
            currency_logo_alt_text: "Currency logo",
            empty_value_text: "-",
            currency_information_title_text: "Currency Information",
            currency_name_label_text: "Currency:",
            currency_code_label_text: "Currency Code:",
            currency_id_label_text: "Currency ID:",
            provider_method_information_title_text: "Provider Method Information",
            provider_name_label_text: "Provider:",
            provider_code_label_text: "Provider Code:",
            payment_method_name_label_text: "Payment Method:",
            payment_method_code_label_text: "Payment Method Code:",
            provider_method_id_label_text: "Provider Method ID:",
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

    // Method to format amount limit for display.
    private formatAmountLimit(amount?: number | null): string {
        if (amount === null || amount === undefined) {
            return "Infinity";
        }

        return InputTransformerUtil.nFormatter(
            InputTransformerUtil.roundToTwoDecimalPlaces(amount),
            2
        );
    }

    // Method to get UI computed data.
    protected getUIComputedData(): ComputedDefinitionType<
        Partial<ProfileViewComputedDataInterface>
    > {
        return {
            logo_url: () => {
                return (
                    this.state_refs.profile_record.value?.currency?.logo_url ||
                    DEFUALT_CURRENCY_LOGO_URL
                );
            },

            formatted_min_amount: () => {
                return this.formatAmountLimit(
                    Number(this.state_refs.profile_record.value?.min_amount)
                );
            },

            formatted_max_amount: () => {
                return this.formatAmountLimit(
                    Number(this.state_refs.profile_record.value?.max_amount)
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

            linked_by_member_profile_photo_url: () => {
                return (
                    this.state_refs.profile_record.value?.linked_by_member?.profile_photo_link ||
                    DEFAULT_MEMBER_PROFILE_PHOTO_URL
                );
            }
        };
    }
}

export default CurrencyPaymentProviderMethodProfileViewController;
