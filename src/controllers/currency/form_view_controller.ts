import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { CurrencyFieldsType } from "@/types/form_fields_type";

import { CurrencyFormDataInterface } from "@/types/form_data_type";

import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewPropsInterface,
    CurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import CurrencyFormViewActionHandler from "@/action_handlers/currency/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class CurrencyFormViewController extends BaseFormViewController<
    CurrencyFormDataInterface,
    CurrencyFieldsType,
    FormViewPropsInterface<CurrencyRecordInterface>,
    CurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.currency_view_ui.form_view_ui";

    private readonly default_network_symbol_options: SelectOptionInterface[] = [
        { label_text: "BNB Smart Chain (BEP-20)", value: "BSC" },
        { label_text: "Ethereum (ERC-20)", value: "ETH" }
    ];

    constructor(props: FormViewPropsInterface<CurrencyRecordInterface>) {
        super("currency_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new CurrencyFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "currency_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI
    protected buildFormFieldsUI(): CurrencyFieldsType {
        const record = this.props?.record;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };
        const network_symbol_options =
            ContentManagerUtil.getInstance().get<SelectOptionInterface[]>(
                `${field_content_key("network_symbol")}.option_list`,
                this.default_network_symbol_options
            ) ?? this.default_network_symbol_options;

        return {
            code_input_group_props: this.buildInputGroupProps("code", "text", field_content_key("code"), {
                model_value: record?.code ?? ""
            }),

            name_input_group_props: this.buildInputGroupProps("name", "text", field_content_key("name"), {
                model_value: record?.name ?? ""
            }),

            symbol_input_group_props: this.buildInputGroupProps("symbol", "text", field_content_key("symbol"), {
                model_value: record?.symbol ?? ""
            }),

            network_symbol_input_group_props: this.buildInputGroupProps(
                "network_symbol",
                "select",
                field_content_key("network_symbol"),
                {
                    model_value: record?.network_symbol ?? "",
                    input_props: {
                        option_props: network_symbol_options
                    }
                }
            ),

            numeric_code_input_group_props: this.buildInputGroupProps(
                "numeric_code",
                "text",
                field_content_key("numeric_code"),
                { model_value: record?.numeric_code ?? "" }
            ),

            country_code_input_group_props: this.buildInputGroupProps(
                "country_code",
                "text",
                field_content_key("country_code"),
                { model_value: record?.country_code ?? "" }
            ),

            precision_input_group_props: this.buildInputGroupProps("precision", "number", field_content_key("precision"), {
                model_value: record?.precision ?? ""
            }),

            minor_unit_input_group_props: this.buildInputGroupProps("minor_unit", "number", field_content_key("minor_unit"), {
                model_value: record?.minor_unit ?? ""
            }),

            sort_order_input_group_props: this.buildInputGroupProps("sort_order", "number", field_content_key("sort_order"), {
                model_value: record?.sort_order ?? "",
                input_props: {
                    number_props: { min: 1 }
                }
            }),

            logo_url_input_group_props: this.buildInputGroupProps("logo_url", "file", field_content_key("logo_url"), {
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
            }),

            is_fiat_input_group_props: this.buildInputGroupProps("is_fiat", "checkbox", field_content_key("is_fiat"), {
                model_value: record?.is_fiat ?? false,
                input_props: {
                    boolean_props: {
                        is_checked: record?.is_fiat ?? false
                    }
                }
            })
        };
    }

    // Method to build form button ui
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "currency_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to handle on mounted logic
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.CURRENCY);
    }
}

export default CurrencyFormViewController;
