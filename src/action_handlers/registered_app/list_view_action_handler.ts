
import { markRaw } from "vue";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "../base_classes/base_list_view_action_handler";

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

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";
import { RegisteredAppListViewFiltersInterface } from "@/types/list_view_filter_type";
import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ActionMethodRetrunInterface, InputValue } from "@ui/version_3/ui_types/input_ui_type";

import FormView from "@/views/registered_app/FormView.vue";
import ProfileView from "@/views/registered_app/ProfileView.vue";
import RegisteredAppAPIService from "@/api_services/registered_app_api_service";
import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";
import RegisteredAppActionMenu from "@/action_menus/registered_app_action_menu";



class RegisteredAppListViewActionHandler extends BaseListViewActionHandler<
    RegisteredAppRecordInterface,
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes,
    RegisteredAppListViewFiltersInterface
>{
    
    constructor(
        controller: BaseListViewController<RegisteredAppRecordInterface>,
    ) {
        super(
            controller, 
            "registered_app_list_view_action_handler",
            {},
            RegisteredAppAPIService.getRegisteredAppList
        );

    }

    // Method to handle header button clicked
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> =>  { 
        const base_content_key = "content_resource.registered_app_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.register_app_modal.add_new_registered_app`,

            animation_type: "slide_top",

            body_component: markRaw(FormView),
            
            body_props: {},
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    }

    // Method to handle row status chnage toglle
    public handleStatusToggleChange = async (
        record: RegisteredAppRecordInterface,
        input_value?: InputValue,
    ): Promise<ActionMethodRetrunInterface> => {
        try {
            const public_id = record.public_id;

            if(!public_id) {
                return {
                    status: false,
                    msg: this.getContentMessage("record_not_found")
                };
            }

            const result = await RegisteredAppAPIService.updateRegisteredAppStatus(public_id);

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
                    public_id, 
                    { is_active: !record.is_active }, 
                    "public_id"
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
        record: RegisteredAppRecordInterface,
        record_index?: number
    ): void => {

        const updated_menu = RegisteredAppActionMenu.getMenus(record, this);

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
        record: RegisteredAppRecordInterface,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const base_content_key = "content_resource.registered_app_view_ui.list_view_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: `${base_content_key}.register_app_modal.registered_app_details`,

            animation_type: "slide_top",

            body_component: markRaw(ProfileView),
            
            body_props: { record_id: record?.public_id },
        };
        
        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    }

}

export default RegisteredAppListViewActionHandler;