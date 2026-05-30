import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { WatchersType } from "@ui/version_3/types/base_type";

import {
    SideBarUIPropsInterface,
    SideBarUIStateDataInterface,
    SideBarUIComputedDataInterface,
    SideBarUIComponentsInterface,
    SideBarUIClassStyleInterface,
    SideBarNavigationContentItemInterface
} from "@/ui_types/side_bar_ui_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import OverlayUI from "@ui/version_3/components/OverlayUI.vue";

import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import ImageRenderUI from "@ui/version_3/components/ImageRenderUI.vue";

import DropdownMenuUI from "@ui/version_3/components/DropdownMenuUI.vue";

import LayoutSectionsUI from "@ui/version_3/components/LayoutSectionsUI.vue";

import SideBarUIActionHandler from "@/action_handlers/layout/side_bar_action_handler";

import ImageRenderUIPropsBuilder from "@ui/version_3/props_builder/image_render_ui_props_builder";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

import OverlayUIPropsBuilder from "@ui/version_3/props_builder/overlay_ui_props_builder";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import {
    NavLinkUIClassStylesInterface,
    NavLinkUIPropsInterface
} from "@ui/version_3/ui_types/nav_link_ui_type";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

class SideBarUIController extends BaseController<
    SideBarUIPropsInterface,
    SideBarUIStateDataInterface,
    SideBarUIComputedDataInterface,
    SideBarUIComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: SideBarUIClassStyleInterface;

    public action_handler: SideBarUIActionHandler;

    private readonly content_manager = ContentManagerUtil.getInstance();

    constructor(props: SideBarUIPropsInterface) {
        super("side_bar_ui", props, EventBus);

        this.class_styles = {
            ...DashboardLayoutClassStyles.side_bar_class_style,
            ...(props.class_styles ?? {})
        };

        this.action_handler = new SideBarUIActionHandler(this);
        this.setActionHandler(this.action_handler);
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

                    menu_items: this.buildSidebarMenuList(
                        "content_resource.dashboard_layout_ui.side_bar_ui.nav_menu_list"
                    )
                }
            )
        };
    }

    // Method to check whether a sidebar content item is permitted.
    private canShowNavigationItem(item: SideBarNavigationContentItemInterface): boolean {
        if (!item.menu_permission_text) {
            return true;
        }

        return MemberAuthenticatorUtil.memberHasPermissionTo(item.menu_permission_text);
    }

    // Method to build the child item class style used by sidebar submenus.
    private getSidebarChildMenuClassStyle(): NavLinkUIClassStylesInterface {
        return {
            ...DashboardLayoutClassStyles.side_bar_menu_item_class_style,
            wrapper_class_style:
                "flex items-center cursor-pointer py-2 pl-2 pr-1 rounded-lg justify-between group/link w-full min-h-[42px] hover:bg-[#6f7e8d6e] my-1",
            icon_img_wrapper_class_style:
                "flex items-center justify-center overflow-hidden w-2/12 h-full p-1",
            content_class_style:
                "flex items-center justify-start text-white text-[13px] text-start w-10/12 leading-tight"
        };
    }

    // Method to create a stable sidebar menu id.
    private getSidebarMenuItemId(item: SideBarNavigationContentItemInterface): string {
        return (
            item.menu_id_text ??
            item.menu_text
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "_")
                .replace(/^_+|_+$/g, "") ??
            ""
        );
    }

    // Method to toggle a toolkit child menu when the parent label is clicked.
    private toggleSidebarDropdownFromParentClick = async (
        event?: MouseEvent,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        event?.preventDefault();

        const parent_id = config?.props.id;

        if (!parent_id) {
            return;
        }

        const caret_button = document.querySelector<HTMLButtonElement>(
            `[aria-controls="SidebarMenuList-children-${parent_id}"]`
        );

        caret_button?.click();
    };

    // Method to map sidebar content items to dropdown nav link props.
    private buildSidebarMenuItem(
        item: SideBarNavigationContentItemInterface,
        class_styles: NavLinkUIClassStylesInterface
    ): NavLinkUIPropsInterface | null {
        if (!this.canShowNavigationItem(item)) {
            return null;
        }

        const children =
            item.children_list
                ?.map((child) =>
                    this.buildSidebarMenuItem(child, this.getSidebarChildMenuClassStyle())
                )
                .filter((child): child is NavLinkUIPropsInterface => Boolean(child)) ?? [];

        if (!item.menu_link && !children.length) {
            return null;
        }

        const id = this.getSidebarMenuItemId(item);
        const has_children = children.length > 0;

        return {
            id,
            link: has_children ? undefined : item.menu_link,
            icon: item.menu_icon as SVGIconKey,
            img_src: item.menu_img_link,
            img_alt_text: item.menu_text,
            content: item.menu_text,
            class_styles,
            has_permission: true,
            ...(has_children
                ? {
                      children,
                      action_props: {
                          on_click: this.toggleSidebarDropdownFromParentClick
                      }
                  }
                : {})
        };
    }

    // Method to build the sidebar menu list with nested payment config children.
    private buildSidebarMenuList(content_key: string): NavLinkUIPropsInterface[] {
        const content_payload =
            this.content_manager.get<SideBarNavigationContentItemInterface[]>(content_key);

        if (!content_payload?.length) {
            return [];
        }

        const menus = content_payload
            .map((item) =>
                this.buildSidebarMenuItem(
                    item,
                    DashboardLayoutClassStyles.side_bar_menu_item_class_style
                )
            )
            .filter((item): item is NavLinkUIPropsInterface => Boolean(item));
        return menus;
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

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.event_bus?.off("toggle_sidebar", this.action_handler.handleToggleSideBar);
    }
}

export default SideBarUIController;
