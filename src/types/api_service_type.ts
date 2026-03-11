
export interface CSRFTokenRecordInterface {
    token: string;
    expires_at: string;
    csrf_token_for: string;
}

export interface MemberRoleInterface {
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

    roles: MemberRoleInterface[];

    is_fully_authenticated: boolean;
}

export interface AuthAccessRecordInterface {
    access_token: string;

    expires_in_mins: number;
}

export interface AuthenticatedMemberRecordInterface extends AuthAccessRecordInterface {
    current_member: MemberRecordInterface;
}



export interface TwoFactorAuthenticatedMemberRecordInterface extends AuthAccessRecordInterface {
    current_member: MemberRecordInterface;

    permissions: string[];
}