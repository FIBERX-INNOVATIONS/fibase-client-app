<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span
            v-html="getSVGIconValue('loading_svg_icon')"
            :class="class_styles.link_icon_class_style"
        ></span>

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
                    {{
                        state_refs.profile_record.value?.provider?.name ||
                        content_obj.empty_value_text
                    }}
                </h3>

                <p :class="class_styles.p_class_style">
                    {{ content_obj.account_reference_label_text }}
                    {{
                        state_refs.profile_record.value?.account_reference ||
                        content_obj.empty_value_text
                    }}
                </p>

                <p :class="class_styles.description_class_style">
                    {{ content_obj.environment_label_text }}
                    {{
                        state_refs.profile_record.value?.environment || content_obj.empty_value_text
                    }}
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
                    :value="
                        state_refs.profile_record.value?.provider?.name ||
                        content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.provider_code_label_text"
                    :value="
                        state_refs.profile_record.value?.provider?.code ||
                        content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.provider_id_label_text"
                    :value="
                        state_refs.profile_record.value?.provider_id ?? content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="square_grid_plus_svg_icon"
                    :label="content_obj.environment_label_text"
                    :value="
                        state_refs.profile_record.value?.environment || content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="key_svg_icon"
                    :label="content_obj.account_reference_label_text"
                    :value="
                        state_refs.profile_record.value?.account_reference ||
                        content_obj.empty_value_text
                    "
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.status_title_text }}
                </h4>

                <ProfileValue
                    icon="clock_svg_icon"
                    :label="content_obj.created_label_text"
                    :value="readable_created_at"
                />

                <ProfileValue
                    icon="clock_svg_icon"
                    :label="content_obj.updated_label_text"
                    :value="readable_updated_at"
                />
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

            <p
                v-if="!state_refs.credentials_are_visible.value"
                :class="class_styles.description_class_style"
            >
                {{ content_obj.credentials_hidden_text }}
            </p>

            <button
                v-if="has_credentials_permission"
                type="button"
                :disabled="state_refs.is_loading_credentials.value"
                class="rounded-md bg-gray-900 px-4 py-2 text-xs font-bold uppercase text-white disabled:cursor-not-allowed disabled:opacity-50"
                @click="action_handler.handleCredentialsButtonClicked"
            >
                {{
                    state_refs.is_loading_credentials.value
                        ? content_obj.credentials_loading_text
                        : state_refs.credentials_are_visible.value
                          ? content_obj.hide_credentials_btn_text
                          : content_obj.reveal_credentials_btn_text
                }}
            </button>

            <p v-else :class="class_styles.description_class_style">
                {{ content_obj.credentials_permission_denied_text }}
            </p>

            <p
                v-if="state_refs.credentials_error_msg.value"
                class="text-xs font-semibold text-red-500"
            >
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

            <p
                v-else-if="state_refs.credentials_are_visible.value"
                :class="class_styles.description_class_style"
            >
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
                :member="state_refs.profile_record.value?.updater"
                :photo-url="updator_member_profile_photo_url || ''"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, PropType } from "vue";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import {
    CreatorUpdatorMemberinterface,
    getMemberFullName,
    MemberRecordInterface
} from "@/types/api_service_type";

import PaymentProviderConfigProfileViewProps from "@/props_definition/payment_provider_config/profile_view_props";
import PaymentProviderConfigProfileViewController from "@/controllers/payment_provider_config/profile_view_controller";

const props = defineProps(PaymentProviderConfigProfileViewProps);
const controller = new PaymentProviderConfigProfileViewController(props);
const component_definition = controller.getComponentDefinition();

const { record_id } = props;
const { state_refs, components, computed_refs } = component_definition;
const { ImageRenderUI } = components;
const { class_styles, content_obj, action_handler } = controller;
const {
    logo_url,
    creator_member_profile_photo_url,
    updator_member_profile_photo_url,
    readable_created_at,
    readable_updated_at,
    has_credentials_permission
} = computed_refs;

