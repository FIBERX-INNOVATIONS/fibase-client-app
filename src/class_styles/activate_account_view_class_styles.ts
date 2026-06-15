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

    secret_section_class_style: "space-y-3"
};

export default ActivateAccountViewClassStyles;
