import { markRaw } from "vue";

import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import { IdentityWalletLedgerListViewFiltersInterface } from "@/types/list_view_filter_type";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import IdentityWalletLedgerAPIService from "@/api_services/identity_wallet_ledger_api_service";

import IdentityWalletLedgerActionMenu from "@/action_menus/identity_wallet_ledger_action_menu";

import ProfileView from "@/views/identity_wallet_ledger/ProfileView.vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import type IdentityWalletLedgerListViewController from "@/controllers/identity_wallet_ledger/list_view_controller";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class IdentityWalletLedgerListViewActionHandler extends BaseListViewActionHandler<
    IdentityWalletLedgerRecordInterface,
    "record_key",
    IdentityWalletLedgerListViewFiltersInterface
> {
    // Method to initialise the ledger list action handler with its wallet-scoped request.
    constructor(controller: IdentityWalletLedgerListViewController) {
        super(
            controller as BaseListViewController<IdentityWalletLedgerRecordInterface, "record_key">,
            "identity_wallet_ledger_list_view_action_handler",
            {},
            (params) => IdentityWalletLedgerAPIService.getIdentityWalletLedgerList(controller.wallet_public_id, params)
        );
    }

    // Method to toggle the selected ledger entry's row action dropdown.
    public toggleActionMenu = (record: IdentityWalletLedgerRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            this.setState("action_menu_dropdown_props", {
                menu_items: IdentityWalletLedgerActionMenu.getMenus(record, this)
            });
        }

        DropdownMenuUIPropsBuilder.toggleDropdownMenu(action_menu_btn_id, action_menu_id, true);
    };

    // Method to open the complete in-memory ledger entry in the shared dashboard modal.
    public handleViewActionMenuClicked = async (
        record: IdentityWalletLedgerRecordInterface,
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
                record_id: record.record_key
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };
}

export default IdentityWalletLedgerListViewActionHandler;
