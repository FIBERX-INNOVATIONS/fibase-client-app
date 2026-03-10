
import { ActionMethodRetruninterface } from "@ui/version_3/ui_types/input_ui_type";
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
    ): ActionMethodRetruninterface => {
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
    }

    public static validatePasswordField = (
        password_value: string | null
    ): ActionMethodRetruninterface => {
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
    }
}

export default LoginValidator