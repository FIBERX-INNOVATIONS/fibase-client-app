import { reactive, Ref, ref } from "vue";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { WatchersType } from "@ui/version_3/types/base_type";

import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { NavLinkContentPayloadResultInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import {
    DataTableColumnRenderType,
    DataTableUIPropsInterface
} from "@ui/version_3/ui_types/data_table_ui_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    ListViewClassStylesInterface,
    ListStateInterface,
    ListViewContentKeysInterface
} from "@/ui_types/list_view_type";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import BaseController from "@ui/version_3/base_classes/base_controller";

import ListViewClassStyles from "@/class_styles/list_view_class_styles";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import PaginationUI from "@ui/version_3/components/PaginationUI.vue";

import BreadcrumbUI from "@ui/version_3/components/BreadcrumbUI.vue";

import PageHeaderUI from "@ui/version_3/components/PageHeaderUI.vue";

import DataTableUI from "@ui/version_3/components/DataTableUI.vue";

import FiltersPanelUI from "@ui/version_3/components/FiltersPanelUI.vue";

import DropdownMenuUI from "@ui/version_3/components/DropdownMenuUI.vue";

import DataTableResultAndBulkActionBarUI from "@ui/version_3/components/DataTableResultAndBulkActionBarUI.vue";

import FilterConfigBuilderUtil from "@ui/version_3/utils/filter_config_builder_util";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import PageHeaderUIPropsBuilder from "@ui/version_3/props_builder/page_header_ui_props_builder";

import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";

import DataTableUIPropsBuilder from "@ui/version_3/props_builder/data_table_ui_props_builder";

import FiltersPanelUIPropsBuilder from "@ui/version_3/props_builder/filters_panel_ui_props_builder";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";

import PaginationUIPropsBuilder from "@ui/version_3/props_builder/pagination_ui_props_builder";

import DataTableResultAndBulkActionBarUIPropsBuilder from "@ui/version_3/props_builder/data_table_result_and_bulk_action_bar_ui_props_builder";

interface ListViewIconKeysInterface {
    create_button: SVGIconKey;
    clear_filters_button: SVGIconKey;
    apply_filters_button: SVGIconKey;
    next_pagination_button: SVGIconKey;
    previous_pagination_button: SVGIconKey;
}

class BaseListViewController<
    T extends object = Record<string, unknown>,
    K extends keyof T = keyof T
