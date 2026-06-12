import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { RoleRecordInterface } from "@/types/api_service_type";

import { RoleFieldsType } from "@/types/form_fields_type";

import { CreateRolePayload, FieldValidator, RoleFormDataInterface } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewComponentsInterface,
    FormViewComputedDataInterface,
    FormViewPropsInterface,
    RoleFormState
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import AccessControlValidator from "@/validators/access_control_validator";

import AccessControlAPIService from "@/api_services/access_control_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

class AccessControlFormViewActionHandler extends BaseFormActionHandler<
    RoleFormDataInterface,
    RoleFieldsType,
    FormViewPropsInterface<RoleRecordInterface>,
    RoleFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseController<
            FormViewPropsInterface<RoleRecordInterface>,
            RoleFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "access_control_form_view_action_handler",
            AccessControlFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get form data value
    private static getFormDataValue(record?: RoleRecordInterface): RoleFormDataInterface {
        return {
            csrf_token: null,
            name: record?.name ?? "",
            symbol: record?.symbol ?? ""
        };
    }

    // Method to get validators
    protected getValidators(): Partial<Record<keyof RoleFormDataInterface, FieldValidator<RoleFormDataInterface>>> {
        const record = this.controller.props.record;

        return {
            name: AccessControlValidator.validateRoleName,
            ...(record?.is_member_group ? { symbol: AccessControlValidator.validateRoleSymbol } : {})
        };
    }

    // Method to get required fields
    protected getSubmitRequiredFields(): (keyof RoleFormDataInterface & string)[] {
        const record = this.controller.props.record;

        return record?.is_member_group ? ["name", "symbol"] : ["name"];
    }

    // Method to handle on form submitted
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as RoleFormDataInterface;
            const record_id = this.controller.props.record?.id;
            const validation_result = record_id
                ? AccessControlValidator.validateUpdateRoleInput(form_data)
                : AccessControlValidator.validateCreateRoleInput(form_data);
            const { v_state, v_msg, v_data } = validation_result;

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const result = record_id
                ? await AccessControlAPIService.updateRole(record_id, v_data)
                : await AccessControlAPIService.createRole(v_data as CreateRolePayload);

            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.id) {
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const record_payload: NewRecordCreated<RoleRecordInterface> = {
                record: data,
                re_fetch: true
            };

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit access control role form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default AccessControlFormViewActionHandler;
