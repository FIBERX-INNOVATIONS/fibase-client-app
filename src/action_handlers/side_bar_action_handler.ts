import dayjs from "dayjs";

import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util"

import {  GlobalEventTypes } from "@/types/global_events_type";

import {
    SideBarUIPropsInterface,
    SideBarUIStateDataInterface,
    SideBarUIComputedDataInterface,
    SideBarUIComponentsInterface
} from "@/ui_types/side_bar_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ImageRenderUIPropsInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";
import { OverlayUIPropsInterface } from "@ui/version_3/ui_types/overlay_ui_type";



class SideBarUIActionHandler {
    public readonly name = "side_bar_ui_action_handler";

    // Make controller static so it’s shared across all usage
    private controller: BaseController<
        SideBarUIPropsInterface, 
        SideBarUIStateDataInterface, 
        SideBarUIComputedDataInterface, 
        SideBarUIComponentsInterface,
        GlobalEventTypes
    >;

    private readonly logger: LoggerUtil = new LoggerUtil({ prefix: this.name, show_timestamp: false });

    constructor(
        controller: BaseController<
            SideBarUIPropsInterface,
            SideBarUIStateDataInterface,
            SideBarUIComputedDataInterface,
            SideBarUIComponentsInterface,
            GlobalEventTypes
        >
    ) {
        this.controller = controller;
    }

    // Method to handle on overlay close
    public handleOnOverlayClose = async (
        config?: { props: OverlayUIPropsInterface }
    ):Promise<void> =>  {
        this.controller.state_refs.sidebar_overlay_props.value.model_value = false;
    }

    // Method to ahndle toggle sidebar
    public handleToggleSideBar = (params = {}) => {
        const current_toggle_state = this.controller.state_refs.sidebar_overlay_props.value.model_value;

        this.controller.state_refs.sidebar_overlay_props.value.model_value = !current_toggle_state;
    
    }
}

export default SideBarUIActionHandler;