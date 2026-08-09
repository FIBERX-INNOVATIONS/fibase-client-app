import type { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

import type {
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ServiceFeeConfigurationProfileViewComputedInterface,
    ServiceFeeConfigurationProfileViewContentKeysInterface,
    ServiceFeeConfigurationProfileViewContentTextInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_CURRENCY_LOGO_URL } from "@/configs";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import ServiceFeeConfigurationProfileViewActionHandler from "@/action_handlers/service_fee_configuration/profile_view_action_handler";

class ServiceFeeConfigurationProfileViewController extends BaseProfileViewController<
    ServiceFeeConfigurationRecordInterface,
    ProfileViewPropsInterface<ServiceFeeConfigurationRecordInterface>,
    ProfileViewStateDataInterface<ServiceFeeConfigurationRecordInterface>,
    ServiceFeeConfigurationProfileViewComputedInterface
> {
    public readonly content_key = "service_fee_configuration";

    public action_handler: ServiceFeeConfigurationProfileViewActionHandler;

    public content_obj = {} as ServiceFeeConfigurationProfileViewContentTextInterface;

    // Method to initialize the service fee configuration profile controller.
    constructor(props: ProfileViewPropsInterface<ServiceFeeConfigurationRecordInterface>) {
        super(props, "service_fee_configuration_profile_view");

        this.action_handler = new ServiceFeeConfigurationProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    // Method to get service fee configuration profile content keys.
    protected getChildProfileViewContentKeys(): Partial<ServiceFeeConfigurationProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            currency_logo_alt_text: `${base_content_key}.header.currency_logo_alt_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            configuration_information_title_text: `${base_content_key}.sections.configuration_information.title_text`,
            configuration_id_label_text: `${base_content_key}.sections.configuration_information.configuration_id_label_text`,
            currency_label_text: `${base_content_key}.sections.configuration_information.currency_label_text`,
            transaction_type_label_text: `${base_content_key}.sections.configuration_information.transaction_type_label_text`,
            configuration_level_label_text: `${base_content_key}.sections.configuration_information.configuration_level_label_text`,
            fee_details_title_text: `${base_content_key}.sections.fee_details.title_text`,
            fee_type_label_text: `${base_content_key}.sections.fee_details.fee_type_label_text`,
            amount_label_text: `${base_content_key}.sections.fee_details.amount_label_text`,
            ranges_title_text: `${base_content_key}.sections.ranges.title_text`,
            range_item_title_text: `${base_content_key}.sections.ranges.range_item_title_text`,
            range_minimum_label_text: `${base_content_key}.sections.ranges.minimum_label_text`,
            range_maximum_label_text: `${base_content_key}.sections.ranges.maximum_label_text`,
            range_fee_type_label_text: `${base_content_key}.sections.ranges.fee_type_label_text`,
            range_amount_label_text: `${base_content_key}.sections.ranges.amount_label_text`,
            open_ended_text: `${base_content_key}.sections.ranges.open_ended_text`,
            no_ranges_text: `${base_content_key}.sections.ranges.no_ranges_text`,
            scope_title_text: `${base_content_key}.sections.scope.title_text`,
            registered_app_label_text: `${base_content_key}.sections.scope.registered_app_label_text`,
            provider_label_text: `${base_content_key}.sections.scope.provider_label_text`,
            identity_label_text: `${base_content_key}.sections.scope.identity_label_text`,
            lifecycle_title_text: `${base_content_key}.sections.lifecycle.title_text`,
            active_label_text: `${base_content_key}.sections.lifecycle.active_label_text`,
            active_status_text: `${base_content_key}.sections.lifecycle.active_status_text`,
            inactive_status_text: `${base_content_key}.sections.lifecycle.inactive_status_text`,
            effective_from_label_text: `${base_content_key}.sections.lifecycle.effective_from_label_text`,
            effective_until_label_text: `${base_content_key}.sections.lifecycle.effective_until_label_text`,
            created_label_text: `${base_content_key}.sections.lifecycle.created_label_text`,
            updated_label_text: `${base_content_key}.sections.lifecycle.updated_label_text`,
            created_by_title_text: `${base_content_key}.sections.created_by.title_text`,
            updated_by_title_text: `${base_content_key}.sections.updated_by.title_text`
        };
    }

    // Method to get service fee configuration profile content fallbacks.
    protected getProfileViewContentFallbacks(): Partial<ServiceFeeConfigurationProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading service fee configuration...",
            empty_value_text: "-",
            currency_logo_alt_text: "Currency logo",
            configuration_information_title_text: "Configuration Information",
            configuration_id_label_text: "Configuration ID:",
            currency_label_text: "Currency:",
            transaction_type_label_text: "Transaction Type:",
            configuration_level_label_text: "Configuration Level:",
            fee_details_title_text: "Fee Details",
            fee_type_label_text: "Fee Type:",
            amount_label_text: "Amount:",
            ranges_title_text: "Fee Ranges",
            range_item_title_text: "Tier",
            range_minimum_label_text: "Minimum:",
            range_maximum_label_text: "Maximum:",
            range_fee_type_label_text: "Fee Type:",
            range_amount_label_text: "Amount:",
            open_ended_text: "No upper limit",
            no_ranges_text: "No fee ranges configured.",
            scope_title_text: "Configuration Scope",
            registered_app_label_text: "Registered App:",
            provider_label_text: "Payment Provider:",
            identity_label_text: "Identity:",
            lifecycle_title_text: "Status and Lifecycle",
            active_label_text: "Active:",
            active_status_text: "Active",
            inactive_status_text: "Inactive",
            effective_from_label_text: "Effective From:",
            effective_until_label_text: "Effective Until:",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            created_by_title_text: "Created By",
            updated_by_title_text: "Updated By"
        };
    }

    // Method to format a service fee amount according to its fee type.
    private formatFeeAmount(value?: string | number | null, fee_type?: string | null): string {
        const amount = DisplayFormatterUtil.formatDecimalInput(value);

        if (!amount) {
            return this.content_obj.empty_value_text;
        }

        return fee_type === "percentage" ? `${amount}%` : amount;
    }

    // Method to get service fee configuration profile computed data.
    protected getUIComputedData(): ComputedDefinitionType<ServiceFeeConfigurationProfileViewComputedInterface> {
        return {
            logo_url: () => {
                return this.state_refs.profile_record.value?.currency?.logo_url || DEFUALT_CURRENCY_LOGO_URL;
            },
            readable_transaction_type: () => {
                return DisplayFormatterUtil.formatLabel(
                    this.state_refs.profile_record.value?.transaction_type,
                    this.content_obj.empty_value_text
                );
            },
            readable_fee_type: () => {
                return DisplayFormatterUtil.formatLabel(
                    this.state_refs.profile_record.value?.fee_type,
                    this.content_obj.empty_value_text
                );
            },
            formatted_amount: () => {
                const record = this.state_refs.profile_record.value;
                return this.formatFeeAmount(record?.amount, record?.fee_type);
            },
            readable_effective_from: () => {
                return DisplayFormatterUtil.formatDateTime(
                    this.state_refs.profile_record.value?.effective_from,
                    this.content_obj.empty_value_text
                );
            },
            readable_effective_until: () => {
                return DisplayFormatterUtil.formatDateTime(
                    this.state_refs.profile_record.value?.effective_until,
                    this.content_obj.empty_value_text
                );
            },
            readable_created_at: () => {
                return DisplayFormatterUtil.formatDateTime(
                    this.state_refs.profile_record.value?.created_at,
                    this.content_obj.empty_value_text
                );
            },
            readable_updated_at: () => {
                return DisplayFormatterUtil.formatDateTime(
                    this.state_refs.profile_record.value?.updated_at,
                    this.content_obj.empty_value_text
                );
            },
            creator_member_profile_photo_url: () => {
                return this.state_refs.profile_record.value?.creator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },
            updator_member_profile_photo_url: () => {
                return this.state_refs.profile_record.value?.updator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },
            range_entries: () => {
                return (this.state_refs.profile_record.value?.ranges ?? []).map((range) => {
                    return {
                        key: range.public_id,
                        minimum: DisplayFormatterUtil.formatDecimalInput(range.min_value),
                        maximum: range.max_value
                            ? DisplayFormatterUtil.formatDecimalInput(range.max_value)
                            : this.content_obj.open_ended_text,
                        fee_type: DisplayFormatterUtil.formatLabel(range.fee_type, this.content_obj.empty_value_text),
                        amount: this.formatFeeAmount(range.amount, range.fee_type)
                    };
                });
            }
        };
    }
}

export default ServiceFeeConfigurationProfileViewController;
