import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    IdentityDetailResponseInterface,
    IdentityListParams,
    IdentityListResponseInterface,
    IdentityRecordInterface
} from "@/types/api_service_type";

class IdentityAPIService extends BaseAPIService {
    // Query the zero-based identity list endpoint while keeping the client UI one-based.
    public static getIdentityList = async (
        params?: IdentityListParams
    ): Promise<APIResponseInterface<IdentityListResponseInterface>> => {
        const { page = 1, limit = 12, sort_by = "created_at", sort_direction = "desc", filters = {} } = params ?? {};

        const api_page = Math.max(0, page - 1);
        const response = await this.queryAPI<IdentityListResponseInterface>({
            url: "/identity/list",
            method: "GET",
            params: {
                page: api_page,
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

    // Query and flatten the identity detail response for the shared profile view controller.
    public static getIdentity = async (
        identity_id: string | number
    ): Promise<APIResponseInterface<IdentityRecordInterface>> => {
        const response = await this.queryAPI<IdentityDetailResponseInterface>({
            url: `/identity/${identity_id}`,
            method: "GET"
        });

        return {
            ...response,
            data: response.data
                ? {
                      ...response.data.identity,
                      wallets_summary: response.data.wallets_summary
                  }
                : undefined
        };
    };
}

export default IdentityAPIService;
