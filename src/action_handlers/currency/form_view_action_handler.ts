import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { CurrencyFieldsType } from "@/types/form_fields_type";

import { FILE_STORAGE_REFERENCE_TYPE } from "@/configs";

import { FieldValidator, CurrencyFormDataInterface } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    CurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import CurrencyValidator from "@/validators/currency_validator";

import CurrencyAPIService from "@/api_services/currency_api_service";

import FileStorageAPIService from "@/api_services/file_storage_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

class CurrencyFormViewActionHandler extends BaseFormActionHandler<
    CurrencyFormDataInterface,
    CurrencyFieldsType,
    FormViewPropsInterface<CurrencyRecordInterface>,
    CurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseController<
            FormViewPropsInterface<CurrencyRecordInterface>,
            CurrencyFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "currency_form_view_action_handler",
            CurrencyFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record
    private static getFormDataValue(record?: CurrencyRecordInterface): CurrencyFormDataInterface {
        return {
            csrf_token: null,
            code: record?.code ?? "",
            name: record?.name ?? "",
            symbol: record?.symbol ?? "",
            network_symbol: record?.network_symbol ?? null,
            numeric_code: record?.numeric_code ?? "",
            precision: record?.precision ?? 0,
            minor_unit: record?.minor_unit ?? null,
            country_code: record?.country_code ?? "",
            is_fiat: record?.is_fiat ?? false,
            sort_order: record?.sort_order ?? 0,
            logo_url: record?.logo_url ?? ""
        };
    }

    // Method to get field validators
    protected getValidators(): Partial<Record<keyof CurrencyFormDataInterface, FieldValidator<CurrencyFormDataInterface>>> {
        return {
            code: CurrencyValidator.validateCurrencyCode,

            name: CurrencyValidator.validateCurrencyName,

            symbol: CurrencyValidator.validateCurrencySymbol,

            network_symbol: CurrencyValidator.validateNetworkSymbol,

            numeric_code: CurrencyValidator.validateNumericCode,

            precision: CurrencyValidator.validatePrecision,

            minor_unit: CurrencyValidator.validateMinorUnit,

            country_code: CurrencyValidator.validateCountryCode,

            logo_url: CurrencyValidator.validateLogoUrl,

            sort_order: CurrencyValidator.validateSortOrder
        };
    }

    // Method to get required fields for submit
    protected getSubmitRequiredFields(): (keyof CurrencyFormDataInterface & string)[] {
        return ["code", "name", "symbol", "precision", "sort_order", "logo_url"];
    }

    // Method to handle on file upload
    public handleOnFileUpload = async (files: File[]): Promise<boolean> => {
        try {
            const form_data = new FormData();

            form_data.append("file", files[0]);
            form_data.append("reference_type", FILE_STORAGE_REFERENCE_TYPE.CURRENCY_LOGO);
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

    // Method to handle form submit button click
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        try {
            const form_data = this.form_data as CurrencyFormDataInterface;
            const record = this.controller?.props?.record as CurrencyRecordInterface;
            const record_id = record.code;
            const { v_state, v_msg, v_data } = CurrencyValidator.validateCurrencyInput(form_data);

            if (!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            let result;

            if (record_id) {
                result = await CurrencyAPIService.updateCurrency(record_id, v_data);
            } else {
                result = await CurrencyAPIService.createCurrency(v_data);
            }

            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.code) {
                this.showErrorAlert("error", msg);
                return { status: false, msg: v_msg };
            }

            const record_payload = {
                record: data,
                re_fetch: !!record_id
            } as NewRecordCreated<CurrencyRecordInterface>;

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg: "login_successful" };
        } catch (error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default CurrencyFormViewActionHandler;
