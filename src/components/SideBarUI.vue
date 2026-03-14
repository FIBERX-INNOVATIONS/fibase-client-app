<template>
    <OverlayUI v-bind="sidebar_overlay_props">
        <LayoutSectionsUI
            id="SideBar"
            element_type="nav"
            :class_styles="class_styles.layout_section_class_style"
        >
            <template #section_1>
                <ImageRenderUI v-bind="logo_img_props" />
            </template>

            <template #section_2>
                <DropdownMenuUI v-bind="nav_menu_list_props" />
            </template>

            
        </LayoutSectionsUI>    
    </OverlayUI>
</template>

<script setup lang="ts">
import SideBarUIController from "@/controllers/side_bar_ui_controller";

const props = defineProps({});

const controller = new SideBarUIController(props);

const {
    class_styles,
    components,
    state_refs
} = controller;

const {
    OverlayUI,
    LayoutSectionsUI,
    ImageRenderUI,
    DropdownMenuUI
} = components;

const {
    sidebar_overlay_props,
    logo_img_props,
    nav_menu_list_props
} = state_refs


</script>