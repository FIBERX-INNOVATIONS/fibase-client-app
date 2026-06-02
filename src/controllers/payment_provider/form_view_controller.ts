import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import { PaymentProviderFieldsType } from "@/types/form_fields_type";

import { PaymentProviderFormDataInterface } from "@/types/form_data_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    PaymentProviderFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import PaymentProviderFormViewActionHandler from "@/action_handlers/payment_provider/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class PaymentProviderFormViewController extends BaseFormViewController<
    PaymentProviderFormDataInterface,
    PaymentProviderFieldsType,
    FormViewPropsInterface<PaymentProviderRecordInterface>,
    PaymentProviderFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.payment_provider_view_ui.form_view_ui";

    constructor(props: FormViewPropsInterface<PaymentProviderRecordInterface>) {
        super("payment_provider_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new PaymentProviderFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "payment_provider_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI.
    protected buildFormFieldsUI(): PaymentProviderFieldsType {
        const record = this.props?.record;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        return {
            code_input_group_props: this.buildInputGroupProps(
                "code",
                "text",
                field_content_key("code"),
                { model_value: record?.code ?? "" }
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
                    input_props: { number_props: { rows: 8 } }
                }
            ),

            provider_type_input_group_props: this.buildInputGroupProps(
                "provider_type",
                "select",
                field_content_key("provider_type"),
                { model_value: record?.provider_type ?? "payment_gateway" }
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

            website_url_input_group_props: this.buildInputGroupProps(
                "website_url",
                "text",
                field_content_key("website_url"),
                { model_value: record?.website_url ?? "" }
            )
        };
    }

    // Method to build form button ui.
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "payment_provider_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.PAYMENT_PROVIDER);
    }
}

export default PaymentProviderFormViewController;
