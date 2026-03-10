
import BaseController from "@ui/version_3/base_classes/base_controller";

import EventBus from "@/utils/global_event_bus_util";

import {
    AppRootPropsInterface,
    AppRootStateDataInterface,
    AppRootComputedDataInterface,
    AppRootComponentsInterface
} from "@/types/app_root_type";

import AppRootClassStyles from "@/class_styles/app_root_class_styles";

import ScreenLoaderUI from "@ui/version_3/components/ScreenLoaderUI.vue";
import StatusAlertUI from "@ui/version_3/components/StatusAlertUI.vue";
import LayoutView from "@/layout/LayoutView.vue";

import ScreenLoaderUIPropsBuilder from "@ui/version_3/props_builder/screen_loader_ui_props_builder";
import StatusAlertPropsBuilder from "@ui/version_3/props_builder/status_alert_ui_props_builder";
import AppRootActionHandler from "@/action_handlers/app_root_action_handler";



class AppRootController extends BaseController <
    AppRootPropsInterface,
    AppRootStateDataInterface,
    AppRootComputedDataInterface,
    AppRootComponentsInterface
> {
    private readonly event_bus = EventBus;

    public action_handler: AppRootActionHandler = new AppRootActionHandler(this);

    constructor(props: AppRootPropsInterface) {
        super("app_root", props);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): AppRootComponentsInterface { 
        return  { 
            ScreenLoaderUI,
            StatusAlertUI,
            LayoutView
        }; 
    }

    // Method to get ui state data
    protected getUIStateData(): AppRootStateDataInterface {
        StatusAlertPropsBuilder.configure(
            "StatusAlertBox",
            AppRootClassStyles.status_alert_ui_class_style,
            this.action_handler.handleOnCloseStatusClick,
            AppRootActionHandler.getStatusBgClassStyle,
            AppRootActionHandler.getAnimationClassStyle,
            AppRootActionHandler.getStatusTextClassStyle
        )

        return {
            modals: ([]),

            screen_loader_props: ScreenLoaderUIPropsBuilder.getReactivePropsObject(false, AppRootClassStyles.screen_loader_ui_class_style),

            status_alert_props: StatusAlertPropsBuilder.getReactivePropsObject(),

        } as AppRootStateDataInterface;
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        // Bridge mitt events to Vue template handlers
        this.event_bus.on("is_loading", this.action_handler.handleIsLoading);

        this.event_bus.on("alert_status_updated", this.action_handler.handleStatusChanged);

        this.event_bus.on("close_modal", this.action_handler.handleCloseModal);

        // if(is_fully_authenticated || is_partially_authenticated) {
        //     this.action_handler.startInactivityTracking();
        // }
    }

}

export default AppRootController