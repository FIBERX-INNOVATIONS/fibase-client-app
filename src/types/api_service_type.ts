import {
    CurrencyPaymentProviderMethodListViewFiltersInterface,
    MemberListFiltersInterface,
    ActivityListFiltersInterface,
    RoleListFiltersInterface,
    PaymentMethodListViewFiltersInterface,
    PaymentProviderListViewFiltersInterface,
    PaymentProviderConfigListViewFiltersInterface,
    PaymentProviderMethodListViewFiltersInterface
} from "./list_view_filter_type";

export interface CSRFTokenRecordInterface {
    token: string;
    expires_at: string;
    csrf_token_for: string;
}

export interface PaginatedResponseResultInterface<T> {
    total_items: number;
    total_pages: number;
    current_page: number;
    records: T;
}

export interface ActorRoleInterface {
    id: string;
    name: string;
    symbol: string;
    display_name?: string;
    is_system_role?: boolean;
    is_member_group?: boolean;
}

export interface MemberAuthRecordInterface {
    id: string;
    login_attempts: number;
    account_locked_until: string | null;
    password_changed_at: string | null;
    last_password_reset_request_at: string | null;
}

export interface MemberActorRoleInterface {
    id: string;
    role_id: string;
    actor_type: "member" | "app" | string;
    is_active: boolean;
    expires_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    role: ActorRoleInterface;
}

export interface MemberRecordInterface {
    public_id: string;

    id?: string;

    username: string;

    email: string;

    phone: string;

    full_name?: string;

    first_name: string;

    last_name: string;

    dob: string; // ISO Date string

    gender: "Male" | "Female" | "Other" | string;

    profile_photo_link: string;

    is_active: boolean;

    is_2fa_enabled: boolean;

    is_verified: boolean;

    roles?: ActorRoleInterface[];

    actor_roles?: MemberActorRoleInterface[];

    is_fully_authenticated: boolean;

    member_auth?: MemberAuthRecordInterface | null;

    is_locked?: boolean;

    is_deleted?: boolean;

    delete_reason?: string | null;

    created_at?: string | null;

    updated_at?: string | null;
}

export interface AuthAccessRecordInterface {
    access_token: string;

    expires_in_mins: number;

    permissions: string[];
}

export interface AuthenticatedMemberRecordInterface extends AuthAccessRecordInterface {
    current_member: MemberRecordInterface;
}

export interface TwoFactorAuthenticatedMemberRecordInterface extends AuthAccessRecordInterface {
    current_member: MemberRecordInterface;

    permissions: string[];
}

export interface CreatorUpdatorMemberinterface {
    public_id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_verified: boolean;
    profile_photo_link: string;
    roles?: ActorRoleInterface[];
}

export interface RegisteredAppAuthInterface {
    id: string;
    key_algorithm: string; // e.g. "rsa"
    key_version: number;
    last_key_rotated_at: string;
    created_at: string;
    updated_at: string;
}

export interface RegisteredAppRecordInterface {
    public_id: string;
    prefix: string;
    name: string;

    description?: string;

    base_url: string;
    logo_url: string;

    social_links?: Record<string, string | null> | null;

    urls?: string[] | null;

    is_active: boolean;

    created_at?: string | null;
    updated_at?: string | null;

    creator?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;

    updater?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;

    roles?: ActorRoleInterface[];

    auth?: RegisteredAppAuthInterface | null;
}

export interface RegisteredAppStatusUpdateResponseInterface {
    safe_app: RegisteredAppRecordInterface;
    private_key?: string | null;
    previous_status: boolean;
    new_status: boolean;
}

export const getMemberFullName = (
    member?: CreatorUpdatorMemberinterface | MemberRecordInterface | null
): string => {
    if (!member) {
        return "";
    }

    const { first_name, last_name } = member;
    return first_name && last_name ? `${first_name} ${last_name}` : "";
};

export interface FileStorageRecordInterface {
    public_id: string;
    reference_type: string;
    file_name: string;
    original_name: string;
    mime_type: string;
    category: string;
    size: string; // raw
    url: string;
    is_active: boolean;
    created_at: string;
}

export interface RegisteredAppPreviewRecordInterface {
    public_id: string;
    prefix: string;
    name: string;
    is_active: boolean;
    logo_url: string;
    created_at?: string | null;
    updated_at?: string | null;
}

export interface AppCurrencyRecordinterface {
    is_default: boolean;
    created_at?: string;
    updated_at?: string;
    app?: RegisteredAppPreviewRecordInterface;
}

