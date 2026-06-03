import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import {
    NavLinkUIPropsInterface,
    NavLinkContentPayloadResultInterface
} from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import PaymentProviderMethodListViewActionHandler from "@/action_handlers/payment_provider_method/list_view_action_handler";

class PaymentProviderMethodActionMenu {
    public static getMenus(
        record: PaymentProviderMethodRecordInterface,
        action_handler?: PaymentProviderMethodListViewActionHandler
    ): NavLinkUIPropsInterface[] {
        const class_styles =
            DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style;
        const content_manager = ContentManagerUtil.getInstance();
        const base_content_key =
            "content_resource.payment_provider_method_view_ui.list_view_ui.table.action_menu_list";
        const record_id = record?.id?.toString() ?? "";

        const view_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>?.(
            `${base_content_key}.view_menu_option`
        );
        const select_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>?.(
            `${base_content_key}.select_menu_option`
        );
        const edit_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>?.(
            `${base_content_key}.edit_menu_option`
        );
        const delete_menu_content = content_manager.get<NavLinkContentPayloadResultInterface>?.(
            `${base_content_key}.delete_menu_option`
        );

        const menus: NavLinkUIPropsInterface[] = [
            {
                id: `${view_menu_content?.menu_text ?? "view"}ActionMenu${record_id}`,
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
                    "payment_provider_method_module.get_payment_provider_method"
                )
            },
            {
                id: `${select_menu_content?.menu_text ?? "select"}ActionMenu${record_id}`,
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
                id: `${edit_menu_content?.menu_text ?? "edit"}ActionMenu${record_id}`,
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
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(
                    "payment_provider_method_module.update_payment_provider_method"
                )
            },
            {
                id: `${delete_menu_content?.menu_text ?? "delete"}ActionMenu${record_id}`,
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
                has_permission: MemberAuthenticatorUtil.memberHasPermissionTo(
                    "payment_provider_method_module.delete_payment_provider_method"
                )
            }
        ];

        return menus.filter((nav_obj: NavLinkUIPropsInterface) => nav_obj?.has_permission);
    }
}

export default PaymentProviderMethodActionMenu;
