<template>
    <template v-if="true">
        <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
            <span v-html="getSVGIconValue('loading_svg_icon')" :class="class_styles.link_icon_class_style"></span>

            {{ content_obj.loading_text }}
        </div>

        <div v-else :class="class_styles.wrapper_class_style">
            <!-- 🔹 App Header -->
            <div :class="class_styles.header_info_wrapper_class_style">
                <ImageRenderUI
                    :id="record_id.toString()"
                    :src="app_logo_url"
                    :alt_text="content_obj.app_logo_alt_text"
                    :class_styles="class_styles.image_info_class_style"
                >
                    <h3 :class="class_styles.h3_class_style">
                        {{ state_refs?.profile_record?.value?.name }}
                    </h3>
                    <p :class="class_styles.p_class_style">
                        {{ content_obj.prefix_label_text }}
                        {{ state_refs?.profile_record?.value?.prefix }}
                    </p>

                    <a
                        v-if="state_refs?.profile_record?.value?.base_url"
                        :href="state_refs?.profile_record?.value?.base_url"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        <span
                            v-html="getSVGIconValue('world_globe_svg_icon')"
                            :class="class_styles.link_icon_class_style"
                        ></span>
                        {{ state_refs?.profile_record?.value?.base_url }}
                    </a>

                    <p :class="class_styles.description_class_style">
                        {{ state_refs?.profile_record?.value?.description || content_obj.no_description_text }}
                    </p>
                </ImageRenderUI>
            </div>

            <!-- 🔹 Grid Sections -->
            <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                    <!-- App Information -->
                    <h4 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.app_information_title_text }}
                    </h4>

                    <!-- App Id -->
                    <p :class="class_styles.small_bold_value_text_class_style">
                        <span
                            v-html="getSVGIconValue('identification_card_svg_icon')"
                            :class="class_styles.icon_class_style"
                        ></span>

                        <span :class="class_styles.small_bold_value_text_class_style">
                            {{ content_obj.app_id_label_text }}
                        </span>
                        {{ state_refs?.profile_record?.value?.public_id?.toUpperCase() }}
                    </p>

                    <!-- App status -->
                    <p :class="class_styles.small_bold_value_text_class_style">
                        <span
                            v-html="
                                getSVGIconValue(
                                    state_refs?.profile_record?.value?.is_active
                                        ? 'check_circle_svg_icon'
                                        : 'x_circile_svg_icon'
                                )
                            "
                            :class="[
                                class_styles.icon_class_style,
                                state_refs?.profile_record?.value?.is_active ? 'text-green-400' : 'text-red-400'
                            ]"
                        ></span>

                        <span :class="class_styles.small_bold_value_text_class_style">
                            {{ content_obj.status_label_text }}
                        </span>
                        <span
                            :class="state_refs?.profile_record?.value?.is_active ? 'text-green-400' : 'text-red-400'"
                            class="font-semibold"
                        >
                            {{
                                state_refs?.profile_record?.value?.is_active
                                    ? content_obj.active_status_text
                                    : content_obj.inactive_status_text
                            }}
                        </span>
                    </p>

                    <!-- Created At -->
                    <p v-if="readable_created_at" :class="class_styles.small_bold_value_text_class_style">
                        <span v-html="getSVGIconValue('clock_svg_icon')" :class="class_styles.icon_class_style"></span>

                        <span :class="class_styles.small_bold_value_text_class_style">
                            {{ content_obj.created_label_text }}
                        </span>
                        {{ readable_created_at }}
                    </p>

                    <!-- Updated At -->
                    <p v-if="readable_updated_at" :class="class_styles.small_bold_value_text_class_style">
                        <span v-html="getSVGIconValue('clock_svg_icon')" :class="class_styles.icon_class_style"></span>

                        <span :class="class_styles.small_bold_value_text_class_style">
                            {{ content_obj.updated_label_text }}
                        </span>
                        {{ readable_updated_at }}
                    </p>
                </div>

                <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                    <h4 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.auth_details_title_text }}
                    </h4>

                    <!-- App Auth Key algorithm -->
                    <p :class="class_styles.small_bold_value_text_class_style">
                        <span v-html="getSVGIconValue('key_svg_icon')" :class="class_styles.icon_class_style"></span>

                        <span :class="class_styles.small_bold_value_text_class_style">
                            {{ content_obj.algorithm_label_text }}
                        </span>
                        {{
                            state_refs?.profile_record?.value?.auth?.key_algorithm?.toUpperCase() ||
                            content_obj.empty_value_text
                        }}
                    </p>

                    <!-- App Auth Key Version -->
                    <p :class="class_styles.small_bold_value_text_class_style">
                        <span v-html="getSVGIconValue('numbered_list_svg_icon')" :class="class_styles.icon_class_style"></span>

                        <span :class="class_styles.small_bold_value_text_class_style">
                            {{ content_obj.version_label_text }}
                        </span>
                        {{ state_refs?.profile_record?.value?.auth?.key_version || content_obj.empty_value_text }}
                    </p>

                    <!-- Key Rotated At -->
                    <p v-if="readable_last_key_rotated_at" :class="class_styles.small_bold_value_text_class_style">
                        <span v-html="getSVGIconValue('clock_svg_icon')" :class="class_styles.icon_class_style"></span>

                        <span :class="class_styles.small_bold_value_text_class_style">
                            {{ content_obj.last_rotated_label_text }}
                        </span>
                        {{ readable_last_key_rotated_at }}
                    </p>
                </div>
            </div>

            <!-- 🔹 Social Links -->
            <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                <!-- Social Links -->
                <h4 :class="class_styles.small_bold_underlined_text_class_style">
                    {{ content_obj.social_links_title_text }}
                </h4>

                <div class="flex flex-wrap gap-3">
                    <!-- Facebook Link -->
                    <a v-if="fb_social_link" :href="fb_social_link" target="_blank" :class="class_styles.link_class_style">
                        <img
                            src="https://storage.googleapis.com/apps_media/social_icons/facebook_icon.png"
                            :alt="content_obj.facebook_alt_text"
                            width="24"
                            height="24"
                        />
                    </a>

                    <!-- Twitter_social_link -->
                    <a
                        v-if="twitter_social_link"
                        :href="twitter_social_link"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        <img
                            src="https://storage.googleapis.com/apps_media/social_icons/twitter_icon.png"
                            :alt="content_obj.twitter_alt_text"
                            width="24"
                            height="24"
                        />
                    </a>

                    <!-- Telegram_social_link -->
                    <a
                        v-if="telegram_social_link"
                        :href="telegram_social_link"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        <img
                            src="https://storage.googleapis.com/apps_media/social_icons/telegram_icon.png"
                            :alt="content_obj.telegram_alt_text"
                            width="24"
                            height="24"
                        />
                    </a>

                    <!-- Linkedin_social_link -->
                    <a
                        v-if="linkedin_social_link"
                        :href="linkedin_social_link"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        <img
                            src="https://storage.googleapis.com/apps_media/social_icons/linkedin_icon.png"
                            :alt="content_obj.linkedin_alt_text"
                            width="24"
                            height="24"
                        />
                    </a>

                    <!-- Instagram_social_link -->
                    <a
                        v-if="instagram_social_link"
                        :href="instagram_social_link"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        <img
                            src="https://storage.googleapis.com/apps_media/social_icons/instagram_icon.png"
                            :alt="content_obj.instagram_alt_text"
                            width="24"
                            height="24"
                        />
                    </a>

                    <!-- whatsapp_social_link -->
                    <a
                        v-if="whatsapp_social_link"
                        :href="whatsapp_social_link"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        <img
                            src="https://storage.googleapis.com/apps_media/social_icons/whatsapp_icon.png"
                            :alt="content_obj.whatsapp_alt_text"
                            width="24"
                            height="24"
                        />
                    </a>

                    <!-- youtube_social_link -->
                    <a
                        v-if="youtube_social_link"
                        :href="youtube_social_link"
                        target="_blank"
                        :class="class_styles.link_class_style"
                    >
                        <img
                            src="https://storage.googleapis.com/apps_media/social_icons/youtube_icon.png"
                            :alt="content_obj.youtube_alt_text"
                            width="24"
                            height="24"
                        />
                    </a>
                </div>
            </div>

            <!-- Creator and Updator -->
            <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                <!-- Creator -->
                <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                    <h4 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.created_by_title }}
                    </h4>

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
                    <h4 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.updated_by_title }}
                    </h4>

                    <div v-if="state_refs?.profile_record?.value?.updator" class="flex items-center gap-3">
                        <img :src="updator_member_profile_photo_url" :class="class_styles?.member_avatar_img_class_style" />

                        <div>
                            <h3 :class="class_styles.member_name_class_style">
                                {{ getMemberFullName(state_refs?.profile_record?.value?.updator) }}
                            </h3>
                            <p :class="class_styles.description_class_style">
                                {{ state_refs?.profile_record?.value?.updator.email }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 🔹 Roles  and 🔹 URLs  -->
            <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                <!-- 🔹 Roles -->
                <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                    <h4 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.roles_title }}
                    </h4>

                    <div
                        v-if="state_refs?.profile_record?.value?.roles?.length"
                        :class="class_styles.role_chip_wrapper_class_style"
                    >
                        <span
                            v-for="role in state_refs?.profile_record?.value?.roles"
                            :key="role.id"
                            :class="class_styles.role_chip_class_style"
                        >
                            {{ role.name }}
                        </span>
                    </div>
                </div>

                <!-- 🔹 URLs -->
                <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                    <h4 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.additional_urls_title }}
                    </h4>

                    <div v-if="state_refs?.profile_record?.value?.urls?.length" class="space-y-1">
                        <a
                            v-for="url in state_refs?.profile_record?.value?.urls"
                            :key="url"
                            :href="url"
                            target="_blank"
                            :class="class_styles.link_class_style"
                        >
                            <span
                                v-html="getSVGIconValue('world_globe_svg_icon')"
                                :class="class_styles.link_icon_class_style"
                            ></span>
                            {{ url }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";
import { getMemberFullName } from "@/types/api_service_type";
import RegisteredAppProfileViewProps from "@/props_definition/registered_app/profile_view_props";
import RegisteredAppProfileViewController from "@/controllers/registered_app/profile_view_controller";

const props = defineProps(RegisteredAppProfileViewProps);
const controller = new RegisteredAppProfileViewController(props);
const component_definition = controller.getComponentDefinition();

const { record_id } = props;

const { state_refs, components, computed_refs } = component_definition;

const { ImageRenderUI } = components;

const { class_styles, content_obj } = controller;

const {
    app_logo_url,
    creator_member_profile_photo_url,
    updator_member_profile_photo_url,
    readable_created_at,
    readable_updated_at,
    readable_last_key_rotated_at,
    fb_social_link,
    instagram_social_link,
    twitter_social_link,
    email_social_link,
    telegram_social_link,
    linkedin_social_link,
    youtube_social_link,
    whatsapp_social_link
} = computed_refs;
</script>
