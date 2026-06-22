import { Component, Ref } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";
import { ImageRenderUIClassStylesInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { TabsUIPropsInterface } from "@ui/version_3/ui_types/tabs_ui_type";
import {
    MemberRecordInterface,
    PaymentProviderConfigCredentialsInterface,
    PaymentProviderConfigRecordInterface
} from "@/types/api_service_type";
import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

export interface ProfileViewPropsInterface<T = any> {
    record?: T;

    record_id: string;

    class_styles?: Partial<ProfileViewClassStylesInterface>;
}

export interface ProfileViewContentKeysInterface {
    loading_text: string;

    no_description_text: string;

    [key: string]: string;
}

export interface ProfileViewContentTextInterface {
    loading_text: string;

    no_description_text: string;

    [key: string]: string;
}

// Specific content keys for the registered app profile view.
export interface RegisteredAppProfileViewContentKeysInterface extends ProfileViewContentKeysInterface {
    app_logo_alt_text: string;
    prefix_label_text: string;
    empty_value_text: string;
    app_information_title_text: string;
    app_id_label_text: string;
    status_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    created_label_text: string;
    updated_label_text: string;
    auth_details_title_text: string;
    algorithm_label_text: string;
    version_label_text: string;
    last_rotated_label_text: string;
    social_links_title_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
    roles_title_text: string;
    additional_urls_title_text: string;
    facebook_alt_text: string;
    twitter_alt_text: string;
    telegram_alt_text: string;
    linkedin_alt_text: string;
    instagram_alt_text: string;
    whatsapp_alt_text: string;
    youtube_alt_text: string;
    [key: string]: string;
}

// Specific content text values for the registered app profile view.
export interface RegisteredAppProfileViewContentTextInterface extends ProfileViewContentTextInterface {
    app_logo_alt_text: string;
    prefix_label_text: string;
    empty_value_text: string;
    app_information_title_text: string;
    app_id_label_text: string;
    status_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    created_label_text: string;
    updated_label_text: string;
    auth_details_title_text: string;
    algorithm_label_text: string;
    version_label_text: string;
    last_rotated_label_text: string;
    social_links_title_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
    roles_title_text: string;
    additional_urls_title_text: string;
    facebook_alt_text: string;
    twitter_alt_text: string;
    telegram_alt_text: string;
    linkedin_alt_text: string;
    instagram_alt_text: string;
    whatsapp_alt_text: string;
    youtube_alt_text: string;
    [key: string]: string;
}

export interface CurrencyProfileViewContentKeysInterface extends ProfileViewContentKeysInterface {
    currency_logo_alt_text: string;
    symbol_label_text: string;
    format_label_text: string;
    no_format_text: string;
    empty_value_text: string;
    currency_information_title_text: string;
    code_label_text: string;
    numeric_code_label_text: string;
    country_code_label_text: string;
    precision_label_text: string;
    minor_unit_label_text: string;
    sort_order_label_text: string;
    status_title_text: string;
    type_label_text: string;
    fiat_type_text: string;
    crypto_type_text: string;
    active_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    created_label_text: string;
    updated_label_text: string;
    assigned_apps_title_text: string;
    app_prefix_label_text: string;
    default_badge_text: string;
    no_assigned_apps_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
    [key: string]: string;
}

export interface CurrencyProfileViewContentTextInterface extends ProfileViewContentTextInterface {
    currency_logo_alt_text: string;
    symbol_label_text: string;
    format_label_text: string;
    no_format_text: string;
    empty_value_text: string;
    currency_information_title_text: string;
    code_label_text: string;
    numeric_code_label_text: string;
    country_code_label_text: string;
    precision_label_text: string;
    minor_unit_label_text: string;
    sort_order_label_text: string;
    status_title_text: string;
    type_label_text: string;
    fiat_type_text: string;
    crypto_type_text: string;
    active_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    created_label_text: string;
    updated_label_text: string;
    assigned_apps_title_text: string;
    app_prefix_label_text: string;
    default_badge_text: string;
    no_assigned_apps_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
    [key: string]: string;
}

export interface PaymentMethodProfileViewContentKeysInterface extends ProfileViewContentKeysInterface {
    payment_method_icon_alt_text: string;
    code_label_text: string;
    empty_value_text: string;
    display_details_title_text: string;
    display_name_label_text: string;
    display_group_label_text: string;
    processing_time_label_text: string;
    fee_label_text: string;
    amount_limits_title_text: string;
    min_amount_label_text: string;
    max_amount_label_text: string;
    capabilities_title_text: string;
    requires_redirect_label_text: string;
    supports_deposit_label_text: string;
    supports_withdrawal_label_text: string;
    supports_refund_label_text: string;
    enabled_text: string;
    disabled_text: string;
    supported_regions_title_text: string;
    countries_label_text: string;
    currencies_label_text: string;
    no_countries_text: string;
    no_currencies_text: string;
    status_title_text: string;
    active_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    sort_order_label_text: string;
    created_label_text: string;
    updated_label_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
    [key: string]: string;
}

export interface PaymentMethodProfileViewContentTextInterface extends PaymentMethodProfileViewContentKeysInterface {}

export interface PaymentProviderProfileViewContentKeysInterface extends ProfileViewContentKeysInterface {
    payment_provider_logo_alt_text: string;
    code_label_text: string;
    empty_value_text: string;
    provider_information_title_text: string;
    provider_type_label_text: string;
    website_url_label_text: string;
    no_website_text: string;
    status_title_text: string;
    active_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    created_label_text: string;
    updated_label_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
    [key: string]: string;
}

export interface PaymentProviderProfileViewContentTextInterface extends PaymentProviderProfileViewContentKeysInterface {}

export interface PaymentProviderConfigProfileViewContentKeysInterface extends ProfileViewContentKeysInterface {
    payment_provider_logo_alt_text: string;
    empty_value_text: string;
    config_information_title_text: string;
    provider_name_label_text: string;
    provider_code_label_text: string;
    provider_id_label_text: string;
    environment_label_text: string;
    account_reference_label_text: string;
    settings_title_text: string;
    webhook_url_label_text: string;
    callback_url_label_text: string;
    redirect_url_label_text: string;
    success_url_label_text: string;
    failure_url_label_text: string;
    settlement_currency_label_text: string;
    default_currency_label_text: string;
    payout_schedule_label_text: string;
    capture_mode_label_text: string;
    timeout_ms_label_text: string;
    no_settings_text: string;
    credentials_title_text: string;
    credentials_hidden_text: string;
    reveal_credentials_btn_text: string;
    hide_credentials_btn_text: string;
    credentials_loading_text: string;
    credentials_permission_denied_text: string;
    no_credentials_text: string;
    api_key_label_text: string;
    secret_key_label_text: string;
    public_key_label_text: string;
    private_key_label_text: string;
    client_id_label_text: string;
    client_secret_label_text: string;
    merchant_id_label_text: string;
    account_id_label_text: string;
    username_label_text: string;
    password_label_text: string;
    webhook_hash_label_text: string;
    webhook_secret_label_text: string;
    signing_secret_label_text: string;
    status_title_text: string;
    created_label_text: string;
    updated_label_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
    [key: string]: string;
}

export interface PaymentProviderConfigProfileViewContentTextInterface extends PaymentProviderConfigProfileViewContentKeysInterface {}

export interface PaymentProviderMethodProfileViewContentKeysInterface extends ProfileViewContentKeysInterface {
    payment_provider_logo_alt_text: string;
    empty_value_text: string;
    method_information_title_text: string;
    provider_name_label_text: string;
    provider_code_label_text: string;
    provider_id_label_text: string;
    payment_method_name_label_text: string;
    payment_method_code_label_text: string;
    payment_method_id_label_text: string;
    direction_label_text: string;
    provider_method_code_label_text: string;
    amount_limits_title_text: string;
    min_amount_label_text: string;
    max_amount_label_text: string;
    status_title_text: string;
    active_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    created_label_text: string;
    updated_label_text: string;
    linked_by_title_text: string;
    [key: string]: string;
}

export interface PaymentProviderMethodProfileViewContentTextInterface extends PaymentProviderMethodProfileViewContentKeysInterface {}

export interface CurrencyPaymentProviderMethodProfileViewContentKeysInterface extends ProfileViewContentKeysInterface {
    currency_logo_alt_text: string;
    empty_value_text: string;
    currency_information_title_text: string;
    currency_name_label_text: string;
    currency_code_label_text: string;
    currency_id_label_text: string;
    provider_method_information_title_text: string;
    provider_name_label_text: string;
    provider_code_label_text: string;
    payment_method_name_label_text: string;
    payment_method_code_label_text: string;
    provider_method_id_label_text: string;
    direction_label_text: string;
    provider_method_code_label_text: string;
    amount_limits_title_text: string;
    min_amount_label_text: string;
    max_amount_label_text: string;
    status_title_text: string;
    active_label_text: string;
    active_status_text: string;
    inactive_status_text: string;
    created_label_text: string;
    updated_label_text: string;
    linked_by_title_text: string;
    [key: string]: string;
}

export interface CurrencyPaymentProviderMethodProfileViewContentTextInterface extends CurrencyPaymentProviderMethodProfileViewContentKeysInterface {}

export interface ProfileViewStateDataInterface<T = any> {
    is_loading: boolean;

    profile_record: T;

    content_keys: ProfileViewContentKeysInterface;

    content_text: ProfileViewContentTextInterface;
}

export interface PaymentProviderConfigProfileViewStateDataInterface extends ProfileViewStateDataInterface<PaymentProviderConfigRecordInterface> {
    credentials: PaymentProviderConfigCredentialsInterface | null;

    credentials_are_visible: boolean;

    is_loading_credentials: boolean;

    credentials_error_msg: string | null;
}

export interface PaymentProviderConfigProfileEntryInterface {
    key: string;
    label: string;
    value: string;
}

export interface PaymentProviderConfigProfileViewComputedDataInterface extends ProfileViewComputedDataInterface {
    loading_icon_html: string;
    logo_url: string;
    creator_member_profile_photo_url: string;
    updator_member_profile_photo_url: string;
    readable_created_at: string;
    readable_updated_at: string;
    has_credentials_permission: boolean;
    settings_entries: PaymentProviderConfigProfileEntryInterface[];
    credential_entries: PaymentProviderConfigProfileEntryInterface[];
    credentials_button_text: string;
}

export interface ProfileViewComputedDataInterface {
    app_logo_url?: string;

    logo_url?: string;

    creator_member_profile_photo_url?: string;

    updator_member_profile_photo_url?: string;

    readable_created_at?: string;

    readable_updated_at?: string;

    formatted_min_amount?: string;

    formatted_max_amount?: string;

    linked_by_member_profile_photo_url?: string;

    has_credentials_permission?: boolean;

    readable_last_key_rotated_at?: string;

    fb_social_link?: string;

    instagram_social_link?: string;

    twitter_social_link?: string;

    email_social_link?: string;

    telegram_social_link?: string;

    linkedin_social_link?: string;

    youtube_social_link?: string;

    whatsapp_social_link?: string;
}

export interface ProfileViewComponentsInterface {
    ImageRenderUI: Component;
    ProfileValue: Component;
    StatusValue: Component;
    MemberSummary: Component;
}

export interface ProfileViewClassStylesInterface {
    wrapper_class_style: string;
    loading_wrapper_class_style?: string;
    header_info_wrapper_class_style?: string;
    image_info_class_style?: ImageRenderUIClassStylesInterface;
    h3_class_style?: string;
    icon_class_style?: string;
    small_bold_underlined_text_class_style?: string;
    small_bold_value_text_class_style?: string;
    small_bold_key_text_class_style?: string;
    p_class_style?: string;
    link_class_style?: string;
    link_icon_class_style?: string;
    description_class_style?: string;
    member_avatar_img_class_style?: string;
    role_chip_wrapper_class_style?: string;
    member_name_class_style?: string;
    role_chip_class_style?: string;
    info_row_class_style?: string;
    status_text_class_style?: string;
    active_status_class_style?: string;
    inactive_status_class_style?: string;
    inactive_status_icon_class_style?: string;
    member_summary_content_class_style?: string;
    section_stack_class_style?: string;
    header_content_class_style?: string;
    header_icon_tile_class_style?: string;
    header_text_wrapper_class_style?: string;
    header_title_class_style?: string;
    social_links_wrapper_class_style?: string;
    compact_list_class_style?: string;
    app_currency_list_class_style?: string;
    app_currency_item_class_style?: string;
    app_currency_name_class_style?: string;
    app_currency_description_class_style?: string;
    empty_state_text_class_style?: string;
    credential_button_class_style?: string;
    error_text_class_style?: string;
    long_text_class_style?: string;
    metadata_class_style?: string;
    metadata_empty_class_style?: string;
    details_wrapper_class_style?: string;
    details_label_class_style?: string;
    details_value_class_style?: string;
    inline_break_class_style?: string;
    view_wrapper_class_style?: string;
    loading_icon_class_style?: string;
    eyebrow_text_class_style?: string;
    grid_class_style?: {
        two_col_responsive_grid_wrapper_class_style?: string;
        grid_wrapper_class_style?: string;
    };
}

export interface ProfileValueComponentOptionsInterface {
    component_name?: string;
    value_class_style?: string;
}

export interface StatusValueComponentOptionsInterface {
    component_name?: string;
    active_class_style?: string;
    inactive_class_style?: string;
    active_icon_class_style?: string;
    inactive_icon_class_style?: string;
}

export interface MemberSummaryComponentOptionsInterface {
    component_name?: string;
    show_empty_state?: boolean;
    always_show_member?: boolean;
    member_name_tag?: "h3" | "p";
    member_email_class_style?: string;
}

export type FetchRecordMethod<TRecord> = (record_id: string) => Promise<APIResponseInterface<TRecord>>;

export interface ProfileValuePropsInterface {
    icon: SVGIconKey;
    label: string;
    value: string | number;
}

export interface StatusValuePropsInterface {
    label: string;
    active: boolean;
    trueText: string;
    falseText: string;
    activeIsDanger?: boolean;
}

export interface MemberRoleChipInterface {
    key: string | number;
    label: string;
}

export interface MemberProfileViewComputedDataInterface extends ProfileViewComputedDataInterface {
    loading_icon_html: string;
    profile_photo_url: string;
    member_full_name: string;
    display_username: string;
    display_email: string;
    profile_status_badge_class: string;
    profile_status_text: string;
    profile_is_deleted: boolean;
    profile_image_props: Record<string, unknown>;
    member_devices_props: Record<string, unknown>;
    personal_information_items: ProfileValuePropsInterface[];
    access_status_items: StatusValuePropsInterface[];
    auth_information_items: ProfileValuePropsInterface[];
    timeline_items: ProfileValuePropsInterface[];
    member_role_items: MemberRoleChipInterface[];
}

export interface MemberProfileViewComponentsInterface extends ProfileViewComponentsInterface {
    TabsUI: Component;
    MemberDevicesView: Component;
}

export interface MemberProfileViewStateDataInterface extends ProfileViewStateDataInterface<MemberRecordInterface> {
    tabs_props: TabsUIPropsInterface;
}

export interface AccessControlProfileViewContentInterface extends ProfileViewContentTextInterface {
    empty_value_text: string;
    role_information_title_text: string;
    role_id_label_text: string;
    symbol_label_text: string;
    type_label_text: string;
    status_title_text: string;
    system_role_label_text: string;
    member_group_label_text: string;
    yes_text: string;
    no_text: string;
    system_role_text: string;
    member_group_text: string;
    custom_role_text: string;
    timeline_title_text: string;
    created_label_text: string;
    updated_label_text: string;
    created_by_title_text: string;
    updated_by_title_text: string;
}

export interface AccessControlProfileViewComputedInterface extends ProfileViewComputedDataInterface {
    role_type_text: string;
    system_role_text: string;
    member_group_text: string;
    readable_created_at: string;
    readable_updated_at: string;
    created_by_member_profile_photo_url: string;
    updated_by_member_profile_photo_url: string;
}
