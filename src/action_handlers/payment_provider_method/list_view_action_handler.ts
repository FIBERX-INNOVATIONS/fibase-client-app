import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { PaymentProviderMethodListViewFiltersInterface } from "@/types/list_view_filter_type";

import PaymentProviderMethodAPIService from "@/api_services/payment_provider_method_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import PaymentProviderMethodActionMenu from "@/action_menus/payment_provider_method_action_menu";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class PaymentProviderMethodListViewActionHandler extends BaseListViewActionHandler<
    PaymentProviderMethodRecordInterface,
    "id",
    PaymentProviderMethodListViewFiltersInterface
> {
    constructor(controller: BaseListViewController<PaymentProviderMethodRecordInterface, "id">) {
        super(
            controller,
            "payment_provider_method_list_view_action_handler",
            {},
            PaymentProviderMethodAPIService.getPaymentProviderMethodList
        );

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to handle header button clicked.
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {};

    // Method to handle row status change toggle.
    public handleStatusToggleChange = async (
        record: PaymentProviderMethodRecordInterface,
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
                await PaymentProviderMethodAPIService.updatePaymentProviderMethodStatus(id);

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
                this.updateListStateRecord(id, { is_active: !record.is_active }, "id");

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
            this.logger.error("Error changing payment provider method status toggle: ", {
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
        record: PaymentProviderMethodRecordInterface,
        record_index?: number
    ): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = PaymentProviderMethodActionMenu.getMenus(record, this);

            this.setState("action_menu_dropdown_props", { menu_items: updated_menu });
        }

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(
            action_menu_btn_id,
            action_menu_id,
            true
        );
    };

    public handleViewActionMenuClicked = async (
        record: PaymentProviderMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleEditActionMenuClicked = async (
        record: PaymentProviderMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleDeleteActionMenuClicked = async (
        record: PaymentProviderMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};
}

export default PaymentProviderMethodListViewActionHandler;
