below is context on how components are build each component requires
- a type file
- a props definiton file
- a class styles file 
- a controller file
- a vue file
- a props builder file



import { Component, Ref } from "vue";

export interface InputUIContentOptionsInterface {
    loader_html_content?: string;

    caret_html_contewnt?: string;

    no_options_html_content?: string;
}

export interface InputUIBooleanPropsInterface {
    read_only?: boolean;

    is_checked?: boolean;

    is_loading?: boolean;

    cache_enabled?: boolean;

    required?: boolean;

    disabled?: boolean;
}

export interface InputUINumberPropsInterface {
    min?: number;

    max?: number;

    length?: number;

    rows?: number;

    step?: number
}

export interface ActionMethodRetrunInterface {
    status: boolean;
    msg: string;
    data?: Record<string, any>;
}

export interface InputUIActionPropsInterface {
    on_key_up?: (
        event?: KeyboardEvent, 
        input_value?: string | number | boolean | Array<any> | File | null,
        input_config?: { props: InputUIPropsInterface }
    ) => Promise<ActionMethodRetrunInterface>;

    on_key_down?: (
        event?: KeyboardEvent,
        input_value?: string | number | boolean | Array<any> | File | null,
        input_config?: { props: InputUIPropsInterface }
    ) => Promise<ActionMethodRetrunInterface>;

    on_change?: (
        event?: Event,
        input_value?: string | number | boolean | Array<any> | File | null,
        input_config?: { props: InputUIPropsInterface }
    ) => Promise<ActionMethodRetrunInterface>;

    on_click?: (
        event?: MouseEvent,
        input_value?: string | number | boolean | Array<any> | File | null,
        input_config?: { props: InputUIPropsInterface }
    ) => Promise<ActionMethodRetrunInterface>;

    set_error_text?: (error_text: string) => void;

    render_option_label?: (option: SelectOptionInterface) => string;

    get_option_value?: (option: SelectOptionInterface) => string | number;

    fetch_data_method?: (
        params: { page: number; search: string | null }
    ) => Promise<{ records: SelectOptionInterface[], total_pages: number }>;

}

export interface InputUIFilePropsInterface {
    accept?: string;
    
    multiple?: boolean;
}

export interface PhoneNumberCountryInfoInterface {
  name: string;
  iso2: string;
  dialCode: string;
  priority: number;
  areaCodes: string[] | null;
}

export interface PhoneNumberResultInterface {
  countryCallingCode: string;
  nationalNumber: string;
  number: string;
  country: PhoneNumberCountryInfoInterface;
  countryCode: string;
  valid: boolean;
  formatted: string;
}

/* ---------------------------------- */
/* Input Type                         */
/* ---------------------------------- */

export type InputType =
    | "text"
    | "textarea"
    | "number"
    | "checkbox"
    | "switch"
    | "select"
    | "select_search"
    | "phone_number"
    | "otp"
    | "file"
    | "password";


/* ---------------------------------- */
/* Select Option                      */
/* ---------------------------------- */

export interface SelectOptionInterface {
    label_text: string;
    value: string | number;
}


/* ---------------------------------- */
/* Class Styles                       */
/* ---------------------------------- */

export interface InputUIClassStylesInterface {
    input_class_style: string;

    wrapper_class_style: string;

    loader_class_style: string;

    switch_btn_class_style: string;

    knob_class_style: string;

    label_text_class_style: string;

    active_class_style: string;

    inactive_class_style: string;

    caret_icon_class: string;

    dropdown_wrapper_class_style: string;

    options_wrapper_class_style: string;

    option_class_style: string;

    option_content_class_style: string;

    input_readonly_class_style: string;

    helper_text_class_style: string;

    error_text_class_style: string;
}


/* ---------------------------------- */
/* Props Interface                    */
/* ---------------------------------- */

export interface InputUIPropsInterface {

    id?: string;

    switch_btn_id?: string;

    type: InputType;

    model_value?: string | number | boolean | Array<any> | File | null;

