
export interface RegisteredAppListViewFiltersInterface {
    search?: string | null;
    is_active?: string | null;
    created_by?: string | null;
    key_version?: string | null;
    date_range?: { start_date: string; end_date: string } | null;

}