
import { markRaw } from "vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

import { CSRF_TOKEN_FOR } from "@/configs/constants";

import { 
    GlobalEventTypes, 
    OpenModalEventPayloadInterface 
} from "@/types/global_events_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface
} from "@/ui_types/list_view_type";

import { CurrencyRecordInterface } from "@/types/api_service_type";
import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";
import { CurrencyListViewFiltersInterface } from "@/types/list_view_filter_type";
import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { 
    ActionMethodRetrunInterface, 
    InputValue 
} from "@ui/version_3/ui_types/input_ui_type";

import AddEditFormView from "@/views/currency/AddEditFormView.vue";
import ProfileView from "@/views/currency/ProfileView.vue";
import DecisionPromptUI from "@ui/version_3/components/DecisionPromptUI.vue";
import AssignCurrencyFormView from "@/views/currency/AssignCurrencyFormView.vue";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import CurrencyAPIService from "@/api_services/currency_api_service";
import CurrencyValidator from "@/validators/currency_validator";
import AuthAPIService from "@/api_services/auth_api_service";

import CurrencyActionMenu from "@/action_menus/currency_action_menu";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";
import DecisionPromptUIPropsBuilder from "@ui/version_3/props_builder/decision_prompt_ui_props_builder";
import DecisionPromptUIClassStyles from "@/class_styles/decision_prompt_ui_class_styles";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import ButtonUIClassStyles from "@/class_styles/button_ui_class_styles";




class CurrencyListViewActionHandler extends BaseListViewActionHandler<
    CurrencyRecordInterface,
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes,
    CurrencyListViewFiltersInterface
