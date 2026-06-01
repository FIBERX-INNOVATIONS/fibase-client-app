import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import { PaymentMethodFieldsType } from "@/types/form_fields_type";

import { PaymentMethodFormDataInterface } from "@/types/form_data_type";

import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    PaymentMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import PaymentMethodFormViewActionHandler from "@/action_handlers/payment_method/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class PaymentMethodFormViewController extends BaseFormViewController<
    PaymentMethodFormDataInterface,
    PaymentMethodFieldsType,
    FormViewPropsInterface<PaymentMethodRecordInterface>,
    PaymentMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.payment_method_view_ui.form_view_ui";

    constructor(props: FormViewPropsInterface<PaymentMethodRecordInterface>) {
        super("payment_method_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new PaymentMethodFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "payment_method_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI.
    protected buildFormFieldsUI(): PaymentMethodFieldsType {
        const record = this.props?.record;
        const metadata = record?.metadata;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };
        const buildSelectedCodeOptions = (codes?: string[]): SelectOptionInterface[] => {
            return (codes ?? []).map((code) => ({
                label_text: code,
                value: code
            }));
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

            icon_url_input_group_props: this.buildInputGroupProps(
                "icon_url",
                "file",
                field_content_key("icon_url"),
                {
                    model_value: record?.icon_url ?? "",
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

            sort_order_input_group_props: this.buildInputGroupProps(
                "sort_order",
                "number",
                field_content_key("sort_order"),
                {
                    model_value: record?.sort_order ?? "",
                    input_props: { number_props: { min: 0 } }
                }
            ),

            display_name_input_group_props: this.buildInputGroupProps(
                "display_name",
                "text",
                field_content_key("display_name"),
                { model_value: metadata?.display_name ?? "" }
            ),

            display_description_input_group_props: this.buildInputGroupProps(
                "display_description",
                "textarea",
                field_content_key("display_description"),
                {
                    model_value: metadata?.display_description ?? "",
                    input_props: { number_props: { rows: 8 } }
                }
            ),

            display_group_input_group_props: this.buildInputGroupProps(
                "display_group",
                "select",
                field_content_key("display_group"),
                { model_value: metadata?.display_group ?? "" }
            ),

            processing_time_text_input_group_props: this.buildInputGroupProps(
                "processing_time_text",
                "text",
                field_content_key("processing_time_text"),
                { model_value: metadata?.processing_time_text ?? "" }
            ),

            fee_label_input_group_props: this.buildInputGroupProps(
                "fee_label",
                "select",
                field_content_key("fee_label"),
                { model_value: metadata?.fee_label ?? "" }
            ),

            supported_country_codes_input_group_props: this.buildInputGroupProps(
                "supported_country_codes",
                "multi_select_search",
                field_content_key("supported_country_codes"),
                {
                    model_value: metadata?.supported_country_codes ?? [],
                    input_props: {
                        option_props: buildSelectedCodeOptions(metadata?.supported_country_codes),
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchCountriesPreviewRecords
                        }
                    }
                }
            ),

            supported_currency_codes_input_group_props: this.buildInputGroupProps(
                "supported_currency_codes",
                "multi_select_search",
                field_content_key("supported_currency_codes"),
                {
                    model_value: metadata?.supported_currency_codes ?? [],
                    input_props: {
                        option_props: buildSelectedCodeOptions(metadata?.supported_currency_codes),
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                        }
                    }
                }
            ),

            requires_redirect_input_group_props: this.buildInputGroupProps(
                "requires_redirect",
                "checkbox",
                field_content_key("requires_redirect"),
                {
                    model_value: metadata?.requires_redirect ?? false,
                    input_props: {
                        boolean_props: { is_checked: metadata?.requires_redirect ?? false }
                    }
                }
            ),

            supports_deposit_input_group_props: this.buildInputGroupProps(
                "supports_deposit",
                "checkbox",
                field_content_key("supports_deposit"),
                {
                    model_value: metadata?.supports_deposit ?? false,
                    input_props: {
                        boolean_props: { is_checked: metadata?.supports_deposit ?? false }
                    }
                }
            ),

            supports_withdrawal_input_group_props: this.buildInputGroupProps(
                "supports_withdrawal",
                "checkbox",
                field_content_key("supports_withdrawal"),
                {
                    model_value: metadata?.supports_withdrawal ?? false,
                    input_props: {
                        boolean_props: { is_checked: metadata?.supports_withdrawal ?? false }
                    }
                }
            ),

            supports_refund_input_group_props: this.buildInputGroupProps(
                "supports_refund",
                "checkbox",
                field_content_key("supports_refund"),
                {
                    model_value: metadata?.supports_refund ?? false,
                    input_props: {
                        boolean_props: { is_checked: metadata?.supports_refund ?? false }
                    }
                }
            ),

            min_amount_input_group_props: this.buildInputGroupProps(
                "min_amount",
                "number",
                field_content_key("min_amount"),
                {
                    model_value: metadata?.min_amount ?? "",
                    input_props: { number_props: { min: 0, step: 0.01 } }
                }
            ),

            max_amount_input_group_props: this.buildInputGroupProps(
                "max_amount",
                "number",
                field_content_key("max_amount"),
                {
                    model_value: metadata?.max_amount ?? "",
                    input_props: { number_props: { min: 0, step: 0.01 } }
                }
            )
        };
    }

    // Method to build form button ui.
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "payment_method_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.PAYMENT_METHOD);
    }
}

export default PaymentMethodFormViewController;
