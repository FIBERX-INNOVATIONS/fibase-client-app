import { NavLinkContentPayloadResultInterface, NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import IdentityWalletLedgerListViewActionHandler from "@/action_handlers/identity_wallet_ledger/list_view_action_handler";

class IdentityWalletLedgerActionMenu {
    // Method to build permitted row actions for a wallet ledger entry.
    public static getMenus(
        record: IdentityWalletLedgerRecordInterface,
        action_handler?: IdentityWalletLedgerListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const content_manager = ContentManagerUtil.getInstance();
        const base_content_key = "content_resource.identity_wallet_ledger_view_ui.list_view_ui.table.action_menu_list";
        const view_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.view_menu_option`
        );

        return [
            {
                id: `${view_menu_content?.menu_text ?? "View"}ActionMenu${record.record_key}`,
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
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo("wallet_module.get_wallet_ledger_list")
            }
        ].filter((menu) => menu.has_permission);
    }
}

export default IdentityWalletLedgerActionMenu;
