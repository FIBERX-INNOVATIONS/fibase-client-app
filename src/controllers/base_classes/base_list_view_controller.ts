import { Ref, ref } from "vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    ListViewClassStylesInterface,
    ListStateInterface
} from "@/ui_types/list_view_type";

import { WatchersType } from "@ui/version_3/types/base_type";
import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";
import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";


import ListViewClassStyles from "@/class_styles/list_view_class_styles";

import BreadcrumbUI from "@ui/version_3/components/BreadcrumbUI.vue";
import PageHeaderUI from "@ui/version_3/components/PageHeaderUI.vue";
import FiltersPanelUI from "@ui/version_3/components/FiltersPanelUI.vue";
import DataTableUI from "@ui/version_3/components/DataTableUI.vue";
import DropdownMenuUI from "@ui/version_3/components/DropdownMenuUI.vue";

import BreadcrumbUIPropsBuilder from "@ui/version_3/props_builder/breadcrumb_ui_props_builder";
import PageHeaderUIPropsBuilder from "@ui/version_3/props_builder/page_header_ui_props_builder";
import HeaderTextUIPropsBuilder from "@ui/version_3/props_builder/header_text_ui_props_builder";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import FilterConfigBuilderUtil from "@ui/version_3/utils/filter_config_builder_util";
import FiltersPanelUIPropsBuilder from "@ui/version_3/props_builder/filters_panel_ui_props_builder";
import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";
import DataTableUIPropsBuilder from "@ui/version_3/props_builder/data_table_ui_props_builder";
import DropdownMenuUIPropsBuilder from "@ui/version_3/props_builder/dropdown_menu_ui_props_builder";
import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";





class BaseListViewController<
    T = any, 
    K extends keyof T = keyof T
>  extends BaseController<
    ListViewPropsInterface,
    ListViewStateDataInterface<T, K>,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes
