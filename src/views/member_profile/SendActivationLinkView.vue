<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import MemberProfileSendActivationLinkViewProps from "@/props_definition/member_profile/send_activation_link_view_props";
import MemberProfileSendActivationLinkViewController from "@/controllers/member_profile/send_activation_link_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { MemberRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    MemberProfileSendActivationLinkViewProps
) as DeleteViewPropsInterface<MemberRecordInterface>;
const controller = new MemberProfileSendActivationLinkViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
