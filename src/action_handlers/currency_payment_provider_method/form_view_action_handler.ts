import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { CurrencyPaymentProviderMethodFieldsType } from "@/types/form_fields_type";

import {
    CreateCurrencyPaymentProviderMethodPayloadInterface,
    FieldValidator,
    CurrencyPaymentProviderMethodFormDataInterface,
    UpdateCurrencyPaymentProviderMethodPayloadInterface
} from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    CurrencyPaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import CurrencyPaymentProviderMethodValidator from "@/validators/currency_payment_provider_method_validator";

import CurrencyPaymentProviderMethodAPIService from "@/api_services/currency_payment_provider_method_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

class CurrencyPaymentProviderMethodFormViewActionHandler extends BaseFormActionHandler<
    CurrencyPaymentProviderMethodFormDataInterface,
    CurrencyPaymentProviderMethodFieldsType,
    FormViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>,
    CurrencyPaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    // Method to initialize form action handler.
    constructor(
        controller: BaseController<
            FormViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>,
            CurrencyPaymentProviderMethodFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "currency_payment_provider_method_form_view_action_handler",
            CurrencyPaymentProviderMethodFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record.
    private static getFormDataValue(
        record?: CurrencyPaymentProviderMethodRecordInterface
    ): CurrencyPaymentProviderMethodFormDataInterface {
        return {
            csrf_token: null,
            currency_id: record?.currency?.code ?? "",
            provider_method_id: record?.provider_method?.id ?? 0,
            min_amount: record?.min_amount ?? null,
            max_amount: record?.max_amount ?? null
        };
    }

    // Method to get field validators.
    protected getValidators(): Partial<
        Record<
            keyof CurrencyPaymentProviderMethodFormDataInterface,
            FieldValidator<CurrencyPaymentProviderMethodFormDataInterface>
        >
    > {
        return {
            currency_id: CurrencyPaymentProviderMethodValidator.validateCurrencyId,
            provider_method_id: CurrencyPaymentProviderMethodValidator.validateProviderMethodId,
            min_amount: (value) => CurrencyPaymentProviderMethodValidator.validateAmount(this.normalizeOptionalNumber(value)),
            max_amount: (value) => CurrencyPaymentProviderMethodValidator.validateAmount(this.normalizeOptionalNumber(value))
        };
    }

    // Method to get required fields for submit.
    protected getSubmitRequiredFields(): (keyof CurrencyPaymentProviderMethodFormDataInterface & string)[] {
        return ["currency_id", "provider_method_id"];
    }

    // Method to build create/update API payload from form data.
    private buildAPIPayload(
        form_data: CurrencyPaymentProviderMethodFormDataInterface
    ): CreateCurrencyPaymentProviderMethodPayloadInterface | UpdateCurrencyPaymentProviderMethodPayloadInterface {
        return {
            csrf_token: form_data.csrf_token ?? "",
            currency_id: form_data.currency_id,
            provider_method_id: form_data.provider_method_id,
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
            const form_data = this.form_data as CurrencyPaymentProviderMethodFormDataInterface;
            const record_id = this.controller.props.record?.id;
            const payload = this.buildAPIPayload(form_data);
            const validation_result = record_id
                ? CurrencyPaymentProviderMethodValidator.validateUpdateCurrencyPaymentProviderMethodInput(payload)
                : CurrencyPaymentProviderMethodValidator.validateCreateCurrencyPaymentProviderMethodInput(
                      payload as CreateCurrencyPaymentProviderMethodPayloadInterface
                  );
            const { v_state, v_msg, v_data } = validation_result;

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const result = record_id
                ? await CurrencyPaymentProviderMethodAPIService.updateCurrencyPaymentProviderMethod(record_id, v_data)
                : await CurrencyPaymentProviderMethodAPIService.createCurrencyPaymentProviderMethod(
                      v_data as CreateCurrencyPaymentProviderMethodPayloadInterface
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

            const record_payload: NewRecordCreated<CurrencyPaymentProviderMethodRecordInterface> = {
                record: data,
                re_fetch: true
            };

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit currency payment provider method form", {
                error
            });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default CurrencyPaymentProviderMethodFormViewActionHandler;
