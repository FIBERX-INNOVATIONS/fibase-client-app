import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    CreatePaymentProviderPayloadInterface,
    UpdatePaymentProviderPayloadInterface
} from "@/types/form_data_type";

import {
    PaymentProviderListParams,
    PaymentProviderListResponseInterface,
    PaymentProviderRecordInterface,
    PaymentProviderStatusUpdateResponseInterface
} from "@/types/api_service_type";

class PaymentProviderAPIService extends BaseAPIService {
    // Method to query get payment provider record list API endpoint
    public static getPaymentProviderList = async (
        params?: PaymentProviderListParams
    ): Promise<APIResponseInterface<PaymentProviderListResponseInterface>> => {
        const {
            page = 1,
            limit = 10,
            sort_by = "created_at",
            sort_direction = "desc",
            filters
        } = params ?? {};

        return await this.queryAPI<PaymentProviderListResponseInterface>({
            url: `/payment-config/providers/list`,
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

    // Method to query get payment provider record API endpoint
    public static getPaymentProvider = async (
        provider_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderRecordInterface>> => {
        return await this.queryAPI<PaymentProviderRecordInterface>({
            url: `/payment-config/providers/${provider_id}`,
            method: "GET"
        });
    };

    // Method to query create a payment provider API endpoint
    public static createPaymentProvider = async (
        data: CreatePaymentProviderPayloadInterface
    ): Promise<APIResponseInterface<PaymentProviderRecordInterface>> => {
        return await this.queryAPI<PaymentProviderRecordInterface>({
            url: `/payment-config/providers/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query update a payment provider API endpoint
    public static updatePaymentProvider = async (
        provider_id: string | number,
        data: UpdatePaymentProviderPayloadInterface
    ): Promise<APIResponseInterface<PaymentProviderRecordInterface>> => {
        return await this.queryAPI<PaymentProviderRecordInterface>({
            url: `/payment-config/providers/${provider_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query update a payment provider status API endpoint
    public static updatePaymentProviderStatus = async (
        provider_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderStatusUpdateResponseInterface>> => {
        return await this.queryAPI<PaymentProviderStatusUpdateResponseInterface>({
            url: `/payment-config/providers/${provider_id}/update-status`,
            method: "PATCH",
            disable_retry: true
        });
    };

    // Method to query delete a payment provider API endpoint
    public static deletePaymentProvider = async (
        provider_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderRecordInterface>> => {
        return await this.queryAPI<PaymentProviderRecordInterface>({
            url: `/payment-config/providers/${provider_id}/delete`,
            method: "DELETE"
        });
    };
}

export default PaymentProviderAPIService;
