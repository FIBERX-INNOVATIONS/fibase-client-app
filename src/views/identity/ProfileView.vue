<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span :class="class_styles.link_icon_class_style" v-html="loading_icon_html"></span>
        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <TabsUI v-bind="tabs_props">
            <template #profile>
                <section class="space-y-5">
                    <div :class="class_styles.profile_header_class_style">
                        <ImageRenderUI v-bind="profile_image_props">
                            <h3 :class="class_styles.h3_class_style">
                                {{ identity_display_name }}
                            </h3>
                            <p :class="class_styles.p_class_style">
                                {{ identity_public_id_text }}
                            </p>
                            <p :class="class_styles.description_class_style">
                                {{ identity_type_text }}
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
                                {{ content_obj.identity_title_text }}
                            </h4>
                            <ProfileValue v-for="item in identity_information_items" :key="item.label" v-bind="item" />
                        </div>

                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.access_title_text }}
                            </h4>
                            <StatusValue v-for="item in access_status_items" :key="item.label" v-bind="item" />
                        </div>
                    </div>

                    <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.profile_title_text }}
                            </h4>
                            <ProfileValue v-for="item in profile_information_items" :key="item.label" v-bind="item" />
                        </div>

                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.source_app_title_text }}
                            </h4>
                            <ProfileValue v-for="item in source_app_items" :key="item.label" v-bind="item" />
                        </div>
                    </div>

                    <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.wallet_summary_title_text }}
                            </h4>
                            <ProfileValue v-for="item in wallet_summary_items" :key="item.label" v-bind="item" />
                        </div>

                        <div :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.timeline_title_text }}
                            </h4>
                            <ProfileValue v-for="item in timeline_items" :key="item.label" v-bind="item" />
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 :class="class_styles.small_bold_underlined_text_class_style">
                            {{ content_obj.contacts_title_text }}
                        </h4>
                        <div v-if="contact_items.length" :class="class_styles.association_grid_class_style">
                            <article
                                v-for="contact in contact_items"
                                :key="contact.key"
                                :class="class_styles.association_card_class_style"
                            >
                                <div :class="class_styles.association_card_header_class_style">
                                    <div>
                                        <h5 :class="class_styles.association_card_title_class_style">
                                            {{ contact.title }}
                                        </h5>
                                        <p :class="class_styles.association_card_subtitle_class_style">
                                            {{ contact.subtitle }}
                                        </p>
                                    </div>
                                    <span
                                        :class="
                                            contact.is_active
                                                ? class_styles.active_badge_class_style
                                                : class_styles.inactive_badge_class_style
                                        "
                                    >
                                        {{ contact.status }}
                                    </span>
                                </div>
                                <div :class="class_styles.association_card_body_class_style">
                                    <p v-for="detail in contact.details" :key="detail">
                                        {{ detail }}
                                    </p>
                                </div>
                            </article>
                        </div>
                        <p v-else :class="class_styles.empty_state_class_style">
                            {{ content_obj.no_contacts_text }}
                        </p>
                    </div>

                    <div class="space-y-3">
                        <h4 :class="class_styles.small_bold_underlined_text_class_style">
                            {{ content_obj.app_accounts_title_text }}
                        </h4>
                        <div v-if="app_account_items.length" :class="class_styles.association_grid_class_style">
                            <article
                                v-for="account in app_account_items"
                                :key="account.key"
                                :class="class_styles.association_card_class_style"
                            >
                                <div :class="class_styles.association_card_header_class_style">
                                    <div>
                                        <h5 :class="class_styles.association_card_title_class_style">
                                            {{ account.title }}
                                        </h5>
                                        <p :class="class_styles.association_card_subtitle_class_style">
                                            {{ account.subtitle }}
                                        </p>
                                    </div>
                                    <span
                                        :class="
                                            account.is_active
                                                ? class_styles.active_badge_class_style
                                                : class_styles.inactive_badge_class_style
                                        "
                                    >
                                        {{ account.status }}
                                    </span>
                                </div>
                                <div :class="class_styles.association_card_body_class_style">
                                    <p v-for="detail in account.details" :key="detail">
                                        {{ detail }}
                                    </p>
                                </div>
                            </article>
                        </div>
                        <p v-else :class="class_styles.empty_state_class_style">
                            {{ content_obj.no_app_accounts_text }}
                        </p>
                    </div>
                </section>
            </template>
        </TabsUI>
    </div>
</template>

<script setup lang="ts">
import IdentityProfileViewProps from "@/props_definition/identity/profile_view_props";

import IdentityProfileViewController from "@/controllers/identity/profile_view_controller";

const props = defineProps(IdentityProfileViewProps);

const controller = new IdentityProfileViewController(props);

const { state_refs, components, computed_refs } = controller.getComponentDefinition();

const { class_styles, content_obj } = controller;

const { ImageRenderUI, TabsUI, ProfileValue, StatusValue } = components;

const { tabs_props } = state_refs;

const {
    loading_icon_html,
    profile_image_props,
    identity_display_name,
    identity_public_id_text,
    identity_type_text,
    profile_status_text,
    profile_status_badge_class,
    profile_is_deleted,
    identity_information_items,
    access_status_items,
    profile_information_items,
    source_app_items,
    wallet_summary_items,
    timeline_items,
    contact_items,
    app_account_items
} = computed_refs;
</script>
