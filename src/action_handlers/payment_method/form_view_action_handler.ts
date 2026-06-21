import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { PaymentMethodMetadataInterface, PaymentMethodRecordInterface } from "@/types/api_service_type";

import { PaymentMethodFieldsType } from "@/types/form_fields_type";

import {
    CreatePaymentMethodPayloadInterface,
    FieldValidator,
    PaymentMethodFormDataInterface,
    UpdatePaymentMethodPayloadInterface
} from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    PaymentMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentMethodValidator from "@/validators/payment_method_validator";

import PaymentMethodAPIService from "@/api_services/payment_method_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import { FILE_STORAGE_REFERENCE_TYPE } from "@/configs";
import FileStorageAPIService from "@/api_services/file_storage_api_service";

class PaymentMethodFormViewActionHandler extends BaseFormActionHandler<
    PaymentMethodFormDataInterface,
    PaymentMethodFieldsType,
    FormViewPropsInterface<PaymentMethodRecordInterface>,
    PaymentMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseController<
            FormViewPropsInterface<PaymentMethodRecordInterface>,
            PaymentMethodFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_method_form_view_action_handler",
            PaymentMethodFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record.
    private static getFormDataValue(record?: PaymentMethodRecordInterface): PaymentMethodFormDataInterface {
        const metadata = record?.metadata;

        return {
            csrf_token: null,
            code: record?.code ?? "",
            name: record?.name ?? "",
            description: record?.description ?? "",
            icon_url: record?.icon_url ?? "",
            sort_order: record?.sort_order ?? null,
            display_name: metadata?.display_name ?? "",
            display_description: metadata?.display_description ?? "",
            display_group: metadata?.display_group ?? "",
            processing_time_text: metadata?.processing_time_text ?? "",
            fee_label: metadata?.fee_label ?? "",
            supported_country_codes: metadata?.supported_country_codes ?? [],
            supported_currency_codes: metadata?.supported_currency_codes ?? [],
            requires_redirect: metadata?.requires_redirect ?? false,
            supports_deposit: metadata?.supports_deposit ?? false,
            supports_withdrawal: metadata?.supports_withdrawal ?? false,
            supports_refund: metadata?.supports_refund ?? false,
            min_amount: metadata?.min_amount ?? null,
            max_amount: metadata?.max_amount ?? null
        };
    }

    // Method to get field validators.
    protected getValidators(): Partial<
        Record<keyof PaymentMethodFormDataInterface, FieldValidator<PaymentMethodFormDataInterface>>
    > {
        return {
            code: PaymentMethodValidator.validateCode,
            name: PaymentMethodValidator.validateName,
            description: PaymentMethodValidator.validateDescription,
            icon_url: PaymentMethodValidator.validateIconUrl,
            sort_order: PaymentMethodValidator.validateSortOrder
        };
    }

    // Method to get required fields for submit.
    protected getSubmitRequiredFields(): (keyof PaymentMethodFormDataInterface & string)[] {
        return [
            "code",
            "name",
            "description",
            "sort_order",
            "display_name",
            "display_description",
            "display_group",
            "processing_time_text",
            "fee_label",
            "display_group"
        ];
    }

    // Method to normalize selected codes into a clean string array.
    private normalizeCodeList(value?: string[] | null): string[] {
        return (value ?? []).map((item) => item.trim()).filter(Boolean);
    }

    // Method to build metadata payload from flat form fields.
    private buildMetadataPayload(form_data: PaymentMethodFormDataInterface): PaymentMethodMetadataInterface {
        return {
            display_name: form_data.display_name?.trim() || null,
            display_description: form_data.display_description?.trim() || null,
            display_group: form_data.display_group?.trim() || null,
            processing_time_text: form_data.processing_time_text?.trim() || null,
            fee_label: form_data.fee_label?.trim() || null,
            supported_country_codes: this.normalizeCodeList(form_data.supported_country_codes).map((code) =>
                code.toUpperCase()
            ),
            supported_currency_codes: this.normalizeCodeList(form_data.supported_currency_codes).map((code) =>
                code.toUpperCase()
            ),
            requires_redirect: !!form_data.requires_redirect,
            supports_deposit: !!form_data.supports_deposit,
            supports_withdrawal: !!form_data.supports_withdrawal,
            supports_refund: !!form_data.supports_refund,
            min_amount: this.normalizeOptionalNumber(form_data.min_amount),
            max_amount: this.normalizeOptionalNumber(form_data.max_amount)
        };
    }

    // Method to build create/update API payload from form data.
    private buildAPIPayload(
        form_data: PaymentMethodFormDataInterface
    ): CreatePaymentMethodPayloadInterface | UpdatePaymentMethodPayloadInterface {
        return {
            csrf_token: form_data.csrf_token ?? "",
            code: form_data.code,
            name: form_data.name,
            description: form_data.description ?? null,
            icon_url: form_data.icon_url ?? null,
            sort_order: this.normalizeOptionalNumber(form_data.sort_order),
            metadata: this.buildMetadataPayload(form_data)
        };
    }

    // Method to handle on file upload
    public handleOnFileUpload = async (files: File[]): Promise<boolean> => {
        try {
            const form_data = new FormData();

            form_data.append("file", files[0]);
            form_data.append("reference_type", FILE_STORAGE_REFERENCE_TYPE.PAYMENT_METHOD_ICON);
            form_data.append("is_public", "true");

            const result = await FileStorageAPIService.uploadFile(form_data);

            if (!result) {
                StatusAlertTriggerUtil.triggerAlert("error", "file_upload_failed", 10, undefined, false);
                return false;
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.url) {
                StatusAlertTriggerUtil.triggerAlert("error", msg || "file_upload_failed", 10, undefined, false);
                return false;
            }

            StatusAlertTriggerUtil.triggerAlert("success", msg || "file_uploaded_successfully", 5, undefined, true);

            // set the icon url field in the form data
            this.form_data.icon_url = data.url;
            this.syncSubmitButtonState();
            return true;
        } catch (error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred", 10, undefined, false);
            return false;
        }
    };

    // Method to handle form submit button click.
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as PaymentMethodFormDataInterface;
            const record = this.controller.props.record;
            const record_id = record?.code;
            const payload = this.buildAPIPayload(form_data);
            const validation_result = record_id
                ? PaymentMethodValidator.validateUpdatePaymentMethodInput(payload)
                : PaymentMethodValidator.validateCreatePaymentMethodInput(payload as CreatePaymentMethodPayloadInterface);
            const { v_state, v_msg, v_data } = validation_result;

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const result = record_id
                ? await PaymentMethodAPIService.updatePaymentMethod(record_id, v_data)
                : await PaymentMethodAPIService.createPaymentMethod(v_data as CreatePaymentMethodPayloadInterface);

            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.code) {
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const record_payload: NewRecordCreated<PaymentMethodRecordInterface> = {
                record: data,
                re_fetch: true
            };

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit payment method form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default PaymentMethodFormViewActionHandler;
