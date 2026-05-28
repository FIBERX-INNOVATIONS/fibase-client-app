import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import { RegisteredAppFieldsType } from "@/types/form_fields_type";

import { RegisteredAppFromDataInterface } from "@/types/form_data_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    RegisteredAppFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import RegisteredAppFormViewActionHandler from "@/action_handlers/registered_app/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class RegisteredAppFormViewController extends BaseFormViewController<
    RegisteredAppFromDataInterface,
    RegisteredAppFieldsType,
    FormViewPropsInterface<RegisteredAppRecordInterface>,
    RegisteredAppFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.registered_app_view_ui.form_view_ui";

    constructor(props: FormViewPropsInterface<RegisteredAppRecordInterface>) {
        super("registered_app_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new RegisteredAppFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "registered_app_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI
    protected buildFormFieldsUI(): RegisteredAppFieldsType {
        const record = this.props?.record;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        return {
            prefix_input_group_props: this.buildInputGroupProps(
                "prefix",
                "text",
                field_content_key("prefix"),
                { model_value: record?.prefix ?? "" }
            ),

            name_input_group_props: this.buildInputGroupProps(
                "name",
                "text",
                field_content_key("name"),
                { model_value: record?.name ?? "" }
            ),

            description_input_group_props: this.buildInputGroupProps(
                "description",
                "textarea",
                field_content_key("description"),
                {
                    model_value: record?.description ?? "",
                    input_props: { number_props: { rows: 12 } }
                }
            ),

            base_url_input_group_props: this.buildInputGroupProps(
                "base_url",
                "text",
                field_content_key("base_url"),
                { model_value: record?.base_url ?? "" }
            ),

            logo_url_input_group_props: this.buildInputGroupProps(
                "logo_url",
                "file",
                field_content_key("logo_url"),
                {
                    model_value: record?.logo_url ?? "",
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
            ),

            urls_input_group_props: this.buildInputGroupProps(
                "urls",
                "textarea",
                field_content_key("urls"),
                {
                    model_value: record?.urls?.join(",") ?? "",
                    input_props: { number_props: { rows: 12 } }
                }
            )
        };
    }

    // Method to build form button ui
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "registered_app_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.REGISTER_APP);
    }
}

export default RegisteredAppFormViewController;
