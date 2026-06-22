import { ActivateAccountViewClassStylesInterface } from "@/ui_types/activate_account_view_type";

import AuthLayoutClassStyles from "@/class_styles/auth_layout_class_styles";

const ActivateAccountViewClassStyles: ActivateAccountViewClassStylesInterface = {
    ...AuthLayoutClassStyles.auth_view_class_style,

    form_box_class_style:
        "w-full max-w-md rounded-lg h-auto max-h-full overflow-auto bg-white shadow-lg flex items-center justify-start animate-slide-in border-2 border-gray-200 p-6",

    form_box_wrapper_class_style: "w-full h-full flex flex-col gap-5",

    fieldset_class_style: "flex-1 space-y-5 w-full h-auto my-4",

    loader_text_class_style: "text-sm leading-6 text-gray-600 text-center",

    instruction_class_style: "text-sm leading-6 text-gray-600",

    form_actions_class_style: "flex flex-col gap-3 w-full",

    secondary_button_wrapper_class_style: "w-full",

    password_toggle_wrapper_class_style: "flex justify-end",

    two_factor_wrapper_class_style: "space-y-5",

    two_factor_instruction_class_style: "space-y-3 text-sm leading-6 text-gray-600",

    app_links_grid_class_style: "grid grid-cols-1 gap-2 sm:grid-cols-2",

    app_link_class_style:
        "inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100",

    qr_setup_class_style: "space-y-4",

    qr_image_wrapper_class_style:
        "mx-auto flex h-48 w-48 items-center justify-center rounded-lg border border-slate-200 bg-white p-3 shadow-sm",

    qr_image_class_style: "h-full w-full object-contain",

    secret_section_class_style: "space-y-3",
    authenticator_apps_title_class_style: "text-sm font-semibold text-slate-800",

    back_button_class_style:
        "w-full cursor-pointer inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-md font-semibold text-slate-700 ring-offset-background transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

    password_toggle_button_class_styles: {
        wrapper_class_style: "w-auto",
        button_class_style:
            "inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-offset-background transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled_class_style: "",
        loading_class_style: "",
        icon_class_style: "h-4 w-4 flex items-center",
        text_class_style: "",
        content_class_style: ""
    },

    secret_key_card_class_styles: {
        wrapper_class_style:
            "overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-sm transition-all duration-200",
        header_class_style: "border-b border-slate-200 px-4 py-3",
        title_class_style: "flex items-center gap-2 text-xs font-semibold uppercase leading-5 text-slate-600",
        title_icon_class_style: "h-4 w-4 shrink-0 text-slate-500",
        title_text_class_style: "min-w-0 truncate",
        media_wrapper_class_style: "bg-white",
        media_class_style: "block h-48 w-full object-cover",
        media_description_class_style: "px-4 pt-3 text-xs leading-5 text-slate-500",
        body_class_style: "space-y-3 px-4 py-3",
        description_class_style: "break-all font-mono text-xs leading-5 text-slate-950",
        actions_class_style: "pt-0",
        button_class_style:
            "inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95",
        button_disabled_class_style: "cursor-not-allowed opacity-60 hover:bg-white active:scale-100",
        button_loading_class_style: "opacity-80",
        button_icon_class_style: "h-3 w-3 shrink-0",
        button_text_class_style: "truncate",
        error_class_style: "text-xs leading-5 text-red-600"
    },

    spinner_class_style: "w-12 h-12 flex items-center"
};

export default ActivateAccountViewClassStyles;
