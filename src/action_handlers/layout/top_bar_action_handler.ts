import { GlobalEventTypes } from "@/types/global_events_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ImageRenderUIPropsInterface } from "@ui/version_3/ui_types/image_render_ui_type";

import {
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface
} from "@/ui_types/top_bar_ui_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class TopBarUIActionHandler extends BaseActionHandler<
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface,
    GlobalEventTypes
> {
    public readonly name = "top_bar_ui_action_handler";

    constructor(
        controller: BaseController<
            TopBarUIPropsInterface,
            TopBarUIStateDataInterface,
            TopBarUIComputedDataInterface,
            TopBarUIComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "top_bar_ui_action_handler");
    }

    // Method to handle on hamburger icon btn click
    public toggleSideBar = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {
        this.controller.event_bus?.emit("toggle_sidebar", {});
        return;
    };

    // Method to redirect to dahsboard home page
    public toHomePage = async (
        event?: MouseEvent,
        config?: { props: ImageRenderUIPropsInterface }
    ): Promise<void> => {
        await this.controller.router.push("/dashboard");
        return;
    };

    // Method to toggle member avatar dropdown
    public toggleMemberAvatarDropdown = async (
        event?: MouseEvent,
        config?: { props: ImageRenderUIPropsInterface }
    ): Promise<void> => {
        DropdownMenuUIPropsBuilder.toggleDropdownMenu("MemberAvatar", "MemberAvatarDropdown");
        return;
    };
}

export default TopBarUIActionHandler;
