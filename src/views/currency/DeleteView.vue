<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import CurrencyDeleteViewProps from "@/props_definition/currency/delete_view_props";
import CurrencyDeleteViewController from "@/controllers/currency/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { CurrencyRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    CurrencyDeleteViewProps
) as DeleteViewPropsInterface<CurrencyRecordInterface>;
const controller = new CurrencyDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
