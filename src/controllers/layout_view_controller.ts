
import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { AUTH_ROUTE_NAMES } from "@/configs/constants";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import {
    LayoutViewPropsInterface,
    LayoutViewStateDataInterface,
    LayoutViewComputedDataInterface,
    LayoutViewComponentsInterface
} from "@/ui_types/layout_view_type";

import AuthLayout from "@/layout/AuthLayout.vue";
import DashboardLayout from "@/layout/DashboardLayout.vue";



class LayoutViewController extends BaseController <
    LayoutViewPropsInterface,
    LayoutViewStateDataInterface,
    LayoutViewComputedDataInterface,
    LayoutViewComponentsInterface,
    GlobalEventTypes
> {

    constructor(props: LayoutViewPropsInterface) {
        super("layout_view", props, EventBus);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): LayoutViewComponentsInterface { 
        return  { 
            AuthLayout,
            DashboardLayout 
        }; 
    }

    // Method to get ui computed data
    protected getUIComputedData(): ComputedDefinitionType<LayoutViewComputedDataInterface> {
        return {
            is_auth_route: (): boolean => {
                if (this.route?.meta?.is_auth_page) { return true; }

                const route_name = this.route?.name?.toString() ?? "";
                return AUTH_ROUTE_NAMES.includes(route_name);
            }
        } 
    }

}

export default LayoutViewController