const setting_fields = [
    { key: "webhook_url", label_key: "webhook_url_label_text" },
    { key: "callback_url", label_key: "callback_url_label_text" },
    { key: "redirect_url", label_key: "redirect_url_label_text" },
    { key: "success_url", label_key: "success_url_label_text" },
    { key: "failure_url", label_key: "failure_url_label_text" },
    { key: "settlement_currency", label_key: "settlement_currency_label_text" },
    { key: "default_currency", label_key: "default_currency_label_text" },
    { key: "payout_schedule", label_key: "payout_schedule_label_text" },
    { key: "capture_mode", label_key: "capture_mode_label_text" },
    { key: "timeout_ms", label_key: "timeout_ms_label_text" }
] as const;

const credential_fields = [
    { key: "api_key", label_key: "api_key_label_text" },
    { key: "secret_key", label_key: "secret_key_label_text" },
    { key: "public_key", label_key: "public_key_label_text" },
    { key: "private_key", label_key: "private_key_label_text" },
    { key: "client_id", label_key: "client_id_label_text" },
    { key: "client_secret", label_key: "client_secret_label_text" },
    { key: "merchant_id", label_key: "merchant_id_label_text" },
    { key: "account_id", label_key: "account_id_label_text" },
    { key: "username", label_key: "username_label_text" },
    { key: "password", label_key: "password_label_text" },
    { key: "webhook_hash", label_key: "webhook_hash_label_text" },
    { key: "webhook_secret", label_key: "webhook_secret_label_text" },
    { key: "signing_secret", label_key: "signing_secret_label_text" }
] as const;

const isPresent = (value: unknown): boolean => {
    return value !== null && value !== undefined && value !== "";
};

const settings_entries = computed(() => {
    const settings = state_refs.profile_record.value?.settings ?? {};

    return setting_fields
        .map((field) => ({
            key: field.key,
            label: content_obj[field.label_key],
            value: settings[field.key] ?? content_obj.empty_value_text
        }))
        .filter((entry) => isPresent(settings[entry.key]));
});

const credential_entries = computed(() => {
    const credentials = state_refs.credentials.value ?? {};

    return credential_fields
        .map((field) => ({
            key: field.key,
            label: content_obj[field.label_key],
            value: credentials[field.key] ?? content_obj.empty_value_text
        }))
        .filter((entry) => isPresent(credentials[entry.key]));
});

const ProfileValue = defineComponent({
    props: {
        icon: { type: String as PropType<SVGIconKey>, required: true },
        label: { type: String, required: true },
        value: { type: [String, Number], default: "" }
    },
    setup(value_props) {
        return () =>
            h("p", { class: class_styles.small_bold_value_text_class_style }, [
                h("span", {
                    class: class_styles.icon_class_style,
                    innerHTML: getSVGIconValue(value_props.icon)
                }),
                h(
                    "span",
                    { class: class_styles.small_bold_value_text_class_style },
                    value_props.label
                ),
                value_props.value
            ]);
    }
});

const MemberSummary = defineComponent({
    props: {
        title: { type: String, required: true },
        member: {
            type: Object as PropType<
                CreatorUpdatorMemberinterface | MemberRecordInterface | null | undefined
            >,
            default: null
        },
        photoUrl: { type: String, required: true }
    },
    setup(member_props) {
        return () =>
            h("div", { class: class_styles.grid_class_style?.grid_wrapper_class_style }, [
                h(
                    "h4",
                    { class: class_styles.small_bold_underlined_text_class_style },
                    member_props.title
                ),
                h("div", { class: "flex items-center gap-3" }, [
                    h("img", {
                        src: member_props.photoUrl,
                        alt: getMemberFullName(member_props.member ?? undefined),
                        class: class_styles.member_avatar_img_class_style
                    }),
                    h("div", {}, [
                        h(
                            "p",
                            { class: class_styles.member_name_class_style },
                            getMemberFullName(member_props.member ?? undefined)
                        ),
                        h(
                            "p",
                            { class: class_styles.p_class_style },
                            member_props.member?.email ?? content_obj.empty_value_text
                        )
                    ])
                ])
            ]);
    }
});
</script>
