<template>
    <ScreenLoaderUI
        :visible="state_refs.screen_loader_visible.value"
        :loader_symbol="state_refs.screen_loader_symbol.value"
        :loader_text="state_refs.screen_loader_text.value"
        :class_styles="state_refs.screen_loader_class_styles.value"
    />

    <StatusAlertUI
        :alert_box_id="state_refs.alert_box_id.value"
        :class_styles="state_refs.status_alert_ui_class_style.value"
        :close_btn_icon="state_refs.status_alert_close_btn_icon.value"
        :visible="!!state_refs.alert_status.value"
        :alert_status="state_refs.alert_status.value"
        :status_icon="state_refs.status_icon.value"
        :status_content_messgae="state_refs.alert_message.value"
        :on_close="action_handler?.handleOnCloseStatusClick"
    />

    <LayoutView />
</template>

<script setup lang="ts">
import AppRootController from "@/controllers/app_root_controller";

const props = defineProps({});
const controller = new AppRootController(props);
const component_definition = controller.getComponentDefinition();
const { action_handler } = controller;
const { state_refs, components } = component_definition;

const { ScreenLoaderUI, StatusAlertUI, LayoutView } = components;
</script>
