import { TransactionRecordInterface } from "@/types/api_service_type";

import { TransactionListViewFiltersInterface } from "@/types/list_view_filter_type";

import TransactionAPIService from "@/api_services/transaction_api_service";

import TransactionActionMenu from "@/action_menus/transaction_action_menu";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class TransactionListViewActionHandler extends BaseListViewActionHandler<
    TransactionRecordInterface,
    "public_id",
    TransactionListViewFiltersInterface
> {
    // Method to initialise transaction list actions with the transaction list request.
    constructor(controller: BaseListViewController<TransactionRecordInterface, "public_id">) {
        super(controller, "transaction_list_view_action_handler", {}, TransactionAPIService.getTransactionList);
    }

    // Method to toggle the selected transaction's row action dropdown.
    public toggleActionMenu = (record: TransactionRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            this.setState("action_menu_dropdown_props", {
                menu_items: TransactionActionMenu.getMenus(record, this)
            });
        }

        DropdownMenuUIPropsBuilder.toggleDropdownMenu(action_menu_btn_id, action_menu_id, true);
    };
}

export default TransactionListViewActionHandler;
