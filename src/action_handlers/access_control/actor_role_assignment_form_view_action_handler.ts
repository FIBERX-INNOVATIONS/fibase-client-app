import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ActorRoleInterface,
    MemberActorRoleInterface,
    MemberRecordInterface,
    RegisteredAppRecordInterface
} from "@/types/api_service_type";

import { ActorRoleAssignmentFieldsType } from "@/types/form_fields_type";

import { ActorRoleActionPayload, ActorRoleAssignmentFormDataInterface, FieldValidator } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    ActorRoleAssignmentFormState,
    ActorRoleAssignmentFormViewPropsInterface,
    FormViewComponentsInterface,
    FormViewComputedDataInterface,
    ActorRecord
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import AccessControlValidator from "@/validators/access_control_validator";

import AccessControlAPIService from "@/api_services/access_control_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

class ActorRoleAssignmentFormViewActionHandler extends BaseFormActionHandler<
    ActorRoleAssignmentFormDataInterface,
    ActorRoleAssignmentFieldsType,
    ActorRoleAssignmentFormViewPropsInterface<ActorRecord>,
    ActorRoleAssignmentFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly initial_role_ids: Array<string | number> = [];

    constructor(
        controller: BaseController<
            ActorRoleAssignmentFormViewPropsInterface<ActorRecord>,
            ActorRoleAssignmentFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "actor_role_assignment_form_view_action_handler",
            ActorRoleAssignmentFormViewActionHandler.getFormDataValue(controller.props)
        );

        this.validators = this.getValidators();

        this.initial_role_ids = ActorRoleAssignmentFormViewActionHandler?.getSelectedRoleIds?.(this.controller.props);

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get form data value
    private static getFormDataValue(
        props: ActorRoleAssignmentFormViewPropsInterface<ActorRecord>
    ): ActorRoleAssignmentFormDataInterface {
        return {
            csrf_token: null,
            actor_type: props?.actor_type ?? "member",
            actor_id: ActorRoleAssignmentFormViewActionHandler.getActorId(props),
            role_ids: ActorRoleAssignmentFormViewActionHandler.getSelectedRoleIds(props)
        };
    }

    // Method to get roles roles assigned
    public static getRecordRoleList(record?: ActorRecord): ActorRoleInterface[] {
        const flat_roles = record?.roles ?? [];
        const actor_roles =
            (record as MemberRecordInterface | undefined)?.actor_roles
                ?.filter((actor_role: MemberActorRoleInterface) => actor_role.is_active !== false)
                ?.map((actor_role: MemberActorRoleInterface) => actor_role.role) ?? [];
        const role_map = new Map<string, ActorRoleInterface>();

        [...flat_roles, ...actor_roles].forEach((role) => {
            const role_id = role?.id?.toString?.();

            if (role_id) {
                role_map.set(role_id, role);
            }
        });

        return Array.from(role_map.values());
    }

    // Method to get selected Role Ids
    public static getSelectedRoleIds(props: ActorRoleAssignmentFormViewPropsInterface<ActorRecord>): Array<string | number> {
        if (props.role_ids?.length) {
            return props.role_ids;
        }

        return ActorRoleAssignmentFormViewActionHandler.getRecordRoleList(props.record).map((role) => role.id);
    }

    // Method to get record role select option list
    public static getRoleOptions(props: ActorRoleAssignmentFormViewPropsInterface<ActorRecord>): SelectOptionInterface[] {
        const role_options = ActorRoleAssignmentFormViewActionHandler.getRecordRoleList(props.record).map((role) => {
            return {
                label_text: [role.symbol, role.display_name || role.name].filter(Boolean).join(" - "),
                value: role.id
            };
        });

        const known_role_ids = new Set(role_options.map((option) => option.value?.toString()));
        const fallback_options = ActorRoleAssignmentFormViewActionHandler.getSelectedRoleIds(props)
            .filter((role_id) => !known_role_ids.has(role_id.toString()))
            .map((role_id) => {
                return {
                    label_text: role_id.toString(),
                    value: role_id
                };
            });

        return [...role_options, ...fallback_options];
    }

    // Method to get actor Id
    public static getActorId(props: ActorRoleAssignmentFormViewPropsInterface<ActorRecord>): string | number {
        return props.actor_id || props.record?.public_id || "";
    }

    // Method to get actor option
    public getActorOption(): SelectOptionInterface[] {
        const record = this.props.record;
        const actor_id = ActorRoleAssignmentFormViewActionHandler.getActorId(this.props);

        if (!record || !actor_id) {
            return [];
        }

        if (this.props.actor_type === "app") {
            const app = record as RegisteredAppRecordInterface;

            return [
                {
                    label_text: [app.prefix?.toUpperCase?.(), app.name].filter(Boolean).join(" - "),
                    value: actor_id
                }
            ];
        }

        const member = record as MemberRecordInterface;
        const label =
            member.full_name ||
            [member.first_name, member.last_name].filter(Boolean).join(" ") ||
            member.username ||
            member.email ||
            actor_id.toString();

        return [{ label_text: label, value: actor_id }];
    }

    // Method to convert an array of strings or numbers to a set of strings
    private toStringSet(values: Array<string | number>): Set<string> {
        return new Set(values.map((value) => value.toString()));
    }

    // Method to get changed role ids
    private getChangedRoleIds(): {
        selected_role_ids: Array<string | number>;
        assigned_role_ids: Array<string | number>;
        unassigned_role_ids: Array<string | number>;
    } {
        const selected_role_ids = this.form_data.role_ids ?? [];
        const initial_set = this.toStringSet(this.initial_role_ids);
        const selected_set = this.toStringSet(selected_role_ids);

        const assigned_role_ids = selected_role_ids.filter((role_id) => {
            return !initial_set.has(role_id.toString());
        });

        const unassigned_role_ids = this.initial_role_ids.filter((role_id) => {
            return !selected_set.has(role_id.toString());
        });

        return { selected_role_ids, assigned_role_ids, unassigned_role_ids };
    }

    // method to get form ui validators
    protected getValidators(): Partial<
        Record<keyof ActorRoleAssignmentFormDataInterface, FieldValidator<ActorRoleAssignmentFormDataInterface>>
    > {
        return {
            actor_type: AccessControlValidator.validateActorType,
            actor_id: AccessControlValidator.validateActorId,
            role_ids: AccessControlValidator.validateActorRoleIds
        };
    }

    // Method to get required fields
    protected getSubmitRequiredFields(): (keyof ActorRoleAssignmentFormDataInterface & string)[] {
        return ["actor_type", "actor_id", "role_ids"];
    }

    // Method to handle form submitted btn click
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        void event;
        void config;

        this.hideErrorAlert();

        try {
            const validation_result = AccessControlValidator.validateActorRoleAssignmentInput(this.form_data);
            const { v_state, v_msg, v_data } = validation_result;

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const { selected_role_ids, assigned_role_ids, unassigned_role_ids } = this.getChangedRoleIds();

            if (!assigned_role_ids.length && !unassigned_role_ids.length) {
                this.showErrorAlert("warning", "no_actor_role_assignment_changes", 4);
                return { status: false, msg: "no_actor_role_assignment_changes" };
            }

            const unassign_result = unassigned_role_ids.length
                ? await AccessControlAPIService.unassignActorRoles({
                      csrf_token: v_data.csrf_token,
                      actor_type: v_data.actor_type,
                      actor_id: v_data.actor_id,
                      role_ids: unassigned_role_ids
                  } as ActorRoleActionPayload)
                : undefined;

            if (unassign_result && unassign_result.status !== "success") {
                const msg = unassign_result.msg ?? "error_occurred";
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const assign_result = assigned_role_ids.length
                ? await AccessControlAPIService.assignActorRoles({
                      csrf_token: v_data.csrf_token,
                      actor_type: v_data.actor_type,
                      actor_id: v_data.actor_id,
                      role_ids: assigned_role_ids
                  } as ActorRoleActionPayload)
                : undefined;

            if (assign_result && assign_result.status !== "success") {
                const msg = assign_result.msg ?? "error_occurred";
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const response = assign_result ?? unassign_result;
            const msg = response?.msg ?? "actor_roles_updated";

            await this.controller.props.on_success?.({
                actor_type: v_data.actor_type,
                actor_id: v_data.actor_id,
                role_ids: selected_role_ids,
                assigned_role_ids,
                unassigned_role_ids,
                response
            });

            StatusAlertTriggerUtil.triggerAlert("success", msg, 5, undefined, true);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit actor role assignment form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default ActorRoleAssignmentFormViewActionHandler;
