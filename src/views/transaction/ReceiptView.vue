<template>
    <section :class="class_styles.wrapper_class_style">
        <label :class="class_styles.search_wrapper_class_style">
            <span :class="class_styles.search_icon_class_style" v-html="getSVGIconValue('search_svg_icon')"></span>
            <input
                v-model="search_query"
                type="search"
                :placeholder="content_obj.search_placeholder_text"
                :class="class_styles.search_input_class_style"
                @keyup.enter="action_handler.handleSearchEnter"
            />
        </label>

        <div v-if="!can_view_receipts" :class="class_styles.permission_state_class_style">
            {{ content_obj.permission_denied_text }}
        </div>

        <div v-else-if="is_loading" :class="class_styles.loading_wrapper_class_style">
            <span :class="class_styles.loading_icon_class_style" v-html="getSVGIconValue('loading_svg_icon')"></span>
            {{ content_obj.loading_text }}
        </div>

        <div v-else-if="!receipts.length" :class="class_styles.empty_state_class_style">
            {{ content_obj.empty_state_text }}
        </div>

        <div v-else :class="class_styles.cards_grid_class_style">
            <ContentCardUI
                v-for="receipt in receipts"
                :key="receipt.public_id"
                v-bind="controller.getReceiptCardProps(receipt)"
            />
        </div>

        <div v-if="total_items" :class="class_styles.pagination_wrapper_class_style">
            <p :class="class_styles.pagination_text_class_style">
                {{ pagination_result_text }}
            </p>
            <PaginationUI v-if="total_pages > 1" v-bind="pagination_props" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import TransactionReceiptViewProps from "@/props_definition/transaction/receipt_view_props";

import TransactionReceiptViewController from "@/controllers/transaction/receipt_view_controller";

const props = defineProps(TransactionReceiptViewProps);

const controller = new TransactionReceiptViewController(props);

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { ContentCardUI, PaginationUI } = components;

const { action_handler } = controller;

const { class_styles } = controller;

const { receipts, search_query, is_loading, content_obj, pagination_props, total_pages, total_items } = state_refs;

const { pagination_result_text, can_view_receipts } = computed_refs;
</script>
