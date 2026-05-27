<template>
    <section id="TwoFactorLoginView" :class="class_styles.wrapper_class_style">
        <div :class="class_styles.form_box_class_style">
            <div :class="class_styles.form_box_wrapper_class_style">
                <HeaderTextUI v-bind="header_text_props" />

                <form @submit.prevent :class="class_styles.fieldset_class_style">
                    <InputGroupUI v-bind="otp_input_group_props" />

                    <ToasterUI v-bind="toast_alert_props" />

                    <ButtonUI v-bind="btn_props" />
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import TwoFactorLoginViewController from "@/controllers/auth/two_factor_login_view_controller";
import type { TwoFactorLoginViewPropsInterface } from "@/ui_types/two_factor_login_view_type";

const props = defineProps<TwoFactorLoginViewPropsInterface>();
const controller = new TwoFactorLoginViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const { class_styles, header_text_props, otp_input_group_props, toast_alert_props, btn_props } =
    state_refs;
</script>
