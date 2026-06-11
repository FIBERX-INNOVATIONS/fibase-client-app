<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span
            :class="class_styles.link_icon_class_style"
            v-html="getSVGIconValue('loading_svg_icon')"
        ></span>

        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <TabsUI v-bind="tabs_props">
            <template #profile>
                <section class="space-y-5">
                    <div :class="class_styles.profile_header_class_style">
                        <ImageRenderUI
                            :id="record_id.toString()"
                            :src="profile_photo_url"
                            :alt_text="content_obj.member_photo_alt_text"
                            :class_styles="class_styles.image_info_class_style"
                        >
                            <h3 :class="class_styles.h3_class_style">
                                {{ member_full_name }}
                            </h3>

                            <p :class="class_styles.p_class_style">
                                {{ content_obj.username_label_text }}
                                {{
                                    state_refs.profile_record.value?.username ||
                                    content_obj.empty_value_text
                                }}
                            </p>

                            <p :class="class_styles.description_class_style">
                                {{ content_obj.email_label_text }}
                                {{
                                    state_refs.profile_record.value?.email ||
                                    content_obj.empty_value_text
                                }}
                            </p>
                        </ImageRenderUI>

                        <div :class="class_styles.profile_badge_wrapper_class_style">
                            <span
                                :class="
                                    state_refs.profile_record.value?.is_active
                                        ? class_styles.active_badge_class_style
                                        : class_styles.inactive_badge_class_style
                                "
                            >
                                {{
                                    state_refs.profile_record.value?.is_active
                                        ? content_obj.active_status_text
                                        : content_obj.inactive_status_text
                                }}
                            </span>

                            <span
                                v-if="state_refs.profile_record.value?.is_deleted"
                                :class="class_styles.deleted_badge_class_style"
                            >
                                {{ content_obj.deleted_status_text }}
                            </span>
                        </div>
                    </div>

                    <div
                        :class="
                            class_styles.grid_class_style
                                ?.two_col_responsive_grid_wrapper_class_style
                        "
                    >
                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.personal_information_title_text }}
                            </h4>

                            <ProfileValue
                                icon="identification_card_svg_icon"
                                :label="content_obj.public_id_label_text"
                                :value="
                                    state_refs.profile_record.value?.public_id ||
                                    content_obj.empty_value_text
                                "
                            />

                            <ProfileValue
                                icon="member_icon"
                                :label="content_obj.first_name_label_text"
                                :value="
                                    state_refs.profile_record.value?.first_name ||
                                    content_obj.empty_value_text
                                "
                            />

                            <ProfileValue
                                icon="member_icon"
                                :label="content_obj.last_name_label_text"
                                :value="
                                    state_refs.profile_record.value?.last_name ||
                                    content_obj.empty_value_text
                                "
                            />

                            <ProfileValue
                                icon="identification_card_svg_icon"
                                :label="content_obj.phone_label_text"
                                :value="
                                    state_refs.profile_record.value?.phone ||
                                    content_obj.empty_value_text
                                "
                            />

                            <ProfileValue
                                icon="members_svg_icon"
                                :label="content_obj.gender_label_text"
                                :value="
                                    state_refs.profile_record.value?.gender ||
                                    content_obj.empty_value_text
                                "
                            />

                            <ProfileValue
                                icon="clock_svg_icon"
                                :label="content_obj.dob_label_text"
                                :value="readable_dob"
                            />
                        </div>

                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.access_status_title_text }}
                            </h4>

                            <StatusValue
                                :label="content_obj.active_label_text"
                                :active="!!state_refs.profile_record.value?.is_active"
                                :true-text="content_obj.active_status_text"
                                :false-text="content_obj.inactive_status_text"
                            />

                            <StatusValue
                                :label="content_obj.verified_label_text"
                                :active="!!state_refs.profile_record.value?.is_verified"
                                :true-text="content_obj.verified_status_text"
                                :false-text="content_obj.unverified_status_text"
                            />

                            <StatusValue
                                :label="content_obj.two_factor_label_text"
                                :active="!!state_refs.profile_record.value?.is_2fa_enabled"
                                :true-text="content_obj.enabled_status_text"
                                :false-text="content_obj.disabled_status_text"
                            />

                            <StatusValue
                                :label="content_obj.locked_label_text"
                                :active="!!state_refs.profile_record.value?.is_locked"
                                :true-text="content_obj.locked_status_text"
                                :false-text="content_obj.unlocked_status_text"
                                active-is-danger
                            />

                            <StatusValue
                                :label="content_obj.deleted_label_text"
                                :active="!!state_refs.profile_record.value?.is_deleted"
                                :true-text="content_obj.deleted_status_text"
                                :false-text="content_obj.not_deleted_status_text"
                                active-is-danger
                            />
                        </div>
                    </div>

                    <div
                        :class="
                            class_styles.grid_class_style
                                ?.two_col_responsive_grid_wrapper_class_style
                        "
                    >
                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.auth_information_title_text }}
                            </h4>

                            <ProfileValue
                                icon="padlock_closed_svg_icon"
                                :label="content_obj.login_attempts_label_text"
                                :value="
                                    state_refs.profile_record.value?.member_auth?.login_attempts ??
                                    content_obj.empty_value_text
                                "
                            />

                            <ProfileValue
                                icon="clock_svg_icon"
                                :label="content_obj.account_locked_until_label_text"
                                :value="readable_account_locked_until"
                            />

                            <ProfileValue
                                icon="key_svg_icon"
                                :label="content_obj.password_changed_at_label_text"
                                :value="readable_password_changed_at"
                            />

                            <ProfileValue
                                icon="clock_svg_icon"
                                :label="content_obj.last_password_reset_request_at_label_text"
                                :value="readable_last_password_reset_request_at"
                            />
                        </div>

                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.timeline_title_text }}
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
                            {{ content_obj.roles_title_text }}
                        </h4>

                        <div
                            v-if="member_roles.length"
                            :class="class_styles.role_chip_wrapper_class_style"
                        >
                            <span
                                v-for="role in member_roles"
                                :key="role.id || role.symbol || role.name"
                                :class="class_styles.role_chip_class_style"
                            >
                                {{ role.display_name || role.name || role.symbol }}
                            </span>
                        </div>

                        <p v-else :class="class_styles.description_class_style">
                            {{ content_obj.no_roles_text }}
                        </p>
                    </div>
                </section>
            </template>

            <template #devices>
                <MemberDevicesView
                    :member_public_id="state_refs.profile_record.value?.public_id || record_id"
                    :class_styles="class_styles"
                />
            </template>
        </TabsUI>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, h, PropType } from "vue";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";
