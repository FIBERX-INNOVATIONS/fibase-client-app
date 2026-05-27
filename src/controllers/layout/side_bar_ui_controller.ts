import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { WatchersType } from "@ui/version_3/types/base_type";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import {
    SideBarUIPropsInterface,
    SideBarUIStateDataInterface,
    SideBarUIComputedDataInterface,
    SideBarUIComponentsInterface,
    SideBarUIClassStyleInterface
} from "@/ui_types/side_bar_ui_type";

import OverlayUI from "@ui/version_3/components/OverlayUI.vue";
import LayoutSectionsUI from "@ui/version_3/components/LayoutSectionsUI.vue";
import ButtonUI from "@ui/version_3/components/ButtonUI.vue";
import ImageRenderUI from "@ui/version_3/components/ImageRenderUI.vue";
import DropdownMenuUI from "@ui/version_3/components/DropdownMenuUI.vue";

import SideBarUIActionHandler from "@/action_handlers/layout/side_bar_action_handler";
import ImageRenderUIPropsBuilder from "@ui/version_3/props_builder/image_render_ui_props_builder";
import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";
import OverlayUIPropsBuilder from "@ui/version_3/props_builder/overlay_ui_props_builder";

class SideBarUIController extends BaseController<
    SideBarUIPropsInterface,
    SideBarUIStateDataInterface,
    SideBarUIComputedDataInterface,
    SideBarUIComponentsInterface,
    GlobalEventTypes
> {
    public class_styles: SideBarUIClassStyleInterface =
        DashboardLayoutClassStyles.side_bar_class_style;

    public action_handler: SideBarUIActionHandler = new SideBarUIActionHandler(this);

    constructor(props: SideBarUIPropsInterface) {
        super("top_bar_ui", props, EventBus);

        this.getComponentDefinition();
    }

    protected getUIComponents(): SideBarUIComponentsInterface {
        return {
            OverlayUI,
            LayoutSectionsUI,
            ButtonUI,
            ImageRenderUI,
            DropdownMenuUI
        };
    }

    protected getUIStateData(): SideBarUIStateDataInterface {
        return {
            sidebar_overlay_props: OverlayUIPropsBuilder.getReactivePropsObject("SideBarOverlay", {
                class_styles: this.class_styles.overlay_class_style,
                model_value: false,
                action_props: {
                    on_close: this.action_handler.handleOnOverlayClose
                },
                boolean_props: {
                    close_on_overlay_click: true,
                    lock_scroll: false
                }
            }),

            logo_img_props: ImageRenderUIPropsBuilder.getReactivePropsObjectFromContent(
                "SideBarLogo",
                "content_resource.dashboard_layout_ui.side_bar_ui.logo",
                {
                    class_styles: DashboardLayoutClassStyles.side_bar_logo_class_style
                }
            ),

            nav_menu_list_props: DropdownMenuUIPropsBuilder.getReactivePropsObject(
                "SidebarMenuList",
                {
                    class_styles: DashboardLayoutClassStyles.side_bar_menu_list_class_style,

                    menu_items: DropdownMenuUIPropsBuilder.buildMenuList(
                        "content_resource.dashboard_layout_ui.side_bar_ui.nav_menu_list",
                        DashboardLayoutClassStyles.side_bar_menu_item_class_style
                    )
                }
            )
        };
    }

    protected getUIWatchers(): WatchersType<SideBarUIPropsInterface, SideBarUIStateDataInterface> {
        return {
            route: () => {
                this.action_handler.handleToggleSideBar({ toggle_state: false });
                return;
            }
        };
    }

    protected async handleOnMountedLogic(): Promise<void> {
        this.event_bus?.on("toggle_sidebar", this.action_handler.handleToggleSideBar);
    }
}

export default SideBarUIController;
