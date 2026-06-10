import { ActivationCredentialsViewClassStylesInterface } from "@/ui_types/activation_credentials_view_type";

const ActivationCredentialsViewClassStyles: ActivationCredentialsViewClassStylesInterface = {
    wrapper_class_style:
        "py-6 px-[2%] space-y-6 w-full h-auto md:max-h-[500px] max-h-[700px] overflow-y-auto overflow-x-hidden",

    credentials_grid_class_style: "grid gap-3 md:grid-cols-2",

    content_card_class_styles: {
        wrapper_class_style:
            "overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-all duration-200",
        header_class_style: "border-b border-slate-100 px-4 py-3",
        title_class_style:
            "flex items-center gap-2 text-xs font-semibold uppercase leading-5 text-slate-500",
        title_icon_class_style: "h-4 w-4 shrink-0 text-slate-400",
        title_text_class_style: "min-w-0 truncate",
        media_wrapper_class_style: "bg-slate-50",
        media_class_style: "block h-48 w-full object-cover",
        media_description_class_style: "px-4 pt-3 text-xs leading-5 text-slate-500",
        body_class_style: "space-y-3 px-4 py-3",
        description_class_style: "truncate font-mono text-xs leading-5 text-slate-950",
        actions_class_style: "pt-0",
        button_class_style:
            "inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95",
        button_disabled_class_style:
            "cursor-not-allowed opacity-60 hover:bg-white active:scale-100",
        button_loading_class_style: "opacity-80",
        button_icon_class_style: "h-3 w-3 shrink-0",
        button_text_class_style: "truncate",
        error_class_style: "text-xs leading-5 text-red-600"
    },

    copied_content_card_class_styles: {
        wrapper_class_style:
            "overflow-hidden rounded-md border border-emerald-300 bg-emerald-50 shadow-sm ring-1 ring-emerald-200 transition-all duration-200",
        header_class_style: "border-b border-emerald-100 px-4 py-3",
        title_class_style:
            "flex items-center gap-2 text-xs font-semibold uppercase leading-5 text-emerald-700",
        title_icon_class_style: "h-4 w-4 shrink-0 text-emerald-500",
        title_text_class_style: "min-w-0 truncate",
        media_wrapper_class_style: "bg-emerald-50",
        media_class_style: "block h-48 w-full object-cover",
        media_description_class_style: "px-4 pt-3 text-xs leading-5 text-emerald-700",
        body_class_style: "space-y-3 px-4 py-3",
        description_class_style: "truncate font-mono text-xs leading-5 text-emerald-950",
        actions_class_style: "pt-0",
        button_class_style:
            "inline-flex items-center justify-center gap-1.5 rounded-md border border-emerald-500 bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 active:scale-95",
        button_disabled_class_style: "cursor-not-allowed opacity-70 active:scale-100",
        button_loading_class_style: "opacity-80",
        button_icon_class_style: "h-3 w-3 shrink-0",
        button_text_class_style: "truncate",
        error_class_style: "text-xs leading-5 text-red-600"
    },

    private_key_content_card_class_styles: {
        wrapper_class_style:
            "overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm transition-all duration-200",
        header_class_style: "border-b border-slate-200 px-4 py-3",
        title_class_style:
            "flex items-center gap-2 text-xs font-semibold uppercase leading-5 text-slate-600",
        title_icon_class_style: "h-4 w-4 shrink-0 text-slate-500",
        title_text_class_style: "min-w-0 truncate",
        media_wrapper_class_style: "bg-slate-50",
        media_class_style: "block h-48 w-full object-cover",
        media_description_class_style: "px-4 pt-3 text-xs leading-5 text-slate-500",
        body_class_style: "space-y-4 px-4 py-4",
        description_class_style:
            "min-h-[260px] overflow-auto rounded-md border border-slate-800 bg-slate-950 p-3 font-mono text-xs leading-5 text-slate-50 whitespace-pre-wrap break-all",
        actions_class_style: "pt-0",
        button_class_style:
            "inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-slate-700 active:scale-95",
        button_disabled_class_style:
            "cursor-not-allowed opacity-60 hover:bg-slate-900 active:scale-100",
        button_loading_class_style: "opacity-80",
        button_icon_class_style: "h-4 w-4 shrink-0",
        button_text_class_style: "truncate",
        error_class_style: "text-xs leading-5 text-red-600"
    },

    copied_private_key_content_card_class_styles: {
        wrapper_class_style:
            "overflow-hidden rounded-md border border-emerald-300 bg-white shadow-sm ring-1 ring-emerald-200 transition-all duration-200",
        header_class_style: "border-b border-emerald-100 px-4 py-3",
        title_class_style:
            "flex items-center gap-2 text-xs font-semibold uppercase leading-5 text-emerald-700",
        title_icon_class_style: "h-4 w-4 shrink-0 text-emerald-500",
        title_text_class_style: "min-w-0 truncate",
        media_wrapper_class_style: "bg-emerald-50",
        media_class_style: "block h-48 w-full object-cover",
        media_description_class_style: "px-4 pt-3 text-xs leading-5 text-emerald-700",
        body_class_style: "space-y-4 px-4 py-4",
        description_class_style:
            "min-h-[260px] overflow-auto rounded-md border border-emerald-900 bg-slate-950 p-3 font-mono text-xs leading-5 text-slate-50 whitespace-pre-wrap break-all",
        actions_class_style: "pt-0",
        button_class_style:
            "inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 active:scale-95",
        button_disabled_class_style: "cursor-not-allowed opacity-70 active:scale-100",
        button_loading_class_style: "opacity-80",
        button_icon_class_style: "h-4 w-4 shrink-0",
        button_text_class_style: "truncate",
        error_class_style: "text-xs leading-5 text-red-600"
    },

    page_header_class_styles: {
        wrapper_class_style:
            "rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900",

        top_row_class_style: "flex items-start justify-between gap-3",

        header_wrapper_class_style: "flex flex-col gap-1",

        description_class_style: "mt-1 text-xs leading-5",

        action_buttons_wrapper_class_style: "flex flex-wrap gap-2",

        header_text_class_styles: {
            text_class_style: "font-semibold"
        },

        action_button_class_styles: {
            wrapper_class_style: "w-auto flex",

            button_class_style:
                "inline-flex items-center justify-center rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60",

            disabled_class_style: "opacity-60 cursor-not-allowed",

            loading_class_style: "opacity-80",

            icon_class_style: "w-4 h-4 mr-2 flex items-center",

            text_class_style: "flex items-center justify-center",

            content_class_style: "flex items-center justify-center"
        }
    }
};

export default ActivationCredentialsViewClassStyles;
