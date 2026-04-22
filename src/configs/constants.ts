
import { MemberRecordInterface } from "@/types/api_service_type";
import { APIClientConfigInterface } from "@ui/version_3/types/api_util_type";
import { StorageFieldType, StorageSchemaType } from "@ui/version_3/types/util_type";

import DeviceFingerprintUtil from "@ui/version_3/utils/device_fingerprint_util";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import { AxiosHeaders } from "axios";

export const DEFUALT_REGISTERED_APP_LOGO_URL    = "/assets/img/default-registered-app-logo.png";
export const DEFAULT_MEMBER_PROFILE_PHOTO_URL   = "/assets/img/default-registered-app-logo.png";

// export const APP_CONTENT_DATA_URL = (
//     "https://raw.githubusercontent.com/FIBERX-INNOVATIONS/fibase-public-content/development/app_content/en-GB.json"
// ) as const;

export const APP_CONTENT_DATA_URL = ("http://localhost:2000/assets/app_content/en-GB.json") as const;

export const AUTH_ROUTE_NAMES: string[] = [
    "Home", 
    "Login", 
    "TwoFactorLogin", 
    "Logout"
] as const;

export const API_CLIENT_CONFIG: APIClientConfigInterface = {
    base_url: "http://localhost:2000/api",
    with_credentials: true,
    request_timeout: 100_00,
    custom_headers: (): Record<string, any> | AxiosHeaders => {
        return {
            "X-Device-Name": DeviceFingerprintUtil.getDeviceName(),
            "Authorization": `Bearer ${MemberAuthenticatorUtil.getLoggedInMemberAccessToekn()}`,
            "X-Login-Challenge-Token": `${MemberAuthenticatorUtil.getLoggedInMemberChallengeToekn()}`
        }
    }
} as const;

export const CSRF_TOKEN_FOR = {
    LOGIN: "login",
    TWO_FACTOR: "two_factor_login",
    REGISTER_APP: "register_app",
} as const;

export type CSRFTokenForType =
    typeof CSRF_TOKEN_FOR[keyof typeof CSRF_TOKEN_FOR];

export const CHAR_CORPUS: string[] = [
"6", ";", "s", "[", "w", "*", "n", "K", "h", "U", "#", "P", "T", "&",
"M", "2", "}", "x", ")", "{", "|", "i", "%", "m", ":", "E", "q", "?",
"0", "@", "1", "v", "A", "W", "<", "y", "Y", "4", "5", ".", "e", "G",
",", "D", "7", "I", "j", ">", "g", "t", "k", "c", "V", "9", "J", "L",
"u", "H", "b", "Z", "+", '"', "'", "a", "f",
];

export const DATA_SHIFT_KEY: number = 24;

export const STORAGE_SCHEMA = {
    current_member: {
        encrypted_key: "x9a2P0",
        default_value: null
    } as StorageFieldType<MemberRecordInterface | null>,

    current_member_permissions: {
        encrypted_key: "xrafY3G0",
        default_value: []
    } as StorageFieldType<string[]>,

    current_member_access_token: {
        encrypted_key: "xraGdTwRT4G",
        default_value: null
    } as StorageFieldType<string | null>,

    current_member_challenge_token: {
        encrypted_key: "xraGdWkjfo",
        default_value: null
    } as StorageFieldType<string | null>,

    current_member_access_expiry_date: {
        encrypted_key: "xraEXP1",
        default_value: null
    } as StorageFieldType<Date | null>,

}

export type InternalStorageSchemaType = typeof STORAGE_SCHEMA

export const FILE_STORAGE_REFERENCE_TYPE = {
    REGISTERED_APP_LOGO: "app_logo"
} as const;