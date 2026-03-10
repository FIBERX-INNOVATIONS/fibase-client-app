import { CopyRightUIPropsInterface } from "@ui/version_3/ui_types/copy_rigth_ui_type";
import { Component, Ref } from "vue";


export interface AuthLayoutPropsInterface {
    class_styles?: AuthLayoutClassStylesInterface
}

export interface AuthLayoutStateDataInterface {
    copyright_props: CopyRightUIPropsInterface;
}

export interface AuthLayoutComputedDataInterface {
}

export interface AuthLayoutComponentsInterface {
    CopyRightUI: Component;
}

export interface AuthLayoutClassStylesInterface {
    main_bg_class_style: string;
    footer_class_style: string;
}