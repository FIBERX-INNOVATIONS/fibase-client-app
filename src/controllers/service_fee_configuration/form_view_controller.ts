import { CSRF_TOKEN_FOR } from "@/configs";

import type { GlobalEventTypes } from "@/types/global_events_type";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import type { ServiceFeeConfigurationFieldsType } from "@/types/form_fields_type";

import type { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import type { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import type { ServiceFeeConfigurationFormDataInterface } from "@/types/form_data_type";

import type { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

import type {
    FormViewComponentsInterface,
    FormViewComputedDataInterface,
    FormViewPropsInterface,
    ServiceFeeConfigurationFormState,
    ServiceFeeConfigurationRangeRowUIInterface
} from "@/ui_types/form_view_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import ServiceFeeConfigurationFormViewClassStyles from "@/class_styles/service_fee_configuration_form_view_class_styles";

import ServiceFeeConfigurationFormViewActionHandler from "@/action_handlers/service_fee_configuration/form_view_action_handler";

class ServiceFeeConfigurationFormViewController extends BaseFormViewController<
    ServiceFeeConfigurationFormDataInterface,
    ServiceFeeConfigurationFieldsType,
    FormViewPropsInterface<ServiceFeeConfigurationRecordInterface>,
    ServiceFeeConfigurationFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.service_fee_configuration_view_ui.form_view_ui";

    private readonly service_fee_content_manager = ContentManagerUtil.getInstance();

    public readonly service_fee_class_styles = ServiceFeeConfigurationFormViewClassStyles;

    // Method to initialize the service fee configuration form controller.
    constructor(props: FormViewPropsInterface<ServiceFeeConfigurationRecordInterface>) {
        super("service_fee_configuration_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new ServiceFeeConfigurationFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "service_fee_configuration_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to get the configured service fee form action handler.
    private getServiceFeeActionHandler(): ServiceFeeConfigurationFormViewActionHandler {
        return this.action_handler as ServiceFeeConfigurationFormViewActionHandler;
    }

    // Method to build one preselected search option.
    private buildSelectedOption(value?: string | number | null, label?: string | null): SelectOptionInterface[] {
        if (value === null || value === undefined || value === "") {
            return [];
        }

        return [{ label_text: label || String(value), value }];
    }

    // Method to normalize an API timestamp for the toolkit date input.
    private formatDateInputValue(value?: string | null): string {
        return value ? value.slice(0, 10) : "";
    }

    // Method to build fetch metadata for optional select-search fields.
    private getOptionalSelectionFetchParams(): Record<string, unknown> {
        return {
            optional_selection_label:
                this.service_fee_content_manager.get<string>(`${this.base_content_key}.fieldset.no_selection_option_text`) ??
                "No selection"
        };
    }

    // Method to build the form header text.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build the main service fee form fields.
    protected buildFormFieldsUI(): ServiceFeeConfigurationFieldsType {
        const record = this.props.record;

        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        const currency_value = record?.currency?.code ?? "";

        const currency_label = record?.currency
            ? `${record.currency.code?.toUpperCase?.() ?? ""} - ${record.currency.name ?? ""}`
            : "";

        const registered_app_value = record?.registered_app?.public_id ?? "";

        const registered_app_label = record?.registered_app
            ? `${record.registered_app.prefix?.toUpperCase?.() ?? ""} - ${record.registered_app.name ?? ""}`
            : "";

        const provider_value = record?.provider?.id ?? "";

        const provider_label = record?.provider
            ? `${record.provider.code?.toUpperCase?.() ?? ""} - ${record.provider.name ?? ""}`
            : "";

        const identity_value = record?.identity?.public_id ?? "";

        const identity_profile = record?.identity?.primary_profile ?? record?.identity?.profile;

        const identity_label = identity_profile?.display_name || identity_value;

        return {
            currency_id_input_group_props: this.buildInputGroupProps(
                "currency_id",
                "select_search",
                field_content_key("currency_id"),
                {
                    model_value: currency_value,
                    input_props: {
                        option_props: this.buildSelectedOption(currency_value, currency_label),
                        content_props: { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon },
                        action_props: { fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords }
                    }
                }
            ),

            registered_app_id_input_group_props: this.buildInputGroupProps(
                "registered_app_id",
                "select_search",
                field_content_key("registered_app_id"),
                {
                    model_value: registered_app_value,
                    input_props: {
                        option_props: this.buildSelectedOption(registered_app_value, registered_app_label),
                        content_props: { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchOptionalRegisteredAppPreviewRecords,
                            fetch_data_params: this.getOptionalSelectionFetchParams()
                        }
                    }
                }
            ),

            provider_id_input_group_props: this.buildInputGroupProps(
                "provider_id",
                "select_search",
                field_content_key("provider_id"),
                {
                    model_value: provider_value,
                    input_props: {
                        option_props: this.buildSelectedOption(provider_value, provider_label),
                        content_props: { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchOptionalPaymentProviderPreviewRecords,
                            fetch_data_params: this.getOptionalSelectionFetchParams()
                        }
                    }
                }
            ),

            identity_id_input_group_props: this.buildInputGroupProps(
                "identity_id",
                "select_search",
                field_content_key("identity_id"),
                {
                    model_value: identity_value,
                    input_props: {
                        option_props: this.buildSelectedOption(identity_value, identity_label),
                        content_props: { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchOptionalIdentityPreviewRecords,
                            fetch_data_params: this.getOptionalSelectionFetchParams()
                        }
                    }
                }
            ),

            transaction_type_input_group_props: this.buildInputGroupProps(
                "transaction_type",
                "select",
                field_content_key("transaction_type"),
                { model_value: record?.transaction_type ?? "deposit" }
            ),

            fee_type_input_group_props: this.buildInputGroupProps("fee_type", "select", field_content_key("fee_type"), {
                model_value: record?.fee_type ?? "flat",
                input_props: { action_props: { on_change: this.getServiceFeeActionHandler().handleFeeTypeChanged } }
            }),

            amount_input_group_props: this.buildInputGroupProps("amount", "number", field_content_key("amount"), {
                model_value: DisplayFormatterUtil.formatDecimalInput(record?.amount),
                input_props: { number_props: { min: 0, step: 0.01 } }
            }),

            effective_from_input_group_props: this.buildInputGroupProps(
                "effective_from",
                "date",
                field_content_key("effective_from"),
                { model_value: this.formatDateInputValue(record?.effective_from) }
            ),

            effective_until_input_group_props: this.buildInputGroupProps(
                "effective_until",
                "date",
                field_content_key("effective_until"),
                { model_value: this.formatDateInputValue(record?.effective_until) }
            )
        };
    }

    // Method to build one repeatable service fee range row.
    public buildRangeRow(index: number): ServiceFeeConfigurationRangeRowUIInterface {
        const range = this.getServiceFeeActionHandler().form_data.ranges[index];

        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        const range_action_props = { on_change: this.getServiceFeeActionHandler().handleRangeInputChanged };

        return {
            key: `service_fee_range_${index}`,
            min_value_input_group_props: this.buildInputGroupProps(
                `range_${index}_min_value`,
                "number",
                field_content_key("range_min_value"),
                {
                    model_value: DisplayFormatterUtil.formatDecimalInput(range?.min_value),
                    input_props: { number_props: { min: 0, step: 0.01 }, action_props: range_action_props }
                }
            ),
            max_value_input_group_props: this.buildInputGroupProps(
                `range_${index}_max_value`,
                "number",
                field_content_key("range_max_value"),
                {
                    model_value: DisplayFormatterUtil.formatDecimalInput(range?.max_value),
                    input_props: { number_props: { min: 0, step: 0.01 }, action_props: range_action_props }
                }
            ),
            fee_type_input_group_props: this.buildInputGroupProps(
                `range_${index}_fee_type`,
                "select",
                field_content_key("range_fee_type"),
                { model_value: range?.fee_type ?? "flat", input_props: { action_props: range_action_props } }
            ),
            amount_input_group_props: this.buildInputGroupProps(
                `range_${index}_amount`,
                "number",
                field_content_key("range_amount"),
                {
                    model_value: DisplayFormatterUtil.formatDecimalInput(range?.amount),
                    input_props: { number_props: { min: 0, step: 0.01 }, action_props: range_action_props }
                }
            ),
            remove_btn_props: this.buildSubmitButtonProps(
                `remove_service_fee_range_${index}`,
                `${this.base_content_key}.fieldset.remove_range_btn_text`,
                "delete_trash_svg_icon",
                "button",
                {
                    boolean_props: { disabled: this.getServiceFeeActionHandler().form_data.ranges.length === 1 },
                    action_props: {
                        on_click: async (): Promise<{ status: boolean; msg: string }> => {
                            this.getServiceFeeActionHandler().removeRange(index);
                            return { status: true, msg: "" };
                        }
                    },
                    class_styles: this.service_fee_class_styles.remove_range_btn_class_styles
                }
            )
        };
    }

    // Method to rebuild all repeatable service fee range rows.
    public buildRangeRows(): ServiceFeeConfigurationRangeRowUIInterface[] {
        return this.getServiceFeeActionHandler().form_data.ranges.map((range, index) => {
            return this.buildRangeRow(index);
        });
    }

    // Method to build the add range row button.
    private buildAddRangeButtonProps(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "add_service_fee_range",
            `${this.base_content_key}.fieldset.add_range_btn_text`,
            "plus_svg_icon",
            "button",
            {
                boolean_props: { disabled: false },
                action_props: { on_click: this.getServiceFeeActionHandler().addRange },
                class_styles: this.service_fee_class_styles.add_range_btn_class_styles
            }
        );
    }

    // Method to build the service fee form submit button.
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "service_fee_configuration_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to build the service fee form state.
    protected getUIStateData(): ServiceFeeConfigurationFormState {
        const state = super.getUIStateData();

        return {
            ...state,
            fee_type: this.getServiceFeeActionHandler().form_data.fee_type,
            range_rows: this.buildRangeRows(),
            add_range_btn_props: this.buildAddRangeButtonProps()
        };
    }

    // Method to initialize the service fee configuration CSRF token.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.SERVICE_FEE_CONFIGURATION);
    }
}

export default ServiceFeeConfigurationFormViewController;
