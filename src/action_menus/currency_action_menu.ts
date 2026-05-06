
import { useRoute } from "vue-router";
import { FieldArray } from "@/ui_types/list_view_type";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import { CurrencyRecordInterface } from "@/types/api_service_type";
import { 
    NavLinkUIPropsInterface,
    NavLinkContentPayloadResultInterface
} from "@ui/version_3/ui_types/nav_link_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";
import CurrencyListViewActionHandler from "@/action_handlers/currency/list_view_action_handler";



class CurrencyActionMenu {

    public static getMenus(
        record: CurrencyRecordInterface,
        action_handler?: CurrencyListViewActionHandler,
        route?: ReturnType<typeof useRoute>,
    ): NavLinkUIPropsInterface[] { 

        const class_styles      = DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style
        const content_manager   = ContentManagerUtil.getInstance();
        const base_content_key  = "content_resource.currency_view_ui.list_view_ui.table.action_menu_list";
        const record_id         = record?.code?.toString();

        // menu contents
        const view_menu_content         = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.view_menu_option`);
        const select_menu_content       = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.select_menu_option`);
        const edit_menu_content         = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.edit_menu_option`);
        const assign_menu_content       = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.assign_menu_option`);
        const un_assign_menu_content    = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.un_assign_menu_option`);
        const set_default_menu_content  = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.set_default_menu_option`);
        const delete_menu_content       = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.delete_menu_option`);

        const menus = [
            // View menu
            {
                id: `${ view_menu_content?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

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

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.get_currency")
                )

            },
            // Select Menu
            {
                id: `${ select_menu_content?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

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
            // Edit Menu
            {
                id: `${ edit_menu_content?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

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

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.update_currency") &&
                    !record?.is_active
                )

            },
            // assign to app
            {
                id: `${ assign_menu_content?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

                link: assign_menu_content?.menu_link ?? "",

                icon: assign_menu_content?.menu_icon,

                content: assign_menu_content?.menu_text ?? "",

                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleOpenAssignFormView(record, config);
                    }
                },

                class_styles,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.assign_or_unassign_a_currency_to_an_app") &&
                    Boolean(route?.query?.app_id) &&
                    (route?.query?.unassigned_to_app?.toString() ?? "")?.trim() === "true" &&
                    (record?.app_currencies)?.length === 0
                )

            },
            // un-assign to app
            {
                id: `${ un_assign_menu_content?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

                link: un_assign_menu_content?.menu_link ?? "",

                icon: un_assign_menu_content?.menu_icon,

                content: un_assign_menu_content?.menu_text ?? "",

                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleOpenConfirmUnAssignView(record, config);
                    }
                },

                class_styles,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.delete_currency") &&
                    Boolean(route?.query?.app_id) &&
                    (!route?.query?.unassigned_to_app || route?.query?.unassigned_to_app?.toString()?.trim() === "false") &&
                    (record?.app_currencies?.length ?? 0) > 0
                )

            },
            // set as default to app
            {
                id: `${ set_default_menu_content?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

                link: set_default_menu_content?.menu_link ?? "",

                icon: set_default_menu_content?.menu_icon,

                content: set_default_menu_content?.menu_text ?? "",

                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleOpenConfirmSetAsDefultView(record, config);
                    }
                },

                class_styles,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.update_default_currency") &&
                    Boolean(route?.query?.app_id) &&
                    (route?.query?.unassigned_to_app?.toString()?.trim() === "false") &&
                    (record?.app_currencies?.length ?? 0) > 0 &&
                    (record?.app_currencies?.[0].is_default === false)
                )

            },
            // Delete Menu
            {
                id: `${ delete_menu_content?.menu_text ?? "" }ActionMenu${ record_id.toUpperCase() }`,

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

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.delete_currency") &&
                    !record.is_active
                )

            }
        ];

        return menus.filter((nav_obj: NavLinkUIPropsInterface) => { return nav_obj?.has_permission });
    }

    public static getBulkActionMenus (
        selected_records: FieldArray<CurrencyRecordInterface, keyof CurrencyRecordInterface>,
        action_handler?: CurrencyListViewActionHandler,
        route?: ReturnType<typeof useRoute>,
    ): NavLinkUIPropsInterface[] { 

        const class_styles      = DashboardLayoutClassStyles.member_avatar_dropdown_menu_list_class_style
        const content_manager   = ContentManagerUtil.getInstance();
        const base_content_key  = "content_resource.currency_view_ui.list_view_ui.table.bulk_action_menu_list";

        const assign_menu_content       = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.assign_menu_option`);
        const un_assign_menu_content    = content_manager.get<NavLinkContentPayloadResultInterface>?.(`${base_content_key}.un_assign_menu_option`);

        console.log({ selected_records })
        const menus: NavLinkUIPropsInterface[] = [
             // assign to app
            {
                id: `${ assign_menu_content?.menu_text ?? "" }BulkActionMenu${selected_records.length }`,

                link: assign_menu_content?.menu_link ?? "",

                icon: assign_menu_content?.menu_icon,

                content: assign_menu_content?.menu_text ?? "",

                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleOpenAssignFormView(null, config, selected_records);
                    }
                },

                class_styles,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.assign_or_unassign_a_currency_to_an_app") &&
                    Boolean(route?.query?.app_id) &&
                    (route?.query?.unassigned_to_app?.toString() ?? "")?.trim() === "true" &&
                    (selected_records)?.length > 0
                )

            },
            // un-assign to app
            {
                id: `${ un_assign_menu_content?.menu_text ?? "" }BulkActionMenu${ selected_records.length }`,

                link: un_assign_menu_content?.menu_link ?? "",

                icon: un_assign_menu_content?.menu_icon,

                content: un_assign_menu_content?.menu_text ?? "",

                action_props: {
                    on_click: async (
                        event?: MouseEvent,
                        config?: { props: NavLinkUIPropsInterface }
                    ): Promise<void> => {
                        return await action_handler?.handleOpenConfirmUnAssignView(null, config, selected_records);
                    }
                },

                class_styles,

                has_permission: (
                    MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.delete_currency") &&
                    Boolean(route?.query?.app_id) &&
                    (!route?.query?.unassigned_to_app || route?.query?.unassigned_to_app?.toString()?.trim() === "false") &&
                    (selected_records)?.length > 0
                )

            },
        ]

        console.log({ menus })

        return menus.filter((nav_obj: NavLinkUIPropsInterface) => { return nav_obj?.has_permission });
    }
}

export default CurrencyActionMenu