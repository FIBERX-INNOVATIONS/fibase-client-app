<template>
    <section :class="class_styles.wrapper_class_style">
        <PageHeaderUI v-bind="state_refs.page_header_props.value" />

        <div :class="class_styles.credentials_grid_class_style">
            <ContentCardUI
                v-for="credential_card_props in computed_refs.credential_card_props_list.value"
                :key="credential_card_props.id"
                v-bind="credential_card_props"
            />
        </div>

        <ContentCardUI v-bind="computed_refs.private_key_card_props.value" />
    </section>
</template>

<script setup lang="ts">
import RegisteredAppActivationCredentialsViewProps from "@/props_definition/registered_app/activation_credentials_view_props";
import RegisteredAppActivationCredentialsViewController from "@/controllers/registered_app/activation_credentials_view_controller";
import type { ActivationCredentialsViewPropsInterface } from "@/ui_types/activation_credentials_view_type";

const props = defineProps(
    RegisteredAppActivationCredentialsViewProps
) as ActivationCredentialsViewPropsInterface;
const controller = new RegisteredAppActivationCredentialsViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, computed_refs, components } = component_definition;
const { ContentCardUI, PageHeaderUI } = components;
const { class_styles } = controller;
</script>
