<template>
    <section id="CurrencyPaymentProviderMethodFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.currency_id_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.provider_method_id_input_group_props"
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
import CurrencyPaymentProviderMethodFormViewProps from "@/props_definition/currency_payment_provider_method/form_view_props";
import CurrencyPaymentProviderMethodFormViewController from "@/controllers/currency_payment_provider_method/form_view_controller";

const props = defineProps(CurrencyPaymentProviderMethodFormViewProps);
const controller = new CurrencyPaymentProviderMethodFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
