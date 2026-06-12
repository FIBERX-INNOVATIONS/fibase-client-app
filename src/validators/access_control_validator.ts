import { CreateRolePayload, RoleFormDataInterface, UpdateRolePayload } from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class AccessControlValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    protected static getContentMessage(message_key: string): string {
        return AccessControlValidator.content_manager.getAPIResponseValue(message_key);
    }

    public static validateRoleName = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_role_name") };
        }

        if (value && !InputValidatorUtil.isValidNamey(value.trim())) {
            return { status: false, msg: this.getContentMessage("invalid_role_name") };
        }

        return { status: true, msg: "" };
    };

    public static validateRoleSymbol = (value?: string | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_role_symbol") };
        }

        if (value && !/^[a-zA-Z0-9_-]{2,50}$/.test(value.trim())) {
            return { status: false, msg: this.getContentMessage("invalid_role_symbol") };
        }

        return { status: true, msg: "" };
    };

    public static validateIsMemberGroup = (value?: boolean | string | null): ActionMethodRetrunInterface => {
        if (typeof value === "boolean") {
            return { status: true, msg: "" };
        }

        if (value === "true" || value === "false") {
            return { status: true, msg: "" };
        }

        return { status: false, msg: this.getContentMessage("invalid_role_member_group") };
    };

    private static resolveBoolean(value?: boolean | string | null): boolean {
        if (typeof value === "boolean") {
            return value;
        }

        return value === "true";
    }

    public static validateCreateRoleInput(form_data: RoleFormDataInterface): ValidationResultInterface<CreateRolePayload> {
        const { csrf_token, name, symbol } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateRoleName(name).status) {
            return { v_state: false, v_msg: "invalid_role_name" };
        }

        if (!this.validateRoleSymbol(symbol).status) {
            return { v_state: false, v_msg: "invalid_role_symbol" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                name: name.trim(),
                symbol: symbol?.trim()?.toUpperCase()
            }
        };
    }

    public static validateUpdateRoleInput(form_data: RoleFormDataInterface): ValidationResultInterface<UpdateRolePayload> {
        const { csrf_token, name, symbol } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateRoleName(name).status) {
            return { v_state: false, v_msg: "invalid_role_name" };
        }

        if (!this.validateRoleSymbol(symbol).status) {
            return { v_state: false, v_msg: "invalid_role_symbol" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                name: name?.trim(),
                symbol: symbol?.trim()?.toUpperCase()
            }
        };
    }
}

export default AccessControlValidator;