>{
    
    constructor(
        controller: BaseListViewController<CurrencyRecordInterface>,
    ) {
        super(
            controller, 
            "currency_list_view_action_handler",
            {},
            CurrencyAPIService.getCurrencyList
        );

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;

    }

    // Method to handle header button clicked
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> =>  { 
        const base_content_key = "content_resource.currency_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.currency_modal.add_new_currency`,

            animation_type: "slide_top",

            body_component: markRaw(AddEditFormView),
            
            body_props: {},
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    }

    // Method to handle row status chnage toglle
    public handleStatusToggleChange = async (
        record: CurrencyRecordInterface,
        input_value?: InputValue,
    ): Promise<ActionMethodRetrunInterface> => {
        try {
            const code = record.code;

            if(!code) {
                return {
                    status: false,
                    msg: this.getContentMessage("record_not_found")
                };
            }

            const result = await CurrencyAPIService.updateCurrencyStatus(code);

            if (!result || result?.status === "error") {
                return {
                    status: false,
                    msg: this.getContentMessage(result?.msg ?? "error_occurred" )
                };
            }
            else if (result.status === "logout") {
                this.controller.router.push("/logout");
                return {
                    status: false,
                    msg: this.getContentMessage("session_expired")
                }
            }
            else if (result.status === "success") {
                this.updateListStateRecord(
                    code, 
                    { is_active: !record.is_active }, 
                    "code"
                );

                return {
                    status: true,
                    msg: this.getContentMessage(result?.msg)
                }
            }

            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            }
        }
        catch (error: unknown) {
            this.logger.error("Error changing status toggle: ", { error });
            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            }
        }
    }

    // Method to toogle data table action menu
    public toggleActionMenu = (
        record: CurrencyRecordInterface,
        record_index?: number
    ): void => {
        const menu_el = document.getElementById("TableActionMeuDropdown");
        const is_open = menu_el?.style?.display === "block";
        
        if (is_open) {
            return DropdownMenuUIPropsBuilder.toggleDropdownMenu(
                `ActionBtn${record_index?.toString()}`,
                "TableActionMeuDropdown",
                true
            )
        }

        const updated_menu = CurrencyActionMenu.getMenus(record, this, this.controller.route);

        this.controller.state_refs.action_menu_dropdown_props.value.menu_items = updated_menu;

        setTimeout(() => {
            DropdownMenuUIPropsBuilder.toggleDropdownMenu(
                `ActionBtn${record_index?.toString()}`,
                "TableActionMeuDropdown",
                true
            )
        }, 10)
        
    }

    // Method to handle view Action menu clicked
    public handleViewActionMenuClicked = async (
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const base_content_key = "content_resource.currency_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.currency_modal.currency_details`,

            animation_type: "slide_top",

            body_component: markRaw(ProfileView),
            
            body_props: { record_id: record?.code, record },
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    }

    // Method to handle on edit action menu clicked
    public handleEditActionMenuClicked = async (
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {

        const base_content_key = "content_resource.currency_view_ui.list_view_ui";
        
        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.currency_modal.update_currency`,

            animation_type: "slide_top",

            body_component: markRaw(AddEditFormView),
            
            body_props: { record },
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
        
    };

    // Method to handle on delete action menu clicked
    public handleDeleteActionMenuClicked = async (
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {

        const base_content_key      = "content_resource.currency_view_ui.list_view_ui.currency_modal.delete_currency";

        const decsion_prompt_props  =  DecisionPromptUIPropsBuilder.buildFromContentKeys({
            record,

            title_text_content_key: `${base_content_key}.content.title_text`,

            message_text_content_key: `${base_content_key}.content.message_text`,

            class_styles: DecisionPromptUIClassStyles,

            cancel_button_props: ButtonUIPropsBuilder.getReactivePropsObject(
                `CancelBtn-${record.code}`,
                `${base_content_key}.content.cancel_btn_text`,
                "x_circile_svg_icon",
                "button",
                { 
                    class_styles: DecisionPromptUIClassStyles.cancel_btn_class_style ,
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
                `ConfirmBtn-${record.code}`,
                `${base_content_key}.content.confirm_btn_text`,
                "check_circle_svg_icon",
                "button",
                { 
                    class_styles: DecisionPromptUIClassStyles.confirm_btn_class_style,

                    boolean_props: { disabled: false },
                    
                    action_props: {
                        on_click: async (
                            event?: MouseEvent,
                            config?: { props: ButtonUIPropsInterface }
                        ): Promise<void> => {
                            return await this.handleDeleteARecordAction(record)
                        }
                    }
                }
            ),
        });
                
        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}`,

            animation_type: "slide_top",

            body_component: markRaw(DecisionPromptUI),
            
            body_props: decsion_prompt_props,
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to handle delate a record action
    public handleDeleteARecordAction = async(
        record: CurrencyRecordInterface,
        record_index?: number
    ): Promise<void> => {

        try {
            const code = record.code;

            if(!code) {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    "record_not_found", 
                    4,
                    undefined,
                    true
                );
            }

            const result    = await CurrencyAPIService.deleteCurrency(code);
            const msg       = result?.msg ?? "error_occurred";

            if (!result || result?.status?.toLowerCase() === "error") {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    msg,
                    4,
                    undefined,
                    true
                );
            }
            else if (result.status?.toLowerCase() === "logout") {
                this.controller.router.push("/logout");
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    "session_expired",
                    4,
                    undefined,
                    true
                );
            }
            else if (result.status?.toLowerCase() === "success") {
                this.removeListStateRecord(code, "code");

                return StatusAlertTriggerUtil.triggerAlert(
                    result.status, 
                    msg,
                    4,
                    undefined,
                    true
                );
            }

            return StatusAlertTriggerUtil.triggerAlert(
                "error", 
                msg,
                4,
                undefined,
                true
            );
        }
        catch (error: unknown) {
            this.logger.error("Error deleting a record row: ", { error });
            return StatusAlertTriggerUtil.triggerAlert(
                "error", 
                "error_occurred",
                4,
                undefined,
                true
            );
        }
        
    }

    // Method to handle opening assign un-assign currency view
    public handleOpenAssignFormView = async(
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const base_content_key = "content_resource.currency_view_ui.list_view_ui";
        const app_id            = record?.app_currencies?.[0]?.app?.public_id ?? this.controller?.route?.query?.app_id ?? "";
        const app               = record?.app_currencies?.[0]?.app;
        const currency_codes    = record?.code ? [record?.code] : [];
        
        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.currency_modal.assign_currency`,

            animation_type: "slide_top",

            body_component: markRaw(AssignCurrencyFormView),
            
            body_props: { app, app_id, currency_codes },
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    }

    // Method to handle opening confirm un-assign view
    public handleOpenConfirmUnAssignView = async(
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const base_content_key      = "content_resource.currency_view_ui.list_view_ui.currency_modal.unassign_currency";
        const updated_record        = { ...record, app: record?.app_currencies?.[0].app };

        const decsion_prompt_props  =  DecisionPromptUIPropsBuilder.buildFromContentKeys({
            record: updated_record,

            title_text_content_key: `${base_content_key}.content.title_text`,

            message_text_content_key: `${base_content_key}.content.message_text`,

            class_styles: DecisionPromptUIClassStyles,

            cancel_button_props: ButtonUIPropsBuilder.getReactivePropsObject(
                `CancelBtn-${record.code}`,
                `${base_content_key}.content.cancel_btn_text`,
                "x_circile_svg_icon",
                "button",
                { 
                    class_styles: DecisionPromptUIClassStyles.cancel_btn_class_style ,
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
                `ConfirmBtn-${record.code}`,
                `${base_content_key}.content.confirm_btn_text`,
                "check_circle_svg_icon",
                "button",
                { 
                    class_styles: DecisionPromptUIClassStyles.confirm_btn_class_style,

                    boolean_props: { disabled: false },
                    
                    action_props: {
                        on_click: async (
                            event?: MouseEvent,
                            config?: { props: ButtonUIPropsInterface }
                        ): Promise<void> => {
                            return await this.handleUnAssignRecordAction(record)
                        }
                    }
                }
            ),
        });
                
        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}`,

            animation_type: "slide_top",

            body_component: markRaw(DecisionPromptUI),
            
            body_props: decsion_prompt_props,
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);

    }

    // Method to handle un-assigning api query
    public handleUnAssignRecordAction =  async(
        record: CurrencyRecordInterface,
        record_index?: number
    ): Promise<void> => {

        try {
            const {
                code: currency_code_or_id,
                app_currencies,
            } = record;

            const app_id            = app_currencies?.[0]?.app?.public_id ?? "";
            const action            = "unassign" as const;
            const csrf_token_result = await AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.APP_CURRECY);
            const csrf_token        = csrf_token_result.data?.token ?? "";
            const form_data         = { csrf_token, app_id, action, currency_code_or_id };


            const { v_state, v_msg, v_data } = CurrencyValidator.validateAppCurrencyInput(form_data);

            if(!v_state || !v_data) {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    v_msg, 
                    4,
                    undefined,
                    true
                );
            }

            const result    = await CurrencyAPIService.handleAppCurrencyAction(v_data);
            const msg       = result?.msg ?? "error_occurred";

            if (!result || result?.status?.toLowerCase() === "error") {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    msg,
                    4,
                    undefined,
                    true
                );
            }
            else if (result.status?.toLowerCase() === "logout") {
                this.controller.router.push("/logout");
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    "session_expired",
                    4,
                    undefined,
                    true
                );
            }
            else if (result.status?.toLowerCase() === "success") {
                this.removeListStateRecord(currency_code_or_id, "code");

                return StatusAlertTriggerUtil.triggerAlert(
                    result.status, 
                    msg,
                    4,
                    undefined,
                    true
                );
            }

            return StatusAlertTriggerUtil.triggerAlert(
                "error", 
                msg,
                4,
                undefined,
                true
            );
        }
        catch (error: unknown) {
            this.logger.error("Error deleting a record row: ", { error });
            return StatusAlertTriggerUtil.triggerAlert(
                "error", 
                "error_occurred",
                4,
                undefined,
                true
            );
        }
        
    }

    // Method to handle opening confirm set as sefult view
    public handleOpenConfirmSetAsDefultView = async(
        record: CurrencyRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const base_content_key      = "content_resource.currency_view_ui.list_view_ui.currency_modal.set_default_currency";
        const updated_record        = { ...record, app: record?.app_currencies?.[0].app };

        const decsion_prompt_props  =  DecisionPromptUIPropsBuilder.buildFromContentKeys({
            record: updated_record,

            title_text_content_key: `${base_content_key}.content.title_text`,

            message_text_content_key: `${base_content_key}.content.message_text`,

            class_styles: DecisionPromptUIClassStyles,

            cancel_button_props: ButtonUIPropsBuilder.getReactivePropsObject(
                `CancelBtn-${record.code}`,
                `${base_content_key}.content.cancel_btn_text`,
                "x_circile_svg_icon",
                "button",
                { 
                    class_styles: DecisionPromptUIClassStyles.cancel_btn_class_style ,
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
                `ConfirmBtn-${record.code}`,
                `${base_content_key}.content.confirm_btn_text`,
                "check_circle_svg_icon",
                "button",
                { 
                    class_styles: ButtonUIClassStyles,

                    boolean_props: { disabled: false },
                    
                    action_props: {
                        on_click: async (
                            event?: MouseEvent,
                            config?: { props: ButtonUIPropsInterface }
                        ): Promise<void> => {
                            return await this.handleSetAppDefaultCurrencyAction(record)
                        }
                    }
                }
            ),
        });
                
        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}`,

            animation_type: "slide_top",

            body_component: markRaw(DecisionPromptUI),
            
            body_props: decsion_prompt_props,
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);

    }

    // Method to handle setting app default currency api query
    public handleSetAppDefaultCurrencyAction =  async(
        record: CurrencyRecordInterface,
        record_index?: number
    ): Promise<void> => {

        try {
            const {
                code: currency_code_or_id,
                app_currencies,
            } = record;

            const app_id            = app_currencies?.[0]?.app?.public_id ?? "";
            const csrf_token_result = await AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.APP_CURRECY);
            const csrf_token        = csrf_token_result.data?.token ?? "";
            const form_data         = { csrf_token, app_id, currency_code_or_id };


            const { v_state, v_msg, v_data } = CurrencyValidator.validateSetAppDefaultCurrencyInput(form_data);

            if(!v_state || !v_data) {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    v_msg, 
                    4,
                    undefined,
                    true
                );
            }

            const result    = await CurrencyAPIService.toggleDefaultCurrency(v_data);
            const msg       = result?.msg ?? "error_occurred";

            if (!result || result?.status?.toLowerCase() === "error") {
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    msg,
                    4,
                    undefined,
                    true
                );
            }
            else if (result.status?.toLowerCase() === "logout") {
                this.controller.router.push("/logout");
                return StatusAlertTriggerUtil.triggerAlert(
                    "error", 
                    "session_expired",
                    4,
                    undefined,
                    true
                );
            }
            else if (result.status?.toLowerCase() === "success") {
                if(app_currencies?.[0]) {
                    app_currencies[0].is_default = true;

                    this.updateListStateRecord(currency_code_or_id, { app_currencies }, "code")
                }

                return StatusAlertTriggerUtil.triggerAlert(
                    result.status, 
                    msg,
                    4,
                    undefined,
                    true
                );
            }

            return StatusAlertTriggerUtil.triggerAlert(
                "error", 
                msg,
                4,
                undefined,
                true
            );
        }
        catch (error: unknown) {
            this.logger.error("Error deleting a record row: ", { error });
            return StatusAlertTriggerUtil.triggerAlert(
                "error", 
                "error_occurred",
                4,
                undefined,
                true
            );
        }
        
    }


}

export default CurrencyListViewActionHandler;