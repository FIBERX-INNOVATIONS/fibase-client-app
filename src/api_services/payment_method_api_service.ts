import {
    CreatePaymentMethodPayloadInterface,
    UpdatePaymentMethodPayloadInterface
} from "@/types/form_data_type";

import {
    PaymentMethodListParams,
    PaymentMethodListResponseInterface,
    PaymentMethodRecordInterface,
    PaymentMethodStatusUpdateResponseInterface
} from "@/types/api_service_type";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

class PaymentMethodAPIService extends BaseAPIService {
    // Method to query get payment method record list API endpoint
    public static getPaymentMethodList = async (
        params?: PaymentMethodListParams
    ): Promise<APIResponseInterface<PaymentMethodListResponseInterface>> => {
        const {
            page = 1,
            limit = 10,
            sort_by = "updated_at",
            sort_direction = "desc",
            filters
        } = params ?? {};

        return await this.queryAPI<PaymentMethodListResponseInterface>({
            url: `/payment-config/methods/list`,
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

    // Method to query get payment method record API endpoint
    public static getPaymentMethod = async (
        method_id: string | number
    ): Promise<APIResponseInterface<PaymentMethodRecordInterface>> => {
        return await this.queryAPI<PaymentMethodRecordInterface>({
            url: `/payment-config/methods/${method_id}`,
            method: "GET"
        });
    };

    // Method to query create a payment method API endpoint
    public static createPaymentMethod = async (
        data: CreatePaymentMethodPayloadInterface
    ): Promise<APIResponseInterface<PaymentMethodRecordInterface>> => {
        return await this.queryAPI<PaymentMethodRecordInterface>({
            url: `/payment-config/methods/create`,
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query update a payment method API endpoint
    public static updatePaymentMethod = async (
        method_id: string | number,
        data: UpdatePaymentMethodPayloadInterface
    ): Promise<APIResponseInterface<PaymentMethodRecordInterface>> => {
        return await this.queryAPI<PaymentMethodRecordInterface>({
            url: `/payment-config/methods/${method_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query update a payment method status API endpoint
    public static updatePaymentMethodStatus = async (
        method_id: string | number
    ): Promise<APIResponseInterface<PaymentMethodStatusUpdateResponseInterface>> => {
        return await this.queryAPI<PaymentMethodStatusUpdateResponseInterface>({
            url: `/payment-config/methods/${method_id}/update-status`,
            method: "PATCH",
            disable_retry: true
        });
    };

    // Method to query delete a payment method API endpoint
    public static deletePaymentMethod = async (
        method_id: string | number
    ): Promise<APIResponseInterface<PaymentMethodRecordInterface>> => {
        return await this.queryAPI<PaymentMethodRecordInterface>({
            url: `/payment-config/methods/${method_id}/delete`,
            method: "DELETE"
        });
    };
}

export default PaymentMethodAPIService;
