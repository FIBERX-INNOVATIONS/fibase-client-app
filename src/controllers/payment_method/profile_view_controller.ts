import {
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface,
    PaymentMethodProfileViewContentKeysInterface,
    PaymentMethodProfileViewContentTextInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_PAYMENT_METHOD_ICON_URL } from "@/configs";

import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import PaymentMethodProfileViewActionHandler from "@/action_handlers/payment_method/profile_view_action_handler";

class PaymentMethodProfileViewController extends BaseProfileViewController<PaymentMethodRecordInterface> {
    public readonly content_key: string = "payment_method";

    public action_handler: PaymentMethodProfileViewActionHandler;

    public content_obj: PaymentMethodProfileViewContentTextInterface = {} as PaymentMethodProfileViewContentTextInterface;

    constructor(props: ProfileViewPropsInterface<PaymentMethodRecordInterface>) {
        super(props);

        this.action_handler = new PaymentMethodProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    protected getChildProfileViewContentKeys(): Partial<PaymentMethodProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            payment_method_icon_alt_text: `${base_content_key}.header.payment_method_icon_alt_text`,
            code_label_text: `${base_content_key}.header.code_label_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            display_details_title_text: `${base_content_key}.sections.display_details.title_text`,
            display_name_label_text: `${base_content_key}.sections.display_details.display_name_label_text`,
            display_group_label_text: `${base_content_key}.sections.display_details.display_group_label_text`,
            processing_time_label_text: `${base_content_key}.sections.display_details.processing_time_label_text`,
            fee_label_text: `${base_content_key}.sections.display_details.fee_label_text`,
            amount_limits_title_text: `${base_content_key}.sections.amount_limits.title_text`,
            min_amount_label_text: `${base_content_key}.sections.amount_limits.min_amount_label_text`,
            max_amount_label_text: `${base_content_key}.sections.amount_limits.max_amount_label_text`,
            capabilities_title_text: `${base_content_key}.sections.capabilities.title_text`,
            requires_redirect_label_text: `${base_content_key}.sections.capabilities.requires_redirect_label_text`,
            supports_deposit_label_text: `${base_content_key}.sections.capabilities.supports_deposit_label_text`,
            supports_withdrawal_label_text: `${base_content_key}.sections.capabilities.supports_withdrawal_label_text`,
            supports_refund_label_text: `${base_content_key}.sections.capabilities.supports_refund_label_text`,
            enabled_text: `${base_content_key}.sections.capabilities.enabled_text`,
            disabled_text: `${base_content_key}.sections.capabilities.disabled_text`,
            supported_regions_title_text: `${base_content_key}.sections.supported_regions.title_text`,
            countries_label_text: `${base_content_key}.sections.supported_regions.countries_label_text`,
            currencies_label_text: `${base_content_key}.sections.supported_regions.currencies_label_text`,
            no_countries_text: `${base_content_key}.sections.supported_regions.no_countries_text`,
            no_currencies_text: `${base_content_key}.sections.supported_regions.no_currencies_text`,
            status_title_text: `${base_content_key}.sections.status.title_text`,
            active_label_text: `${base_content_key}.sections.status.active_label_text`,
            active_status_text: `${base_content_key}.sections.status.active_status_text`,
            inactive_status_text: `${base_content_key}.sections.status.inactive_status_text`,
            sort_order_label_text: `${base_content_key}.sections.status.sort_order_label_text`,
            created_label_text: `${base_content_key}.sections.status.created_label_text`,
            updated_label_text: `${base_content_key}.sections.status.updated_label_text`,
            created_by_title_text: `${base_content_key}.sections.created_by.title_text`,
            updated_by_title_text: `${base_content_key}.sections.updated_by.title_text`
        };
    }

    protected getProfileViewContentFallbacks(): Partial<PaymentMethodProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading...",
            no_description_text: "No description provided.",
            payment_method_icon_alt_text: "Payment method icon",
            code_label_text: "Code:",
            empty_value_text: "-",
            display_details_title_text: "Display Details",
            display_name_label_text: "Display Name:",
            display_group_label_text: "Display Group:",
            processing_time_label_text: "Processing Time:",
            fee_label_text: "Fee Label:",
            amount_limits_title_text: "Amount Limits",
            min_amount_label_text: "Minimum:",
            max_amount_label_text: "Maximum:",
            capabilities_title_text: "Capabilities",
            requires_redirect_label_text: "Requires Redirect:",
            supports_deposit_label_text: "Deposit:",
            supports_withdrawal_label_text: "Withdrawal:",
            supports_refund_label_text: "Refund:",
            enabled_text: "Enabled",
            disabled_text: "Disabled",
            supported_regions_title_text: "Supported Regions",
            countries_label_text: "Countries:",
            currencies_label_text: "Currencies:",
            no_countries_text: "No countries configured",
            no_currencies_text: "No currencies configured",
            status_title_text: "Status",
            active_label_text: "Active:",
            active_status_text: "Active",
            inactive_status_text: "Inactive",
            sort_order_label_text: "Sort Order:",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            created_by_title_text: "Created By",
            updated_by_title_text: "Updated By"
        };
    }

    protected getUIComputedData(): ComputedDefinitionType<Partial<ProfileViewComputedDataInterface>> {
        return {
            logo_url: () => {
                return this.state_refs.profile_record.value?.icon_url || DEFUALT_PAYMENT_METHOD_ICON_URL;
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

export default PaymentMethodProfileViewController;
