
import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";
import { InputGroupUIClassStylesInterface, InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";
import { Component, Ref } from "vue";


export interface LoginViewPropsInterface {
    class_styles?: LoginViewClassStylesInterface
}

export interface LoginViewStateDataInterface {
    csrf_token: string | null;

    header_text_props: HeaderTextUIPropsInterface;

    username_input_group_props: InputGroupUIPropsInterface;

    password_input_group_props: InputGroupUIPropsInterface;

    toast_alert_props: null;

    btn_props: null;
}

export interface LoginViewComputedDataInterface {
    
}

export interface LoginViewComponentsInterface {
    HeaderTextUI: Component;
    InputGroupUI: Component;
    // ToastAlertUI: Component;
    // ButtonUI: Component;
}

export interface LoginViewClassStylesInterface {
    wrapper_class_style: string;

    form_box_class_style: string;

    form_box_wrapper_class_style: string;

    header_text_class_style: string;

    fieldset_class_style: string;

    input_group_class_style: InputGroupUIClassStylesInterface,

    input_ui_class_styles: InputUIClassStylesInterface
}