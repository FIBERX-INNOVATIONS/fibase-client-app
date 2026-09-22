import type { Component } from "vue";
import type { IdentityWalletCurrencySummaryInterface } from "@/types/api_service_type";
import type { MyWalletRecordType, MyWalletTransactionType } from "@/types/my_wallet_type";
import type { InputUIPropsInterface } from "@ui/version_3/ui_types/input_ui_type";
import type { DataTableUIPropsInterface } from "@ui/version_3/ui_types/data_table_ui_type";
import type { PaginationUIPropsInterface } from "@ui/version_3/ui_types/pagination_ui_type";

export type MyWalletViewPropsInterface = Record<string, never>;
export interface MyWalletViewStateInterface {
    currencies: IdentityWalletCurrencySummaryInterface[];
    wallets: MyWalletRecordType[];
    transactions: MyWalletTransactionType[];
    selected_currency: string;
    is_loading_wallets: boolean;
    is_loading_transactions: boolean;
    has_wallet_error: boolean;
    has_transaction_error: boolean;
    current_page: number;
    total_pages: number;
    total_items: number;
}
export interface MyWalletViewComputedInterface {
    currency: IdentityWalletCurrencySummaryInterface | undefined;
    wallet: MyWalletRecordType | undefined;
    currency_input: InputUIPropsInterface;
    balance: string;
    balance_class_style: string;
    balance_parts: string[];
    locked_balance: string;
    pending_balance: string;
    transaction_table: DataTableUIPropsInterface;
    pagination_props: PaginationUIPropsInterface;
}
export interface MyWalletViewComponentsInterface {
    BreadcrumbUI: Component;
    InputUI: Component;
    ButtonUI: Component;
    DataTableUI: Component;
    PaginationUI: Component;
}

export type MyWalletContentType = Record<
    | "home_text"
    | "title_text"
    | "eyebrow_text"
    | "subtitle_text"
    | "brand_text"
    | "currency_text"
    | "available_text"
    | "holder_text"
    | "card_note_text"
    | "overview_text"
    | "locked_text"
    | "pending_text"
    | "wallet_id_text"
    | "deposit_text"
    | "withdrawal_text"
    | "coming_soon_text"
    | "transactions_text"
    | "all_wallets_text"
    | "transactions_description_text"
    | "loading_text"
    | "loading_transactions_text"
    | "empty_text"
    | "no_wallet_text"
    | "no_transactions_text"
    | "wallet_error_text"
    | "transaction_error_text"
    | "permission_text"
    | "retry_text"
    | "pagination_text"
    | "transaction_text"
    | "type_text"
    | "amount_text"
    | "status_text"
    | "date_text",
    string
>;
