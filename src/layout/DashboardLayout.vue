<template>
    <template v-if="true">
        <header :class="class_styles.header_class_style">
            <TopBarUI />
        </header>
        <main :class="class_styles.main_class_style">
            <RouterView />
        </main>
    </template>
</template>

<script setup lang="ts">
import DashboardLayoutController from "@/controllers/dashboard_layout_controller";

const props         = defineProps({});
const controller    = new DashboardLayoutController(props);

const { 
    class_styles,
    components, 
} = controller;

const { 
    TopBarUI 
} = components

</script>