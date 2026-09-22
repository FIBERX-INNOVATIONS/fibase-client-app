// Backend permission names shared by routes, views, actions, and API services.
export const ACCESS_CONTROL_PERMISSIONS = {
    LIST: "access_control_module.get_role_list",
    CREATE: "access_control_module.create_role",
    UPDATE: "access_control_module.update_role",
    DELETE: "access_control_module.delete_role",
    ASSIGN_ACTOR_ROLES: "access_control_module.assign_actor_roles",
    ASSIGN_OR_UNASSIGN_ROLE_PERMISSIONS: "access_control_module.assign_or_unassign_role_permissions",
    ROLE_PERMISSION_LIST: "access_control_module.get_role_permission_list",
    UNASSIGN_ACTOR_ROLES: "access_control_module.unassign_actor_roles"
} as const;

export const ACTIVITY_PERMISSIONS = {
    LIST: "activity_module.get_activity_list"
} as const;

export const APP_WEBHOOK_DELIVERY_PERMISSIONS = {
    LIST: "app_webhook_delivery_management_module.get_delivery_list",
    VIEW: "app_webhook_delivery_management_module.get_delivery",
    REPLAY: "app_webhook_delivery_management_module.replay_delivery",
    TEST: "app_webhook_delivery_management_module.test_delivery"
} as const;

export const CURRENCY_PAYMENT_PROVIDER_METHOD_PERMISSIONS = {
    LIST: "currency_payment_provider_method_module.get_currency_payment_provider_method_list",
    VIEW: "currency_payment_provider_method_module.get_currency_payment_provider_method",
    CREATE: "currency_payment_provider_method_module.create_currency_payment_provider_method",
    UPDATE: "currency_payment_provider_method_module.update_currency_payment_provider_method",
    UPDATE_STATUS: "currency_payment_provider_method_module.update_currency_payment_provider_method_status",
    DELETE: "currency_payment_provider_method_module.delete_currency_payment_provider_method"
} as const;

export const CURRENCY_PERMISSIONS = {
    LIST: "currency_module.get_currency_list",
    VIEW: "currency_module.get_currency",
    CREATE: "currency_module.create_currency",
    UPDATE: "currency_module.update_currency",
    UPDATE_STATUS: "currency_module.update_currency_status",
    DELETE: "currency_module.delete_currency",
    ASSIGN_OR_UNASSIGN_APP_CURRENCY: "currency_module.assign_or_unassign_a_currency_to_an_app",
    UPDATE_DEFAULT: "currency_module.update_default_currency"
} as const;

export const IDENTITY_PERMISSIONS = {
    LIST: "identity_module.get_identity_list",
    VIEW: "identity_module.get_identity",
    WALLET_LIST: "identity_module.get_identity_wallet_list"
} as const;

export const MEMBER_DEVICE_PERMISSIONS = {
    LOGOUT_ALL_SESSIONS: "member_device_module.logout_all_member_device_login_sessions",
    LOGOUT_SESSION: "member_device_module.logout_member_device_login_session"
} as const;

export const MEMBER_PROFILE_PERMISSIONS = {
    LIST: "member_profile_module.get_member_list",
    VIEW: "member_profile_module.get_member",
    CREATE: "member_profile_module.create_member",
    UPDATE: "member_profile_module.update_member",
    UPDATE_STATUS: "member_profile_module.update_member_status",
    DELETE: "member_profile_module.delete_member",
    RESTORE: "member_profile_module.restore_member",
    SEND_ACTIVATION_LINK: "member_profile_module.send_member_activation_link"
} as const;

export const PAYMENT_METHOD_PERMISSIONS = {
    LIST: "payment_method_module.get_payment_method_list",
    VIEW: "payment_method_module.get_payment_method",
    CREATE: "payment_method_module.create_payment_method",
    UPDATE: "payment_method_module.update_payment_method",
    UPDATE_STATUS: "payment_method_module.update_payment_method_status",
    DELETE: "payment_method_module.delete_payment_method"
} as const;

export const PAYMENT_PROVIDER_CONFIG_PERMISSIONS = {
    LIST: "payment_provider_config_module.get_payment_provider_config_list",
    VIEW: "payment_provider_config_module.get_payment_provider_config",
    CREATE: "payment_provider_config_module.create_payment_provider_config",
    UPDATE: "payment_provider_config_module.update_payment_provider_config",
    DELETE: "payment_provider_config_module.delete_payment_provider_config",
    VIEW_CREDENTIALS: "payment_provider_config_module.get_payment_provider_config_credentials"
} as const;

