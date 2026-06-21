import { markRaw } from "vue";

import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import { IdentityWalletListViewFiltersInterface } from "@/types/list_view_filter_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import IdentityAPIService from "@/api_services/identity_api_service";

import IdentityWalletActionMenu from "@/action_menus/identity_wallet_action_menu";

import ProfileView from "@/views/identity_wallet/ProfileView.vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import type IdentityWalletListViewController from "@/controllers/identity_wallet/list_view_controller";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class IdentityWalletListViewActionHandler extends BaseListViewActionHandler<
    IdentityWalletRecordInterface,
    "public_id",
    IdentityWalletListViewFiltersInterface
> {
    private readonly identity_wallet_controller: IdentityWalletListViewController;

    // Method to initialise the wallet list action handler with the scoped identity API request.
    constructor(controller: IdentityWalletListViewController) {
        super(
            controller as BaseListViewController<IdentityWalletRecordInterface, "public_id">,
            "identity_wallet_list_view_action_handler",
            {},
            (params) => IdentityAPIService.getIdentityWalletList(controller.identity_public_id, params)
        );

        this.identity_wallet_controller = controller;
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

    // Method to open the selected wallet profile in the shared dashboard modal.
    public handleViewActionMenuClicked = async (
        record: IdentityWalletRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void config;

        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(ProfileView),
            body_props: {
                record_id: record.public_id,
                record
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to open the selected wallet's standalone ledger list in a separate tab.
    public handleLedgerActionMenuClicked = async (
        record: IdentityWalletRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        void config;

        const route = this.controller.router.resolve({
            name: "IdentityWalletLedgerList",
            params: {
                wallet_id: record.public_id,
                identity_public_id: this.identity_wallet_controller.identity_public_id
            }
        });
        const opened_window = window.open(route.href, "_blank");

        if (opened_window) {
            opened_window.opener = null;
        } else {
            await this.controller.router.push(route.fullPath);
        }
    };
}

export default IdentityWalletListViewActionHandler;
