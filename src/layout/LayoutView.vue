<template>
    <component
        :is="active_layout_component"
        v-if="is_route_ready && active_layout_component"
        :key="active_layout_key"
    />
</template>

<script setup lang="ts">
import LayoutViewController from "@/controllers/layout/layout_view_controller";

const props = defineProps({});
const controller = new LayoutViewController(props);
const component_definition = controller.getComponentDefinition();

const { computed_refs } = component_definition;
const { active_layout_component, active_layout_key, is_route_ready } = computed_refs;
</script>
