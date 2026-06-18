import {
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface,
    CurrencyProfileViewContentKeysInterface,
    CurrencyProfileViewContentTextInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_CURRENCY_LOGO_URL } from "@/configs";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import CurrencyProfileViewActionHandler from "@/action_handlers/currency/profile_view_action_handler";

class CurrencyProfileViewController extends BaseProfileViewController<CurrencyRecordInterface> {
    public readonly content_key: string = "currency";

    public action_handler: CurrencyProfileViewActionHandler;

    public content_obj: CurrencyProfileViewContentTextInterface = {} as CurrencyProfileViewContentTextInterface;

    constructor(props: ProfileViewPropsInterface<CurrencyRecordInterface>) {
        super(props);

        this.action_handler = new CurrencyProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);

        this.getComponentDefinition();
    }

    public getPageContentKey(): string {
        return this.content_key;
    }

    protected getChildProfileViewContentKeys(): Partial<CurrencyProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            currency_logo_alt_text: `${base_content_key}.header.currency_logo_alt_text`,
            symbol_label_text: `${base_content_key}.header.symbol_label_text`,
            format_label_text: `${base_content_key}.header.format_label_text`,
            no_format_text: `${base_content_key}.header.no_format_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            currency_information_title_text: `${base_content_key}.sections.currency_information.title_text`,
            code_label_text: `${base_content_key}.sections.currency_information.code_label_text`,
            numeric_code_label_text: `${base_content_key}.sections.currency_information.numeric_code_label_text`,
            country_code_label_text: `${base_content_key}.sections.currency_information.country_code_label_text`,
            precision_label_text: `${base_content_key}.sections.currency_information.precision_label_text`,
            minor_unit_label_text: `${base_content_key}.sections.currency_information.minor_unit_label_text`,
            sort_order_label_text: `${base_content_key}.sections.currency_information.sort_order_label_text`,
            status_title_text: `${base_content_key}.sections.status.title_text`,
            type_label_text: `${base_content_key}.sections.status.type_label_text`,
            fiat_type_text: `${base_content_key}.sections.status.fiat_type_text`,
            crypto_type_text: `${base_content_key}.sections.status.crypto_type_text`,
            active_label_text: `${base_content_key}.sections.status.active_label_text`,
            active_status_text: `${base_content_key}.sections.status.active_status_text`,
            inactive_status_text: `${base_content_key}.sections.status.inactive_status_text`,
            created_label_text: `${base_content_key}.sections.status.created_label_text`,
            updated_label_text: `${base_content_key}.sections.status.updated_label_text`,
            assigned_apps_title_text: `${base_content_key}.sections.assigned_apps.title_text`,
            app_prefix_label_text: `${base_content_key}.sections.assigned_apps.app_prefix_label_text`,
            default_badge_text: `${base_content_key}.sections.assigned_apps.default_badge_text`,
            no_assigned_apps_text: `${base_content_key}.sections.assigned_apps.no_assigned_apps_text`,
            created_by_title_text: `${base_content_key}.sections.created_by.title_text`,
            updated_by_title_text: `${base_content_key}.sections.updated_by.title_text`
        };
    }

    protected getProfileViewContentFallbacks(): Partial<CurrencyProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading...",
            no_description_text: "",
            currency_logo_alt_text: "Currency logo",
            symbol_label_text: "Symbol:",
            format_label_text: "Format:",
            no_format_text: "No format defined",
            empty_value_text: "-",
            currency_information_title_text: "Currency Information",
            code_label_text: "Code:",
            numeric_code_label_text: "Numeric Code:",
            country_code_label_text: "Country:",
            precision_label_text: "Precision:",
            minor_unit_label_text: "Minor Unit:",
            sort_order_label_text: "Sort Order:",
            status_title_text: "Status",
            type_label_text: "Type:",
            fiat_type_text: "Fiat",
            crypto_type_text: "Crypto",
            active_label_text: "Active:",
            active_status_text: "Active",
            inactive_status_text: "Inactive",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            assigned_apps_title_text: "Apps Using This Currency",
            app_prefix_label_text: "Prefix:",
            default_badge_text: "Default",
            no_assigned_apps_text: "No apps assigned",
            created_by_title_text: "Created By",
            updated_by_title_text: "Updated By"
        };
    }

    protected getUIComputedData(): ComputedDefinitionType<Partial<ProfileViewComputedDataInterface>> {
        return {
            logo_url: () => {
                const record = this.state_refs.profile_record.value;
                return record?.logo_url || DEFUALT_CURRENCY_LOGO_URL;
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

export default CurrencyProfileViewController;
