import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { TransactionLedgerListParams, TransactionLedgerListResponseInterface } from "@/types/api_service_type";

class TransactionLedgerAPIService extends BaseAPIService {
    // Method to query a transaction's zero-based ledger list while keeping client pagination one-based.
    public static getTransactionLedgerList = async (
        transaction_id: string | number,
        params?: TransactionLedgerListParams
    ): Promise<APIResponseInterface<TransactionLedgerListResponseInterface>> => {
        const { page = 1, limit = 12, sort_by = "created_at", sort_direction = "desc", filters = {} } = params ?? {};

        const response = await this.queryAPI<TransactionLedgerListResponseInterface>({
            url: `/transaction/${transaction_id}/ledger`,
            method: "GET",
            params: {
                page: Math.max(0, page - 1),
                limit,
                sort_by,
                sort_direction: sort_direction.toUpperCase(),
                ...filters,
                preview_only: filters.preview_only ?? false
            }
        });

        if (response.data) {
            response.data = {
                ...response.data,
                current_page: response.data.current_page + 1,
                records: response.data.records.map((record, index) => {
                    return {
                        ...record,
                        record_key: [
                            record.created_at,
                            record.wallet?.public_id,
                            record.entry_type,
                            record.balance_field,
                            index
                        ]
                            .filter((value) => {
                                return value !== undefined && value !== null && value !== "";
                            })
                            .join(":")
                    };
                })
            };
        }

        return response;
    };
}

export default TransactionLedgerAPIService;