import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import TabsUI from "@ui/version_3/components/TabsUI.vue";
import TabsUIPropsBuilder from "@ui/version_3/props_builder/tabs_ui_props_builder";

import { ActorRoleInterface } from "@/types/api_service_type";

import MemberProfileProfileViewProps from "@/props_definition/member_profile/profile_view_props";
import MemberProfileProfileViewController from "@/controllers/member_profile/profile_view_controller";
import MemberDevicesView from "@/views/member_profile/MemberDevicesView.vue";

const props = defineProps(MemberProfileProfileViewProps);
const controller = new MemberProfileProfileViewController(props);
const component_definition = controller.getComponentDefinition();
const content_manager = ContentManagerUtil.getInstance();

const { record_id } = props;
const { state_refs, components, computed_refs } = component_definition;
const { ImageRenderUI } = components;
const { class_styles, content_obj } = controller;

const typed_computed_refs = computed_refs as typeof computed_refs & {
    profile_photo_url: string;
    member_full_name: string;
    readable_dob: string;
    readable_account_locked_until: string;
    readable_password_changed_at: string;
    readable_last_password_reset_request_at: string;
    member_roles: ActorRoleInterface[];
};

const {
    profile_photo_url,
    member_full_name,
    readable_dob,
    readable_created_at,
    readable_updated_at,
    readable_account_locked_until,
    readable_password_changed_at,
    readable_last_password_reset_request_at,
    member_roles
} = typed_computed_refs;

const tabs_content_key = "content_resource.member_profile_view_ui.profile_view_ui.tabs";
const getContent = (key: string, fallback: string): string =>
    content_manager.get<string>(key, fallback) ?? fallback;

const tabs_props = TabsUIPropsBuilder.getReactivePropsObject(
    "MemberProfileProfileTabs",
    [
        {
            tab_key: "profile",
            slot_name: "profile",
            label_text: getContent(`${tabs_content_key}.profile_tab.label_text`, "Profile"),
            tab_icon: getContent(`${tabs_content_key}.profile_tab.tab_icon`, "member_icon") as any
        },
        {
            tab_key: "devices",
            slot_name: "devices",
            label_text: getContent(`${tabs_content_key}.devices_tab.label_text`, "Devices"),
            tab_icon: getContent(
                `${tabs_content_key}.devices_tab.tab_icon`,
                "identification_card_svg_icon"
            ) as any
        }
    ],
    {
        data_props: {
            active_tab_key: "profile"
        },
        class_styles: class_styles.tabs_class_styles
    }
);

const ProfileValue = defineComponent({
    props: {
        icon: { type: String as PropType<SVGIconKey>, required: true },
        label: { type: String, required: true },
        value: { type: [String, Number], default: "" }
    },
    setup(value_props) {
        return () =>
            h("p", { class: class_styles.info_row_class_style }, [
                h("span", {
                    class: class_styles.icon_class_style,
                    innerHTML: getSVGIconValue(value_props.icon)
                }),
                h(
                    "span",
                    { class: class_styles.small_bold_key_text_class_style },
                    value_props.label
                ),
                h(
                    "span",
                    { class: class_styles.small_bold_value_text_class_style },
                    value_props.value
                )
            ]);
    }
});

const StatusValue = defineComponent({
    props: {
        label: { type: String, required: true },
        active: { type: Boolean, required: true },
        trueText: { type: String, required: true },
        falseText: { type: String, required: true },
        activeIsDanger: { type: Boolean, default: false }
    },
    setup(status_props) {
        return () => {
            const positive_class = status_props.activeIsDanger ? "text-red-500" : "text-green-500";
            const negative_class = status_props.activeIsDanger ? "text-green-500" : "text-red-500";

            return h("p", { class: class_styles.info_row_class_style }, [
                h("span", {
                    class: [
                        class_styles.icon_class_style,
                        status_props.active ? positive_class : negative_class
                    ],
                    innerHTML: getSVGIconValue(
                        status_props.active ? "check_circle_svg_icon" : "x_circile_svg_icon"
                    )
                }),
                h(
                    "span",
                    { class: class_styles.small_bold_key_text_class_style },
                    status_props.label
                ),
                h(
                    "span",
                    {
                        class: [
                            class_styles.small_bold_value_text_class_style,
                            status_props.active ? positive_class : negative_class
                        ]
                    },
                    status_props.active ? status_props.trueText : status_props.falseText
                )
            ]);
        };
    }
});
</script>
