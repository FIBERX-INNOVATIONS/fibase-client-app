<template>
    <section :class="class_styles.two_factor_wrapper_class_style">
        <div :class="class_styles.two_factor_instruction_class_style">
            <p>{{ content_text.two_factor_instruction_text }}</p>
            <p>{{ content_text.qr_instruction_text }}</p>
            <p>{{ content_text.otp_instruction_text }}</p>
        </div>

        <div :class="class_styles.two_factor_instruction_class_style">
            <h3 :class="class_styles.authenticator_apps_title_class_style">
                {{ content_text.authenticator_apps_title_text }}
            </h3>

            <div :class="class_styles.app_links_grid_class_style">
                <a
                    :class="class_styles.app_link_class_style"
                    href="https://apps.apple.com/app/microsoft-authenticator/id983156458"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Microsoft Authenticator - App Store
                </a>
                <a
                    :class="class_styles.app_link_class_style"
                    href="https://play.google.com/store/apps/details?id=com.azure.authenticator"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Microsoft Authenticator - Google Play
                </a>
                <a
                    :class="class_styles.app_link_class_style"
                    href="https://apps.apple.com/app/google-authenticator/id388497605"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Google Authenticator - App Store
                </a>
                <a
                    :class="class_styles.app_link_class_style"
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Google Authenticator - Google Play
                </a>
            </div>
        </div>

        <div :class="class_styles.qr_setup_class_style">
            <div v-if="qr_code_data_url" :class="class_styles.qr_image_wrapper_class_style">
                <img :src="qr_code_data_url" :class="class_styles.qr_image_class_style" alt="Two-factor setup QR code" />
            </div>

            <div :class="class_styles.secret_section_class_style">
                <ContentCardUI v-bind="secret_key_card_props" />
            </div>
        </div>

        <form @submit.prevent :class="class_styles.fieldset_class_style">
            <InputGroupUI v-bind="otp_input_group_props" />

            <ToasterUI v-bind="toast_alert_props" />

            <div :class="class_styles.form_actions_class_style">
                <ButtonUI v-bind="back_btn_props" />
                <ButtonUI v-bind="submit_btn_props" />
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
import TwoFactorSetupViewProps from "@/props_definition/activation/two_factor_setup_view_props";
import type { TwoFactorSetupViewPropsInterface } from "@/props_definition/activation/two_factor_setup_view_props";

import InputGroupUI from "@ui/version_3/components/InputGroupUI.vue";
import ButtonUI from "@ui/version_3/components/ButtonUI.vue";
import ToasterUI from "@ui/version_3/components/ToasterUI.vue";
import ContentCardUI from "@ui/version_3/components/ContentCardUI.vue";

const props = defineProps(TwoFactorSetupViewProps) as TwoFactorSetupViewPropsInterface;

const {
    class_styles,
    content_text,
    qr_code_data_url,
    secret_key_card_props,
    otp_input_group_props,
    back_btn_props,
    submit_btn_props,
    toast_alert_props
} = props;
</script>
