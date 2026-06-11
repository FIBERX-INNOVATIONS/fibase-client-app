import { markRaw } from "vue";

import { CSRF_TOKEN_FOR } from "@/configs";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { MemberRecordInterface } from "@/types/api_service_type";

import { MemberListFiltersInterface } from "@/types/list_view_filter_type";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";
import AuthAPIService from "@/api_services/auth_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import MemberProfileActionMenu from "@/action_menus/member_profile_action_menu";

import AddEditFormView from "@/views/member_profile/AddEditFormView.vue";
import DeleteView from "@/views/member_profile/DeleteView.vue";
import ProfileView from "@/views/member_profile/ProfileView.vue";
import RestoreMemberView from "@/views/member_profile/RestoreMemberView.vue";
import SendActivationLinkView from "@/views/member_profile/SendActivationLinkView.vue";

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
        try {
            const public_id = record.public_id;

            if (!public_id) {
                return {
                    status: false,
                    msg: this.getContentMessage("record_not_found")
                };
            }

            if (!record.is_active || input_value === true || input_value === "true") {
                StatusAlertTriggerUtil.triggerAlert(
                    "warning",
                    "member_profile_activation_not_allowed"
                );

                return {
                    status: false,
                    msg: ""
                };
            }

            const current_member = MemberAuthenticatorUtil.getLoggedInMember();
            const is_current_member_super_admin =
                MemberAuthenticatorUtil.memberHasSuperAdminRole(current_member);

            if (!is_current_member_super_admin) {
                StatusAlertTriggerUtil.triggerAlert(
                    "warning",
                    "member_profile_deactivation_super_admin_required"
                );

                return {
                    status: false,
                    msg: ""
                };
            }

            if (MemberAuthenticatorUtil.memberHasSuperAdminRole(record)) {
                StatusAlertTriggerUtil.triggerAlert(
                    "warning",
                    "super_admin_member_cannot_be_deactivated"
                );

                return {
                    status: false,
                    msg: ""
                };
            }

            const csrf_token_result = await AuthAPIService.getFormCSRFToken(
                CSRF_TOKEN_FOR.MEMBER_PROFILE
            );
            const csrf_token = csrf_token_result?.data?.token ?? "";

            if (!csrf_token) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_csrf_token")
                };
            }

            const result = await MemberProfileAPIService.updateMemberStatus(public_id, {
                csrf_token
            });

            if (!result || result?.status === "error") {
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
                this.updateListStateRecord(
                    public_id,
                    result.data ?? { is_active: false },
                    "public_id"
                );

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
            this.logger.error("Error changing member profile status toggle: ", { error });
            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
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
    ): Promise<void> => {
        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(ProfileView),

            body_props: { record_id: record?.public_id, record }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

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
    ): Promise<void> => {
        await this.controller.router.push({
            path: "/activities",
            query: {
                member_public_id: record.public_id
            }
        });
    };

    // Method to handle Send Activation Link action menu clicked
    public handleSendActivationLinkActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const content_key =
            "content_resource.member_profile_view_ui.modals_ui.send_activation_link_modal_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,

            animation_type: "slide_top",

            body_component: markRaw(SendActivationLinkView),

            body_props: {
                record,
                record_id: record.public_id,
                content_key
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

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
