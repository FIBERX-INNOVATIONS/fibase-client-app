import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    CreatePaymentProviderMethodPayloadInterface,
    UpdatePaymentProviderMethodPayloadInterface
} from "@/types/form_data_type";

import {
    PaymentProviderMethodListParams,
    PaymentProviderMethodListResponseInterface,
    PaymentProviderMethodRecordInterface,
    PaymentProviderMethodStatusUpdateResponseInterface
} from "@/types/api_service_type";

class PaymentProviderMethodAPIService extends BaseAPIService {
    // Method to query get payment provider method record list API endpoint
    public static getPaymentProviderMethodList = async (
        params?: PaymentProviderMethodListParams
    ): Promise<APIResponseInterface<PaymentProviderMethodListResponseInterface>> => {
        const { page = 1, limit = 10, sort_by = "updated_at", sort_direction = "desc", filters } = params ?? {};

        return await this.queryAPI<PaymentProviderMethodListResponseInterface>({
            url: `/payment-config/provider-method/list`,
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

    // Method to query get payment provider method record API endpoint
    public static getPaymentProviderMethod = async (
        provider_method_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<PaymentProviderMethodRecordInterface>({
            url: `/payment-config/provider-method/${provider_method_id}`,
            method: "GET"
        });
    };

    // Method to query create a payment provider method API endpoint
    public static createPaymentProviderMethod = async (
        data: CreatePaymentProviderMethodPayloadInterface
    ): Promise<APIResponseInterface<PaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<PaymentProviderMethodRecordInterface>({
            url: `/payment-config/provider-method/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query update a payment provider method API endpoint
    public static updatePaymentProviderMethod = async (
        provider_method_id: string | number,
        data: UpdatePaymentProviderMethodPayloadInterface
    ): Promise<APIResponseInterface<PaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<PaymentProviderMethodRecordInterface>({
            url: `/payment-config/provider-method/${provider_method_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query update a payment provider method status API endpoint
    public static updatePaymentProviderMethodStatus = async (
        provider_method_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderMethodStatusUpdateResponseInterface>> => {
        return await this.queryAPI<PaymentProviderMethodStatusUpdateResponseInterface>({
            url: `/payment-config/provider-method/${provider_method_id}/update-status`,
            method: "PATCH",
            disable_retry: true
        });
    };

    // Method to query delete a payment provider method API endpoint
    public static deletePaymentProviderMethod = async (
        provider_method_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderMethodRecordInterface>> => {
        return await this.queryAPI<PaymentProviderMethodRecordInterface>({
            url: `/payment-config/provider-method/${provider_method_id}/delete`,
            method: "DELETE"
        });
    };
}

export default PaymentProviderMethodAPIService;
