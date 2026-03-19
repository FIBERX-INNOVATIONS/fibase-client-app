
import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";

const input_ui_class_styles: InputUIClassStylesInterface = {
    input_class_style: "w-full min-h-10 flex rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  bg-gray-200 border-blue-600/70 text-black placeholder-gray-400 focus:ring-sky-500",

    wrapper_class_style: "w-full flex flex-col items-center gap-2 justify-center relative",

    loader_class_style: "",

    switch_btn_class_style: "group inline-flex h-6 w-11 transition",

    knob_class_style: "size-4 rounded-full transition transform",

    label_text_class_style: "ms-3",

    active_class_style: "bg-blue-300",

    inactive_class_style: "bg-gray-900",

    caret_icon_class: "absolute right-3 top-[17px] -translate-y-1/2 text-gray-500 cursor-pointer w-6 h-6",

    dropdown_wrapper_class_style: "p-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto",

    options_wrapper_class_style: "",

    option_class_style: "px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm",

    option_content_class_style: "",

    input_readonly_class_style: "bg-gray-100 cursor-not-allowed",

    helper_text_class_style: "text-sm font-semibold text-gray-300 text-left",

    error_text_class_style: "text-xs text-red-700 font-bold capitalize w-full text-left",

    otp_wrapper_class_style: "flex gap-2 justify-center",

    search_wrapper_class_style: "w-full flex relative",

    search_icon_class_style: "w-8 h-8 p-2 absolute top-1 left-1  cursor-pointer inline-flex items-center justify-center rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-8 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 text-white",

    search_input_class_style: "pl-10",

    range_container_class_style: "w-full flex flex-col items-center justify-center gap-2",

    range_separator_class_style: "w-6 h-6 flex items-center justify-center",
}

export default input_ui_class_styles;