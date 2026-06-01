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
                :alt_text="content_obj.payment_method_icon_alt_text"
                :class_styles="class_styles.image_info_class_style"
            >
                <h3 :class="class_styles.h3_class_style">
                    {{ state_refs.profile_record.value?.name }}
                </h3>

                <p :class="class_styles.p_class_style">
                    {{ content_obj.code_label_text }}
                    {{ state_refs.profile_record.value?.code || content_obj.empty_value_text }}
                </p>

                <p :class="class_styles.description_class_style">
                    {{
                        state_refs.profile_record.value?.description ||
                        content_obj.no_description_text
                    }}
                </p>
            </ImageRenderUI>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.display_details_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.display_name_label_text"
                    :value="
                        state_refs.profile_record.value?.metadata?.display_name ||
                        content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.display_group_label_text"
                    :value="
                        state_refs.profile_record.value?.metadata?.display_group ||
                        content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="clock_svg_icon"
                    :label="content_obj.processing_time_label_text"
                    :value="
                        state_refs.profile_record.value?.metadata?.processing_time_text ||
                        content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.fee_label_text"
                    :value="
                        state_refs.profile_record.value?.metadata?.fee_label ||
                        content_obj.empty_value_text
                    "
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.amount_limits_title_text }}
                </h4>

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.min_amount_label_text"
                    :value="
                        state_refs.profile_record.value?.metadata?.min_amount ??
                        content_obj.empty_value_text
                    "
                />

                <ProfileValue
                    icon="dollar_currency_svg_icon"
                    :label="content_obj.max_amount_label_text"
                    :value="
                        state_refs.profile_record.value?.metadata?.max_amount ??
                        content_obj.empty_value_text
                    "
                />
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.capabilities_title_text }}
                </h4>

                <CapabilityValue
                    :label="content_obj.supports_deposit_label_text"
                    :enabled="!!state_refs.profile_record.value?.metadata?.supports_deposit"
                />

                <CapabilityValue
                    :label="content_obj.supports_withdrawal_label_text"
                    :enabled="!!state_refs.profile_record.value?.metadata?.supports_withdrawal"
                />

                <CapabilityValue
                    :label="content_obj.supports_refund_label_text"
                    :enabled="!!state_refs.profile_record.value?.metadata?.supports_refund"
                />

                <CapabilityValue
                    :label="content_obj.requires_redirect_label_text"
                    :enabled="!!state_refs.profile_record.value?.metadata?.requires_redirect"
                />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.status_title_text }}
                </h4>

                <CapabilityValue
                    :label="content_obj.active_label_text"
                    :enabled="!!state_refs.profile_record.value?.is_active"
                    :enabled-text="content_obj.active_status_text"
                    :disabled-text="content_obj.inactive_status_text"
                />

                <ProfileValue
                    icon="numbered_list_svg_icon"
                    :label="content_obj.sort_order_label_text"
                    :value="
                        state_refs.profile_record.value?.sort_order ?? content_obj.empty_value_text
                    "
                />

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
                {{ content_obj.supported_regions_title_text }}
            </h4>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.countries_label_text }}
                </h4>

                <div
                    v-if="
                        state_refs.profile_record.value?.metadata?.supported_country_codes?.length
                    "
                    :class="class_styles.role_chip_wrapper_class_style"
                >
                    <span
                        v-for="code in state_refs.profile_record.value.metadata
                            .supported_country_codes"
                        :key="code"
                        :class="class_styles.role_chip_class_style"
                    >
                        {{ code }}
                    </span>
                </div>

                <p v-else :class="class_styles.description_class_style">
                    {{ content_obj.no_countries_text }}
                </p>
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.currencies_label_text }}
                </h4>

                <div
                    v-if="
                        state_refs.profile_record.value?.metadata?.supported_currency_codes?.length
                    "
                    :class="class_styles.role_chip_wrapper_class_style"
                >
                    <span
                        v-for="code in state_refs.profile_record.value.metadata
                            .supported_currency_codes"
                        :key="code"
                        :class="class_styles.role_chip_class_style"
                    >
                        {{ code }}
                    </span>
                </div>

                <p v-else :class="class_styles.description_class_style">
                    {{ content_obj.no_currencies_text }}
                </p>
            </div>
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
import { defineComponent, h, PropType } from "vue";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import {
    CreatorUpdatorMemberinterface,
    getMemberFullName,
    MemberRecordInterface
} from "@/types/api_service_type";

import PaymentMethodProfileViewProps from "@/props_definition/payment_method/profile_view_props";
import PaymentMethodProfileViewController from "@/controllers/payment_method/profile_view_controller";

const props = defineProps(PaymentMethodProfileViewProps);
const controller = new PaymentMethodProfileViewController(props);
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

const CapabilityValue = defineComponent({
    props: {
        label: { type: String, required: true },
        enabled: { type: Boolean, required: true },
        enabledText: { type: String, default: () => content_obj.enabled_text },
        disabledText: { type: String, default: () => content_obj.disabled_text }
    },
    setup(capability_props) {
        return () =>
            h("p", { class: class_styles.small_bold_value_text_class_style }, [
                h("span", {
                    class: [
                        class_styles.icon_class_style,
                        capability_props.enabled ? "text-green-400" : "text-red-400"
                    ],
                    innerHTML: getSVGIconValue(
                        capability_props.enabled ? "check_circle_svg_icon" : "x_circile_svg_icon"
                    )
                }),
                h(
                    "span",
                    { class: class_styles.small_bold_value_text_class_style },
                    capability_props.label
                ),
                h(
                    "span",
                    {
                        class: [
                            "font-semibold",
                            capability_props.enabled ? "text-green-400" : "text-red-400"
                        ]
                    },
                    capability_props.enabled
                        ? capability_props.enabledText
                        : capability_props.disabledText
                )
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
                member_props.member
                    ? h("div", { class: "flex items-center gap-3" }, [
                          h("img", {
                              src: member_props.photoUrl,
                              class: class_styles.member_avatar_img_class_style
                          }),
                          h("div", [
                              h(
                                  "h3",
                                  { class: class_styles.member_name_class_style },
                                  getMemberFullName(member_props.member)
                              ),
                              h(
                                  "p",
                                  { class: class_styles.description_class_style },
                                  member_props.member.email
                              )
                          ])
                      ])
                    : null
            ]);
    }
});
</script>
