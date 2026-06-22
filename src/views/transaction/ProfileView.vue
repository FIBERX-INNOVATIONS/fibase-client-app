<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style">
        <span :class="class_styles.link_icon_class_style" v-html="loading_icon_html"></span>
        {{ content_obj.loading_text }}
    </div>

    <div v-else :class="class_styles.wrapper_class_style">
        <TabsUI v-bind="tabs_props">
            <template #profile>
                <section :class="class_styles.section_stack_class_style">
                    <header :class="class_styles.profile_header_class_style">
                        <div :class="class_styles.header_content_class_style">
                            <span
                                :class="class_styles.header_icon_tile_class_style"
                                v-html="getSVGIconValue('dollar_currency_svg_icon')"
                            ></span>
                            <div :class="class_styles.header_text_wrapper_class_style">
                                <h3 :class="[class_styles.h3_class_style, class_styles.header_title_class_style]">
                                    {{ transaction_title }}
                                </h3>
                                <p :class="class_styles.p_class_style">
                                    {{ transaction_subtitle }}
                                </p>
                            </div>
                        </div>
                        <span :class="status_badge_class">
                            {{ status_text }}
                        </span>
                    </header>

                    <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                        <ProfileSection :title="content_obj.amounts_title_text" :items="amount_items" />
                        <ProfileSection :title="content_obj.references_title_text" :items="reference_items" />
                    </div>

                    <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                        <ProfileSection :title="content_obj.parties_title_text" :items="party_items" />
                        <ProfileSection :title="content_obj.processing_title_text" :items="processing_items" />
                    </div>

                    <div :class="class_styles.grid_class_style?.two_col_responsive_grid_wrapper_class_style">
                        <section :class="class_styles.grid_class_style?.grid_wrapper_class_style">
                            <h4 :class="class_styles.small_bold_underlined_text_class_style">
                                {{ content_obj.description_title_text }}
                            </h4>
                            <div :class="class_styles.details_wrapper_class_style">
                                <div>
                                    <strong :class="class_styles.details_label_class_style">
                                        {{ content_obj.description_label_text }}
                                    </strong>
                                    <p :class="class_styles.details_value_class_style">
                                        {{ state_refs.profile_record.value?.description || content_obj.empty_value_text }}
                                    </p>
                                </div>
                                <div>
                                    <strong :class="class_styles.details_label_class_style">
                                        {{ content_obj.reason_label_text }}
                                    </strong>
                                    <p :class="class_styles.details_value_class_style">
                                        {{ state_refs.profile_record.value?.reason || content_obj.empty_value_text }}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <ProfileSection :title="content_obj.relationship_title_text" :items="relationship_items" />
                    </div>

                    <ProfileSection :title="content_obj.timeline_title_text" :items="timeline_items" />
                </section>
            </template>

            <template #receipts>
                <ReceiptView :transaction_id="props.record_id" />
            </template>
        </TabsUI>
    </div>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import TransactionProfileViewProps from "@/props_definition/transaction/profile_view_props";

import TransactionProfileViewController from "@/controllers/transaction/profile_view_controller";

import ReceiptView from "@/views/transaction/ReceiptView.vue";

const props = defineProps(TransactionProfileViewProps);

const controller = new TransactionProfileViewController(props);

const { state_refs, components, computed_refs } = controller.getComponentDefinition();

const { class_styles, content_obj } = controller;

const { TabsUI, ProfileSection } = components;

const { tabs_props } = state_refs;

const {
    loading_icon_html,
    transaction_title,
    transaction_subtitle,
    status_text,
    status_badge_class,
    amount_items,
    reference_items,
    party_items,
    processing_items,
    relationship_items,
    timeline_items
} = computed_refs;
</script>
