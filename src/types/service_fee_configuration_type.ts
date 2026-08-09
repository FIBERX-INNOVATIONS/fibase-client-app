import type {
    CreatorUpdatorMemberinterface,
    CurrencyRecordInterface,
    IdentityRecordInterface,
    PaymentProviderRecordInterface,
    RegisteredAppRecordInterface
} from "@/types/api_service_type";

import type { ServiceFeeConfigurationListViewFiltersInterface } from "@/types/list_view_filter_type";

export type ServiceFeeTransactionType = "deposit" | "withdrawal" | "transfer" | "exchange";

export type ServiceFeeConfigurationType = "flat" | "percentage" | "range";

export type ServiceFeeRangeType = Exclude<ServiceFeeConfigurationType, "range">;

export type ServiceFeeConfigurationLevel = 1 | 2 | 3 | 4;

export type ServiceFeeConfigurationEffectiveState = "current" | "scheduled" | "expired" | "unbounded";

export interface ServiceFeeConfigurationRangeRecordInterface {
    public_id: string;
    min_value: string;
    max_value: string | null;
    fee_type: ServiceFeeRangeType;
    amount: string;
    created_at: string;
    updated_at: string | null;
    creator?: CreatorUpdatorMemberinterface | null;
    updator?: CreatorUpdatorMemberinterface | null;
}

export interface ServiceFeeConfigurationRecordInterface {
    public_id: string;
    transaction_type: ServiceFeeTransactionType;
    configuration_level: ServiceFeeConfigurationLevel;
    fee_type: ServiceFeeConfigurationType;
    amount: string | null;
    is_active: boolean;
    effective_from: string | null;
    effective_until: string | null;
    created_at: string;
    updated_at: string | null;
    currency?: CurrencyRecordInterface;
    registered_app?: RegisteredAppRecordInterface;
    provider?: PaymentProviderRecordInterface;
    identity?: IdentityRecordInterface;
    ranges?: ServiceFeeConfigurationRangeRecordInterface[];
    creator?: CreatorUpdatorMemberinterface | null;
    updator?: CreatorUpdatorMemberinterface | null;
}

export interface ServiceFeeConfigurationListResponseInterface {
    total_items: number;
    total_pages: number;
    current_page: number;
    records: ServiceFeeConfigurationRecordInterface[];
}

export interface ServiceFeeConfigurationStatusUpdateResponseInterface {
    fee_configuration_record: ServiceFeeConfigurationRecordInterface;
    previous_status: boolean;
    new_status: boolean;
}

export interface ServiceFeeConfigurationListParamsInterface {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    filters?: Partial<ServiceFeeConfigurationListViewFiltersInterface>;
}

export interface ServiceFeeConfigurationRangePayloadInterface {
    min_value: string | number;
    max_value?: string | number | null;
    fee_type: ServiceFeeRangeType;
    amount: string | number;
}

export interface CreateServiceFeeConfigurationPayloadInterface {
    csrf_token: string;
    currency_id: string | number;
    registered_app_id?: string | number | null;
    provider_id?: string | number | null;
    identity_id?: string | number | null;
    transaction_type: ServiceFeeTransactionType;
    fee_type: ServiceFeeConfigurationType;
    amount?: string | number | null;
    ranges?: ServiceFeeConfigurationRangePayloadInterface[];
    effective_from?: string | Date | null;
    effective_until?: string | Date | null;
}

export interface UpdateServiceFeeConfigurationPayloadInterface extends Partial<
    Omit<CreateServiceFeeConfigurationPayloadInterface, "csrf_token">
> {
    csrf_token: string;
}

export interface UpdateServiceFeeConfigurationStatusPayloadInterface {
    csrf_token: string;
}
