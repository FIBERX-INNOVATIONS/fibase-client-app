import type { MyWalletPaymentOptionsInterface, MyWalletIntentInputInterface, MyWalletIntentRecordType } from "@/types/my_wallet_deposit_type";
import BaseAPIService from "@ui/version_3/base_classes/base_api_service";
import type { APIResponseInterface } from "@ui/version_3/types/util_type";
import type { MyWalletCurrencyListType, MyWalletListType, MyWalletTransactionListType } from "@/types/my_wallet_type";
import { MY_WALLET_CONFIG } from "@/configs/my_wallet_config";

class MyWalletAPIService extends BaseAPIService {
    // Method to fetch deposit providers and embedded payment methods for an exact amount.
    public static getPaymentOptions(currency_code: string, amount: string): Promise<APIResponseInterface<MyWalletPaymentOptionsInterface>> {
        return this.queryAPI<MyWalletPaymentOptionsInterface>({
            url: `${MY_WALLET_CONFIG.api_base}/currencies/${encodeURIComponent(currency_code)}/payment-options`,
            method: "GET",
            params: { transaction_type: "deposit", amount }
        });
    }

    // Method to create a draft using a stable reference and idempotency key.
    public static createIntent(input: MyWalletIntentInputInterface, request_key: string): Promise<APIResponseInterface<MyWalletIntentRecordType>> {
        return this.queryAPI<MyWalletIntentRecordType>({
            url: `${MY_WALLET_CONFIG.api_base}/transactions/intent`,
            method: "POST",
            data: { ...input, transaction_type: "deposit", app_reference: request_key },
            headers: { "Idempotency-Key": request_key },
            disable_retry: true
        });
    }

    // Method to update the owned draft with an optimistic concurrency version.
    public static updateIntent(
        public_id: string,
        input: MyWalletIntentInputInterface,
        expected_intent_version: number
    ): Promise<APIResponseInterface<MyWalletIntentRecordType>> {
        return this.queryAPI<MyWalletIntentRecordType>({
            url: `${MY_WALLET_CONFIG.api_base}/transactions/${encodeURIComponent(public_id)}/intent`,
            method: "PATCH",
            data: { ...input, expected_intent_version },
            disable_retry: true
        });
    }

    // Method to reload a persisted intent before displaying its authoritative summary.
    public static getIntent(public_id: string): Promise<APIResponseInterface<MyWalletIntentRecordType>> {
        return this.queryAPI<MyWalletIntentRecordType>({
            url: `${MY_WALLET_CONFIG.api_base}/transactions/${encodeURIComponent(public_id)}`,
            method: "GET"
        });
    }

    // Method to fetch one page of currencies assigned to the member's application.
    public static getCurrencies(page = 0): Promise<APIResponseInterface<MyWalletCurrencyListType>> {
        return this.queryAPI<MyWalletCurrencyListType>({
            url: `${MY_WALLET_CONFIG.api_base}/currencies/list`,
            method: "GET",
            params: { page, limit: MY_WALLET_CONFIG.lookup_limit, preview_only: false }
        });
    }

    // Method to fetch one page of the authenticated member's wallets.
    public static getWallets(page = 0): Promise<APIResponseInterface<MyWalletListType>> {
        return this.queryAPI<MyWalletListType>({
            url: `${MY_WALLET_CONFIG.api_base}/wallets/list`,
            method: "GET",
            params: { page, limit: MY_WALLET_CONFIG.lookup_limit, preview_only: false }
        });
    }

    // Method to fetch recent transactions across all of the member's wallets.
    public static getTransactions(page = 0): Promise<APIResponseInterface<MyWalletTransactionListType>> {
        return this.queryAPI<MyWalletTransactionListType>({
            url: `${MY_WALLET_CONFIG.api_base}/transactions/list`,
            method: "GET",
            params: {
                page,
                limit: MY_WALLET_CONFIG.transaction_limit,
                sort_by: "created_at",
                sort_direction: "DESC",
                preview_only: false
            }
        });
    }
}
export default MyWalletAPIService;