export const PAYMENT_PROVIDER_METHOD_PERMISSIONS = {
    LIST: "payment_provider_method_module.get_payment_provider_method_list",
    VIEW: "payment_provider_method_module.get_payment_provider_method",
    CREATE: "payment_provider_method_module.create_payment_provider_method",
    UPDATE: "payment_provider_method_module.update_payment_provider_method",
    UPDATE_STATUS: "payment_provider_method_module.update_payment_provider_method_status",
    DELETE: "payment_provider_method_module.delete_payment_provider_method"
} as const;

export const PAYMENT_PROVIDER_PERMISSIONS = {
    LIST: "payment_provider_module.get_payment_provider_list",
    VIEW: "payment_provider_module.get_payment_provider",
    CREATE: "payment_provider_module.create_payment_provider",
    UPDATE: "payment_provider_module.update_payment_provider",
    UPDATE_STATUS: "payment_provider_module.update_payment_provider_status",
    DELETE: "payment_provider_module.delete_payment_provider"
} as const;

export const REGISTERED_APP_PERMISSIONS = {
    LIST: "registered_app_module.get_registered_app_list",
    VIEW: "registered_app_module.get_registered_app",
    CREATE: "registered_app_module.create_registered_app",
    UPDATE: "registered_app_module.update_registered_app",
    UPDATE_STATUS: "registered_app_module.update_registered_app_status",
    DELETE: "registered_app_module.delete_registered_app"
} as const;

export const SERVICE_FEE_CONFIGURATION_PERMISSIONS = {
    LIST: "service_fee_configuration_module.get_service_fee_configuration_list",
    VIEW: "service_fee_configuration_module.get_service_fee_configuration",
    CREATE: "service_fee_configuration_module.create_service_fee_configuration",
    UPDATE: "service_fee_configuration_module.update_service_fee_configuration",
    UPDATE_STATUS: "service_fee_configuration_module.update_service_fee_configuration_status"
} as const;

export const TRANSACTION_PERMISSIONS = {
    LIST: "transaction_module.get_transaction_list",
    VIEW: "transaction_module.get_transaction",
    LEDGER_LIST: "transaction_module.get_transaction_ledger_list",
    RECEIPT_LIST: "transaction_module.get_transaction_receipt_list"
} as const;

export const WALLET_PERMISSIONS = {
    VIEW: "wallet_module.get_wallet",
    LEDGER_LIST: "wallet_module.get_wallet_ledger_list"
} as const;

// Explicit create permissions for modules using the shared list header.
export const LIST_VIEW_CREATE_PERMISSIONS: Readonly<Record<string, string>> = {
    access_control: ACCESS_CONTROL_PERMISSIONS.CREATE,
    currency: CURRENCY_PERMISSIONS.CREATE,
    currency_payment_provider_method: CURRENCY_PAYMENT_PROVIDER_METHOD_PERMISSIONS.CREATE,
    member_profile: MEMBER_PROFILE_PERMISSIONS.CREATE,
    payment_method: PAYMENT_METHOD_PERMISSIONS.CREATE,
    payment_provider: PAYMENT_PROVIDER_PERMISSIONS.CREATE,
    payment_provider_config: PAYMENT_PROVIDER_CONFIG_PERMISSIONS.CREATE,
    payment_provider_method: PAYMENT_PROVIDER_METHOD_PERMISSIONS.CREATE,
    registered_app: REGISTERED_APP_PERMISSIONS.CREATE,
    service_fee_configuration: SERVICE_FEE_CONFIGURATION_PERMISSIONS.CREATE
};

export const MY_WALLET_PERMISSIONS = {
    CURRENCY_LIST: "my_wallet_management_module.get_my_wallet_currency_list",
    PAYMENT_OPTIONS: "my_wallet_management_module.get_my_wallet_currency_payment_options",
    LIST: "my_wallet_management_module.get_my_wallet_list",
    RESOLVE: "my_wallet_management_module.resolve_my_wallet_currency",
    VIEW: "my_wallet_management_module.get_my_wallet_currency",
    TRANSACTION_LIST: "my_wallet_management_module.get_my_wallet_transaction_list",
    CREATE_INTENT: "my_wallet_management_module.create_my_wallet_transaction_intent",
    INITIATE: "my_wallet_management_module.initiate_my_wallet_transaction",
    WITHDRAWAL_APPROVAL: "my_wallet_management_module.decide_my_wallet_withdrawal_approval",
    VERIFY: "my_wallet_management_module.verify_my_wallet_transaction",
    TRANSACTION_VIEW: "my_wallet_management_module.get_my_wallet_transaction"
} as const;
