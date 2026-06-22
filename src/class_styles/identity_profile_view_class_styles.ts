import ProfileViewClassStyles from "@/class_styles/profile_view_class_styles";

import { IdentityProfileViewClassStylesInterface } from "@/ui_types/identity_profile_view_type";

const IdentityProfileViewClassStyles: IdentityProfileViewClassStylesInterface = {
    ...ProfileViewClassStyles,

    wrapper_class_style:
        "py-5 px-[2%] w-full h-auto md:max-h-[620px] max-h-[720px] overflow-y-auto overflow-x-hidden bg-gray-100",

    loading_wrapper_class_style:
        "p-6 w-full flex gap-2 items-center justify-center min-h-48 text-sm font-semibold text-gray-700",

    profile_header_class_style:
        "flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full border-b border-gray-100 pb-5",

    profile_badge_wrapper_class_style: "flex flex-wrap items-center gap-2",

    active_badge_class_style:
        "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-green-200",

    inactive_badge_class_style:
        "inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200",

    deleted_badge_class_style:
        "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-red-200",

    info_row_class_style: "flex items-start gap-2 text-xs font-semibold text-gray-800 break-words",

    active_status_class_style: "text-green-600",

    inactive_status_class_style: "text-red-600",

    association_grid_class_style: "grid grid-cols-1 gap-3 lg:grid-cols-2",

    association_card_class_style: "rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3",

    association_card_header_class_style: "flex items-start justify-between gap-3",

    association_card_title_class_style: "text-sm font-black text-gray-900 break-all",

    association_card_subtitle_class_style: "text-xs font-semibold text-gray-500 break-all",

    association_card_body_class_style: "space-y-1 text-xs font-semibold text-gray-700 break-all",

    empty_state_class_style:
        "rounded-md border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm font-semibold text-gray-500",

    tabs_class_styles: {
        wrapper_class_style: "w-full space-y-5 h-full",
        tabs_list_class_style: "grid grid-cols-1 gap-2 border-b border-gray-100 w-full",
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
    }
};

export default IdentityProfileViewClassStyles;
