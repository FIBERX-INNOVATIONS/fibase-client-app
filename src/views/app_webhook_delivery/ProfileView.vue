<template>
    <div v-if="state_refs.is_loading.value" :class="class_styles.loading_wrapper_class_style" role="status">
        {{ content_obj.loading_text }}
    </div>
    <div v-else :class="class_styles.wrapper_class_style">
        <header :class="class_styles.hero_class_style">
            <div :class="class_styles.hero_top_class_style">
                <div>
                    <p :class="class_styles.hero_eyebrow_class_style">{{ content_obj.delivery_label_text }}</p>
                    <h3 :class="class_styles.hero_title_class_style">{{ event_title }}</h3>
                    <p :class="class_styles.hero_id_class_style">{{ delivery_id }}</p>
                </div>
                <span :class="[class_styles.badge_class_style, status_class]">{{ status_text }}</span>
            </div>
            <div :class="class_styles.destination_class_style">
                <p :class="class_styles.destination_label_class_style">{{ content_obj.endpoint_label_text }}</p>
                <code :class="class_styles.endpoint_class_style">{{ endpoint_url }}</code>
            </div>
        </header>

        <dl :class="class_styles.metrics_class_style">
            <div v-for="metric in metrics" :key="metric.key" :class="class_styles.metric_class_style">
                <dt :class="class_styles.metric_label_class_style">{{ metric.label }}</dt>
                <dd :class="class_styles.metric_value_class_style">{{ metric.value }}</dd>
            </div>
        </dl>

        <div :class="class_styles.panels_class_style">
            <section v-for="section in sections" :key="section.key" :class="class_styles.panel_class_style">
                <h4 :class="class_styles.panel_title_class_style">{{ section.title }}</h4>
                <dl>
                    <div v-for="item in section.items" :key="item.key" :class="class_styles.row_class_style">
                        <dt :class="class_styles.row_label_class_style">{{ item.label }}</dt>
                        <dd :class="class_styles.row_value_class_style">{{ item.value }}</dd>
                    </div>
                </dl>
            </section>
        </div>

        <section :class="has_error ? class_styles.error_panel_class_style : class_styles.healthy_panel_class_style">
            <h4 :class="class_styles.error_title_class_style">{{ content_obj.last_error_label_text }}</h4>
            <p :class="class_styles.error_value_class_style">{{ has_error ? last_error : content_obj.no_error_text }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { AppWebhookDeliveryProfilePropsInterface } from "@/ui_types/app_webhook_delivery_view_type";

import AppWebhookDeliveryProfileViewController from "@/controllers/app_webhook_delivery/profile_view_controller";

const props = defineProps<AppWebhookDeliveryProfilePropsInterface>();

const controller = new AppWebhookDeliveryProfileViewController(props);

const { state_refs, computed_refs } = controller.getComponentDefinition();

const { class_styles, content_obj } = controller;

const { sections, metrics, event_title, delivery_id, endpoint_url, status_text, status_class, last_error, has_error } =
    computed_refs;
</script>
