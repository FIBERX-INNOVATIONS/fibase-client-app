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
