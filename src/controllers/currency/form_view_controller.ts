import { reactive } from "vue";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { InputType, InputUIPropsInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import {
    FormViewPropsInterface,
    CurrencyFormState,
    FormViewComponentsInterface,
    FormViewClassStylesInterface
} from "@/ui_types/form_view_type";

import CurrencyFormViewActionHandler from "@/action_handlers/currency/form_view_action_handler";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";
import { CurrencyFromDataInterface } from "@/types/form_data_type";

class CurrencyFormViewController<T = any> extends BaseFormViewController<
    CurrencyFromDataInterface,
    FormViewPropsInterface<T>,
    CurrencyFormState,
    any,
    FormViewComponentsInterface,
    FormViewClassStylesInterface,
    CurrencyFormViewActionHandler,
    GlobalEventTypes
> {
    constructor(props: FormViewPropsInterface<T>) {
        super("currency_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new CurrencyFormViewActionHandler(this));
        this.getComponentDefinition();
    }

    protected getUIStateData(): CurrencyFormState {
        const record = this.props?.record as CurrencyRecordInterface;
        const btn_content_key = "content_resource.currency_view_ui.form_view_ui.fieldset.btn_text";

        this.configureFormUI({
            toaster_id: "currency_submit_toaster",
            use_modal_button_styles: true
        });

        const input_group_content_key = (input_id: string) => {
            return `content_resource.currency_view_ui.form_view_ui.fieldset.${input_id}_field`;
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
                code_input_group_props: build("code", "text", record?.code),

                name_input_group_props: build("name", "text", record?.name),

                symbol_input_group_props: build("symbol", "text", record?.symbol),

                numeric_code_input_group_props: build("numeric_code", "text", record?.numeric_code),

                country_code_input_group_props: build("country_code", "text", record?.country_code),

                precision_input_group_props: build("precision", "number", record?.precision),

                minor_unit_input_group_props: build("minor_unit", "number", record?.minor_unit),

                format_input_group_props: build("format", "text", record?.format),

                sort_order_input_group_props: build("sort_order", "number", record?.sort_order, {
                    number_props: { min: 1 }
                }),

                logo_url_input_group_props: build("logo_url", "file", record?.logo_url, {
                    action_props: {
                        on_change: this.action_handler.handleOnFileSelected
                    },
                    file_props: {
                        accept: "image/*",
                        multiple: false,
                        enable_preview: true
                    }
                }),

                is_fiat_input_group_props: build("is_fiat", "checkbox", record?.is_fiat, {
                    boolean_props: {
                        is_checked: record?.is_active ?? false
                    }
                })
            }),

            toast_alert_props: this.buildToasterProps(),

            btn_props: this.buildSubmitButtonProps(
                "currency_submit",
                btn_content_key,
                "paper_airplane_send_svg_icon"
            )
        } as CurrencyFormState;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.CURRENCY);
    }
}

export default CurrencyFormViewController;
