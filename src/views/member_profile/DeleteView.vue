<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import MemberProfileDeleteViewProps from "@/props_definition/member_profile/delete_view_props";
import MemberProfileDeleteViewController from "@/controllers/member_profile/delete_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { MemberRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    MemberProfileDeleteViewProps
) as DeleteViewPropsInterface<MemberRecordInterface>;
const controller = new MemberProfileDeleteViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
