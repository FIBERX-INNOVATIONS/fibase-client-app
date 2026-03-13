

import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ImageRenderUIClassStylesInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";
import { Component, Ref } from "vue";


export interface DashboardLayoutPropsInterface {
    class_styles?: DashboardLayoutClassStylesInterface
}

export interface DashboardLayoutStateDataInterface {

}

export interface DashboardLayoutComputedDataInterface {
}

export interface DashboardLayoutComponentsInterface {
   TopBarUI: Component
}

export interface DashboardLayoutClassStylesInterface {
    header_class_style: string;
    main_class_style: string;
    top_bar_class_style: LayoutSectionsUIClassStylesInterface;
    hamburger_btn_class_style: ButtonUIClassStylesInterface;
    topbar_logo_class_style: ImageRenderUIClassStylesInterface
}
