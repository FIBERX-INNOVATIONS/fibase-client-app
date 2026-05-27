import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface
} from "@/ui_types/top_bar_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ImageRenderUIPropsInterface } from "@ui/version_3/ui_types/image_render_ui_type";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

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

    private readonly logger: LoggerUtil = new LoggerUtil({
        prefix: this.name,
        show_timestamp: false
    });

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
    ): Promise<void> => {
        console.log("Hamburger icon clicked");
        this.controller.event_bus?.emit("toggle_sidebar", {});
        return;
    };

    // Method to redirect to dahsboard home page
    public toHomePage = async (
        event?: MouseEvent,
        config?: { props: ImageRenderUIPropsInterface }
    ): Promise<void> => {
        this.controller.router.push("/dashboard");
        return;
    };

    // Method to toggle member avatar drodpown
    public toggleMemeberAvatarDrodpwn = async (
        event?: MouseEvent,
        config?: { props: ImageRenderUIPropsInterface }
    ): Promise<void> => {
        DropdownMenuUIPropsBuilder.toggleDropdownMenu("MemberAvatar", "MemberAvatarDropdown");
        return;
    };
}

export default TopBarUIActionHandler;
