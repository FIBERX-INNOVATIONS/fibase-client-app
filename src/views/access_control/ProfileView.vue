<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span v-html="getSVGIconValue('loading_svg_icon')" :class="class_styles.link_icon_class_style"></span>

        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <div :class="class_styles.header_info_wrapper_class_style">
            <span
                v-html="getSVGIconValue('member_shield_svg_icon')"
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-900 p-3 text-white"
            ></span>

            <div>
                <h3 :class="class_styles.h3_class_style">
                    {{
                        state_refs.profile_record.value?.display_name ||
                        state_refs.profile_record.value?.name ||
                        content_obj.empty_value_text
                    }}
                </h3>

                <p :class="class_styles.p_class_style">
                    {{ content_obj.symbol_label_text }}
                    {{ state_refs.profile_record.value?.symbol || content_obj.empty_value_text }}
                </p>
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.role_information_title_text }}
                </h4>

                <ProfileValue
                    icon="identification_card_svg_icon"
                    :label="content_obj.role_id_label_text"
                    :value="state_refs.profile_record.value?.id || content_obj.empty_value_text"
                />

                <ProfileValue
                    icon="key_svg_icon"
                    :label="content_obj.symbol_label_text"
                    :value="state_refs.profile_record.value?.symbol || content_obj.empty_value_text"
                />

                <ProfileValue icon="member_shield_svg_icon" :label="content_obj.type_label_text" :value="role_type_text" />
            </div>

            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.status_title_text }}
                </h4>

                <StatusValue
                    :label="content_obj.system_role_label_text"
                    :active="!!state_refs.profile_record.value?.is_system_role"
                    :value="system_role_text"
                />

                <StatusValue
                    :label="content_obj.member_group_label_text"
                    :active="!!state_refs.profile_record.value?.is_member_group"
                    :value="member_group_text"
                />
            </div>
        </div>

        <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.timeline_title_text }}
                </h4>

                <ProfileValue icon="clock_svg_icon" :label="content_obj.created_label_text" :value="readable_created_at" />

                <ProfileValue icon="clock_svg_icon" :label="content_obj.updated_label_text" :value="readable_updated_at" />
            </div>

            <MemberSummary
                :title="content_obj.created_by_title_text"
                :member="state_refs.profile_record.value?.creator"
                :photo-url="created_by_member_profile_photo_url"
            />
        </div>

        <MemberSummary
            :title="content_obj.updated_by_title_text"
            :member="state_refs.profile_record.value?.updator"
            :photo-url="updated_by_member_profile_photo_url"
        />
    </div>
</template>

<script setup lang="ts">
import { defineComponent, h, PropType } from "vue";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { CreatorUpdatorMemberinterface, getMemberFullName } from "@/types/api_service_type";

import AccessControlProfileViewProps from "@/props_definition/access_control/profile_view_props";
import AccessControlProfileViewController from "@/controllers/access_control/profile_view_controller";

const props = defineProps(AccessControlProfileViewProps);
const controller = new AccessControlProfileViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, computed_refs } = component_definition;
const { class_styles, content_obj } = controller;
const {
    role_type_text,
    system_role_text,
    member_group_text,
    readable_created_at,
    readable_updated_at,
    created_by_member_profile_photo_url,
    updated_by_member_profile_photo_url
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
        active: { type: Boolean, required: true },
        value: { type: String, required: true }
    },
    setup(status_props) {
        return () =>
            h("p", { class: class_styles.small_bold_value_text_class_style }, [
                h("span", {
                    class: [class_styles.icon_class_style, status_props.active ? "text-green-500" : "text-gray-400"],
                    innerHTML: getSVGIconValue(status_props.active ? "check_circle_svg_icon" : "x_circile_svg_icon")
                }),
                h("span", { class: class_styles.small_bold_value_text_class_style }, status_props.label),
                h(
                    "span",
                    { class: ["font-semibold", status_props.active ? "text-green-500" : "text-gray-500"] },
                    status_props.value
                )
            ]);
    }
});

const MemberSummary = defineComponent({
    props: {
        title: { type: String, required: true },
        member: {
            type: Object as PropType<CreatorUpdatorMemberinterface | null | undefined>,
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
                              class: class_styles.member_avatar_img_class_style,
                              alt: getMemberFullName(member_props.member)
                          }),
                          h("div", [
                              h("h3", { class: class_styles.member_name_class_style }, getMemberFullName(member_props.member)),
                              h("p", { class: class_styles.description_class_style }, member_props.member.email)
                          ])
                      ])
                    : h("p", { class: class_styles.description_class_style }, content_obj.empty_value_text)
            ]);
    }
});
</script>
