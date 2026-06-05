<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import CurrencyPaymentProviderMethodDeleteViewProps from "@/props_definition/currency_payment_provider_method/delete_view_props";
import CurrencyPaymentProviderMethodDeleteViewController from "@/controllers/currency_payment_provider_method/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    CurrencyPaymentProviderMethodDeleteViewProps
) as DeleteViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>;
const controller = new CurrencyPaymentProviderMethodDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
