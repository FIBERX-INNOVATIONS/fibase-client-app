import {
    ActorRoleAssignmentFormDataInterface,
    ActorRoleActionPayload,
    CreateRolePayload,
    RoleFormDataInterface,
    UpdateRolePayload
} from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

import BaseValidator from "@/validators/base_validator";

class AccessControlValidator extends BaseValidator {
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

    public static validateActorType = (value?: string | null): ActionMethodRetrunInterface => {
        if (value === "member" || value === "app") {
            return { status: true, msg: "" };
        }

        return { status: false, msg: this.getContentMessage("invalid_actor_type") };
    };

    public static validateActorId = (value?: string | number | null): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return { status: false, msg: this.getContentMessage("invalid_actor_id") };
        }

        return { status: true, msg: "" };
    };

    public static validateActorRoleIds = (value?: Array<string | number> | null): ActionMethodRetrunInterface => {
        if (!Array.isArray(value)) {
            return { status: false, msg: this.getContentMessage("invalid_role_ids") };
        }

        if (value.length > 5) {
            return { status: false, msg: this.getContentMessage("actor_role_limit_exceeded") };
        }

        const has_invalid_role_id = value.some((role_id) => InputValidatorUtil.isEmpty(role_id));

        if (has_invalid_role_id) {
            return { status: false, msg: this.getContentMessage("invalid_role_ids") };
        }

        return { status: true, msg: "" };
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

    public static validateActorRoleAssignmentInput(
        form_data: ActorRoleAssignmentFormDataInterface
    ): ValidationResultInterface<ActorRoleActionPayload> {
        const { csrf_token, actor_type, actor_id, role_ids } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (!this.validateActorType(actor_type).status) {
            return { v_state: false, v_msg: "invalid_actor_type" };
        }

        if (!this.validateActorId(actor_id).status) {
            return { v_state: false, v_msg: "invalid_actor_id" };
        }

        if (!this.validateActorRoleIds(role_ids).status) {
            return { v_state: false, v_msg: "invalid_role_ids" };
        }

        return {
            v_state: true,
            v_msg: "valid_input",
            v_data: {
                csrf_token,
                actor_type,
                actor_id,
                role_ids
            }
        };
    }
}

export default AccessControlValidator;
