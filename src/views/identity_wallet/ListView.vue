<template>
    <section id="IdentityWalletListView" :class="list_view_class_styles.wrapper_class_style">
        <BreadcrumbUI v-bind="breadcrumb_props" />

        <PageHeaderUI v-bind="page_header_props">
            <FiltersPanelUI v-bind="filters_panel_props" />
        </PageHeaderUI>

        <DataTableUI :key="data_table_key" v-bind="table_props">
            <template #section_1>
                <DataTableResultAndBulkActionBarUI v-bind="data_table_result_and_bulk_action_bar_props" />
            </template>
            <template #section_2>
                <PaginationUI v-if="list_state.total_pages > 1" v-bind="pagination_ui_props" />
            </template>
        </DataTableUI>

        <DropdownMenuUI v-bind="action_menu_dropdown_props" />
    </section>
</template>

<script setup lang="ts">
import IdentityWalletListViewProps from "@/props_definition/identity_wallet/list_view_props";

import IdentityWalletListViewController from "@/controllers/identity_wallet/list_view_controller";

const props = defineProps(IdentityWalletListViewProps);

const controller = new IdentityWalletListViewController(props);

const { state_refs, components } = controller.getComponentDefinition();

const list_view_class_styles = controller.list_view_class_styles;

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
    data_table_key,
    table_props,
    list_state,
    pagination_ui_props,
    action_menu_dropdown_props
} = state_refs;
</script>
