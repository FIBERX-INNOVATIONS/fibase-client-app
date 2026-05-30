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
                :alt_text="content_obj.currency_logo_alt_text"
                :class_styles="class_styles.image_info_class_style"
            >
                <h3 :class="class_styles.h3_class_style">
                    {{ state_refs.profile_record.value?.name }}
                    <span v-if="state_refs.profile_record.value?.code">
                        ({{ state_refs.profile_record.value.code }})
                    </span>
                </h3>

                <p :class="class_styles.p_class_style">
                    {{ content_obj.symbol_label_text }}
                    {{ state_refs.profile_record.value?.symbol || content_obj.empty_value_text }}
                </p>

                <p :class="class_styles.description_class_style">
                    {{ content_obj.format_label_text }}
                    {{ state_refs.profile_record.value?.format || content_obj.no_format_text }}
                </p>
            </ImageRenderUI>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.currency_information_title_text }}
                </h4>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('identification_card_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.code_label_text }}
                    </span>
                    {{ state_refs.profile_record.value?.code || content_obj.empty_value_text }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('numbered_list_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.numeric_code_label_text }}
                    </span>
                    {{
                        state_refs.profile_record.value?.numeric_code ||
                        content_obj.empty_value_text
                    }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('world_globe_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.country_code_label_text }}
                    </span>
                    {{
                        state_refs.profile_record.value?.country_code ||
                        content_obj.empty_value_text
                    }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('numbered_list_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.precision_label_text }}
                    </span>
                    {{ state_refs.profile_record.value?.precision ?? content_obj.empty_value_text }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('numbered_list_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.minor_unit_label_text }}
                    </span>
                    {{
                        state_refs.profile_record.value?.minor_unit ?? content_obj.empty_value_text
                    }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('numbered_list_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.sort_order_label_text }}
                    </span>
                    {{
                        state_refs.profile_record.value?.sort_order ?? content_obj.empty_value_text
                    }}
                </p>
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.status_title_text }}
                </h4>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="
                            getSVGIconValue(
                                state_refs.profile_record.value?.is_fiat
                                    ? 'check_circle_svg_icon'
                                    : 'x_circile_svg_icon'
                            )
                        "
                        :class="[
                            class_styles.icon_class_style,
                            state_refs.profile_record.value?.is_fiat
                                ? 'text-green-400'
                                : 'text-red-400'
                        ]"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.type_label_text }}
                    </span>
                    {{
                        state_refs.profile_record.value?.is_fiat
                            ? content_obj.fiat_type_text
                            : content_obj.crypto_type_text
                    }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="
                            getSVGIconValue(
                                state_refs.profile_record.value?.is_active
                                    ? 'check_circle_svg_icon'
                                    : 'x_circile_svg_icon'
                            )
                        "
                        :class="[
                            class_styles.icon_class_style,
                            state_refs.profile_record.value?.is_active
                                ? 'text-green-400'
                                : 'text-red-400'
                        ]"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.active_label_text }}
                    </span>
                    <span
                        :class="
                            state_refs.profile_record.value?.is_active
                                ? 'text-green-400'
                                : 'text-red-400'
                        "
                        class="font-semibold"
                    >
                        {{
                            state_refs.profile_record.value?.is_active
                                ? content_obj.active_status_text
                                : content_obj.inactive_status_text
                        }}
                    </span>
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('clock_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.created_label_text }}
                    </span>
                    {{ readable_created_at }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span
                        v-html="getSVGIconValue('clock_svg_icon')"
                        :class="class_styles.icon_class_style"
                    ></span>
                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.updated_label_text }}
                    </span>
                    {{ readable_updated_at }}
                </p>
            </div>
        </div>

        <div
            v-if="state_refs.profile_record.value?.app_currencies?.length"
            :class="class_styles.grid_class_style?.grid_wrapper_class_style"
        >
            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                {{ content_obj.assigned_apps_title_text }}
            </h4>

            <div v-if="state_refs.profile_record.value?.app_currencies?.length" class="space-y-3">
                <div
                    v-for="appCurrency in state_refs.profile_record.value.app_currencies"
                    :key="appCurrency.app?.public_id"
                    class="flex items-center gap-3"
                >
                    <img
                        :src="appCurrency.app?.logo_url || DEFUALT_REGISTERED_APP_LOGO_URL"
                        :alt="appCurrency.app?.name || content_obj.empty_value_text"
                        :class="class_styles.member_avatar_img_class_style"
                    />

                    <div>
                        <p class="font-semibold text-sm">
                            {{ appCurrency.app?.name || content_obj.empty_value_text }}
                        </p>

                        <p class="text-xs text-gray-400">
                            {{ content_obj.app_prefix_label_text }}
                            {{ appCurrency.app?.prefix || content_obj.empty_value_text }}
                        </p>

                        <span
                            v-if="appCurrency.is_default"
                            :class="[
                                class_styles.small_bold_value_text_class_style,
                                'text-green-400'
                            ]"
                        >
                            {{ content_obj.default_badge_text }}
                        </span>
                    </div>
                </div>
            </div>

            <p v-else class="text-sm text-gray-400">
                {{ content_obj.no_assigned_apps_text }}
            </p>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.created_by_title_text }}
                </h4>

                <div
                    v-if="state_refs.profile_record.value?.creator"
                    class="flex items-center gap-3"
                >
                    <img
                        :src="creator_member_profile_photo_url"
                        :class="class_styles.member_avatar_img_class_style"
                    />

                    <div>
                        <h3 :class="class_styles.member_name_class_style">
                            {{ getMemberFullName(state_refs.profile_record.value.creator) }}
                        </h3>
                        <p :class="class_styles.description_class_style">
                            {{ state_refs.profile_record.value.creator.email }}
                        </p>
                    </div>
                </div>
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.updated_by_title_text }}
                </h4>

                <div
                    v-if="state_refs.profile_record.value?.updater"
                    class="flex items-center gap-3"
                >
                    <img
                        :src="updator_member_profile_photo_url"
                        :class="class_styles.member_avatar_img_class_style"
                    />

                    <div>
                        <h3 :class="class_styles.member_name_class_style">
                            {{ getMemberFullName(state_refs.profile_record.value.updater) }}
                        </h3>
                        <p :class="class_styles.description_class_style">
                            {{ state_refs.profile_record.value.updater.email }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";
import { getMemberFullName } from "@/types/api_service_type";
import { DEFUALT_REGISTERED_APP_LOGO_URL } from "@/configs/constants";
import CurrencyProfileViewProps from "@/props_definition/currency/profile_view_props";
import CurrencyProfileViewController from "@/controllers/currency/profile_view_controller";

const props = defineProps(CurrencyProfileViewProps);
const controller = new CurrencyProfileViewController(props);
const component_definition = controller.getComponentDefinition();

const { record_id } = props;

const { state_refs, components, computed_refs } = component_definition;

const { ImageRenderUI } = components;

const { class_styles, content_obj } = controller;

const {
    logo_url,
    creator_member_profile_photo_url,
    updator_member_profile_photo_url,
    readable_created_at,
    readable_updated_at
} = computed_refs;
</script>
