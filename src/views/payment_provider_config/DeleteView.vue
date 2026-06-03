<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import PaymentProviderConfigDeleteViewProps from "@/props_definition/payment_provider_config/delete_view_props";
import PaymentProviderConfigDeleteViewController from "@/controllers/payment_provider_config/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    PaymentProviderConfigDeleteViewProps
) as DeleteViewPropsInterface<PaymentProviderConfigRecordInterface>;
const controller = new PaymentProviderConfigDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
