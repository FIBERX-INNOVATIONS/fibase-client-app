import { ContentCardUIClassStylesInterface } from "@ui/version_3/ui_types/content_card_ui_type";

import { TransactionReceiptViewClassStylesInterface } from "@/ui_types/transaction_receipt_view_type";

const RECEIPT_CARD_CLASS_STYLES: ContentCardUIClassStylesInterface = {
    wrapper_class_style: "rounded-xl border border-gray-200 bg-white p-4 shadow-sm",
    header_class_style: "mb-3",
    title_class_style: "flex items-start gap-2 text-sm font-black text-gray-900",
    title_icon_class_style: "mt-0.5 h-4 w-4 shrink-0 text-gray-600",
    title_text_class_style: "break-all",
    media_wrapper_class_style: "",
    media_class_style: "",
    media_description_class_style: "",
    body_class_style: "space-y-3",
    description_class_style: "flex flex-wrap gap-2 text-xs font-semibold leading-6 text-gray-700",
    actions_class_style: "mt-4 flex justify-end",
    button_class_style:
        "inline-flex cursor-pointer items-center rounded-full bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-gray-700",
    button_disabled_class_style: "cursor-not-allowed bg-gray-300 text-gray-600",
    button_loading_class_style: "opacity-70",
    button_icon_class_style: "mr-2 h-4 w-4",
    button_text_class_style: "",
    error_class_style: "text-xs font-semibold text-red-600"
};

const TransactionReceiptViewClassStyles: TransactionReceiptViewClassStylesInterface = {
    wrapper_class_style: "w-full space-y-4",
    search_wrapper_class_style: "flex w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2",
    search_icon_class_style: "h-4 w-4 text-gray-500",
    search_input_class_style: "w-full bg-transparent text-sm outline-none",
    permission_state_class_style:
        "rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500",
    loading_wrapper_class_style: "flex min-h-32 items-center justify-center gap-2 text-sm font-semibold text-gray-600",
    loading_icon_class_style: "h-5 w-5",
    empty_state_class_style:
        "rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500",
    cards_grid_class_style: "grid grid-cols-1 gap-4 lg:grid-cols-1",
    pagination_wrapper_class_style: "flex flex-col items-center gap-3 border-t border-gray-200 pt-4",
    pagination_text_class_style: "text-xs font-semibold text-gray-500",
    receipt_card_class_styles: RECEIPT_CARD_CLASS_STYLES
};

export default TransactionReceiptViewClassStyles;
