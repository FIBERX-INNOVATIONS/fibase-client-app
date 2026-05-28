<template>
    <OverlayUI v-bind="state_refs?.sidebar_overlay_props?.value">
        <LayoutSectionsUI
            id="SideBar"
            element_type="nav"
            :class_styles="class_styles.layout_section_class_style"
        >
            <template #section_1>
                <ImageRenderUI v-bind="state_refs?.logo_img_props?.value" />
            </template>

            <template #section_2>
                <DropdownMenuUI v-bind="state_refs?.nav_menu_list_props?.value" />
            </template>
        </LayoutSectionsUI>
    </OverlayUI>
</template>

<script setup lang="ts">
import SideBarUIController from "@/controllers/layout/side_bar_ui_controller";

const props = defineProps({});

const controller = new SideBarUIController(props);
const component_definition = controller.getComponentDefinition();

const { components, state_refs } = component_definition;

const { OverlayUI, LayoutSectionsUI, ImageRenderUI, DropdownMenuUI } = components;

const class_styles = controller.class_styles;
</script>
