import { Component } from "vue";

import { PaginationUIPropsInterface } from "@ui/version_3/ui_types/pagination_ui_type";

import { ContentCardUIClassStylesInterface } from "@ui/version_3/ui_types/content_card_ui_type";

import { TransactionReceiptRecordInterface } from "@/types/api_service_type";

export interface TransactionReceiptViewPropsInterface {
    transaction_id: string;
}

export interface TransactionReceiptViewClassStylesInterface {
    wrapper_class_style: string;
    search_wrapper_class_style: string;
    search_icon_class_style: string;
    search_input_class_style: string;
    permission_state_class_style: string;
    loading_wrapper_class_style: string;
    loading_icon_class_style: string;
    empty_state_class_style: string;
    cards_grid_class_style: string;
    pagination_wrapper_class_style: string;
    pagination_text_class_style: string;
    receipt_card_class_styles: ContentCardUIClassStylesInterface;
}

export interface TransactionReceiptViewContentInterface {
    loading_text: string;
    empty_state_text: string;
    search_placeholder_text: string;
    view_receipt_btn_text: string;
    receipt_unavailable_text: string;
    permission_denied_text: string;
    pagination_result_text: string;
    labels: {
        receipt_number: string;
        public_id: string;
        status: string;
        generated_by: string;
        generated_at: string;
        processor_attempts: string;
        last_error: string;
        created_at: string;
    };
}

export interface TransactionReceiptViewStateDataInterface {
    receipts: TransactionReceiptRecordInterface[];
    current_page: number;
    total_pages: number;
    total_items: number;
    limit: number;
    search_query: string;
    is_loading: boolean;
    content_obj: TransactionReceiptViewContentInterface;
    pagination_props: PaginationUIPropsInterface;
}

export interface TransactionReceiptViewComputedDataInterface {
    pagination_result_text: string;
    can_view_receipts: boolean;
}

export interface TransactionReceiptViewComponentsInterface {
    ContentCardUI: Component;
    PaginationUI: Component;
}
