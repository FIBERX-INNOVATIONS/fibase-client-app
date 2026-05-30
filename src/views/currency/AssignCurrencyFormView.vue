<template>
    <section id="AssignCurrencyFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.app_id_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.currency_code_list_input_group_props"
                />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import { CurrencyRecordInterface } from "@/types/api_service_type";
import AssignCurrencyFormViewProps from "@/props_definition/currency/assign_currency_form_view_props";
import AssignCurrencyFormViewController from "@/controllers/currency/assign_currency_form_view_controller";

const props = defineProps(AssignCurrencyFormViewProps);
const controller = new AssignCurrencyFormViewController<CurrencyRecordInterface>(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
