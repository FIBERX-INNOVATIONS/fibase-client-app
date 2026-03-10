
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

import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";
import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";
import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";
import LoginViewActionHandler from "@/action_handlers/login_view_action_handler";
import BaseFormActionHandler from "@/action_handlers/base_form_action_hanler";


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
        return  { HeaderTextUI, InputGroupUI }; 
    }

    // Method to get state data
    protected getUIStateData(): LoginViewStateDataInterface {
        HeaderTextUIPropsBuilder.configure({ text_class_style: LoginViewClassStyles.header_text_class_style });

        InputUIPropsBuilder.configure(
            LoginViewClassStyles.input_ui_class_styles,
            this.action_handler.getInputActionHandlersConfig()  
        )

        const username_content_key  = "content_resource.login_view_ui.fieldset.username_field";
        const password_content_key  = "content_resource.login_view_ui.fieldset.password_field";

        const user_name_input_props = InputUIPropsBuilder.getReactivePropsObject("username", "text", username_content_key);
        const password_input_props  = InputUIPropsBuilder.getReactivePropsObject("password", "password", password_content_key)
        
        return {
            csrf_token: null,

            header_text_props: HeaderTextUIPropsBuilder.getReactivePropsObject("h2", "content_resource.login_view_ui.sign_in_text"),

            username_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(user_name_input_props, username_content_key),

            password_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(password_input_props, username_content_key),

            toast_alert_props: null,

            btn_props: null,
        } as LoginViewStateDataInterface;
    }

}

export default LoginViewController