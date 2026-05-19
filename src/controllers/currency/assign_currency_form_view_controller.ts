import { reactive } from "vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

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
    FormViewClassStylesinterface
} from "@/ui_types/form_view_type";

import AssignCurrencyFormViewActionHandler from "@/action_handlers/currency/assign_currency_form_view_action_handler";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";
import ToasterUI from "@ui/version_3/components/ToasterUI.vue";
import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";
import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import PreviewRecordFetcher from "@/utils/preview_record_fetcher";
import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";
import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

class AssignCurrencyFormViewController<T = any> extends BaseController<
    AssignCurrencyFormViewPropsInterface,
    AppCurrencyFormState,
    any,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: FormViewClassStylesinterface = FormViewClassStyles;
    public readonly action_handler = new AssignCurrencyFormViewActionHandler(this);

    constructor(props: AssignCurrencyFormViewPropsInterface) {
        super("assign_currency_form_view", props, EventBus);
        this.getComponentDefinition();
    }

    protected getUIComponents(): FormViewComponentsInterface {
        return { InputGroupUI, ToasterUI, ButtonUI };
    }

    protected getUIStateData(): AppCurrencyFormState {
        const { input_ui_class_styles, toaster_ui_class_styles, btn_class_styles, modal_btn_class_styles } =
            this.class_styles;

        const { app, app_id, currency_codes } = this.props;

        const currency_list = currency_codes.map((code: string): SelectOptionInterface => {
            return { label_text: code, value: code };
        });
        const input_action_config = this.action_handler.getInputActionHandlersConfig();
        const btn_action_config = this.action_handler.getBtnActionHandlerConfig();
        const toaster_action_config = this.action_handler.getToasterActionHandlerConfig();
        const btn_content_key = "content_resource.currency_view_ui.assign_currency_form_view_ui.fieldset.btn_text";

        InputUIPropsBuilder.configure(input_ui_class_styles, input_action_config);

        ToasterUIPropsBuilder.configure(
            "assign_currency_submit_toaster",
            toaster_ui_class_styles,
            toaster_action_config
        );

        ButtonUIPropsBuilder.configure(modal_btn_class_styles, btn_action_config, { disabled: true });

        const input_group_content_key = (input_id: string) => {
            return `content_resource.currency_view_ui.assign_currency_form_view_ui.fieldset.${input_id}_field`;
        };

        const build = (
            key: string,
            type: InputType,
            value: InputValue = "",
            overrides: Partial<InputUIPropsInterface> = {}
        ): InputGroupUIPropsInterface => {
            return InputGroupUIPropsBuilder.getReactivePropsObject(
                InputUIPropsBuilder.getReactivePropsObject(key, type, input_group_content_key(key), {
                    model_value: value,
                    ...overrides
                }),
                input_group_content_key(key)
            );
        };

        return {
            fields: reactive({
                app_id_input_group_props: build("registered_app_id", "select_search", app_id ?? app?.public_id, {
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                    }
                }),

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

            toast_alert_props: ToasterUIPropsBuilder.getReactivePropsObject(),

            btn_props: ButtonUIPropsBuilder.getReactivePropsObject(
                "app_currency_submit",
                btn_content_key,
                "paper_airplane_send_svg_icon"
            )
        } as AppCurrencyFormState;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler.setCSRFToken(CSRF_TOKEN_FOR.APP_CURRECY);
    }
}

export default AssignCurrencyFormViewController;
