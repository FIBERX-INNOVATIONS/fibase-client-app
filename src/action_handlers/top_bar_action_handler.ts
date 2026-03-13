import dayjs from "dayjs";

import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util"

import {  GlobalEventTypes } from "@/types/global_events_type";

import {
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface
} from "@/ui_types/top_bar_ui_type";
import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ImageRenderUIPropsInterface } from "@ui/version_3/ui_types/image_render_ui_type";



class TopBarUIActionHandler {
    public readonly name = "top_bar_ui_action_handler";

    // Make controller static so it’s shared across all usage
    private controller: BaseController<
        TopBarUIPropsInterface, 
        TopBarUIStateDataInterface, 
        TopBarUIComputedDataInterface, 
        TopBarUIComponentsInterface,
        GlobalEventTypes
    >;

    private readonly logger: LoggerUtil = new LoggerUtil({ prefix: this.name, show_timestamp: false });

    constructor(
        controller: BaseController<
            TopBarUIPropsInterface,
            TopBarUIStateDataInterface,
            TopBarUIComputedDataInterface,
            TopBarUIComponentsInterface,
            GlobalEventTypes
        >
    ) {
        this.controller = controller;
    }

    // Method to handle on hamburger icon btn click
    public toggleSideBar = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {}

    public toHomePage = async (
        event?: MouseEvent,
        config?: { props: ImageRenderUIPropsInterface }
    ): Promise<void> => {
        this.controller.router.push("/dashboard");
        return;
    }


   
}

export default TopBarUIActionHandler;