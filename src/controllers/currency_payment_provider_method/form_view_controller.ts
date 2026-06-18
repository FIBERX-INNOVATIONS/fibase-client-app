import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { CurrencyPaymentProviderMethodFieldsType } from "@/types/form_fields_type";

import { CurrencyPaymentProviderMethodFormDataInterface } from "@/types/form_data_type";

import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    CurrencyPaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import CurrencyPaymentProviderMethodFormViewActionHandler from "@/action_handlers/currency_payment_provider_method/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class CurrencyPaymentProviderMethodFormViewController extends BaseFormViewController<
    CurrencyPaymentProviderMethodFormDataInterface,
    CurrencyPaymentProviderMethodFieldsType,
    FormViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>,
    CurrencyPaymentProviderMethodFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.currency_payment_provider_method_view_ui.form_view_ui";

    // Method to initialize form controller.
    constructor(props: FormViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>) {
        super("currency_payment_provider_method_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new CurrencyPaymentProviderMethodFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "currency_payment_provider_method_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI.
    protected buildFormFieldsUI(): CurrencyPaymentProviderMethodFieldsType {
        const record = this.props?.record;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };
        const selected_currency_options: SelectOptionInterface[] = record?.currency?.code
            ? [
                  {
                      label_text: `${record.currency?.code?.toUpperCase?.() ?? ""} - ${record.currency?.name ?? ""}`,
                      value: record.currency?.code ?? ""
                  }
              ]
            : [];
        const selected_provider_method_options: SelectOptionInterface[] = record?.provider_method?.id
            ? [
                  {
                      label_text: [
                          record.provider_method?.provider?.code?.toUpperCase?.() ??
                              record.provider_method?.provider?.name ??
                              "",
                          record.provider_method?.payment_method?.code?.toUpperCase?.() ??
                              record.provider_method?.payment_method?.name ??
                              "",
                          record.provider_method?.direction?.toUpperCase?.() ?? "",
                          record.provider_method?.provider_method_code ?? ""
                      ]
                          .filter(Boolean)
                          .join(" - "),
                      value: record.provider_method?.id ?? 0
                  }
              ]
            : [];

        return {
            currency_id_input_group_props: this.buildInputGroupProps(
                "currency_id",
                "select_search",
                field_content_key("currency_id"),
                {
                    model_value: record?.currency?.code ?? "",
                    input_props: {
                        option_props: selected_currency_options,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                        }
                    }
                }
            ),

            provider_method_id_input_group_props: this.buildInputGroupProps(
                "provider_method_id",
                "select_search",
                field_content_key("provider_method_id"),
                {
                    model_value: record?.provider_method?.id ?? 0,
                    input_props: {
                        option_props: selected_provider_method_options,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchPaymentProviderMethodPreviewRecords
                        }
                    }
                }
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
            "currency_payment_provider_method_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.CURRENCY_PAYMENT_PROVIDER_METHOD);
    }
}

export default CurrencyPaymentProviderMethodFormViewController;
