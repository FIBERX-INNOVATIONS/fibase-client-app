<template>
    <DecisionPromptUI v-bind="state_refs.decision_prompt_props.value" />
</template>

<script setup lang="ts">
import MemberProfileRestoreMemberViewProps from "@/props_definition/member_profile/restore_member_view_props";
import MemberProfileRestoreMemberViewController from "@/controllers/member_profile/restore_member_view_controller";

import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { MemberRecordInterface } from "@/types/api_service_type";

const props = defineProps(
    MemberProfileRestoreMemberViewProps
) as DeleteViewPropsInterface<MemberRecordInterface>;
const controller = new MemberProfileRestoreMemberViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { DecisionPromptUI } = components;
</script>
