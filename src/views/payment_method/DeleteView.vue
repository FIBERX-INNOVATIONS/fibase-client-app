<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import PaymentMethodDeleteViewProps from "@/props_definition/payment_method/delete_view_props";
import PaymentMethodDeleteViewController from "@/controllers/payment_method/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { PaymentMethodRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    PaymentMethodDeleteViewProps
) as DeleteViewPropsInterface<PaymentMethodRecordInterface>;
const controller = new PaymentMethodDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
