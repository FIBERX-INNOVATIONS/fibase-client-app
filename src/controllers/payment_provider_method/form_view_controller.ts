import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { PaymentProviderMethodFieldsType } from "@/types/form_fields_type";

import { PaymentProviderMethodFormDataInterface } from "@/types/form_data_type";

import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    PaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import PaymentProviderMethodFormViewActionHandler from "@/action_handlers/payment_provider_method/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class PaymentProviderMethodFormViewController extends BaseFormViewController<
    PaymentProviderMethodFormDataInterface,
    PaymentProviderMethodFieldsType,
    FormViewPropsInterface<PaymentProviderMethodRecordInterface>,
    PaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.payment_provider_method_view_ui.form_view_ui";

    // Method to initialize form controller.
    constructor(props: FormViewPropsInterface<PaymentProviderMethodRecordInterface>) {
        super("payment_provider_method_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new PaymentProviderMethodFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "payment_provider_method_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI.
    protected buildFormFieldsUI(): PaymentProviderMethodFieldsType {
        const record = this.props?.record;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };
        const selected_provider_options: SelectOptionInterface[] = record?.provider?.id
            ? [
                  {
                      label_text: `${record.provider?.code?.toUpperCase?.() ?? ""} - ${record.provider?.name ?? ""}`,
                      value: record.provider.id
                  }
              ]
            : [];
        const selected_payment_method_options: SelectOptionInterface[] = record?.payment_method?.id
            ? [
                  {
                      label_text: `${record.payment_method?.code?.toUpperCase?.() ?? ""} - ${record.payment_method?.name ?? ""}`,
                      value: record.payment_method.id
                  }
              ]
            : [];

        return {
            provider_id_input_group_props: this.buildInputGroupProps(
                "provider_id",
                "select_search",
                field_content_key("provider_id"),
                {
                    model_value: record?.provider?.id ?? "",
                    input_props: {
                        option_props: selected_provider_options,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchPaymentProviderPreviewRecords
                        }
                    }
                }
            ),

            payment_method_id_input_group_props: this.buildInputGroupProps(
                "payment_method_id",
                "select_search",
                field_content_key("payment_method_id"),
                {
                    model_value: record?.payment_method?.id ?? "",
                    input_props: {
                        option_props: selected_payment_method_options,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchPaymentMethodPreviewRecords
                        }
                    }
                }
            ),

            direction_input_group_props: this.buildInputGroupProps("direction", "select", field_content_key("direction"), {
                model_value: record?.direction ?? "deposit"
            }),

            provider_method_code_input_group_props: this.buildInputGroupProps(
                "provider_method_code",
                "text",
                field_content_key("provider_method_code"),
                { model_value: record?.provider_method_code ?? "" }
            ),

            min_amount_input_group_props: this.buildInputGroupProps("min_amount", "number", field_content_key("min_amount"), {
                model_value: record?.min_amount ?? "",
                input_props: { number_props: { min: 0, step: 0.01 } }
            }),

            max_amount_input_group_props: this.buildInputGroupProps("max_amount", "number", field_content_key("max_amount"), {
                model_value: record?.max_amount ?? "",
                input_props: { number_props: { min: 0, step: 0.01 } }
            })
        };
    }

    // Method to build form button ui.
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "payment_provider_method_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.PAYMENT_PROVIDER_METHOD);
    }
}

export default PaymentProviderMethodFormViewController;
