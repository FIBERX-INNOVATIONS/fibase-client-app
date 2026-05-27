import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";

type LoginFieldsType = {
    username_input_group_props: InputGroupUIPropsInterface;
    password_input_group_props: InputGroupUIPropsInterface;
};

type TwoFactorLoginFieldsType = {
    otp_input_group_props: InputGroupUIPropsInterface;
};

type RegisteredAppFieldsType = {
    prefix_input_group_props: InputGroupUIPropsInterface;
    name_input_group_props: InputGroupUIPropsInterface;
    description_input_group_props: InputGroupUIPropsInterface;
    base_url_input_group_props: InputGroupUIPropsInterface;
    logo_url_input_group_props: InputGroupUIPropsInterface;
    urls_input_group_props: InputGroupUIPropsInterface;
};

type CurrencyFieldsType = {
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

type AppCurrencyFieldsType = {
    app_id_input_group_props: InputGroupUIPropsInterface;

    currency_code_list_input_group_props: InputGroupUIPropsInterface;
};

export {
    LoginFieldsType,
    TwoFactorLoginFieldsType,
    RegisteredAppFieldsType,
    CurrencyFieldsType,
    AppCurrencyFieldsType
};
