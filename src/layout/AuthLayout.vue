<template>
    <template v-if="is_route_ready">
        <main :class="class_styles.main_bg_class_style">
            <RouterView />
        </main>
        <footer :class="class_styles.footer_class_style">
            <CopyRightUI v-bind="copyright_props" />
        </footer>
    </template>
</template>

<script setup lang="ts">
import AuthLayoutController from "@/controllers/layout/auth_layout_controller";

const props = defineProps({});
const controller = new AuthLayoutController(props);
const component_definition = controller.getComponentDefinition();

const { components, computed_refs, state_refs } = component_definition;

const { CopyRightUI } = components;
const { copyright_props } = state_refs;
const { is_route_ready } = computed_refs;
const { class_styles } = controller;
</script>
