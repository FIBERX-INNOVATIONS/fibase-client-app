import BaseController from "@ui/version_3/base_classes/base_controller";

import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { FieldValidator, RegisteredAppFromDataInterface } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { FILE_STORAGE_REFERENCE_TYPE } from "@/configs/constants";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    FormViewPropsInterface,
    FormViewStateDataInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    RegisteredAppFormState
} from "@/ui_types/form_view_type";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";
import RegisteredAppValidator from "@/validators/registered_app_validator";
import RegisteredAppAPIService from "@/api_services/registered_app_api_service";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";
import FileStorageAPIService from "@/api_services/file_storage_api_service";



class FormViewActionHandler extends BaseFormActionHandler<
    RegisteredAppFromDataInterface,
    FormViewPropsInterface,
    RegisteredAppFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
>{
    
    constructor(
        controller: BaseController<
            FormViewPropsInterface,
            RegisteredAppFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "registered_app_form_view_action_handler", {});

        this.form_data = this.getFormDataValue();

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;

    }

    protected getFormDataValue (): RegisteredAppFromDataInterface {
        const record = this.controller?.props?.record as RegisteredAppRecordInterface;

        return {
            csrf_token: null,
            name: record?.name ?? "",
            prefix: record?.prefix ?? "",
            description: record?.description ?? "",
            base_url: record?.base_url ?? "",
            logo_url: record?.logo_url ?? "",
            social_links: record?.social_links ?? {},
            urls: record?.urls?.join(",") ?? ""
        }
    }


    protected getValidators(): Partial<Record<keyof RegisteredAppFromDataInterface, FieldValidator<RegisteredAppFromDataInterface>>> {
        return {
            name: RegisteredAppValidator.validateNameField,

            prefix: RegisteredAppValidator.validatePrefixField,

            description: RegisteredAppValidator.validateDescriptionField,

            base_url: RegisteredAppValidator.validateBaseUrlField,

            logo_url: RegisteredAppValidator.validateLogoUrlField,

            social_links: RegisteredAppValidator.validateSocialLinks,

            urls: RegisteredAppValidator.validateUrls
        }
    }

    // method to handle on file upload
    public handleOnFileUpload = async (
        files: File[],
    ): Promise<boolean> => {
        try {
            const form_data = new FormData();
            
            form_data.append("file", files[0]);
            form_data.append("reference_type", FILE_STORAGE_REFERENCE_TYPE.REGISTERED_APP_LOGO);
            form_data.append('is_public', 'true');

            const result = await FileStorageAPIService.uploadFile(form_data);

            if(!result) {
                StatusAlertTriggerUtil.triggerAlert("error", "file_upload_failed", 10, undefined, false);
                return false;
            }

            const { status, msg, data } = result;
            
            if(status !== "success" || !data?.url) {
                StatusAlertTriggerUtil.triggerAlert("error", msg || "file_upload_failed", 10, undefined, false);
                return false;
            }

            StatusAlertTriggerUtil.triggerAlert("success", msg || "file_uploaded_successfully", 5, undefined, true);
            
            // set the logo url field in the form data
            this.form_data.logo_url = data.url;
            return true
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred", 10, undefined, false);
            return false
        }
    }

    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> =>  {
        this.hideErrorAlert();

        try {
            const form_data                     = (this.form_data) as RegisteredAppFromDataInterface;
            const record                        = (this.controller?.props?.record) as RegisteredAppRecordInterface
            const record_id                     = record.public_id;
            const { v_state, v_msg, v_data }    = RegisteredAppValidator.validateRegisteredAppInput(form_data);

            if(!v_state || !v_data) {
                this.showErrorAlert("error", v_msg, 4);
                return { status: false, msg: v_msg };
            }

            let result;

            if(record_id) {
                result = await RegisteredAppAPIService.updateRegisteredApp(record_id, v_data);
            }
            else {
                result = await RegisteredAppAPIService.createRegisteredApp(v_data);
            }

            if(!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if(status !== "success" || !data?.public_id) {
                this.showErrorAlert("error", msg);
                return { status: false, msg: v_msg };
            }

            const record_payload = { record: data } as NewRecordCreated<RegisteredAppRecordInterface>;

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg: "login_successful" };
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error });
            this.showErrorAlert("error", "error_occurred" );
            return { status: false, msg: "error_occurred" };
        } 
    }

}

export default FormViewActionHandler;