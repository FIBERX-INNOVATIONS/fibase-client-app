import type { MyWalletTransactionType } from "@/types/my_wallet_type";

export interface MyWalletPayemntProvicerRecordInterface {
    id: number;
    code: string;
    name: string;
    description?: string | null;
}

export interface MyWalletPaymentMethodRecordInterface {
    id: number;
    code: string;
    name: string;
    description?: string | null;
}

export interface MyWalletPaymentProviderMethodOptionsInterface {
    provider: MyWalletPayemntProvicerRecordInterface;
    payment_methods: MyWalletPaymentMethodRecordInterface[];

    transaction_fees:
        | { type: "flat" | "percentage"; fee_amount: string }
        | { type: "range"; ranges: { min: string; max: string; type: "flat" | "percentage"; fee_amount: string }[] }
        | null;
}

export interface MyWalletPaymentOptionsInterface {
    payment_providers: MyWalletPaymentProviderMethodOptionsInterface[];
}
export interface MyWalletIntentInputInterface {
    currency_code: string;
    amount: string;
    description: string;
    payment_provider_id: string;
    payment_method_id: string;
    csrf_token: string;
}
export type MyWalletIntentRecordType = Omit<MyWalletTransactionType, "amount" | "fee_amount" | "net_amount"> & {
    amount: string;
    fee_amount: string;
    net_amount: string;
    intent_version: number;
    fee_breakdown?: { fee_code: string; description?: string | null; amount: string }[];
};
