import { markRaw } from "vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import { OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";
import { RegisteredAppListViewFiltersInterface } from "@/types/list_view_filter_type";
import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import FormView from "@/views/registered_app/FormView.vue";
import ProfileView from "@/views/registered_app/ProfileView.vue";
import DecisionPromptUI from "@ui/version_3/components/DecisionPromptUI.vue";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";
import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";
import RegisteredAppActionMenu from "@/action_menus/registered_app_action_menu";
import DecisionPromptUIPropsBuilder from "@ui/version_3/props_builder/decision_prompt_ui_props_builder";
import DecisionPromptUIClassStyles from "@/class_styles/decision_prompt_ui_class_styles";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

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
        const base_content_key = "content_resource.registered_app_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.register_app_modal.add_new_registered_app`,

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

            this.controller.state_refs.action_menu_dropdown_props.value.menu_items = updated_menu;
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
        const base_content_key = "content_resource.registered_app_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.register_app_modal.registered_app_details`,

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
        const base_content_key = "content_resource.registered_app_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.register_app_modal.update_registered_app`,

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
        const base_content_key =
            "content_resource.registered_app_view_ui.list_view_ui.register_app_modal.delete_registered_app";

        const decsion_prompt_props = DecisionPromptUIPropsBuilder.buildFromContentKeys({
            record,

            title_text_content_key: `${base_content_key}.content.title_text`,

            message_text_content_key: `${base_content_key}.content.message_text`,

            class_styles: DecisionPromptUIClassStyles,

            cancel_button_props: ButtonUIPropsBuilder.getReactivePropsObject(
                `CancelBtn-${record.public_id}`,
                `${base_content_key}.content.cancel_btn_text`,
                "x_circile_svg_icon",
                "button",
                {
                    class_styles: DecisionPromptUIClassStyles.cancel_btn_class_style,
                    action_props: {
                        on_click: async (
                            event?: MouseEvent,
                            config?: { props: ButtonUIPropsInterface }
                        ): Promise<void> => {
                            this.controller.event_bus?.emit("close_modal", {});
                        }
                    }
                }
            ),

            confirm_button_props: ButtonUIPropsBuilder.getReactivePropsObject(
                `ConfirmBtn-${record.public_id}`,
                `${base_content_key}.content.confirm_btn_text`,
                "check_circle_svg_icon",
                "button",
                {
                    class_styles: DecisionPromptUIClassStyles.confirm_btn_class_style,
                    action_props: {
                        on_click: async (
                            event?: MouseEvent,
                            config?: { props: ButtonUIPropsInterface }
                        ): Promise<void> => {
                            return await this.handleDeleteARecordAction(record);
                        }
                    }
                }
            )
        });

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}`,

            animation_type: "slide_top",

            body_component: markRaw(DecisionPromptUI),

            body_props: decsion_prompt_props
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle delate a record action
    public handleDeleteARecordAction = async (
        record: RegisteredAppRecordInterface,
        record_index?: number
    ): Promise<void> => {
        try {
            const public_id = record.public_id;

            if (!public_id) {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error",
                    "record_not_found",
                    4,
                    undefined,
                    true
                );
            }

            const result = await RegisteredAppAPIService.deleteRegisteredApp(public_id);
            const msg = result?.msg ?? "error_occurred";

            if (!result || result?.status?.toLowerCase() === "error") {
                return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
            } else if (result.status?.toLowerCase() === "logout") {
                this.controller.router.push("/logout");
                return StatusAlertTriggerUtil.triggerAlert(
                    "error",
                    "session_expired",
                    4,
                    undefined,
                    true
                );
            } else if (result.status?.toLowerCase() === "success") {
                this.removeListStateRecord(public_id, "public_id");

                return StatusAlertTriggerUtil.triggerAlert(result.status, msg, 4, undefined, true);
            }

            return StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
        } catch (error: unknown) {
            this.logger.error("Error deleting a record row: ", { error });
            return StatusAlertTriggerUtil.triggerAlert(
                "error",
                "error_occurred",
                4,
                undefined,
                true
            );
        }
    };
}

export default RegisteredAppListViewActionHandler;
