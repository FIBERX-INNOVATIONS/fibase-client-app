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
    display_name: string;
    is_system_role: boolean;
}

export interface MemberRecordInterface {
    public_id: string;

    username: string;

    email: string;

    phone: string;

    full_name: string;

    first_name: string;

    last_name: string;

    dob: string; // ISO Date string

    gender: "Male" | "Female" | "Other" | string;

    profile_photo_link: string;

    is_active: boolean;

    is_2fa_enabled: boolean;

    is_verified: boolean;

    roles: ActorRoleInterface[];

    is_fully_authenticated: boolean;
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
