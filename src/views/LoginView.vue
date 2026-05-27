<template>
    <section id="LoginView" :class="class_styles.wrapper_class_style">
        <div :class="class_styles.form_box_class_style">
            <div :class="class_styles.form_box_wrapper_class_style">
                <HeaderTextUI v-bind="state_refs.header_text_props.value" />

                <form @submit.prevent :class="class_styles.fieldset_class_style">
                    <InputGroupUI v-bind="state_refs.fields.value.username_input_group_props" />

                    <InputGroupUI v-bind="state_refs.fields.value.password_input_group_props" />

                    {{ state_refs.toast_alert_props.value }}
                    <ToasterUI v-bind="state_refs.toast_alert_props.value" />

                    <ButtonUI v-bind="state_refs.btn_props.value" />
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import LoginViewController from "@/controllers/auth/login_view_controller";

const props = defineProps({});
const controller = new LoginViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
