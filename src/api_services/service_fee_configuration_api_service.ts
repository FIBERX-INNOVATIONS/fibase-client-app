import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import type { APIResponseInterface } from "@ui/version_3/types/util_type";

import type {
    CreateServiceFeeConfigurationPayloadInterface,
    ServiceFeeConfigurationListParamsInterface,
    ServiceFeeConfigurationListResponseInterface,
    ServiceFeeConfigurationRecordInterface,
    ServiceFeeConfigurationStatusUpdateResponseInterface,
    UpdateServiceFeeConfigurationPayloadInterface,
    UpdateServiceFeeConfigurationStatusPayloadInterface
} from "@/types/service_fee_configuration_type";

class ServiceFeeConfigurationAPIService extends BaseAPIService {
    // Method to query the service fee configuration list endpoint.
    public static getServiceFeeConfigurationList = async (
        params?: ServiceFeeConfigurationListParamsInterface
    ): Promise<APIResponseInterface<ServiceFeeConfigurationListResponseInterface>> => {
        const { page = 1, limit = 12, sort_by = "created_at", sort_direction = "desc", filters } = params ?? {};

        return await this.queryAPI<ServiceFeeConfigurationListResponseInterface>({
            url: "/fee-configuration/list",
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

    // Method to query one service fee configuration record endpoint.
    public static getServiceFeeConfiguration = async (
        fee_configuration_id: string | number
    ): Promise<APIResponseInterface<ServiceFeeConfigurationRecordInterface>> => {
        return await this.queryAPI<ServiceFeeConfigurationRecordInterface>({
            url: `/fee-configuration/${fee_configuration_id}`,
            method: "GET"
        });
    };

    // Method to query the service fee configuration creation endpoint.
    public static createServiceFeeConfiguration = async (
        data: CreateServiceFeeConfigurationPayloadInterface
    ): Promise<APIResponseInterface<ServiceFeeConfigurationRecordInterface>> => {
        return await this.queryAPI<ServiceFeeConfigurationRecordInterface>({
            url: "/fee-configuration/create",
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to query the service fee configuration update endpoint.
    public static updateServiceFeeConfiguration = async (
        fee_configuration_id: string | number,
        data: UpdateServiceFeeConfigurationPayloadInterface
    ): Promise<APIResponseInterface<ServiceFeeConfigurationRecordInterface>> => {
        return await this.queryAPI<ServiceFeeConfigurationRecordInterface>({
            url: `/fee-configuration/${fee_configuration_id}/update`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };

    // Method to query the service fee configuration status-toggle endpoint.
    public static updateServiceFeeConfigurationStatus = async (
        fee_configuration_id: string | number,
        data: UpdateServiceFeeConfigurationStatusPayloadInterface
    ): Promise<APIResponseInterface<ServiceFeeConfigurationStatusUpdateResponseInterface>> => {
        return await this.queryAPI<ServiceFeeConfigurationStatusUpdateResponseInterface>({
            url: `/fee-configuration/${fee_configuration_id}/update-status`,
            method: "PATCH",
            data,
            disable_retry: true
        });
    };
}

export default ServiceFeeConfigurationAPIService;
