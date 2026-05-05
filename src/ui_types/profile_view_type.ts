
import { Component, Ref } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";
import { ImageRenderUIClassStylesInterface } from "@ui/version_3/ui_types/image_render_ui_type";


export interface ProfileViewPropsInterface<T = any>  {
    record?: T;

    record_id: string;
}



export interface ProfileViewStateDataInterface<T = any> {
    is_loading: boolean;

    profile_record: T
    
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

    }

}

export type FetchRecordMethod<TRecord> = (record_id: string) => Promise<APIResponseInterface<TRecord>>;