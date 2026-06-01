import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { TwoFactorLoginFieldsType } from "@/types/form_fields_type";

import { TwoFactorFormDataInterface } from "@/types/form_data_type";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";

import TwoFactorLoginViewActionHandler from "@/action_handlers/auth/two_factor_login_view_action_handler";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import {
    FormViewComputedDataInterface,
    FormViewPropsWithClassStyles,
    TwoFactorLoginViewStateDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

class TwoFactorLoginViewController extends BaseFormViewController<
    TwoFactorFormDataInterface,
    TwoFactorLoginFieldsType,
    FormViewPropsWithClassStyles<AuthsViewClassStylesInterface>,
    TwoFactorLoginViewStateDataInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: AuthsViewClassStylesInterface =
        AuthLayoutClassStyles.auth_view_class_style;

    constructor(props: FormViewPropsWithClassStyles<AuthsViewClassStylesInterface>) {
        super("two_factor_login_view", props, AuthLayoutClassStyles.auth_view_class_style);

        this.setFormActionHandler(new TwoFactorLoginViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "two_factor_toaster",
            input_number_props: { length: 6 }
        });
    }

    // Method to build header text ui
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(
            "content_resource.two_factor_login_view_ui.header_text",
            "h2"
        );
    }

    // Method to build form fields UI
    protected buildFormFieldsUI(): TwoFactorLoginFieldsType {
        const otp_content_key = "content_resource.two_factor_login_view_ui.fieldset.otp_field";

        const otp_input_props = this.buildInputProps("otp_code", "otp", otp_content_key);

        const otp_input_group_props = this.buildInputGroupFromInputProps(
            otp_input_props,
            otp_content_key
        );

        return { otp_input_group_props } as TwoFactorLoginFieldsType;
    }

    // Method to build form button UI
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        const btn_content_key = "content_resource.two_factor_login_view_ui.fieldset.btn_text";

        return this.buildSubmitButtonProps(
            "2fa_login_submit",
            btn_content_key,
            "paper_airplane_send_svg_icon"
        );
    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_logged_in = MemberAuthenticatorUtil.isLoggedIn();
        const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();

        if (is_fully_authenticated) {
            await this.router.push("/dashboard");
            return;
        }

        if (!is_logged_in) {
            await this.router.push("/login");
            return;
        }

        // set csrf token
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.TWO_FACTOR);
    }
}

export default TwoFactorLoginViewController;
