<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import RegisteredAppDeleteViewProps from "@/props_definition/registered_app/delete_view_props";
import RegisteredAppDeleteViewController from "@/controllers/registered_app/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { RegisteredAppRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    RegisteredAppDeleteViewProps
) as DeleteViewPropsInterface<RegisteredAppRecordInterface>;
const controller = new RegisteredAppDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
