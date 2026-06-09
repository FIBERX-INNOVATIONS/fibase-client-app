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

    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {};

    public handleStatusToggleChange = async (
        record: MemberRecordInterface,
        input_value?: InputValue
    ): Promise<ActionMethodRetrunInterface> => {
        return { status: false, msg: "not_implemented" };
    };

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

    public handleViewActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleEditActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleActivityActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleSendActivationLinkActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleDeleteActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};

    public handleRestoreActionMenuClicked = async (
        record: MemberRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {};
}

export default MemberProfileListViewActionHandler;
