import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import { PaymentMethodListViewFiltersInterface } from "@/types/list_view_filter_type";

import PaymentMethodAPIService from "@/api_services/payment_method_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import PaymentMethodActionMenu from "@/action_menus/payment_method_action_menu";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class PaymentMethodListViewActionHandler extends BaseListViewActionHandler<
    PaymentMethodRecordInterface,
    "code",
    PaymentMethodListViewFiltersInterface
> {
    constructor(controller: BaseListViewController<PaymentMethodRecordInterface, "code">) {
        super(
            controller,
            "payment_method_list_view_action_handler",
            {},
            PaymentMethodAPIService.getPaymentMethodList
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
        record: PaymentMethodRecordInterface,
        input_value?: InputValue
    ): Promise<ActionMethodRetrunInterface> => {
        try {
            const code = record.code;

            if (!code) {
                return {
                    status: false,
                    msg: this.getContentMessage("record_not_found")
                };
            }

            const result = await PaymentMethodAPIService.updatePaymentMethodStatus(code);

            if (!result || result?.status === "error") {
                return {
                    status: false,
                    msg: this.getContentMessage(result?.msg ?? "error_occurred")
                };
            } else if (result.status === "logout") {
                this.controller.router.push("/logout");
                return {
                    status: false,
                    msg: this.getContentMessage("session_expired")
                };
            } else if (result.status === "success") {
                this.updateListStateRecord(code, { is_active: !record.is_active }, "code");

                return {
                    status: true,
                    msg: this.getContentMessage(result?.msg)
                };
            }

            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        } catch (error: unknown) {
            this.logger.error("Error changing payment method status toggle: ", { error });
            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
    };

    // Method to toggle data table action menu.
    public toggleActionMenu = (
        record: PaymentMethodRecordInterface,
        record_index?: number
    ): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = PaymentMethodActionMenu.getMenus(record, this);

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
        record: PaymentMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    // Method to handle edit action menu clicked.
    public handleEditActionMenuClicked = async (
        record: PaymentMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    // Method to handle delete action menu clicked.
    public handleDeleteActionMenuClicked = async (
        record: PaymentMethodRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};
}

export default PaymentMethodListViewActionHandler;
