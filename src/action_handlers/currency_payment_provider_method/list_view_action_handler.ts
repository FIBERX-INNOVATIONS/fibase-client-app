import { markRaw } from "vue";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { CurrencyPaymentProviderMethodListViewFiltersInterface } from "@/types/list_view_filter_type";

import CurrencyPaymentProviderMethodAPIService from "@/api_services/currency_payment_provider_method_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import CurrencyPaymentProviderMethodActionMenu from "@/action_menus/currency_payment_provider_method_action_menu";

import AddEditFormView from "@/views/currency_payment_provider_method/AddEditFormView.vue";

import ProfileView from "@/views/currency_payment_provider_method/ProfileView.vue";

import DeleteView from "@/views/currency_payment_provider_method/DeleteView.vue";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class CurrencyPaymentProviderMethodListViewActionHandler extends BaseListViewActionHandler<
    CurrencyPaymentProviderMethodRecordInterface,
    "id",
    CurrencyPaymentProviderMethodListViewFiltersInterface
> {
    // Method to initialize list view action handler.
    constructor(
        controller: BaseListViewController<CurrencyPaymentProviderMethodRecordInterface, "id">
    ) {
        super(
            controller,
            "currency_payment_provider_method_list_view_action_handler",
            {},
            CurrencyPaymentProviderMethodAPIService.getCurrencyPaymentProviderMethodList
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

    // Method to handle row status change toggle.
    public handleStatusToggleChange = async (
        record: CurrencyPaymentProviderMethodRecordInterface,
        input_value?: InputValue
    ): Promise<ActionMethodRetrunInterface> => {
        try {
            const id = record.id;

            if (!id) {
                return {
                    status: false,
                    msg: this.getContentMessage("record_not_found")
                };
            }

            const result =
                await CurrencyPaymentProviderMethodAPIService.updateCurrencyPaymentProviderMethodStatus(
                    id
                );

            if (!result || result.status === "error") {
                return {
                    status: false,
                    msg: this.getContentMessage(result?.msg ?? "error_occurred")
                };
            }

            if (result.status === "logout") {
                this.controller.router.push("/logout");
                return {
                    status: false,
                    msg: this.getContentMessage("session_expired")
                };
            }

            if (result.status === "success") {
                const is_active = result.data?.new_status ?? !record.is_active;

                this.updateListStateRecord(id, { is_active }, "id");

                return {
                    status: true,
                    msg: this.getContentMessage(result.msg)
                };
            }

            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        } catch (error: unknown) {
            this.logger.error("Error changing currency payment provider method status toggle: ", {
                error
            });
            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
    };

    // Method to toggle data table action menu.
    public toggleActionMenu = (
        record: CurrencyPaymentProviderMethodRecordInterface,
        record_index?: number
    ): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = CurrencyPaymentProviderMethodActionMenu.getMenus(record, this);

            this.setState("action_menu_dropdown_props", { menu_items: updated_menu });
        }

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(
            action_menu_btn_id,
            action_menu_id,
            true
        );
    };

    // Method to handle view action menu clicked.
    public handleViewActionMenuClicked = async (
        record: CurrencyPaymentProviderMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(ProfileView),

            body_props: { record_id: record.id?.toString() ?? "", record }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle edit action menu clicked.
    public handleEditActionMenuClicked = async (
        record: CurrencyPaymentProviderMethodRecordInterface,
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

    // Method to handle delete action menu clicked.
    public handleDeleteActionMenuClicked = async (
        record: CurrencyPaymentProviderMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { delete_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: delete_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(DeleteView),

            body_props: {
                record,
                record_id: record.id?.toString() ?? "",
                content_key: delete_modal_content_key,
                on_delete_success: async (
                    deleted_record: CurrencyPaymentProviderMethodRecordInterface
                ): Promise<void> => {
                    this.removeListStateRecord(deleted_record.id ?? record.id ?? "", "id");
                }
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };
}

export default CurrencyPaymentProviderMethodListViewActionHandler;
