<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import MemberDeviceDecisionViewProps from "@/props_definition/member_profile/member_device_decision_view_props";
import MemberDeviceDecisionViewController from "@/controllers/member_profile/member_device_decision_view_controller";

import { MemberDeviceDecisionViewPropsInterface } from "@/ui_types/member_profile_profile_view_type";

const props = defineProps(MemberDeviceDecisionViewProps) as MemberDeviceDecisionViewPropsInterface;
const controller = new MemberDeviceDecisionViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
