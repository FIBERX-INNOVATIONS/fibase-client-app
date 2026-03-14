

import BaseController  from "@ui/version_3/base_classes/base_controller";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import {  GlobalEventTypes } from "@/types/global_events_type";

import DashboardLayoutClassstyles from "@/class_styles/dashboard_layout_class_styles";

import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";

import { 
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface,
} from "@/ui_types/top_bar_ui_type";

import LayoutSectionsUI from "@ui/version_3/components/LayoutSectionsUI.vue";
import ButtonUI from "@ui/version_3/components/ButtonUI.vue";
import ImageRenderUI from "@ui/version_3/components/ImageRenderUI.vue";
import DropdownMenuUI from "@ui/version_3/components/DropdownMenuUI.vue";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import TopBarUIActionHandler from "@/action_handlers/top_bar_action_handler";
import ImageRenderUIPropsBuilder from "@ui/version_3/props_builder/image_render_ui_props_builder";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";
import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";


class TopBarUIController extends BaseController<
    TopBarUIPropsInterface,
    TopBarUIStateDataInterface,
    TopBarUIComputedDataInterface,
    TopBarUIComponentsInterface,
    GlobalEventTypes
>{
    public class_styles: LayoutSectionsUIClassStylesInterface = DashboardLayoutClassstyles.top_bar_class_style;

    public action_handler: TopBarUIActionHandler = new TopBarUIActionHandler(this);

    constructor(props: TopBarUIPropsInterface) {

        super("top_bar_ui", props);

        this.getComponentDefinition();

    }

    protected getUIComponents(): TopBarUIComponentsInterface {

        return { 
            LayoutSectionsUI,
            ButtonUI,
            ImageRenderUI,
            DropdownMenuUI
        };

    }

    protected getUIStateData(): TopBarUIStateDataInterface {
        const member = MemberAuthenticatorUtil.getLoggedInMember();

        return {
            hamburger_btn_props: ButtonUIPropsBuilder.getReactivePropsObject(
                "TopBarHamburgerBtn", 
                "", 
                "hamburger_svg_icon", 
                "button",
                {
                    class_styles: DashboardLayoutClassstyles.hamburger_btn_class_style,
                    action_props: { on_click: this.action_handler.toggleSideBar }
                }
            ),

            nav_logo_props: ImageRenderUIPropsBuilder.getReactivePropsObject(
                "TopBarLogo", 
                "/assets/img/fibase-logo-transparent-bg.png",
                {
                    class_styles: DashboardLayoutClassstyles.topbar_logo_class_style,
                    action_props: { on_click: this.action_handler.toHomePage }
                }
            ),

            member_avatar_props: ImageRenderUIPropsBuilder.getReactivePropsObject(
                "MemberAvatar", 
                member?.profile_photo_link ?? "",
                {
                    class_styles: DashboardLayoutClassstyles.member_avatar_class_style,
                    action_props: { 
                        on_click: this.action_handler.toggleMemeberAvatarDrodpwn 
                    },
                }
            ),

            member_avatar_dropdown_props: DropdownMenuUIPropsBuilder.getReactivePropsObject(
                "MemberAvatarDropdown", 
                {
                    class_styles: DashboardLayoutClassstyles.member_avatar_drodpwn_class_style,

                    // menu_items: []

                    menu_items: DropdownMenuUIPropsBuilder.buildMenuList(
                        "content_resource.dashboard_layout_ui.member_menu_list",
                        DashboardLayoutClassstyles.member_avatar_dropdown_menu_list_class_style,
                    )
                }
            )


        };

    }

    protected getUIComputedData(): ComputedDefinitionType<TopBarUIComputedDataInterface> {

        return {};

    }

}

export default TopBarUIController;