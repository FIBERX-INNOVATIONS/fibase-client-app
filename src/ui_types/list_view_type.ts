
import { Component, Ref } from "vue";

import { BreadcrumbUIClassStylesInterface, BreadcrumbUIPropsInterface } from "@ui/version_3/ui_types/breadcrumb_ui_type";
import { PageHeaderUIClassStylesInterface, PageHeaderUIPropsInterface } from "@ui/version_3/ui_types/page_header_ui_type";
import { FiltersPanelUIClassStylesInterface, FiltersPanelUIPropsInterface } from "@ui/version_3/ui_types/filters_panel_ui_type";
import { InputGroupUIClassStylesInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";
import { DataTableUIClassStylesInterface, DataTableUIPropsInterface } from "@ui/version_3/ui_types/data_table_ui_type";
import { APIResponseInterface } from "@ui/version_3/types/util_type";
import { PaginatedResponseResultInterface } from "@/types/api_service_type";
import { DataTableCellComponentUIClassStylesInterface } from "@ui/version_3/ui_types/data_table_cell_component_ui_type";
import { DropdownMenuUIPropsInterface } from "@ui/version_3/ui_types/dropdown_menu_ui_type";




export interface ListViewPropsInterface {
    class_styles?: ListViewClassStylesInterface;
}

export interface ListStateInterface<T = any> {
    is_loading: boolean;

    records: T[];

    current_page: number;
    total_pages: number;
    total_items: number;

    limit: number;

    sort_by: string | null;
    sort_direction: "asc" | "desc" | null;
}

export interface ListViewStateDataInterface<T = any> {
    
    breadcrumb_props: BreadcrumbUIPropsInterface;

    page_header_props: PageHeaderUIPropsInterface;

    filters_panel_props: FiltersPanelUIPropsInterface;

    table_props: DataTableUIPropsInterface<T>;

    list_state: ListStateInterface<T>;

    action_menu_dropdown_props: DropdownMenuUIPropsInterface;
    
}

export interface ListViewComputedDataInterface {
    
}

export interface ListViewComponentsInterface {
    BreadcrumbUI: Component;

    PageHeaderUI: Component;

    FiltersPanelUI: Component;

    DataTableUI: Component;

    DropdownMenuUI: Component;
}

export interface ListViewClassStylesInterface {
    wrapper_class_style: string;

    list_view_breadcrumb_class_styles: BreadcrumbUIClassStylesInterface;

    page_header_class_styles: PageHeaderUIClassStylesInterface;

    filters_class_styles: FiltersPanelUIClassStylesInterface;

    filters_input_group_class_styles: InputGroupUIClassStylesInterface;

    filters_input_ui_class_styles: InputUIClassStylesInterface;

    table_class_styles: DataTableUIClassStylesInterface;

    table_cell_components_class_styles: DataTableCellComponentUIClassStylesInterface;

}

export type FetchListMethod<TFilters, TRecord> = (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: string;
    filters?: TFilters;
}) => Promise<APIResponseInterface<PaginatedResponseResultInterface<TRecord>>>;