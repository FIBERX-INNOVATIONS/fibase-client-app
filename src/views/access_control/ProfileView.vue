<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span v-html="getSVGIconValue('loading_svg_icon')" :class="class_styles.link_icon_class_style"></span>

        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <div :class="class_styles.header_info_wrapper_class_style">
            <span v-html="getSVGIconValue('member_shield_svg_icon')" :class="class_styles.header_icon_tile_class_style"></span>

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
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import AccessControlProfileViewProps from "@/props_definition/access_control/profile_view_props";

import AccessControlProfileViewController from "@/controllers/access_control/profile_view_controller";

const props = defineProps(AccessControlProfileViewProps);

const controller = new AccessControlProfileViewController(props);

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { ProfileValue, StatusValue, MemberSummary } = components;

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
</script>
