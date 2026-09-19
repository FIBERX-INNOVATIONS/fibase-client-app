import type { AppWebhookDeliverySortFieldType } from "@/types/app_webhook_delivery_type";

export const APP_WEBHOOK_DELIVERY_SORT_FIELDS: readonly AppWebhookDeliverySortFieldType[] = [
    "created_at",
    "updated_at",
    "event_type",
    "status",
    "attempts",
    "delivered_at"
];

export enum AppWebhookDeliveryStatusEnum {
    QUEUED = "queued",
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    RETRYING = "retrying",
    FAILED = "failed",
    DEAD_LETTER = "dead_letter"
}
