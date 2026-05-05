
import { markRaw } from "vue";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { FiltersPanelUIActionPropsInterface } from "@ui/version_3/ui_types/filters_panel_ui_type";

import { debounceMethod } from "@ui/version_3/utils/debounce_util";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

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

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";
import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";
import { DataTableUIPropsInterface } from "@ui/version_3/ui_types/data_table_ui_type";


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

    protected fetch_list_method?: FetchListMethod<FilterValues, T>;


    constructor(
        controller: BaseListViewController<T>,
        name: string = "base_list_view_action_handler",
        default_filter_values?: Partial<FilterValues>,
        fetch_list_method?: FetchListMethod<FilterValues, T>
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

    // Method to get table serial cell
    private getSerialCell = () => {
        return this.controller.state_refs.table_props.value.table_render_obj?.[0];
    };

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

    // Method to handle on apply filters
    public handleOnApplyFilters = async () => {
        if(Object.values(this.filter_values).some(value => value != null)) {
            this.hydrateFiltersFromRoute();

            await debounceMethod(this.fetchRecords, 500)();
        } 
        
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
        console.log("got here")
        this.controller.setListState({
            is_loading: true
        });

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
        // console.log("List state changed:", new_val);

        const {
            is_loading = false,
            records = [],
            total_items = 0,
            current_page = 1,
            total_pages = 1,
        } = new_val

        this.controller.state_refs.table_props.value.is_loading     = is_loading;
        this.controller.state_refs.table_props.value.data           = records;

        // update result and bulk actions bar
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.current_page        = current_page;
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.total_pages         = total_pages;
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.total_records       = total_items;
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.filtered_records    = records.length;

        // update pagination ui
        this.controller.state_refs.pagination_ui_props.value.data_props.current_page    = current_page;
        this.controller.state_refs.pagination_ui_props.value.data_props.total_pages     = total_pages
    }

    // Method to update a specific list state record
    public updateListStateRecord = (
        record_id: string | number,
        fields_updated: Partial<T>,
        record_id_key: keyof T
    ): void => {
        const { records = [] } = this.controller.getListState();

        const record_index_to_update = records.findIndex(
            (record: T): boolean => {
                return record[record_id_key]?.toString() === record_id?.toString();
            }
        );

        // ❌ If not found → exit
        if (record_index_to_update === -1) return;

        // ✅ Create new updated record
        const updated_record: T = {
            ...records[record_index_to_update],
            ...fields_updated
        };

        // ✅ Create new records array (immutability)
        const updated_records: T[] = [...records];

        updated_records[record_index_to_update] = updated_record;

        // ✅ Push back to state
        this.controller.setListState({
            records: updated_records
        });
    }

    // Method to handle update records by removing a record
    public removeListStateRecord = (
        record_id: string | number,
        record_id_key: keyof T
    ): void => {

        const list_state = this.controller.getListState();

        const {
            records = [],
            total_items = 0,
            current_page = 1,
            total_pages = 1,
            limit = 10
        } = list_state;

        // 🔍 Find record index
        const record_index = records.findIndex(
            (record: T) =>
                record?.[record_id_key]?.toString() === record_id?.toString()
        );

        // ❌ Not found → exit
        if (record_index === -1) return;

        // ✅ Remove record (immutably)
        const updated_records = records.filter(
            (_, index) => index !== record_index
        );

        // ✅ Update total items
        const updated_total_items = Math.max(0, total_items - 1);

        // ✅ Recalculate total pages
        const updated_total_pages = Math.max(
            1,
            Math.ceil(updated_total_items / limit)
        );

        // ✅ Adjust current page if needed
        let updated_current_page = current_page;

        if (current_page > updated_total_pages) {
            updated_current_page = updated_total_pages;
        }

        // ✅ Update state
        this.controller.setListState({
            records: updated_records,
            total_items: updated_total_items,
            total_pages: updated_total_pages,
            current_page: updated_current_page
        });
    };

    // Method to handle on table record sort
    public handleOnSortRecord = async (
        key: string | number | symbol,
        direction: "asc" | "desc" | null,
        config?: { props: DataTableUIPropsInterface<T> }
    ): Promise<void> => {
        this.controller.setListState({
            sort_by: (key) as string,
            sort_direction: direction
        })

        return await this.fetchRecords();
    }

    // Method to handle on table page change
    public handleOnPageChange = async (page: number): Promise<void> => {

        this.controller.setListState({
            current_page: page
        })

        return await this.fetchRecords();
    }

    // Method to handle select action menu clicked
    public handleSelectActionMenuClicked = async (
        record: T,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {

        const sn_cell = this.getSerialCell();

        if (!sn_cell?.props || !sn_cell?.header) return;

        const result = await this.handleOnRecordRowSelected(record);

        // ❌ stop if selection failed
        if (!result.status) return;

        // ❌ avoid setTimeout hack
        sn_cell.props.is_selected = true;

        sn_cell.header.render = () => markRaw(DataTableSerialCellUI);
    };

    // Method to handle on a record row selected
    public handleOnRecordRowSelected = async (
        record: T,
        input_value?: InputValue,
    ): Promise<ActionMethodRetrunInterface> => {
        try {
            const row_key = this.controller.getTableRowKey();
            const value = record?.[row_key];

            const sn_cell = this.getSerialCell();

            if (
                value === undefined ||
                value === null ||
                !sn_cell?.props ||
                !sn_cell?.header
            ) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_record_selection")
                };
            }

            const selected_records              = this.controller.state_refs.selected_records.value;
            const bulk_action_selection_props =  this.controller.state_refs.data_table_result_and_bulk_action_bar_props?.value?.selection_props;

            const value_str = value.toString();

            const index = selected_records.findIndex(
                (item) => item?.toString() === value_str
            );

            if (index > -1) {
                selected_records.splice(index, 1);
            } else {
                selected_records.push(value);
            }

            const has_selection = selected_records.length > 0;

            sn_cell.props.is_selected = has_selection;

            if (!has_selection) {
                sn_cell.header.render = undefined;
            }

            if(bulk_action_selection_props) {
                bulk_action_selection_props.selected_count      = selected_records.length;
                bulk_action_selection_props.bulk_button_props   = this.controller.getBulkActionButtonProps();
            }

            return {
                status: true,
                msg: this.getContentMessage("success")
            };

        } 
        catch (error: unknown) {
            this.logger.error("Error selecting record: ", { error });

            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
    };

    // Method to handle on select all rows
    public handleOnSelectAllRows = async (): Promise<ActionMethodRetrunInterface> => {
        try {
            const row_key           = this.controller.getTableRowKey();
            const sn_cell           = this.getSerialCell();

            if (!sn_cell?.header || !sn_cell?.props) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_record_selection")
                };
            }

            const { records = [] } = this.controller.getListState();

            const all_values = records
                .map((record) => record?.[row_key])
                .filter((val) => val !== undefined && val !== null);

            const selected_records              = this.controller.state_refs.selected_records.value;
            const bulk_action_selection_props   =  this.controller.state_refs.data_table_result_and_bulk_action_bar_props?.value?.selection_props;

            const is_all_selected = selected_records.length === all_values.length;

            // ✅ Toggle logic
            if (is_all_selected) {
                this.controller.state_refs.selected_records.value = [];
            } else {
                // ✅ Replace (not push) to avoid duplicates
                this.controller.state_refs.selected_records.value = [...new Set(all_values)];
            }

            // ✅ Update header + props reactively (NO setTimeout)
            const has_selection = this.controller.state_refs.selected_records.value.length > 0;

            sn_cell.props.is_selected = has_selection;

            sn_cell.header.render = has_selection
                ? () => markRaw(DataTableSerialCellUI)
                : undefined;

            if(bulk_action_selection_props) {
                bulk_action_selection_props.selected_count      = this.controller.state_refs.selected_records.value.length;
                bulk_action_selection_props.bulk_button_props   = this.controller.getBulkActionButtonProps();
            }

            return {
                status: true,
                msg: this.getContentMessage("success")
            };

        } catch (error: unknown) {
            this.logger.error("Error selecting all records: ", { error });

            return {
                status: false,
                msg: this.getContentMessage("error_occurred")
            };
        }
    };

    // Method to handle on new record created (to update list state)
    public handleOnNewRecordCreated = async (
        payload: NewRecordCreated<T, true>
    ): Promise<boolean> => {
        try {
            const { record, re_fetch = true } = payload;

            if(re_fetch) {
                await this.fetchRecords();
                return true;
            }

            const list_state = this.controller.getListState();

            const {
                records = [],
                total_items = 0
            } = list_state;

            const updated_records = [record, ...records];

            this.controller.setListState({
                records: updated_records,
                total_items: total_items + 1
            }); 

            return true;
        }
        catch(error: unknown) {
            this.logger.error("Error handling new record created: ", { error });
            return false;
        } 
    }

    // Method to handle on bulk action btn clicked
    public handleOnBulkActionBtnClicked = async () => {
    }


}

export default BaseListViewActionHandler