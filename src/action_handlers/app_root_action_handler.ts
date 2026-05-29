import dayjs from "dayjs";

import BaseController from "@ui/version_3/base_classes/base_controller";
import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import {
    AlertStatusChangedEventPayloadInterface,
    CloseModalEventPayloadInterface,
    GlobalEventTypes
} from "@/types/global_events_type";

import {
    AppRootPropsInterface,
    AppRootStateDataInterface,
    AppRootComputedDataInterface,
    AppRootComponentsInterface
} from "@/ui_types/app_root_type";

import StatusAlertPropsBuilder from "@ui/version_3/props_builder/status_alert_ui_props_builder";
import ScreenLoaderUIPropsBuilder from "@ui/version_3/props_builder/screen_loader_ui_props_builder";
import AppRootClassStyles, {
    StatusAlertVariantClassStyles
} from "@/class_styles/app_root_class_styles";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import AuthAPIService from "@/api_services/auth_api_service";

type StatusAlertType = "success" | "error" | "info" | "warning";

class AppRootActionHandler extends BaseActionHandler<
    AppRootPropsInterface,
    AppRootStateDataInterface,
    AppRootComputedDataInterface,
    AppRootComponentsInterface,
    GlobalEventTypes
> {
    public readonly name = "app_root_action_handler";

    private status_alert_timeout: ReturnType<typeof setTimeout> | null = null;

    private status_alert_close_timeout: ReturnType<typeof setTimeout> | null = null;

    private access_refresh_timeout: ReturnType<typeof setTimeout> | null = null;

    private alert_sequence = 0;

    private is_status_alert_closing = false;

    private readonly status_alert_close_animation_duration_ms = 240;

    constructor(
        controller: BaseController<
            AppRootPropsInterface,
            AppRootStateDataInterface,
            AppRootComputedDataInterface,
            AppRootComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "app_root_action_handler");
    }

    private clearStatusAlertTimeout(): void {
        if (!this.status_alert_timeout) {
            return;
        }

        clearTimeout(this.status_alert_timeout);
        this.status_alert_timeout = null;
    }

    private clearStatusAlertCloseTimeout(): void {
        if (!this.status_alert_close_timeout) {
            return;
        }

        clearTimeout(this.status_alert_close_timeout);
        this.status_alert_close_timeout = null;
    }

    private clearAccessRefreshTimeout(): void {
        if (!this.access_refresh_timeout) {
            return;
        }

        clearTimeout(this.access_refresh_timeout);
        this.access_refresh_timeout = null;
    }

    private async refreshAccessToken(): Promise<void> {
        const result = await AuthAPIService.refreshAccessToen();

        if (result.status === "success" && MemberAuthenticatorUtil.isFullyLoggedIn()) {
            await this.scheduleAccessTokenRefresh();
        }
    }

    private normalizeStatus(alert_status?: string | null): StatusAlertType {
        const status = alert_status?.toLowerCase() || "info";

        switch (status) {
            case "success":
            case "error":
            case "warning":
            case "info":
                return status;
            default:
                return "info";
        }
    }

    // Method to get status icon
    private getStatusIcon(alert_status: string): SVGIconKey {
        switch (this.normalizeStatus(alert_status)) {
            case "success":
                return "check_circle_svg_icon";
            case "error":
                return "error_exclamation_mark_svg_icon";
            case "warning":
                return "warning_traingle_svg_icon";
            case "info":
                return "exclamation_circle_svg_icon";
            default:
                return "question_mark_svg_icon";
        }
    }

    private getStatusLabel(alert_status: string): string {
        const status = this.normalizeStatus(alert_status);

        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    private getStatusAlertMessage(alert_status: string, message?: string | null): string {
        const status_label = this.getStatusLabel(alert_status);
        const status_message = message || "";

        return `${status_label}: ${status_message}`;
    }

    // Method to get status alert bg class style
    public getStatusBgClassStyle = (alert_status: string | null): string => {
        switch (alert_status?.toLowerCase()) {
            case "success":
                return StatusAlertVariantClassStyles.success_bg_class_style;
            case "error":
                return StatusAlertVariantClassStyles.error_bg_class_style;
            case "info":
                return StatusAlertVariantClassStyles.info_bg_class_style;
            case "warning":
                return StatusAlertVariantClassStyles.warning_bg_class_style;
            default:
                return "";
        }
    };

    // Method to get status text class style
    public getStatusTextClassStyle = (alert_status: string | null): string => {
        switch (alert_status?.toLowerCase()) {
            case "success":
                return StatusAlertVariantClassStyles.success_text_class_style;
            case "error":
                return StatusAlertVariantClassStyles.error_text_class_style;
            case "info":
                return StatusAlertVariantClassStyles.info_text_class_style;
            case "warning":
                return StatusAlertVariantClassStyles.warning_text_class_style;
            default:
                return "";
        }
    };

    // Method to get slider animation
    public getAnimationClassStyle = (visible: boolean): string => {
        if (!visible || this.is_status_alert_closing) {
            return "status-alert-slide-out";
        }

        return "status-alert-slide-in";
    };

    private setStatusAlertProps(
        alert_status: string,
        alert_message: string | null | undefined,
        status_icon?: SVGIconKey | null
    ): void {
        const normalized_status = this.normalizeStatus(alert_status);
        const new_status_alert_props = StatusAlertPropsBuilder.getReactivePropsObject(
            normalized_status,
            this.getStatusAlertMessage(normalized_status, alert_message),
            status_icon ?? this.getStatusIcon(normalized_status)
        );

        this.setState("alert_status", new_status_alert_props?.alert_status ?? null);

        this.setState("alert_message", new_status_alert_props?.status_content_messgae ?? null);

        this.setState("status_icon", new_status_alert_props?.status_icon ?? null);

        this.setState("status_alert_ui_class_style", new_status_alert_props?.class_styles ?? null);
    }

    private clearStatusAlertState(): void {
        this.setState("alert_status", null);

        this.setState("alert_message", null);

        this.setState("status_icon", null);
    }

    private closeStatusAlert(after_closed?: () => void): void {
        const current_status = this.getState("alert_status");
        const current_message = this.getState("alert_message");
        const current_icon = this.getState("status_icon");

        this.clearStatusAlertTimeout();
        this.clearStatusAlertCloseTimeout();

        if (!current_status || !current_message) {
            this.clearStatusAlertState();
            after_closed?.();
            return;
        }

        this.is_status_alert_closing = true;
        const closing_status_alert_props = StatusAlertPropsBuilder.getReactivePropsObject(
            current_status,
            current_message,
            current_icon
        );

        this.setState(
            "status_alert_ui_class_style",
            closing_status_alert_props?.class_styles ?? null
        );

        this.status_alert_close_timeout = setTimeout(() => {
            this.status_alert_close_timeout = null;
            this.is_status_alert_closing = false;
            this.clearStatusAlertState();
            after_closed?.();
        }, this.status_alert_close_animation_duration_ms);
    }

    // Method to handle close status click
    public handleOnCloseStatusClick = (_event?: MouseEvent) => {
        this.closeStatusAlert();
    };

    // Method to handle closing modal
    public handleCloseModal = (payload: CloseModalEventPayloadInterface): boolean => {
        this.controller.event_bus?.emit("close_modal", payload);
        return true;
    };

    // Method to handle is loading event so show screen loader
    public handleIsLoading = (value: boolean): void => {
        this.setState("screen_loader_visible", value);
    };

    public resetScreenLoader = (): void => {
        this.handleIsLoading(false);
    };

    // Method to handle alert status changed event
    public handleStatusChanged = async (
        payload: AlertStatusChangedEventPayloadInterface
    ): Promise<void> => {
        const { status, msg, options = {} } = payload;

        const {
            duration = 2000,
            should_reload = false,
            redirect_url = "",
            close_modal = false
        } = options;

        this.clearStatusAlertTimeout();
        this.clearStatusAlertCloseTimeout();

        const current_alert_sequence = ++this.alert_sequence;
        this.is_status_alert_closing = false;

        this.setStatusAlertProps(status, msg);

        // Optional: close any open modal immediately
        if (close_modal) {
            this.handleCloseModal({});
        }

        if (redirect_url && redirect_url.length > 0) {
            if (redirect_url.startsWith("/")) {
                await this.controller.router.push(redirect_url);
            } else {
                window.location.href = redirect_url;
            }
        }

        // Wait for the alert to be displayed
        if (duration > 0) {
            this.status_alert_timeout = setTimeout(() => {
                if (current_alert_sequence !== this.alert_sequence) {
                    return;
                }

                this.closeStatusAlert(() => {
                    if (should_reload) {
                        this.controller.router.go(0);
                    }
                });
            }, duration);
        }
    };

    // Method to handle refresh access on fully logged in
    public scheduleAccessTokenRefresh = async (): Promise<void> => {
        this.clearAccessRefreshTimeout();

        const expiry_date = MemberAuthenticatorUtil.getLoggedInMemberAccessExpiryDate();

        if (!expiry_date) {
            return;
        }

        const expiry = dayjs(expiry_date);
        const now = dayjs();
        const refresh_time = expiry.subtract(1, "minute");
        const delay = refresh_time.diff(now);

        if (delay <= 0) {
            // already near expiry
            await this.refreshAccessToken();
            return;
        }

        this.access_refresh_timeout = setTimeout(() => {
            void this.refreshAccessToken();
        }, delay);
    };

    public cleanup(): void {
        this.clearStatusAlertTimeout();
        this.clearStatusAlertCloseTimeout();
        this.clearAccessRefreshTimeout();
    }
}

export default AppRootActionHandler;
