import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { AuthsViewClassStylesInterface } from "@/ui_types/auth_layout_type";

import {
    TwoFactorLoginViewPropsInterface,
    TwoFactorLoginViewStateDataInterface,
    TwoFactorLoginViewComputedDataInterface,
    TwoFactorLoginViewComponentsInterface
} from "@/ui_types/two_factor_login_view_type";

import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";

import TwoFactorLoginViewActionHandler from "@/action_handlers/auth/two_factor_login_view_action_handler";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";
import { TwoFactorFormDataInterface } from "@/types/form_data_type";

class TwoFactorLoginViewController extends BaseFormViewController<
    TwoFactorFormDataInterface,
    TwoFactorLoginViewPropsInterface,
    TwoFactorLoginViewStateDataInterface,
    TwoFactorLoginViewComputedDataInterface,
    TwoFactorLoginViewComponentsInterface,
    AuthsViewClassStylesInterface,
    TwoFactorLoginViewActionHandler,
    GlobalEventTypes
> {
    constructor(props: TwoFactorLoginViewPropsInterface) {
        super("two_factor_login_view", props, AuthLayoutClassStyles.auth_view_class_style);

        this.setFormActionHandler(new TwoFactorLoginViewActionHandler(this));
    }

    // Method to get state data
    protected getUIStateData(): TwoFactorLoginViewStateDataInterface {
        const username_content_key = "content_resource.two_factor_login_view_ui.fieldset.otp_field";
        const btn_content_key = "content_resource.two_factor_login_view_ui.fieldset.btn_text";

        this.configureFormUI({
            toaster_id: "two_factor_toaster",
            input_number_props: { length: 6 }
        });

        const otp_input_props = this.buildInputProps("otp_code", "otp", username_content_key);

        return {
            header_text_props: this.buildHeaderTextProps(
                "content_resource.two_factor_login_view_ui.header_text",
                "h2"
            ),

            otp_input_group_props: this.buildInputGroupFromInputProps(
                otp_input_props,
                username_content_key
            ),

            toast_alert_props: this.buildToasterProps(),

            class_styles: this.class_styles,

            btn_props: this.buildSubmitButtonProps(
                "login_submit",
                btn_content_key,
                "paper_airplane_send_svg_icon"
            )
        } as TwoFactorLoginViewStateDataInterface;
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
