import { markRaw } from "vue";

import { RoleRecordInterface } from "@/types/api_service_type";

import { RoleListFiltersInterface } from "@/types/list_view_filter_type";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import AccessControlAPIService from "@/api_services/access_control_api_service";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import AccessControlActionMenu from "@/action_menus/access_control_action_menu";

import AddEditFormView from "@/views/access_control/AddEditFormView.vue";

import ProfileView from "@/views/access_control/ProfileView.vue";

import DeleteView from "@/views/access_control/DeleteView.vue";

import PermissionsView from "@/views/access_control/PermissionsView.vue";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class AccessControlListViewActionHandler extends BaseListViewActionHandler<
    RoleRecordInterface,
    "id",
    RoleListFiltersInterface
> {
    constructor(controller: BaseListViewController<RoleRecordInterface, "id">) {
        super(controller, "access_control_list_view_action_handler", {}, AccessControlAPIService.getRoleList);
    }

    // Method to open create role form.
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {
        void event;
        void config;

        const { add_new_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: add_new_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(AddEditFormView),
            body_props: {}
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Methdo to toggle action menu display
    public toggleActionMenu = (record: RoleRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = AccessControlActionMenu.getMenus(record, this);

            this.setState("action_menu_dropdown_props", { menu_items: updated_menu });
        }

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(action_menu_btn_id, action_menu_id, true);
    };

    // Methdo to handle view action menu click
    public handleViewActionMenuClicked = async (
        record: RoleRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void config;

        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(ProfileView),
            body_props: {
                record,
                record_id: record?.id?.toString() ?? ""
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle edit action menu click
    public handleEditActionMenuClicked = async (
        record: RoleRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void config;

        const { update_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: update_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(AddEditFormView),
            body_props: { record }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle delete action menu click
    public handleDeleteActionMenuClicked = async (
        record: RoleRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void config;

        const { delete_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: delete_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(DeleteView),
            body_props: {
                record,
                record_id: record?.id?.toString() ?? "",
                content_key: delete_modal_content_key,
                on_delete_success: async (deleted_record: RoleRecordInterface): Promise<void> => {
                    this.removeListStateRecord(deleted_record.id, "id");
                }
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle assigned permission action menu click
    public handleAssignedPermissionsActionMenuClicked = async (
        record: RoleRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void config;

        const content_key = "content_resource.access_control_view_ui.modals_ui.permissions_modal_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,
            animation_type: "slide_top",
            body_component: markRaw(PermissionsView),
            body_props: {
                record,
                record_id: record?.id?.toString() ?? "",
                content_key
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    public handleAddPermissionsActionMenuClicked = async (
        record: RoleRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void record;
        void config;
    };
}

export default AccessControlListViewActionHandler;
