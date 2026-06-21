<template>
    <section id="IdentityWalletProfileView" class="w-full">
        <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
            <span class="h-6 w-6" v-html="loading_icon_html"></span>
            {{ content_obj.loading_text }}
        </div>

        <div v-else :class="class_styles.wrapper_class_style">
            <header :class="class_styles.profile_header_class_style">
                <div class="min-w-0 space-y-2">
                    <p class="text-xs font-black uppercase tracking-wider text-gray-500">
                        {{ content_obj.wallet_breadcrumb_text }}
                    </p>
                    <h2 class="break-all text-xl font-black text-gray-900">
                        {{ wallet_title }}
                    </h2>
                    <p :class="class_styles.p_class_style">
                        {{ wallet_subtitle }}
                    </p>
                </div>

                <div :class="class_styles.profile_badge_wrapper_class_style">
                    <span :class="wallet_status_badge_class">
                        {{ wallet_status_text }}
                    </span>
                    <span v-if="wallet_is_deleted" :class="class_styles.deleted_badge_class_style">
                        {{ content_obj.deleted_status_text }}
                    </span>
                </div>
            </header>

            <div :class="class_styles.association_grid_class_style">
                <article :class="class_styles.association_card_class_style">
                    <h3 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.information_title_text }}
                    </h3>
                    <ProfileValue v-for="item in information_items" :key="item.label" v-bind="item" />
                </article>

                <article :class="class_styles.association_card_class_style">
                    <h3 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.balance_title_text }}
                    </h3>
                    <ProfileValue v-for="item in balance_items" :key="item.label" v-bind="item" />
                </article>

                <article :class="class_styles.association_card_class_style">
                    <h3 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.totals_title_text }}
                    </h3>
                    <ProfileValue v-for="item in total_items" :key="item.label" v-bind="item" />
                </article>

                <article :class="class_styles.association_card_class_style">
                    <h3 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.currency_title_text }}
                    </h3>
                    <ProfileValue v-for="item in currency_items" :key="item.label" v-bind="item" />
                </article>

                <article :class="class_styles.association_card_class_style">
                    <h3 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.owner_title_text }}
                    </h3>
                    <ProfileValue v-for="item in owner_items" :key="item.label" v-bind="item" />
                </article>

                <article :class="class_styles.association_card_class_style">
                    <h3 :class="class_styles.small_bold_underlined_text_class_style">
                        {{ content_obj.timeline_title_text }}
                    </h3>
                    <ProfileValue v-for="item in timeline_items" :key="item.label" v-bind="item" />
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import IdentityWalletProfileViewProps from "@/props_definition/identity_wallet/profile_view_props";

import IdentityWalletProfileViewController from "@/controllers/identity_wallet/profile_view_controller";

const props = defineProps(IdentityWalletProfileViewProps);
const controller = new IdentityWalletProfileViewController(props);
const { state_refs, components, computed_refs } = controller.getComponentDefinition();

const { class_styles, content_obj } = controller;
const { ProfileValue } = components;
const {
    loading_icon_html,
    wallet_title,
    wallet_subtitle,
    wallet_status_text,
    wallet_status_badge_class,
    wallet_is_deleted,
    information_items,
    balance_items,
    total_items,
    currency_items,
    owner_items,
    timeline_items
} = computed_refs;
</script>
