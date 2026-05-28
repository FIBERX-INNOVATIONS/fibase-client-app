<template>
    <section id="RegisteredAppFormView" :class="class_styles.wrapper_class_style">
        <div :class="class_styles.form_box_wrapper_class_style">
            <HeaderTextUI v-bind="state_refs.header_text_props.value" />

            <form @submit.prevent :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.prefix_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.name_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.description_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.base_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.logo_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.urls_input_group_props" />

                <ToasterUI v-bind="state_refs.toast_alert_props.value" />

                <ButtonUI v-bind="state_refs.btn_props.value" />
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import RegisteredAppFormViewProps from "@/props_definition/registered_app/form_view_props";
import RegisteredAppFormViewController from "@/controllers/registered_app/form_view_controller";

const props = defineProps(RegisteredAppFormViewProps);
const controller = new RegisteredAppFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
