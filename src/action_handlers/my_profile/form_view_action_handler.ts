import dayjs from "dayjs";

import { CSRF_TOKEN_FOR, FILE_STORAGE_REFERENCE_TYPE } from "@/configs";

import { GlobalEventTypes } from "@/types/global_events_type";

import { MemberRecordInterface } from "@/types/api_service_type";

import { MyProfileFieldsType } from "@/types/form_fields_type";

import { FieldValidator, MyProfileFormDataInterface, UpdateMemberPayload } from "@/types/form_data_type";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

import FileStorageAPIService from "@/api_services/file_storage_api_service";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import MemberProfileValidator from "@/validators/member_profile_validator";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import {
    MyProfileViewComponentsInterface,
    MyProfileViewComputedDataInterface,
    MyProfileViewPropsInterface,
    MyProfileViewStateDataInterface
} from "@/ui_types/my_profile_view_type";

import type MyProfileFormViewController from "@/controllers/my_profile/form_view_controller";

class MyProfileFormViewActionHandler extends BaseFormActionHandler<
    MyProfileFormDataInterface,
    MyProfileFieldsType,
    MyProfileViewPropsInterface,
    MyProfileViewStateDataInterface,
    MyProfileViewComputedDataInterface,
    MyProfileViewComponentsInterface,
    GlobalEventTypes
