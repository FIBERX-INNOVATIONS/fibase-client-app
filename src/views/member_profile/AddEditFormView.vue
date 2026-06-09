<template>
    <section id="MemberProfileFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.first_name_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.last_name_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.email_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.phone_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.dob_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.gender_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.profile_photo_link_input_group_props"
                />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import MemberProfileFormViewProps from "@/props_definition/member_profile/form_view_props";
import MemberProfileFormViewController from "@/controllers/member_profile/form_view_controller";

const props = defineProps(MemberProfileFormViewProps);
const controller = new MemberProfileFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
