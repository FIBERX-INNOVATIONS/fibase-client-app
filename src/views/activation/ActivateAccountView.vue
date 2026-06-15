<template>
    <section id="ActivateAccountView" :class="class_styles.wrapper_class_style">
        <div :class="class_styles.form_box_class_style">
            <div :class="class_styles.form_box_wrapper_class_style">
                <HeaderTextUI v-bind="state_refs.header_text_props.value" />

                <template v-if="computed_refs.is_loading_step.value">
                    <p :class="class_styles.loader_text_class_style">
                        {{ state_refs.loader_text.value }}
                    </p>

                    <ToasterUI v-bind="state_refs.toast_alert_props.value" />

                    <div :class="class_styles.spinner_class_style" v-html="state_refs.spinner_html_content.value"></div>
                </template>

                <form
                    v-else-if="computed_refs.is_password_step.value"
                    @submit.prevent
                    :class="class_styles.fieldset_class_style"
                >
                    <p :class="class_styles.instruction_class_style">
                        {{ state_refs.content_text.value.password_instruction_text }}
                    </p>

                    <InputGroupUI
                        :key="state_refs.fields.value.password_input_group_props.input_props?.type"
                        v-bind="state_refs.fields.value.password_input_group_props"
                    />

                    <InputGroupUI
                        :key="state_refs.fields.value.password_confirm_input_group_props.input_props?.type"
                        v-bind="state_refs.fields.value.password_confirm_input_group_props"
                    />

                    <div :class="class_styles.password_toggle_wrapper_class_style">
                        <ButtonUI
                            :key="state_refs.password_toggle_btn_props.value.content_props?.button_html_content"
                            v-bind="state_refs.password_toggle_btn_props.value"
                        />
                    </div>

                    <ToasterUI v-bind="state_refs.toast_alert_props.value" />

                    <ButtonUI v-bind="state_refs.btn_props.value" />
                </form>

                <TwoFactorSetupView
                    v-else-if="computed_refs.is_two_factor_step.value"
                    :class_styles="class_styles"
                    :content_text="state_refs.content_text.value"
                    :qr_code_data_url="state_refs.qr_code_data_url.value"
                    :secret_key_card_props="computed_refs.secret_key_card_props.value"
                    :otp_input_group_props="state_refs.fields.value.otp_input_group_props"
                    :back_btn_props="state_refs.back_btn_props.value"
                    :submit_btn_props="state_refs.btn_props.value"
                    :toast_alert_props="state_refs.toast_alert_props.value"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ActivateAccountViewPropsInterface } from "@/ui_types/activate_account_view_type";
import ActivateAccountViewProps from "@/props_definition/activation/activate_account_view_props";
import ActivateAccountViewController from "@/controllers/activation/activate_account_view_controller";

const props = defineProps(ActivateAccountViewProps) as ActivateAccountViewPropsInterface;
const controller = new ActivateAccountViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, computed_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI, TwoFactorSetupView } = components;

const class_styles = controller.class_styles;
</script>
