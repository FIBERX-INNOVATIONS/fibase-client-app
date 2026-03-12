
import { TwoFactorFormDataInterface } from "@/types/form_data_type";
import { ValidationResultInterface } from "@ui/version_3/types/validator_type";
import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class TwoFactorLoginValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    // Method to get content message
    protected static getContentMessage(message_key: string): string {

        return TwoFactorLoginValidator.content_manager.getAPIResponseValue(message_key);

    }

    public static validateOtpCodeField = (
        otp_value: string[]
    ): ActionMethodRetrunInterface => {
        if(!InputValidatorUtil.containsOnlyNumbers(otp_value) || otp_value.length < 6) {
            return { 
                status: false, 
                msg: TwoFactorLoginValidator.getContentMessage("invalid_otp_code") 
            };
        }
        return { status: true, msg: "" };
    }

    /** Validate TwoFactorLogin input */
    public static validateTwoFactorLoginInput(
        form_data: TwoFactorFormDataInterface
    ): ValidationResultInterface {
        const { csrf_token, otp_code } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (
            InputValidatorUtil.isEmpty(otp_code) ||
            !InputValidatorUtil.containsOnlyNumbers(otp_code) ||
            otp_code.length < 6
        ) {
            return { v_state: false, v_msg: "invalid_otp_code" };
        }


        return { v_state: true, v_msg: "valid_input" };
    }
}

export default TwoFactorLoginValidator