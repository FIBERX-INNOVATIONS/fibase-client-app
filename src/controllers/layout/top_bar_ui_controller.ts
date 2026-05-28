import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";

import {
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface
} from "@/ui_types/top_bar_ui_type";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import BaseController from "@ui/version_3/base_classes/base_controller";

import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import ImageRenderUI from "@ui/version_3/components/ImageRenderUI.vue";

import DropdownMenuUI from "@ui/version_3/components/DropdownMenuUI.vue";

import LayoutSectionsUI from "@ui/version_3/components/LayoutSectionsUI.vue";

import TopBarUIActionHandler from "@/action_handlers/layout/top_bar_action_handler";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import ImageRenderUIPropsBuilder from "@ui/version_3/props_builder/image_render_ui_props_builder";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class TopBarUIController extends BaseController<
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: LayoutSectionsUIClassStylesInterface;

    public action_handler: TopBarUIActionHandler;

    constructor(props: TopBarUIPropsInterface) {
        super("top_bar_ui", props, EventBus);

        this.class_styles = props.class_styles ?? DashboardLayoutClassStyles.top_bar_class_style;

        this.action_handler = new TopBarUIActionHandler(this);
        this.setActionHandler(this.action_handler);
    }

    // Method to get the UI components
    protected getUIComponents(): TopBarUIComponentsInterface {
        return {
            LayoutSectionsUI,
            ButtonUI,
            ImageRenderUI,
            DropdownMenuUI
        };
    }

    // Method to get the state data for the UI
    protected getUIStateData(): TopBarUIStateDataInterface {
        const member = MemberAuthenticatorUtil.getLoggedInMember();

        return {
            hamburger_btn_props: ButtonUIPropsBuilder.getReactivePropsObject(
                "TopBarHamburgerBtn",
                "",
                "hamburger_svg_icon",
                "button",
                {
                    class_styles: DashboardLayoutClassStyles.hamburger_btn_class_style,
                    action_props: { on_click: this.action_handler.toggleSideBar },
                    boolean_props: { disabled: false }
                }
            ),

            nav_logo_props: ImageRenderUIPropsBuilder.getReactivePropsObjectFromContent(
                "TopBarLogo",
                "content_resource.dashboard_layout_ui.top_bar_ui.logo",
                {
                    class_styles: DashboardLayoutClassStyles.topbar_logo_class_style,
                    action_props: { on_click: this.action_handler.toHomePage }
                }
            ),

            member_avatar_props: ImageRenderUIPropsBuilder.getReactivePropsObject(
                "MemberAvatar",
                member?.profile_photo_link ?? "",
                {
                    class_styles: DashboardLayoutClassStyles.member_avatar_class_style,
                    action_props: {
                        on_click: this.action_handler.toggleMemberAvatarDropdown
                    }
                }
            ),

            member_avatar_dropdown_props: DropdownMenuUIPropsBuilder.getReactivePropsObject(
                "MemberAvatarDropdown",
                {
                    class_styles: DashboardLayoutClassStyles.member_avatar_drodpwn_class_style,

                    menu_items: DropdownMenuUIPropsBuilder.buildMenuList(
                        "content_resource.dashboard_layout_ui.top_bar_ui.member_menu_list",
                        DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style
                    )
                }
            )
        };
    }
}

export default TopBarUIController;
