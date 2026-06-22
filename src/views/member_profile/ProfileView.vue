<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span :class="class_styles.link_icon_class_style" v-html="loading_icon_html"></span>

        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <TabsUI v-bind="tabs_props">
            <template #profile>
                <section :class="class_styles.section_stack_class_style">
                    <div :class="class_styles.profile_header_class_style">
                        <ImageRenderUI v-bind="profile_image_props">
                            <h3 :class="class_styles.h3_class_style">
                                {{ member_full_name }}
                            </h3>

                            <p :class="class_styles.p_class_style">
                                {{ display_username }}
                            </p>

                            <p :class="class_styles.description_class_style">
                                {{ display_email }}
                            </p>
                        </ImageRenderUI>

                        <div :class="class_styles.profile_badge_wrapper_class_style">
                            <span :class="profile_status_badge_class">
                                {{ profile_status_text }}
                            </span>

                            <span v-if="profile_is_deleted" :class="class_styles.deleted_badge_class_style">
                                {{ content_obj.deleted_status_text }}
                            </span>
                        </div>
                    </div>

                    <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.personal_information_title_text }}
                            </h4>

                            <ProfileValue v-for="item in personal_information_items" :key="item.label" v-bind="item" />
                        </div>

                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.access_status_title_text }}
                            </h4>

                            <StatusValue v-for="item in access_status_items" :key="item.label" v-bind="item" />
                        </div>
                    </div>

                    <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.auth_information_title_text }}
                            </h4>

                            <ProfileValue v-for="item in auth_information_items" :key="item.label" v-bind="item" />
                        </div>

                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.timeline_title_text }}
                            </h4>

                            <ProfileValue v-for="item in timeline_items" :key="item.label" v-bind="item" />
                        </div>
                    </div>

                    <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                        <h4 :class="class_styles.small_bold_underlined_text_class_style">
                            {{ content_obj.roles_title_text }}
                        </h4>

                        <div v-if="member_role_items.length" :class="class_styles.role_chip_wrapper_class_style">
                            <span v-for="role in member_role_items" :key="role.key" :class="class_styles.role_chip_class_style">
                                {{ role.label }}
                            </span>
                        </div>

                        <p v-else :class="class_styles.description_class_style">
                            {{ content_obj.no_roles_text }}
                        </p>
                    </div>
                </section>
            </template>

            <template #devices>
                <MemberDevicesView v-bind="member_devices_props" />
            </template>
        </TabsUI>
    </div>
</template>

<script setup lang="ts">
import MemberProfileProfileViewProps from "@/props_definition/member_profile/profile_view_props";
import MemberProfileProfileViewController from "@/controllers/member_profile/profile_view_controller";

const props = defineProps(MemberProfileProfileViewProps);
const controller = new MemberProfileProfileViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, components, computed_refs } = component_definition as any;
const { class_styles, content_obj } = controller;

const { ImageRenderUI, TabsUI, MemberDevicesView, ProfileValue, StatusValue } = components;

const { tabs_props } = state_refs;

const {
    loading_icon_html,
    profile_image_props,
    member_full_name,
    display_username,
    display_email,
    profile_status_badge_class,
    profile_status_text,
    profile_is_deleted,
    personal_information_items,
    access_status_items,
    auth_information_items,
    timeline_items,
    member_role_items,
    member_devices_props
} = computed_refs;
</script>
