import { markRaw } from "vue";
import type { LocationQueryRaw, RouteLocationNormalizedLoaded } from "vue-router";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { GlobalEventTypes, NewRecordCreated } from "@/types/global_events_type";

import { FiltersPanelUIActionPropsInterface } from "@ui/version_3/ui_types/filters_panel_ui_type";

import { NavLinkUIPropsInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
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
import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";
import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";
import { DataTableUIPropsInterface } from "@ui/version_3/ui_types/data_table_ui_type";

type MutableRecord = Record<string, unknown>;
type QueryValue = string | number;

class BaseListViewActionHandler<
    T extends object,
    K extends keyof T = keyof T,
    FilterValues extends object = {}
> extends BaseActionHandler<
    ListViewPropsInterface,
    ListViewStateDataInterface<T, K>,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly name: string;

    protected override controller: BaseListViewController<T, K>;

    protected content_manager = ContentManagerUtil.getInstance();

    public filter_values: Partial<FilterValues> = {};

    protected fetch_list_method?: FetchListMethod<FilterValues, T>;

    constructor(
        controller: BaseListViewController<T, K>,
        name: string = "base_list_view_action_handler",
        default_filter_values?: Partial<FilterValues>,
        fetch_list_method?: FetchListMethod<FilterValues, T>
    ) {
        super(controller, name);

        this.name = name;

        this.controller = controller;

        this.filter_values = default_filter_values ?? {};

        this.fetch_list_method = fetch_list_method;
    }

    // Method to get content message
    protected getContentMessage = (message_key: string): string => {
        return this.content_manager.getAPIResponseValue(message_key);
    };

    // Method to handle header button clicked
    protected handleHeaderBtnClicked = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<void> => {};

    // Method to get table serial cell
    private getSerialCell = () => {
        return this.controller.state_refs.table_props.value.table_render_obj?.[0];
    };

    private getFilterKeys = (): string[] => {
        const filter_fields =
            this.controller.state_refs.filters_panel_props?.value?.filter_fields ?? [];

        return filter_fields.map((field) => field.key);
    };

    private isEmptyFilterValue = (value: unknown): boolean => {
        return (
            value === null ||
            value === undefined ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
        );
    };

    private parsePositiveInteger = (value: unknown, fallback: number): number => {
        const raw_value = Array.isArray(value) ? value[0] : value;
        const parsed = Number(raw_value);

        return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
    };

    private getFilterRecord = (): MutableRecord => {
        return this.filter_values as MutableRecord;
    };

    private serializeQueryValue = (value: unknown): QueryValue => {
        if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        }

        if (typeof value === "boolean") {
            return value.toString();
        }

        return value as QueryValue;
    };

    private buildFilterQuery = (base_query: LocationQueryRaw = {}): LocationQueryRaw => {
        const next_query = { ...base_query };
        const filter_values = this.getFilterRecord();

        this.getFilterKeys().forEach((key) => {
            const value = filter_values[key];

            if (this.isEmptyFilterValue(value)) {
                delete next_query[key];
                return;
            }

            next_query[key] = this.serializeQueryValue(value);
        });

        return next_query;
    };

    private buildListStateFromRoute = (
        query: RouteLocationNormalizedLoaded["query"]
    ): Partial<ListStateInterface<T>> => {
        const current_state = this.controller.getListState();
        const sort_by = Array.isArray(query.sort_by) ? query.sort_by[0] : query.sort_by;
        const sort_direction = Array.isArray(query.sort_direction)
            ? query.sort_direction[0]
            : query.sort_direction;

        return {
            current_page: this.parsePositiveInteger(query.page, current_state.current_page),
            limit: this.parsePositiveInteger(query.limit, current_state.limit),
            sort_by: typeof sort_by === "string" && sort_by ? sort_by : null,
            sort_direction:
                sort_direction === "asc" || sort_direction === "desc" ? sort_direction : null
        };
    };

    private setFilterValues = (values: Partial<FilterValues>): void => {
        const current_values = this.getFilterRecord();
        const next_values = values as MutableRecord;

        Object.keys(current_values).forEach((key) => {
            delete current_values[key];
        });

        this.getFilterKeys().forEach((key) => {
            const value = next_values[key];

            if (!this.isEmptyFilterValue(value)) {
                current_values[key] = value;
            }
        });
    };

    private syncFilterPanelValues = (): void => {
        const panel_props = this.controller.state_refs.filters_panel_props.value;
        const filter_values = { ...this.filter_values };

        panel_props.props_filter_values = filter_values;

        panel_props.filter_fields.forEach((field) => {
            const input_props = field.input_group_props?.input_props;

            if (!input_props) {
                return;
            }

            const value = (filter_values as MutableRecord)[field.key] ?? null;

            InputUIPropsBuilder.updateValue(input_props, value as InputValue);
        });
    };

    private updateRouteQuery = async (next_query: LocationQueryRaw): Promise<boolean> => {
        const current_query = this.controller.route.query;
        const current_query_string = JSON.stringify(current_query);
        const next_query_string = JSON.stringify(next_query);

        if (current_query_string === next_query_string) {
            return false;
        }

        await this.controller.router.replace({ query: next_query });

        return true;
    };

    // Method to handle on filter input change
    public handleOnInputChanged = async (
        event?: Event,
        input_value?: InputValue,
        input_config?: { props: InputUIPropsInterface }
    ): Promise<ActionMethodRetrunInterface> => {
        const input_props = input_config?.props;

        const target = event?.target as HTMLInputElement | HTMLTextAreaElement | null;

        const value = input_value ?? target?.value;

        const input_id = input_props?.id;

        if (!input_id) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_config")
            };
        }

        const formatted_key = input_id.replace(/_\d+$/, "");
        const filter_values = this.getFilterRecord();

        if (this.isEmptyFilterValue(value)) {
            delete filter_values[formatted_key];
        } else {
            filter_values[formatted_key] = value;
        }

        this.syncFilterPanelValues();

        return {
            status: true,
            msg: "filter_input_set"
        };
    };

    // Method to hydrate filters from route query
    public hydrateFiltersFromRoute = (route_query = this.controller.route.query): void => {
        const hydrated_query = FiltersPanelUIPropsBuilder.hydrateFiltersFromRoute(route_query);
        const filter_keys = this.getFilterKeys();
        const route_filters = filter_keys.reduce((filters, key) => {
            const value = hydrated_query[key];

            if (!this.isEmptyFilterValue(value)) {
                filters[key] = value;
            }

            return filters;
        }, {} as MutableRecord);

        this.setFilterValues(route_filters as FilterValues);
        this.syncFilterPanelValues();
    };

    // Method to handle on clear filters
    public handleOnClearFilters = async (): Promise<void> => {
        const next_query = { ...this.controller.route.query };

        this.getFilterKeys().forEach((key) => {
            delete next_query[key];
        });

        delete next_query.page;

        this.setFilterValues({} as Partial<FilterValues>);
        this.syncFilterPanelValues();

        const route_changed = await this.updateRouteQuery(next_query);

        if (!route_changed) {
            await this.fetchRecords();
        }
    };

    // Method to handle on apply filters
    public handleOnApplyFilters = async (filters?: MutableRecord): Promise<void> => {
        if (filters) {
            this.setFilterValues(filters as Partial<FilterValues>);
            this.syncFilterPanelValues();
        }

        const next_query = this.buildFilterQuery({
            ...this.controller.route.query
        });

        delete next_query.page;

        const route_changed = await this.updateRouteQuery(next_query);

        if (!route_changed) {
            await this.fetchRecords();
        }
    };

    public handleRouteChanged = async (
        route: RouteLocationNormalizedLoaded = this.controller.route
    ): Promise<void> => {
        const { query } = route;

        this.hydrateFiltersFromRoute(query);
        this.controller.setListState(this.buildListStateFromRoute(query));

        await this.fetchRecords();
    };

    // Method to get action button action handlers config
    public getActionBtnActionHandlerConfig = (): ButtonUIActionPropsInterface => {
        return {
            on_click: this.handleHeaderBtnClicked
        };
    };

    // Method to handle filter input action handlers
    public getFilterInputActionHandlersConfig = (): InputUIActionPropsInterface => {
        return {
            on_change: this.handleOnInputChanged
        };
    };

    // Method to get filters pannel action props config
    public getFiltersPanelActionPropsConfig = (): FiltersPanelUIActionPropsInterface => {
        return {
            on_apply_filters: this.handleOnApplyFilters,

            on_clear_filters: this.handleOnClearFilters
        };
    };

    // Method to fetch records from API
    public fetchRecords = async (): Promise<void> => {
        this.controller.setListState({
            is_loading: true
        });

        try {
            if (!this.fetch_list_method) {
                throw new Error("fetch_list_method not defined");
            }

            const { current_page, limit, sort_by, sort_direction } = this.controller.getListState();

            const response = await this.fetch_list_method({
                page: current_page,
                limit,
                sort_by: sort_by ?? undefined,
                sort_direction: sort_direction ?? undefined,
                filters: this.filter_values as FilterValues
            });

            if (!response || response.status === "logout") {
                this.controller.router.push("/logout");
                return;
            }

            if (response.data) {
                const { records = [], total_pages, total_items, current_page } = response.data;

                this.controller.setListState({
                    records,
                    total_pages,
                    total_items,
                    current_page
                });
                return;
            }
        } catch (error: unknown) {
            this.logger.error("Error fetching records:", error);
        } finally {
            this.controller.setListState({
                is_loading: false
            });
        }
    };

    //  Method to handle list state changed watcher
    public handleListStateChangedWatcher = (new_val: ListStateInterface<T>): void => {
        const {
            is_loading = false,
            records = [],
            total_items = 0,
            current_page = 1,
            total_pages = 1
        } = new_val;

        const sn_cell = this.getSerialCell();
        const bulk_action_selection_props =
            this.controller.state_refs.data_table_result_and_bulk_action_bar_props?.value
                ?.selection_props;

        this.controller.state_refs.table_props.value.is_loading = is_loading;
        this.controller.state_refs.table_props.value.data = records;

        // update result and bulk actions bar
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.current_page =
            current_page;
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.total_pages =
            total_pages;
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.total_records =
            total_items;
        this.controller.state_refs.data_table_result_and_bulk_action_bar_props.value.data_props.filtered_records =
            records.length;

        // update pagination ui
        this.controller.state_refs.pagination_ui_props.value.data_props.current_page = current_page;
        this.controller.state_refs.pagination_ui_props.value.data_props.total_pages = total_pages;

        // update selcetd records
        this.controller.state_refs.selected_records.value = [];

        if (sn_cell?.header) {
            sn_cell.header.render = undefined;
        }

        if (sn_cell?.props) {
            sn_cell.props.is_selected = false;
        }

        if (bulk_action_selection_props) {
            bulk_action_selection_props.selected_count = 0;
            bulk_action_selection_props.bulk_button_props =
                this.controller.getBulkActionButtonProps();
        }
    };

    // Method to update a specific list state record
    public updateListStateRecord = (
        record_id: string | number,
        fields_updated: Partial<T>,
        record_id_key: keyof T
    ): void => {
        const { records = [] } = this.controller.getListState();

        const record_index_to_update = records.findIndex((record: T): boolean => {
            return record[record_id_key]?.toString() === record_id?.toString();
        });

        if (record_index_to_update === -1) return;

        const updated_record: T = {
            ...records[record_index_to_update],
            ...fields_updated
        };

        const updated_records: T[] = [...records];

        updated_records[record_index_to_update] = updated_record;

        this.controller.setListState({
            records: updated_records
        });
    };

    // Method to handle update records by removing a record
    public removeListStateRecord = (record_id: string | number, record_id_key: keyof T): void => {
        const list_state = this.controller.getListState();

        const {
            records = [],
            total_items = 0,
            current_page = 1,
            total_pages = 1,
            limit = 10
        } = list_state;

        const record_index = records.findIndex(
            (record: T) => record?.[record_id_key]?.toString() === record_id?.toString()
        );

        if (record_index === -1) return;

        const updated_records = records.filter((_, index) => index !== record_index);

        const updated_total_items = Math.max(0, total_items - 1);

        const updated_total_pages = Math.max(1, Math.ceil(updated_total_items / limit));

        let updated_current_page = current_page;

        if (current_page > updated_total_pages) {
            updated_current_page = updated_total_pages;
        }

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
            sort_by: key as string,
            sort_direction: direction
        });

        const next_query = { ...this.controller.route.query };

        if (direction) {
            next_query.sort_by = key.toString();
            next_query.sort_direction = direction;
        } else {
            delete next_query.sort_by;
            delete next_query.sort_direction;
        }

        delete next_query.page;

        const route_changed = await this.updateRouteQuery(next_query);

        if (!route_changed) {
            await this.fetchRecords();
        }
    };

    // Method to handle on table page change
    public handleOnPageChange = async (page: number): Promise<void> => {
        this.controller.setListState({
            current_page: page
        });

        const next_query = {
            ...this.controller.route.query,
            page
        };

        const route_changed = await this.updateRouteQuery(next_query);

        if (!route_changed) {
            await this.fetchRecords();
        }
    };

    // Method to handle select action menu clicked
    public handleSelectActionMenuClicked = async (
        record: T,
        config?: { props: NavLinkUIPropsInterface }
    ): Promise<void> => {
        const sn_cell = this.getSerialCell();

        if (!sn_cell?.props || !sn_cell?.header) return;

        const result = await this.handleOnRecordRowSelected(record);

        if (!result.status) return;

        sn_cell.props.is_selected = true;

        sn_cell.header.render = () => markRaw(DataTableSerialCellUI);
    };

    // Method to handle on a record row selected
    public handleOnRecordRowSelected = async (
        record: T,
        input_value?: InputValue
    ): Promise<ActionMethodRetrunInterface> => {
        try {
            const row_key = this.controller.getTableRowKey();
            const value = record?.[row_key];

            const sn_cell = this.getSerialCell();

            if (value === undefined || value === null || !sn_cell?.props || !sn_cell?.header) {
                return {
                    status: false,
                    msg: this.getContentMessage("invalid_record_selection")
                };
            }

            const selected_records = this.controller.state_refs.selected_records.value;
            const bulk_action_selection_props =
                this.controller.state_refs.data_table_result_and_bulk_action_bar_props?.value
                    ?.selection_props;

            const value_str = value.toString();

            const index = selected_records.findIndex((item) => item?.toString() === value_str);

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

            if (bulk_action_selection_props) {
                bulk_action_selection_props.selected_count = selected_records.length;
                bulk_action_selection_props.bulk_button_props =
                    this.controller.getBulkActionButtonProps();
            }

            return {
                status: true,
                msg: this.getContentMessage("success")
            };
        } catch (error: unknown) {
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
            const row_key = this.controller.getTableRowKey();
            const sn_cell = this.getSerialCell();

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

            const selected_records = this.controller.state_refs.selected_records.value;
            const bulk_action_selection_props =
                this.controller.state_refs.data_table_result_and_bulk_action_bar_props?.value
                    ?.selection_props;

            const is_all_selected = selected_records.length === all_values.length;

            if (is_all_selected) {
                this.controller.state_refs.selected_records.value = [];
            } else {
                this.controller.state_refs.selected_records.value = [...new Set(all_values)];
            }

            const has_selection = this.controller.state_refs.selected_records.value.length > 0;

            sn_cell.props.is_selected = has_selection;

            sn_cell.header.render = has_selection
                ? () => markRaw(DataTableSerialCellUI)
                : undefined;

            if (bulk_action_selection_props) {
                bulk_action_selection_props.selected_count =
                    this.controller.state_refs.selected_records.value.length;
                bulk_action_selection_props.bulk_button_props =
                    this.controller.getBulkActionButtonProps();
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

            if (re_fetch) {
                await this.fetchRecords();
                return true;
            }

            const list_state = this.controller.getListState();

            const { records = [], total_items = 0 } = list_state;

            const updated_records = [record, ...records];

            this.controller.setListState({
                records: updated_records,
                total_items: total_items + 1
            });

            return true;
        } catch (error: unknown) {
            this.logger.error("Error handling new record created: ", { error });
            return false;
        }
    };

    // Method to handle on bulk action btn clicked
    public toggleBulkActionMenu = async () => {};
}

export default BaseListViewActionHandler;
