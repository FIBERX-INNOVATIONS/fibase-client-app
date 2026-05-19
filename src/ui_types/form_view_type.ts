import { Component, Ref } from "vue";

import { ButtonUIClassStylesInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    InputGroupUIClassStylesInterface,
    InputGroupUIPropsInterface
} from "@ui/version_3/ui_types/input_group_ui_type";

import { ToasterUIClassStylesInterface, ToasterUIPropsInterface } from "@ui/version_3/ui_types/toaster_ui_type";

import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";
import { RegisteredAppPreviewRecordInterface } from "@/types/api_service_type";

export interface FormViewClassStylesinterface {
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

export interface FormViewPropsInterface<T = any> {
    record?: T;

    class_styles?: FormViewClassStylesinterface;
}

export interface FormViewStateDataInterface<
    Fields extends Record<string, InputGroupUIPropsInterface> = Record<string, InputGroupUIPropsInterface>
> {
    fields: Fields;

    toast_alert_props: ToasterUIPropsInterface;

    btn_props: ButtonUIPropsInterface;
}

export interface FormViewComputedDataInterface {}

export interface FormViewComponentsInterface {
    InputGroupUI: Component;
    ToasterUI: Component;
    ButtonUI: Component;
}

type RegisteredAppFields = {
    prefix_input_group_props: InputGroupUIPropsInterface;
    name_input_group_props: InputGroupUIPropsInterface;
    description_input_group_props: InputGroupUIPropsInterface;
    base_url_input_group_props: InputGroupUIPropsInterface;
    logo_url_input_group_props: InputGroupUIPropsInterface;
    urls_input_group_props: InputGroupUIPropsInterface;
};

type CurrencyFields = {
    code_input_group_props: InputGroupUIPropsInterface;

    name_input_group_props: InputGroupUIPropsInterface;

    symbol_input_group_props: InputGroupUIPropsInterface;

    numeric_code_input_group_props: InputGroupUIPropsInterface;

    country_code_input_group_props: InputGroupUIPropsInterface;

    precision_input_group_props: InputGroupUIPropsInterface;

    minor_unit_input_group_props: InputGroupUIPropsInterface;

    format_input_group_props: InputGroupUIPropsInterface;

    sort_order_input_group_props: InputGroupUIPropsInterface;

    logo_url_input_group_props: InputGroupUIPropsInterface;

    is_fiat_input_group_props: InputGroupUIPropsInterface;
};

type AppCurrencyFields = {
    app_id_input_group_props: InputGroupUIPropsInterface;

    currency_code_list_input_group_props: InputGroupUIPropsInterface;
};

export type RegisteredAppFormState = FormViewStateDataInterface<RegisteredAppFields>;
export type CurrencyFormState = FormViewStateDataInterface<CurrencyFields>;
export type AppCurrencyFormState = FormViewStateDataInterface<AppCurrencyFields>;

export interface AssignCurrencyFormViewPropsInterface {
    app_id: string;

    app?: RegisteredAppPreviewRecordInterface;

    currency_codes: string[];

    class_styles?: FormViewClassStylesinterface;
}
