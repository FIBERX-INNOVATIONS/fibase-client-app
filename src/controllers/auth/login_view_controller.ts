import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { LoginFieldsType } from "@/types/form_fields_type";

import { LoginFormDataInterface } from "@/types/form_data_type";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";

import LoginViewActionHandler from "@/action_handlers/auth/login_view_action_handler";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import {
    FormViewComputedDataInterface,
    FormViewPropsWithClassStyles,
    LoginViewStateDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

class LoginViewController extends BaseFormViewController<
    LoginFormDataInterface,
    LoginFieldsType,
    FormViewPropsWithClassStyles<AuthsViewClassStylesInterface>,
    LoginViewStateDataInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: AuthsViewClassStylesInterface =
        AuthLayoutClassStyles.auth_view_class_style;

    constructor(props: FormViewPropsWithClassStyles<AuthsViewClassStylesInterface>) {
        super("login_view", props, AuthLayoutClassStyles.auth_view_class_style);

        this.setFormActionHandler(new LoginViewActionHandler(this));

        this.configureFormUI({ toaster_id: "login_toaster" });
    }

    // Method to build header text ui
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps("content_resource.login_view_ui.header_text", "h2");
    }

    // Method to build form fields UI
    protected buildFormFieldsUI(): LoginFieldsType {
        const username_content_key = "content_resource.login_view_ui.fieldset.username_field";
        const password_content_key = "content_resource.login_view_ui.fieldset.password_field";

        const user_name_input_props = this.buildInputProps(
            "username",
            "text",
            username_content_key
        );

        const password_input_props = this.buildInputProps(
            "password",
            "password",
            password_content_key
        );

        const username_input_group_props = this.buildInputGroupFromInputProps(
            user_name_input_props,
            username_content_key
        );

        const password_input_group_props = this.buildInputGroupFromInputProps(
            password_input_props,
            password_content_key
        );

        return {
            username_input_group_props,
            password_input_group_props
        } as LoginFieldsType;
    }

    // Method to build form button UI
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        const btn_content_key = "content_resource.login_view_ui.fieldset.btn_text";

        return this.buildSubmitButtonProps(
            "login_submit",
            btn_content_key,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle logic when component is mounted
    protected async handleOnMountedLogic(): Promise<void> {
        const is_logged_in = MemberAuthenticatorUtil.isLoggedIn();
        const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();

        if (is_fully_authenticated) {
            await this.router.push("/dashboard");
            return;
        }

        if (is_logged_in) {
            await this.router.push("/two-factor-login");
            return;
        }

        MemberAuthenticatorUtil.onlogoutSuccess();

        // set csrf token
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.LOGIN);
    }
}

export default LoginViewController;
