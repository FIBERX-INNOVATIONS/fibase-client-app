import { GlobalEventTypes, ToggleSidebarEventPayloadInterface } from "@/types/global_events_type";

import {
    SideBarUIPropsInterface,
    SideBarUIStateDataInterface,
    SideBarUIComputedDataInterface,
    SideBarUIComponentsInterface
} from "@/ui_types/side_bar_ui_type";

import { OverlayUIPropsInterface } from "@ui/version_3/ui_types/overlay_ui_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

class SideBarUIActionHandler extends BaseActionHandler<
    SideBarUIPropsInterface,
    SideBarUIStateDataInterface,
    SideBarUIComputedDataInterface,
    SideBarUIComponentsInterface,
    GlobalEventTypes
> {
    public readonly name = "side_bar_ui_action_handler";

    constructor(
        controller: BaseController<
            SideBarUIPropsInterface,
            SideBarUIStateDataInterface,
            SideBarUIComputedDataInterface,
            SideBarUIComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "side_bar_ui_action_handler");
    }

    // Method to handle on overlay close
    public handleOnOverlayClose = async (config?: {
        props: OverlayUIPropsInterface;
    }): Promise<void> => {
        this.setState("sidebar_overlay_props", {
            model_value: false
        } as SideBarUIStateDataInterface["sidebar_overlay_props"]);
    };

    // Method to handle toggle sidebar
    public handleToggleSideBar = (params: ToggleSidebarEventPayloadInterface = {}) => {
        const current_toggle_state = this.state_refs.sidebar_overlay_props.value.model_value;
        const new_toggle_state =
            params.toggle_state !== undefined ? params.toggle_state : !current_toggle_state;

        this.setState("sidebar_overlay_props", {
            model_value: new_toggle_state
        } as SideBarUIStateDataInterface["sidebar_overlay_props"]);

        return;
    };
}

export default SideBarUIActionHandler;
