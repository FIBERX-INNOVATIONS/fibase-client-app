<template>
    <section id="CurrencyFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.code_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.name_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.symbol_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.network_symbol_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.numeric_code_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.country_code_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.precision_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.minor_unit_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.sort_order_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.logo_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.is_fiat_input_group_props" />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import CurrencyFormViewProps from "@/props_definition/currency/form_view_props";
import CurrencyFormViewController from "@/controllers/currency/form_view_controller";

const props = defineProps(CurrencyFormViewProps);
const controller = new CurrencyFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
