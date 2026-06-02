<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import PaymentProviderDeleteViewProps from "@/props_definition/payment_provider/delete_view_props";
import PaymentProviderDeleteViewController from "@/controllers/payment_provider/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { PaymentProviderRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    PaymentProviderDeleteViewProps
) as DeleteViewPropsInterface<PaymentProviderRecordInterface>;
const controller = new PaymentProviderDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
