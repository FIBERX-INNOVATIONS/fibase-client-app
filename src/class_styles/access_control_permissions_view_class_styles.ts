import { AccessControlPermissionsViewClassStylesInterface } from "@/ui_types/access_control_permissions_view_type";

const AccessControlPermissionsViewClassStyles: AccessControlPermissionsViewClassStylesInterface = {
    wrapper_class_style: "w-full space-y-4 bg-gray-100 p-4 md:max-h-[650px] max-h-[700px] overflow-y-auto overflow-x-hidden",

    toolbar_class_style: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",

    search_wrapper_class_style: "relative flex min-h-11 w-full items-center md:w-8/12",

    search_icon_class_style: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400",

    search_input_class_style:
        "h-11 w-full rounded-full border border-gray-200 bg-white px-10 py-2 text-sm font-semibold text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100",

    bulk_action_button_class_style:
        "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 cursor-pointer",

    bulk_assign_action_button_class_style:
        "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 cursor-pointer",

    bulk_action_button_icon_class_style: "h-5 w-5 shrink-0",

    loading_wrapper_class_style:
        "rounded-md border border-gray-200 bg-white px-4 py-8 text-center text-sm font-semibold text-gray-600",

    loading_icon_class_style: "mr-2 inline-block h-4 w-4 animate-spin",

    empty_state_class_style:
        "rounded-md border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500",

    permissions_grid_class_style: "grid grid-cols-1 gap-3",

    permission_row_class_style:
        "flex items-stretch gap-3 rounded-[28px] border border-gray-200 bg-white p-2 shadow-sm transition hover:border-gray-300",

    permission_checkbox_class_style:
        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",

    permission_checkbox_selected_class_style: "border-green-600 bg-green-600 text-white",

    permission_checkbox_unselected_class_style:
        "border-gray-200 bg-gray-50 text-gray-300 hover:border-green-500 hover:text-green-600",

    permission_checkbox_icon_class_style: "h-7 w-7",

    permission_card_wrapper_class_style: "min-w-0 flex-1",

    permission_content_card_class_styles: {
        wrapper_class_style: "h-full rounded-full border border-gray-100 bg-white px-5 py-4 transition",
        header_class_style: "mb-3",
        title_class_style: "flex items-start gap-2 text-sm font-black text-gray-900",
        title_icon_class_style: "mt-0.5 h-4 w-4 shrink-0 text-gray-600",
        title_text_class_style: "break-words",
        media_wrapper_class_style: "",
        media_class_style: "",
        media_description_class_style: "",
        body_class_style: "space-y-3",
        description_class_style: "text-xs font-semibold leading-6 text-gray-700 break-words",
        actions_class_style: "flex items-center justify-end",
        button_class_style:
            "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm font-bold text-red-700 transition border border-red-100 hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
        button_disabled_class_style: "cursor-not-allowed bg-gray-100 text-gray-400",
        button_loading_class_style: "opacity-80",
        button_icon_class_style: "h-4 w-4 shrink-0",
        button_text_class_style: "whitespace-nowrap",
        error_class_style: "text-xs font-semibold text-red-600"
    }
};

export default AccessControlPermissionsViewClassStyles;
