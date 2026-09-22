import type { BreadcrumbUIClassStylesInterface } from "@ui/version_3/ui_types/breadcrumb_ui_type";
import ListViewClassStyles from "@/class_styles/list_view_class_styles";
import type { DataTableUIClassStylesInterface } from "@ui/version_3/ui_types/data_table_ui_type";
import type { DataTableCellComponentUIClassStylesInterface } from "@ui/version_3/ui_types/data_table_cell_component_ui_type";
import type { PaginationUIClassStylesInterface } from "@ui/version_3/ui_types/pagination_ui_type";
import type { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";
import type { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";
import InputUIClassStyles from "@/class_styles/input_ui_class_styles";
import ButtonUIClassStyles from "@/class_styles/button_ui_class_styles";

const breadcrumb_styles = ListViewClassStyles.list_view_breadcrumb_class_styles;
const currency_input: InputUIClassStylesInterface = {
    ...InputUIClassStyles,
    wrapper_class_style: "relative min-w-0 w-full max-w-56",
    input_class_style:
        "w-full min-w-0 truncate cursor-pointer rounded-lg border border-white/20 bg-slate-800 pl-3 pr-8 py-2 text-xs font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
};
const action_button: ButtonUIClassStylesInterface = {
    ...ButtonUIClassStyles,
    wrapper_class_style: "min-w-0 flex-1 sm:flex-none",
    button_class_style:
        "cursor-pointer inline-flex h-10 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 disabled:cursor-not-allowed",
    disabled_class_style: "opacity-60",
    icon_class_style: "inline-flex h-4 w-4 min-w-4 shrink-0 items-center justify-center overflow-hidden [&>svg]:h-4 [&>svg]:w-4",
    content_class_style: "inline-flex items-center justify-center gap-2",
    text_class_style: "inline-flex items-center justify-center gap-2"
};
const retry_button: ButtonUIClassStylesInterface = {
    ...action_button,
    wrapper_class_style: "inline-flex",
    button_class_style:
        "inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-teal-500"
};
const table_styles: DataTableUIClassStylesInterface = {
    ...ListViewClassStyles.table_class_styles,
    wrapper_class_style: "w-full overflow-x-auto",
    table_class_style: "w-full min-w-[680px] border-collapse text-left text-sm",
    thead_class_style: "border-b border-slate-100 bg-slate-50/60",
    th_class_style: "px-4 py-4 text-xs font-medium uppercase tracking-wide text-slate-500",
    th_cell_wrapper_class_style: "flex items-center gap-2",
    tr_class_style: "border-b border-slate-100 last:border-0 hover:bg-slate-50/60",
    td_class_style: "px-4 py-5 align-middle"
};
const cell_styles: DataTableCellComponentUIClassStylesInterface = {
    ...ListViewClassStyles.table_cell_components_class_styles,
    wrapper_class_style: "text-left",
    text_content_class_style: { text_class_style: "text-sm font-medium text-slate-700" }
};
const pagination_styles: PaginationUIClassStylesInterface = {
    ...ListViewClassStyles.table_pagination_ui_class_styles,
    wrapper_class_style: "flex flex-wrap items-center gap-1",
    btn_icon_class_style: "inline-flex h-3 w-3 shrink-0 items-center justify-center overflow-hidden [&>svg]:h-3 [&>svg]:w-3",
    button_class_style:
        "flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg px-2 text-xs font-medium hover:bg-teal-50 focus-visible:ring-2 focus-visible:ring-teal-500",
    active_page_class_style: "bg-slate-900 text-white",
    disabled_class_style: "opacity-40 cursor-not-allowed"
};
const MyWalletViewClassStyles = {
    wrapper: "mx-auto w-full max-w-6xl space-y-6 px-4 py-5 sm:px-6 lg:py-7",
    heading: "text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl",
    subtitle: "mt-1.5 max-w-2xl text-sm leading-6 text-slate-500",
    overview:
        "grid min-w-0 items-center gap-7 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-10",
    card: "relative isolate mx-auto flex min-h-[260px] w-full max-w-[480px] flex-col justify-between overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#0b1730_0%,#173665_65%,#254e7d_100%)] p-5 text-white shadow-lg shadow-blue-950/15 sm:min-h-[280px] sm:p-6",
    orb: "pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full border-[40px] border-white/[0.04]",
    card_top: "flex items-start justify-between gap-3",
    currency_control: "min-w-0 flex-1",
    currency_label: "mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300",
    brand_group: "flex shrink-0 flex-col items-end gap-3",
    brand: "shrink-0 pt-1 text-xs font-semibold tracking-[0.18em] text-white/90",
    balance_row: "my-6 min-w-0 w-full",
    balance_content: "min-w-0 w-full",
    balance_label: "text-xs font-medium text-slate-300",
    balance: "mt-2 select-text [overflow-wrap:anywhere] text-3xl font-semibold leading-snug tracking-tight tabular-nums sm:text-4xl",
    balance_long: "mt-2 select-text [overflow-wrap:anywhere] text-base font-semibold leading-snug tracking-tight tabular-nums sm:text-3xl",
    balance_extra_long: "mt-2 select-text [overflow-wrap:anywhere] text-base font-semibold leading-snug tracking-tight tabular-nums sm:text-2xl",
    chip: "relative h-7 w-9 shrink-0 overflow-hidden rounded-md border border-amber-100/50 bg-[linear-gradient(135deg,#ecd9a6,#b89e64,#eee0b8)] before:absolute before:inset-x-0 before:top-1/2 before:border-t before:border-amber-900/30 after:absolute after:inset-y-0 after:left-1/3 after:w-1/3 after:rounded-sm after:border-x after:border-amber-900/30",
    card_bottom: "flex items-end justify-between gap-4 border-t border-white/10 pt-4",
    card_note: "min-w-0 flex-1 text-[11px] text-slate-300",
    holder: "block min-w-0 max-w-[55%] flex-1 truncate text-right text-xs font-medium text-white",
    summary: "flex min-w-0 flex-col justify-center",
    section_title: "text-base font-semibold text-slate-900",
    summary_grid: "my-5 grid grid-cols-2 divide-x divide-slate-200 border-y border-slate-100 py-4",
    metric: "min-w-0 pr-4 last:pl-5 last:pr-0",
    metric_label: "text-xs text-slate-500",
    metric_value: "mt-2 break-all text-lg font-semibold tabular-nums text-slate-900",
    reference: "mt-1.5 break-all font-mono text-[11px] leading-5 text-slate-500",
    actions: "mt-5 flex flex-wrap items-center gap-2.5",
    action_note: "mt-2.5 text-xs leading-5 text-slate-400",
    transactions: "min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white",
    transaction_header: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6",
    badge: "rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600",
    table_wrapper: "min-w-0 overflow-x-auto px-1 sm:px-2",
    footer: "flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-5 py-3 text-xs text-slate-500",
    state: "rounded-xl border border-slate-100 bg-slate-50 px-5 py-10 text-center text-sm leading-6 text-slate-500",
    error: "space-y-4 rounded-xl border border-rose-100 bg-rose-50 p-5 text-sm text-rose-800",
    state_padding: "p-5",
    breadcrumb_styles,
    table_styles,
    cell_styles,
    pagination_styles,
    currency_input,
    action_button,
    retry_button
} satisfies Record<
    string,
    | string
    | BreadcrumbUIClassStylesInterface
    | InputUIClassStylesInterface
    | ButtonUIClassStylesInterface
    | DataTableUIClassStylesInterface
    | DataTableCellComponentUIClassStylesInterface
    | PaginationUIClassStylesInterface
>;
export default MyWalletViewClassStyles;
