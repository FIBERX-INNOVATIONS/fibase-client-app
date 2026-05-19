import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    AppRootPropsInterface,
    AppRootStateDataInterface,
    AppRootComputedDataInterface,
    AppRootComponentsInterface
} from "@/ui_types/app_root_type";

import { WatchersType } from "@ui/version_3/types/base_type";
import AppRootClassStyles from "@/class_styles/app_root_class_styles";

import ScreenLoaderUI from "@ui/version_3/components/ScreenLoaderUI.vue";
import StatusAlertUI from "@ui/version_3/components/StatusAlertUI.vue";
import LayoutView from "@/layout/LayoutView.vue";

import ScreenLoaderUIPropsBuilder from "@ui/version_3/props_builder/screen_loader_ui_props_builder";
import StatusAlertPropsBuilder from "@ui/version_3/props_builder/status_alert_ui_props_builder";
import AppRootActionHandler from "@/action_handlers/app_root_action_handler";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

class AppRootController extends BaseController<
    AppRootPropsInterface,
    AppRootStateDataInterface,
    AppRootComputedDataInterface,
    AppRootComponentsInterface,
    GlobalEventTypes
> {
    public action_handler: AppRootActionHandler;

    constructor(props: AppRootPropsInterface) {
        super("app_root", props, EventBus);

        this.action_handler = new AppRootActionHandler(this);
        this.setActionHandler(this.action_handler);
    }

    // Method to get ui components
    protected getUIComponents(): AppRootComponentsInterface {
        return {
            ScreenLoaderUI,
            StatusAlertUI,
            LayoutView
        };
    }

    // Method to configure components
    protected configureComponents(): void {
        // Configure ScreenLoaderUI
        ScreenLoaderUIPropsBuilder.configure({
            class_styles: AppRootClassStyles.screen_loader_ui_class_style
        });

        StatusAlertPropsBuilder.configure(
            "StatusAlertBox",
            AppRootClassStyles.status_alert_ui_class_style,
            this.action_handler.handleOnCloseStatusClick,
            this.action_handler.getStatusBgClassStyle,
            this.action_handler.getAnimationClassStyle,
            this.action_handler.getStatusTextClassStyle
        );
    }

    // Method to get ui state data
    protected getUIStateData(): AppRootStateDataInterface {
        this.configureComponents();

        const screen_loader_props = ScreenLoaderUIPropsBuilder.getReactivePropsObject();
        const status_alert_props = StatusAlertPropsBuilder.getReactivePropsObject();

        return {
            screen_loader_visible: false,

            screen_loader_symbol: screen_loader_props.loader_symbol,

            screen_loader_text: screen_loader_props.loader_text,

            screen_loader_class_styles: screen_loader_props.class_styles,

            alert_box_id: status_alert_props.alert_box_id,

            alert_status: status_alert_props?.alert_status ?? null,

            alert_message: status_alert_props?.status_content_messgae ?? null,

            status_icon: status_alert_props?.status_icon ?? null,

            status_alert_ui_class_style: status_alert_props?.class_styles ?? null,

            status_alert_close_btn_icon: status_alert_props?.close_btn_icon ?? null
        } as AppRootStateDataInterface;
    }

    protected getUIWatchers(): WatchersType<AppRootPropsInterface, AppRootStateDataInterface> {
        return {
            route: {
                handler: () => {
                    this.action_handler.resetScreenLoader();
                },
                options: { deep: false }
            }
        };
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        // Bridge mitt events to Vue template handlers
        this.event_bus?.on("is_loading", this.action_handler.handleIsLoading);

        this.event_bus?.on("alert_status_updated", this.action_handler.handleStatusChanged);

        const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();

        if (is_fully_authenticated) {
            this.action_handler.scheduleAccessTokenRefresh();
        }

        // if(is_fully_authenticated || is_partially_authenticated) {
        //     this.action_handler.startInactivityTracking();
        // }
    }

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.event_bus?.off("is_loading", this.action_handler.handleIsLoading);
        this.event_bus?.off("alert_status_updated", this.action_handler.handleStatusChanged);

        this.action_handler.cleanup();
    }
}

export default AppRootController;
