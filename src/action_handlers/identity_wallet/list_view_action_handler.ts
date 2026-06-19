import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import { IdentityWalletListViewFiltersInterface } from "@/types/list_view_filter_type";

import IdentityAPIService from "@/api_services/identity_api_service";

import IdentityWalletActionMenu from "@/action_menus/identity_wallet_action_menu";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import type IdentityWalletListViewController from "@/controllers/identity_wallet/list_view_controller";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class IdentityWalletListViewActionHandler extends BaseListViewActionHandler<
    IdentityWalletRecordInterface,
    "public_id",
    IdentityWalletListViewFiltersInterface
> {
    // Method to initialise the wallet list action handler with the scoped identity API request.
    constructor(controller: IdentityWalletListViewController) {
        super(
            controller as BaseListViewController<IdentityWalletRecordInterface, "public_id">,
            "identity_wallet_list_view_action_handler",
            {},
            (params) => IdentityAPIService.getIdentityWalletList(controller.identity_public_id, params)
        );
    }

    // Method to toggle the selected wallet's row action dropdown.
    public toggleActionMenu = (record: IdentityWalletRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            this.setState("action_menu_dropdown_props", {
                menu_items: IdentityWalletActionMenu.getMenus(record, this)
            });
        }

        DropdownMenuUIPropsBuilder.toggleDropdownMenu(action_menu_btn_id, action_menu_id, true);
    };
}

export default IdentityWalletListViewActionHandler;
