import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { DropdownMenuUIPropsInterface } from "@ui/version_3/ui_types/dropdown_menu_ui_type";
import { ImageRenderUIPropsInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";
import {
    OverlayUIClassStylesInterface,
    OverlayUIPropsInterface
} from "@ui/version_3/ui_types/overlay_ui_type";
import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { Component, Ref } from "vue";

export interface SideBarNavigationContentItemInterface {
    menu_id_text?: string;

    menu_text?: string;

    menu_icon?: SVGIconKey | string;

    menu_link?: string;

    menu_img_link?: string;

    menu_permission_text?: string;

    children_list?: SideBarNavigationContentItemInterface[];
}

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
