import { NavLinkContentPayloadResultInterface, NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import IdentityWalletListViewActionHandler from "@/action_handlers/identity_wallet/list_view_action_handler";

class IdentityWalletActionMenu {
    // Method to build permitted row actions for an identity wallet.
    public static getMenus(
        record: IdentityWalletRecordInterface,
        action_handler?: IdentityWalletListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const content_manager = ContentManagerUtil.getInstance();
        const base_content_key = "content_resource.identity_wallet_view_ui.list_view_ui.table.action_menu_list";
        const select_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.select_menu_option`
        );
        const record_id = record.public_id.toUpperCase();

        return [
            {
                id: `${select_menu_content?.menu_text ?? "Select"}ActionMenu${record_id}`,
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
        ];
    }
}

export default IdentityWalletActionMenu;
