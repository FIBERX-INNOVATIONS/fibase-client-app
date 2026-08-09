import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import { PaymentProviderFieldsType } from "@/types/form_fields_type";

import {
    CreatePaymentProviderPayloadInterface,
    FieldValidator,
    PaymentProviderFormDataInterface,
    UpdatePaymentProviderPayloadInterface
} from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    PaymentProviderFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentProviderValidator from "@/validators/payment_provider_validator";

import PaymentProviderAPIService from "@/api_services/payment_provider_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import { FILE_STORAGE_REFERENCE_TYPE } from "@/configs/file_storage_reference_type_config";
import FileStorageAPIService from "@/api_services/file_storage_api_service";

class PaymentProviderFormViewActionHandler extends BaseFormActionHandler<
    PaymentProviderFormDataInterface,
    PaymentProviderFieldsType,
    FormViewPropsInterface<PaymentProviderRecordInterface>,
    PaymentProviderFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseController<
            FormViewPropsInterface<PaymentProviderRecordInterface>,
            PaymentProviderFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_provider_form_view_action_handler",
            PaymentProviderFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record.
    private static getFormDataValue(record?: PaymentProviderRecordInterface): PaymentProviderFormDataInterface {
        return {
            csrf_token: null,
            code: record?.code ?? "",
            name: record?.name ?? "",
            description: record?.description ?? "",
            provider_type: record?.provider_type ?? "payment_gateway",
            logo_url: record?.logo_url ?? "",
            website_url: record?.website_url ?? ""
        };
    }

    // Method to get field validators.
    protected getValidators(): Partial<
        Record<keyof PaymentProviderFormDataInterface, FieldValidator<PaymentProviderFormDataInterface>>
    > {
        return {
            code: PaymentProviderValidator.validateCode,
            name: PaymentProviderValidator.validateName,
            description: PaymentProviderValidator.validateDescription,
            provider_type: PaymentProviderValidator.validateProviderType,
            logo_url: PaymentProviderValidator.validateLogoUrl,
            website_url: PaymentProviderValidator.validateWebsiteUrl
        };
    }

    // Method to get required fields for submit.
    protected getSubmitRequiredFields(): (keyof PaymentProviderFormDataInterface & string)[] {
        return ["code", "name"];
    }

    // Method to build create/update API payload from form data.
    private buildAPIPayload(
        form_data: PaymentProviderFormDataInterface
    ): CreatePaymentProviderPayloadInterface | UpdatePaymentProviderPayloadInterface {
        return {
            csrf_token: form_data.csrf_token ?? "",
            code: form_data.code,
            name: form_data.name,
            description: form_data.description ?? null,
            provider_type: form_data.provider_type,
            logo_url: form_data.logo_url ?? null,
            website_url: form_data.website_url ?? null
        };
    }

    // Method to handle on file upload
    public handleOnFileUpload = async (files: File[]): Promise<boolean> => {
        try {
            const form_data = new FormData();

            form_data.append("file", files[0]);
            form_data.append("reference_type", FILE_STORAGE_REFERENCE_TYPE.PAYMENT_PROVIDER_LOGO);
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

            // set the logo url field in the form data
            this.form_data.logo_url = data.url;
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
            const form_data = this.form_data as PaymentProviderFormDataInterface;
            const record_id = this.controller.props.record?.id;
            const payload = this.buildAPIPayload(form_data);
            const validation_result = record_id
                ? PaymentProviderValidator.validateUpdatePaymentProviderInput(payload)
                : PaymentProviderValidator.validateCreatePaymentProviderInput(payload as CreatePaymentProviderPayloadInterface);
            const { v_state, v_msg, v_data } = validation_result;

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            const result = record_id
                ? await PaymentProviderAPIService.updatePaymentProvider(record_id, v_data)
                : await PaymentProviderAPIService.createPaymentProvider(v_data as CreatePaymentProviderPayloadInterface);

            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.id) {
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const record_payload: NewRecordCreated<PaymentProviderRecordInterface> = {
                record: data,
                re_fetch: true
            };

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit payment provider form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default PaymentProviderFormViewActionHandler;
