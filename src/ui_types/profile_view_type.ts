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

export interface ProfileViewStateDataInterface<T = any> {
    is_loading: boolean;

    profile_record: T;

    content_keys: ProfileViewContentKeysInterface;

    content_text: ProfileViewContentTextInterface;
}

export interface ProfileViewComputedDataInterface {
    app_logo_url?: string;

    logo_url?: string;

    creator_member_profile_photo_url?: string;

    updator_member_profile_photo_url?: string;

    readable_created_at?: string;

    readable_updated_at?: string;

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
