<template>
    <template v-if="route.name">
        {{ is_auth_route }}
        <AuthLayout v-if="is_auth_route" />

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

const { is_auth_route } = computed_refs

const { 
    AuthLayout,
    DashboardLayout
} = components;

</script>