    placeholder_text?: string;

    content_props?: InputUIContentOptionsInterface;

    boolean_props?: InputUIBooleanPropsInterface;

    option_props?: SelectOptionInterface[];

    number_props?: InputUINumberPropsInterface;

    file_props?: InputUIFilePropsInterface;

    action_props?: InputUIActionPropsInterface;

    helper_text?: string;

    class_styles?: InputUIClassStylesInterface;

}


export interface InputUIStateDataInterface {
    input_value: string | number | boolean | Array<any> | File | null;

    error_text: string | null;

    is_loading: boolean;

    is_dropdown_open: boolean;

    record_options: SelectOptionInterface[],

    search_value: string | null;

    current_page: number;

    total_pages: number;
}

export interface InputUIComputedDataInterface {
    has_error: boolean;
}

export interface InputUIComponentsInterface {
    TextInputUI: Component;

    TextAreaInputUI: Component;

    CheckboxInputUI: Component;

    NumberInputUI: Component;

    SelectInputUI: Component;

    SelectSearchInputUI: Component;

    SwitchInputUI: Component;

    OtpInputUI: Component;

    FileInputUI: Component;

    PhoneNumberInputUI: Component;

}

export interface InputUIContentPayloadInterface {
    label_text?: string;

    placeholder_text?: string;

    helper_text?: string;

    options_list?: SelectOptionInterface[];

    required_text?: string;
}

import { PropType } from "vue";

import InputUIClassStyles from "../class_styles/input_ui_class_styles"
import {
    InputType,
    InputUIClassStylesInterface,
    InputUIContentOptionsInterface,
    InputUIBooleanPropsInterface,
    SelectOptionInterface,
    InputUINumberPropsInterface,
    InputUIActionPropsInterface,
    InputUIFilePropsInterface
} from "../ui_types/input_ui_type";


const InputUIProps = {

    id: { 
        type: String, 
        required: true,
    },

    switch_btn_id: { 
        type: String, 
        require: false 
    },

    type: { 
        type: String as PropType<InputType>,
        default: "text"
    },

    model_value: {
        type: [String, Number, Boolean, Array, Object] as PropType<string | number | boolean | Array<any> | File | null>,
        default: null,
        require: false
    },

    placeholder_text: { 
        type: String, 
        default: "", 
        require: false 
    },

    content_props: {
        type: Object as PropType<InputUIContentOptionsInterface>,
        default: () => ({})
    },

    boolean_props: {
        type: Object as PropType<InputUIBooleanPropsInterface>,
        default: () => ({})
    },

    option_props: {
        type: Array as PropType<Array<SelectOptionInterface>>,
        default: () => []
    },

    number_props: {
        type: Object as PropType<InputUINumberPropsInterface>,
        default: () => ({}) 
    },

    file_props: {
        type: Object as PropType<InputUIFilePropsInterface>,
        default: () => ({}) 
    },

    action_props: {
        type: Object as PropType<InputUIActionPropsInterface>,
        default: () => ({}) 
    },

    helper_text: { 
        type: String, 
        require: false,
        default: ""
    },

    error_text: { 
        type: String, 
        require: false,
        default: ""
    },



    class_styles: {
        type: Object as PropType<InputUIClassStylesInterface>,
        default: () => (InputUIClassStyles)
    }

};

export default InputUIProps;


import { InputUIClassStylesInterface } from "../ui_types/input_ui_type"

const InputUIClassStyles: InputUIClassStylesInterface = {
    input_class_style: "w-full py-2 px-1",
    wrapper_class_style: "flex gap-2 justify-center",
    loader_class_style: "",
    switch_btn_class_style: "group inline-flex h-6 w-11 transition",
    knob_class_style: "size-4 rounded-full transition transform",
    label_text_class_style: "ms-3",
    active_class_style: "bg-blue-300",
    inactive_class_style: "bg-gray-900",
    caret_icon_class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer",
    dropdown_wrapper_class_style: "absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto",
    options_wrapper_class_style: "",
    option_class_style: "px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm",
    option_content_class_style: "",
    input_readonly_class_style: "bg-gray-100 cursor-not-allowed",
    helper_text_class_style: "",
    error_text_class_style: "",
}


