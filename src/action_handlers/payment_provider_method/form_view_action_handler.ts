import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { PaymentConfigDirectionType, PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { PaymentProviderMethodFieldsType } from "@/types/form_fields_type";

import {
    CreatePaymentProviderMethodPayloadInterface,
    FieldValidator,
    PaymentProviderMethodFormDataInterface,
    UpdatePaymentProviderMethodPayloadInterface
} from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    PaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentProviderMethodValidator from "@/validators/payment_provider_method_validator";

import PaymentProviderMethodAPIService from "@/api_services/payment_provider_method_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

class PaymentProviderMethodFormViewActionHandler extends BaseFormActionHandler<
    PaymentProviderMethodFormDataInterface,
    PaymentProviderMethodFieldsType,
    FormViewPropsInterface<PaymentProviderMethodRecordInterface>,
    PaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    // Method to initialize form action handler.
    constructor(
        controller: BaseController<
            FormViewPropsInterface<PaymentProviderMethodRecordInterface>,
            PaymentProviderMethodFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_provider_method_form_view_action_handler",
            PaymentProviderMethodFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record.
    private static getFormDataValue(record?: PaymentProviderMethodRecordInterface): PaymentProviderMethodFormDataInterface {
        return {
            csrf_token: null,
            provider_id: record?.provider?.id ?? "",
            payment_method_id: record?.payment_method?.id ?? "",
            direction: record?.direction ?? "deposit",
            provider_method_code: record?.provider_method_code ?? "",
            min_amount: record?.min_amount ?? null,
            max_amount: record?.max_amount ?? null
        };
    }

    // Method to get field validators.
    protected getValidators(): Partial<
        Record<keyof PaymentProviderMethodFormDataInterface, FieldValidator<PaymentProviderMethodFormDataInterface>>
    > {
        return {
            provider_id: PaymentProviderMethodValidator.validateProviderId,
            payment_method_id: PaymentProviderMethodValidator.validatePaymentMethodId,
            direction: PaymentProviderMethodValidator.validateDirection,
            provider_method_code: PaymentProviderMethodValidator.validateProviderMethodCode,
            min_amount: (value) => PaymentProviderMethodValidator.validateAmount(this.normalizeOptionalNumber(value)),
            max_amount: (value) => PaymentProviderMethodValidator.validateAmount(this.normalizeOptionalNumber(value))
        };
    }

    // Method to get required fields for submit.
    protected getSubmitRequiredFields(): (keyof PaymentProviderMethodFormDataInterface & string)[] {
        return ["provider_id", "payment_method_id", "direction"];
    }

    // Method to normalize optional numbers from form input.
    private normalizeOptionalNumber(value?: number | string | null): number | null {
        if (value === null || value === undefined || value === "") {
            return null;
        }

        const numeric_value = Number(value);

        return Number.isNaN(numeric_value) ? null : numeric_value;
    }

    // Method to build create/update API payload from form data.
    private buildAPIPayload(
        form_data: PaymentProviderMethodFormDataInterface
    ): CreatePaymentProviderMethodPayloadInterface | UpdatePaymentProviderMethodPayloadInterface {
        return {
            csrf_token: form_data.csrf_token ?? "",
            provider_id: form_data.provider_id,
            payment_method_id: form_data.payment_method_id,
            direction: form_data.direction as PaymentConfigDirectionType,
            provider_method_code: form_data.provider_method_code ?? null,
            min_amount: this.normalizeOptionalNumber(form_data.min_amount),
            max_amount: this.normalizeOptionalNumber(form_data.max_amount)
        };
    }

    // Method to handle form submit button click.
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as PaymentProviderMethodFormDataInterface;
            const record_id = this.controller.props.record?.id;
            const payload = this.buildAPIPayload(form_data);
            const validation_result = record_id
                ? PaymentProviderMethodValidator.validateUpdatePaymentProviderMethodInput(payload)
                : PaymentProviderMethodValidator.validateCreatePaymentProviderMethodInput(
                      payload as CreatePaymentProviderMethodPayloadInterface
                  );
            const { v_state, v_msg, v_data } = validation_result;

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const result = record_id
                ? await PaymentProviderMethodAPIService.updatePaymentProviderMethod(record_id, v_data)
                : await PaymentProviderMethodAPIService.createPaymentProviderMethod(
                      v_data as CreatePaymentProviderMethodPayloadInterface
                  );

            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.id) {
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const record_payload: NewRecordCreated<PaymentProviderMethodRecordInterface> = {
                record: data,
                re_fetch: true
            };

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit payment provider method form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default PaymentProviderMethodFormViewActionHandler;
