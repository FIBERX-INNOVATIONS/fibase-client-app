
import { Component, Ref } from "vue";

import { BreadcrumbUIClassStylesInterface, BreadcrumbUIPropsInterface } from "@ui/version_3/ui_types/breadcrumb_ui_type";
import { PageHeaderUIClassStylesInterface, PageHeaderUIPropsInterface } from "@ui/version_3/ui_types/page_header_ui_type";
import { FiltersPanelUIClassStylesInterface, FiltersPanelUIPropsInterface } from "@ui/version_3/ui_types/filters_panel_ui_type";
import { InputGroupUIClassStylesInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";
import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";




export interface ListViewPropsInterface {
    class_styles?: ListViewClassStylesInterface;
}

export interface ListViewStateDataInterface {
    breadcrumb_props: BreadcrumbUIPropsInterface;

    page_header_props: PageHeaderUIPropsInterface;

    filters_panel_props: FiltersPanelUIPropsInterface;
    
}

export interface ListViewComputedDataInterface {
    
}

export interface ListViewComponentsInterface {
    BreadcrumbUI: Component;

    PageHeaderUI: Component;

    FiltersPanelUI: Component
}

export interface ListViewClassStylesInterface {
    wrapper_class_style: string;

    list_view_breadcrumb_class_styles: BreadcrumbUIClassStylesInterface;

    page_header_class_styles: PageHeaderUIClassStylesInterface;

    filters_class_styles: FiltersPanelUIClassStylesInterface;

    filters_input_group_class_styles: InputGroupUIClassStylesInterface;

    filters_input_ui_class_styles: InputUIClassStylesInterface;

}