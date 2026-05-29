import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    AppCurrencyActionValidatedFormDataInterface,
    CurrencyValidatedFromDataInterface,
    AppCurrencyToggleDefaultValidatedformDataInterface
} from "@/types/form_data_type";

import {
    CurrencyRecordInterface,
    CurrencyListResponseInterface,
    CurrencyStatusUpdateResponseInterface,
    AppCurrencyActionResponseInterface
} from "@/types/api_service_type";

import { CurrencyListViewFiltersInterface } from "@/types/list_view_filter_type";

import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

class CurrencyAPIService extends BaseAPIService {
    // =========================
    // 🔹 GET LIST
    // =========================
    public static getCurrencyList = async (params?: {
        page?: number;
        limit?: number;
        sort_by?: string;
        sort_direction?: string;
        filters?: Partial<CurrencyListViewFiltersInterface>;
    }): Promise<APIResponseInterface<CurrencyListResponseInterface>> => {
        const {
            page = 0,
            limit = 12,
            sort_by = "created_at",
            sort_direction = "DESC",
            filters
        } = params ?? {};

        return await this.queryAPI<CurrencyListResponseInterface>({
            url: `/currency/list`,
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

    // =========================
    // 🔹 GET SINGLE
    // =========================
    public static getCurrency = async (
        currency_id: string | number
    ): Promise<APIResponseInterface<CurrencyRecordInterface>> => {
        return await this.queryAPI<CurrencyRecordInterface>({
            url: `/currency/${currency_id}`,
            method: "GET"
        });
    };

    // =========================
    // 🔹 CREATE
    // =========================
    public static createCurrency = async (
        data: CurrencyValidatedFromDataInterface
    ): Promise<APIResponseInterface<CurrencyRecordInterface>> => {
        return await this.queryAPI<CurrencyRecordInterface>({
            url: `/currency/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // =========================
    // 🔹 UPDATE
    // =========================
    public static updateCurrency = async (
        currency_id: string | number,
        data: Partial<CurrencyValidatedFromDataInterface>
    ): Promise<APIResponseInterface<CurrencyRecordInterface>> => {
        return await this.queryAPI<CurrencyRecordInterface>({
            url: `/currency/${currency_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // =========================
    // 🔹 UPDATE STATUS
    // =========================
    public static updateCurrencyStatus = async (
        currency_id: string | number
    ): Promise<APIResponseInterface<CurrencyStatusUpdateResponseInterface>> => {
        return await this.queryAPI<CurrencyStatusUpdateResponseInterface>({
            url: `/currency/${currency_id}/update-status`,
            method: "PATCH",
            disable_retry: true
        });
    };

    // =========================
    // 🔹 DELETE
    // =========================
    public static deleteCurrency = async (
        currency_id: string | number
    ): Promise<APIResponseInterface<CurrencyRecordInterface>> => {
        return await this.queryAPI<CurrencyRecordInterface>({
            url: `/currency/${currency_id}/delete`,
            method: "DELETE"
        });
    };

    // =========================
    // 🔹 ASSIGN / UNASSIGN (BULK)
    // =========================
    public static handleAppCurrencyAction = async (
        data: AppCurrencyActionValidatedFormDataInterface
    ): Promise<APIResponseInterface<AppCurrencyActionResponseInterface>> => {
        return await this.queryAPI<AppCurrencyActionResponseInterface>({
            url: `/currency/app-currency/action`,
            method: "POST",
            data
        });
    };

    // =========================
    // 🔹 TOGGLE DEFAULT
    // =========================
    public static toggleDefaultCurrency = async (
        data: AppCurrencyToggleDefaultValidatedformDataInterface
    ): Promise<APIResponseInterface<AppCurrencyActionResponseInterface>> => {
        return await this.queryAPI<AppCurrencyActionResponseInterface>({
            url: `/currency/app-currency/update-default-currency`,
            method: "POST",
            data
        });
    };
}

export default CurrencyAPIService;
