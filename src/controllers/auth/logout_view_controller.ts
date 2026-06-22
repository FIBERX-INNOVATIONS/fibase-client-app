import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";
import { markRaw } from "vue";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import {
    LogoutViewPropsInterface,
    LogoutViewStateDataInterface,
    LogoutViewComputedDataInterface,
    LogoutViewComponentsInterface
} from "@/ui_types/logout_view_type";

import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";

import HeaderTextUI from "@ui/version_3/components/HeaderTextUI.vue";

import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";
import LogoutViewActionHandler from "@/action_handlers/auth/logout_view_action_handler";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

class LogoutViewController extends BaseController<
    LogoutViewPropsInterface,
    LogoutViewStateDataInterface,
    LogoutViewComputedDataInterface,
    LogoutViewComponentsInterface,
    GlobalEventTypes
> {
    public action_handler: LogoutViewActionHandler;

    private readonly class_styles: AuthsViewClassStylesInterface;

    constructor(props: LogoutViewPropsInterface) {
        super("logout_view", props, EventBus);

        this.class_styles = props.class_styles ?? AuthLayoutClassStyles.auth_view_class_style;

        this.action_handler = new LogoutViewActionHandler(this);
        this.setActionHandler(this.action_handler);
    }

    // Method to get ui components
    protected getUIComponents(): LogoutViewComponentsInterface {
        return { HeaderTextUI: markRaw(HeaderTextUI) };
    }

    // Method to get state data
    protected getUIStateData(): LogoutViewStateDataInterface {
        const { header_text_class_style } = this.class_styles;

        HeaderTextUIPropsBuilder.configure({ text_class_style: header_text_class_style });

        return {
            class_styles: this.class_styles,

            header_text_props: HeaderTextUIPropsBuilder.getReactivePropsObject(
                "h2",
                "content_resource.logout_view_ui.header_text"
            ),

            spinner_html_content: RenderHtmlUtil.renderLoaderHtml({
                class_style: this.class_styles.spinner_class_style
            })
        } as LogoutViewStateDataInterface;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_logged_in = MemberAuthenticatorUtil.isLoggedIn();

        if (!is_logged_in) {
            await this.router.push("/login");
            return;
        }

        this.action_handler.handleLogoutAction();
    }

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.action_handler.cleanup();
    }
}

export default LogoutViewController;
