<template>
    <LayoutSectionsUI
        id="TopBar"
        element_type="nav"
        :class_styles="class_styles"
    >
        <template #section_1>
            <ButtonUI v-bind="hamburger_btn_props" />
            <ImageRenderUI v-bind="nav_logo_props" />
        </template>

    
    </LayoutSectionsUI>    
</template>

<script setup lang="ts">
import TopBarUIController from "@/controllers/top_bar_ui_controller";

const props = defineProps({});

const controller = new TopBarUIController(props);

const {
    class_styles,
    components,
    state_refs
} = controller;

const {
    LayoutSectionsUI,
    ButtonUI,
    ImageRenderUI
} = components;

const {
    hamburger_btn_props,
    nav_logo_props
} = state_refs


</script>