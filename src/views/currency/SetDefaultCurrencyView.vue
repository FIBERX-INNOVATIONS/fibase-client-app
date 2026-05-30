<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import AppCurrencyDecisionViewProps from "@/props_definition/currency/app_currency_decision_view_props";
import AppCurrencyDecisionViewController from "@/controllers/currency/app_currency_decision_view_controller";

import { AppCurrencyDecisionViewPropsInterface } from "@/ui_types/delete_view_type";

const props = defineProps(AppCurrencyDecisionViewProps) as AppCurrencyDecisionViewPropsInterface;
const controller = new AppCurrencyDecisionViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
