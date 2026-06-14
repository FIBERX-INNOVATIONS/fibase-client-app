import dayjs from "dayjs";

import { CreateMemberPayload, UpdateMemberFormDataInterface, UpdateMemberPayload } from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

class MemberProfileValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    protected static getContentMessage(message_key: string): string {
        return MemberProfileValidator.content_manager.getAPIResponseValue(message_key);
    }

    private static readonly allowed_gender_values = ["male", "female", "other"];

    // Validate first name field
    public static validateFirstNameField(value?: string | null): ActionMethodRetrunInterface {
        const trimmed_value = value?.trim() ?? "";

        if (InputValidatorUtil.isEmpty(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_first_name")
            };
        }

        if (trimmed_value.length < 2 || trimmed_value.length > 50) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_first_name")
            };
        }

        if (!InputValidatorUtil.isValidName(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_first_name")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate last name field
    public static validateLastNameField(value?: string | null): ActionMethodRetrunInterface {
        const trimmed_value = value?.trim() ?? "";

        if (InputValidatorUtil.isEmpty(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_last_name")
            };
        }

        if (trimmed_value.length < 2 || trimmed_value.length > 50) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_last_name")
            };
        }

        if (!InputValidatorUtil.isValidName(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_last_name")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate email field
    public static validateEmailField(value?: string | null): ActionMethodRetrunInterface {
        const trimmed_value = value?.trim().toLowerCase() ?? "";

        if (InputValidatorUtil.isEmpty(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_email")
            };
        }

        if (!InputValidatorUtil.isValidEmail(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_email")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate phone number field
    public static validatePhoneField(value?: string | null): ActionMethodRetrunInterface {
        const trimmed_value = value?.trim() ?? "";

        if (InputValidatorUtil.isEmpty(trimmed_value)) {
            return { status: true, msg: "" };
        }

        if (!InputValidatorUtil.isValidPhoneNumber(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_phone")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate gender field
    public static validateGenderField(value?: string | null): ActionMethodRetrunInterface {
        const trimmed_value = value?.trim().toLowerCase() ?? "";

        if (InputValidatorUtil.isEmpty(trimmed_value)) {
            return { status: true, msg: "" };
        }

        if (!InputValidatorUtil.isValidateIn(trimmed_value, MemberProfileValidator.allowed_gender_values)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_gender")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate dob field
    public static validateDobField(value?: string | null): ActionMethodRetrunInterface {
        const trimmed_value = value ?? "";

        if (InputValidatorUtil.isEmpty(trimmed_value)) {
            return { status: true, msg: "" };
        }

        const date_result = InputValidatorUtil.isValidDateAndDifference(trimmed_value.toString(), "years");

        if (!date_result) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_dob")
            };
        }

        if (date_result.date.isAfter(dayjs())) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_dob")
            };
        }

        if (date_result.difference < 13 || date_result.difference > 120) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_member_dob")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate profile photo link field
    public static validateProfilePhotoLinkField(value?: string | null): ActionMethodRetrunInterface {
        const trimmed_value = value?.trim() ?? "";

        if (InputValidatorUtil.isEmpty(trimmed_value)) {
            return { status: true, msg: "" };
        }

        if (!InputValidatorUtil.isValidURL(trimmed_value)) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_profile_photo_link")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate password field for optional self-service password updates
    public static validateNewPasswordField(value?: string | null): ActionMethodRetrunInterface {
        const password_value = value ?? "";

        if (InputValidatorUtil.isEmpty(password_value)) {
            return { status: true, msg: "" };
        }

        if (password_value.length < 6) {
            return {
                status: false,
                msg: MemberProfileValidator.getContentMessage("invalid_input_new_password")
            };
        }

        return { status: true, msg: "" };
    }

    // Validate create member input
    public static validateCreateMemberInput(form_data: CreateMemberPayload): ValidationResultInterface<CreateMemberPayload> {
        const { csrf_token, first_name, last_name, email, phone, dob, gender, profile_photo_link } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!MemberProfileValidator.validateFirstNameField(first_name).status) {
            return { v_state: false, v_msg: "invalid_member_first_name" };
        }

        if (!MemberProfileValidator.validateLastNameField(last_name).status) {
            return { v_state: false, v_msg: "invalid_member_last_name" };
        }

        if (!MemberProfileValidator.validateEmailField(email).status) {
            return { v_state: false, v_msg: "invalid_member_email" };
        }

        if (!MemberProfileValidator.validatePhoneField(phone).status) {
            return { v_state: false, v_msg: "invalid_member_phone" };
        }

        if (!MemberProfileValidator.validateDobField(dob).status) {
            return { v_state: false, v_msg: "invalid_member_dob" };
        }

        if (!MemberProfileValidator.validateGenderField(gender).status) {
            return { v_state: false, v_msg: "invalid_member_gender" };
        }

        if (!MemberProfileValidator.validateProfilePhotoLinkField(profile_photo_link).status) {
            return { v_state: false, v_msg: "invalid_profile_photo_link" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                email: email.trim(),
                phone: phone?.trim() || null,
                dob: dob || null,
                gender: gender?.trim() || null,
                profile_photo_link: profile_photo_link?.trim() || null
            }
        };
    }

    // Method to validate update member input
    public static validateUpdateMemberInput(
        form_data: UpdateMemberFormDataInterface
    ): ValidationResultInterface<UpdateMemberPayload> {
        const {
            csrf_token,
            first_name,
            last_name,
            phone,
            dob,
            gender,
            profile_photo_link,
            new_password,
            password_confirm,
            confirm_password
        } = form_data;
        const clean_new_password = new_password?.trim() ?? "";
        const clean_password_confirm = password_confirm?.trim() ?? "";
        const clean_confirm_password = confirm_password?.trim() ?? "";
        const has_password_change = !!clean_new_password || !!clean_password_confirm || !!clean_confirm_password;
        const current_member = MemberAuthenticatorUtil.getLoggedInMember();

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!current_member?.public_id) {
            return { v_state: false, v_msg: "my_profile_not_loaded" };
        }

        const keys_to_check = ["first_name", "last_name", "email", "phone", "dob", "gender", "profile_photo_link"];
        const input_changed = InputValidatorUtil.hasInputChanged(form_data, current_member, keys_to_check);

        if (!input_changed) {
            return { v_state: false, v_msg: "input_has_not_changed" };
        }

        console.log({
            input_changed,
            form_data,
            current_member
        });

        if (!MemberProfileValidator.validateFirstNameField(first_name).status) {
            return { v_state: false, v_msg: "invalid_member_first_name" };
        }

        if (!MemberProfileValidator.validateLastNameField(last_name).status) {
            return { v_state: false, v_msg: "invalid_member_last_name" };
        }

        if (!MemberProfileValidator.validatePhoneField(phone).status) {
            return { v_state: false, v_msg: "invalid_member_phone" };
        }

        if (!MemberProfileValidator.validateDobField(dob).status) {
            return { v_state: false, v_msg: "invalid_member_dob" };
        }

        if (!MemberProfileValidator.validateGenderField(gender).status) {
            return { v_state: false, v_msg: "invalid_member_gender" };
        }

        if (!MemberProfileValidator.validateProfilePhotoLinkField(profile_photo_link).status) {
            return { v_state: false, v_msg: "invalid_profile_photo_link" };
        }

        if (has_password_change && !MemberProfileValidator.validateNewPasswordField(clean_new_password).status) {
            return { v_state: false, v_msg: "invalid_input_new_password" };
        }

        if (
            has_password_change &&
            (InputValidatorUtil.isEmpty(clean_password_confirm) ||
                clean_new_password !== clean_password_confirm ||
                (!!clean_confirm_password && clean_new_password !== clean_confirm_password))
        ) {
            return { v_state: false, v_msg: "invalid_input_new_password" };
        }

        const password_payload = has_password_change
            ? {
                  new_password: clean_new_password,
                  password_confirm: clean_password_confirm,
                  confirm_password: clean_confirm_password || clean_password_confirm
              }
            : {};

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                phone: phone?.trim() || null,
                dob: dob || null,
                gender: gender?.trim() || null,
                profile_photo_link: profile_photo_link?.trim() || null,
                ...password_payload
            }
        };
    }
}

export default MemberProfileValidator;
