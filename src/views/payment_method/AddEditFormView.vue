<template>
    <section id="PaymentMethodFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.code_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.name_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.description_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.icon_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.sort_order_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.display_name_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.display_description_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.display_group_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.processing_time_text_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.fee_label_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.supported_country_codes_input_group_props"
                />

                <InputGroupUI
                    v-bind="state_refs.fields.value.supported_currency_codes_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.min_amount_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.max_amount_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.requires_redirect_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.supports_deposit_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.supports_withdrawal_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.supports_refund_input_group_props" />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import PaymentMethodFormViewProps from "@/props_definition/payment_method/form_view_props";
import PaymentMethodFormViewController from "@/controllers/payment_method/form_view_controller";

const props = defineProps(PaymentMethodFormViewProps);
const controller = new PaymentMethodFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
