import { APIClientConfigInterface } from "@ui/version_3/types/api_util_type";
import DeviceFingerprintUtil from "@ui/version_3/utils/device_fingerprint_util";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import { AxiosHeaders } from "axios";

export const API_CLIENT_CONFIG: APIClientConfigInterface = {
    base_url: "http://localhost:2000/api",
    with_credentials: true,
    request_timeout: 100_00,
    custom_headers: (): Record<string, any> | AxiosHeaders => {
        return {
            "X-Device-Name": DeviceFingerprintUtil.getDeviceName(),
            Authorization: `Bearer ${MemberAuthenticatorUtil.getLoggedInMemberAccessToekn()}`,
            "X-Login-Challenge-Token": `${MemberAuthenticatorUtil.getLoggedInMemberChallengeToekn()}`
        };
    }
} as const;
