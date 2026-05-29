import { markRaw } from "vue";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import { RegisteredAppListViewFiltersInterface } from "@/types/list_view_filter_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";

import RegisteredAppActionMenu from "@/action_menus/registered_app_action_menu";

import FormView from "@/views/registered_app/FormView.vue";

import ProfileView from "@/views/registered_app/ProfileView.vue";

import DeleteView from "@/views/registered_app/DeleteView.vue";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class RegisteredAppListViewActionHandler extends BaseListViewActionHandler<
    RegisteredAppRecordInterface,
    "public_id",
    RegisteredAppListViewFiltersInterface
> {
    constructor(controller: BaseListViewController<RegisteredAppRecordInterface, "public_id">) {
        super(
            controller,
            "registered_app_list_view_action_handler",
            {},
            RegisteredAppAPIService.getRegisteredAppList
        );

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to handle header button clicked
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {
        const { add_new_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: add_new_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(FormView),

            body_props: {}
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle row status chnage toglle
    public handleStatusToggleChange = async (
        record: RegisteredAppRecordInterface,
        input_value?: InputValue
    ): Promise<ActionMethodRetrunInterface> => {
        try {
            const public_id = record.public_id;

            if (!public_id) {
                return {
                    status: false,
                    msg: this.getContentMessage("record_not_found")
                };
            }

            const result = await RegisteredAppAPIService.updateRegisteredAppStatus(public_id);

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
                this.updateListStateRecord(
                    public_id,
                    { is_active: !record.is_active },
                    "public_id"
                );

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
            this.logger.error("Error changing status toggle: ", { error });
            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
    };

    // Method to toogle data table action menu
    public toggleActionMenu = (
        record: RegisteredAppRecordInterface,
        record_index?: number
    ): void => {
        const action_mneu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = RegisteredAppActionMenu.getMenus(record, this);

            this.setState("action_menu_dropdown_props", { menu_items: updated_menu });
        }

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(
            action_mneu_btn_id,
            action_menu_id,
            true
        );
    };

    // Method to handle view Action menu clicked
    public handleViewActionMenuClicked = async (
        record: RegisteredAppRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(ProfileView),

            body_props: { record_id: record?.public_id }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle on edit action menu clicked
    public handleEditActionMenuClicked = async (
        record: RegisteredAppRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { update_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: update_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(FormView),

            body_props: { record }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle on delete action menu clicked
    public handleDeleteActionMenuClicked = async (
        record: RegisteredAppRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { delete_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: delete_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(DeleteView),

            body_props: {
                record,
                record_id: record.public_id,
                content_key: delete_modal_content_key,
                on_delete_success: async (
                    deleted_record: RegisteredAppRecordInterface
                ): Promise<void> => {
                    this.removeListStateRecord(deleted_record.public_id, "public_id");
                }
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };
}

export default RegisteredAppListViewActionHandler;
