<template>
    <section id="LogoutView" :class="class_styles.wrapper_class_style">
        <div :class="class_styles.form_box_class_style">
            <div :class="class_styles.form_box_wrapper_class_style">
                <HeaderTextUI v-bind="header_text_props" />

                <div :class="class_styles.spinner_class_style" v-html="spinner_html_content"></div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import LogoutViewController from "@/controllers/auth/logout_view_controller";
import type { LogoutViewPropsInterface } from "@/ui_types/logout_view_type";

const props = defineProps<LogoutViewPropsInterface>();
const controller = new LogoutViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI } = components;

const { class_styles, header_text_props, spinner_html_content } = state_refs;
</script>
