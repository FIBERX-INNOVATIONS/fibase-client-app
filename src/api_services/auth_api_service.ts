
import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { 
    AuthenticatedMemberRecordInterface, 
    CSRFTokenRecordInterface,
    TwoFactorAuthenticatedMemberRecordInterface,
    AuthAccessRecordInterface
} from "@/types/api_service_type";

import { 
    LoginFormDataInterface,
    TwoFactorFormDataInterface
} from "@/types/form_data_type";

import { CSRFTokenForType } from "@/configs/constants";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

class AuthAPIService extends BaseAPIService {

    // Service method to query get csrf token endpoint
    public static getFormCSRFToken = async (
        token_for: CSRFTokenForType
    ): Promise<APIResponseInterface<CSRFTokenRecordInterface>> => {
        return await this.queryAPI<CSRFTokenRecordInterface>({
            url: `/auth/get-csrf-token`,
            params: { token_for },
            method: "GET",
            disable_retry: true
        });
    }

    // Service method to query log in endpoint
    public static logIn = async (
        data: LoginFormDataInterface
    ): Promise<APIResponseInterface<AuthenticatedMemberRecordInterface>> => {
        const result = await this.queryAPI<AuthenticatedMemberRecordInterface>({
            url: `/auth/login`,
            data, 
            method: "POST",
            disable_retry: true
        });

        const headers = result?.full_response?.headers;

        if(result?.data) {
            const {  current_member, access_token, expires_in_mins} = result.data;
            const login_challenge_token = headers?.["x-login-challenge-token"]

            MemberAuthenticatorUtil.onLoginSuccess(current_member, access_token, expires_in_mins, login_challenge_token);
        }

        return result
    }

    // Service method to query two factor endpoint
    public static twoFactorLogin = async  (
        data: TwoFactorFormDataInterface
    ) : Promise<APIResponseInterface<TwoFactorAuthenticatedMemberRecordInterface>> => {
        const result = await this.queryAPI<TwoFactorAuthenticatedMemberRecordInterface>({
            url: `/auth/two-factor-login`,
            data, 
            method: "POST",
            disable_retry: true
        });

        if(result?.data) {
            const {  
                current_member, 
                access_token, 
                expires_in_mins, 
                permissions
            } = result.data;

            MemberAuthenticatorUtil.onTwoFactorLoginSuccess(
                current_member, 
                permissions,
                access_token, 
                expires_in_mins
            );
        }

        else if (result.full_response?.status === 401) {
            MemberAuthenticatorUtil.onlogoutSuccess();
        }

        return result
    }

    // Service method to query logout endpoint
    public static refreshAccessToen = async  (): Promise<APIResponseInterface<AuthAccessRecordInterface>> => {
        const result = await this.queryAPI<AuthAccessRecordInterface>({
            url: `/auth/refresh`,
            method: "POST",
            disable_retry: true
        });

        if (result.data) {
            const { access_token, expires_in_mins } = result?.data;
            MemberAuthenticatorUtil.onAccessRefreshSuccess(access_token, expires_in_mins);
        }
        else if (result.full_response?.status === 401) {
            MemberAuthenticatorUtil.onlogoutSuccess();
        }

        return result;
    }

    // Service method to query logout endpoint
    public static logOut = async  (): Promise<APIResponseInterface<boolean>> => {
        const result = await this.queryAPI<boolean>({
            url: `/auth/logout`,
            method: "POST"
        });

        if (result.data) {
            MemberAuthenticatorUtil.onlogoutSuccess();
        }

        return result
    } 

    // Service method to handle refresh retry
    public static refreshAccessTokenRetry = async (): Promise<boolean> => {
        const result = await AuthAPIService.refreshAccessToen();

        return result.status === "success";
    };


}

export default AuthAPIService;