
import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    ListViewClassStylesInterface
} from "@/ui_types/list_view_type";

import { 
    ActionMethodRetrunInterface, 
    InputUIActionPropsInterface, 
    InputUIPropsInterface, 
    InputValue 
} from "@ui/version_3/ui_types/input_ui_type";
import FiltersPanelUIPropsBuilder from "@ui/version_3/props_builder/filters_panel_ui_props_builder";
import { FiltersPanelUIActionPropsInterface } from "@ui/version_3/ui_types/filters_panel_ui_type";


class BaseListViewActionHandler<
    Props extends ListViewPropsInterface,
    State extends ListViewStateDataInterface,
    Computed extends ListViewComputedDataInterface,
    Components extends ListViewComponentsInterface,
    Events extends GlobalEventTypes,
    FilterValues extends Record<string, any> = {},
> {

    public readonly name: string;

    protected controller: BaseController<Props, State, Computed, Components, Events>;

    protected logger: LoggerUtil;

    protected content_manager = ContentManagerUtil.getInstance();

    public filter_values: Partial<FilterValues> = {};


    constructor(
        controller: BaseController<Props, State, Computed, Components, Events>,
        name: string = "base_list_view_action_handler",
        default_filter_values?: Partial<FilterValues>
    ) {

        this.name = name;

        this.controller = controller;

         this.filter_values = default_filter_values ?? {};

        this.logger = new LoggerUtil({
            prefix: name,
            show_timestamp: false
        });

    }

    // Method to get content message
    protected getContentMessage = (message_key: string): string => {

        return this.content_manager.getAPIResponseValue(message_key);

    }

    // Method to handle on filter input change
    public handleOnInputChanged = async (
        event?: Event,
        input_value?: InputValue,
        input_config?: { props: InputUIPropsInterface }
    ): Promise<ActionMethodRetrunInterface> => {

        const input_props = input_config?.props;

        const target =
            event?.target as HTMLInputElement | HTMLTextAreaElement | null;

        const value = input_value ?? target?.value;

        const input_id = input_props?.id;

        if (!input_id) {

            return {
                status: false,
                msg: this.getContentMessage("invalid_input_config")
            };
        }

        const formatted_key = input_id.replace(/_\d+$/, "");

        (this.filter_values as any)[formatted_key] = value;

        this.controller.state_refs.filters_panel_props.value.props_filter_values = {...this.filter_values };

        return {
            status: true,
            msg: "filter_input_ser"
        };
    };

    // Method to hydrate filters from route query
    public hydrateFiltersFromRoute = () => {
        const { route } = this.controller;

        const route_filters = FiltersPanelUIPropsBuilder.hydrateFiltersFromRoute(route.query);

        this.filter_values = (route_filters) as FilterValues;

        this.controller.state_refs.filters_panel_props.value.props_filter_values = {...this.filter_values };
    }

    // Method to handle on clear filters
    public handleOnClearFilters = async () => {
        const { filter_fields } = this.controller.state_refs.filters_panel_props.value

        for (let i = 0; i < filter_fields.length; i++) {
            let filter_field_props = filter_fields?.[i]?.input_group_props?.input_props?.model_value
            if(filter_field_props) {
                filter_field_props = null
            }
            
        }
    }

    // Method to handle filter input action handlers    
    public getFilterInputActionHandlersConfig = (): InputUIActionPropsInterface => {

        return {
            on_change: this.handleOnInputChanged
        };

    }

    // Method to get filters pannel action props config
    public getFiltersPanelActionPropsConfig = (): FiltersPanelUIActionPropsInterface => {
        return {
            on_clear_filters: this.handleOnClearFilters
        }
    }


}

export default BaseListViewActionHandler