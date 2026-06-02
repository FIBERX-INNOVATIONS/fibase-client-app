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

    sort_order_input_group_props: InputGroupUIPropsInterface;

    logo_url_input_group_props: InputGroupUIPropsInterface;

    is_fiat_input_group_props: InputGroupUIPropsInterface;
};

type PaymentMethodFieldsType = {
    code_input_group_props: InputGroupUIPropsInterface;

    name_input_group_props: InputGroupUIPropsInterface;

    description_input_group_props: InputGroupUIPropsInterface;

    icon_url_input_group_props: InputGroupUIPropsInterface;

    sort_order_input_group_props: InputGroupUIPropsInterface;

    display_name_input_group_props: InputGroupUIPropsInterface;

    display_description_input_group_props: InputGroupUIPropsInterface;

    display_group_input_group_props: InputGroupUIPropsInterface;

    processing_time_text_input_group_props: InputGroupUIPropsInterface;

    fee_label_input_group_props: InputGroupUIPropsInterface;

    supported_country_codes_input_group_props: InputGroupUIPropsInterface;

    supported_currency_codes_input_group_props: InputGroupUIPropsInterface;

    requires_redirect_input_group_props: InputGroupUIPropsInterface;

    supports_deposit_input_group_props: InputGroupUIPropsInterface;

    supports_withdrawal_input_group_props: InputGroupUIPropsInterface;

    supports_refund_input_group_props: InputGroupUIPropsInterface;

    min_amount_input_group_props: InputGroupUIPropsInterface;

    max_amount_input_group_props: InputGroupUIPropsInterface;
};

type PaymentProviderFieldsType = {
    code_input_group_props: InputGroupUIPropsInterface;

    name_input_group_props: InputGroupUIPropsInterface;

    description_input_group_props: InputGroupUIPropsInterface;

    provider_type_input_group_props: InputGroupUIPropsInterface;

    logo_url_input_group_props: InputGroupUIPropsInterface;

    website_url_input_group_props: InputGroupUIPropsInterface;
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
    PaymentMethodFieldsType,
    PaymentProviderFieldsType,
    AppCurrencyFieldsType
};
