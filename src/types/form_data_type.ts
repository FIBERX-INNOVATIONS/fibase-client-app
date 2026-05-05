

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

export type FieldValidator<FormData> = (
    value: any,
    form_data: Partial<FormData>
) => Promise<ActionMethodRetrunInterface> | ActionMethodRetrunInterface;

export interface BaseFormData {
    csrf_token: string | null;
}

export interface LoginFormDataInterface extends BaseFormData {
    username: string | null;
    password: string | null;
}

export interface TwoFactorFormDataInterface extends BaseFormData {
    otp_code: string;
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

export interface RegisteredAppFromDataInterface extends BaseFormData {
    name: string;
    prefix: string;
    description: string;
    base_url: string;
    logo_url: string;
    social_links: RegisteredAppSocialLinksInterface | null
    urls: string | null
}

export interface RegisteredAppValidatedFromDataInterface extends BaseFormData {
    name: string;
    prefix: string;
    description: string;
    base_url: string;
    logo_url: string;
    social_links: RegisteredAppSocialLinksInterface | null
    urls: string[];
}

export interface StorageFileUploadFormDataInterface {
    file: File;                
    reference_type: string;    
    is_public?: boolean;      
}

export interface CurrencyFromDataInterface extends BaseFormData {
    code: string;
    logo_url: string;
    numeric_code: string | null;
    name: string;
    symbol: string;
    precision: number;
    minor_unit: number | null;
    format: string | null;
    country_code: string | null;
    is_fiat: boolean;
    sort_order: number | null;
}

export interface CurrencyValidatedFromDataInterface extends BaseFormData {
    code: string;
    logo_url: string;
    numeric_code: string | null;
    name: string;
    symbol: string;
    precision: number;
    minor_unit: number | null;
    format: string | null;
    country_code: string | null;
    is_fiat: boolean;
    sort_order: number | null;
}

export interface AppCurrencyActionFromDataInterface extends BaseFormData {
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