export default InputUIClassStyles;


class InputUIController extends BaseController<
    InputUIPropsInterface,
    InputUIStateDataInterface,
    InputUIComputedDataInterface,
    InputUIComponentsInterface
> {

    public action_handler: InputUIActionHandler = new InputUIActionHandler(this);

    constructor(props: InputUIPropsInterface) {
        super("input_ui", props);
        this.getComponentDefinition();
    }

    protected getUIComponents(): InputUIComponentsInterface {
        return {
            TextInputUI,
            TextAreaInputUI,
            CheckboxInputUI,
            NumberInputUI,
            SelectInputUI,
            SelectSearchInputUI,
            SwitchInputUI,
            PhoneNumberInputUI,
            OtpInputUI,
            FileInputUI
        } as InputUIComponentsInterface;
    }

    protected getUIStateData(): InputUIStateDataInterface {

        return {
            input_value: this.props.model_value ?? "",

            error_text: null,

            is_loading: false,

            is_dropdown_open: false,

            record_options: [],

            search_value: null,

            current_page: 1,

            total_pages: 0,
        };

    }

    protected getUIComputedData(): ComputedDefinitionType<InputUIComputedDataInterface> {

        return {

            has_error: () => !!this.state_refs.error_text

        };

    }

}

<template>
    <div :class="class_styles.wrapper_class_style">
        <input
            :id="id"
            :name="id"
            :type="type"
            :class="input_class_style"
            v-model="input_value"
            :placeholder="placeholder_text"
            :required="boolean_props.required"
            :readonly="boolean_props.read_only"
            :maxlength="number_props.length"
            :disabled="boolean_props.disabled"
            @input="action_handler?.handleOnInpuChange?.($event)"
            @keyup="action_handler?.handleOnKeyup?.($event)"
            @keydown="action_handler?.handleOnKeydown?.($event)"
            @click="action_handler?.handleOnClick?.($event)"
        />

        <span 
            v-if="helper_text"
            :class="class_styles.helper_text_class_style"
            v-html="helper_text"
        ></span>
        <span 
            v-if="error_text"xs
            :class="class_styles.error_text_class_style"
            v-html="error_text"
        ></span>
    </div>

</template>

<script setup lang="ts">
import InputUIProps      from "../../props/input_ui_props";
import InputUIController from "../../controllers/input_ui_controller";

const props         = defineProps(InputUIProps);
const controller    = new InputUIController(props);

const {
    id,
    type,
    placeholder_text,
    helper_text,
    class_styles,
    number_props,
    boolean_props
} = props

const {
    state_refs,
    action_handler
} = controller;

const {
    input_value,
    error_text
} = state_refs

const input_class_style = `
${class_styles.input_class_style}  
${boolean_props.read_only ? class_styles.input_readonly_class_style : ''}
`

</script>

import { reactive } from "vue";

import LoggerUtil from "../utils/logger_util";
import ContentManagerUtil from "../utils/content_manager_util";
import InputUIClassStyles from "../class_styles/input_ui_class_styles";

import {
    InputUIPropsInterface,
    InputUIClassStylesInterface,
    InputType,
    InputUIBooleanPropsInterface,
    InputUINumberPropsInterface,
    InputUIFilePropsInterface,
    InputUIActionPropsInterface,
    SelectOptionInterface,
    InputUIContentPayloadInterface
} from "../ui_types/input_ui_type";

class InputUIPropsBuilder {

    private static readonly name = "input_ui_props_builder";

    private static readonly logger = new LoggerUtil({
        prefix: InputUIPropsBuilder.name,
        show_timestamp: false
    });

    private static readonly content_manager =
        ContentManagerUtil.getInstance();


    /* ---------------------------------- */
    /* Global Configuration               */
    /* ---------------------------------- */

