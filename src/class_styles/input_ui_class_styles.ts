import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";

const input_ui_class_styles: InputUIClassStylesInterface = {
    input_class_style: `
        !w-full !min-h-10 !flex !rounded-md !border px-3 !py-2 !text-sm !ring-offset-background 
        !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-2 
        !focus-visible:ring-ring !focus-visible:ring-offset-2  !bg-gray-200 !border-blue-600/70 
        !text-black !placeholder-gray-400 !focus:ring-sky-500`
        .replace(/\s+/g, " ")
        .trim(),

    file_input_class_style: `file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-1 file:text-sm file:font-semibold 
        file:bg-gradient-to-r file:from-blue-500 file:to-blue-900
        file:text-white hover:file:from-blue-500 hover:file:to-blue-400 hover:file:cursor-pointer`
        .replace(/\s+/g, " ")
        .trim(),

    wrapper_class_style: "w-full flex flex-col items-center gap-2 justify-center relative",

    loader_class_style: "",

    switch_btn_class_style: "group inline-flex h-6 w-11 transition",

    knob_class_style: "size-4 rounded-full transition transform",

    label_text_class_style: "ms-3",

    active_class_style: "bg-blue-300",

    inactive_class_style: "bg-gray-900",

    caret_icon_class: "absolute right-3 top-[17px] -translate-y-1/2 text-gray-500 cursor-pointer w-6 h-6",

    dropdown_wrapper_class_style:
        "p-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto",

    options_wrapper_class_style: "",

    option_class_style: "px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm text-gray-700 text-start font-bold",

    option_content_class_style: "",

    input_readonly_class_style: "bg-gray-100 cursor-not-allowed",

    helper_text_class_style: "text-sm font-semibold text-gray-500 text-left w-full",

    selected_text_class_style: "text-sm font-semibold text-gray-500 text-left w-full",

    error_text_class_style: "text-xs text-red-700 font-bold capitalize w-full text-left",

    otp_wrapper_class_style: "flex gap-2 justify-center",

    search_wrapper_class_style: "w-full flex relative",

    search_icon_class_style:
        "w-8 h-8 p-2 absolute top-1 left-1  cursor-pointer inline-flex items-center justify-center rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-8 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 text-white",

    search_input_class_style: "pl-10",

    range_container_class_style: "w-full flex flex-col items-center justify-center gap-2",

    range_separator_class_style: "w-6 h-6 flex items-center justify-center",

    preview_wrapper_class_style: "w-full h-auto flex items-center justify-start gap-4 p-2 border rounded-md",

    img_preview_class_style: "w-full h-auto max-h-60 object-contain",

    generic_file_preview_wrapper_class_style: "w-full h-auto flex items-center justify-start",

    generic_file_preview_icon_class_style: "w-10 h-10 text-gray-500",

    generic_file_preview_content_class_style: "text-sm text-gray-700",

    multi_select_search_class_styles: {
        wrapper_class_style: "w-full flex flex-col items-center justify-center",

        chips_wrapper_class_style: "flex flex-wrap gap-2 mb-2",

        chip_class_style: "px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1 font-bold",

        chip_btn_class_style: "w-6 h-6 flex items-center text-red-500 font-bold cursor-pointer"
    }
};

export default input_ui_class_styles;
