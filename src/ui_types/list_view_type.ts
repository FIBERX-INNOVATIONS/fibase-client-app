
import { Component, Ref } from "vue";

import { BreadcrumbUIClassStylesInterface, BreadcrumbUIPropsInterface } from "@ui/version_3/ui_types/breadcrumb_ui_type";




export interface ListViewPropsInterface {
    class_styles?: ListViewClassStylesInterface;
}

export interface ListViewStateDataInterface {
    breadcrumb_props: BreadcrumbUIPropsInterface;
    
}

export interface ListViewComputedDataInterface {
    
}

export interface ListViewComponentsInterface {
    BreadcrumbUI: Component
}

export interface ListViewClassStylesInterface {
    wrapper_class_style: string;

    list_view_breadcrumb_class_styles: BreadcrumbUIClassStylesInterface;

}