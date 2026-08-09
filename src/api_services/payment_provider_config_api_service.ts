import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    CreatePaymentProviderConfigPayloadInterface,
    UpdatePaymentProviderConfigPayloadInterface
} from "@/types/form_data_type";

import {
    PaymentProviderConfigCredentialsResponseInterface,
    PaymentProviderConfigListParams,
    PaymentProviderConfigListResponseInterface,
    PaymentProviderConfigRecordInterface
} from "@/types/api_service_type";

class PaymentProviderConfigAPIService extends BaseAPIService {
    // Method to query get payment provider config record list API endpoint
    public static getPaymentProviderConfigList = async (
        params?: PaymentProviderConfigListParams
    ): Promise<APIResponseInterface<PaymentProviderConfigListResponseInterface>> => {
        const { page = 1, limit = 12, sort_by = "created_at", sort_direction = "desc", filters } = params ?? {};

        return await this.queryAPI<PaymentProviderConfigListResponseInterface>({
            url: `/payment-config/provider-config/list`,
            method: "GET",
            params: {
                page,
                limit,
                sort_by,
                sort_direction: sort_direction.toUpperCase(),
                ...filters
            }
        });
    };

    // Method to query get payment provider config record API endpoint
    public static getPaymentProviderConfig = async (
        config_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderConfigRecordInterface>> => {
        return await this.queryAPI<PaymentProviderConfigRecordInterface>({
            url: `/payment-config/provider-config/${config_id}`,
            method: "GET"
        });
    };

    // Method to query decrypted payment provider config credentials API endpoint
    public static getPaymentProviderConfigCredentials = async (
        config_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderConfigCredentialsResponseInterface>> => {
        return await this.queryAPI<PaymentProviderConfigCredentialsResponseInterface>({
            url: `/payment-config/provider-config/${config_id}/credentials`,
            method: "GET"
        });
    };

    // Method to query create a payment provider config API endpoint
    public static createPaymentProviderConfig = async (
        data: CreatePaymentProviderConfigPayloadInterface
    ): Promise<APIResponseInterface<PaymentProviderConfigRecordInterface>> => {
        return await this.queryAPI<PaymentProviderConfigRecordInterface>({
            url: `/payment-config/provider-config/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query update a payment provider config API endpoint
    public static updatePaymentProviderConfig = async (
        config_id: string | number,
        data: UpdatePaymentProviderConfigPayloadInterface
    ): Promise<APIResponseInterface<PaymentProviderConfigRecordInterface>> => {
        return await this.queryAPI<PaymentProviderConfigRecordInterface>({
            url: `/payment-config/provider-config/${config_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query delete a payment provider config API endpoint
    public static deletePaymentProviderConfig = async (
        config_id: string | number
    ): Promise<APIResponseInterface<PaymentProviderConfigRecordInterface>> => {
        return await this.queryAPI<PaymentProviderConfigRecordInterface>({
            url: `/payment-config/provider-config/${config_id}/delete`,
            method: "DELETE",
            disable_retry: true
        });
    };
}

export default PaymentProviderConfigAPIService;
