
import { reactive } from "vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    FormViewPropsInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    RegisteredAppFormState,
    FormViewClassStylesinterface
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";

import ToasterUI from "@ui/version_3/components/ToasterUI.vue";

import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import FormViewActionHandler from "@/action_handlers/registered_app/form_view_action_handler";





class FormViewController<T = any>  extends BaseController <
    FormViewPropsInterface<T>,
    RegisteredAppFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {

    public readonly class_styles: FormViewClassStylesinterface = FormViewClassStyles;

    public readonly action_handler: FormViewActionHandler = new FormViewActionHandler(this);

    constructor(props: FormViewPropsInterface<T>) {
        super("registered_app_form_view", props, EventBus);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): FormViewComponentsInterface { 
        return  { 
            InputGroupUI, 
            ToasterUI,
            ButtonUI
        }; 
    }

    // Method to get state data
    protected getUIStateData(): RegisteredAppFormState {
        const {
            input_ui_class_styles,
            toaster_ui_class_styles,
            btn_class_styles,
            modal_btn_class_styles
        } = this.class_styles;

        const existing_record           = (this?.props?.record) as RegisteredAppRecordInterface | undefined;
        const input_action_config       = this.action_handler.getInputActionHandlersConfig();
        const btn_action_config         = this.action_handler.getBtnActionHandlerConfig();
        const toaster_action_config     = this.action_handler.getToasterActionHandlerConfig()
        const input_group_content_key   = (input_id: string) => `content_resource.registered_app_view_ui.form_view_ui.fieldset.${input_id}_field`;
        const btn_content_key           = "content_resource.registered_app_view_ui.form_view_ui.fieldset.btn_text";

        InputUIPropsBuilder.configure(input_ui_class_styles, input_action_config);

        ToasterUIPropsBuilder.configure("registered_app_submit_toaster", toaster_ui_class_styles, toaster_action_config);

        ButtonUIPropsBuilder.configure(modal_btn_class_styles, btn_action_config, { disabled: true })

        const prefix_input_props = InputUIPropsBuilder.getReactivePropsObject(
            "prefix", 
            "text", 
            input_group_content_key("prefix"), 
            { model_value: existing_record?.prefix ?? "" }
        );

        const name_input_props = InputUIPropsBuilder.getReactivePropsObject(
            "name", 
            "text", 
            input_group_content_key("name"), 
            { model_value: existing_record?.name ?? "" }
        );

        const description_input_props = InputUIPropsBuilder.getReactivePropsObject(
            "description", 
            "textarea", 
            input_group_content_key("description"), 
            { 
                number_props: { rows: 12 }, 
                model_value: existing_record?.description ?? ""
            }
        );

        const base_url_input_props = InputUIPropsBuilder.getReactivePropsObject(
            "base_url", 
            "text", 
            input_group_content_key("base_url"),
            { model_value: existing_record?.base_url ?? "" }
        );

        const logo_url_input_props = InputUIPropsBuilder.getReactivePropsObject(
            "logo_url", 
            "file", 
            input_group_content_key("logo_url"),
            { 
                model_value: existing_record?.logo_url ?? "",
                action_props: {
                    on_change: this.action_handler.handleOnFileSelected
                },
                file_props: {
                    accept: "image/*",
                    multiple: false,
                    enable_preview: true
                }
            }
        );

        const urls_input_props = InputUIPropsBuilder.getReactivePropsObject(
            "urls", 
            "textarea", 
            input_group_content_key("urls"), 
            { 
                number_props: { rows: 12 },
                model_value: existing_record?.urls?.join(",") ?? ""
            }
        );

        return {
            fields: reactive({
                prefix_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(prefix_input_props, input_group_content_key("prefix")),

                name_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(name_input_props, input_group_content_key("name")),

                description_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(description_input_props, input_group_content_key("description")),

                base_url_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(base_url_input_props, input_group_content_key("base_url")),

                logo_url_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(logo_url_input_props, input_group_content_key("logo_url")),

                urls_input_group_props: InputGroupUIPropsBuilder.getReactivePropsObject(urls_input_props, input_group_content_key("urls")),
            }),

            toast_alert_props: ToasterUIPropsBuilder.getReactivePropsObject(),

            btn_props: ButtonUIPropsBuilder.getReactivePropsObject("registered_app_submit", btn_content_key, "paper_airplane_send_svg_icon"),
        } as RegisteredAppFormState;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        // set csrf token
        await this.action_handler.setCSRFToken(CSRF_TOKEN_FOR.REGISTER_APP);
    }

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        // clear scheduled timers
        this.action_handler.clearScheduledTimers()
    }

}

export default FormViewController