import { Component } from "vue";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";
import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import { ToasterUIPropsInterface } from "@ui/version_3/ui_types/toaster_ui_type";
import { AuthsViewClassStylesInterface } from "./auth_layout_type";

export interface TwoFactorLoginViewPropsInterface {
    class_styles?: AuthsViewClassStylesInterface;
}

export interface TwoFactorLoginViewStateDataInterface {
    class_styles: AuthsViewClassStylesInterface;

    header_text_props: HeaderTextUIPropsInterface;

    otp_input_group_props: InputGroupUIPropsInterface;

    toast_alert_props: ToasterUIPropsInterface;

    btn_props: ButtonUIPropsInterface;
}

export interface TwoFactorLoginViewComputedDataInterface {}

export interface TwoFactorLoginViewComponentsInterface {
    HeaderTextUI: Component;
    InputGroupUI: Component;
    ToasterUI: Component;
    ButtonUI: Component;
}
