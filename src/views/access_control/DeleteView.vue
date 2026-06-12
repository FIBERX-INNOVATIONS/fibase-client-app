<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import AccessControlDeleteViewProps from "@/props_definition/access_control/delete_view_props";
import AccessControlDeleteViewController from "@/controllers/access_control/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { RoleRecordInterface } from "@/types/api_service_type";

const props = defineProps(AccessControlDeleteViewProps) as DeleteViewPropsInterface<RoleRecordInterface>;
const controller = new AccessControlDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
