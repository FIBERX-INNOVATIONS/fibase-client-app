
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
        return await this.queryAPI<AuthenticatedMemberRecordInterface>({
            url: `/auth/login`,
            data, 
            method: "POST"
        });
    }

    // Service method to query two factor endpoint
    public static twoFactorLogin = async  (
        data: TwoFactorFormDataInterface
    ) : Promise<APIResponseInterface<TwoFactorAuthenticatedMemberRecordInterface>> => {
        return await this.queryAPI<TwoFactorAuthenticatedMemberRecordInterface>({
            url: `/auth/two-factor-login`,
            data, 
            method: "POST"
        });
    }

    // Service method to query logout endpoint
    public static refreshAccessToen = async  (): Promise<APIResponseInterface<AuthAccessRecordInterface>> => {
        return await this.queryAPI<AuthAccessRecordInterface>({
            url: `/auth/refresh`,
            method: "POST",
            disable_retry: true
        });
    }

    // Service method to query logout endpoint
    public static logOut = async  (): Promise<APIResponseInterface<boolean>> => {
        return await this.queryAPI<boolean>({
            url: `/auth/logout`,
            method: "POST"
        });
    } 

    // Service method to handle refresh retry
    public static refreshAccessTokenRetry = async (): Promise<boolean> => {
        const result = await AuthAPIService.refreshAccessToen();

        return result.status === "success";
    };


}

export default AuthAPIService;