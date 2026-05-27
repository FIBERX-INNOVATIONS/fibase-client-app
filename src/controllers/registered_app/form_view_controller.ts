import { reactive } from "vue";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    FormViewPropsInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    RegisteredAppFormState,
    FormViewClassStylesInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import FormViewActionHandler from "@/action_handlers/registered_app/form_view_action_handler";
import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";
import { RegisteredAppFromDataInterface } from "@/types/form_data_type";

class RegisteredAppFormViewController<T = any> extends BaseFormViewController<
    RegisteredAppFromDataInterface,
    FormViewPropsInterface<T>,
    RegisteredAppFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    FormViewClassStylesInterface,
    FormViewActionHandler,
    GlobalEventTypes
> {
    constructor(props: FormViewPropsInterface<T>) {
        super("registered_app_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new FormViewActionHandler(this));
        this.getComponentDefinition();
    }

    // Method to get state data
    protected getUIStateData(): RegisteredAppFormState {
        const existing_record = this?.props?.record as RegisteredAppRecordInterface | undefined;
        const input_group_content_key = (input_id: string) =>
            `content_resource.registered_app_view_ui.form_view_ui.fieldset.${input_id}_field`;
        const btn_content_key =
            "content_resource.registered_app_view_ui.form_view_ui.fieldset.btn_text";

        this.configureFormUI({
            toaster_id: "registered_app_submit_toaster",
            use_modal_button_styles: true
        });

        const prefix_input_props = this.buildInputProps(
            "prefix",
            "text",
            input_group_content_key("prefix"),
            { model_value: existing_record?.prefix ?? "" }
        );

        const name_input_props = this.buildInputProps(
            "name",
            "text",
            input_group_content_key("name"),
            { model_value: existing_record?.name ?? "" }
        );

        const description_input_props = this.buildInputProps(
            "description",
            "textarea",
            input_group_content_key("description"),
            {
                number_props: { rows: 12 },
                model_value: existing_record?.description ?? ""
            }
        );

        const base_url_input_props = this.buildInputProps(
            "base_url",
            "text",
            input_group_content_key("base_url"),
            { model_value: existing_record?.base_url ?? "" }
        );

        const logo_url_input_props = this.buildInputProps(
            "logo_url",
            "file",
            input_group_content_key("logo_url"),
            {
                model_value: existing_record?.logo_url ?? "",
                action_props: {
                    on_change: this.action_handler.handleOnFileSelected
                },
                file_props: {
                    accept: "image/*",
                    multiple: false,
                    enable_preview: true
                }
            }
        );

        const urls_input_props = this.buildInputProps(
            "urls",
            "textarea",
            input_group_content_key("urls"),
            {
                number_props: { rows: 12 },
                model_value: existing_record?.urls?.join(",") ?? ""
            }
        );

        return {
            fields: reactive({
                prefix_input_group_props: this.buildInputGroupFromInputProps(
                    prefix_input_props,
                    input_group_content_key("prefix")
                ),

                name_input_group_props: this.buildInputGroupFromInputProps(
                    name_input_props,
                    input_group_content_key("name")
                ),

                description_input_group_props: this.buildInputGroupFromInputProps(
                    description_input_props,
                    input_group_content_key("description")
                ),

                base_url_input_group_props: this.buildInputGroupFromInputProps(
                    base_url_input_props,
                    input_group_content_key("base_url")
                ),

                logo_url_input_group_props: this.buildInputGroupFromInputProps(
                    logo_url_input_props,
                    input_group_content_key("logo_url")
                ),

                urls_input_group_props: this.buildInputGroupFromInputProps(
                    urls_input_props,
                    input_group_content_key("urls")
                )
            }),

            toast_alert_props: this.buildToasterProps(),

            btn_props: this.buildSubmitButtonProps(
                "registered_app_submit",
                btn_content_key,
                "paper_airplane_send_svg_icon"
            )
        } as RegisteredAppFormState;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        // set csrf token
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.REGISTER_APP);
    }
}

export default RegisteredAppFormViewController;
