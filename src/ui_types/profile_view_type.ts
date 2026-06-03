import { Component, Ref } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";
import { ImageRenderUIClassStylesInterface } from "@ui/version_3/ui_types/image_render_ui_type";

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

export interface ProfileViewStateDataInterface<T = any> {
    is_loading: boolean;

    profile_record: T;

    content_keys: ProfileViewContentKeysInterface;

    content_text: ProfileViewContentTextInterface;
}

export interface PaymentProviderConfigProfileViewStateDataInterface extends ProfileViewStateDataInterface {
    credentials: Record<string, string | null | undefined> | null;

    credentials_are_visible: boolean;

    is_loading_credentials: boolean;

    credentials_error_msg: string | null;
}

export interface ProfileViewComputedDataInterface {
    app_logo_url?: string;

    logo_url?: string;

    creator_member_profile_photo_url?: string;

    updator_member_profile_photo_url?: string;

    readable_created_at?: string;

    readable_updated_at?: string;

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
    grid_class_style?: {
        two_col_responsive_grid_wrapper_class_style?: string;
        grid_wrapper_class_style?: string;
    };
}

export type FetchRecordMethod<TRecord> = (
    record_id: string
) => Promise<APIResponseInterface<TRecord>>;
