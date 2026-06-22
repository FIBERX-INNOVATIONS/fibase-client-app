import { Component } from "vue";

import { ActivateAccountFieldsType } from "@/types/form_fields_type";

import { MemberRecordInterface, ValidateMemberSetupTokenResponseInterface } from "@/types/api_service_type";

import {
    FormViewComponentsInterface,
    FormViewComputedDataInterface,
    FormViewPropsWithClassStyles,
    FormViewStateDataInterface
} from "@/ui_types/form_view_type";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";
import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ContentCardUIClassStylesInterface } from "@ui/version_3/ui_types/content_card_ui_type";

export type ActivateAccountStepType = "loading" | "password" | "two_factor" | "invalid";

export interface ActivateAccountViewClassStylesInterface extends AuthsViewClassStylesInterface {
    loader_text_class_style: string;

    instruction_class_style: string;

    form_actions_class_style: string;

    secondary_button_wrapper_class_style: string;

    password_toggle_wrapper_class_style: string;

    two_factor_wrapper_class_style: string;

    two_factor_instruction_class_style: string;

    app_links_grid_class_style: string;

    app_link_class_style: string;

    qr_setup_class_style: string;

    qr_image_wrapper_class_style: string;

    qr_image_class_style: string;

    secret_section_class_style: string;

    authenticator_apps_title_class_style: string;

    back_button_class_style: string;

    password_toggle_button_class_styles: ButtonUIClassStylesInterface;

    secret_key_card_class_styles: ContentCardUIClassStylesInterface;

    spinner_class_style: string;
}

export interface ActivateAccountContentTextInterface {
    validating_text: string;

    invalid_token_text: string;

    invalid_token_help_text: string;

    password_instruction_text: string;

    two_factor_instruction_text: string;

    authenticator_apps_title_text: string;

    qr_instruction_text: string;

    otp_instruction_text: string;

    secret_key_title_text: string;

    secret_key_empty_text: string;

    copy_button_text: string;

    copied_button_text: string;
}

export interface ActivateAccountViewPropsInterface extends FormViewPropsWithClassStyles<ActivateAccountViewClassStylesInterface> {}

export interface ActivateAccountViewStateDataInterface extends FormViewStateDataInterface<ActivateAccountFieldsType> {
    class_styles: ActivateAccountViewClassStylesInterface;

    current_step: ActivateAccountStepType;

    loader_text: string;

    spinner_html_content: string;

    setup_data: ValidateMemberSetupTokenResponseInterface | null;

    qr_code_data_url: string;

    copied_secret_key: string;

    show_password: boolean;

    content_text: ActivateAccountContentTextInterface;

    back_btn_props: ButtonUIPropsInterface;

    password_toggle_btn_props: ButtonUIPropsInterface;
}

export interface ActivateAccountViewComputedDataInterface extends FormViewComputedDataInterface {
    member_context: MemberRecordInterface | null;

    is_loading_step: boolean;

    is_password_step: boolean;

    is_two_factor_step: boolean;

    secret_key_text: string;

    secret_key_card_props: ContentCardUIPropsInterface;
}

export interface ActivateAccountViewComponentsInterface extends FormViewComponentsInterface {
    TwoFactorSetupView: Component;

    ContentCardUI: Component;
}
