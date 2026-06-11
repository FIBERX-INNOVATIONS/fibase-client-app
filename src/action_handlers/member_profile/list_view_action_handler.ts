import { markRaw } from "vue";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { MemberRecordInterface } from "@/types/api_service_type";

import { MemberListFiltersInterface } from "@/types/list_view_filter_type";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import MemberProfileActionMenu from "@/action_menus/member_profile_action_menu";

import AddEditFormView from "@/views/member_profile/AddEditFormView.vue";
import DeleteView from "@/views/member_profile/DeleteView.vue";
import RestoreMemberView from "@/views/member_profile/RestoreMemberView.vue";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class MemberProfileListViewActionHandler extends BaseListViewActionHandler<
    MemberRecordInterface,
    "public_id",
    MemberListFiltersInterface
> {
    constructor(controller: BaseListViewController<MemberRecordInterface, "public_id">) {
        super(
            controller,
            "member_profile_list_view_action_handler",
            { is_deleted: "false" },
            MemberProfileAPIService.getMemberList
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

            body_component: markRaw(AddEditFormView),

            body_props: {}
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle row status chnage toglle
    public handleStatusToggleChange = async (
        record: MemberRecordInterface,
        input_value?: InputValue
    ): Promise<ActionMethodRetrunInterface> => {
        return { status: false, msg: "not_implemented" };
    };

    // Method to toogle data table action menu
    public toggleActionMenu = (record: MemberRecordInterface, record_index?: number): void => {
        const action_menu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = MemberProfileActionMenu.getMenus(record, this);

            this.setState("action_menu_dropdown_props", { menu_items: updated_menu });
        }

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(
            action_menu_btn_id,
            action_menu_id,
            true
        );
    };

    // Method to handle view Action menu clicked
    public handleViewActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    // Method to handle on edit action menu clicked
    public handleEditActionMenuClicked = async (
        record: MemberRecordInterface,
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

    // Method to handle view activity Menu clicked
    public handleActivityActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    // Method to handle Send Activation Link action menu clicked
    public handleSendActivationLinkActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    // Method to handle on delete action menu clicked
    public handleDeleteActionMenuClicked = async (
        record: MemberRecordInterface,
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
                on_delete_success: async (deleted_record: MemberRecordInterface): Promise<void> => {
                    await this.fetchRecords();
                }
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle restore action menu clicked
    public handleRestoreActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const content_key = "content_resource.member_profile_view_ui.modals_ui.restore_modal_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,

            animation_type: "slide_top",

            body_component: markRaw(RestoreMemberView),

            body_props: {
                record,
                record_id: record.public_id,
                content_key,
                on_delete_success: async (
                    restored_record: MemberRecordInterface
                ): Promise<void> => {
                    await this.fetchRecords();
                }
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };
}

export default MemberProfileListViewActionHandler;
