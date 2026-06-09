export interface RegisteredAppListViewFiltersInterface {
    preview_only?: boolean;
    search?: string | null;
    is_active?: string | null;
    created_by?: string | null;
    key_version?: string | null;
    date_range?: { start_date: string; end_date: string } | null;
}

export interface CurrencyListViewFiltersInterface {
    preview_only?: boolean;
    search?: string | null;
    is_active?: string | null;
    is_fiat?: string | null;
    created_by?: string | null;
    unassigned_to_app?: string | boolean;
    precision?: number | null;
    minor_unit?: number | null;
    numeric_code?: string | null;
    app_id?: string | number | null;
    date_range?: { start_date: string; end_date: string } | null;
}

export interface MemberListFiltersInterface {
    search?: string | null;
    preview_only?: boolean;
    is_active?: string | null;
}

export interface PaymentConfigListViewFiltersInterface {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    search?: string | null;
    preview_only?: boolean | string;
    is_active?: string | null;
    created_by?: string | null;
    date_range?: { start_date: string; end_date: string } | string | null;
}

export interface PaymentMethodListViewFiltersInterface extends PaymentConfigListViewFiltersInterface {
    display_group?: string | null;
    requires_redirect?: string | null;
    supports_deposit?: string | null;
    supports_withdrawal?: string | null;
    supports_refund?: string | null;
}

export interface PaymentProviderListViewFiltersInterface extends PaymentConfigListViewFiltersInterface {
    provider_type?: string | null;
}

export interface PaymentProviderConfigListViewFiltersInterface extends PaymentConfigListViewFiltersInterface {
    provider_id?: string | number | null;
    environment?: "test" | "live" | string | null;
    account_reference?: string | null;
}

export interface PaymentProviderMethodListViewFiltersInterface extends PaymentConfigListViewFiltersInterface {
    provider_id?: string | number | null;
    payment_method_id?: string | number | null;
    direction?: "deposit" | "withdrawal" | string | null;
}

export interface CurrencyPaymentProviderMethodListViewFiltersInterface extends PaymentConfigListViewFiltersInterface {
    currency_id?: string | number | null;
    provider_id?: string | number | null;
    payment_method_id?: string | number | null;
    provider_method_id?: string | number | null;
    direction?: "deposit" | "withdrawal" | string | null;
}

export interface MemberDeviceSessionListViewFiltersInterface {
    search?: string | null;
    is_active?: boolean | string | null;
    is_2fa_enabled?: boolean | string | null;
    date_range?: { start_date: string; end_date: string } | null;
}

export interface ActivityListFiltersInterface {
    search?: string | null;
    registered_app_id?: string | number | null;
    app_id?: string | number | null;
    member_public_id?: string | null;
    member_id?: string | number | null;
    request_id?: string | null;
    entity_type?: string | null;
    ip_address?: string | null;
    status?: "success" | "failed" | null;
    date_range?: string | null;
}

export interface RoleListFiltersInterface {
    search?: string | null;
    is_member_group?: boolean | string | null;
}
