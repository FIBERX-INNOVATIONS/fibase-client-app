import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

import type { NavLinkContentPayloadResultInterface, NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import type ServiceFeeConfigurationListViewActionHandler from "@/action_handlers/service_fee_configuration/list_view_action_handler";

class ServiceFeeConfigurationActionMenu {
    // Method to build the currently supported service fee list action menu.
    public static getMenus(
        record: ServiceFeeConfigurationRecordInterface,
        action_handler?: ServiceFeeConfigurationListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const content_manager = ContentManagerUtil.getInstance();

        const base_content_key = "content_resource.service_fee_configuration_view_ui.list_view_ui.table.action_menu_list";

        const select_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.select_menu_option`
        );
        const view_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.view_menu_option`
        );
        const edit_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.edit_menu_option`
        );

        const menus: NavLinkUIPropsInterface[] = [
            {
                id: `${view_menu_content?.menu_text ?? "view"}ActionMenu${record.public_id}`,
                link: view_menu_content?.menu_link ?? "",
                icon: view_menu_content?.menu_icon,
                content: view_menu_content?.menu_text ?? "View",
                action_props: {
                    on_click: async (): Promise<void> => {
                        await action_handler?.handleViewActionMenuClicked(record);
                    }
                },
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(
                    "service_fee_configuration_module.get_service_fee_configuration"
                )
            },
            // Select Action Menu
            {
                id: `${select_menu_content?.menu_text ?? "select"}ActionMenu${record.public_id}`,
                link: select_menu_content?.menu_link ?? "",
                icon: select_menu_content?.menu_icon,
                content: select_menu_content?.menu_text ?? "Select",
                action_props: {
                    on_click: async (): Promise<void> => {
                        await action_handler?.handleSelectActionMenuClicked(record);
                    }
                },
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission: true
            },

            // Edit Action Menu
            {
                id: `${edit_menu_content?.menu_text ?? "edit"}ActionMenu${record.public_id}`,
                link: edit_menu_content?.menu_link ?? "",
                icon: edit_menu_content?.menu_icon,
                content: edit_menu_content?.menu_text ?? "Edit",
                action_props: {
                    on_click: async (): Promise<void> => {
                        await action_handler?.handleEditActionMenuClicked(record);
                    }
                },
                class_styles: DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(
                    "service_fee_configuration_module.update_service_fee_configuration"
                )
            }
        ];

        return menus.filter((menu) => {
            return menu.has_permission;
        });
    }
}

export default ServiceFeeConfigurationActionMenu;
