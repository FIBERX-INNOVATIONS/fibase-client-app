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
    AppCurrencyFormState,
    FormViewComponentsInterface,
    FormViewClassStylesInterface
} from "@/ui_types/form_view_type";

import AssignCurrencyFormViewActionHandler from "@/action_handlers/currency/assign_currency_form_view_action_handler";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import PreviewRecordFetcher from "@/utils/preview_record_fetcher";
import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";
import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";
import { AppCurrencyActionFromDataInterface } from "@/types/form_data_type";

class AssignCurrencyFormViewController<T = any> extends BaseFormViewController<
    AppCurrencyActionFromDataInterface,
    AssignCurrencyFormViewPropsInterface,
    AppCurrencyFormState,
    any,
    FormViewComponentsInterface,
    FormViewClassStylesInterface,
    AssignCurrencyFormViewActionHandler,
    GlobalEventTypes
> {
    constructor(props: AssignCurrencyFormViewPropsInterface) {
        super("assign_currency_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new AssignCurrencyFormViewActionHandler(this));
        this.getComponentDefinition();
    }

    protected getUIStateData(): AppCurrencyFormState {
        const { app, app_id, currency_codes } = this.props;

        const currency_list = currency_codes.map((code: string): SelectOptionInterface => {
            return { label_text: code, value: code };
        });
        const btn_content_key =
            "content_resource.currency_view_ui.assign_currency_form_view_ui.fieldset.btn_text";

        this.configureFormUI({
            toaster_id: "assign_currency_submit_toaster",
            use_modal_button_styles: true
        });

        const input_group_content_key = (input_id: string) => {
            return `content_resource.currency_view_ui.assign_currency_form_view_ui.fieldset.${input_id}_field`;
        };

        const build = (
            key: string,
            type: InputType,
            value: InputValue = "",
            overrides: Partial<InputUIPropsInterface> = {}
        ): InputGroupUIPropsInterface => {
            return this.buildInputGroupProps(key, type, input_group_content_key(key), {
                model_value: value,
                input_props: overrides
            });
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
                    "currency_list",
                    "multi_select_search",
                    currency_codes ?? [],
                    {
                        option_props: currency_list,
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                        }
                    }
                )
            }),

            toast_alert_props: this.buildToasterProps(),

            btn_props: this.buildSubmitButtonProps(
                "app_currency_submit",
                btn_content_key,
                "paper_airplane_send_svg_icon"
            )
        } as AppCurrencyFormState;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.APP_CURRECY);
    }
}

export default AssignCurrencyFormViewController;
