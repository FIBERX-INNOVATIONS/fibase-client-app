import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util"

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { 
    AlertStatusChangedEventInterface,
    CloseModalEventInterface,
    GlobalEventTypes,
} from "@/types/global_events_type";

import {
    AppRootPropsInterface,
    AppRootStateDataInterface,
    AppRootComputedDataInterface,
    AppRootComponentsInterface
} from "@/types/app_root_type";

import StatusAlertPropsBuilder from "@ui/version_3/props_builder/status_alert_ui_props_builder";
import AppRootClassStyles from "@/class_styles/app_root_class_styles";


class AppRootActionHandler {
    public readonly name = "app_root_action_handler";

    // Make controller static so it’s shared across all usage
    private controller: BaseController<
        AppRootPropsInterface, 
        AppRootStateDataInterface, 
        AppRootComputedDataInterface, 
        AppRootComponentsInterface,
        GlobalEventTypes
    >;

    private readonly logger: LoggerUtil = new LoggerUtil({ prefix: this.name, show_timestamp: false });

    constructor(
        controller: BaseController<
            AppRootPropsInterface,
            AppRootStateDataInterface,
            AppRootComputedDataInterface,
            AppRootComponentsInterface,
            GlobalEventTypes
        >
    ) {
        this.controller = controller;
    }


    // Method to get status icon 
    private static getStatusIcon (alert_status: string): SVGIconKey {
        const status = alert_status?.toLowerCase() || "info";

        switch (status) {
            case "success":
                return "smiley_face_svg_icon";
            case "error":
                return "error_exclamation_mark_svg_icon";
            default:
                return "question_mark_svg_icon";
        }

    }

    // Method to get status alert bg class style
    public static getStatusBgClassStyle = (
        alert_status: string | null
    ): string => {
        switch (alert_status?.toLowerCase()) {
            case "success":
                return AppRootClassStyles?.status_alert_ui_class_style?.sucess_bg_class_style
            case "error":
                return AppRootClassStyles?.status_alert_ui_class_style?.error_bg_class_style;
            case "info":
                return AppRootClassStyles?.status_alert_ui_class_style?.info_bg_class_style;
            default:
                return ""
        }
    }

    // Method to get status text class style
    public static getStatusTextClassStyle = (
        alert_status: string | null
    ): string => {
        switch (alert_status?.toLowerCase()) {
            case "success":
                return AppRootClassStyles.status_alert_ui_class_style?.sucess_text_class_style;
            case "error":
                return AppRootClassStyles.status_alert_ui_class_style?.error_text_class_style
            case "info":
                return AppRootClassStyles.status_alert_ui_class_style?.info_text_class_style;
            default:
                return ""
        }
    }

    // Method to get slider animation
    public static getAnimationClassStyle = (
        visible: boolean
    ): string => {
        return visible ? "animate-slide-in" : "animate-slide-out";
    }

    // Method to handle close status click
    public handleOnCloseStatusClick = (event?: MouseEvent) => {
        const { status_alert_props }    = this.controller.state_refs;
        const alert_box_id              = status_alert_props?.value?.alert_box_id ?? "";
        const alert_box_el              = document.getElementById(alert_box_id);

        if(alert_box_el) {
            alert_box_el.classList.remove("animate-slide-in");
            alert_box_el.classList.add("animate-slide-out");
        }

        setTimeout(() => { 
            status_alert_props.value.visible = false;
            status_alert_props.value.alert_status = null;
            status_alert_props.value.status_content_messgae = null;
        }, 300); 
    };

    // Method to handle closing modal
    public handleCloseModal (payload: CloseModalEventInterface): boolean {
        let { modal_index = 0 }         = payload;
        const { modals }                = this.controller.state_refs;
        const modal_count               = modals.value.length;
        let index_to_close              = (modal_count - 1);

        if(
            modal_index && 
            modal_index > 0 && 
            modal_index < modal_count
        ) {
            index_to_close = modal_index
        }

        this.controller.state_refs.modals?.value.splice(index_to_close, 1)[0];
        return true;
    }


    // Method to handle is loading event so show screen loader
    public handleIsLoading = (value: boolean) => {
        const { screen_loader_props }   = this.controller.state_refs;

        this.controller.state_refs.screen_loader_props.value.visible = value;
    };

    // Method to handle alert status changed event
    public handleStatusChanged = async (payload: AlertStatusChangedEventInterface) => {
        const { status, msg, options = {} } = payload;

        const { 
            duration = 2000, 
            should_reload = false, 
            redirect_url = "", 
            close_modal = false 
        } = options;

        const status_icon               = AppRootActionHandler.getStatusIcon(status);
        const new_status_alert_props    = StatusAlertPropsBuilder.getReactivePropsObject(status, msg, status_icon);

        Object.assign(this.controller.state_refs.status_alert_props.value, new_status_alert_props);

        // Optional: close any open modal immediately
        if (close_modal) { this.handleCloseModal({}); }

        // Wait for the alert to be displayed
        if (duration > 0) { 
            await new Promise((resolve) => setTimeout(resolve, duration)); 
            // Hide alert after duration
            this.controller.state_refs.status_alert_props.value.visible = false;
        }

        // Handle post-alert actions
        if(!this.controller.router) { 
            return 
        }

        if (should_reload) { 
            this.controller.router.go(0); 
        } 

        else if (redirect_url && redirect_url.length > 0) { 
            await this.controller.router.push(redirect_url); 
        }
    };
}

export default AppRootActionHandler;