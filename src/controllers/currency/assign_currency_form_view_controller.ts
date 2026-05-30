import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { AppCurrencyFieldsType } from "@/types/form_fields_type";

import { AppCurrencyFormDataInterface } from "@/types/form_data_type";

import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    AssignCurrencyFormViewPropsInterface,
    AppCurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import AssignCurrencyFormViewActionHandler from "@/action_handlers/currency/assign_currency_form_view_action_handler";

class AssignCurrencyFormViewController<T = any> extends BaseFormViewController<
    AppCurrencyFormDataInterface,
    AppCurrencyFieldsType,
    AssignCurrencyFormViewPropsInterface,
    AppCurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key =
        "content_resource.currency_view_ui.assign_currency_form_view_ui";

    constructor(props: AssignCurrencyFormViewPropsInterface) {
        super("assign_currency_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new AssignCurrencyFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: `${props.action}_currency_submit_toaster`,
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI
    protected buildFormFieldsUI(): AppCurrencyFieldsType {
        const { app: record, app_id, currency_codes } = this.props;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        const currency_list = currency_codes.map((code: string): SelectOptionInterface => {
            return { label_text: code, value: code };
        });

        return {
            app_id_input_group_props: this.buildInputGroupProps(
                "registered_app_id",
                "select_search",
                field_content_key("registered_app_id"),
                {
                    model_value: app_id ?? record?.public_id ?? "",
                    input_props: {
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                        }
                    }
                }
            ),

            currency_code_list_input_group_props: this.buildInputGroupProps(
                "currency_list",
                "multi_select_search",
                field_content_key("currency_list"),
                {
                    model_value: currency_codes ?? [],
                    input_props: {
                        option_props: currency_list,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords,
                            fetch_data_params: { app_id, unassigned_to_app: true }
                        }
                    }
                }
            )
        };
    }

    // Method to build form button ui
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            `${this.props.action}_app_currency_submit_btn`,
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.APP_CURRECY);
    }
}

export default AssignCurrencyFormViewController;