export interface CurrencyRecordInterface {
    id?: number;
    code: string;
    numeric_code: string | null;
    logo_url: string | null;
    name: string;
    symbol: string;
    precision: number;
    minor_unit: number | null;
    format: string | null;
    country_code: string | null;
    sort_order: number;

    is_fiat: boolean;
    is_active: boolean;

    created_at?: string;
    updated_at?: string | null;

    app_currencies?: AppCurrencyRecordinterface[];
    creator?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
    updater?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
}

export type CurrencyListResponseInterface = PaginatedResponseResultInterface<
    CurrencyRecordInterface[]
>;

export interface CurrencyStatusUpdateResponseInterface {
    safe_app: CurrencyRecordInterface;
    previous_status: boolean;
    new_status: boolean;
}

export type AppCurrencyActionResponseInterface = boolean;

export type PaymentConfigDirectionType = "deposit" | "withdrawal";

export type PaymentProviderConfigEnvironmentType = "test" | "live";

export interface PaymentMethodMetadataInterface {
    display_name?: string | null;
    display_description?: string | null;
    display_group?: string | null;
    processing_time_text?: string | null;
    fee_label?: string | null;
    supported_country_codes?: string[];
    supported_currency_codes?: string[];
    requires_redirect?: boolean;
    supports_deposit?: boolean;
    supports_withdrawal?: boolean;
    supports_refund?: boolean;
    min_amount?: number | null;
    max_amount?: number | null;
}

export interface PaymentMethodRecordInterface {
    code: string;
    name: string;
    description: string | null;
    icon_url: string | null;
    sort_order: number;
    metadata: PaymentMethodMetadataInterface | null;
    is_active: boolean;
    created_at: string;
    updated_at: string | null;
    creator?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
    updater?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
}

export interface PaymentProviderRecordInterface {
    id?: number;
    code: string;
    name: string;
    description: string | null;
    provider_type: string;
    logo_url: string | null;
    website_url: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string | null;
    creator?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
    updater?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
}

export interface PaymentProviderConfigCredentialsInterface {
    api_key?: string | null;
    secret_key?: string | null;
    public_key?: string | null;
    private_key?: string | null;
    client_id?: string | null;
    client_secret?: string | null;
    merchant_id?: string | null;
    account_id?: string | null;
    username?: string | null;
    password?: string | null;
    webhook_hash?: string | null;
    webhook_secret?: string | null;
    signing_secret?: string | null;
    [key: string]: string | null | undefined;
}

export interface PaymentProviderConfigCredentialsResponseInterface {
    credentials: PaymentProviderConfigCredentialsInterface | null;
}

export interface PaymentProviderConfigSettingsInterface {
    webhook_url?: string | null;
    callback_url?: string | null;
    redirect_url?: string | null;
    success_url?: string | null;
    failure_url?: string | null;
    settlement_currency?: string | null;
    default_currency?: string | null;
    payout_schedule?: string | null;
    capture_mode?: string | null;
    timeout_ms?: string | null;
    [key: string]: string | null | undefined;
}

export interface PaymentProviderConfigRecordInterface {
    id?: number;
    provider_id: number;
    environment: PaymentProviderConfigEnvironmentType;
    account_reference: string | null;
    settings: PaymentProviderConfigSettingsInterface | null;
    created_at: string;
    updated_at: string | null;
    provider?: PaymentProviderRecordInterface;
    creator?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
    updater?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
}

export interface PaymentProviderMethodRecordInterface {
    id?: number;
    provider_id: number;
    payment_method_id: number;
    direction: PaymentConfigDirectionType;
    provider_method_code: string | null;
    min_amount: number | null;
    max_amount: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string | null;
    provider?: PaymentProviderRecordInterface;
    payment_method?: PaymentMethodRecordInterface;
    linked_by_member?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
}

export interface CurrencyPaymentProviderMethodRecordInterface {
    id: number;
    currency_id?: number;
    provider_method_id?: number;
    min_amount: number | null;
    max_amount: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string | null;
    currency?: CurrencyRecordInterface;
    provider_method?: PaymentProviderMethodRecordInterface;
    linked_by_member?: CreatorUpdatorMemberinterface | MemberRecordInterface | null;
}

export type PaymentMethodListResponseInterface = PaginatedResponseResultInterface<
    PaymentMethodRecordInterface[]
>;

export type PaymentProviderListResponseInterface = PaginatedResponseResultInterface<
    PaymentProviderRecordInterface[]
>;

export type PaymentProviderConfigListResponseInterface = PaginatedResponseResultInterface<
    PaymentProviderConfigRecordInterface[]
