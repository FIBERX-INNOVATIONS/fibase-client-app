import { reactive } from "vue";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import {
    InputType,
    InputUIPropsInterface,
    InputValue,
    SelectOptionInterface
} from "@ui/version_3/ui_types/input_ui_type";

import {
    AssignCurrencyFormViewPropsInterface,
    FormViewComputedDataInterface,
    AppCurrencyFormState,
    FormViewComponentsInterface
} from "@/ui_types/form_view_type";

import AssignCurrencyFormViewActionHandler from "@/action_handlers/currency/assign_currency_form_view_action_handler";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import PreviewRecordFetcher from "@/utils/preview_record_fetcher";
import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";
import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";
import { AppCurrencyFieldsType } from "@/types/form_fields_type";
import { AppCurrencyFormDataInterface } from "@/types/form_data_type";

class AssignCurrencyFormViewController<T = any> extends BaseFormViewController<
    AppCurrencyFormDataInterface,
    AppCurrencyFieldsType,
    AssignCurrencyFormViewPropsInterface,
    AppCurrencyFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(props: AssignCurrencyFormViewPropsInterface) {
        super("assign_currency_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new AssignCurrencyFormViewActionHandler(this));
        this.getComponentDefinition();
    }

    protected getUIStateData(): AppCurrencyFormState {
        const { action = "assign", app, app_id, content_key, currency_codes } = this.props;
        const is_set_default_action = action === "set_default";

        const currency_list = currency_codes.map((code: string): SelectOptionInterface => {
            return { label_text: code, value: code };
        });
        const btn_content_key =
            action === "assign" || !content_key
                ? "content_resource.currency_view_ui.assign_currency_form_view_ui.fieldset.btn_text"
                : `${content_key}.content.confirm_btn_text`;

        this.configureFormUI({
            toaster_id: `${action}_currency_submit_toaster`,
            use_modal_button_styles: true
        });

        const input_group_content_key = (input_id: string): string => {
            return `content_resource.currency_view_ui.assign_currency_form_view_ui.fieldset.${input_id}_field`;
        };

        const build = (
            key: string,
            type: InputType,
            value: InputValue = "",
            overrides: Partial<InputUIPropsInterface> = {},
            content_key_input_id: string = key
        ): InputGroupUIPropsInterface => {
            return this.buildInputGroupProps(
                key,
                type,
                input_group_content_key(content_key_input_id),
                {
                    model_value: value,
                    input_props: overrides
                }
            );
        };

        return {
            fields: reactive({
                app_id_input_group_props: build(
                    "registered_app_id",
                    "select_search",
                    app_id ?? app?.public_id,
                    {
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                        }
                    }
                ),

                currency_code_list_input_group_props: build(
                    is_set_default_action ? "currency_code_or_id" : "currency_list",
                    is_set_default_action ? "select_search" : "multi_select_search",
                    is_set_default_action ? (currency_codes?.[0] ?? "") : (currency_codes ?? []),
                    {
                        option_props: currency_list,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                        }
                    },
                    "currency_list"
                )
            }),

            toast_alert_props: this.buildToasterProps(),

            btn_props: this.buildSubmitButtonProps(
                `${action}_app_currency_submit`,
                btn_content_key,
                is_set_default_action ? "check_circle_svg_icon" : "paper_airplane_send_svg_icon"
            )
        } as AppCurrencyFormState;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.APP_CURRECY);
    }
}

export default AssignCurrencyFormViewController;
