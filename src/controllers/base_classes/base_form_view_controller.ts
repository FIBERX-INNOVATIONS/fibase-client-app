import { markRaw } from "vue";

import { CSRFTokenForType } from "@/configs/constants";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { ToasterUIPropsInterface } from "@ui/version_3/ui_types/toaster_ui_type";

import { ButtonType, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { InputType, InputUIPropsInterface } from "@ui/version_3/ui_types/input_ui_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import ToasterUI from "@ui/version_3/components/ToasterUI.vue";

import HeaderTextUI from "@ui/version_3/components/HeaderTextUI.vue";

import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";

import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";

import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";

import InputGroupUIPropsBuilder from "@ui/version_3/props_builder/input_group_ui_props_builder";

import {
    HeaderTagType,
    HeaderTextUIPropsInterface
} from "@ui/version_3/ui_types/header_text_ui_type";

import {
    InputGroupUIClassStylesInterface,
    InputGroupUIPropsInterface
} from "@ui/version_3/ui_types/input_group_ui_type";

import {
    BaseFormUIConfig,
    BaseFormInputGroupOptions,
    FormViewClassStylesInterface,
    FormViewPropsWithClassStyles,
    FormViewStateDataInterface
} from "@/ui_types/form_view_type";

class BaseFormViewController<
    FormData extends Record<string, any>,
    Fields extends Record<string, InputGroupUIPropsInterface>,
    Props extends FormViewPropsWithClassStyles<FormViewClassStylesInterface>,
    State extends FormViewStateDataInterface<Fields>,
    Computed extends object,
    Components extends object,
    Events extends GlobalEventTypes = GlobalEventTypes
> extends BaseController<Props, State, Computed, Components, Events> {
    declare public action_handler: BaseFormActionHandler<
        FormData,
        Fields,
        Props,
        State,
        Computed,
        Components,
        Events
    >;

    public readonly class_styles: FormViewClassStylesInterface;

    constructor(
        component_name: string,
        props: Props,
        default_class_styles: FormViewClassStylesInterface
    ) {
        super(component_name, props, EventBus as any);

        this.class_styles = {
            ...default_class_styles,
            ...(props.class_styles ?? {})
        } as FormViewClassStylesInterface;
    }

    protected setFormActionHandler(
        action_handler: BaseFormActionHandler<
            FormData,
            Fields,
            Props,
            State,
            Computed,
            Components,
            Events
        >
    ): void {
        this.action_handler = action_handler;
        this.setActionHandler(action_handler);
    }

    protected configureFormUI(config: BaseFormUIConfig): void {
        const {
            input_ui_class_styles,
            input_group_class_style,
            btn_class_styles,
            modal_btn_class_styles,
            header_text_class_style
        } = this.class_styles;

        const button_class_styles = config.use_modal_button_styles
            ? (modal_btn_class_styles ?? btn_class_styles)
            : btn_class_styles;

        HeaderTextUIPropsBuilder.configure({
            text_class_style: header_text_class_style
        });

        InputGroupUIPropsBuilder.configure({
            class_styles: input_group_class_style
        });

        InputUIPropsBuilder.configure({
            class_styles: input_ui_class_styles,
            action_props: this.action_handler.getInputActionHandlersConfig(),
            boolean_props: config.input_boolean_props,
            number_props: config.input_number_props,
            content_props: config.input_content_props,
            file_props: config.input_file_props
        });

        ToasterUIPropsBuilder.configure({
            toaster_id: config.toaster_id,
            class_styles: this.class_styles.toaster_ui_class_styles,
            action_props: this.action_handler.getToasterActionHandlerConfig()
        });

        ButtonUIPropsBuilder.configure({
            class_styles: button_class_styles,
            action_props: this.action_handler.getBtnActionHandlerConfig(),
            boolean_props: {
                disabled: config.submit_disabled ?? true,
                ...(config.submit_boolean_props ?? {})
            }
        });
    }

    protected getFieldContentKey(base_content_key: string, input_id: string): string {
        return `${base_content_key}.fieldset.${input_id}_field`;
    }

    protected buildHeaderTextProps(
        content_key: string,
        header_tag: HeaderTagType = "h2"
    ): HeaderTextUIPropsInterface {
        return HeaderTextUIPropsBuilder.getReactivePropsObject(header_tag, content_key);
    }

    protected buildInputProps(
        id: string,
        type: InputType,
        content_key: string,
        overrides: Partial<InputUIPropsInterface> = {}
    ): InputUIPropsInterface {
        return InputUIPropsBuilder.getReactivePropsObject(id, type, content_key, overrides);
    }

    protected buildInputGroupFromInputProps(
        input_props: InputUIPropsInterface,
        content_key: string,
        class_styles?: InputGroupUIClassStylesInterface
    ): InputGroupUIPropsInterface {
        return InputGroupUIPropsBuilder.getReactivePropsObject(
            input_props,
            content_key,
            class_styles
        );
    }

    protected buildInputGroupProps(
        id: string,
        type: InputType,
        content_key: string,
        options: BaseFormInputGroupOptions = {}
    ): InputGroupUIPropsInterface {
        const input_props = this.buildInputProps(id, type, content_key, {
            ...("model_value" in options ? { model_value: options.model_value } : {}),
            ...(options.input_props ?? {})
        });

        return this.buildInputGroupFromInputProps(
            input_props,
            content_key,
            options.input_group_class_styles
        );
    }

    protected buildToasterProps(): ToasterUIPropsInterface {
        return ToasterUIPropsBuilder.getReactivePropsObject();
    }

    protected buildSubmitButtonProps(
        id: string,
        content_key: string,
        icon_key: SVGIconKey = "paper_airplane_send_svg_icon",
        type: ButtonType = "button",
        overrides: Partial<ButtonUIPropsInterface> = {},
        record: Record<string, any> = {}
    ): ButtonUIPropsInterface {
        return ButtonUIPropsBuilder.getReactivePropsObject(
            id,
            content_key,
            icon_key,
            type,
            overrides,
            record
        );
    }

    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps("content_resource.form_view_ui.header_text", "h2");
    }

    protected buildFormFieldsUI(): Fields {
        return {} as Fields;
    }

    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "form_submit",
            "content_resource.form_view_ui.submit_btn_text",
            "paper_airplane_send_svg_icon"
        );
    }

    protected async setFormCSRFToken(token_for: CSRFTokenForType | null): Promise<boolean> {
        return await this.action_handler.setCSRFToken(token_for);
    }

    protected getUIComponents(): Components {
        return {
            HeaderTextUI: markRaw(HeaderTextUI),
            InputGroupUI: markRaw(InputGroupUI),
            ToasterUI: markRaw(ToasterUI),
            ButtonUI: markRaw(ButtonUI)
        } as Components;
    }

    protected getUIStateData(): State {
        return {
            header_text_props: this.buildHeaderTextUIProps(),

            toast_alert_props: this.buildToasterProps(),

            fields: this.buildFormFieldsUI(),

            btn_props: this.buildFormBtnUI()
        } as State;
    }

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.action_handler.clearScheduledTimers();
    }
}

export default BaseFormViewController;
