<template>
    <template v-if="route.name">
        <main :class="class_styles.main_bg_class_style">
            <RouterView />
        </main>
        <footer :class="class_styles.footer_class_style">
            <CopyRightUI v-bind="copyright_props" />
        </footer>
    </template>
</template>

<script setup lang="ts">
import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";
import AuthLayoutController from "@/controllers/layout/auth_layout_controller";

const props         = defineProps({});
const controller    = new AuthLayoutController(props);
const class_styles  = AuthLayoutClassStyles;

const { 
    components, 
    state_refs,
    route
} = controller;

const { copyright_props } = state_refs
const { CopyRightUI } = components

</script>