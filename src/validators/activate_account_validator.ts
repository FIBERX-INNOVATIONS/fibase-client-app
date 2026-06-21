import { ActivateAccountFormDataInterface, CompleteMemberSetupPayload } from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

import MemberProfileValidator from "@/validators/member_profile_validator";
import TwoFactorLoginValidator from "@/validators/two_factor_login_validator";

import BaseValidator from "@/validators/base_validator";

class ActivateAccountValidator extends BaseValidator {
    // Method to validate the password field.
    public static validatePasswordField(value?: string | null): ActionMethodRetrunInterface {
        const password_result = MemberProfileValidator.validateNewPasswordField(value);

        if (!password_result.status) {
            return {
                status: false,
                msg: ActivateAccountValidator.getContentMessage("invalid_input_new_password")
            };
        }

        return { status: true, msg: "" };
    }

    // Method to validate the password confirmation field.
    public static validatePasswordConfirmField(
        value: string | null,
        form_data: Partial<ActivateAccountFormDataInterface>
    ): ActionMethodRetrunInterface {
        const password = form_data.password ?? "";
        const password_confirm = value ?? "";

        if (InputValidatorUtil.isEmpty(password_confirm) || password !== password_confirm) {
            return {
                status: false,
                msg: ActivateAccountValidator.getContentMessage("invalid_activation_password_confirm")
            };
        }

        return { status: true, msg: "" };
    }

    // Method to validate the activation password step input.
    public static validatePasswordStepInput(
        form_data: ActivateAccountFormDataInterface
    ): ValidationResultInterface<ActivateAccountFormDataInterface> {
        const { password, password_confirm } = form_data;

        if (!ActivateAccountValidator.validatePasswordField(password).status) {
            return { v_state: false, v_msg: "invalid_input_new_password" };
        }

        if (InputValidatorUtil.isEmpty(password_confirm) || (password ?? "") !== (password_confirm ?? "")) {
            return { v_state: false, v_msg: "invalid_activation_password_confirm" };
        }

        return { v_state: true, v_msg: "valid_input", v_data: form_data };
    }

    // Method to validate the activation completion input.
    public static validateCompleteMemberSetupInput(
        form_data: ActivateAccountFormDataInterface
    ): ValidationResultInterface<CompleteMemberSetupPayload> {
        const otp_code = ActivateAccountValidator.normalizeStringInput(form_data.otp_code);
        const password_step_result = ActivateAccountValidator.validatePasswordStepInput(form_data);

        if (!password_step_result.v_state) {
            return { v_state: false, v_msg: password_step_result.v_msg };
        }

        if (InputValidatorUtil.isEmpty(form_data.csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (InputValidatorUtil.isEmpty(form_data.token)) {
            return { v_state: false, v_msg: "invalid_activation_token" };
        }

        if (InputValidatorUtil.isEmpty(form_data.member_public_id)) {
            return { v_state: false, v_msg: "invalid_activation_member" };
        }

        if (!TwoFactorLoginValidator.validateOtpCodeField(otp_code).status) {
            return { v_state: false, v_msg: "invalid_otp_code" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token: form_data.csrf_token,
                member_public_id: form_data.member_public_id as string,
                password: form_data.password as string,
                password_confirm: form_data.password_confirm as string,
                otp_code,
                token: form_data.token as string
            }
        };
    }
}

export default ActivateAccountValidator;
