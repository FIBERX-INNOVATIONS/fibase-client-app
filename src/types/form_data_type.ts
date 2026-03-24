

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
    urls: string[] | null
}