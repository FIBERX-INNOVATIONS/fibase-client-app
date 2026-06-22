import { NavLinkContentPayloadResultInterface, NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { TransactionRecordInterface } from "@/types/api_service_type";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import TransactionListViewActionHandler from "@/action_handlers/transaction/list_view_action_handler";

class TransactionActionMenu {
    // Method to build currently available transaction row actions.
    public static getMenus(
        record: TransactionRecordInterface,
        action_handler?: TransactionListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const content_manager = ContentManagerUtil.getInstance();
        const base_content_key = "content_resource.transaction_view_ui.list_view_ui.table.action_menu_list";
        const select_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.select_menu_option`
        );
        const view_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.view_menu_option`
        );

        return [
            {
                id: `${view_menu_content?.menu_text ?? "View"}ActionMenu${record.public_id.toUpperCase()}`,
                link: view_menu_content?.menu_link ?? "",
                icon: view_menu_content?.menu_icon ?? "view_eye_svg_icon",
                content: view_menu_content?.menu_text ?? "View",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        void event;
                        await action_handler?.handleViewActionMenuClicked(record, config);
                    }
                },
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo("transaction_module.get_transaction")
            },
            {
                id: `${select_menu_content?.menu_text ?? "Select"}ActionMenu${record.public_id.toUpperCase()}`,
                link: select_menu_content?.menu_link ?? "",
                icon: select_menu_content?.menu_icon ?? "check_circle_svg_icon",
                content: select_menu_content?.menu_text ?? "Select",
                action_props: {
                    on_click: async (): Promise<void> => {
                        await action_handler?.handleSelectActionMenuClicked(record);
                    }
                },
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission: true
            }
        ].filter((menu) => menu.has_permission);
    }
}

export default TransactionActionMenu;
