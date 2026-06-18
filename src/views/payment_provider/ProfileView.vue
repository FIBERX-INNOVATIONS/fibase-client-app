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
                :alt_text="content_obj.payment_provider_logo_alt_text"
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
                    {{ state_refs.profile_record.value?.description || content_obj.no_description_text }}
                </p>
            </ImageRenderUI>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.provider_information_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.provider_type_label_text"
                    :value="state_refs.profile_record.value?.provider_type || content_obj.empty_value_text"
                />

                <p :class="class_styles.small_bold_value_text_class_style">
                    <span v-html="getSVGIconValue('world_globe_svg_icon')" :class="class_styles.icon_class_style"></span>

                    <span :class="class_styles.small_bold_value_text_class_style">
                        {{ content_obj.website_url_label_text }}
                    </span>

                    <a
                        v-if="state_refs.profile_record.value?.website_url"
                        :href="state_refs.profile_record.value.website_url"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        {{ state_refs.profile_record.value.website_url }}
                    </a>

                    <span v-else>{{ content_obj.no_website_text }}</span>
                </p>
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.status_title_text }}
                </h4>

                <StatusValue :label="content_obj.active_label_text" :active="!!state_refs.profile_record.value?.is_active" />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.created_label_text" :value="readable_created_at" />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.updated_label_text" :value="readable_updated_at" />
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
                :member="state_refs.profile_record.value?.updator"
                :photo-url="updator_member_profile_photo_url || ''"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, h, PropType } from "vue";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { CreatorUpdatorMemberinterface, getMemberFullName, MemberRecordInterface } from "@/types/api_service_type";

import PaymentProviderProfileViewProps from "@/props_definition/payment_provider/profile_view_props";
import PaymentProviderProfileViewController from "@/controllers/payment_provider/profile_view_controller";

const props = defineProps(PaymentProviderProfileViewProps);
const controller = new PaymentProviderProfileViewController(props);
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
                h("span", { class: class_styles.small_bold_value_text_class_style }, value_props.label),
                value_props.value
            ]);
    }
});

const StatusValue = defineComponent({
    props: {
        label: { type: String, required: true },
        active: { type: Boolean, required: true }
    },
    setup(status_props) {
        return () =>
            h("p", { class: class_styles.small_bold_value_text_class_style }, [
                h("span", {
                    class: [class_styles.icon_class_style, status_props.active ? "text-green-400" : "text-red-400"],
                    innerHTML: getSVGIconValue(status_props.active ? "check_circle_svg_icon" : "x_circile_svg_icon")
                }),
                h("span", { class: class_styles.small_bold_value_text_class_style }, status_props.label),
                h(
                    "span",
                    {
                        class: ["font-semibold", status_props.active ? "text-green-400" : "text-red-400"]
                    },
                    status_props.active ? content_obj.active_status_text : content_obj.inactive_status_text
                )
            ]);
    }
});

const MemberSummary = defineComponent({
    props: {
        title: { type: String, required: true },
        member: {
            type: Object as PropType<CreatorUpdatorMemberinterface | MemberRecordInterface | null | undefined>,
            default: null
        },
        photoUrl: { type: String, required: true }
    },
    setup(member_props) {
        return () =>
            h("div", { class: class_styles.grid_class_style?.grid_wrapper_class_style }, [
                h("h4", { class: class_styles.small_bold_underlined_text_class_style }, member_props.title),
                member_props.member
                    ? h("div", { class: "flex items-center gap-3" }, [
                          h("img", {
                              src: member_props.photoUrl,
                              class: class_styles.member_avatar_img_class_style
                          }),
                          h("div", [
                              h("h3", { class: class_styles.member_name_class_style }, getMemberFullName(member_props.member)),
                              h("p", { class: class_styles.description_class_style }, member_props.member.email)
                          ])
                      ])
                    : null
            ]);
    }
});
</script>
