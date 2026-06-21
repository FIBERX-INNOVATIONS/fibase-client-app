import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { MemberRecordInterface } from "@/types/api_service_type";

import { MemberProfileFieldsType } from "@/types/form_fields_type";

import { CreateMemberPayload, FieldValidator } from "@/types/form_data_type";

import { FILE_STORAGE_REFERENCE_TYPE } from "@/configs";

import { ButtonActionMethodReturnInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    FormViewPropsInterface,
    MemberProfileFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import MemberProfileValidator from "@/validators/member_profile_validator";

import FileStorageAPIService from "@/api_services/file_storage_api_service";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

class MemberProfileFormViewActionHandler extends BaseFormActionHandler<
    CreateMemberPayload,
    MemberProfileFieldsType,
    FormViewPropsInterface<MemberRecordInterface>,
    MemberProfileFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseController<
            FormViewPropsInterface<MemberRecordInterface>,
            MemberProfileFormState,
            FormViewComputedDataInterface,
            FormViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "member_profile_form_view_action_handler",
            MemberProfileFormViewActionHandler.getFormDataValue(controller.props.record)
        );

        this.validators = this.getValidators();

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get default form data value based on record
    private static getFormDataValue(record?: MemberRecordInterface): CreateMemberPayload {
        const dob = record?.dob?.includes("T") ? record.dob.split("T")[0] : (record?.dob ?? "");

        return {
            csrf_token: null,
            first_name: record?.first_name ?? "",
            last_name: record?.last_name ?? "",
            email: record?.email ?? "",
            phone: record?.phone ?? "",
            dob: InputTransformerUtil.formatDob(dob) ?? "",
            gender: record?.gender ?? "",
            profile_photo_link: record?.profile_photo_link ?? ""
        };
    }

    // Method to get field validators
    protected getValidators(): Partial<Record<keyof CreateMemberPayload, FieldValidator<CreateMemberPayload>>> {
        return {
            first_name: MemberProfileValidator.validateFirstNameField,
            last_name: MemberProfileValidator.validateLastNameField,
            email: MemberProfileValidator.validateEmailField,
            phone: MemberProfileValidator.validatePhoneField,
            dob: MemberProfileValidator.validateDobField,
            gender: MemberProfileValidator.validateGenderField,
            profile_photo_link: MemberProfileValidator.validateProfilePhotoLinkField
        };
    }

    // Method to get required fields for submit
    protected getSubmitRequiredFields(): (keyof CreateMemberPayload & string)[] {
        return this.controller.props.record?.public_id
            ? ["first_name", "last_name", "gender", "dob"]
            : ["first_name", "last_name", "email", "gender", "dob"];
    }

    // Method to handle on file upload
    public handleOnFileUpload = async (files: File[]): Promise<boolean> => {
        try {
            const form_data = new FormData();

            form_data.append("file", files[0]);
            form_data.append("reference_type", FILE_STORAGE_REFERENCE_TYPE.MEMBER_PROFILE_IMAGE);
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

            this.form_data.profile_photo_link = data.url;
            this.syncSubmitButtonState();
            return true;
        } catch (error: unknown) {
            this.logger.error("Failed to upload member profile image", { error });
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
            const form_data = this.form_data as CreateMemberPayload;
            const record = this.controller.props.record;
            const record_id = record?.public_id;
            let result;

            if (record_id) {
                const validation = MemberProfileValidator.validateUpdateMemberInput(form_data);

                if (!validation.v_state || !validation.v_data) {
                    this.showErrorAlert("error", validation.v_msg, 4);
                    return { status: false, msg: validation.v_msg };
                }

                result = await MemberProfileAPIService.updateMember(record_id, validation.v_data);
            } else {
                const validation = MemberProfileValidator.validateCreateMemberInput(form_data);

                if (!validation.v_state || !validation.v_data) {
                    this.showErrorAlert("error", validation.v_msg, 4);
                    return { status: false, msg: validation.v_msg };
                }

                result = await MemberProfileAPIService.createMember(validation.v_data);
            }
            if (!result) {
                this.showErrorAlert("error", "error_occurred");
                return { status: false, msg: "error_occurred" };
            }

            const { status, msg, data } = result;

            if (status !== "success" || !data?.public_id) {
                this.showErrorAlert("error", msg);
                return { status: false, msg };
            }

            const record_payload = {
                record: data,
                re_fetch: true
            } as NewRecordCreated<MemberRecordInterface>;

            StatusAlertTriggerUtil.triggerAlert(status, msg, 5, undefined, true);
            this.controller.event_bus?.emit("on_new_record_created", record_payload);

            return { status: true, msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit member profile form", { error });
            this.showErrorAlert("error", "error_occurred");
            return { status: false, msg: "error_occurred" };
        }
    };
}

export default MemberProfileFormViewActionHandler;
