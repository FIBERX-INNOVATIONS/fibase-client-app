import { AppWebhookDeliveryStatusEnum } from "@/configs/app_webhook_delivery_config";
import type { AppWebhookDeliveryProfileClassStylesInterface } from "@/ui_types/app_webhook_delivery_view_type";
import ProfileViewClassStyles from "@/class_styles/profile_view_class_styles";

const AppWebhookDeliveryProfileViewClassStyles: AppWebhookDeliveryProfileClassStylesInterface = {
    ...ProfileViewClassStyles,
    wrapper_class_style: "w-full max-h-[75vh] overflow-y-auto space-y-5 bg-slate-50 p-4 md:p-6",
    hero_class_style: "rounded-2xl bg-slate-900 p-5 text-white shadow-sm md:p-6",
    hero_top_class_style: "flex flex-wrap items-start justify-between gap-3",
    hero_eyebrow_class_style: "text-xs font-semibold uppercase tracking-widest text-slate-400",
    hero_title_class_style: "mt-2 break-words text-xl font-semibold tracking-tight md:text-2xl",
    hero_id_class_style: "mt-2 break-all font-mono text-xs leading-5 text-slate-400",
    badge_class_style: "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
    status_class_styles: {
        [AppWebhookDeliveryStatusEnum.QUEUED]: "bg-slate-100 text-slate-700 ring-slate-300",
        [AppWebhookDeliveryStatusEnum.DELIVERING]: "bg-blue-50 text-blue-700 ring-blue-200",
        [AppWebhookDeliveryStatusEnum.DELIVERED]: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        [AppWebhookDeliveryStatusEnum.RETRYING]: "bg-amber-50 text-amber-800 ring-amber-200",
        [AppWebhookDeliveryStatusEnum.FAILED]: "bg-red-50 text-red-700 ring-red-200",
        [AppWebhookDeliveryStatusEnum.DEAD_LETTER]: "bg-rose-50 text-rose-800 ring-rose-200"
    },
    destination_class_style: "mt-5 border-t border-slate-700 pt-4",
    destination_label_class_style: "mb-2 text-xs font-medium text-slate-300",
    endpoint_class_style: "block break-all rounded-lg bg-slate-800 px-3 py-3 font-mono text-xs leading-6 text-slate-100",
    metrics_class_style: "grid grid-cols-1 gap-3 sm:grid-cols-3",
    metric_class_style: "min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
    metric_label_class_style: "text-xs font-medium text-slate-500",
    metric_value_class_style: "mt-2 break-words text-xl font-semibold text-slate-900",
    panels_class_style: "grid grid-cols-1 gap-4 md:grid-cols-2",
    panel_class_style: "min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
    panel_title_class_style: "mb-3 border-b border-slate-100 pb-3 text-sm font-semibold text-slate-900",
    row_class_style: "space-y-1 border-b border-slate-100 py-3 last:border-0",
    row_label_class_style: "text-xs font-medium text-slate-500",
    row_value_class_style: "break-words text-sm leading-6 text-slate-800",
    error_panel_class_style: "rounded-xl border border-red-200 bg-red-50 p-4 text-red-900",
    healthy_panel_class_style: "rounded-xl border border-slate-200 bg-white p-4 text-slate-600",
    error_title_class_style: "text-sm font-semibold",
    error_value_class_style: "mt-2 whitespace-pre-wrap break-words font-mono text-xs leading-6"
};

export default AppWebhookDeliveryProfileViewClassStyles;
