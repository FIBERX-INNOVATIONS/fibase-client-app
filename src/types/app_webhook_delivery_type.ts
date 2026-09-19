import type { AppWebhookDeliveryStatusEnum } from "@/configs/app_webhook_delivery_config";

import type { PaginatedResponseResultInterface, RegisteredAppPreviewRecordInterface } from "@/types/api_service_type";

export type AppWebhookDeliveryStatusType = `${AppWebhookDeliveryStatusEnum}`;

export type AppWebhookEventType =
    | "identity.created"
    | "identity.member.linked"
    | "transaction.requires_action"
    | "transaction.partially_paid"
    | "transaction.overpaid"
    | "transaction.successful"
    | "transaction.failed"
    | "transaction.cancelled"
    | "transaction.expired"
    | "transaction.reversed"
    | "transaction.refunded"
    | "wallet.created"
    | "wallet.balance.updated"
    | "wallet.status.updated"
    | "app.configuration.updated"
    | "app.activated"
    | "app.deactivated"
    | "app.webhook.test";

export type AppWebhookDeliverySortFieldType =
    "created_at" | "updated_at" | "event_type" | "status" | "attempts" | "delivered_at";

export interface AppWebhookDeliveryRecordInterface {
    public_id: string;
    event_id: string;
    event_type: string;
    event_version: string;
    /** Available in record responses; omitted by the delivery list projection. */
    endpoint_url?: string;
    status: AppWebhookDeliveryStatusType;
    attempts: number;
    max_attempts: number;
    next_attempt_at: string | null;
    last_attempt_at: string | null;
    delivered_at: string | null;
    response_status_code: number | null;
    last_error: string | null;
    created_at: string;
    updated_at: string | null;
    app?: RegisteredAppPreviewRecordInterface | null;
    transaction_public_id?: string | null;
}

export interface AppWebhookDeliveryListFiltersInterface {
    app_id?: string | number | null;
    event_type?: AppWebhookEventType | null;
    status?: AppWebhookDeliveryStatusType | null;
}

export interface AppWebhookDeliveryListParamsInterface {
    /** One-based UI page; converted to the backend's zero-based page by the service. */
    page?: number;
    /** The backend accepts limits from 1 to 200. */
    limit?: number;
    sort_by?: AppWebhookDeliverySortFieldType;
    sort_direction?: "asc" | "desc";
    filters?: AppWebhookDeliveryListFiltersInterface;
}

export type AppWebhookDeliveryListResponseInterface = PaginatedResponseResultInterface<AppWebhookDeliveryRecordInterface[]>;

// Route-driven list calls accept untrusted sort names for service-side normalization.
export interface AppWebhookDeliveryListRequestParamsInterface extends Omit<AppWebhookDeliveryListParamsInterface, "sort_by"> {
    sort_by?: string;
}
