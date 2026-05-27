import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { DropdownMenuUIPropsInterface } from "@ui/version_3/ui_types/dropdown_menu_ui_type";
import { ImageRenderUIPropsInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";
import {
    OverlayUIClassStylesInterface,
    OverlayUIPropsInterface
} from "@ui/version_3/ui_types/overlay_ui_type";

import { Component, Ref } from "vue";

export interface SideBarUIClassStyleInterface {
    overlay_class_style: OverlayUIClassStylesInterface;

    layout_section_class_style: LayoutSectionsUIClassStylesInterface;
}

export interface SideBarUIPropsInterface {
    class_styles?: SideBarUIClassStyleInterface;
}

export interface SideBarUIStateDataInterface {
    sidebar_overlay_props: OverlayUIPropsInterface;

    logo_img_props: ImageRenderUIPropsInterface;

    nav_menu_list_props: DropdownMenuUIPropsInterface;
}

export interface SideBarUIComputedDataInterface {}

export interface SideBarUIComponentsInterface {
    OverlayUI: Component;
    LayoutSectionsUI: Component;
    ButtonUI: Component;
    ImageRenderUI: Component;
    DropdownMenuUI: Component;
}
