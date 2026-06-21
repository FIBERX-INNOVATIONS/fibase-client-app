import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { MemberRecordInterface } from "@/types/api_service_type";

import { MemberProfileFieldsType } from "@/types/form_fields_type";

import { CreateMemberPayload } from "@/types/form_data_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    MemberProfileFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import MemberProfileFormViewActionHandler from "@/action_handlers/member_profile/form_view_action_handler";

class MemberProfileFormViewController extends BaseFormViewController<
    CreateMemberPayload,
    MemberProfileFieldsType,
    FormViewPropsInterface<MemberRecordInterface>,
    MemberProfileFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.member_profile_view_ui.form_view_ui";

    constructor(props: FormViewPropsInterface<MemberRecordInterface>) {
        super("member_profile_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new MemberProfileFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "member_profile_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI
    protected buildFormFieldsUI(): MemberProfileFieldsType {
        const record = this.props?.record;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };
        const dob = record?.dob?.includes("T") ? record.dob.split("T")[0] : (record?.dob ?? "");

        return {
            first_name_input_group_props: this.buildInputGroupProps("first_name", "text", field_content_key("first_name"), {
                model_value: record?.first_name ?? ""
            }),

            last_name_input_group_props: this.buildInputGroupProps("last_name", "text", field_content_key("last_name"), {
                model_value: record?.last_name ?? ""
            }),

            email_input_group_props: this.buildInputGroupProps("email", "email", field_content_key("email"), {
                model_value: record?.email ?? "",
                input_props: {
                    boolean_props: {
                        disabled: !!record?.public_id
                    }
                }
            }),

            phone_input_group_props: this.buildInputGroupProps("phone", "phone_number", field_content_key("phone"), {
                model_value: record?.phone ?? ""
            }),

            dob_input_group_props: this.buildInputGroupProps("dob", "date", field_content_key("dob"), {
                model_value: InputTransformerUtil.formatDob(dob) ?? ""
            }),

            gender_input_group_props: this.buildInputGroupProps("gender", "select", field_content_key("gender"), {
                model_value: record?.gender ?? ""
            }),

            profile_photo_link_input_group_props: this.buildInputGroupProps(
                "profile_photo_link",
                "file",
                field_content_key("profile_photo_link"),
                {
                    model_value: record?.profile_photo_link ?? "",
                    input_props: {
                        action_props: {
                            on_change: this.action_handler.handleOnFileSelected
                        },
                        file_props: {
                            accept: "image/*",
                            multiple: false,
                            enable_preview: true
                        }
                    }
                }
            )
        };
    }

    // Method to build form button ui
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "member_profile_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.MEMBER_PROFILE);
    }
}

export default MemberProfileFormViewController;
