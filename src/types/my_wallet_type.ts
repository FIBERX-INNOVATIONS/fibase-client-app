import type {
    IdentityWalletCurrencySummaryInterface,
    IdentityWalletRecordInterface,
    TransactionRecordInterface,
    PaginatedResponseResultInterface
} from "@/types/api_service_type";

export interface MyWalletCurrencyAssignmentInterface {
    is_default: boolean;
    created_at: string;
    currency?: IdentityWalletCurrencySummaryInterface | null;
}

export type MyWalletRecordType = Omit<
    IdentityWalletRecordInterface,
    "available_balance" | "locked_balance" | "pending_balance" | "refunded_balance" | "total_credit" | "total_debit"
> & {
    available_balance: string | number;
    locked_balance: string | number;
    pending_balance?: string | number;
    refunded_balance?: string | number;
    total_credit?: string | number;
    total_debit?: string | number;
};
export type MyWalletTransactionType = Omit<
    TransactionRecordInterface,
    "amount" | "fee_amount" | "net_amount" | "source_wallet" | "destination_wallet"
> & {
    amount: string | number;
    fee_amount: string | number;
    net_amount: string | number;
    source_wallet?: MyWalletRecordType | null;
    destination_wallet?: MyWalletRecordType | null;
};
export type MyWalletCurrencyListType = PaginatedResponseResultInterface<MyWalletCurrencyAssignmentInterface[]>;
export type MyWalletListType = PaginatedResponseResultInterface<MyWalletRecordType[]>;
export type MyWalletTransactionListType = PaginatedResponseResultInterface<MyWalletTransactionType[]>;
