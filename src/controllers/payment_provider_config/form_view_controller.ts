import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import { PaymentProviderConfigFieldsType } from "@/types/form_fields_type";

import { PaymentProviderConfigFormDataInterface } from "@/types/form_data_type";

import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    PaymentProviderConfigFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import PaymentProviderConfigFormViewActionHandler from "@/action_handlers/payment_provider_config/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class PaymentProviderConfigFormViewController extends BaseFormViewController<
    PaymentProviderConfigFormDataInterface,
    PaymentProviderConfigFieldsType,
    FormViewPropsInterface<PaymentProviderConfigRecordInterface>,
    PaymentProviderConfigFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key =
        "content_resource.payment_provider_config_view_ui.form_view_ui";

    constructor(props: FormViewPropsInterface<PaymentProviderConfigRecordInterface>) {
        super("payment_provider_config_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new PaymentProviderConfigFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "payment_provider_config_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI.
    protected buildFormFieldsUI(): PaymentProviderConfigFieldsType {
        const record = this.props?.record;
        const settings = record?.settings;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };
        const selected_provider_options: SelectOptionInterface[] = record?.provider_id
            ? [
                  {
                      label_text: `${record.provider?.code?.toUpperCase?.() ?? ""} - ${record.provider?.name ?? ""}`,
                      value: record.provider_id
                  }
              ]
            : [];
        const currencySelectSearchProps = (model_value?: string | null) => ({
            model_value: model_value ?? "",
            input_props: {
                option_props: model_value
                    ? [{ label_text: model_value, value: model_value }]
                    : undefined,
                content_props: {
                    caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                },
                action_props: {
                    fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                }
            }
        });
        const credentialInput = (id: string, type: "text" | "password" = "text") =>
            this.buildInputGroupProps(id, type, field_content_key(id), { model_value: "" });

        return {
            provider_id_input_group_props: this.buildInputGroupProps(
                "provider_id",
                "select_search",
                field_content_key("provider_id"),
                {
                    model_value: record?.provider_id ?? "",
                    input_props: {
                        option_props: selected_provider_options,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method:
                                PreviewRecordFetcher.fetchPaymentProviderPreviewRecords
                        }
                    }
                }
            ),

            environment_input_group_props: this.buildInputGroupProps(
                "environment",
                "select",
                field_content_key("environment"),
                { model_value: record?.environment ?? "test" }
            ),

            api_key_input_group_props: credentialInput("api_key", "password"),
            secret_key_input_group_props: credentialInput("secret_key", "password"),
            public_key_input_group_props: credentialInput("public_key", "password"),
            private_key_input_group_props: credentialInput("private_key", "password"),
            client_id_input_group_props: credentialInput("client_id"),
            client_secret_input_group_props: credentialInput("client_secret", "password"),
            merchant_id_input_group_props: credentialInput("merchant_id"),
            account_id_input_group_props: credentialInput("account_id"),
            username_input_group_props: credentialInput("username"),
            password_input_group_props: credentialInput("password", "password"),
            webhook_hash_input_group_props: credentialInput("webhook_hash", "password"),
            webhook_secret_input_group_props: credentialInput("webhook_secret", "password"),
            signing_secret_input_group_props: credentialInput("signing_secret", "password"),

            webhook_url_input_group_props: this.buildInputGroupProps(
                "webhook_url",
                "text",
                field_content_key("webhook_url"),
                { model_value: settings?.webhook_url ?? "" }
            ),

            callback_url_input_group_props: this.buildInputGroupProps(
                "callback_url",
                "text",
                field_content_key("callback_url"),
                { model_value: settings?.callback_url ?? "" }
            ),

            redirect_url_input_group_props: this.buildInputGroupProps(
                "redirect_url",
                "text",
                field_content_key("redirect_url"),
                { model_value: settings?.redirect_url ?? "" }
            ),

            success_url_input_group_props: this.buildInputGroupProps(
                "success_url",
                "text",
                field_content_key("success_url"),
                { model_value: settings?.success_url ?? "" }
            ),

            failure_url_input_group_props: this.buildInputGroupProps(
                "failure_url",
                "text",
                field_content_key("failure_url"),
                { model_value: settings?.failure_url ?? "" }
            ),

            settlement_currency_input_group_props: this.buildInputGroupProps(
                "settlement_currency",
                "select_search",
                field_content_key("settlement_currency"),
                currencySelectSearchProps(settings?.settlement_currency)
            ),

            default_currency_input_group_props: this.buildInputGroupProps(
                "default_currency",
                "select_search",
                field_content_key("default_currency"),
                currencySelectSearchProps(settings?.default_currency)
            ),

            payout_schedule_input_group_props: this.buildInputGroupProps(
                "payout_schedule",
                "text",
                field_content_key("payout_schedule"),
                { model_value: settings?.payout_schedule ?? "" }
            ),

            capture_mode_input_group_props: this.buildInputGroupProps(
                "capture_mode",
                "text",
                field_content_key("capture_mode"),
                { model_value: settings?.capture_mode ?? "" }
            ),

            timeout_ms_input_group_props: this.buildInputGroupProps(
                "timeout_ms",
                "number",
                field_content_key("timeout_ms"),
                {
                    model_value: settings?.timeout_ms ?? "",
                    input_props: { number_props: { min: 0, step: 1 } }
                }
            )
        };
    }

    // Method to build form button ui.
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "payment_provider_config_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.PAYMENT_PROVIDER_CONFIG);
    }
}

export default PaymentProviderConfigFormViewController;
