

import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";
import { DropdownMenuUIClassStylesInterface } from "@ui/version_3/ui_types/dropdown_menu_ui_type";
import { ImageRenderUIClassStylesInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";
import { NavLinkUIClassStylesInterface } from "@ui/version_3/ui_types/nav_link_ui_type";
import { Component, Ref } from "vue";
import { SideBarUIClassStyleInterface } from "./side_bar_ui_type";
import { ModalUIClassStylesInterface, ModalUIPropsExtendedInterface } from "@ui/version_3/ui_types/modal_ui_type";


export interface DashboardLayoutPropsInterface {
    class_styles?: DashboardLayoutClassStylesInterface
}

export interface DashboardLayoutStateDataInterface {
    modals: ModalUIPropsExtendedInterface[]

}

export interface DashboardLayoutComputedDataInterface {
}

export interface DashboardLayoutComponentsInterface {
   TopBarUI: Component;
   SideBarUI: Component;
   ModalUI: Component;
}

export interface DashboardLayoutClassStylesInterface {
    header_class_style: string;

    main_class_style: string;

    top_bar_class_style: LayoutSectionsUIClassStylesInterface;

    hamburger_btn_class_style: ButtonUIClassStylesInterface;

    topbar_logo_class_style: ImageRenderUIClassStylesInterface;

    member_avatar_class_style: ImageRenderUIClassStylesInterface;

    // content_class_style: ContentClassstyle,
    member_avatar_drodpwn_class_style: DropdownMenuUIClassStylesInterface;

    member_avatar_dropdown_menu_list_class_style: NavLinkUIClassStylesInterface;

    side_bar_class_style: SideBarUIClassStyleInterface;

    side_bar_logo_class_style: ImageRenderUIClassStylesInterface;

    side_bar_menu_list_class_style: DropdownMenuUIClassStylesInterface;

    side_bar_menu_item_class_style: NavLinkUIClassStylesInterface;

    modal_class_style: ModalUIClassStylesInterface;
}
