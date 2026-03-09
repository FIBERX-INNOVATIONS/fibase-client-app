<template>
    <template v-if="true">
        <!-- loader -->
        <ScreenLoaderUI 
            v-bind="screen_loader_props" 
            @isLoading="action_handler.handleIsLoading" 
        />
        <!-- alert -->
        <StatusAlertUI 
            v-bind="status_alert_props" 
            @alert_status_updated="action_handler.handleStatusChanged" 
        />

        <!-- Layout -->
        <LayoutView />

        

    </template>
</template>

<script setup lang="ts">
import AppRootController from "@/controllers/app_root_controller";

const props         = defineProps({});
const controller    = new AppRootController(props)

const { 
    state_refs, 
    components, 
    computed_refs,
    action_handler 
} = controller;

const {
    modals,
    status_alert_props,
    screen_loader_props
} = state_refs;

const { 
    ScreenLoaderUI, 
    StatusAlertUI, 
    LayoutView
} = components;

</script>