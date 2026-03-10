
import BaseController from "@ui/version_3/base_classes/base_controller";

import EventBus from "@/utils/global_event_bus_util";

import {
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface,
    LoginViewClassStylesInterface
} from "@/ui_types/login_view_type";

import LoginViewClassStyles from "@/class_styles/login_view_class_styles";

import HeaderTextUI from "@ui/version_3/components/HeaderTextUI.vue";
import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";
import ToasterUI from "@ui/version_3/components/ToasterUI.vue";

import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";
import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";
import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";
import LoginViewActionHandler from "@/action_handlers/login_view_action_handler";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";



class LoginViewController extends BaseController <
    LoginViewPropsInterface,
    LoginViewStateDataInterface,
    LoginViewComputedDataInterface,
    LoginViewComponentsInterface
> {
    private readonly event_bus = EventBus;

    public readonly class_styles: LoginViewClassStylesInterface = LoginViewClassStyles;

    public readonly action_handler: LoginViewActionHandler = new LoginViewActionHandler(this);

    constructor(props: LoginViewPropsInterface) {
        super("auth_layout", props);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): LoginViewComponentsInterface { 
        return  { 
            HeaderTextUI, 
            InputGroupUI, 
            ToasterUI 
        }; 
    }

    // Method to get state data
    protected getUIStateData(): LoginViewStateDataInterface {
        const {
            header_text_class_style,
            input_ui_class_styles,
            toaster_ui_class_styles
        } = LoginViewClassStyles;

        const input_action_config   = this.action_handler.getInputActionHandlersConfig();
        const username_content_key  = "content_resource.login_view_ui.fieldset.username_field";
        const password_content_key  = "content_resource.login_view_ui.fieldset.password_field";

        HeaderTextUIPropsBuilder.configure({ text_class_style: header_text_class_style });

        InputUIPropsBuilder.configure(input_ui_class_styles, input_action_config);

        ToasterUIPropsBuilder.configure("login_toaster", toaster_ui_class_styles);

        const user_name_input_props = InputUIPropsBuilder.getReactivePropsObject("username", "text", username_content_key);

        const password_input_props  = InputUIPropsBuilder.getReactivePropsObject("password", "password", password_content_key)
        
        return {
            header_text_props: HeaderTextUIPropsBuilder.getReactivePropsObject("h2", "content_resource.login_view_ui.sign_in_text"),

            username_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(user_name_input_props, username_content_key),

            password_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(password_input_props, username_content_key),

            toast_alert_props: ToasterUIPropsBuilder.getReactivePropsObject(),

            btn_props: null,
        } as LoginViewStateDataInterface;
    }

}

export default LoginViewController