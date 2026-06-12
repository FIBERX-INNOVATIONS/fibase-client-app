import { WatchersType } from "@ui/version_3/types/base_type";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { ModalUIPropsExtendedInterface } from "@ui/version_3/ui_types/modal_ui_type";

import {
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface,
    DashboardLayoutClassStylesInterface
} from "@/ui_types//dashboard_layout_type";

import TopBarUI from "@/components/TopBarUI.vue";

import SideBarUI from "@/components/SideBarUI.vue";

import ModalUI from "@ui/version_3/components/ModalUI.vue";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import BaseController from "@ui/version_3/base_classes/base_controller";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import ModalUIPropsBuilder from "@ui/version_3/props_builder/modal_ui_props_builder";

import DashboardLayoutActionHandler from "@/action_handlers/layout/dashboard_layout_action_handler";

class DashboardLayoutController extends BaseController<
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: DashboardLayoutClassStylesInterface;

    public action_handler: DashboardLayoutActionHandler;

    constructor(props: DashboardLayoutPropsInterface) {
        super("dashbord_layout", props, EventBus);

        this.class_styles = {
            ...DashboardLayoutClassStyles,
            ...(props.class_styles ?? {})
        };

        this.configureUIComponents();
        this.action_handler = new DashboardLayoutActionHandler(this);
        this.setActionHandler(this.action_handler);
    }

    // Method do configure component UI's
    protected configureUIComponents(): void {
        const { modal_class_style, side_bar_class_style } = this.class_styles;

        ModalUIPropsBuilder.configure({
            class_styles: modal_class_style,
            default_overlay_props: {
                class_styles: side_bar_class_style.overlay_class_style
            }
        });
    }

    // Method to get UI Components
    protected getUIComponents(): DashboardLayoutComponentsInterface {
        return { TopBarUI, SideBarUI, ModalUI };
    }

    // Method to get ui state data
    protected getUIStateData(): DashboardLayoutStateDataInterface {
        return {
            modals: [] as ModalUIPropsExtendedInterface[]
        };
    }

    // Method to handle mounted logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();

        if (!is_fully_authenticated) {
            await this.router.push("/logout");
        }

        this.event_bus?.on("close_modal", this.action_handler.handleCloseModal);

        this.event_bus?.on("open_modal", this.action_handler.handleOpenModal);

        this.event_bus?.on("clear_route_query_handler_params", this.action_handler.handleClearRouteQueryHandlerParams);

        this.action_handler.handleRouteQueryActions(this.route);
    }

    // Method to handle before unmounted logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.event_bus?.off("close_modal", this.action_handler.handleCloseModal);

        this.event_bus?.off("open_modal", this.action_handler.handleOpenModal);

        this.event_bus?.off("clear_route_query_handler_params", this.action_handler.handleClearRouteQueryHandlerParams);
    }

    // Method to get ui watchers
    protected getUIWatchers(): WatchersType<DashboardLayoutPropsInterface, DashboardLayoutStateDataInterface> {
        return {
            route: {
                handler: (route) => {
                    this.action_handler.handleRouteQueryActions(route);
                },
                options: { deep: false }
            }
        };
    }
}

export default DashboardLayoutController;