> {
    protected readonly record_id_key: K;

    public readonly list_view_class_styles: ListViewClassStylesInterface = ListViewClassStyles;


    public action_handler: BaseListViewActionHandler<
        T,
        ListViewPropsInterface, 
        ListViewStateDataInterface,
        ListViewComputedDataInterface,
        ListViewComponentsInterface,
        GlobalEventTypes
    > | null = null;

    constructor(
        props: ListViewPropsInterface,
        record_id_key: K
    ) {
        super("list_view", props, EventBus);

        this.record_id_key = record_id_key;
    }

    /**
     * Page name used to resolve content paths.
     * Child controllers override this.
     */
    protected getPageContentKey(): string {
        return "registered_app";
    }

    protected getPageFilters(): ListFilterConfig[] {
        return [];
    }

    public getTableRowKey(): keyof T {
        return "id" as keyof T; // child overrides
    }

    protected getTableRenderConfig(): DataTableColumnRenderType<T>[] {
        return []; // child MUST override
    }

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

    public getListState(): ListStateInterface<T> {

        if (!this.state_refs.list_state) {
            this.state_refs.list_state = ref(
                this.getDefaultListState()
            ) as Ref<ListStateInterface<T>>;
        }

        return this.state_refs.list_state.value;
    }

    public setListState(patch: Partial<ListStateInterface<T>>): void {

        if (!this.state_refs.list_state) {
            this.state_refs.list_state = ref(
                this.getDefaultListState()
            ) as Ref<ListStateInterface<T>>;
        }

        this.state_refs.list_state.value = {
            ...this.state_refs.list_state.value,
            ...patch
        };
    }

    /**
     * Base UI Components
     */
    protected getBaseUIComponents(): ListViewComponentsInterface {
        return {
            BreadcrumbUI,

            PageHeaderUI,

            FiltersPanelUI,

            DataTableUI,

            DropdownMenuUI
        };
    }

    /**
     * Child controllers can extend components
     */
    protected getChildUIComponents(): Partial<ListViewComponentsInterface> {
        return {};
    }

    /**
     * Merge base + child components
     */
    protected getUIComponents(): ListViewComponentsInterface {
        return {
            ...this.getBaseUIComponents(),
            ...this.getChildUIComponents()
        };
    }

    /**
     * Base state
     */
    protected getBaseUIStateData(): ListViewStateDataInterface<T, K> {

        const {
            list_view_breadcrumb_class_styles,
            page_header_class_styles,
            filters_class_styles,
            filters_input_group_class_styles: input_group_class_style,
            filters_input_ui_class_styles: input_ui_class_style,
            table_class_styles
        } = ListViewClassStyles

        const page_key                          = this.getPageContentKey();
        const row_key                           = this.getTableRowKey();
        const breadcrumb_content_key            = `content_resource.${page_key}_view_ui.list_view_ui.breadcrumb_list`;
        const header_text_content_key           = `content_resource.${page_key}_view_ui.list_view_ui.header_section.header_text`;
        const header_desc_content_key           = `content_resource.${page_key}_view_ui.list_view_ui.header_section.header_description`;
        const create_btn_content_key            = `content_resource.${page_key}_view_ui.list_view_ui.header_section.create_btn.btn_text`;
        const filters_toggle_btn_content_key    = `content_resource.${page_key}_view_ui.list_view_ui.filters_section.toggle_btn.btn_text`;
        const filters_toggle_btn_icon_key       = `content_resource.${page_key}_view_ui.list_view_ui.filters_section.toggle_btn.btn_icon`;
        const clear_filters_btn_content_key     = `content_resource.${page_key}_view_ui.list_view_ui.filters_section.clear_filters_btn.btn_text`;
        const apply_filters_btn_content_key     = `content_resource.${page_key}_view_ui.list_view_ui.filters_section.apply_filters_btn.btn_text`;
        const loader_html_content_key           = `content_resource.${page_key}_view_ui.list_view_ui.table.loading_section.loader_text`;
        const empty_data_html_content_key       = `content_resource.${page_key}_view_ui.list_view_ui.table.empty_state_section.header_text`;
        const create_btn_icon                   = "plus_circle_svg_icon";
        const clear_filters_btn_icon            = "x_circile_svg_icon";
        const apply_filters_btn_icon            = "arrow_right_circle_svg_icon";


        const header_props = HeaderTextUIPropsBuilder.getReactivePropsObject(
            "h2", 
            header_text_content_key,
            {
                class_styles: page_header_class_styles.header_text_class_styles
            }
        );

        const create_btn_props = ButtonUIPropsBuilder.getReactivePropsObject(
            `create_${page_key}`,
            create_btn_content_key,
            create_btn_icon,
            "button",
            {
                action_props: this.action_handler?.getActionBtnActionHandlerConfig?.(),
                class_styles: page_header_class_styles.action_button_class_styles
            }
        );

        const header_action_btns = [create_btn_props];

        const filters_config = this.getPageFilters();

        const filter_fields = FilterConfigBuilderUtil.build(
            filters_config,
            { input_group_class_style, input_ui_class_style }
        );

        const apply_button = ButtonUIPropsBuilder.getReactivePropsObject(
            `apply_${page_key}_filters`,
            apply_filters_btn_content_key,
            apply_filters_btn_icon,
            "button",
            {
                action_props: {
                    on_click: this.action_handler?.handleOnApplyFilters
                },
                class_styles: filters_class_styles.apply_filters_btn_class_style
            }
        );

        const clear_button = ButtonUIPropsBuilder.getReactivePropsObject(
            `clear_${page_key}_filters`,
            clear_filters_btn_content_key,
            clear_filters_btn_icon,
            "button",
            {
                action_props: {
                    on_click: this.action_handler?.handleOnClearFilters
                },
                class_styles: filters_class_styles.clear_filters_btn_class_style
            }
        );

        const permitted_header_actions = header_action_btns.filter(
            (btn: ButtonUIPropsInterface) => {
                return MemberAuthenticatorUtil.memberHasPermissionTo(btn?.id ?? "")
            }
        );

        const configured_table = DataTableUIPropsBuilder.configure({
            section_id: `${page_key}TableSection`,
            table_id: `${page_key}Table`,
            class_styles: table_class_styles,
            loader_html_content_key,
            empty_data_html_content_key
        });


        return {
            selected_records: [] as T[K][],

            breadcrumb_props: BreadcrumbUIPropsBuilder.getReactivePropsObjectFromContent(
                "PageBreadcrumb",
               breadcrumb_content_key,
                "",
                list_view_breadcrumb_class_styles
            ),

            page_header_props: PageHeaderUIPropsBuilder.getReactivePropsObject(
                header_props, 
                permitted_header_actions,
                header_desc_content_key,
                {
                    class_styles: page_header_class_styles
                }

            ),

            filters_panel_props: FiltersPanelUIPropsBuilder.getReactivePropsObject(
                filters_toggle_btn_content_key,
                filters_toggle_btn_icon_key,
                filter_fields,
                apply_button,
                clear_button,
                {
                    class_styles: filters_class_styles,
                    action_props: this.action_handler?.getFiltersPanelActionPropsConfig?.()
                }
            ),

            table_props: DataTableUIPropsBuilder.getReactivePropsObject<T>(
                this.getTableRowKey(),
                this.getTableRenderConfig(),
                [],
            ),

            list_state: this.getListState(),

            action_menu_dropdown_props: DropdownMenuUIPropsBuilder.getReactivePropsObject(
                "TableActionMeuDropdown", 
                {
                    class_styles: DashboardLayoutClassStyles.member_avatar_drodpwn_class_style,

                    menu_items: []
                }
            )

        } as ListViewStateDataInterface<T, K>;
    }

    /**
     * Child state extension
     */
    protected getChildUIStateData(): Partial<ListViewStateDataInterface<T, K>> {
        return {};
    }

    /**
     * Merge base + child state
     */
    protected getUIStateData(): ListViewStateDataInterface<T, K> {
        return {
            ...this.getBaseUIStateData(),
            ...this.getChildUIStateData()
        };
    }

    /**
     * Base mounted logic
     */
    protected async handleOnMountedLogic(): Promise<void> {
        await this.handleChildMountedLogic();

        this.action_handler?.hydrateFiltersFromRoute?.();

        await this.action_handler?.fetchRecords();
    }

    /**
     * Child mounted logic
     */
    protected async handleChildMountedLogic(): Promise<void> {}

    /**
     * Base Mounted logic
     */
    protected getUIWatchers(): WatchersType<ListViewPropsInterface, ListViewStateDataInterface> {
        return {
            list_state: this.action_handler?.handleListStateChangedWatcher
        };
    }
}

export default BaseListViewController;