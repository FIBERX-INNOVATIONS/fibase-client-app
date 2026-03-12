
import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import {
    TwoFactorLoginViewPropsInterface,
    TwoFactorLoginViewStateDataInterface,
    TwoFactorLoginViewComputedDataInterface,
    TwoFactorLoginViewComponentsInterface,
} from "@/ui_types//two_factor_login_view_type";

import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";

import HeaderTextUI from "@ui/version_3/components/HeaderTextUI.vue";
import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";
import ToasterUI from "@ui/version_3/components/ToasterUI.vue";
import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";
import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";
import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";
import TwoFactorLoginViewActionHandler from "@/action_handlers/two_factor_login_view_action_handler";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";


class TwoFactorLoginViewController extends BaseController <
    TwoFactorLoginViewPropsInterface,
    TwoFactorLoginViewStateDataInterface,
    TwoFactorLoginViewComputedDataInterface,
    TwoFactorLoginViewComponentsInterface,
    GlobalEventTypes
> {

    public readonly class_styles: AuthsViewClassStylesInterface = AuthLayoutClassStyles.auth_view_class_style;

    public readonly action_handler: TwoFactorLoginViewActionHandler = new TwoFactorLoginViewActionHandler(this);

    constructor(props: TwoFactorLoginViewPropsInterface) {
        super("two_factor_login_view", props, EventBus);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): TwoFactorLoginViewComponentsInterface { 
        return  { 
            HeaderTextUI, 
            InputGroupUI, 
            ToasterUI,
            ButtonUI
        }; 
    }

    // Method to get state data
    protected getUIStateData(): TwoFactorLoginViewStateDataInterface {
        const {
            header_text_class_style,
            input_ui_class_styles,
            toaster_ui_class_styles,
            btn_class_styles
        } = this.class_styles;

        const input_action_config   = this.action_handler.getInputActionHandlersConfig();
        const btn_action_config     = this.action_handler.getBtnActionHandlerConfig();
        const toaster_action_config = this.action_handler.getToasterActionHandlerConfig()
        const username_content_key  = "content_resource.two_factor_login_view_ui.fieldset.otp_field";
        const btn_content_key       = "content_resource.two_factor_login_view_ui.fieldset.btn_text";

        HeaderTextUIPropsBuilder.configure({ text_class_style: header_text_class_style });

        InputUIPropsBuilder.configure(input_ui_class_styles, input_action_config, undefined, { length: 6 });

        ToasterUIPropsBuilder.configure("two_factor_toaster", toaster_ui_class_styles, toaster_action_config);

        ButtonUIPropsBuilder.configure(btn_class_styles, btn_action_config, { disabled: true })

        const otp_input_props = InputUIPropsBuilder.getReactivePropsObject("otp_code", "otp", username_content_key);
        
        return {
            header_text_props: HeaderTextUIPropsBuilder.getReactivePropsObject("h2", "content_resource.two_factor_login_view_ui.sign_in_text"),

            otp_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(otp_input_props, username_content_key),

            toast_alert_props: ToasterUIPropsBuilder.getReactivePropsObject(),

            btn_props: ButtonUIPropsBuilder.getReactivePropsObject("login_submit", btn_content_key, "paper_airplane_send_svg_icon"),
        } as TwoFactorLoginViewStateDataInterface;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_logged_in              = MemberAuthenticatorUtil.isLoggedIn()
        const is_fully_authenticated    = MemberAuthenticatorUtil.isFullyLoggedIn();

        if(is_fully_authenticated) { await this.router.push("/dashboard") }

        if(!is_logged_in) { await this.router.push("/login") }
        
        // set csrf token
        await this.action_handler.setCSRFToken(CSRF_TOKEN_FOR.TWO_FACTOR);
    }

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        // clear scheduled timers
        this.action_handler.clearScheduledTimers()
    }

}

export default TwoFactorLoginViewController