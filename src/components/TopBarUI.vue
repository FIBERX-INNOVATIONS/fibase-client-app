<template>
    <LayoutSectionsUI id="TopBar" element_type="nav" :class_styles="class_styles">
        <template #section_1>
            <ButtonUI v-bind="hamburger_btn_props" />
            <ImageRenderUI v-bind="nav_logo_props" />
        </template>

        <template #section_3>
            <ImageRenderUI v-bind="member_avatar_props" />
        </template>
    </LayoutSectionsUI>

    <DropdownMenuUI v-bind="member_avatar_dropdown_props" />
</template>

<script setup lang="ts">
import TopBarUIController from "@/controllers/layout/top_bar_ui_controller";

const props = defineProps({});

const controller = new TopBarUIController(props);
const component_definition = controller.getComponentDefinition();

const { components, state_refs } = component_definition;

const { LayoutSectionsUI, ButtonUI, ImageRenderUI, DropdownMenuUI } = components;

const { hamburger_btn_props, nav_logo_props, member_avatar_props, member_avatar_dropdown_props } =
    state_refs;

const class_styles = controller.class_styles;
</script>
