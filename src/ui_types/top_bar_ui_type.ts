import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { DropdownMenuUIPropsInterface } from "@ui/version_3/ui_types/dropdown_menu_ui_type";
import { ImageRenderUIPropsInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";
import { Component, Ref } from "vue";

export interface TopBarUIPropsInterface {
    class_styles?: LayoutSectionsUIClassStylesInterface;
}

export interface TopBarUIStateDataInterface {
    hamburger_btn_props: ButtonUIPropsInterface;
    nav_logo_props: ImageRenderUIPropsInterface;
    member_avatar_props: ImageRenderUIPropsInterface;
    member_avatar_dropdown_props: DropdownMenuUIPropsInterface;
}

export interface TopBarUIComputedDataInterface {}

export interface TopBarUIComponentsInterface {
    LayoutSectionsUI: Component;
    ButtonUI: Component;
    ImageRenderUI: Component;
    DropdownMenuUI: Component;
}
