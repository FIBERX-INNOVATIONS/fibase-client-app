import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";
import { APP_WEBHOOK_DELIVERY_SORT_FIELDS } from "@/configs/app_webhook_delivery_config";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import type { APIResponseInterface } from "@ui/version_3/types/util_type";

import type { ReplayAppWebhookDeliveryPayloadInterface, TestAppWebhookDeliveryPayloadInterface } from "@/types/form_data_type";

import type {
    AppWebhookDeliveryListRequestParamsInterface,
    AppWebhookDeliveryListResponseInterface,
    AppWebhookDeliveryRecordInterface
} from "@/types/app_webhook_delivery_type";

import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

class AppWebhookDeliveryAPIService extends BaseAPIService {
    // Method to authorize and normalize delivery history requests with translated failure responses.
    public static getDeliveryList = async (
        params?: AppWebhookDeliveryListRequestParamsInterface
    ): Promise<APIResponseInterface<AppWebhookDeliveryListResponseInterface>> => {
        const { page = 1, limit = 20, sort_by = "created_at", sort_direction = "desc", filters = {} } = params ?? {};
        const current_page = Math.max(1, page);
        const empty_result: AppWebhookDeliveryListResponseInterface = {
            records: [],
            total_items: 0,
            total_pages: 0,
            current_page
        };

        // Return empty list data so shared list state clears without depending on a view controller.
        if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.LIST)) {
            StatusAlertTriggerUtil.triggerAlert("error", "permission_denied", 4, undefined, false);
            return { status: "error", msg: "permission_denied", data: empty_result };
        }

        // Restrict URL-driven sorting and page size to the backend contract.
        const normalized_sort_by =
            APP_WEBHOOK_DELIVERY_SORT_FIELDS.find((field) => {
                return field === sort_by;
            }) ?? "created_at";

        const response = await this.queryAPI<AppWebhookDeliveryListResponseInterface>({
            url: "/app-webhook-delivery/list",
            method: "GET",
            params: {
                page: current_page - 1,
                limit: Math.min(limit, 200),
                sort_by: normalized_sort_by,
                sort_direction: sort_direction.toUpperCase(),
                ...filters
            }
        });

        if (response.status === "error") {
            StatusAlertTriggerUtil.triggerAlert("error", response.msg ?? "error_occurred", 4, undefined, false);
            return { ...response, data: empty_result };
        }

        if (response.data) {
            response.data = { ...response.data, current_page: response.data.current_page + 1 };
        }

        return response;
    };

    // Method to load a delivery by its public identifier.
    public static getDelivery = async (
        delivery_id: string
    ): Promise<APIResponseInterface<AppWebhookDeliveryRecordInterface>> => {
        return await this.queryAPI<AppWebhookDeliveryRecordInterface>({
            url: `/app-webhook-delivery/${encodeURIComponent(delivery_id)}`,
            method: "GET"
        });
    };

    // Method to request a signed test delivery for a registered app.
    public static testDelivery = async (
        data: TestAppWebhookDeliveryPayloadInterface
    ): Promise<APIResponseInterface<AppWebhookDeliveryRecordInterface>> => {
        return await this.queryAPI<AppWebhookDeliveryRecordInterface>({
            url: "/app-webhook-delivery/test",
            method: "POST",
            data,
            disable_retry: true
        });
    };

    // Method to replay an eligible failed or dead-letter delivery.
    public static replayDelivery = async (
        delivery_id: string,
        data: ReplayAppWebhookDeliveryPayloadInterface
    ): Promise<APIResponseInterface<AppWebhookDeliveryRecordInterface>> => {
        return await this.queryAPI<AppWebhookDeliveryRecordInterface>({
            url: `/app-webhook-delivery/${encodeURIComponent(delivery_id)}/replay`,
            method: "POST",
            data,
            disable_retry: true
        });
    };
}

export default AppWebhookDeliveryAPIService;
