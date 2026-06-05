import {
    CreateCurrencyPaymentProviderMethodPayloadInterface,
    UpdateCurrencyPaymentProviderMethodPayloadInterface
} from "@/types/form_data_type";

import {
    CurrencyPaymentProviderMethodListParams,
    CurrencyPaymentProviderMethodListResponseInterface,
    CurrencyPaymentProviderMethodRecordInterface,
    CurrencyPaymentProviderMethodStatusUpdateResponseInterface
} from "@/types/api_service_type";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

class CurrencyPaymentProviderMethodAPIService extends BaseAPIService {
    // Method to query the get currency payment provider method record list API endpoint
    public static getCurrencyPaymentProviderMethodList = async (
        params?: CurrencyPaymentProviderMethodListParams
    ): Promise<APIResponseInterface<CurrencyPaymentProviderMethodListResponseInterface>> => {
        const {
            page = 1,
            limit = 10,
            sort_by = "updated_at",
            sort_direction = "desc",
            filters
        } = params ?? {};

        return await this.queryAPI<CurrencyPaymentProviderMethodListResponseInterface>({
            url: `/payment-config/currency-provider-methods/list`,
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

    // Method to query get currency payment provider method record API endpoint
    public static getCurrencyPaymentProviderMethod = async (
        currency_provider_method_id: string | number
    ): Promise<APIResponseInterface<CurrencyPaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<CurrencyPaymentProviderMethodRecordInterface>({
            url: `/payment-config/currency-provider-methods/${currency_provider_method_id}`,
            method: "GET"
        });
    };

    // Method to query create a currency payment provider method API endpoint
    public static createCurrencyPaymentProviderMethod = async (
        data: CreateCurrencyPaymentProviderMethodPayloadInterface
    ): Promise<APIResponseInterface<CurrencyPaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<CurrencyPaymentProviderMethodRecordInterface>({
            url: `/payment-config/currency-provider-methods/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query the update currency payment provider method API endpoint
    public static updateCurrencyPaymentProviderMethod = async (
        currency_provider_method_id: string | number,
        data: UpdateCurrencyPaymentProviderMethodPayloadInterface
    ): Promise<APIResponseInterface<CurrencyPaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<CurrencyPaymentProviderMethodRecordInterface>({
            url: `/payment-config/currency-provider-methods/${currency_provider_method_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query the update currency payment provider method status API endpoint
    public static updateCurrencyPaymentProviderMethodStatus = async (
        currency_provider_method_id: string | number
    ): Promise<
        APIResponseInterface<CurrencyPaymentProviderMethodStatusUpdateResponseInterface>
    > => {
        return await this.queryAPI<CurrencyPaymentProviderMethodStatusUpdateResponseInterface>({
            url: `/payment-config/currency-provider-methods/${currency_provider_method_id}/update-status`,
            method: "PATCH",
            disable_retry: true
        });
    };

    // Method to query the delete currency payment provider method API endpoint
    public static deleteCurrencyPaymentProviderMethod = async (
        currency_provider_method_id: string | number
    ): Promise<APIResponseInterface<CurrencyPaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<CurrencyPaymentProviderMethodRecordInterface>({
            url: `/payment-config/currency-provider-methods/${currency_provider_method_id}/delete`,
            method: "DELETE"
        });
    };
}

export default CurrencyPaymentProviderMethodAPIService;
