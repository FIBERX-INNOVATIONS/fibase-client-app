<template>
    <section id="PaymentProviderConfigFormView" :class="class_styles.wrapper_class_style">
        <HeaderTextUI v-bind="state_refs.header_text_props.value" />

        <form @submit.prevent :class="class_styles.form_box_wrapper_class_style">
            <fieldset :class="class_styles.fieldset_class_style">
                <InputGroupUI v-bind="state_refs.fields.value.provider_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.environment_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.api_key_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.secret_key_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.public_key_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.private_key_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.client_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.client_secret_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.merchant_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.account_id_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.username_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.password_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.webhook_hash_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.webhook_secret_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.signing_secret_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.webhook_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.callback_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.redirect_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.success_url_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.failure_url_input_group_props" />

                <InputGroupUI
                    v-bind="state_refs.fields.value.settlement_currency_input_group_props"
                />

                <InputGroupUI v-bind="state_refs.fields.value.default_currency_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.payout_schedule_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.capture_mode_input_group_props" />

                <InputGroupUI v-bind="state_refs.fields.value.timeout_ms_input_group_props" />
            </fieldset>

            <ToasterUI v-bind="state_refs.toast_alert_props.value" />

            <ButtonUI v-bind="state_refs.btn_props.value" />
        </form>
    </section>
</template>

<script setup lang="ts">
import PaymentProviderConfigFormViewProps from "@/props_definition/payment_provider_config/form_view_props";
import PaymentProviderConfigFormViewController from "@/controllers/payment_provider_config/form_view_controller";

const props = defineProps(PaymentProviderConfigFormViewProps);
const controller = new PaymentProviderConfigFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const class_styles = controller.class_styles;
</script>
