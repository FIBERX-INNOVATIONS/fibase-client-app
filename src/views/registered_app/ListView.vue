<template>
    <section id="RegisteredAppListView" :class="list_view_class_styles?.wrapper_class_style">
        <BreadcrumbUI v-bind="breadcrumb_props" />

        <PageHeaderUI v-bind="page_header_props">
            <FiltersPanelUI v-bind="filters_panel_props" />
        </PageHeaderUI>

        <DataTableUI v-bind="table_props">
            <template #section_1>
                <DataTableResultAndBulkActionBarUI v-bind="data_table_result_and_bulk_action_bar_props" />
            </template>
            <template #section_2>
                <PaginationUI
                    v-if="controller.state_refs.list_state.value.total_pages > 1"
                    v-bind="pagination_ui_props"
                />
            </template>
        </DataTableUI>

        <DropdownMenuUI v-bind="action_menu_dropdown_props" />
    </section>
</template>

<script setup lang="ts">
import LoginViewController from "@/controllers/registered_app/list_view_controller";

const props = defineProps({});
const controller = new LoginViewController(props);

const { state_refs, components, list_view_class_styles } = controller;

const {
    BreadcrumbUI,
    PageHeaderUI,
    FiltersPanelUI,
    DataTableResultAndBulkActionBarUI,
    DataTableUI,
    DropdownMenuUI,
    PaginationUI
} = components;

const {
    breadcrumb_props,
    page_header_props,
    filters_panel_props,
    data_table_result_and_bulk_action_bar_props,
    table_props,
    pagination_ui_props,
    action_menu_dropdown_props
} = state_refs;
</script>
