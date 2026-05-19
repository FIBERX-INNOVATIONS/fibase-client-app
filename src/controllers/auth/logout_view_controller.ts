import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

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
    public readonly class_styles: AuthsViewClassStylesInterface = AuthLayoutClassStyles.auth_view_class_style;

    public readonly action_handler: LogoutViewActionHandler = new LogoutViewActionHandler(this);

    constructor(props: LogoutViewPropsInterface) {
        super("logout_view", props, EventBus);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): LogoutViewComponentsInterface {
        return { HeaderTextUI };
    }

    // Method to get state data
    protected getUIStateData(): LogoutViewStateDataInterface {
        const { header_text_class_style } = this.class_styles;

        HeaderTextUIPropsBuilder.configure({ text_class_style: header_text_class_style });

        return {
            header_text_props: HeaderTextUIPropsBuilder.getReactivePropsObject(
                "h2",
                "content_resource.logout_view_ui.header_text"
            ),

            spinner_html_content: RenderHtmlUtil.renderLoaderHtml({
                class_style: "w-12 h-12 flex items-center"
            })
        } as LogoutViewStateDataInterface;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();

        if (!is_fully_authenticated) {
            await this.router.push("/login");
            return;
        }

        this.action_handler.handleLogoutAction();
    }
}

export default LogoutViewController;
