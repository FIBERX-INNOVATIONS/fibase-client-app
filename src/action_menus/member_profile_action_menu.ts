import { MemberRecordInterface } from "@/types/api_service_type";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { NavLinkUIPropsInterface, NavLinkContentPayloadResultInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import MemberProfileListViewActionHandler from "@/action_handlers/member_profile/list_view_action_handler";

class MemberProfileActionMenu {
    public static getMenus(
        record: MemberRecordInterface,
        action_handler?: MemberProfileListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const is_deleted = !!record?.is_deleted;

        const record_id = record?.public_id?.toString() ?? "";

        const content_manager = ContentManagerUtil.getInstance();

        const current_member = MemberAuthenticatorUtil.getLoggedInMember();

        const is_current_member_super_admin = MemberAuthenticatorUtil.memberHasSuperAdminRole(current_member);

        const is_record_super_admin = MemberAuthenticatorUtil.memberHasSuperAdminRole(record);

        const is_same_as_logged_in_member = MemberAuthenticatorUtil.isSameAsLoggedInMember(record);

        const class_styles = DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style;

        const base_content_key = "content_resource.member_profile_view_ui.list_view_ui.table.action_menu_list";

        const getContent = (key: string) =>
            content_manager.get<NavLinkContentPayloadResultInterface>(`${base_content_key}.${key}`);

        const view_menu_content = getContent("view_menu_option");
        const select_menu_content = getContent("select_menu_option");
        const edit_menu_content = getContent("edit_menu_option");
        const activity_menu_content = getContent("activity_menu_option");
        const manage_roles_menu_content = getContent("manage_roles_menu_option");
        const restore_menu_content = getContent("restore_menu_option");
        const delete_menu_content = getContent("delete_menu_option");
        const send_activation_link_menu_content = getContent("send_activation_link_menu_option");

        const can_view = MemberAuthenticatorUtil.memberHasPermissionTo("member_profile_module.get_member");

        const can_select = true;

        const can_edit =
            !is_deleted &&
            !is_record_super_admin &&
            (is_same_as_logged_in_member ||
                is_current_member_super_admin ||
                MemberAuthenticatorUtil.memberHasPermissionTo("member_profile_module.update_member"));

        const can_view_activity = MemberAuthenticatorUtil.memberHasPermissionTo("activity_module.get_activity_list");

        const can_manage_roles =
            !is_deleted &&
            !is_record_super_admin &&
            (MemberAuthenticatorUtil.memberHasPermissionTo("access_control_module.assign_actor_roles") ||
                MemberAuthenticatorUtil.memberHasPermissionTo("access_control_module.unassign_actor_roles"));

        const can_send_activation_email =
            !is_deleted &&
            !record.is_active &&
            !is_record_super_admin &&
            MemberAuthenticatorUtil.memberHasPermissionTo("member_profile_module.send_member_activation_link");

        const can_restore_deleted_profile =
            is_deleted &&
            is_current_member_super_admin &&
            !is_record_super_admin &&
            MemberAuthenticatorUtil.memberHasPermissionTo("member_profile_module.restore_member");

        const can_delete =
            !is_deleted &&
            !is_record_super_admin &&
            MemberAuthenticatorUtil.memberHasPermissionTo("member_profile_module.delete_member");

        const menus = [
            // View Action Menu
            {
                id: `${view_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: view_menu_content?.menu_link ?? "",
                icon: view_menu_content?.menu_icon,
                content: view_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleViewActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: can_view
            },
            // Select Action Menu
            {
                id: `${select_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: select_menu_content?.menu_link ?? "",
                icon: select_menu_content?.menu_icon,
                content: select_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleSelectActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: can_select
            },
            // Edit Action Menu
            {
                id: `${edit_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: edit_menu_content?.menu_link ?? "",
                icon: edit_menu_content?.menu_icon,
                content: edit_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleEditActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: can_edit
            },
            // View Activity Action Menu
            {
                id: `${activity_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: activity_menu_content?.menu_link ?? "",
                icon: activity_menu_content?.menu_icon,
                content: activity_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleActivityActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: can_view_activity
            },
            // Manage Roles Action Menu
            {
                id: `${manage_roles_menu_content?.menu_text ?? "ManageRoles"}ActionMenu${record_id.toUpperCase()}`,
                link: manage_roles_menu_content?.menu_link ?? "",
                icon: manage_roles_menu_content?.menu_icon,
                content: manage_roles_menu_content?.menu_text ?? "Manage Roles",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleManageRolesActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: can_manage_roles
            },
            // Send Activation Email Action Menu
            {
                id: `${send_activation_link_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: send_activation_link_menu_content?.menu_link ?? "",
                icon: send_activation_link_menu_content?.menu_icon,
                content: send_activation_link_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleSendActivationLinkActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: can_send_activation_email
            },
            // Restore Deleted Profile Action Menu
            {
                id: `${restore_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: restore_menu_content?.menu_link ?? "",
                icon: restore_menu_content?.menu_icon,
                content: restore_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleRestoreActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: can_restore_deleted_profile
            },
            // Delete Action Menu
            {
                id: `${delete_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: delete_menu_content?.menu_link ?? "",
                icon: delete_menu_content?.menu_icon,
                content: delete_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (event?: MouseEvent, config?: { props: NavLinkUIPropsInterface }): Promise<void> => {
                        return await action_handler?.handleDeleteActionMenuClicked(record, config);
                    }
                },
                class_styles: DashboardLayoutClassStyles.delete_dropdown_menu_list_class_style,
                has_permission: can_delete
            }
        ];

        return menus.filter((nav_obj: NavLinkUIPropsInterface) => {
            return nav_obj?.has_permission;
        });
    }
}

export default MemberProfileActionMenu;
