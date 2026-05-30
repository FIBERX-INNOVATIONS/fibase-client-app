import { markRaw } from "vue";

import { FieldArray } from "@/ui_types/list_view_type";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import { CurrencyListViewFiltersInterface } from "@/types/list_view_filter_type";

import CurrencyAPIService from "@/api_services/currency_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import CurrencyActionMenu from "@/action_menus/currency_action_menu";

import DeleteView from "@/views/currency/DeleteView.vue";

import ProfileView from "@/views/currency/ProfileView.vue";

import AddEditFormView from "@/views/currency/AddEditFormView.vue";

import AssignCurrencyFormView from "@/views/currency/AssignCurrencyFormView.vue";

import SetDefaultCurrencyView from "@/views/currency/SetDefaultCurrencyView.vue";

import UnAssignCurrencyView from "@/views/currency/UnAssignCurrencyView.vue";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

class CurrencyListViewActionHandler extends BaseListViewActionHandler<
    CurrencyRecordInterface,
    "code",
    CurrencyListViewFiltersInterface
> {
    constructor(controller: BaseListViewController<CurrencyRecordInterface, "code">) {
        super(
            controller,
            "currency_list_view_action_handler",
            {},
            CurrencyAPIService.getCurrencyList
        );

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to help resolve currency codes
    private resolveCurrencyCodes = (
        record: CurrencyRecordInterface | null,
        selected_records: FieldArray<CurrencyRecordInterface, "code"> = []
    ): string[] => {
        if (record?.code) {
            return [record.code];
        }

        return selected_records.map((code) => code.toString());
    };

    // Method to get route app id
    private getRouteAppId = (): string => {
        const app_id = this.controller?.route?.query?.app_id;

        return Array.isArray(app_id) ? (app_id[0] ?? "") : (app_id?.toString() ?? "");
    };

    // Method to clear bulk selection
    private clearBulkSelection = (): void => {
        const sn_cell = this.getSerialCell();
        const data_table_result_and_bulk_action_bar_props = this.getState(
            "data_table_result_and_bulk_action_bar_props"
        );
        const bulk_action_selection_props =
            data_table_result_and_bulk_action_bar_props?.selection_props;

        this.setState("selected_records", []);

        if (sn_cell?.props) {
            sn_cell.props.is_selected = false;
        }

        if (sn_cell?.header) {
            sn_cell.header.render = undefined;
        }

        if (bulk_action_selection_props) {
            bulk_action_selection_props.selected_count = 0;
            bulk_action_selection_props.bulk_button_props =
                this.controller.getDefaultBulkActionButtonProps();
        }
    };

    private handleAppCurrencyActionSuccess = async (payload: {
        action: "assign" | "unassign" | "set_default";
        currency_codes: (string | number)[];
    }): Promise<void> => {
        const currency_codes = payload.currency_codes.map((code) => code.toString());

        if (payload.action === "set_default") {
            const default_currency_code = currency_codes[0];
            const { records } = this.controller.getListState();

            this.controller.setListState({
                records: records.map((record) => {
                    if (!record.app_currencies?.length) {
                        return record;
                    }

                    return {
                        ...record,
                        app_currencies: record.app_currencies.map((app_currency) => ({
                            ...app_currency,
                            is_default: record.code === default_currency_code
                        }))
                    };
                })
            });

            return;
        }

        currency_codes.forEach((code) => {
            this.removeListStateRecord(code, "code");
        });

        this.clearBulkSelection();
    };

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
        record: CurrencyRecordInterface,
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

            const result = await CurrencyAPIService.updateCurrencyStatus(code);

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
            this.logger.error("Error changing status toggle: ", { error });
            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
    };

    // Method to toogle data table action menu
    public toggleActionMenu = (record: CurrencyRecordInterface, record_index?: number): void => {
        const action_mneu_btn_id = `ActionBtn${record_index?.toString()}`;
        const action_menu_id = "TableActionMeuDropdown";
        const menu_el = document.getElementById(action_menu_id);
        const is_open = menu_el?.style?.display === "block";

        if (!is_open) {
            const updated_menu = CurrencyActionMenu.getMenus(record, this, this.controller.route);

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
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const { profile_details_modal_content_key } = this.controller.getPageContentKeys();

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: profile_details_modal_content_key,

            animation_type: "slide_top",

            body_component: markRaw(ProfileView),

            body_props: { record_id: record?.code, record }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle on edit action menu clicked
    public handleEditActionMenuClicked = async (
        record: CurrencyRecordInterface,
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

    // Method to handle on delete action menu clicked
    public handleDeleteActionMenuClicked = async (
        record: CurrencyRecordInterface,
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
                    deleted_record: CurrencyRecordInterface
                ): Promise<void> => {
                    this.removeListStateRecord(deleted_record.code, "code");
                }
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle opening assign currency view
    public handleOpenAssignFormView = async (
        record: CurrencyRecordInterface | null,
        config?: { props: NavLinkUIPropsInterface },
        selected_records: FieldArray<CurrencyRecordInterface, "code"> = []
    ): Promise<void> => {
        const base_content_key = "content_resource.currency_view_ui";
        const content_key = `${base_content_key}.modals_ui.assign_currency_modal_ui`;
        const app_id = record?.app_currencies?.[0]?.app?.public_id ?? this.getRouteAppId();
        const app = record?.app_currencies?.[0]?.app;
        const currency_codes = this.resolveCurrencyCodes(record, selected_records);

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,

            animation_type: "slide_top",

            body_component: markRaw(AssignCurrencyFormView),

            body_props: {
                action: "assign",
                app,
                app_id,
                content_key,
                currency_codes,
                record: record ?? undefined,
                on_success: this.handleAppCurrencyActionSuccess
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle opening unassign currency view
    public handleOpenUnAssignFormView = async (
        record: CurrencyRecordInterface | null,
        config?: { props: NavLinkUIPropsInterface },
        selected_records: FieldArray<CurrencyRecordInterface, "code"> = []
    ): Promise<void> => {
        const content_key = record?.code
            ? "content_resource.currency_view_ui.modals_ui.unassign_currency_modal_ui"
            : "content_resource.currency_view_ui.modals_ui.bulk_unassign_currency_modal_ui";
        const app_id = record?.app_currencies?.[0]?.app?.public_id ?? this.getRouteAppId();
        const app = record?.app_currencies?.[0]?.app;
        const currency_codes = this.resolveCurrencyCodes(record, selected_records);
        const prompt_record = record?.code
            ? { ...record, app }
            : {
                  app_name: app_id,
                  currencies: currency_codes.join(", "),
                  currency_count: currency_codes.length
              };

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,

            animation_type: "slide_top",

            body_component: markRaw(UnAssignCurrencyView),

            body_props: {
                action: "unassign",
                app_id,
                content_key,
                currency_codes,
                currency_record: record ?? undefined,
                record: prompt_record,
                record_id: record?.code ?? app_id,
                on_success: this.handleAppCurrencyActionSuccess
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle opening set as default currency view
    public handleOpenSetAsDefaultFormView = async (
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const content_key =
            "content_resource.currency_view_ui.list_view_ui.currency_modal.set_default_currency";
        const app_id = record?.app_currencies?.[0]?.app?.public_id ?? this.getRouteAppId();
        const app = record?.app_currencies?.[0]?.app;
        const currency_codes = this.resolveCurrencyCodes(record);
        const prompt_record = { ...record, app };

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,

            animation_type: "slide_top",

            body_component: markRaw(SetDefaultCurrencyView),

            body_props: {
                action: "set_default",
                app_id,
                content_key,
                currency_codes,
                currency_record: record,
                record: prompt_record,
                record_id: record.code,
                on_success: this.handleAppCurrencyActionSuccess
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle on bulk action btn clicked
    public toggleBulkActionMenu = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {
        const page_key = this.controller.content_key;
        const bulk_actn_btn_id = `${page_key}BulkActionsBtn`;
        const bulk_action_menu_id = "TableBulkActionMeuDropdown";
        const menu_el = document.getElementById(bulk_action_menu_id);
        const is_open = menu_el?.style?.display === "block";
        const selected_records = this.controller.state_refs.selected_records.value;

        if (!is_open) {
            const updated_menu = CurrencyActionMenu.getBulkActionMenus(
                selected_records,
                this,
                this.controller.route
            );

            this.setState("bulk_action_menu_dropdown_props", { menu_items: updated_menu });
        }

        return DropdownMenuUIPropsBuilder.toggleDropdownMenu(
            bulk_actn_btn_id,
            bulk_action_menu_id,
            true
        );
    };
}

export default CurrencyListViewActionHandler;
