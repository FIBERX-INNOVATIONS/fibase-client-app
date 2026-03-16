<template>
    <template v-if="route.name">
        <AuthLayout v-if="route.meta.is_auth_page" />

        <DashboardLayout v-else />
    </template>
</template>

<script setup lang="ts">
import LayoutViewController from "@/controllers/layout/layout_view_controller";

const props         = defineProps({});
const controller    = new LayoutViewController(props)

const { 
    components, 
    computed_refs,
    route
} = controller;

const { 
    AuthLayout,
    DashboardLayout
} = components;

</script>