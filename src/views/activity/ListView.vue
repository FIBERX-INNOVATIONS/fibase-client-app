<template>
    <section id="ActivityListView" :class="list_view_class_styles?.wrapper_class_style">
        <BreadcrumbUI v-bind="breadcrumb_props" />

        <PageHeaderUI v-bind="page_header_props">
            <FiltersPanelUI v-bind="filters_panel_props" />
        </PageHeaderUI>

        <DataTableResultAndBulkActionBarUI v-bind="data_table_result_and_bulk_action_bar_props" />

        <div v-if="list_state.is_loading" :class="activity_loading_wrapper_class_style">
            <span :class="activity_loading_icon_class_style" v-html="loading_svg_icon"></span>

            {{ activity_loading_text }}
        </div>

        <div v-else-if="!list_state.records.length" :class="activity_empty_state_class_style">
            {{ activity_empty_state_text }}
        </div>

        <div v-else :class="activity_cards_wrapper_class_style">
            <ContentCardUI
                v-for="record in list_state.records"
                :key="record.id"
                v-bind="controller.getActivityCardProps(record)"
            />
        </div>

        <PaginationUI v-if="list_state.total_pages > 1" v-bind="pagination_ui_props" />
    </section>
</template>

<script setup lang="ts">
import type { ListViewPropsInterface } from "@/ui_types/list_view_type";

import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import ActivityListViewController from "@/controllers/activity/list_view_controller";

const props = defineProps<ListViewPropsInterface>();
const controller = new ActivityListViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;
const list_view_class_styles = controller.list_view_class_styles;
const {
    activity_cards_wrapper_class_style,
    activity_loading_wrapper_class_style,
    activity_loading_icon_class_style,
    activity_empty_state_class_style
} = list_view_class_styles;

const { BreadcrumbUI, PageHeaderUI, FiltersPanelUI, DataTableResultAndBulkActionBarUI, PaginationUI, ContentCardUI } =
    components;

const {
    breadcrumb_props,
    page_header_props,
    filters_panel_props,
    data_table_result_and_bulk_action_bar_props,
    list_state,
    pagination_ui_props
} = state_refs;

const loading_svg_icon = getSVGIconValue("loading_svg_icon");
const activity_loading_text = controller.getActivityLoadingText();
const activity_empty_state_text = controller.getActivityEmptyStateText();
</script>
