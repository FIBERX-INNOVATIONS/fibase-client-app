<template>
    <section id="ServiceFeeConfigurationFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.currency_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.registered_app_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.provider_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.identity_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.transaction_type_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.fee_type_input_group_props" />

                <InputGroupUI
                    v-if="state_refs.fee_type.value !== 'range'"
                    v-bind="state_refs.fields.value.amount_input_group_props"
                />

                <section
                    v-if="state_refs.fee_type.value === 'range'"
                    :class="service_fee_class_styles.range_section_class_style"
                >
                    <div :class="service_fee_class_styles.range_header_class_style">
                        <h3 :class="service_fee_class_styles.range_title_class_style">
                            {{ range_section_title }}
                        </h3>

                        <ButtonUI v-bind="state_refs.add_range_btn_props.value" />
                    </div>

                    <div :class="service_fee_class_styles.range_rows_class_style">
                        <article
                            v-for="range_row in state_refs.range_rows.value"
                            :key="range_row.key"
                            :class="service_fee_class_styles.range_row_class_style"
                        >
                            <div :class="service_fee_class_styles.range_fields_class_style">
                                <InputGroupUI v-bind="range_row.min_value_input_group_props" />

                                <InputGroupUI v-bind="range_row.max_value_input_group_props" />

                                <InputGroupUI v-bind="range_row.fee_type_input_group_props" />

                                <InputGroupUI v-bind="range_row.amount_input_group_props" />
                            </div>

                            <div :class="service_fee_class_styles.range_remove_wrapper_class_style">
                                <ButtonUI v-bind="range_row.remove_btn_props" />
                            </div>
                        </article>
                    </div>
                </section>

                <InputGroupUI v-bind="state_refs.fields.value.effective_from_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.effective_until_input_group_props" />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import ServiceFeeConfigurationFormViewProps from "@/props_definition/service_fee_configuration/form_view_props";

import ServiceFeeConfigurationFormViewController from "@/controllers/service_fee_configuration/form_view_controller";

const content_manager = ContentManagerUtil.getInstance();

const props = defineProps(ServiceFeeConfigurationFormViewProps);

const controller = new ServiceFeeConfigurationFormViewController(props);

const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;

const service_fee_class_styles = controller.service_fee_class_styles;

const range_section_title =
    content_manager.get<string>(
        "content_resource.service_fee_configuration_view_ui.form_view_ui.fieldset.ranges_section_title"
    ) ?? "Fee ranges";
</script>
