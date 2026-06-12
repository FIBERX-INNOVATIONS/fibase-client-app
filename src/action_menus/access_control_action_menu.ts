import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { RoleRecordInterface } from "@/types/api_service_type";

import { NavLinkContentPayloadResultInterface, NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import AccessControlListViewActionHandler from "@/action_handlers/access_control/list_view_action_handler";

class AccessControlActionMenu {
    private static memberCanPerformSuperAdminAction(permission: string): boolean {
        return (
            MemberAuthenticatorUtil.memberHasPermissionTo(permission) &&
            MemberAuthenticatorUtil.memberHasSuperAdminRole(MemberAuthenticatorUtil.getLoggedInMember())
        );
    }

    public static getMenus(
        record: RoleRecordInterface,
        action_handler?: AccessControlListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const class_styles = DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style;
        const content_manager = ContentManagerUtil.getInstance();
        const base_content_key = "content_resource.access_control_view_ui.list_view_ui.table.action_menu_list";
        const record_id = record?.id?.toString() ?? "";

        const view_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.view_menu_option`
        );
        const select_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.select_menu_option`
        );
        const edit_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.edit_menu_option`
        );
        const assigned_permissions_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.assigned_permissions_menu_option`
        );
        const add_permissions_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.add_permissions_menu_option`
        );
        const delete_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>(
            `${base_content_key}.delete_menu_option`
        );

        const menus: NavLinkUIPropsInterface[] = [
            // View Role Action Menu
            {
                id: `${view_menu_content?.menu_text ?? ""}ActionMenu${record_id}`,
                link: view_menu_content?.menu_link ?? "",
                icon: view_menu_content?.menu_icon,
                content: view_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleViewActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo("access_control_module.get_role_list")
            },
            // Select Role Action Menu
            {
                id: `${select_menu_content?.menu_text ?? ""}ActionMenu${record_id}`,
                link: select_menu_content?.menu_link ?? "",
                icon: select_menu_content?.menu_icon,
                content: select_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleSelectActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: true
            },
            // Edit Role Action Menu
            {
                id: `${edit_menu_content?.menu_text ?? ""}ActionMenu${record_id}`,
                link: edit_menu_content?.menu_link ?? "",
                icon: edit_menu_content?.menu_icon,
                content: edit_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleEditActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: this.memberCanPerformSuperAdminAction("access_control_module.update_role")
            },
            // View Role Permisisons Action Menu
            {
                id: `${assigned_permissions_menu_content?.menu_text ?? ""}ActionMenu${record_id}`,
                link: assigned_permissions_menu_content?.menu_link ?? "",
                icon: assigned_permissions_menu_content?.menu_icon,
                content: assigned_permissions_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleAssignedPermissionsActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo("access_control_module.get_role_permission_list")
            },
            // Add New Role Permissions Action Menu
            {
                id: `${add_permissions_menu_content?.menu_text ?? ""}ActionMenu${record_id}`,
                link: add_permissions_menu_content?.menu_link ?? "",
                icon: add_permissions_menu_content?.menu_icon,
                content: add_permissions_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleAddPermissionsActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: this.memberCanPerformSuperAdminAction(
                    "access_control_module.assign_or_unassign_role_permissions"
                )
            },
            // Delete Role Action Menu
            {
                id: `${delete_menu_content?.menu_text ?? ""}ActionMenu${record_id}`,
                link: delete_menu_content?.menu_link ?? "",
                icon: delete_menu_content?.menu_icon,
                content: delete_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleDeleteActionMenuClicked(record, config);
                    }
                },
                class_styles: DashboardLayoutClassStyles.delete_dropdown_menu_list_class_style,
                has_permission:
                    record.is_member_group && this.memberCanPerformSuperAdminAction("access_control_module.delete_role")
            }
        ];

        return menus.filter((nav_obj: NavLinkUIPropsInterface) => nav_obj?.has_permission);
    }
}

export default AccessControlActionMenu;
