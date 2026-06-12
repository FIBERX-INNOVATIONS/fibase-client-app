import { ActivityRecordInterface } from "@/types/api_service_type";

import { ActivityListFiltersInterface } from "@/types/list_view_filter_type";

import ActivityAPIService from "@/api_services/activity_api_service";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

class ActivityListViewActionHandler extends BaseListViewActionHandler<
    ActivityRecordInterface,
    "id",
    ActivityListFiltersInterface
> {
    constructor(controller: BaseListViewController<ActivityRecordInterface, "id">) {
        super(controller, "activity_list_view_action_handler", {}, ActivityAPIService.getActivityList);
    }
}

export default ActivityListViewActionHandler;
