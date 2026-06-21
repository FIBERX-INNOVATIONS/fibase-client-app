<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span v-html="getSVGIconValue('loading_svg_icon')" :class="class_styles.link_icon_class_style"></span>

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
                    {{ state_refs.profile_record.value?.currency?.name || content_obj.empty_value_text }}
                </h3>

                <p :class="class_styles.p_class_style">
                    {{ content_obj.currency_code_label_text }}
                    {{ state_refs.profile_record.value?.currency?.code || content_obj.empty_value_text }}
                </p>

                <p :class="class_styles.description_class_style">
                    {{ content_obj.provider_name_label_text }}
                    {{ state_refs.profile_record.value?.provider_method?.provider?.name || content_obj.empty_value_text }}
                </p>
            </ImageRenderUI>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.currency_information_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.currency_name_label_text"
                    :value="state_refs.profile_record.value?.currency?.name || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.currency_code_label_text"
                    :value="state_refs.profile_record.value?.currency?.code || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.currency_id_label_text"
                    :value="state_refs.profile_record.value?.currency?.id ?? content_obj.empty_value_text"
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.provider_method_information_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.provider_name_label_text"
                    :value="state_refs.profile_record.value?.provider_method?.provider?.name || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.provider_code_label_text"
                    :value="state_refs.profile_record.value?.provider_method?.provider?.code || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.payment_method_name_label_text"
                    :value="
                        state_refs.profile_record.value?.provider_method?.payment_method?.name || content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.payment_method_code_label_text"
                    :value="
                        state_refs.profile_record.value?.provider_method?.payment_method?.code || content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.provider_method_id_label_text"
                    :value="state_refs.profile_record.value?.provider_method?.id ?? content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="square_grid_plus_svg_icon"
                    :label="content_obj.direction_label_text"
                    :value="
                        state_refs.profile_record.value?.provider_method?.direction?.toUpperCase?.() ||
                        content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="key_svg_icon"
                    :label="content_obj.provider_method_code_label_text"
                    :value="
                        state_refs.profile_record.value?.provider_method?.provider_method_code || content_obj.empty_value_text
                    "
                />
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.amount_limits_title_text }}
                </h4>

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.min_amount_label_text"
                    :value="formatted_min_amount || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.max_amount_label_text"
                    :value="formatted_max_amount || content_obj.empty_value_text"
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.status_title_text }}
                </h4>

                <StatusValue
                    :label="content_obj.active_label_text"
                    :active="!!state_refs.profile_record.value?.is_active"
                    :true-text="content_obj.active_status_text"
                    :false-text="content_obj.inactive_status_text"
                />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.created_label_text" :value="readable_created_at" />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.updated_label_text" :value="readable_updated_at" />
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <MemberSummary
                :title="content_obj.linked_by_title_text"
                :member="state_refs.profile_record.value?.linked_by_member"
                :photo-url="linked_by_member_profile_photo_url || ''"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import CurrencyPaymentProviderMethodProfileViewProps from "@/props_definition/currency_payment_provider_method/profile_view_props";

import CurrencyPaymentProviderMethodProfileViewController from "@/controllers/currency_payment_provider_method/profile_view_controller";

const props = defineProps(CurrencyPaymentProviderMethodProfileViewProps);

const controller = new CurrencyPaymentProviderMethodProfileViewController(props);

const { state_refs, components, computed_refs } = controller.getComponentDefinition();

const { record_id } = props;

const { ImageRenderUI, ProfileValue, StatusValue, MemberSummary } = components;

const { class_styles, content_obj } = controller;

const {
    logo_url,
    readable_created_at,
    readable_updated_at,
    formatted_min_amount,
    formatted_max_amount,
    linked_by_member_profile_photo_url
} = computed_refs;
</script>