> extends BaseController<
    ListViewPropsInterface,
    ListViewStateDataInterface<T, K>,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly record_id_key: K;

    public readonly content_key: string = "";

    public readonly list_view_class_styles: ListViewClassStylesInterface = ListViewClassStyles;

    public action_handler: BaseListViewActionHandler<T, K> | null = null;

    constructor(props: ListViewPropsInterface, record_id_key: K) {
        super("list_view", props, EventBus);

        this.record_id_key = record_id_key;
    }

    // Method to be overridden by child to provide page specific filters
    protected getPageFilters(): ListFilterConfig[] {
        return [];
    }

    // Method to be overridden by child to provide page specific table render configuration
    protected getTableRenderConfig(): DataTableColumnRenderType<T>[] {
        return []; // child MUST override
    }

    // Method to provide default list state
    protected getDefaultListState(): ListStateInterface<T> {
        return {
            is_loading: false,
            records: [],
            current_page: 1,
            total_pages: 0,
            total_items: 0,
            limit: 12,
            sort_by: null,
            sort_direction: null
        };
    }

    // Method to retrun list state value
    public getListState(): ListStateInterface<T> {
        if (!this.state_refs.list_state) {
            this.state_refs.list_state = ref(this.getDefaultListState()) as Ref<
                ListStateInterface<T>
            >;
        }

        return this.state_refs.list_state.value;
    }

    // Method to update list state with patch object
    public setListState(patch: Partial<ListStateInterface<T>>): void {
        if (!this.state_refs.list_state) {
            this.state_refs.list_state = ref(this.getDefaultListState()) as Ref<
                ListStateInterface<T>
            >;
        }

        this.state_refs.list_state.value = {
            ...this.state_refs.list_state.value,
            ...patch
        };
    }

    // Method to rerun list view
    protected getUIComponents(): ListViewComponentsInterface {
        return {
            BreadcrumbUI,

            PageHeaderUI,

            FiltersPanelUI,

            DataTableResultAndBulkActionBarUI,

            DataTableUI,

            DropdownMenuUI,

            PaginationUI
        };
    }

    // Method to get list view content keys
    protected getListViewContentKeys(page_key: string): ListViewContentKeysInterface {
        const base_content_key = `content_resource.${page_key}_view_ui.list_view_ui`;

        return {
            breadcrumb_list: `${base_content_key}.breadcrumb_list`,
            header_text: `${base_content_key}.header_section.header_text`,
            header_description_text: `${base_content_key}.header_section.header_description`,
            create_button_text: `${base_content_key}.header_section.create_btn.btn_text`,
            filters_toggle_button_text: `${base_content_key}.filters_section.toggle_btn.btn_text`,
            filters_toggle_button_icon: `${base_content_key}.filters_section.toggle_btn.btn_icon`,
            clear_filters_button_text: `${base_content_key}.filters_section.clear_filters_btn.btn_text`,
            apply_filters_button_text: `${base_content_key}.filters_section.apply_filters_btn.btn_text`,
            loader_html: `${base_content_key}.table.loading_section.loader_text`,
            empty_data_html: `${base_content_key}.table.empty_state_section.header_text`,
            table_result_text: `${base_content_key}.table.result_section.result_text`,
            table_pagination_text: `${base_content_key}.table.pagination_section.btn_content`,
            filters_content_key: `${base_content_key}.filters_section`,
            add_new_modal_content_key: `content_resource.${page_key}_view_ui.modals_ui.add_new_modal_ui`,
            update_modal_content_key: `content_resource.${page_key}_view_ui.modals_ui.update_modal_ui`,
            profile_details_modal_content_key: `content_resource.${page_key}_view_ui.modals_ui.profile_details_modal_ui`,
            delete_modal_content_key: `content_resource.${page_key}_view_ui.modals_ui.delete_modal_ui`
        };
    }

    // Method to get list view icon keys
    protected getListViewIconKeys(): ListViewIconKeysInterface {
        return {
            create_button: "plus_circle_svg_icon",
            clear_filters_button: "x_circile_svg_icon",
            apply_filters_button: "arrow_right_circle_svg_icon",
            next_pagination_button: "arrow_right_short_cirlce_svg_icon",
            previous_pagination_button: "arrow_left_short_circle_svg_icon"
        };
    }

    // Methdo to get protected bulk action button props
    protected getBulkActionButtonProps(): ButtonUIPropsInterface {
        const { filters_class_styles } = ListViewClassStyles;

        const page_key = this.content_key;
        const table_bulk_action_content_key = `content_resource.${page_key}_view_ui.list_view_ui.table.bulk_action_section.btn_text`;
        const bulk_action_btn_icon = "vertical_elipsis_svg_icon";

        return ButtonUIPropsBuilder.getReactivePropsObject(
            `${page_key}BulkActionsBtn`,
            table_bulk_action_content_key,
            bulk_action_btn_icon,
            "button",
            {
                // boolean_props: { disabled: true },
                action_props: {
                    on_click: this.action_handler?.toggleBulkActionMenu
                },
                class_styles: filters_class_styles.apply_filters_btn_class_style
            },
            { selected_count: this.state_refs.selected_records?.value?.length ?? 0 }
        );
    }

    // Method to get list view ui props builders configured
    protected configureListViewPropsBuilders(
        page_key: string,
        content_keys: ListViewContentKeysInterface,
        icons: ListViewIconKeysInterface
    ): void {
        const {
            table_class_styles,
            table_result_and_bulk_action_bar_class_styles,
            table_pagination_ui_class_styles
        } = ListViewClassStyles;

        DataTableUIPropsBuilder.configure({
            section_id: `${page_key}TableSection`,
            table_id: `${page_key}Table`,
            class_styles: table_class_styles,
            loader_html_content_key: content_keys.loader_html,
            empty_data_html_content_key: content_keys.empty_data_html
        });

        DataTableResultAndBulkActionBarUIPropsBuilder.configure({
            class_styles: table_result_and_bulk_action_bar_class_styles,
            content_props: { header_text_key: content_keys.table_result_text },
            selection_props: { bulk_button_props: this.getBulkActionButtonProps() }
        });

        PaginationUIPropsBuilder.configure({
            class_styles: table_pagination_ui_class_styles,
            config: { show_numbers: true, max_visible_pages: 10 },
            content: {
                prev_btn_icon: icons.previous_pagination_button,
                next_btn_icon: icons.next_pagination_button
            }
        });
    }

    // Method to get bread crumb ui props
    protected getBreadcrumbProps(
        content_keys: ListViewContentKeysInterface
    ): ListViewStateDataInterface<T, K>["breadcrumb_props"] {
        const { list_view_breadcrumb_class_styles } = ListViewClassStyles;

        const content_manager = ContentManagerUtil.getInstance();
        const breadcrumb_items =
            content_manager.get<NavLinkContentPayloadResultInterface[]>(
                content_keys.breadcrumb_list,
                []
            ) ?? [];

        return reactive({
            id: "PageBreadcrumb",
            breadcrumb_items,
            separator: "",
            class_styles: list_view_breadcrumb_class_styles
        });
    }

    // Method to get header action button props
    protected getHeaderActionButtons(
        page_key: string,
        content_keys: ListViewContentKeysInterface,
        icons: ListViewIconKeysInterface
    ): ButtonUIPropsInterface[] {
        const { page_header_class_styles } = ListViewClassStyles;

        return [
            ButtonUIPropsBuilder.getReactivePropsObject(
                `${page_key}_module.create_${page_key}`,
                content_keys.create_button_text,
                icons.create_button,
                "button",
                {
                    action_props: this.action_handler?.getActionBtnActionHandlerConfig?.(),
                    class_styles: page_header_class_styles.action_button_class_styles
                }
            )
        ];
    }

    // Method to get permitted header action buttons based on Member permissions
    protected getPermittedHeaderActionButtons(
        buttons: ButtonUIPropsInterface[]
    ): ButtonUIPropsInterface[] {
        return buttons.filter((btn: ButtonUIPropsInterface) => {
            return MemberAuthenticatorUtil.memberHasPermissionTo(btn?.id ?? "");
        });
    }

    // Method to get page header props
    protected getPageHeaderProps(
        page_key: string,
        content_keys: ListViewContentKeysInterface,
        icons: ListViewIconKeysInterface
    ): ListViewStateDataInterface<T, K>["page_header_props"] {
        const { page_header_class_styles } = ListViewClassStyles;

        const header_props = HeaderTextUIPropsBuilder.getReactivePropsObject(
            "h2",
            content_keys.header_text,
            {
                class_styles: page_header_class_styles.header_text_class_styles
            }
        );

        return PageHeaderUIPropsBuilder.getReactivePropsObject(
            header_props,
            this.getPermittedHeaderActionButtons(
                this.getHeaderActionButtons(page_key, content_keys, icons)
            ),
            content_keys.header_description_text,
            {
                class_styles: page_header_class_styles
            }
        );
    }

    // Method to get filter pannel filter fields configuration
    protected getFilterFields(): ListViewStateDataInterface<
        T,
        K
    >["filters_panel_props"]["filter_fields"] {
        const {
            filters_input_group_class_styles: input_group_class_style,
            filters_input_ui_class_styles: input_ui_class_style
        } = ListViewClassStyles;

        return FilterConfigBuilderUtil.build(this.getPageFilters(), {
            input_group_class_style,
            input_ui_class_style
        });
    }

    // Method to get Filter Pannel props
    protected getFiltersPanelProps(
        page_key: string,
        content_keys: ListViewContentKeysInterface,
        icons: ListViewIconKeysInterface
    ): ListViewStateDataInterface<T, K>["filters_panel_props"] {
        const { filters_class_styles } = ListViewClassStyles;

        const apply_button = ButtonUIPropsBuilder.getReactivePropsObject(
            `apply_${page_key}_filters`,
            content_keys.apply_filters_button_text,
            icons.apply_filters_button,
            "button",
            {
                class_styles: filters_class_styles.apply_filters_btn_class_style
            }
        );

        const clear_button = ButtonUIPropsBuilder.getReactivePropsObject(
            `clear_${page_key}_filters`,
            content_keys.clear_filters_button_text,
            icons.clear_filters_button,
            "button",
            {
                class_styles: filters_class_styles.clear_filters_btn_class_style
            }
        );

        const filters_panel_props = FiltersPanelUIPropsBuilder.getReactivePropsObject(
            content_keys.filters_toggle_button_text,
            content_keys.filters_toggle_button_icon,
            this.getFilterFields(),
            apply_button,
            clear_button,
            {
                class_styles: filters_class_styles
            }
        );

        filters_panel_props.action_props =
            this.action_handler?.getFiltersPanelActionPropsConfig?.();
        filters_panel_props.sync_route_query = false;

        return filters_panel_props;
    }

    // Method to get table props
    protected getTableProps(): ListViewStateDataInterface<T, K>["table_props"] {
        const table_props = DataTableUIPropsBuilder.getReactivePropsObject<T>(
            this.record_id_key,
            this.getTableRenderConfig(),
            []
        ) as DataTableUIPropsInterface<T>;

        table_props.action_props = {
            on_sort: this.action_handler?.handleOnSortRecord
        };

        return table_props;
    }

    // Method to get data table result and bulk action bar props
    protected getDataTableResultAndBulkActionBarProps(
        page_key: string,
        list_state: ListStateInterface<T>
    ): ListViewStateDataInterface<T, K>["data_table_result_and_bulk_action_bar_props"] {
        return DataTableResultAndBulkActionBarUIPropsBuilder.getReactivePropsObject(
            `${page_key}DataTableResultAndBulkActionBar`,
            list_state.total_items,
            list_state.limit,
            list_state.current_page,
            list_state.total_pages,
            true,
            0
        );
    }

    // Method to get table action menu dropdown props
    protected getDropdownMenuProps(
        id: string
    ): ListViewStateDataInterface<T, K>["action_menu_dropdown_props"] {
        return DropdownMenuUIPropsBuilder.getReactivePropsObject(id, {
            class_styles: DashboardLayoutClassStyles.member_avatar_drodpwn_class_style,

            menu_items: []
        });
    }

    // Method to get pagination ui props
    protected getPaginationProps(
        page_key: string,
        content_keys: ListViewContentKeysInterface,
        list_state: ListStateInterface<T>
    ): ListViewStateDataInterface<T, K>["pagination_ui_props"] {
        return PaginationUIPropsBuilder.getReactivePropsObject(
            `${page_key}PaginationUI`,
            content_keys.table_pagination_text,
            list_state.current_page,
            list_state.total_pages,
            {
                action_props: { on_page_change: this?.action_handler?.handleOnPageChange }
            }
        );
    }

    // Methdo to get child specific UI state data, to be overridden by child if they have additional state data to add
    protected getChildUIStateData(): Partial<ListViewStateDataInterface<T, K>> {
        return {};
    }

    // Method to get UI state data
    protected getUIStateData(): ListViewStateDataInterface<T, K> {
        const page_key = this.content_key;
        const list_state = this.getListState();
        const content_keys = this.getListViewContentKeys(page_key);
        const icons = this.getListViewIconKeys();

        this.configureListViewPropsBuilders(page_key, content_keys, icons);

        const base_state: ListViewStateDataInterface<T, K> = {
            data_table_key: "FibaseDataTable",

            selected_records: [] as T[K][],

            breadcrumb_props: this.getBreadcrumbProps(content_keys),

            page_header_props: this.getPageHeaderProps(page_key, content_keys, icons),

            filters_panel_props: this.getFiltersPanelProps(page_key, content_keys, icons),

            data_table_result_and_bulk_action_bar_props:
                this.getDataTableResultAndBulkActionBarProps(page_key, list_state),

            table_props: this.getTableProps(),

            list_state,

            action_menu_dropdown_props: this.getDropdownMenuProps("TableActionMeuDropdown"),

            bulk_action_menu_dropdown_props: this.getDropdownMenuProps(
                "TableBulkActionMeuDropdown"
            ),

            pagination_ui_props: this.getPaginationProps(page_key, content_keys, list_state)
        };

        return {
            ...base_state,
            ...this.getChildUIStateData()
        };
    }

    // Method to handle child specific mounted logic, to be overridden by child if they have additional logic to run on mounted
    protected async handleChildMountedLogic(): Promise<void> {}

    // Method to handle on mounted logic
    protected async handleOnMountedLogic(): Promise<void> {
        await this.handleChildMountedLogic();

        await this.action_handler?.handleRouteChanged?.(this.route);

        if (this.action_handler?.handleOnNewRecordCreated) {
            this.event_bus?.on(
                "on_new_record_created",
                this.action_handler.handleOnNewRecordCreated
            );
        }
    }

    // Method to handle child specific before unmounted logic, to be overridden by child if they have additional logic to run before unmounted
    protected async handleChildBeforeUnmountedLogic(): Promise<void> {}

    // Method to handle before unmounted logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        await this.handleChildBeforeUnmountedLogic();

        if (this.action_handler?.handleOnNewRecordCreated) {
            this.event_bus?.off(
                "on_new_record_created",
                this.action_handler.handleOnNewRecordCreated
            );
        }
    }

    // Method to get child ui watchers, to be overridden by child if they have additional watchers to add
    protected getChildUIWatchers(): WatchersType<
        ListViewPropsInterface,
        ListViewStateDataInterface<T, K>
    > {
        return {};
    }

    protected getUIWatchers(): WatchersType<
        ListViewPropsInterface,
        ListViewStateDataInterface<T, K>
    > {
        return {
            list_state: this.action_handler?.handleListStateChangedWatcher,

            route: this.action_handler?.handleRouteChanged,

            ...this.getChildUIWatchers()
        };
    }

    // Method to retrun base list view content keys
    public getPageContentKeys(): ListViewContentKeysInterface {
        return this.getListViewContentKeys(this.content_key);
    }

    // Method to get default bulk action button props
    public getDefaultBulkActionButtonProps(): ButtonUIPropsInterface {
        return this.getBulkActionButtonProps();
    }
}

export default BaseListViewController;
