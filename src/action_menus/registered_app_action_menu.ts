
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";
import { 
    NavLinkUIPropsInterface,
    NavLinkContentPayloadResultInterface
} from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";
import RegisteredAppListViewActionHandler from "@/action_handlers/registered_app/list_view_action_handler";

class RegisteredAppActionMenu {

    public static getMenus(
        record: RegisteredAppRecordInterface,
        action_handler?: RegisteredAppListViewActionHandler
    ): NavLinkUIPropsInterface[] { 

        const class_styles      = DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style
        const content_manager   = ContentManagerUtil.getInstance();
        const content_key       = "content_resource.registered_app_view_ui.list_view_ui.table.action_menu_list";
        const content           = content_manager.get<NavLinkContentPayloadResultInterface[]>(content_key, []) ?? [];
        const record_id         = record?.public_id?.toString();


        const menus = [
            // View menu
            {
                id: `${ content?.[0]?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

                link: content?.[0]?.menu_link ?? "",

                icon: content?.[0]?.menu_icon,

                content: content?.[0]?.menu_text ?? "",

                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleViewActionMenuClicked(record, config);
                    }
                },

                class_styles,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("registered_app_module.get_registered_app")
                )

            },
            // Select Menu
            {
                id: `${ content?.[1]?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

                link: content?.[1]?.menu_link ?? "",

                icon: content?.[1]?.menu_icon,

                content: content?.[1]?.menu_text ?? "",

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
            // Edit Menu
            {
                id: `${ content?.[2]?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

                link: content?.[2]?.menu_link ?? "",

                icon: content?.[2]?.menu_icon,

                content: content?.[2]?.menu_text ?? "",

                action_props: {},

                class_styles,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("registered_app_module.update_registered_app") &&
                    !record?.is_active
                )

            },
            // Delete Menu
            {
                id: `${ content?.[3]?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

                link: content?.[3]?.menu_link ?? "",

                icon: content?.[3]?.menu_icon,

                content: content?.[3]?.menu_text ?? "",

                action_props: {},

                class_styles: DashboardLayoutClassStyles.delete_dropdown_menu_list_class_style,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("registered_app_module.delete_registered_app") &&
                    !record.is_active
                )

            }
        ];

        return menus.filter((nav_obj: NavLinkUIPropsInterface) => { return nav_obj?.has_permission });
    }
}

export default RegisteredAppActionMenu