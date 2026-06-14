import { Component } from "vue";

import { MemberRecordInterface } from "@/types/api_service_type";

import { MyProfileFieldsType } from "@/types/form_fields_type";

import {
    FormViewClassStylesInterface,
    FormViewComputedDataInterface,
    FormViewPropsInterface,
    FormViewStateDataInterface
} from "@/ui_types/form_view_type";

interface MyProfileViewContentTextInterface {
    eyebrow_text: string;
    fallback_title_text: string;
    description_text: string;
    member_id_label_text: string;
    unavailable_text: string;
    profile_information_title_text: string;
    profile_information_description_text: string;
    password_title_text: string;
    password_description_text: string;
    uploading_photo_text: string;
    photo_alt_text: string;
    username_label_text: string;
    roles_label_text: string;
    last_login_label_text: string;
    password_changed_label_text: string;
    not_set_text: string;
    no_roles_text: string;
    not_available_text: string;
    save_profile_hint_text: string;
    save_password_hint_text: string;
    active_account_text: string;
    inactive_account_text: string;
    verified_member_text: string;
    unverified_member_text: string;
    two_factor_enabled_text: string;
    two_factor_disabled_text: string;
}

interface MyProfileSummaryItemInterface {
    label: string;
    value: string;
}

interface MyProfileStatusBadgeInterface {
    label: string;
}

interface MyProfileViewStateDataInterface extends FormViewStateDataInterface<MyProfileFieldsType> {
    member: MemberRecordInterface | null;
    avatar_src: string;
    content_text: MyProfileViewContentTextInterface;
    account_summary: MyProfileSummaryItemInterface[];
    status_badges: MyProfileStatusBadgeInterface[];
    is_uploading_photo: boolean;
}

interface MyProfileViewComputedDataInterface extends FormViewComputedDataInterface {
    full_name: string;
    save_hint: string;
}

interface MyProfileViewComponentsInterface {
    HeaderTextUI: Component;
    InputGroupUI: Component;
    ToasterUI: Component;
    ButtonUI: Component;
}

interface MyProfileViewClassStylesInterface extends FormViewClassStylesInterface {
    page_wrapper_class_style: string;
    content_wrapper_class_style: string;
    alert_wrapper_class_style: string;
    shell_class_style: string;
    hero_class_style: string;
    hero_content_class_style: string;
    hero_top_row_class_style: string;
    hero_text_wrapper_class_style: string;
    eyebrow_text_class_style: string;
    hero_title_class_style: string;
    hero_description_class_style: string;
    member_id_box_class_style: string;
    member_id_label_class_style: string;
    member_id_value_class_style: string;
    badge_list_class_style: string;
    badge_class_style: string;
    form_class_style: string;
    form_grid_class_style: string;
    side_panel_class_style: string;
    avatar_card_class_style: string;
    avatar_wrapper_class_style: string;
    avatar_img_class_style: string;
    avatar_name_class_style: string;
    avatar_email_class_style: string;
    upload_text_class_style: string;
    summary_list_class_style: string;
    summary_item_class_style: string;
    summary_label_class_style: string;
    summary_value_class_style: string;
    main_panel_class_style: string;
    panel_class_style: string;
    panel_header_class_style: string;
    panel_title_class_style: string;
    panel_description_class_style: string;
    field_grid_class_style: string;
    full_width_field_class_style: string;
    action_bar_class_style: string;
    save_hint_class_style: string;
}

type MyProfileViewPropsInterface = FormViewPropsInterface<MemberRecordInterface>;

export {
    MyProfileViewClassStylesInterface,
    MyProfileViewComponentsInterface,
    MyProfileViewComputedDataInterface,
    MyProfileViewContentTextInterface,
    MyProfileViewPropsInterface,
    MyProfileViewStateDataInterface,
    MyProfileStatusBadgeInterface,
    MyProfileSummaryItemInterface
};
