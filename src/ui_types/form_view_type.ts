import { Component, Ref } from "vue";

import {
    InputGroupUIPropsInterface,
    InputGroupUIClassStylesInterface
} from "@ui/version_3/ui_types/input_group_ui_type";

import {
    ToasterUIPropsInterface,
    ToasterUIClassStylesInterface
} from "@ui/version_3/ui_types/toaster_ui_type";

import { RegisteredAppPreviewRecordInterface } from "@/types/api_service_type";

import {
    LoginFieldsType,
    RegisteredAppFieldsType,
    CurrencyFieldsType,
    AppCurrencyFieldsType
} from "@/types/form_fields_type";

import {
    ButtonUIPropsInterface,
    ButtonUIClassStylesInterface,
    ButtonUIBooleanPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import {
    InputUIBooleanPropsInterface,
    InputUIClassStylesInterface,
    InputUIContentPayloadInterface,
    InputUIFilePropsInterface,
    InputUINumberPropsInterface,
    InputUIPropsInterface,
    InputValue
} from "@ui/version_3/ui_types/input_ui_type";
import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

interface BaseFormUIConfig {
    toaster_id: string;

    use_modal_button_styles?: boolean;

    submit_disabled?: boolean;

    submit_boolean_props?: ButtonUIBooleanPropsInterface;

    input_boolean_props?: InputUIBooleanPropsInterface;

    input_number_props?: InputUINumberPropsInterface;

    input_content_props?: InputUIContentPayloadInterface;

    input_file_props?: InputUIFilePropsInterface;
}

interface FormViewClassStylesInterface {
    wrapper_class_style: string;

    form_box_class_style: string;

    form_box_wrapper_class_style: string;

    header_text_class_style: string;

    fieldset_class_style: string;

    input_group_class_style: InputGroupUIClassStylesInterface;

    input_ui_class_styles: InputUIClassStylesInterface;

    toaster_ui_class_styles: ToasterUIClassStylesInterface;

    btn_class_styles: ButtonUIClassStylesInterface;

    spinner_class_style: string;

    modal_btn_class_styles?: ButtonUIClassStylesInterface;
}

type FormViewPropsWithClassStyles<ClassStyles> = {
    class_styles?: ClassStyles;
};

interface BaseFormInputGroupOptions {
    model_value?: InputValue;

    input_props?: Partial<InputUIPropsInterface>;

    input_group_class_styles?: InputGroupUIClassStylesInterface;
}

interface FormViewPropsInterface<T = any> {
    record?: T;

    class_styles?: FormViewClassStylesInterface;
}

interface AssignCurrencyFormViewPropsInterface extends FormViewPropsInterface {
    app_id: string;

    app?: RegisteredAppPreviewRecordInterface;

    currency_codes: string[];
}

interface FormViewComponentsInterface {
    HeaderTextUI: Component;
    InputGroupUI: Component;
    ToasterUI: Component;
    ButtonUI: Component;
}

interface FormViewComputedDataInterface {}

interface FormViewStateDataInterface<
    Fields extends Record<string, InputGroupUIPropsInterface> = Record<
        string,
        InputGroupUIPropsInterface
    >
> {
    header_text_props: HeaderTextUIPropsInterface;

    fields: Fields;

    toast_alert_props: ToasterUIPropsInterface;

    btn_props: ButtonUIPropsInterface;
}

type LoginViewStateDataInterface = FormViewStateDataInterface<LoginFieldsType>;

type RegisteredAppFormState = FormViewStateDataInterface<RegisteredAppFieldsType>;

type CurrencyFormState = FormViewStateDataInterface<CurrencyFieldsType>;

type AppCurrencyFormState = FormViewStateDataInterface<AppCurrencyFieldsType>;

export {
    BaseFormUIConfig,
    BaseFormInputGroupOptions,
    FormViewPropsWithClassStyles,
    FormViewPropsInterface,
    FormViewClassStylesInterface,
    FormViewComponentsInterface,
    FormViewComputedDataInterface,
    FormViewStateDataInterface,
    AssignCurrencyFormViewPropsInterface,
    LoginViewStateDataInterface,
    RegisteredAppFormState,
    CurrencyFormState,
    AppCurrencyFormState
};
