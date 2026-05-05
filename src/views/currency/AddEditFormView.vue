<template>
    <section id="CurrencyFormView" :class="class_styles.wrapper_class_style">

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">

                <InputGroupUI v-bind="fields.code_input_group_props" />

                <InputGroupUI v-bind="fields.name_input_group_props" />

                <InputGroupUI v-bind="fields.symbol_input_group_props" />

                <InputGroupUI v-bind="fields.numeric_code_input_group_props" />

                <InputGroupUI v-bind="fields.country_code_input_group_props" />

                <InputGroupUI v-bind="fields.precision_input_group_props" />

                <InputGroupUI v-bind="fields.minor_unit_input_group_props" />

                <InputGroupUI v-bind="fields.format_input_group_props" />

                <InputGroupUI v-bind="fields.sort_order_input_group_props" />

                <InputGroupUI v-bind="fields.logo_url_input_group_props" />

                <InputGroupUI v-bind="fields.is_fiat_input_group_props" />

            </fieldset>

            <ToasterUI v-bind="toast_alert_props" />

            <ButtonUI v-bind="btn_props" />

        </form>

    </section>
</template>

<script setup lang="ts">
import { CurrencyRecordInterface } from "@/types/api_service_type";
import CurrencyFormViewProps from "@/props_definition/currency/form_view_props";
import CurrencyFormViewController from "@/controllers/currency/form_view_controller";

const props = defineProps(CurrencyFormViewProps);
const controller = new CurrencyFormViewController<CurrencyRecordInterface>(props);

const { state_refs, components, class_styles } = controller;

const { InputGroupUI, ToasterUI, ButtonUI } = components;

const { fields, toast_alert_props, btn_props } = state_refs;
</script>