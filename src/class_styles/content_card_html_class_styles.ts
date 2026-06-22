const ContentCardHTMLClassStyles = {
    description_item_class_style: "inline-flex items-start gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-700",
    description_label_class_style: "font-black text-gray-900",
    description_text_class_style: "mb-3 whitespace-pre-line text-sm font-semibold leading-6 text-gray-800",
    description_list_class_style: "flex flex-wrap gap-2",
    status_badge_class_style: "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-black ring-1",
    success_status_class_style: "bg-green-50 text-green-700 ring-green-200",
    error_status_class_style: "bg-red-50 text-red-700 ring-red-200",
    current_device_badge_class_style:
        "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-black text-green-700 ring-1 ring-green-200",
    compact_description_item_class_style: "inline-flex items-start gap-1 rounded-md bg-gray-50 px-2 py-1"
} as const;

export default ContentCardHTMLClassStyles;
