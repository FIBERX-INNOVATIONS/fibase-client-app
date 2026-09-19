<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import type { AppWebhookDeliveryReplayPropsInterface } from "@/ui_types/app_webhook_delivery_view_type";
import AppWebhookDeliveryReplayViewController from "@/controllers/app_webhook_delivery/replay_view_controller";

const props = defineProps<AppWebhookDeliveryReplayPropsInterface>();
const controller = new AppWebhookDeliveryReplayViewController(props);
const { state_refs, components } = controller.getComponentDefinition();
const { DecisionPromptUI } = components;
</script>
