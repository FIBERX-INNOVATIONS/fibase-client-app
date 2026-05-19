import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";

const CancelButtonUIClassStyles: ButtonUIClassStylesInterface = {
    wrapper_class_style: "w-full",

    button_class_style:
        "w-full cursor-pointer inline-flex mt-4 items-center justify-center rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-200 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-gray-800 font-semibold tracking-wider py-3",

    disabled_class_style: "",

    loading_class_style: "opacity-80",

    icon_class_style: "w-4 h-4 ml-2 flex items-center",

    text_class_style: "flex w-full items-center justify-center gap-2",

    content_class_style: "flex w-full items-center justify-center gap-2"
};

export default CancelButtonUIClassStyles;
