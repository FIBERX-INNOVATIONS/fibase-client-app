import { Component, Ref } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { PaginatedResponseResultInterface } from "@/types/api_service_type";

import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";

import { DropdownMenuUIPropsInterface } from "@ui/version_3/ui_types/dropdown_menu_ui_type";

import { InputGroupUIClassStylesInterface } from "@ui/version_3/ui_types/input_group_ui_type";

import {
    BreadcrumbUIClassStylesInterface,
    BreadcrumbUIPropsInterface
} from "@ui/version_3/ui_types/breadcrumb_ui_type";

import {
    PageHeaderUIClassStylesInterface,
    PageHeaderUIPropsInterface
} from "@ui/version_3/ui_types/page_header_ui_type";

import {
    FiltersPanelUIClassStylesInterface,
    FiltersPanelUIPropsInterface
} from "@ui/version_3/ui_types/filters_panel_ui_type";

import {
    DataTableUIClassStylesInterface,
    DataTableUIPropsInterface
} from "@ui/version_3/ui_types/data_table_ui_type";

import { DataTableCellComponentUIClassStylesInterface } from "@ui/version_3/ui_types/data_table_cell_component_ui_type";

import {
    DataTableResultAndBulkActionBarUIClassStylesInterface,
    DataTableResultAndBulkActionBarUIPropsInterface
} from "@ui/version_3/ui_types/data_table_result_and_bulk_action_bar_ui_type";

import {
    PaginationUIClassStylesInterface,
    PaginationUIPropsInterface
} from "@ui/version_3/ui_types/pagination_ui_type";

export type FieldArray<T, K extends keyof T> = T[K][];

export interface ListViewPropsInterface {
    class_styles?: ListViewClassStylesInterface;
}

export interface ListViewContentKeysInterface {
    breadcrumb_list: string;
    header_text: string;
    header_description_text: string;
    create_button_text: string;
    filters_toggle_button_text: string;
    filters_toggle_button_icon: string;
    clear_filters_button_text: string;
    apply_filters_button_text: string;
    loader_html: string;
    empty_data_html: string;
    table_result_text: string;
    table_pagination_text: string;
    filters_content_key: string;
    add_new_modal_content_key: string;
    update_modal_content_key: string;
    profile_details_modal_content_key: string;
    delete_modal_content_key: string;
}

export interface ListStateInterface<T extends object = Record<string, unknown>> {
    is_loading: boolean;

    records: T[];

    current_page: number;
    total_pages: number;
    total_items: number;

    limit: number;

    sort_by: string | null;
    sort_direction: "asc" | "desc" | null;
}

export interface ListViewStateDataInterface<
    T extends object = Record<string, unknown>,
    K extends keyof T = keyof T
> {
    data_table_key: string;

    selected_records: FieldArray<T, K>;

    breadcrumb_props: BreadcrumbUIPropsInterface;

    page_header_props: PageHeaderUIPropsInterface;

    filters_panel_props: FiltersPanelUIPropsInterface;

    data_table_result_and_bulk_action_bar_props: DataTableResultAndBulkActionBarUIPropsInterface;

    table_props: DataTableUIPropsInterface<T>;

    list_state: ListStateInterface<T>;

    action_menu_dropdown_props: DropdownMenuUIPropsInterface;

    bulk_action_menu_dropdown_props: DropdownMenuUIPropsInterface;

    pagination_ui_props: PaginationUIPropsInterface;
}

export interface ListViewComputedDataInterface {}

export interface ListViewComponentsInterface {
    BreadcrumbUI: Component;

    PageHeaderUI: Component;

    FiltersPanelUI: Component;

    DataTableResultAndBulkActionBarUI: Component;

    DataTableUI: Component;

    DropdownMenuUI: Component;

    PaginationUI: Component;
}

export interface ListViewClassStylesInterface {
    wrapper_class_style: string;

    list_view_breadcrumb_class_styles: BreadcrumbUIClassStylesInterface;

    page_header_class_styles: PageHeaderUIClassStylesInterface;

    filters_class_styles: FiltersPanelUIClassStylesInterface;

    filters_input_group_class_styles: InputGroupUIClassStylesInterface;

    filters_input_ui_class_styles: InputUIClassStylesInterface;

    table_result_and_bulk_action_bar_class_styles: DataTableResultAndBulkActionBarUIClassStylesInterface;

    table_class_styles: DataTableUIClassStylesInterface;

    table_cell_components_class_styles: DataTableCellComponentUIClassStylesInterface;

    table_pagination_ui_class_styles: PaginationUIClassStylesInterface;
}

export type FetchListMethod<TFilters extends object, TRecord extends object> = (params: {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: TFilters;
}) => Promise<APIResponseInterface<PaginatedResponseResultInterface<TRecord[]>>>;
