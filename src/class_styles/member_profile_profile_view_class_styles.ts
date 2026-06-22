import ProfileViewClassStyles from "@/class_styles/profile_view_class_styles";

import { MemberProfileProfileViewClassStylesInterface } from "@/ui_types/member_profile_profile_view_type";

const MemberProfileProfileViewClassStyles: MemberProfileProfileViewClassStylesInterface = {
    ...ProfileViewClassStyles,

    wrapper_class_style:
        "py-5 px-[2%] space-y-5 w-full h-auto md:max-h-[600px] max-h-[700px] overflow-y-auto overflow-x-hidden bg-gray-100",

    loading_wrapper_class_style:
        "p-6 w-full flex gap-2 items-center justify-center h-auto max-h-[620px] overflow-y-auto overflow-x-hidden text-sm font-semibold text-gray-700",

    profile_header_class_style:
        "flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full border-b border-gray-100 pb-5",

    profile_badge_wrapper_class_style: "flex flex-wrap items-center gap-2",

    active_badge_class_style:
        "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-green-200",

    inactive_badge_class_style:
        "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-red-200",

    deleted_badge_class_style:
        "inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-700 ring-1 ring-gray-200",

    info_row_class_style: "flex items-start gap-2 text-xs font-semibold text-gray-800 break-words",

    active_status_class_style: "text-green-500",

    inactive_status_class_style: "text-red-500",

    tabs_class_styles: {
        wrapper_class_style: "w-full space-y-5 h-full",
        tabs_list_class_style: "grid grid-cols-2 gap-2 border-b border-gray-100 w-full",
        tab_button_class_style:
            "w-full inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 border border-gray-200 cursor-pointer",
        active_tab_button_class_style: "bg-gray-900 text-white",
        inactive_tab_button_class_style: "bg-gray-300 text-gray-700 hover:bg-gray-200",
        disabled_tab_button_class_style: "opacity-60 cursor-not-allowed",
        tab_icon_class_style: "h-4 w-4 shrink-0",
        tab_label_class_style: "whitespace-nowrap",
        panel_wrapper_class_style:
            "w-full flex items-center flex-col border rounded-lg p-[2%] border-gray-100 shadow-2xl bg-white",
        panel_class_style: "w-full",
        error_class_style: "text-xs font-semibold text-red-600"
    },

    devices_wrapper_class_style: "w-full space-y-4",

    devices_toolbar_class_style: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",

    devices_search_wrapper_class_style: "relative flex min-h-11 w-full items-center md:w-8/12",

    devices_search_icon_class_style: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400",

    devices_search_input_class_style:
        "h-11 w-full rounded-full border border-gray-200 bg-white px-10 py-2 text-sm font-semibold text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100",

    devices_toolbar_button_class_style:
        "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 cursor-pointer",

    devices_toolbar_button_icon_class_style: "h-6 w-6 shrink-0",

    devices_grid_class_style: "grid grid-cols-1 gap-3 lg:grid-cols-2",

    devices_empty_state_class_style:
        "rounded-md border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500",

    devices_pagination_class_style:
        "flex flex-col gap-3 border-t border-gray-100 pt-4 md:flex-row md:items-center md:justify-between",

    devices_pagination_text_class_style: "text-xs font-bold text-gray-500",

    devices_pagination_ui_class_styles: {
        wrapper_class_style: "flex flex-wrap items-center gap-2",
        button_class_style:
            "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 transition hover:text-white hover:bg-gray-900 cursor-pointer",
        btn_icon_class_style: "h-4 w-4",
        active_page_class_style: "!border-gray-900 !text-white !bg-gray-900",
        disabled_class_style: "cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-100",
        page_container_class_style: "flex flex-wrap items-center gap-1",
        prev_btn_class_style: "",
        next_btn_class_style: ""
    },

    device_content_card_class_styles: {
        wrapper_class_style: "rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300",
        header_class_style: "mb-3",
        title_class_style: "flex items-center gap-2 text-sm font-black text-gray-900",
        title_icon_class_style: "h-4 w-4 shrink-0 text-gray-600",
        title_text_class_style: "break-words",
        media_wrapper_class_style: "",
        media_class_style: "",
        media_description_class_style: "",
        body_class_style: "space-y-3",
        description_class_style: "whitespace-pre-line text-xs font-semibold leading-6 text-gray-600 break-words",
        actions_class_style: "flex items-center justify-end",
        button_class_style:
            "inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700 transition border border-red-100 hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
        button_disabled_class_style: "cursor-not-allowed bg-gray-100 text-gray-400",
        button_loading_class_style: "opacity-80",
        button_icon_class_style: "h-4 w-4 shrink-0",
        button_text_class_style: "whitespace-nowrap",
        error_class_style: "text-xs font-semibold text-red-600"
    }
};

export default MemberProfileProfileViewClassStyles;
