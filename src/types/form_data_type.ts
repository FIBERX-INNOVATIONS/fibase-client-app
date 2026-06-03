import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import type {
    PaymentConfigDirectionType,
    PaymentMethodMetadataInterface,
    PaymentProviderConfigCredentialsInterface,
    PaymentProviderConfigEnvironmentType,
    PaymentProviderConfigSettingsInterface
} from "@/types/api_service_type";

export type FieldValidator<FormData> = (
    value: any,
    form_data: Partial<FormData>
) => Promise<ActionMethodRetrunInterface> | ActionMethodRetrunInterface;

export interface BaseFormData extends Record<string, any> {
    csrf_token: string | null;
}

export interface LoginFormDataInterface extends BaseFormData {
    username: string | null;
    password: string | null;
}

export interface TwoFactorFormDataInterface extends BaseFormData {
    otp_code: string | null;
}

export interface RegisteredAppSocialLinksInterface {
    fb_social_link?: string | null;
    instagram_social_link?: string | null;
    twitter_social_link?: string | null;
    email_social_link?: string | null;
    telegram_social_link?: string | null;
    linkedin_social_link?: string | null;
    youtube_social_link?: string | null;
    whatsapp_social_link?: string | null;
}

export interface RegisteredAppFormDataInterface extends BaseFormData {
    name: string;
    prefix: string;
    description: string;
    base_url: string;
    logo_url: string;
    social_links: RegisteredAppSocialLinksInterface | null;
    urls: string | null;
}

export interface RegisteredAppValidatedFormDataInterface extends BaseFormData {
    name: string;
    prefix: string;
    description: string;
    base_url: string;
    logo_url: string;
    social_links: RegisteredAppSocialLinksInterface | null;
    urls: string[];
}

export interface StorageFileUploadFormDataInterface {
    file: File;
    reference_type: string;
    is_public?: boolean;
}

export interface CurrencyFormDataInterface extends BaseFormData {
    code: string;
    logo_url: string;
    numeric_code: string | null;
    name: string;
    symbol: string;
    precision: number;
    minor_unit: number | null;
    country_code: string | null;
    is_fiat: boolean;
    sort_order: number | null;
}

export interface CurrencyValidatedFormDataInterface extends BaseFormData {
    code: string;
    logo_url: string;
    numeric_code: string | null;
    name: string;
    symbol: string;
    precision: number;
    minor_unit: number | null;
    country_code: string | null;
    is_fiat: boolean;
    sort_order: number | null;
}

export interface AppCurrencyActionFormDataInterface extends BaseFormData {
    currency_code_or_id?: string | number;
    currency_list?: (string | number)[];
    app_id: string | number;
    registered_app_id?: string | number;
    action: "assign" | "unassign";
}

export interface AppCurrencyFormDataInterface extends BaseFormData {
    currency_code_or_id?: string | number;
    currency_list?: (string | number)[];
    app_id: string | number;
    registered_app_id?: string | number;
    action: "assign" | "unassign";
}

export interface AppCurrencyActionValidatedFormDataInterface extends BaseFormData {
    app_id: string | number;
    currency_list: (string | number)[];
    action: "assign" | "unassign";
    is_default?: boolean;
}

export interface AppCurrencyToggleDefaultFormDataInterface extends BaseFormData {
    csrf_token: string;
    app_id: string | number;
    currency_code_or_id: string | number;
}

export interface AppCurrencyToggleDefaultValidatedformDataInterface extends BaseFormData {
    csrf_token: string;
    app_id: string | number;
    currency_code_or_id: string | number;
}

export interface CreatePaymentMethodPayloadInterface extends BaseFormData {
    csrf_token: string;
    code: string;
    name: string;
    description?: string | null;
    icon_url?: string | null;
    sort_order?: number | null;
    metadata?: PaymentMethodMetadataInterface | null;
}

export interface UpdatePaymentMethodPayloadInterface extends BaseFormData {
    csrf_token: string;
    code?: string;
    name?: string;
    description?: string | null;
    icon_url?: string | null;
    sort_order?: number | null;
    metadata?: PaymentMethodMetadataInterface | null;
}

