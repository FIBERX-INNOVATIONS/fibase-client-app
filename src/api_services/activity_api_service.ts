import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { ActivityListParams, ActivityListResponseInterface } from "@/types/api_service_type";

class ActivityAPIService extends BaseAPIService {
    // Method to query get activity record list API endpoint
    public static getActivityList = async (
        params?: ActivityListParams
    ): Promise<APIResponseInterface<ActivityListResponseInterface>> => {
        const {
            page = 1,
            limit = 20,
            sort_by = "created_at",
            sort_direction = "desc",
            filters = {}
        } = params ?? {};

        return await this.queryAPI<ActivityListResponseInterface>({
            url: `/activity/list`,
            method: "GET",
            params: {
                page,
                limit,
                sort_by,
                sort_direction,
                ...filters
            }
        });
    };
}

export default ActivityAPIService;
