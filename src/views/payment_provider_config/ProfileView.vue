<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span v-html="loading_icon_html" :class="class_styles.link_icon_class_style"></span>

        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <div :class="class_styles.header_info_wrapper_class_style">
            <ImageRenderUI
                :id="record_id.toString()"
                :src="logo_url"
                :alt_text="content_obj.payment_provider_logo_alt_text"
                :class_styles="class_styles.image_info_class_style"
            >
                <h3 :class="class_styles.h3_class_style">
                    {{ state_refs.profile_record.value?.provider?.name || content_obj.empty_value_text }}
                </h3>

                <p :class="class_styles.p_class_style">
                    {{ content_obj.account_reference_label_text }}
                    {{ state_refs.profile_record.value?.account_reference || content_obj.empty_value_text }}
                </p>

                <p :class="class_styles.description_class_style">
                    {{ content_obj.environment_label_text }}
                    {{ state_refs.profile_record.value?.environment || content_obj.empty_value_text }}
                </p>
            </ImageRenderUI>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.config_information_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.provider_name_label_text"
                    :value="state_refs.profile_record.value?.provider?.name || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.provider_code_label_text"
                    :value="state_refs.profile_record.value?.provider?.code || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.provider_id_label_text"
                    :value="state_refs.profile_record.value?.provider?.id ?? content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="square_grid_plus_svg_icon"
                    :label="content_obj.environment_label_text"
                    :value="state_refs.profile_record.value?.environment || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="key_svg_icon"
                    :label="content_obj.account_reference_label_text"
                    :value="state_refs.profile_record.value?.account_reference || content_obj.empty_value_text"
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.status_title_text }}
                </h4>

                <ProfileValue icon="clock_svg_icon" :label="content_obj.created_label_text" :value="readable_created_at" />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.updated_label_text" :value="readable_updated_at" />
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                {{ content_obj.settings_title_text }}
            </h4>

            <div v-if="settings_entries.length" :class="class_styles.role_chip_wrapper_class_style">
                <ProfileValue
                    v-for="setting in settings_entries"
                    :key="setting.key"
                    icon="square_grid_plus_svg_icon"
                    :label="setting.label"
                    :value="setting.value"
                />
            </div>

            <p v-else :class="class_styles.description_class_style">
                {{ content_obj.no_settings_text }}
            </p>
        </div>

        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                {{ content_obj.credentials_title_text }}
            </h4>

            <p v-if="!state_refs.credentials_are_visible.value" :class="class_styles.description_class_style">
                {{ content_obj.credentials_hidden_text }}
            </p>

            <button
                v-if="has_credentials_permission"
                type="button"
                :disabled="state_refs.is_loading_credentials.value"
                class="rounded-md bg-gray-900 px-4 py-2 text-xs font-bold uppercase text-white disabled:cursor-not-allowed disabled:opacity-50"
                @click="action_handler.handleCredentialsButtonClicked"
            >
                {{ credentials_button_text }}
            </button>

            <p v-else :class="class_styles.description_class_style">
                {{ content_obj.credentials_permission_denied_text }}
            </p>

            <p v-if="state_refs.credentials_error_msg.value" class="text-xs font-semibold text-red-500">
                {{ state_refs.credentials_error_msg.value }}
            </p>

            <div
                v-if="state_refs.credentials_are_visible.value && credential_entries.length"
                :class="class_styles.role_chip_wrapper_class_style"
            >
                <ProfileValue
                    v-for="credential in credential_entries"
                    :key="credential.key"
                    icon="key_svg_icon"
                    :label="credential.label"
                    :value="credential.value"
                />
            </div>

            <p v-else-if="state_refs.credentials_are_visible.value" :class="class_styles.description_class_style">
                {{ content_obj.no_credentials_text }}
            </p>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <MemberSummary
                :title="content_obj.created_by_title_text"
                :member="state_refs.profile_record.value?.creator"
                :photo-url="creator_member_profile_photo_url || ''"
            />

            <MemberSummary
                :title="content_obj.updated_by_title_text"
                :member="state_refs.profile_record.value?.updator"
                :photo-url="updator_member_profile_photo_url || ''"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import PaymentProviderConfigProfileViewProps from "@/props_definition/payment_provider_config/profile_view_props";

import PaymentProviderConfigProfileViewController from "@/controllers/payment_provider_config/profile_view_controller";

const props = defineProps(PaymentProviderConfigProfileViewProps);

const controller = new PaymentProviderConfigProfileViewController(props);

const { record_id } = props;

const { class_styles, content_obj, action_handler } = controller;

const { state_refs, components, computed_refs } = controller.getComponentDefinition();

const { ImageRenderUI, ProfileValue, MemberSummary } = components;

const {
    logo_url,
    creator_member_profile_photo_url,
    updator_member_profile_photo_url,
    readable_created_at,
    readable_updated_at,
    has_credentials_permission,
    loading_icon_html,
    settings_entries,
    credential_entries,
    credentials_button_text
} = computed_refs;
</script>
