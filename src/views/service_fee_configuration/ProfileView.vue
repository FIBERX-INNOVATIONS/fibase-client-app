<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span v-html="getSVGIconValue('loading_svg_icon')" :class="class_styles.link_icon_class_style"></span>

        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <div :class="class_styles.header_info_wrapper_class_style">
            <ImageRenderUI
                :id="record_id"
                :src="logo_url"
                :alt_text="content_obj.currency_logo_alt_text"
                :class_styles="class_styles.image_info_class_style"
            >
                <h3 :class="class_styles.h3_class_style">
                    {{ state_refs.profile_record.value?.currency?.name || content_obj.empty_value_text }}
                </h3>

                <p :class="class_styles.p_class_style">
                    {{ state_refs.profile_record.value?.currency?.code || content_obj.empty_value_text }}
                </p>

                <p :class="class_styles.description_class_style">{{ readable_transaction_type }} · {{ readable_fee_type }}</p>
            </ImageRenderUI>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.configuration_information_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.configuration_id_label_text"
                    :value="state_refs.profile_record.value?.public_id || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.currency_label_text"
                    :value="state_refs.profile_record.value?.currency?.code || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="square_grid_plus_svg_icon"
                    :label="content_obj.transaction_type_label_text"
                    :value="readable_transaction_type"
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.configuration_level_label_text"
                    :value="state_refs.profile_record.value?.configuration_level ?? content_obj.empty_value_text"
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.fee_details_title_text }}
                </h4>

                <ProfileValue
                    icon="receipt_percentage_svg_icon"
                    :label="content_obj.fee_type_label_text"
                    :value="readable_fee_type"
                />

                <ProfileValue
                    v-if="state_refs.profile_record.value?.fee_type !== 'range'"
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.amount_label_text"
                    :value="formatted_amount"
                />
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.scope_title_text }}
                </h4>

                <ProfileValue
                    icon="square_grid_plus_svg_icon"
                    :label="content_obj.registered_app_label_text"
                    :value="state_refs.profile_record.value?.registered_app?.name || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="square_grid_plus_svg_icon"
                    :label="content_obj.provider_label_text"
                    :value="state_refs.profile_record.value?.provider?.name || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.identity_label_text"
                    :value="state_refs.profile_record.value?.identity?.public_id || content_obj.empty_value_text"
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.lifecycle_title_text }}
                </h4>

                <StatusValue
                    :label="content_obj.active_label_text"
                    :active="!!state_refs.profile_record.value?.is_active"
                    :true-text="content_obj.active_status_text"
                    :false-text="content_obj.inactive_status_text"
                />

                <ProfileValue
                    icon="clock_svg_icon"
                    :label="content_obj.effective_from_label_text"
                    :value="readable_effective_from"
                />

                <ProfileValue
                    icon="clock_svg_icon"
                    :label="content_obj.effective_until_label_text"
                    :value="readable_effective_until"
                />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.created_label_text" :value="readable_created_at" />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.updated_label_text" :value="readable_updated_at" />
            </div>
        </div>

        <div
            v-if="state_refs.profile_record.value?.fee_type === 'range'"
            :class="class_styles.grid_class_style?.grid_wrapper_class_style"
        >
            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                {{ content_obj.ranges_title_text }}
            </h4>

            <p v-if="!range_entries.length" :class="class_styles.empty_state_text_class_style">
                {{ content_obj.no_ranges_text }}
            </p>

            <div
                v-for="(range_entry, range_index) in range_entries"
                :key="range_entry.key"
                :class="class_styles.grid_class_style?.grid_wrapper_class_style"
            >
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.range_item_title_text }} {{ range_index + 1 }}
                </h4>

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.range_minimum_label_text"
                    :value="range_entry.minimum"
                />

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.range_maximum_label_text"
                    :value="range_entry.maximum"
                />

                <ProfileValue
                    icon="receipt_percentage_svg_icon"
                    :label="content_obj.range_fee_type_label_text"
                    :value="range_entry.fee_type"
                />

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.range_amount_label_text"
                    :value="range_entry.amount"
                />
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <MemberSummary
                :title="content_obj.created_by_title_text"
                :member="state_refs.profile_record.value?.creator"
                :photo-url="creator_member_profile_photo_url"
            />

            <MemberSummary
                :title="content_obj.updated_by_title_text"
                :member="state_refs.profile_record.value?.updator"
                :photo-url="updator_member_profile_photo_url"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import ServiceFeeConfigurationProfileViewProps from "@/props_definition/service_fee_configuration/profile_view_props";

import ServiceFeeConfigurationProfileViewController from "@/controllers/service_fee_configuration/profile_view_controller";

const props = defineProps(ServiceFeeConfigurationProfileViewProps);
const controller = new ServiceFeeConfigurationProfileViewController(props);
const { state_refs, components, computed_refs } = controller.getComponentDefinition();

const { record_id } = props;
const { ImageRenderUI, ProfileValue, StatusValue, MemberSummary } = components;
const { class_styles, content_obj } = controller;
const {
    logo_url,
    readable_transaction_type,
    readable_fee_type,
    formatted_amount,
    readable_effective_from,
    readable_effective_until,
    readable_created_at,
    readable_updated_at,
    creator_member_profile_photo_url,
    updator_member_profile_photo_url,
    range_entries
} = computed_refs;
</script>
