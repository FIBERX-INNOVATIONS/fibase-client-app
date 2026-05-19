import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";
import { CopyRightUIPropsInterface } from "@ui/version_3/ui_types/copy_rigth_ui_type";
import { InputGroupUIClassStylesInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";
import { ToasterUIClassStylesInterface } from "@ui/version_3/ui_types/toaster_ui_type";
import { Component, Ref } from "vue";
import { FormViewClassStylesinterface } from "./form_view_type";

export interface AuthLayoutPropsInterface {
    class_styles?: AuthLayoutClassStylesInterface;
}

export interface AuthLayoutStateDataInterface {
    copyright_props: CopyRightUIPropsInterface;
}

export interface AuthLayoutComputedDataInterface {}

export interface AuthLayoutComponentsInterface {
    CopyRightUI: Component;
}

export interface AuthsViewClassStylesInterface extends FormViewClassStylesinterface {
    wrapper_class_style: string;

    form_box_class_style: string;
}

export interface AuthLayoutClassStylesInterface {
    main_bg_class_style: string;
    footer_class_style: string;
    auth_view_class_style: AuthsViewClassStylesInterface;
}
