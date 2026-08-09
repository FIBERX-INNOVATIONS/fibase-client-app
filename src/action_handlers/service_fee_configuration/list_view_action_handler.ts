import { markRaw } from "vue";

import { CSRF_TOKEN_FOR } from "@/configs";

import type { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import type { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import type { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import type { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import type { ServiceFeeConfigurationListViewFiltersInterface } from "@/types/list_view_filter_type";

import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

import AuthAPIService from "@/api_services/auth_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import AddEditFormView from "@/views/service_fee_configuration/AddEditFormView.vue";

import ProfileView from "@/views/service_fee_configuration/ProfileView.vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import ServiceFeeConfigurationAPIService from "@/api_services/service_fee_configuration_api_service";

import ServiceFeeConfigurationActionMenu from "@/action_menus/service_fee_configuration_action_menu";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

class ServiceFeeConfigurationListViewActionHandler extends BaseListViewActionHandler<
    ServiceFeeConfigurationRecordInterface,
    "public_id",
    ServiceFeeConfigurationListViewFiltersInterface
> {
    // Method to initialize the service fee list action handler.
    constructor(controller: BaseListViewController<ServiceFeeConfigurationRecordInterface, "public_id">) {
        super(
            controller,
            "service_fee_configuration_list_view_action_handler",
            {},
            ServiceFeeConfigurationAPIService.getServiceFeeConfigurationList
        );

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to open the create service fee configuration form.
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

        this.controller.event_bus?.emit("open_modal", modal_payload);
    };

    // Method to open the edit service fee configuration form with the selected record.
    public handleEditActionMenuClicked = async (
        record: ServiceFeeConfigurationRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { update_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: update_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(AddEditFormView),
            body_props: { record }
        };

        this.controller.event_bus?.emit("open_modal", modal_payload);
    };

    // Method to open the service fee configuration profile view.
    public handleViewActionMenuClicked = async (
        record: ServiceFeeConfigurationRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();
        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,
            animation_type: "slide_top",
            body_component: markRaw(ProfileView),
            body_props: { record_id: record.public_id, record }
        };

        this.controller.event_bus?.emit("open_modal", modal_payload);
    };

    // Method to update a service fee configuration status through its CSRF-protected endpoint.
    public handleStatusToggleChange = async (
        record: ServiceFeeConfigurationRecordInterface,
        input_value?: InputValue
    ): Promise<ActionMethodRetrunInterface> => {
        const csrf_response = await AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.SERVICE_FEE_CONFIGURATION);

        const csrf_token = csrf_response.data?.token;

        if (csrf_response.status !== "success" || !csrf_token) {
            return { status: false, msg: this.getContentMessage(csrf_response.msg ?? "invalid_csrf_token") };
        }

        const result = await ServiceFeeConfigurationAPIService.updateServiceFeeConfigurationStatus(record.public_id, {
            csrf_token
        });

        if (result.status === "logout") {
            this.controller.router.push("/logout");
            return { status: false, msg: this.getContentMessage("session_expired") };
        }

        if (result.status !== "success") {
            return { status: false, msg: this.getContentMessage(result.msg ?? "error_occurred") };
        }

        this.updateListStateRecord(record.public_id, { is_active: result.data?.new_status ?? !record.is_active }, "public_id");

        return { status: true, msg: this.getContentMessage(result.msg) };
    };

    // Method to toggle the row action menu.
    public toggleActionMenu = (record: ServiceFeeConfigurationRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);

        if (menu_el?.style?.display !== "block") {
            this.setState("action_menu_dropdown_props", {
                menu_items: ServiceFeeConfigurationActionMenu.getMenus(record, this)
            });
        }

        DropdownMenuUIPropsBuilder.toggleDropdownMenu(action_menu_btn_id, action_menu_id, true);
    };
}

export default ServiceFeeConfigurationListViewActionHandler;
