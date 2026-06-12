import { RoleRecordInterface } from "@/types/api_service_type";

import { RoleListFiltersInterface } from "@/types/list_view_filter_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import AccessControlAPIService from "@/api_services/access_control_api_service";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import AccessControlActionMenu from "@/action_menus/access_control_action_menu";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class AccessControlListViewActionHandler extends BaseListViewActionHandler<
    RoleRecordInterface,
    "id",
    RoleListFiltersInterface
> {
    constructor(controller: BaseListViewController<RoleRecordInterface, "id">) {
        super(controller, "access_control_list_view_action_handler", {}, AccessControlAPIService.getRoleList);
    }

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
        void record;
        void config;
    };

    public handleEditActionMenuClicked = async (
        record: RoleRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void record;
        void config;
    };

    public handleAssignedPermissionsActionMenuClicked = async (
        record: RoleRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void record;
        void config;
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
