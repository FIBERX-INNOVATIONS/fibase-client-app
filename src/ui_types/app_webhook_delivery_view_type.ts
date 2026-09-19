import type { AppWebhookDeliveryStatusType } from "@/types/app_webhook_delivery_type";
import type { ProfileViewClassStylesInterface } from "@/ui_types/profile_view_type";

import type { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import type { FormViewPropsInterface, FormViewStateDataInterface } from "@/ui_types/form_view_type";

import type { AppWebhookDeliveryRecordInterface } from "@/types/app_webhook_delivery_type";
import type { ProfileViewComputedDataInterface, ProfileViewPropsInterface } from "@/ui_types/profile_view_type";
import type { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

export interface AppWebhookDeliveryProfilePropsInterface extends ProfileViewPropsInterface<AppWebhookDeliveryRecordInterface> {}
export interface AppWebhookDeliveryReplayPropsInterface extends DeleteViewPropsInterface<AppWebhookDeliveryRecordInterface> {}

export interface AppWebhookDeliveryProfileSectionInterface {
    key: string;
    title: string;
    items: { key: string; label: string; value: string }[];
}

export interface AppWebhookDeliveryProfileComputedInterface extends ProfileViewComputedDataInterface {
    sections: AppWebhookDeliveryProfileSectionInterface[];
    metrics: { key: string; label: string; value: string }[];
    event_title: string;
    delivery_id: string;
    endpoint_url: string;
    status_text: string;
    status_class: string;
    last_error: string;
    has_error: boolean;
}

export interface AppWebhookDeliveryProfileSectionConfigInterface {
    key: string;
    fields: (keyof AppWebhookDeliveryRecordInterface)[];
}

export type AppWebhookDeliveryTestFieldsType = {
    app_id_input_group_props: InputGroupUIPropsInterface;
};

export interface AppWebhookDeliveryTestFormPropsInterface extends FormViewPropsInterface<AppWebhookDeliveryRecordInterface> {}

export type AppWebhookDeliveryTestFormStateInterface = FormViewStateDataInterface<AppWebhookDeliveryTestFieldsType>;

export interface AppWebhookDeliveryProfileClassStylesInterface extends ProfileViewClassStylesInterface {
    hero_class_style: string;
    hero_top_class_style: string;
    hero_eyebrow_class_style: string;
    hero_title_class_style: string;
    hero_id_class_style: string;
    badge_class_style: string;
    status_class_styles: Record<AppWebhookDeliveryStatusType, string>;
    destination_class_style: string;
    destination_label_class_style: string;
    endpoint_class_style: string;
    metrics_class_style: string;
    metric_class_style: string;
    metric_label_class_style: string;
    metric_value_class_style: string;
    panels_class_style: string;
    panel_class_style: string;
    panel_title_class_style: string;
    row_class_style: string;
    row_label_class_style: string;
    row_value_class_style: string;
    error_panel_class_style: string;
    healthy_panel_class_style: string;
    error_title_class_style: string;
    error_value_class_style: string;
}
