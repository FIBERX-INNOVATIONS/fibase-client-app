import { markRaw } from "vue";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import { PaymentProviderConfigListViewFiltersInterface } from "@/types/list_view_filter_type";

import PaymentProviderConfigAPIService from "@/api_services/payment_provider_config_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import PaymentProviderConfigActionMenu from "@/action_menus/payment_provider_config_action_menu";

import AddEditFormView from "@/views/payment_provider_config/AddEditFormView.vue";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class PaymentProviderConfigListViewActionHandler extends BaseListViewActionHandler<
    PaymentProviderConfigRecordInterface,
    "provider_id",
    PaymentProviderConfigListViewFiltersInterface
> {
    constructor(
        controller: BaseListViewController<PaymentProviderConfigRecordInterface, "provider_id">
    ) {
        super(
            controller,
            "payment_provider_config_list_view_action_handler",
            {},
            PaymentProviderConfigAPIService.getPaymentProviderConfigList
        );

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to handle header button clicked.
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {
        const { add_new_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: add_new_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(AddEditFormView),

            body_props: {}
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to toggle data table action menu.
    public toggleActionMenu = (
        record: PaymentProviderConfigRecordInterface,
        record_index?: number
    ): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = PaymentProviderConfigActionMenu.getMenus(record, this);

            this.setState("action_menu_dropdown_props", { menu_items: updated_menu });
        }

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(
            action_menu_btn_id,
            action_menu_id,
            true
        );
    };

    // These actions are wired when their provider config views are implemented.
    public handleViewActionMenuClicked = async (
        record: PaymentProviderConfigRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleEditActionMenuClicked = async (
        record: PaymentProviderConfigRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { update_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: update_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(AddEditFormView),

            body_props: { record }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    public handleDeleteActionMenuClicked = async (
        record: PaymentProviderConfigRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};
}

export default PaymentProviderConfigListViewActionHandler;
