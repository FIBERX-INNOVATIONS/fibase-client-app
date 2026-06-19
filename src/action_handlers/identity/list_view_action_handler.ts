import { markRaw } from "vue";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { IdentityRecordInterface } from "@/types/api_service_type";

import { IdentityListViewFiltersInterface } from "@/types/list_view_filter_type";

import IdentityAPIService from "@/api_services/identity_api_service";

import IdentityActionMenu from "@/action_menus/identity_action_menu";

import ProfileView from "@/views/identity/ProfileView.vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class IdentityListViewActionHandler extends BaseListViewActionHandler<
    IdentityRecordInterface,
    "public_id",
    IdentityListViewFiltersInterface
> {
    constructor(controller: BaseListViewController<IdentityRecordInterface, "public_id">) {
        super(controller, "identity_list_view_action_handler", {}, IdentityAPIService.getIdentityList);
    }

    // Toggle the row action dropdown with actions for the selected identity.
    public toggleActionMenu = (record: IdentityRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            this.setState("action_menu_dropdown_props", {
                menu_items: IdentityActionMenu.getMenus(record, this)
            });
        }

        DropdownMenuUIPropsBuilder.toggleDropdownMenu(action_menu_btn_id, action_menu_id, true);
    };

    // Open the full identity record in the shared dashboard modal.
    public handleViewActionMenuClicked = async (
        record: IdentityRecordInterface,
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

    // This read-only module has no page-level create action.
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {
        void event;
        void config;
    };
}

export default IdentityListViewActionHandler;
