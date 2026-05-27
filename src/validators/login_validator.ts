import { LoginFormDataInterface } from "@/types/form_data_type";
import { ValidationResultInterface } from "@ui/version_3/types/validator_type";
import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class LoginValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    // Method to get content message
    protected static getContentMessage(message_key: string): string {
        return LoginValidator.content_manager.getAPIResponseValue(message_key);
    }

    public static validateUsernameField = (
        username_value: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(username_value)) {
            return {
                status: false,
                msg: LoginValidator.getContentMessage("invalid_input_username")
            };
        }

        if (username_value && username_value.length < 3) {
            return {
                status: false,
                msg: LoginValidator.getContentMessage("invalid_input_username")
            };
        }

        return { status: true, msg: "" };
    };

    public static validatePasswordField = (
        password_value: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(password_value)) {
            return {
                status: false,
                msg: LoginValidator.getContentMessage("invalid_input_password")
            };
        }

        if (password_value && password_value.length < 6) {
            return {
                status: false,
                msg: LoginValidator.getContentMessage("invalid_input_password")
            };
        }

        return { status: true, msg: "" };
    };

    /** Validate login input */
    public static validateLoginInput(form_data: LoginFormDataInterface): ValidationResultInterface {
        const { csrf_token, username, password } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!LoginValidator.validateUsernameField(username).status) {
            return { v_state: false, v_msg: "invalid_input_username" };
        }

        if (!LoginValidator.validatePasswordField(password).status) {
            return { v_state: false, v_msg: "invalid_input_password" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }
}

export default LoginValidator;
