
import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    ListViewClassStylesInterface,
    FetchListMethod,
    ListStateInterface
} from "@/ui_types/list_view_type";

import { 
    ActionMethodRetrunInterface, 
    InputUIActionPropsInterface, 
    InputUIPropsInterface, 
    InputValue 
} from "@ui/version_3/ui_types/input_ui_type";

import { 
    ButtonUIActionPropsInterface, 
    ButtonUIPropsInterface 
} from "@ui/version_3/ui_types/button_ui_type";

import FiltersPanelUIPropsBuilder from "@ui/version_3/props_builder/filters_panel_ui_props_builder";
import { FiltersPanelUIActionPropsInterface } from "@ui/version_3/ui_types/filters_panel_ui_type";
import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";
import { debounceMethod } from "@ui/version_3/utils/debounce_util";


class BaseListViewActionHandler<
    T,
    Props extends ListViewPropsInterface,
    State extends ListViewStateDataInterface,
    Computed extends ListViewComputedDataInterface,
    Components extends ListViewComponentsInterface,
    Events extends GlobalEventTypes,
    FilterValues extends Record<string, any> = {},
> {

    public readonly name: string;

    protected controller: BaseListViewController<T>;

    protected logger: LoggerUtil;

    protected content_manager = ContentManagerUtil.getInstance();

    public filter_values: Partial<FilterValues> = {};

    protected fetch_list_method?: FetchListMethod<FilterValues, any>;


    constructor(
        controller: BaseListViewController<T>,
        name: string = "base_list_view_action_handler",
        default_filter_values?: Partial<FilterValues>,
        fetch_list_method?: FetchListMethod<FilterValues, any>
    ) {

        this.name = name;

        this.controller = controller;

        this.filter_values = default_filter_values ?? {};

        this.fetch_list_method = fetch_list_method;

        this.logger = new LoggerUtil({
            prefix: name,
            show_timestamp: false
        });

    }

    // Method to get content message
    protected getContentMessage = (message_key: string): string => {

        return this.content_manager.getAPIResponseValue(message_key);

    }

    // Method to handle header button clicked
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> =>  { }

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


        await debounceMethod(this.fetchRecords, 500)();
    }

    // Method to handle on apply filters
    public handleOnApplyFilters = async () => {
        await debounceMethod(this.fetchRecords, 500)();
    }

    // Method to get action button action handlers config
    public getActionBtnActionHandlerConfig = (): ButtonUIActionPropsInterface => {
        return {
            on_click: this.handleHeaderBtnClicked
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

    // Method to fetch records from API
    public fetchRecords = async (): Promise<void> => {
        this.controller.setListState({
            is_loading: true
        });

        console.log({ filter_values: this.filter_values})

        try {
            if (!this.fetch_list_method) {
                throw new Error("fetch_list_method not defined");
            }

            const {
                current_page,
                limit,
                sort_by,
                sort_direction
            } = this.controller.getListState();

            const response = await this.fetch_list_method({
                page: current_page,
                limit,
                sort_by: sort_by ?? undefined,
                sort_direction: sort_direction ?? undefined,
                filters: this.filter_values as FilterValues
            });

            if(!response || response.status === "logout") {
                this.controller.router.push("/logout");
                return;
            }

            if(response.data) {
                const {
                    records = [],
                    total_pages,
                    total_items,
                    current_page
                } = response.data;

                this.controller.setListState({
                    records,
                    total_pages,
                    total_items,
                    current_page
                });
                return;
            }
        }
        catch (error: unknown) {
            this.logger.error("Error fetching records:", error);
        }
        finally {
           this.controller.setListState({
                is_loading: false
            }); 
        }

    }

    //  Method to handle list state changed watcher
    public handleListStateChangedWatcher = (new_val: ListStateInterface): void => {
        console.log("List state changed:", new_val);

        const {
            is_loading = false,
            records = []
        } = new_val

        this.controller.state_refs.table_props.value.is_loading     = is_loading;
        this.controller.state_refs.table_props.value.data           = records;
    }


}

export default BaseListViewActionHandler