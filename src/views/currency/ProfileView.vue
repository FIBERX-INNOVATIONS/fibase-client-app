<template>
    <div v-if="is_loading" :class="class_styles.loading_wrapper_class_style">
        <span v-html="getSVGIconValue('loading_svg_icon')" :class="class_styles.link_icon_class_style"></span>

        Loading...
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <!-- 🔹 Header -->
        <div :class="class_styles.header_info_wrapper_class_style">
            <ImageRenderUI
                :id="record_id.toString()"
                :src="logo_url"
                :alt_text="`${record_id} Currency Logo`"
                :class_styles="class_styles.image_info_class_style"
            >
                <h3 :class="class_styles.h3_class_style">
                    {{ state_refs?.profile_record?.value?.name }} ({{ state_refs?.profile_record?.value?.code }})
                </h3>

                <p :class="class_styles.p_class_style">Symbol: {{ state_refs?.profile_record?.value?.symbol }}</p>

                <p :class="class_styles.description_class_style">
                    {{ state_refs?.profile_record?.value?.format || "No format defined" }}
                </p>
            </ImageRenderUI>
        </div>

        <!-- 🔹 Grid -->
        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <!-- Currency Info -->
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">Currency Info</h4>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Code: {{ state_refs?.profile_record?.value?.code }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Numeric Code: {{ state_refs?.profile_record?.value?.numeric_code || "-" }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Country: {{ state_refs?.profile_record?.value?.country_code || "-" }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Precision: {{ state_refs?.profile_record?.value?.precision }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Minor Unit: {{ state_refs?.profile_record?.value?.minor_unit ?? "-" }}
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Sort Order: {{ state_refs?.profile_record?.value?.sort_order }}
                </p>
            </div>

            <!-- Status -->
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">Status</h4>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Fiat:
                    <span :class="state_refs?.profile_record?.value?.is_fiat ? 'text-green-400' : 'text-red-400'">
                        {{ state_refs?.profile_record?.value?.is_fiat ? "Yes" : "No" }}
                    </span>
                </p>

                <p :class="class_styles.small_bold_value_text_class_style">
                    Active:
                    <span :class="state_refs?.profile_record?.value?.is_active ? 'text-green-400' : 'text-red-400'">
                        {{ state_refs?.profile_record?.value?.is_active ? "Active" : "Inactive" }}
                    </span>
                </p>

                <p v-if="readable_created_at" :class="class_styles.small_bold_value_text_class_style">
                    Created: {{ readable_created_at }}
                </p>

                <p v-if="readable_updated_at" :class="class_styles.small_bold_value_text_class_style">
                    Updated: {{ readable_updated_at }}
                </p>
            </div>
        </div>

        <!-- 🔹 Apps Using Currency -->
        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
            <h4 :class="class_styles.small_bold_underlined_text_class_style">Apps Using This Currency</h4>

            <div v-if="state_refs?.profile_record?.value?.app_currencies?.length" class="space-y-2">
                <div
                    v-for="appCurrency in record.app_currencies"
                    :key="appCurrency.app?.public_id"
                    class="flex items-center gap-3"
                >
                    <img :src="appCurrency.app?.logo_url" :class="class_styles?.member_avatar_img_class_style" />

                    <div>
                        <p class="font-semibold text-sm">
                            {{ appCurrency.app?.name }}
                        </p>

                        <p class="text-xs text-gray-400">
                            {{ appCurrency.app?.prefix }}
                        </p>

                        <span
                            v-if="appCurrency.is_default"
                            :class="[class_styles.small_bold_value_text_class_style, 'text-green-400']"
                        >
                            DEFAULT
                        </span>
                    </div>
                </div>
            </div>

            <p v-else class="text-sm text-gray-400">No apps assigned</p>
        </div>

        <!-- Creator and Updator -->
        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <!-- Creator -->
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">Created By</h4>

                <div v-if="state_refs?.profile_record?.value?.creator" class="flex items-center gap-3">
                    <img :src="creator_member_profile_photo_url" :class="class_styles?.member_avatar_img_class_style" />

                    <div>
                        <h3 :class="class_styles.member_name_class_style">
                            {{ getMemberFullName(state_refs?.profile_record?.value?.creator) }}
                        </h3>
                        <p :class="class_styles.description_class_style">
                            {{ state_refs?.profile_record?.value?.creator.email }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Updater -->
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">Updated By</h4>

                <div v-if="state_refs?.profile_record?.value?.updater" class="flex items-center gap-3">
                    <img :src="updator_member_profile_photo_url" :class="class_styles?.member_avatar_img_class_style" />

                    <div>
                        <h3 :class="class_styles.member_name_class_style">
                            {{ getMemberFullName(state_refs?.profile_record?.value?.updater) }}
                        </h3>
                        <p :class="class_styles.description_class_style">
                            {{ state_refs?.profile_record?.value?.updater.email }}
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
import CurrencyProfileViewProps from "@/props_definition/currency/profile_view_props";
import CurrencyProfileViewController from "@/controllers/currency/profile_view_controller";

const props = defineProps(CurrencyProfileViewProps);
const controller = new CurrencyProfileViewController(props);

const { record_id } = props;

const { state_refs, components, class_styles, computed_refs } = controller;

const { ImageRenderUI } = components;

const { is_loading, profile_record } = state_refs;

const {
    logo_url,
    creator_member_profile_photo_url,
    updator_member_profile_photo_url,
    readable_created_at,
    readable_updated_at
} = computed_refs;
</script>
