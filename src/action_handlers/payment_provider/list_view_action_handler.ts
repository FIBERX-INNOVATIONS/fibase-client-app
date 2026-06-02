import { markRaw } from "vue";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import { PaymentProviderListViewFiltersInterface } from "@/types/list_view_filter_type";

import PaymentProviderAPIService from "@/api_services/payment_provider_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import PaymentProviderActionMenu from "@/action_menus/payment_provider_action_menu";

import AddEditFormView from "@/views/payment_provider/AddEditFormView.vue";

import ProfileView from "@/views/payment_provider/ProfileView.vue";

import DeleteView from "@/views/payment_provider/DeleteView.vue";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class PaymentProviderListViewActionHandler extends BaseListViewActionHandler<
    PaymentProviderRecordInterface,
    "code",
    PaymentProviderListViewFiltersInterface
> {
    constructor(controller: BaseListViewController<PaymentProviderRecordInterface, "code">) {
        super(
            controller,
            "payment_provider_list_view_action_handler",
            {},
            PaymentProviderAPIService.getPaymentProviderList
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
        record: PaymentProviderRecordInterface,
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

            const result = await PaymentProviderAPIService.updatePaymentProviderStatus(code);

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
                this.updateListStateRecord(code, { is_active: !record.is_active }, "code");

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
            this.logger.error("Error changing payment provider status toggle: ", { error });
            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
    };

    // Method to toggle data table action menu.
    public toggleActionMenu = (
        record: PaymentProviderRecordInterface,
        record_index?: number
    ): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = PaymentProviderActionMenu.getMenus(record, this);

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
        record: PaymentProviderRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(ProfileView),

            body_props: { record_id: record.code, record }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    public handleEditActionMenuClicked = async (
        record: PaymentProviderRecordInterface,
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
        record: PaymentProviderRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { delete_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: delete_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(DeleteView),

            body_props: {
                record,
                record_id: record.code,
                content_key: delete_modal_content_key,
                on_delete_success: async (
                    deleted_record: PaymentProviderRecordInterface
                ): Promise<void> => {
                    this.removeListStateRecord(deleted_record.code, "code");
                }
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };
}

export default PaymentProviderListViewActionHandler;
