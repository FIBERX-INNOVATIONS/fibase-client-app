import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    MemberRecordInterface,
    MemberListParams,
    MemberListResponseInterface,
    MemberDeviceSessionInterface,
    MemberDeviceSessionListResponseInterface,
    ValidateMemberSetupTokenResponseInterface,
    CompleteMemberSetupResponseInterface
} from "@/types/api_service_type";

import {
    CreateMemberPayload,
    UpdateMemberPayload,
    MemberStatusUpdatePayload,
    MemberDeletePayload,
    MemberActivationLinkPayload,
    ValidateMemberSetupTokenPayload,
    CompleteMemberSetupPayload
} from "@/types/form_data_type";

class MemberProfileAPIService extends BaseAPIService {
    // Method to query get member record list API endpoint
    public static getMemberList = async (
        params?: MemberListParams
    ): Promise<APIResponseInterface<MemberListResponseInterface>> => {
        const {
            page = 1,
            limit = 12,
            sort_by = "created_at",
            sort_direction = "desc",
            filters = {}
        } = params ?? {};

        return await this.queryAPI<MemberListResponseInterface>({
            url: `/member/profile/list`,
            method: "GET",
            params: {
                page,
                limit,
                sort_by,
                sort_direction,
                ...filters
            }
        });
    };

    // Method to query get single member record API endpoint
    public static getMember = async (
        public_id: string
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        return await this.queryAPI<MemberRecordInterface>({
            url: `/member/profile/${public_id}`,
            method: "GET"
        });
    };

    // Method to query create member API endpoint
    public static createMember = async (
        data: CreateMemberPayload
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        return await this.queryAPI<MemberRecordInterface>({
            url: `/member/profile/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query update member API endpoint
    public static updateMember = async (
        public_id: string,
        data: UpdateMemberPayload
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        return await this.queryAPI<MemberRecordInterface>({
            url: `/member/profile/${public_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query update member status API endpoint
    public static updateMemberStatus = async (
        public_id: string,
        data: MemberStatusUpdatePayload
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        return await this.queryAPI<MemberRecordInterface>({
            url: `/member/profile/${public_id}/update-status`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query delete member API endpoint
    public static deleteMember = async (
        public_id: string,
        data: MemberDeletePayload
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        return await this.queryAPI<MemberRecordInterface>({
            url: `/member/profile/${public_id}/delete`,
            method: "DELETE",
            data,
            disable_retry: true
        });
    };

    // Method to query restore deleted member API endpoint
    public static restoreMember = async (
        public_id: string,
        data: { csrf_token: string }
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        return await this.queryAPI<MemberRecordInterface>({
            url: `/member/profile/${public_id}/restore`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query send member activation link API endpoint
    public static sendMemberActivationLink = async (
        public_id: string,
        data: MemberActivationLinkPayload
    ): Promise<APIResponseInterface<{ message: string }>> => {
        return await this.queryAPI<{ message: string }>({
            url: `/member/profile/${public_id}/activation-link/send`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query get member device session list API endpoint
    public static getMemberDeviceSessionList = async (
        public_id: string,
        params?: {
            page?: number;
            limit?: number;
            sort_by?: string;
            sort_direction?: string;
            filters?: Record<string, any>;
        }
    ): Promise<APIResponseInterface<MemberDeviceSessionListResponseInterface>> => {
        const {
            page = 1,
            limit = 10,
            sort_by = "created_at",
            sort_direction = "desc",
            filters = {}
        } = params ?? {};

        return await this.queryAPI<MemberDeviceSessionListResponseInterface>({
            url: `/member/${public_id}/device/list`,
            method: "GET",
            params: {
                page,
                limit,
                sort_by,
                sort_direction,
                ...filters
            }
        });
    };

    // Method to query logout member device session API endpoint
    public static logoutMemberDeviceSession = async (
        public_id: string,
        session_id: string,
        data: { csrf_token: string }
    ): Promise<APIResponseInterface<{ message: string }>> => {
        return await this.queryAPI<{ message: string }>({
            url: `/member/${public_id}/log-out-device/${session_id}`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query logout all member device sessions API endpoint
    public static logoutAllMemberDeviceSessions = async (
        public_id: string,
        data: { csrf_token: string }
    ): Promise<APIResponseInterface<{ message: string }>> => {
        return await this.queryAPI<{ message: string }>({
            url: `/member/${public_id}/log-out-devices`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query validate member setup token API endpoint
    public static validateMemberSetupToken = async (
        data: ValidateMemberSetupTokenPayload
    ): Promise<APIResponseInterface<ValidateMemberSetupTokenResponseInterface>> => {
        return await this.queryAPI<ValidateMemberSetupTokenResponseInterface>({
            url: `/member/profile/validate-activation-token`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query complete member activation setup API endpoint
    public static completeMemberSetup = async (
        data: CompleteMemberSetupPayload
    ): Promise<APIResponseInterface<CompleteMemberSetupResponseInterface>> => {
        return await this.queryAPI<CompleteMemberSetupResponseInterface>({
            url: `/member/profile/complete-activation`,
            method: "POST",
            data,
            disable_retry: true
        });
    };
}

export default MemberProfileAPIService;