    public static class_styles?: InputUIClassStylesInterface;

    public static default_content_props?: InputUIContentPayloadInterface;

    public static default_boolean_props?: InputUIBooleanPropsInterface;

    public static default_number_props?: InputUINumberPropsInterface;

    public static default_file_props?: InputUIFilePropsInterface;

    public static default_action_props?: InputUIActionPropsInterface;


    /* ---------------------------------- */
    /* Setup                              */
    /* ---------------------------------- */

    public static configure(
        class_styles?: InputUIClassStylesInterface,
        action_props?: InputUIActionPropsInterface,
        content_props?: InputUIContentPayloadInterface,
        boolean_props?: InputUIBooleanPropsInterface,
        number_props?: InputUINumberPropsInterface,
        file_props?: InputUIFilePropsInterface,
    ): void {

        InputUIPropsBuilder.class_styles =
            class_styles || InputUIClassStyles;

        InputUIPropsBuilder.default_content_props =
            content_props || {};

        InputUIPropsBuilder.default_boolean_props =
            boolean_props || {};

        InputUIPropsBuilder.default_number_props =
            number_props || {};

        InputUIPropsBuilder.default_file_props =
            file_props || {};

        InputUIPropsBuilder.default_action_props =
            action_props || {};
    }


    /* ---------------------------------- */
    /* Content Fetch                      */
    /* ---------------------------------- */

    private static getContentProps(content_key?: string) {

        if (!content_key) return {};

        return (
            InputUIPropsBuilder.content_manager
                ?.get<InputUIContentPayloadInterface>(content_key) ?? {}
        );

    }


    /* ---------------------------------- */
    /* Build Props                        */
    /* ---------------------------------- */

    private static buildPropsObject(

        id: string,

        type: InputType = "text",

        content_key?: string,

        overrides: Partial<InputUIPropsInterface> = {}

    ): InputUIPropsInterface {

        const content_data =
            InputUIPropsBuilder.getContentProps(content_key);

        const placeholder_text =
            overrides.placeholder_text ??
            content_data?.placeholder_text ??
            "";

        const helper_text =
            overrides.helper_text ??
            content_data?.helper_text ??
            "";

        const option_props =
            overrides.option_props ??
            content_data?.options_list ??
            [];

        return {

            id,

            type,

            switch_btn_id:
                overrides.switch_btn_id ??
                `${id}_switch`,

            model_value:
                overrides.model_value ?? null,

            placeholder_text,

            helper_text,

            option_props,

            content_props: {
                ...InputUIPropsBuilder.default_content_props,
                ...overrides.content_props
            },

            boolean_props: {
                ...InputUIPropsBuilder.default_boolean_props,
                ...overrides.boolean_props
            },

            number_props: {
                ...InputUIPropsBuilder.default_number_props,
                ...overrides.number_props
            },

            file_props: {
                ...InputUIPropsBuilder.default_file_props,
                ...overrides.file_props
            },

            action_props: {
                ...InputUIPropsBuilder.default_action_props,
                ...overrides.action_props
            },

            class_styles:
                overrides.class_styles ??
                InputUIPropsBuilder.class_styles ??
                InputUIClassStyles

        };

    }


    /* ---------------------------------- */
    /* Public Builder                     */
    /* ---------------------------------- */

    public static getReactivePropsObject(

        id: string,

        type: InputType = "text",

        content_key?: string,

        overrides: Partial<InputUIPropsInterface> = {}

    ): InputUIPropsInterface {

        const props =
            InputUIPropsBuilder.buildPropsObject(
                id,
                type,
                content_key,
                overrides
            );

        return reactive<InputUIPropsInterface>(props);

    }

}

export default InputUIPropsBuilder;

i want you to use the above information to create a button componnt for me a button  can
- has a text / html content
- has a type
- has an id
- can be disbaled (disbaled class style)
- be clicked on
- be hovered on
- on click set the butto state ref is loading to true
- on is loading true can show loading content instead of normal btn text/html content