import { reactive } from "vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { InputType, InputUIPropsInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import {
    FormViewPropsInterface,
    CurrencyFormState,
    FormViewComponentsInterface,
    FormViewClassStylesinterface
} from "@/ui_types/form_view_type";

import CurrencyFormViewActionHandler from "@/action_handlers/currency/form_view_action_handler";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";
import ToasterUI from "@ui/version_3/components/ToasterUI.vue";
import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";
import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";


class CurrencyFormViewController<T = any> extends BaseController<
    FormViewPropsInterface<T>,
    CurrencyFormState,
    any,
    FormViewComponentsInterface,
    GlobalEventTypes
> {

    public readonly class_styles: FormViewClassStylesinterface = FormViewClassStyles;
    public readonly action_handler = new CurrencyFormViewActionHandler(this);

    constructor(props: FormViewPropsInterface<T>) {
        super("currency_form_view", props, EventBus);
        this.getComponentDefinition();
    }

    protected getUIComponents(): FormViewComponentsInterface {
        return { InputGroupUI, ToasterUI, ButtonUI };
    }

    protected getUIStateData(): CurrencyFormState {

        const {
            input_ui_class_styles,
            toaster_ui_class_styles,
            btn_class_styles,
            modal_btn_class_styles
        } = this.class_styles;

        const record                    = this.props?.record as CurrencyRecordInterface;
        const input_action_config       = this.action_handler.getInputActionHandlersConfig();
        const btn_action_config         = this.action_handler.getBtnActionHandlerConfig();
        const toaster_action_config     = this.action_handler.getToasterActionHandlerConfig();
        const btn_content_key           = "content_resource.currency_view_ui.form_view_ui.fieldset.btn_text";

        InputUIPropsBuilder.configure(input_ui_class_styles, input_action_config);

        ToasterUIPropsBuilder.configure("currency_submit_toaster", toaster_ui_class_styles, toaster_action_config);

        ButtonUIPropsBuilder.configure(modal_btn_class_styles, btn_action_config, { disabled: true })

        

        const input_group_content_key   = (input_id: string) => {
            return `content_resource.currency_view_ui.form_view_ui.fieldset.${input_id}_field`;
        }

        const build = (
            key: string, 
            type: InputType, 
            value: InputValue = "",
            overrides: Partial<InputUIPropsInterface> = {}
        ): InputGroupUIPropsInterface => {
            return InputGroupUIPropsBuilder.getReactivePropsObject(
                InputUIPropsBuilder.getReactivePropsObject(
                    key, 
                    type, 
                    input_group_content_key(key), 
                    { 
                        model_value: value,
                        ...overrides
                    },
                    
                ),
                input_group_content_key(key)
            );
        }

        return {
            fields: reactive({
                code_input_group_props: build("code", "text", record?.code),

                name_input_group_props: build("name", "text", record?.name),

                symbol_input_group_props: build("symbol", "text", record?.symbol),

                numeric_code_input_group_props: build("numeric_code", "text", record?.numeric_code),

                country_code_input_group_props: build("country_code", "text", record?.country_code),

                precision_input_group_props: build("precision", "number", record?.precision),

                minor_unit_input_group_props: build("minor_unit", "number", record?.minor_unit),

                format_input_group_props: build("format", "text", record?.format),

                sort_order_input_group_props: build("sort_order", "number", record?.sort_order, { number_props: { min: 1 }}),

                logo_url_input_group_props: build(
                    "logo_url", 
                    "file", 
                    record?.logo_url,
                    {
                        action_props: {
                            on_change: this.action_handler.handleOnFileSelected
                        },
                        file_props: {
                            accept: "image/*",
                            multiple: false,
                            enable_preview: true
                        }
                    }
                ),

                is_fiat_input_group_props: build(
                    "is_fiat", 
                    "checkbox", 
                    record?.is_fiat,
                    {
                        boolean_props: {
                            is_checked: record?.is_active ?? false
                        }
                    }
                ),
            }),

            toast_alert_props: ToasterUIPropsBuilder.getReactivePropsObject(),

            btn_props: ButtonUIPropsBuilder.getReactivePropsObject("currency_submit", btn_content_key, "paper_airplane_send_svg_icon")
        } as CurrencyFormState;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler.setCSRFToken(CSRF_TOKEN_FOR.CURRENCY);
    }
}

export default CurrencyFormViewController;