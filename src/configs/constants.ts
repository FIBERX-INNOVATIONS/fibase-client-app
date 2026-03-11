import { APIClientConfigInterface } from "@ui/version_3/types/api_util_type";
import DeviceFingerprintUtil from "@ui/version_3/utils/device_fingerprint_util";

export const APP_CONTENT_DATA_URL = (
    "https://raw.githubusercontent.com/FIBERX-INNOVATIONS/fibase-public-content/development/app_content/en-GB.json"
) as const;

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
    custom_headers: {
        "X-Device-Name": DeviceFingerprintUtil.getDeviceName(),
    }
} as const;

export const CSRF_TOKEN_FOR = {
    LOGIN: "login",
    TWO_FACTOR: "two_factor_login",
    REGISTER_APP: "register_app",
} as const;

export type CSRFTokenForType =
    typeof CSRF_TOKEN_FOR[keyof typeof CSRF_TOKEN_FOR];