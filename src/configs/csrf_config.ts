export const CSRF_TOKEN_FOR = {
    LOGIN: "login",
    TWO_FACTOR: "two_factor_login",
    REGISTER_APP: "register_app",
    CURRENCY: "currency",
    PAYMENT_PROVIDER: "payment_provider",
    PAYMENT_PROVIDER_CONFIG: "payment_provider_config",
    PAYMENT_PROVIDER_METHOD: "payment_provider_method",
    CURRENCY_PAYMENT_PROVIDER_METHOD: "currency_payment_provider_method",
    SERVICE_FEE_CONFIGURATION: "service_fee_configuration",
    PAYMENT_METHOD: "payment_method",
    ACCESS_CONTROL_ROLE: "access_control_role",
    ACCESS_CONTROL_ACTOR_ROLE: "access_control_actor_role",
    MEMBER_PROFILE: "member",
    MEMBER_SETUP_LINK: "member_setup_link",
    APP_CURRECY: "app_currency",
    ACCESS_CONTROL_ROLE_PERMISSION: "access_control_role_permission"
} as const;

export type CSRFTokenForType = (typeof CSRF_TOKEN_FOR)[keyof typeof CSRF_TOKEN_FOR];
