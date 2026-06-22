<template>
    <section id="TransactionLedgerListView" :class="list_view_class_styles.wrapper_class_style">
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
    </section>
</template>

<script setup lang="ts">
import TransactionLedgerListViewProps from "@/props_definition/transaction/ledger_list_view_props";

import TransactionLedgerListViewController from "@/controllers/transaction_ledger/list_view_controller";

const props = defineProps(TransactionLedgerListViewProps);

const controller = new TransactionLedgerListViewController(props);

const { state_refs, components } = controller.getComponentDefinition();

const { list_view_class_styles } = controller;

const { BreadcrumbUI, PageHeaderUI, FiltersPanelUI, DataTableResultAndBulkActionBarUI, DataTableUI, PaginationUI } = components;

const {
    breadcrumb_props,
    page_header_props,
    filters_panel_props,
    data_table_result_and_bulk_action_bar_props,
    data_table_key,
    table_props,
    list_state,
    pagination_ui_props
} = state_refs;
</script>
