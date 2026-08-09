import type { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import type { ServiceFeeConfigurationFieldsType } from "@/types/form_fields_type";

import type { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import type { ActionMethodRetrunInterface, InputUIPropsInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import type {
    FieldValidator,
    ServiceFeeConfigurationFormDataInterface,
    ServiceFeeConfigurationRangeFormDataInterface
} from "@/types/form_data_type";

import type {
    CreateServiceFeeConfigurationPayloadInterface,
    ServiceFeeConfigurationRecordInterface,
    UpdateServiceFeeConfigurationPayloadInterface
} from "@/types/service_fee_configuration_type";

import type {
    FormViewComponentsInterface,
    FormViewComputedDataInterface,
    FormViewPropsInterface,
    ServiceFeeConfigurationFormState
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import ServiceFeeConfigurationValidator from "@/validators/service_fee_configuration_validator";

import ServiceFeeConfigurationAPIService from "@/api_services/service_fee_configuration_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

import type ServiceFeeConfigurationFormViewController from "@/controllers/service_fee_configuration/form_view_controller";

class ServiceFeeConfigurationFormViewActionHandler extends BaseFormActionHandler<
    ServiceFeeConfigurationFormDataInterface,
    ServiceFeeConfigurationFieldsType,
    FormViewPropsInterface<ServiceFeeConfigurationRecordInterface>,
    ServiceFeeConfigurationFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    // Method to initialize the service fee configuration form action handler.
    constructor(
        controller: BaseController<
            FormViewPropsInterface<ServiceFeeConfigurationRecordInterface>,
            ServiceFeeConfigurationFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "service_fee_configuration_form_view_action_handler",
            ServiceFeeConfigurationFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();
        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get the strongly typed service fee form controller.
    private getFormController(): ServiceFeeConfigurationFormViewController {
        return this.controller as ServiceFeeConfigurationFormViewController;
    }

    // Method to build default form data from an optional existing record.
    private static getFormDataValue(record?: ServiceFeeConfigurationRecordInterface): ServiceFeeConfigurationFormDataInterface {
        const ranges = record?.ranges?.map((range) => {
            return {
                min_value: range.min_value,
                max_value: range.max_value,
                fee_type: range.fee_type,
                amount: range.amount
            };
        });

        return {
            csrf_token: null,
            currency_id: record?.currency?.code ?? "",
            registered_app_id: record?.registered_app?.public_id ?? null,
            provider_id: record?.provider?.id ?? null,
            identity_id: record?.identity?.public_id ?? null,
            transaction_type: record?.transaction_type ?? "deposit",
            fee_type: record?.fee_type ?? "flat",
            amount: record?.amount ?? null,
            ranges: ranges?.length ? ranges : [this.getEmptyRange()],
            effective_from: record?.effective_from?.slice(0, 10) ?? null,
            effective_until: record?.effective_until?.slice(0, 10) ?? null
        };
    }

    // Method to get one empty range form row.
    private static getEmptyRange(): ServiceFeeConfigurationRangeFormDataInterface {
        return {
            min_value: null,
            max_value: null,
            fee_type: "flat",
            amount: null
        };
    }

    // Method to get field-level service fee validators.
    protected getValidators(): Partial<
        Record<keyof ServiceFeeConfigurationFormDataInterface, FieldValidator<ServiceFeeConfigurationFormDataInterface>>
    > {
        return {
            currency_id: ServiceFeeConfigurationValidator.validateRequiredId,
            transaction_type: ServiceFeeConfigurationValidator.validateTransactionType,
            fee_type: ServiceFeeConfigurationValidator.validateFeeType,
            amount: (value, form_data) => {
                return ServiceFeeConfigurationValidator.validateAmount(value, form_data.fee_type !== "range");
            }
        };
    }

    // Method to get required fields for service fee form submission.
    protected getSubmitRequiredFields(): (keyof ServiceFeeConfigurationFormDataInterface & string)[] {
        return ["currency_id", "transaction_type", "fee_type"];
    }

    // Method to rebuild the visible range row props from current form data.
    private refreshRangeRows(): void {
        this.setState("range_rows", this.getFormController().buildRangeRows());
    }

    // Method to handle a fee type change and switch the visible fee editor.
    public handleFeeTypeChanged = async (
        event?: Event,
        input_value?: InputValue,
        input_config?: { props: InputUIPropsInterface }
    ): Promise<ActionMethodRetrunInterface> => {
        const result = await this.handleOnInputChanged(event, input_value, input_config);

        if (result.status && ["flat", "percentage", "range"].includes(String(input_value))) {
            this.setState("fee_type", input_value as ServiceFeeConfigurationFormDataInterface["fee_type"]);
        }

        return result;
    };

    // Method to add a new repeatable service fee range row.
    public addRange = async (): Promise<ButtonActionMethodReturnInterface> => {
        this.form_data.ranges.push(ServiceFeeConfigurationFormViewActionHandler.getEmptyRange());
        this.refreshRangeRows();

        return { status: true, msg: "" };
    };

    // Method to remove one repeatable service fee range row.
    public removeRange(index: number): void {
        if (this.form_data.ranges.length <= 1) {
            return;
        }

        this.form_data.ranges.splice(index, 1);
        this.refreshRangeRows();
    }

    // Method to record a range row input change in form data.
    public handleRangeInputChanged = async (
        event?: Event,
        input_value?: InputValue,
        input_config?: { props: InputUIPropsInterface }
    ): Promise<ActionMethodRetrunInterface> => {
        const input_id = input_config?.props.id ?? "";
        const match = input_id.match(/^range_(\d+)_(min_value|max_value|fee_type|amount)$/);

        if (!match) {
            return { status: false, msg: this.getContentMessage("invalid_input_config") };
        }

        const range_index = Number(match[1]);
        const field_name = match[2] as keyof ServiceFeeConfigurationRangeFormDataInterface;
        const target = event?.target as HTMLInputElement | null;
        const value = input_value ?? target?.value ?? null;
        const range = this.form_data.ranges[range_index];

        if (!range) {
            return { status: false, msg: this.getContentMessage("invalid_service_fee_range") };
        }

        range[field_name] = value as never;

        return { status: true, msg: "" };
    };

    // Method to build a create or update service fee API payload.
    private buildAPIPayload(): CreateServiceFeeConfigurationPayloadInterface {
        return {
            csrf_token: this.form_data.csrf_token ?? "",
            currency_id: this.form_data.currency_id,
            registered_app_id: this.form_data.registered_app_id || null,
            provider_id: this.form_data.provider_id || null,
            identity_id: this.form_data.identity_id || null,
            transaction_type: this.form_data.transaction_type,
            fee_type: this.form_data.fee_type,
            amount: this.form_data.fee_type === "range" ? null : this.form_data.amount,
            ranges:
                this.form_data.fee_type === "range"
                    ? this.form_data.ranges.map((range) => {
                          return {
                              min_value: range.min_value ?? "",
                              max_value: range.max_value,
                              fee_type: range.fee_type,
                              amount: range.amount ?? ""
                          };
                      })
                    : [],
            effective_from: this.form_data.effective_from || null,
            effective_until: this.form_data.effective_until || null
        };
    }

    // Method to submit the service fee configuration create or update request.
    public handleOnFormSubmitBtnClick = async (): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const record_id = this.controller.props.record?.public_id;
            const payload = this.buildAPIPayload();
            const validation_result = record_id
                ? ServiceFeeConfigurationValidator.validateUpdateInput(payload)
                : ServiceFeeConfigurationValidator.validateCreateInput(payload);

            if (!validation_result.v_state || !validation_result.v_data) {
                this.showErrorAlert("error", validation_result.v_msg, 4);
                return { status: false, msg: validation_result.v_msg };
            }

            const result = record_id
                ? await ServiceFeeConfigurationAPIService.updateServiceFeeConfiguration(
                      record_id,
                      validation_result.v_data as UpdateServiceFeeConfigurationPayloadInterface
                  )
                : await ServiceFeeConfigurationAPIService.createServiceFeeConfiguration(
                      validation_result.v_data as CreateServiceFeeConfigurationPayloadInterface
                  );

            if (result.status === "logout") {
                this.controller.router.push("/logout");
                return { status: false, msg: "session_expired" };
            }

            if (result.status !== "success" || !result.data?.public_id) {
                this.showErrorAlert("error", result.msg ?? "error_occurred");
                return { status: false, msg: result.msg ?? "error_occurred" };
            }

            const record_payload: NewRecordCreated<ServiceFeeConfigurationRecordInterface> = {
                record: result.data,
                re_fetch: true
            };

            StatusAlertTriggerUtil.triggerAlert(result.status, result.msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg: result.msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit service fee configuration form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default ServiceFeeConfigurationFormViewActionHandler;
