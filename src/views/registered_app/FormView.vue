<template>
    <section id="RegisteredAppFormView" :class="class_styles.wrapper_class_style">

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="fields.prefix_input_group_props" />

                <InputGroupUI v-bind="fields.name_input_group_props" />

                <InputGroupUI v-bind="fields.description_input_group_props" />

                <InputGroupUI v-bind="fields.base_url_input_group_props" />

                <InputGroupUI v-bind="fields.logo_url_input_group_props" />

                <InputGroupUI v-bind="fields.urls_input_group_props" />

            </fieldset>

            <ToasterUI v-bind="toast_alert_props" />

            <ButtonUI v-bind="btn_props" />
        
        </form>

    </section>
</template>

<script setup lang="ts">
import { RegisteredAppRecordInterface } from "@/types/api_service_type";
import RegisteredAppFormViewProps       from "@/props_definition/registered_app/form_view_props";
import RegisteredAppFormViewController  from "@/controllers/registered_app/form_view_controller";


const props            = defineProps(RegisteredAppFormViewProps);
const controller       = new RegisteredAppFormViewController<RegisteredAppRecordInterface>(props);

const { 
    state_refs,
    components,
    class_styles
} = controller;

const {
    InputGroupUI,
    ToasterUI,
    ButtonUI
} = components;

const {
    fields,
    toast_alert_props,
    btn_props
} = state_refs;

</script>