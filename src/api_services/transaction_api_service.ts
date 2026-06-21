import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { TransactionListParams, TransactionListResponseInterface } from "@/types/api_service_type";

class TransactionAPIService extends BaseAPIService {
    // Method to query the zero-based transaction list while keeping client pagination one-based.
    public static getTransactionList = async (
        params?: TransactionListParams
    ): Promise<APIResponseInterface<TransactionListResponseInterface>> => {
        const { page = 1, limit = 12, sort_by = "created_at", sort_direction = "desc", filters = {} } = params ?? {};

        const response = await this.queryAPI<TransactionListResponseInterface>({
            url: "/transaction/list",
            method: "GET",
            params: {
                page: Math.max(0, page - 1),
                limit,
                sort_by,
                sort_direction: sort_direction.toUpperCase(),
                ...filters,
                preview_only: filters.preview_only ?? true
            }
        });

        if (response.data) {
            response.data = {
                ...response.data,
                current_page: response.data.current_page + 1
            };
        }

        return response;
    };
}

export default TransactionAPIService;
