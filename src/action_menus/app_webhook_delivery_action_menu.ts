import { AppWebhookDeliveryStatusEnum } from "@/configs/app_webhook_delivery_config";

import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";

import type { AppWebhookDeliveryRecordInterface } from "@/types/app_webhook_delivery_type";

import type AppWebhookDeliveryListViewActionHandler from "@/action_handlers/app_webhook_delivery/list_view_action_handler";

import type { NavLinkContentPayloadResultInterface, NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

class AppWebhookDeliveryActionMenu {
    // Method to build permitted selection, detail, and eligible replay actions.
    public static getMenus(
        record: AppWebhookDeliveryRecordInterface,
        action_handler: AppWebhookDeliveryListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const content_manager = ContentManagerUtil.getInstance();

        const is_replayable =
            record.status === AppWebhookDeliveryStatusEnum.FAILED || record.status === AppWebhookDeliveryStatusEnum.DEAD_LETTER;

        const base_key = "content_resource.app_webhook_delivery_view_ui.list_view_ui.table.action_menu_list";

        const view_content = content_manager.get<NavLinkContentPayloadResultInterface>(`${base_key}.view_menu_option`);

        const select_content = content_manager.get<NavLinkContentPayloadResultInterface>(`${base_key}.select_menu_option`);

        const replay_content = content_manager.get<NavLinkContentPayloadResultInterface>(`${base_key}.replay_menu_option`);

        return [
            // View Menu
            {
                id: `viewDelivery${record.public_id}`,
                link: "",
                content: view_content?.menu_text ?? "View Details",
                icon: view_content?.menu_icon ?? "view_eye_svg_icon",
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.VIEW),
                action_props: {
                    on_click: async (): Promise<void> => {
                        return await action_handler?.handleViewActionMenuClicked(record);
                    }
                }
            },

            //  Select Menu
            {
                id: `selectDelivery${record.public_id}`,
                link: "",
                content: select_content?.menu_text ?? "Select / Deselect",
                icon: select_content?.menu_icon ?? "check_circle_svg_icon",
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.LIST),
                action_props: {
                    on_click: async (): Promise<void> => {
                        return await action_handler?.handleSelectActionMenuClicked(record);
                    }
                }
            },

            // Replay Delivery Menu
            {
                id: `replayDelivery${record.public_id}`,
                link: "",
                content: replay_content?.menu_text ?? "Replay Delivery",
                icon: replay_content?.menu_icon ?? "clock_svg_icon",
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission:
                    is_replayable && MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.REPLAY),
                action_props: {
                    on_click: async (): Promise<void> => {
                        await action_handler.handleReplayActionMenuClicked(record);
                    }
                }
            }
        ].filter((menu) => {
            return menu.has_permission;
        });
    }
}

export default AppWebhookDeliveryActionMenu;
