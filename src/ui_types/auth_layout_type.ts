import { CopyRightUIPropsInterface } from "@ui/version_3/ui_types/copy_rigth_ui_type";
import { Component } from "vue";
import { FormViewClassStylesInterface } from "./form_view_type";

export interface AuthLayoutPropsInterface {
    class_styles?: AuthLayoutClassStylesInterface;
}

export interface AuthLayoutStateDataInterface {
    copyright_props: CopyRightUIPropsInterface;
}

export interface AuthLayoutComputedDataInterface {
    is_route_ready: boolean;
}

export interface AuthLayoutComponentsInterface {
    CopyRightUI: Component;
}

export interface AuthsViewClassStylesInterface extends FormViewClassStylesInterface {
    wrapper_class_style: string;

    form_box_class_style: string;
}

export interface AuthLayoutClassStylesInterface {
    main_bg_class_style: string;
    footer_class_style: string;
    auth_view_class_style: AuthsViewClassStylesInterface;
}
