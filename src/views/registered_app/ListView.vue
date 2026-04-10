<template>
    <section id="RegisteredAppListView" :class="list_view_class_styles?.wrapper_class_style">

        <BreadcrumbUI v-bind="breadcrumb_props" />

        <PageHeaderUI v-bind="page_header_props">
            <FiltersPanelUI  v-bind="filters_panel_props" />
        </PageHeaderUI>

        <DataTableUI v-bind="table_props" />

        <DropdownMenuUI v-bind="action_menu_dropdown_props" />

    </section>
</template>

<script setup lang="ts">

import LoginViewController  from "@/controllers/registered_app/list_view_controller";

const props            = defineProps({});
const controller       = new LoginViewController(props);

const { 
    state_refs,
    components,
    list_view_class_styles
} = controller;

const {
    BreadcrumbUI,
    PageHeaderUI,
    FiltersPanelUI,
    DataTableUI,
    DropdownMenuUI
} = components;

const {
    breadcrumb_props,
    page_header_props,
    filters_panel_props,
    table_props,
    action_menu_dropdown_props
} = state_refs;

</script>

