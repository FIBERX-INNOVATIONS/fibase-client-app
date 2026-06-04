<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import PaymentProviderMethodDeleteViewProps from "@/props_definition/payment_provider_method/delete_view_props";
import PaymentProviderMethodDeleteViewController from "@/controllers/payment_provider_method/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    PaymentProviderMethodDeleteViewProps
) as DeleteViewPropsInterface<PaymentProviderMethodRecordInterface>;
const controller = new PaymentProviderMethodDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
