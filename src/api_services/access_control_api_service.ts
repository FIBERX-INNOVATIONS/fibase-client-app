import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    RoleRecordInterface,
    RoleListParams,
    RoleListResponseInterface,
    PermissionRecordInterface,
    RolePermissionListParams,
    RolePermissionListResponseInterface,
    RolePermissionActionResponseInterface,
    ActorRoleActionResponseInterface
} from "@/types/api_service_type";

import {
    CreateRolePayload,
    UpdateRolePayload,
    RolePermissionActionPayload,
    ActorRoleActionPayload
} from "@/types/form_data_type";

class AccessControlAPIService extends BaseAPIService {
    // Method to query get role record list API endpoint
    public static getRoleList = async (
        params?: RoleListParams
    ): Promise<APIResponseInterface<RoleListResponseInterface>> => {
        const {
            page = 1,
            limit = 12,
            sort_by = "created_at",
            sort_direction = "desc",
            filters = {}
        } = params ?? {};

        return await this.queryAPI<RoleListResponseInterface>({
            url: `/access-control/role/list`,
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

    // Method to query create role API endpoint
    public static createRole = async (
        data: CreateRolePayload
    ): Promise<APIResponseInterface<RoleRecordInterface>> => {
        return await this.queryAPI<RoleRecordInterface>({
            url: `/access-control/role/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query update role API endpoint
    public static updateRole = async (
        role_id: string | number,
        data: UpdateRolePayload
    ): Promise<APIResponseInterface<RoleRecordInterface>> => {
        return await this.queryAPI<RoleRecordInterface>({
            url: `/access-control/role/${role_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query get role permission list API endpoint
    public static getRolePermissionList = async (
        role_id: string | number,
        params?: RolePermissionListParams
    ): Promise<APIResponseInterface<RolePermissionListResponseInterface>> => {
        const {
            page = 1,
            limit = 20,
            sort_by = "name",
            sort_direction = "asc",
            assignment_status,
            filters = {}
        } = params ?? {};

        const queryParams: Record<string, any> = {
            page,
            limit,
            sort_by,
            sort_direction,
            ...filters
        };

        if (assignment_status) {
            queryParams.assignment_status = assignment_status;
        }

        return await this.queryAPI<RolePermissionListResponseInterface>({
            url: `/access-control/role/${role_id}/permissions/list`,
            method: "GET",
            params: queryParams
        });
    };

    // Method to query handle role permission action API endpoint
    public static handleRolePermissionAction = async (
        role_id: string | number,
        data: RolePermissionActionPayload
    ): Promise<APIResponseInterface<RolePermissionActionResponseInterface>> => {
        return await this.queryAPI<RolePermissionActionResponseInterface>({
            url: `/access-control/role/${role_id}/permissions/action`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query assign actor roles API endpoint
    public static assignActorRoles = async (
        data: ActorRoleActionPayload
    ): Promise<APIResponseInterface<ActorRoleActionResponseInterface>> => {
        return await this.queryAPI<ActorRoleActionResponseInterface>({
            url: `/access-control/actor-role/assign`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query unassign actor roles API endpoint
    public static unassignActorRoles = async (
        data: ActorRoleActionPayload
    ): Promise<APIResponseInterface<ActorRoleActionResponseInterface>> => {
        return await this.queryAPI<ActorRoleActionResponseInterface>({
            url: `/access-control/actor-role/unassign`,
            method: "POST",
            data,
            disable_retry: true
        });
    };
}

export default AccessControlAPIService;
