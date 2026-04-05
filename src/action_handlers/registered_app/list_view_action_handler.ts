
import { markRaw } from "vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import { 
    GlobalEventTypes, 
    OpenModalEventPayloadInterface 
} from "@/types/global_events_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface
} from "@/ui_types/list_view_type";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";
import { RegisteredAppListViewFiltersInterface } from "@/types/list_view_filter_type";
import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import FormView from "@/views/registered_app/FormView.vue";
import RegisteredAppAPIService from "@/api_services/registered_app_api_service";




class RegisteredAppListViewActionHandler extends BaseListViewActionHandler<
    RegisteredAppRecordInterface,
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes,
    RegisteredAppListViewFiltersInterface
>{
    
    constructor(
        controller: BaseListViewController<RegisteredAppRecordInterface>,
    ) {
        super(
            controller, 
            "registered_app_list_view_action_handler",
            {},
            RegisteredAppAPIService.getRegisteredAppList
        );

    }

    // Method to handle header button clicked
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> =>  { 
        const base_content_key = "content_resource.registered_app_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.register_app_modal.add_new_registered_app`,

            animation_type: "slide_top",

            body_component: markRaw(FormView),
            
            body_props: {},
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    }

}

export default RegisteredAppListViewActionHandler;