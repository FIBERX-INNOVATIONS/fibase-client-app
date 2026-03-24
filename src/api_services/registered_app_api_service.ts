import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    RegisteredAppFromDataInterface
} from "@/types/form_data_type";


import {
    RegisteredAppRecordInterface,
    PaginatedResponseResultInterface
} from "@/types/api_service_type";

class RegisteredAppAPIService extends BaseAPIService {

    // =========================
    // 🔹 GET LIST
    // =========================
    public static getRegisteredAppList = async (
        params?: {
            page?: number;
            limit?: number;
            sort_by?: string;
            sort_direction?: string;
            search?: string | null;
            preview_only?: string;
            is_active?: string | null;
            created_by?: string | null;
            date_range?: string | null;
            key_version?: number | null;
        }
    ): Promise<APIResponseInterface<PaginatedResponseResultInterface<RegisteredAppRecordInterface[]>>> => {
        return await this.queryAPI<PaginatedResponseResultInterface<RegisteredAppRecordInterface[]>>({
            url: `/registered-app/list`,
            method: "GET",
            params
        });
    };

    // =========================
    // 🔹 GET SINGLE RECORD
    // =========================
    public static getRegisteredApp = async (
        public_id: string
    ): Promise<APIResponseInterface<RegisteredAppRecordInterface>> => {
        return await this.queryAPI<RegisteredAppRecordInterface>({
            url: `/registered-app/${public_id}`,
            method: "GET"
        });
    };

    // =========================
    // 🔹 CREATE
    // =========================
    public static createRegisteredApp = async (
        data: RegisteredAppFromDataInterface
    ): Promise<APIResponseInterface<RegisteredAppRecordInterface>> => {
        return await this.queryAPI<RegisteredAppRecordInterface>({
            url: `/registered-app/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // =========================
    // 🔹 UPDATE
    // =========================
    public static updateRegisteredApp = async (
        public_id: string,
        data: Partial<RegisteredAppFromDataInterface>
    ): Promise<APIResponseInterface<RegisteredAppRecordInterface>> => {
        return await this.queryAPI<RegisteredAppRecordInterface>({
            url: `/registered-app/${public_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // =========================
    // 🔹 UPDATE STATUS
    // =========================
    public static updateRegisteredAppStatus = async (
        public_id: string
    ): Promise<APIResponseInterface<RegisteredAppRecordInterface>> => {
        return await this.queryAPI<RegisteredAppRecordInterface>({
            url: `/registered-app/${public_id}/update-status`,
            method: "PATCH",
            disable_retry: true
        });
    };

    // =========================
    // 🔹 DELETE
    // =========================
    public static deleteRegisteredApp = async (
        public_id: string
    ): Promise<APIResponseInterface<RegisteredAppRecordInterface>> => {
        return await this.queryAPI<RegisteredAppRecordInterface>({
            url: `/registered-app/${public_id}/delete`,
            method: "DELETE"
        });
    };
}

export default RegisteredAppAPIService;