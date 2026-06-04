<template>
    <section id="PaymentProviderMethodFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.provider_id_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.payment_method_id_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.direction_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.provider_method_code_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.min_amount_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.max_amount_input_group_props" />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import PaymentProviderMethodFormViewProps from "@/props_definition/payment_provider_method/form_view_props";
import PaymentProviderMethodFormViewController from "@/controllers/payment_provider_method/form_view_controller";

const props = defineProps(PaymentProviderMethodFormViewProps);
const controller = new PaymentProviderMethodFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
