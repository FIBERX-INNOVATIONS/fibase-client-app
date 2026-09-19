import { AppWebhookDeliveryStatusEnum } from "@/configs/app_webhook_delivery_config";

import { markRaw } from "vue";

import type { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

import type { ProfileViewPropsInterface } from "@/ui_types/profile_view_type";

import type { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";

import type {
    AppWebhookDeliveryListFiltersInterface,
    AppWebhookDeliveryRecordInterface
} from "@/types/app_webhook_delivery_type";

import ReplayView from "@/views/app_webhook_delivery/ReplayView.vue";

import ProfileView from "@/views/app_webhook_delivery/ProfileView.vue";

import TestFormView from "@/views/app_webhook_delivery/TestFormView.vue";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import AppWebhookDeliveryAPIService from "@/api_services/app_webhook_delivery_api_service";

import AppWebhookDeliveryActionMenu from "@/action_menus/app_webhook_delivery_action_menu";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

class AppWebhookDeliveryListViewActionHandler extends BaseListViewActionHandler<
    AppWebhookDeliveryRecordInterface,
    "public_id",
    AppWebhookDeliveryListFiltersInterface
> {
    // Method to connect shared list actions to the permission-checked delivery request.
    constructor(controller: BaseListViewController<AppWebhookDeliveryRecordInterface, "public_id">) {
        super(controller, "app_webhook_delivery_list_view_action_handler", {}, AppWebhookDeliveryAPIService.getDeliveryList);
    }

    // Method to open the test webhook form for members permitted to send diagnostic events.
    public handleTestDeliveryClicked = async (): Promise<void> => {
        if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.TEST)) {
            return;
        }

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: "content_resource.app_webhook_delivery_view_ui.modals_ui.test_delivery_modal_ui",
            animation_type: "slide_top",
            body_component: markRaw(TestFormView)
        };

        this.controller.event_bus?.emit("open_modal", modal_payload);
    };

    // Method to open the selected delivery's permitted row actions.
    public toggleActionMenu = (record: AppWebhookDeliveryRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";
        const menu_items = is_open ? [] : AppWebhookDeliveryActionMenu.getMenus(record, this);

        this.setState("action_menu_dropdown_props", { menu_items });

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(action_menu_btn_id, action_menu_id, true);
    };

    // Method to open fresh delivery details in the shared profile modal.
    public handleViewActionMenuClicked = async (record: AppWebhookDeliveryRecordInterface): Promise<void> => {
        if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.VIEW)) {
            return;
        }
        const modal_payload: OpenModalEventPayloadInterface<ProfileViewPropsInterface<AppWebhookDeliveryRecordInterface>> = {
            content_key: this.controller.getPageContentKeys().profile_details_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(ProfileView),
            body_props: { record_id: record.public_id }
        };

        this.controller.event_bus?.emit("open_modal", modal_payload);
    };

    // Method to confirm eligible delivery replays and refresh the active filtered page afterwards.
    public handleReplayActionMenuClicked = async (record: AppWebhookDeliveryRecordInterface): Promise<void> => {
        if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.REPLAY)) {
            return;
        }

        if (
            record.status !== AppWebhookDeliveryStatusEnum.FAILED &&
            record.status !== AppWebhookDeliveryStatusEnum.DEAD_LETTER
        ) {
            StatusAlertTriggerUtil.triggerAlert("warning", "app_webhook_delivery_cannot_be_replayed", 4, undefined, false);
            return;
        }

        const content_key = "content_resource.app_webhook_delivery_view_ui.modals_ui.replay_delivery_modal_ui";

        const modal_payload: OpenModalEventPayloadInterface<DeleteViewPropsInterface<AppWebhookDeliveryRecordInterface>> = {
            content_key,
            animation_type: "slide_top",
            body_component: markRaw(ReplayView),
            body_props: {
                content_key,
                record_id: record.public_id,
                record,
                on_delete_success: async (): Promise<void> => {
                    await this.fetchRecords();
                    const list_state = this.controller.getListState();

                    if (list_state.current_page > 1 && list_state.current_page > list_state.total_pages) {
                        await this.handleOnPageChange(Math.max(1, list_state.total_pages));
                    }
                }
            }
        };
        this.controller.event_bus?.emit("open_modal", modal_payload);
    };
}

export default AppWebhookDeliveryListViewActionHandler;
