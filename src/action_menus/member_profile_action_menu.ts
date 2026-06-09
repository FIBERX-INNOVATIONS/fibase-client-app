import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { MemberRecordInterface } from "@/types/api_service_type";
import {
    NavLinkUIPropsInterface,
    NavLinkContentPayloadResultInterface
} from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";
import MemberProfileListViewActionHandler from "@/action_handlers/member_profile/list_view_action_handler";

class MemberProfileActionMenu {
    public static getMenus(
        record: MemberRecordInterface,
        action_handler?: MemberProfileListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const class_styles =
            DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style;
        const content_manager = ContentManagerUtil.getInstance();
        const base_content_key =
            "content_resource.member_profile_view_ui.list_view_ui.table.action_menu_list";
        const record_id = record?.public_id?.toString() ?? "";
        const is_deleted = !!record?.is_deleted;

        const getContent = (key: string) =>
            content_manager.get<NavLinkContentPayloadResultInterface>(`${base_content_key}.${key}`);

        const view_menu_content = getContent("view_menu_option");
        const select_menu_content = getContent("select_menu_option");
        const edit_menu_content = getContent("edit_menu_option");
        const activity_menu_content = getContent("activity_menu_option");
        const send_activation_link_menu_content = getContent("send_activation_link_menu_option");
        const restore_menu_content = getContent("restore_menu_option");
        const delete_menu_content = getContent("delete_menu_option");

        const menus = [
            {
                id: `${view_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: view_menu_content?.menu_link ?? "",
                icon: view_menu_content?.menu_icon,
                content: view_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleViewActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(
                    "member_profile_module.get_member"
                )
            },
            {
                id: `${select_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: select_menu_content?.menu_link ?? "",
                icon: select_menu_content?.menu_icon,
                content: select_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleSelectActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission: true
            },
            {
                id: `${edit_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: edit_menu_content?.menu_link ?? "",
                icon: edit_menu_content?.menu_icon,
                content: edit_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleEditActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission:
                    !is_deleted &&
                    MemberAuthenticatorUtil.memberHasPermissionTo(
                        "member_profile_module.update_member"
                    )
            },
            {
                id: `${activity_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: activity_menu_content?.menu_link ?? "",
                icon: activity_menu_content?.menu_icon,
                content: activity_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleActivityActionMenuClicked(
                            record,
                            config
                        );
                    }
                },
                class_styles,
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(
                    "activity_module.get_activity_list"
                )
            },
            {
                id: `${send_activation_link_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: send_activation_link_menu_content?.menu_link ?? "",
                icon: send_activation_link_menu_content?.menu_icon,
                content: send_activation_link_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleSendActivationLinkActionMenuClicked(
                            record,
                            config
                        );
                    }
                },
                class_styles,
                has_permission:
                    !is_deleted &&
                    !record.is_active &&
                    MemberAuthenticatorUtil.memberHasPermissionTo(
                        "member_profile_module.send_member_activation_link"
                    )
            },
            {
                id: `${restore_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: restore_menu_content?.menu_link ?? "",
                icon: restore_menu_content?.menu_icon,
                content: restore_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleRestoreActionMenuClicked(record, config);
                    }
                },
                class_styles,
                has_permission:
                    is_deleted &&
                    MemberAuthenticatorUtil.memberHasPermissionTo(
                        "member_profile_module.restore_member"
                    )
            },
            {
                id: `${delete_menu_content?.menu_text ?? ""}ActionMenu${record_id.toUpperCase()}`,
                link: delete_menu_content?.menu_link ?? "",
                icon: delete_menu_content?.menu_icon,
                content: delete_menu_content?.menu_text ?? "",
                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleDeleteActionMenuClicked(record, config);
                    }
                },
                class_styles: DashboardLayoutClassStyles.delete_dropdown_menu_list_class_style,
                has_permission:
                    !is_deleted &&
                    MemberAuthenticatorUtil.memberHasPermissionTo(
                        "member_profile_module.delete_member"
                    )
            }
        ];

        return menus.filter((nav_obj: NavLinkUIPropsInterface) => {
            return nav_obj?.has_permission;
        });
    }
}

export default MemberProfileActionMenu;