> {
    public member: MemberRecordInterface | null;

    constructor(
        controller: BaseController<
            MyProfileViewPropsInterface,
            MyProfileViewStateDataInterface,
            MyProfileViewComputedDataInterface,
            MyProfileViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        const member = MyProfileFormViewActionHandler.getInitialMember(controller.props.record);

        super(controller, "my_profile_form_view_action_handler", MyProfileFormViewActionHandler.getFormDataValue(member));

        this.member = member;
        this.validators = this.getValidators();
    }

    // Methdo to get my controller (typed vaersion that extends base)
    private get my_controller(): MyProfileFormViewController {
        return this.controller as MyProfileFormViewController;
    }

    // Static Method to get the current logged in member record from props or authenticator util
    private static getInitialMember(record?: MemberRecordInterface): MemberRecordInterface | null {
        return record?.public_id ? record : MemberAuthenticatorUtil.getLoggedInMember();
    }

    // Static method to get the initial form data value for the my profile view
    private static getFormDataValue(member?: MemberRecordInterface | null): MyProfileFormDataInterface {
        const dob = member?.dob?.includes("T") ? member.dob.split("T")[0] : (member?.dob ?? "");

        return {
            csrf_token: null,
            first_name: member?.first_name ?? "",
            last_name: member?.last_name ?? "",
            email: member?.email ?? "",
            phone: member?.phone ?? "",
            dob: dayjs(dob).format("YYYY-MM-DD"),
            gender: member?.gender ?? "",
            profile_photo_link: member?.profile_photo_link ?? "",
            new_password: "",
            password_confirm: "",
            confirm_password: ""
        };
    }

    // Method to set profile state on controller
    private setProfileState(member: MemberRecordInterface | null): void {
        this.setState("member", member);
        this.setState("avatar_src", this.my_controller.getAvatarSrc(member));
        this.setState("account_summary", this.my_controller.buildAccountSummary(member));
        this.setState("status_badges", this.my_controller.buildStatusBadges(member));
        this.setState("fields", this.my_controller.buildFields());
    }

    // Method to hydrate existing form input data from current logged in member
    private hydrateMember(record: MemberRecordInterface): void {
        const next_form_data = MyProfileFormViewActionHandler.getFormDataValue(record);

        this.member = record;
        this.form_data.first_name = next_form_data.first_name;
        this.form_data.last_name = next_form_data.last_name;
        this.form_data.email = next_form_data.email;
        this.form_data.phone = next_form_data.phone;
        this.form_data.dob = next_form_data.dob;
        this.form_data.gender = next_form_data.gender;
        this.form_data.profile_photo_link = next_form_data.profile_photo_link;

        this.setProfileState(record);
    }

    // Method to clear password input fields
    private clearPasswordFields(): void {
        this.form_data.new_password = "";
        this.form_data.password_confirm = "";
        this.form_data.confirm_password = "";
    }

    // Methdo to get input validators
    protected getValidators(): Partial<Record<keyof MyProfileFormDataInterface, FieldValidator<MyProfileFormDataInterface>>> {
        return {
            first_name: MemberProfileValidator.validateFirstNameField,
            last_name: MemberProfileValidator.validateLastNameField,
            phone: MemberProfileValidator.validatePhoneField,
            dob: MemberProfileValidator.validateDobField,
            gender: MemberProfileValidator.validateGenderField,
            profile_photo_link: MemberProfileValidator.validateProfilePhotoLinkField,
            new_password: MemberProfileValidator.validateNewPasswordField
        };
    }

    // Method to get submit required fields
    protected getSubmitRequiredFields(): (keyof MyProfileFormDataInterface & string)[] {
        return ["first_name", "last_name", "dob", "gender"];
    }

    // Method to initialize my profile view an fields on component mounted
    public initializeMyProfileview = async (token_for = CSRF_TOKEN_FOR.MEMBER_PROFILE): Promise<void> => {
        const current_member = MyProfileFormViewActionHandler.getInitialMember(this.props.record);

        if (!current_member?.public_id) {
            this.showErrorAlert("error", "my_profile_not_loaded", 6);
            return;
        }

        this.hydrateMember(current_member);
        await this.setCSRFToken(token_for);

        try {
            const result = await MemberProfileAPIService.getMember(current_member.public_id);

            if (result?.status === "success" && result.data?.public_id) {
                this.hydrateMember(result.data);
                MemberAuthenticatorUtil.updateLoggedInMember(result.data);
            }
        } catch (error: unknown) {
            this.logger.error("Failed to refresh current member profile", { error });
        }
    };

    // Methdo to handle on profile photo upload btn clicked
    public handleOnFileUpload = async (files: File[]): Promise<boolean> => {
        try {
            this.setState("is_uploading_photo", true);

            const form_data = new FormData();

            form_data.append("file", files[0]);
            form_data.append("reference_type", FILE_STORAGE_REFERENCE_TYPE.MEMBER_PROFILE_IMAGE);
            form_data.append("is_public", "true");

            const result = await FileStorageAPIService.uploadFile(form_data);

            if (result?.status !== "success" || !result.data?.url) {
                this.showErrorAlert("error", result?.msg || "file_upload_failed", 8);
                return false;
            }

            this.form_data.profile_photo_link = result.data.url;
            this.setState("avatar_src", result.data.url);
            this.setState("fields", this.my_controller.buildFields());
            this.showErrorAlert("success", result.msg || "file_uploaded_successfully", 5);
            this.syncSubmitButtonState();

            return true;
        } catch (error: unknown) {
            this.logger.error("Failed to upload my profile image", { error });
            this.showErrorAlert("error", "error_occurred", 8);
            return false;
        } finally {
            this.setState("is_uploading_photo", false);
        }
    };

    // Method to handle on form submit btn clicked
    public handleOnFormSubmitBtnClick = async (): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();

        if (!this.member?.public_id) {
            this.showErrorAlert("error", "my_profile_not_loaded", 6);
            return { status: false, msg: "my_profile_not_loaded" };
        }

        try {
            this.setState("btn_props", { boolean_props: { disabled: true } } as any);

            const validation = MemberProfileValidator.validateUpdateMemberInput(this.form_data);

            if (!validation.v_state || !validation.v_data) {
                this.showErrorAlert("error", validation.v_msg, 6);
                return { status: false, msg: validation.v_msg };
            }

            const payload = validation.v_data as UpdateMemberPayload;
            const result = await MemberProfileAPIService.updateMember(this.member.public_id, payload);

            if (result?.status !== "success" || !result.data?.public_id) {
                const message_key = result?.msg || "error_occurred";

                this.showErrorAlert("error", message_key, 8);
                return { status: false, msg: message_key };
            }

            this.hydrateMember(result.data);
            this.clearPasswordFields();
            this.setState("fields", this.my_controller.buildFields());
            MemberAuthenticatorUtil.updateLoggedInMember(result.data);
            await this.setCSRFToken(CSRF_TOKEN_FOR.MEMBER_PROFILE);
            this.showErrorAlert("success", result.msg || "my_profile_updated", 5);

            return { status: true, msg: result.msg };
        } catch (error: unknown) {
            this.logger.error("Failed to submit my profile form", { error });
            this.showErrorAlert("error", "error_occurred", 8);
            return { status: false, msg: "error_occurred" };
        } finally {
            this.syncSubmitButtonState();
        }
    };
}

export default MyProfileFormViewActionHandler;