>;

export type PaymentProviderMethodListResponseInterface = PaginatedResponseResultInterface<
    PaymentProviderMethodRecordInterface[]
>;

export type CurrencyPaymentProviderMethodListResponseInterface = PaginatedResponseResultInterface<
    CurrencyPaymentProviderMethodRecordInterface[]
>;

export interface PaymentMethodStatusUpdateResponseInterface {
    payment_method: PaymentMethodRecordInterface;
    previous_status: boolean;
    new_status: boolean;
}

export interface PaymentProviderStatusUpdateResponseInterface {
    payment_provider: PaymentProviderRecordInterface;
    previous_status: boolean;
    new_status: boolean;
}

export interface PaymentProviderMethodStatusUpdateResponseInterface {
    payment_provider_method: PaymentProviderMethodRecordInterface;
    previous_status: boolean;
    new_status: boolean;
}

export interface CurrencyPaymentProviderMethodStatusUpdateResponseInterface {
    currency_payment_provider_method: CurrencyPaymentProviderMethodRecordInterface;
    previous_status: boolean;
    new_status: boolean;
}

export type CurrencyPaymentProviderMethodListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<CurrencyPaymentProviderMethodListViewFiltersInterface>;
};

export type PaymentMethodListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<PaymentMethodListViewFiltersInterface>;
};

export type PaymentProviderListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<PaymentProviderListViewFiltersInterface>;
};

export type PaymentProviderConfigListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<PaymentProviderConfigListViewFiltersInterface>;
};

export type PaymentProviderMethodListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<PaymentProviderMethodListViewFiltersInterface>;
};

// ==============================
// MEMBER PROFILE TYPES
// ==============================

export interface MemberDeviceSessionInterface {
    session_id: string;
    device_id: string;
    device_name: string;
    request_id: string;
    ip_address: string;
    user_agent: string;
    is_2fa_enabled: boolean;
    status: "active" | "expired" | "logged_out";
    expires_at: string;
    created_at: string;
}

export type MemberListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<MemberListFiltersInterface>;
};

export interface MemberListResponseInterface extends PaginatedResponseResultInterface<
    MemberRecordInterface[]
> {}

export interface MemberDeviceSessionListResponseInterface extends PaginatedResponseResultInterface<
    MemberDeviceSessionInterface[]
> {}

export interface ValidateMemberSetupTokenResponseInterface {
    member_context: MemberRecordInterface;
    token_public_id: string;
    expires_at: string;
    two_factor_setup: Record<string, any>;
}

export interface CompleteMemberSetupResponseInterface {
    member: MemberRecordInterface;
    access_token: string;
    expires_in_mins: number;
    permissions: string[];
}

// ==============================
// ACTIVITY TYPES
// ==============================

export interface ActivityRecordInterface {
    id: string;
    actor_type: "member" | "app" | string;
    actor_id: string;
    actor_name?: string;
    request_id: string;
    action: string;
    entity_type: string;
    description: string;
    ip_address: string;
    user_agent: string;
    status: "success" | "failed";
    created_at: string;
    updated_at: string;
}

export type ActivityListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<ActivityListFiltersInterface>;
};

export interface ActivityListResponseInterface extends PaginatedResponseResultInterface<
    ActivityRecordInterface[]
> {}

// ==============================
// ACCESS CONTROL TYPES
// ==============================

export interface RoleRecordInterface {
    id: string | number;
    name: string;
    symbol: string;
    display_name: string;
    is_system_role: boolean;
    is_member_group: boolean;
    created_by?: CreatorUpdatorMemberinterface | null;
    updated_by?: CreatorUpdatorMemberinterface | null;
    created_at?: string;
    updated_at?: string;
}

export interface PermissionRecordInterface {
    id: string | number;
    name: string;
    symbol: string;
    module: string;
    description?: string;
}

export type RoleListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<RoleListFiltersInterface>;
};

export interface RoleListResponseInterface extends PaginatedResponseResultInterface<
    RoleRecordInterface[]
> {}

export type RolePermissionListParams = {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    assignment_status?: "assigned" | "unassigned";
    filters?: Record<string, any>;
};

export interface RolePermissionListResponseInterface extends PaginatedResponseResultInterface<
    PermissionRecordInterface[]
> {}

export interface RolePermissionActionResponseInterface {
    affected_count: number;
    skipped_count: number;
    message: string;
}

export interface ActorRoleActionResponseInterface {
    actor_type: "member" | "app";
    actor_id: string | number;
    assigned_roles: RoleRecordInterface[];
    message: string;
}
