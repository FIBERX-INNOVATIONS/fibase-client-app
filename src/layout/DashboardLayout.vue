<template>
    <template v-if="true">
        <header :class="class_styles.header_class_style">
            <TopBarUI />
        </header>
        <SideBarUI />
        <main :class="class_styles.main_class_style">
            <RouterView />
        </main>
    </template>
    <ModalUI
        v-for="(modal_prop, index) in state_refs.modals.value"
        :key="index"
        v-bind="modal_prop"
    >
        <template v-if="modal_prop?.body_component" #body>
            <component :is="modal_prop?.body_component" v-bind="modal_prop?.body_props" />
        </template>

        <template #footer v-if="modal_prop.footer_component">
            <component :is="modal_prop.footer_component" v-bind="modal_prop?.footer_props" />
        </template>
    </ModalUI>
</template>

<script setup lang="ts">
import DashboardLayoutController from "@/controllers/layout/dashboard_layout_controller";

const props = defineProps({});
const controller = new DashboardLayoutController(props);

const { components, state_refs } = controller.getComponentDefinition();

const { TopBarUI, SideBarUI, ModalUI } = components;

const class_styles = controller.class_styles;
</script>
