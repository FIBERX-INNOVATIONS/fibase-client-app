
import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import {
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface,
} from "@/ui_types/login_view_type";

import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";

import HeaderTextUI from "@ui/version_3/components/HeaderTextUI.vue";
import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";
import ToasterUI from "@ui/version_3/components/ToasterUI.vue";
import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";
import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";
import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";
import LoginViewActionHandler from "@/action_handlers/auth/login_view_action_handler";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";



class LoginViewController extends BaseController <
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface,
    GlobalEventTypes
> {

    public readonly class_styles: AuthsViewClassStylesInterface = AuthLayoutClassStyles.auth_view_class_style;

    public readonly action_handler: LoginViewActionHandler = new LoginViewActionHandler(this);

    constructor(props: LoginViewPropsInterface) {
        super("login_view", props, EventBus);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): LoginViewComponentsInterface { 
        return  { 
            HeaderTextUI, 
            InputGroupUI, 
            ToasterUI,
            ButtonUI
        }; 
    }

    // Method to get state data
    protected getUIStateData(): LoginViewStateDataInterface {
        const {
            header_text_class_style,
            input_ui_class_styles,
            toaster_ui_class_styles,
            btn_class_styles
        } = this.class_styles;

        const input_action_config   = this.action_handler.getInputActionHandlersConfig();
        const btn_action_config     = this.action_handler.getBtnActionHandlerConfig();
        const toaster_action_config = this.action_handler.getToasterActionHandlerConfig()
        const username_content_key  = "content_resource.login_view_ui.fieldset.username_field";
        const password_content_key  = "content_resource.login_view_ui.fieldset.password_field";
        const btn_content_key       = "content_resource.login_view_ui.fieldset.btn_text";

        HeaderTextUIPropsBuilder.configure({ text_class_style: header_text_class_style });

        InputUIPropsBuilder.configure(input_ui_class_styles, input_action_config);

        ToasterUIPropsBuilder.configure("login_toaster", toaster_ui_class_styles, toaster_action_config);

        ButtonUIPropsBuilder.configure(btn_class_styles, btn_action_config, { disabled: true })

        const user_name_input_props = InputUIPropsBuilder.getReactivePropsObject("username", "text", username_content_key);

        const password_input_props  = InputUIPropsBuilder.getReactivePropsObject("password", "password", password_content_key)
        
        return {
            header_text_props: HeaderTextUIPropsBuilder.getReactivePropsObject("h2", "content_resource.login_view_ui.header_text"),

            username_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(user_name_input_props, username_content_key),

            password_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(password_input_props, username_content_key),

            toast_alert_props: ToasterUIPropsBuilder.getReactivePropsObject(),

            btn_props: ButtonUIPropsBuilder.getReactivePropsObject("login_submit", btn_content_key, "paper_airplane_send_svg_icon"),
        } as LoginViewStateDataInterface;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_logged_in              = MemberAuthenticatorUtil.isLoggedIn()
        const is_fully_authenticated    = MemberAuthenticatorUtil.isFullyLoggedIn();

        if(is_fully_authenticated) { 
            await this.router.push("/dashboard");
            return;
        }

        if(is_logged_in) { 
            await this.router.push("/two-factor-login");
            return;
        }

        MemberAuthenticatorUtil.onlogoutSuccess();
        
        // set csrf token
        await this.action_handler.setCSRFToken(CSRF_TOKEN_FOR.LOGIN);
    }

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        // clear scheduled timers
        this.action_handler.clearScheduledTimers()
    }

}

export default LoginViewController