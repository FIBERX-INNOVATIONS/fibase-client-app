<template>
    <section id="AssignCurrencyFormView" :class="class_styles.wrapper_class_style">
        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="fields.app_id_input_group_props" />

                <InputGroupUI v-bind="fields.currency_code_list_input_group_props" />
            </fieldset>

            <ToasterUI v-bind="toast_alert_props" />

            <ButtonUI v-bind="btn_props" />
        </form>
    </section>
</template>

<script setup lang="ts">
import { CurrencyRecordInterface } from "@/types/api_service_type";
import AssignCurrencyFormViewProps from "@/props_definition/currency/assign_currency_form_view_props";
import AssignCurrencyFormViewController from "@/controllers/currency/assign_currency_form_view_controller";

const props = defineProps(AssignCurrencyFormViewProps);
const controller = new AssignCurrencyFormViewController<CurrencyRecordInterface>(props);

const { state_refs, components, class_styles } = controller;

const { InputGroupUI, ToasterUI, ButtonUI } = components;

const { fields, toast_alert_props, btn_props } = state_refs;
</script>