export interface PaymentMethodFormDataInterface extends BaseFormData {
    csrf_token: string | null;
    code: string;
    name: string;
    description?: string | null;
    icon_url?: string | null;
    sort_order?: number | null;
    display_name?: string | null;
    display_description?: string | null;
    display_group?: string | null;
    processing_time_text?: string | null;
    fee_label?: string | null;
    supported_country_codes?: string[] | null;
    supported_currency_codes?: string[] | null;
    requires_redirect?: boolean;
    supports_deposit?: boolean;
    supports_withdrawal?: boolean;
    supports_refund?: boolean;
    min_amount?: number | null;
    max_amount?: number | null;
}

export interface CreatePaymentProviderPayloadInterface extends BaseFormData {
    csrf_token: string;
    code: string;
    name: string;
    description?: string | null;
    provider_type?: string;
    logo_url?: string | null;
    website_url?: string | null;
}

export interface UpdatePaymentProviderPayloadInterface extends BaseFormData {
    csrf_token: string;
    code?: string;
    name?: string;
    description?: string | null;
    provider_type?: string;
    logo_url?: string | null;
    website_url?: string | null;
}

export interface PaymentProviderFormDataInterface extends BaseFormData {
    csrf_token: string | null;
    code: string;
    name: string;
    description?: string | null;
    provider_type?: string;
    logo_url?: string | null;
    website_url?: string | null;
}

export interface CreatePaymentProviderConfigPayloadInterface extends BaseFormData {
    csrf_token: string;
    provider_id: string | number;
    environment?: PaymentProviderConfigEnvironmentType;
    account_reference?: string | null;
    credentials?: PaymentProviderConfigCredentialsInterface | null;
    settings?: PaymentProviderConfigSettingsInterface | null;
}

export interface UpdatePaymentProviderConfigPayloadInterface extends BaseFormData {
    csrf_token: string;
    provider_id?: string | number;
    environment?: PaymentProviderConfigEnvironmentType;
    account_reference?: string | null;
    credentials?: PaymentProviderConfigCredentialsInterface | null;
    settings?: PaymentProviderConfigSettingsInterface | null;
}

export interface PaymentProviderConfigFormDataInterface extends BaseFormData {
    csrf_token: string | null;
    provider_id: string | number;
    environment: PaymentProviderConfigEnvironmentType;
    account_reference?: string | null;
    api_key?: string | null;
    secret_key?: string | null;
    public_key?: string | null;
    private_key?: string | null;
    client_id?: string | null;
    client_secret?: string | null;
    merchant_id?: string | null;
    account_id?: string | null;
    username?: string | null;
    password?: string | null;
    webhook_hash?: string | null;
    webhook_secret?: string | null;
    signing_secret?: string | null;
    webhook_url?: string | null;
    callback_url?: string | null;
    redirect_url?: string | null;
    success_url?: string | null;
    failure_url?: string | null;
    settlement_currency?: string | null;
    default_currency?: string | null;
    payout_schedule?: string | null;
    capture_mode?: string | null;
    timeout_ms?: string | number | null;
}

export interface CreatePaymentProviderMethodPayloadInterface extends BaseFormData {
    csrf_token: string;
    provider_id: string | number;
    payment_method_id: string | number;
    direction: PaymentConfigDirectionType;
    provider_method_code?: string | null;
    min_amount?: number | null;
    max_amount?: number | null;
}

export interface UpdatePaymentProviderMethodPayloadInterface extends BaseFormData {
    csrf_token: string;
    provider_id?: string | number;
    payment_method_id?: string | number;
    direction?: PaymentConfigDirectionType;
    provider_method_code?: string | null;
    min_amount?: number | null;
    max_amount?: number | null;
}

export interface CreateCurrencyPaymentProviderMethodPayloadInterface extends BaseFormData {
    csrf_token: string;
    currency_id: string | number;
    provider_method_id: string | number;
    min_amount?: number | null;
    max_amount?: number | null;
}

export interface UpdateCurrencyPaymentProviderMethodPayloadInterface extends BaseFormData {
    csrf_token: string;
    currency_id?: string | number;
    provider_method_id?: string | number;
    min_amount?: number | null;
    max_amount?: number | null;
}
