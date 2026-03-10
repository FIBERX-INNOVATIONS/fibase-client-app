<template>
    <section id="LoginView" :class="class_styles.wrapper_class_style">
        <div :class="class_styles.form_box_class_style">

            <div :class="class_styles.form_box_wrapper_class_style">
                
                <HeaderTextUI v-bind="header_text_props" />

                <form @submit.prevent :class="class_styles.fieldset_class_style">
                    <InputGroupUI v-bind="username_input_group_props" />

                    <InputGroupUI v-bind="password_input_group_props" />

                    <ToasterUI v-bind="toast_alert_props" />

                    <ButtonUI v-bind="btn_props" />
                
                </form>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import LoginViewController  from "@/controllers/login_view_controller";

const props            = defineProps({});
const controller       = new LoginViewController(props);

const { 
    state_refs,
    components,
    class_styles
} = controller;

const {
    HeaderTextUI,
    InputGroupUI,
    ToasterUI,
    ButtonUI
} = components;

const {
    header_text_props,
    username_input_group_props,
    password_input_group_props,
    toast_alert_props,
    btn_props
} = state_refs;

</script>