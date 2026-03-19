
import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface
} from "@/ui_types/list_view_type";

import { RegisteredAppListViewFiltersInterface } from "@/types/list_view_filter_type";


class RegisteredAppListViewActionHandler extends BaseListViewActionHandler<
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes,
    RegisteredAppListViewFiltersInterface
>{
    
    constructor(
        controller: BaseController<
            ListViewPropsInterface,
            ListViewStateDataInterface,
            ListViewComputedDataInterface,
            ListViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "registered_app_list_view_action_handler");

    }

}

export default RegisteredAppListViewActionHandler;