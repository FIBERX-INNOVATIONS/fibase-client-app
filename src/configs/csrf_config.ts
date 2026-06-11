export const CSRF_TOKEN_FOR = {
    LOGIN: "login",
    TWO_FACTOR: "two_factor_login",
    REGISTER_APP: "register_app",
    CURRENCY: "currency",
    PAYMENT_PROVIDER: "payment_provider",
    PAYMENT_PROVIDER_CONFIG: "payment_provider_config",
    PAYMENT_PROVIDER_METHOD: "payment_provider_method",
    CURRENCY_PAYMENT_PROVIDER_METHOD: "currency_payment_provider_method",
    PAYMENT_METHOD: "payment_method",
    MEMBER_PROFILE: "member",
    MEMBER_SETUP_LINK: "member_setup_link",
    APP_CURRECY: "app_currency"
} as const;

export type CSRFTokenForType = (typeof CSRF_TOKEN_FOR)[keyof typeof CSRF_TOKEN_FOR];
