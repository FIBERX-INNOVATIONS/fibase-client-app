import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";

const DeleteButtonUIClassStyles: ButtonUIClassStylesInterface = {
    wrapper_class_style: "w-full",

    button_class_style:
        "w-full cursor-pointer inline-flex mt-4 items-center justify-center rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-red-500 to-red-800 hover:from-red-500 hover:to-red-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider py-3",

    disabled_class_style: "",

    loading_class_style: "opacity-80",

    icon_class_style: "w-4 h-4 ml-2 flex items-center",

    text_class_style: "flex w-full items-center justify-center gap-2 p-2 truncate",

    content_class_style: "flex w-full items-center justify-center gap-2 p-2 truncate"
};

export default DeleteButtonUIClassStyles;
