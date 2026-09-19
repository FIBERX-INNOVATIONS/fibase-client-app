<template>
    <section :class="class_styles.wrapper_class_style">
        <div :class="class_styles.form_box_wrapper_class_style">
            <HeaderTextUI v-bind="state_refs.header_text_props.value" />

            <form @submit.prevent :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.app_id_input_group_props" />
                <ToasterUI v-bind="state_refs.toast_alert_props.value" />
                <ButtonUI v-bind="state_refs.btn_props.value" />
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { AppWebhookDeliveryTestFormPropsInterface } from "@/ui_types/app_webhook_delivery_view_type";

import AppWebhookDeliveryTestFormViewController from "@/controllers/app_webhook_delivery/test_form_view_controller";

const props = defineProps<AppWebhookDeliveryTestFormPropsInterface>();

const controller = new AppWebhookDeliveryTestFormViewController(props);

const { state_refs, components } = controller.getComponentDefinition();

const { class_styles } = controller;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;
</script>
