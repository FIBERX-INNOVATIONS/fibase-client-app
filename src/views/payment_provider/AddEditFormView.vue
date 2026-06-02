<template>
    <section id="PaymentProviderFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.code_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.name_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.description_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.provider_type_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.logo_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.website_url_input_group_props" />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import PaymentProviderFormViewProps from "@/props_definition/payment_provider/form_view_props";
import PaymentProviderFormViewController from "@/controllers/payment_provider/form_view_controller";

const props = defineProps(PaymentProviderFormViewProps);
const controller = new PaymentProviderFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
