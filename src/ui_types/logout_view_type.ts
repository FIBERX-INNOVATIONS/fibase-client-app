import { Component, Ref } from "vue";
import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";
import { AuthsViewClassStylesInterface } from "./auth_layout_type";

export interface LogoutViewPropsInterface {
    class_styles?: AuthsViewClassStylesInterface;
}

export interface LogoutViewStateDataInterface {
    header_text_props: HeaderTextUIPropsInterface;

    spinner_html_content: string;
}

export interface LogoutViewComputedDataInterface {}

export interface LogoutViewComponentsInterface {
    HeaderTextUI: Component;
}
