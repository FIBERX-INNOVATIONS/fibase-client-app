<template>
    <template v-if="route.name">
        {{ is_authenticated }}
        <AuthLayout v-if="!is_authenticated" />

        <DashboardLayout v-else />
    </template>
</template>

<script setup lang="ts">
import LayoutViewController from "@/controllers/layout_view_controller";

const props         = defineProps({});
const controller    = new LayoutViewController(props)

const { 
    components, 
    computed_refs,
    route
} = controller;

const { is_authenticated } = computed_refs

const { 
    AuthLayout,
    DashboardLayout
} = components;

</script>