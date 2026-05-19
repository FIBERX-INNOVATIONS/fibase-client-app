import { markRaw } from "vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import {
    LayoutViewPropsInterface,
    LayoutViewStateDataInterface,
    LayoutViewComputedDataInterface,
    LayoutViewComponentsInterface
} from "@/ui_types/layout_view_type";

import AuthLayout from "@/layout/AuthLayout.vue";
import DashboardLayout from "@/layout/DashboardLayout.vue";

class LayoutViewController extends BaseController<
    LayoutViewPropsInterface,
    LayoutViewStateDataInterface,
    LayoutViewComputedDataInterface,
    LayoutViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(props: LayoutViewPropsInterface) {
        super("layout_view", props, EventBus);
    }

    // Method to get ui components
    protected getUIComponents(): LayoutViewComponentsInterface {
        return {
            AuthLayout: markRaw(AuthLayout),
            DashboardLayout: markRaw(DashboardLayout)
        };
    }

    // Method to get ui computed data
    protected getUIComputedData(): ComputedDefinitionType<LayoutViewComputedDataInterface> {
        return {
            is_route_ready: (): boolean => {
                return this.route.matched.length > 0 && !!this.route.name;
            },

            is_auth_layout: (): boolean => {
                return this.route.meta?.is_auth_page === true;
            },

            active_layout_component: () => {
                if (!this.route.name) {
                    return null;
                }

                return this.route.meta?.is_auth_page === true
                    ? this.components.AuthLayout
                    : this.components.DashboardLayout;
            },

            active_layout_key: (): string => {
                return this.route.meta?.is_auth_page === true ? "auth_layout" : "dashboard_layout";
            }
        };
    }
}

export default LayoutViewController;
