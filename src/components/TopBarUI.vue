<template>
    <LayoutSectionsUI id="TopBar" element_type="nav" :class_styles="class_styles">
        <template #section_1>
            <ButtonUI v-bind="state_refs.hamburger_btn_props.value" />
            <ImageRenderUI v-bind="state_refs.nav_logo_props.value" />
        </template>

        <template #section_3>
            <ImageRenderUI v-bind="state_refs.member_avatar_props.value" />
        </template>
    </LayoutSectionsUI>

    <DropdownMenuUI v-bind="state_refs.member_avatar_dropdown_props.value" />
</template>

<script setup lang="ts">
import TopBarUIController from "@/controllers/layout/top_bar_ui_controller";

const props = defineProps({});
const controller = new TopBarUIController(props);
const component_definition = controller.getComponentDefinition();

const { components, state_refs } = component_definition;

const { LayoutSectionsUI, ButtonUI, ImageRenderUI, DropdownMenuUI } = components;

const class_styles = controller.class_styles;
</script>
