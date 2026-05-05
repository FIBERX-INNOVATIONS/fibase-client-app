
import { FormViewClassStylesinterface } from "@/ui_types/form_view_type";

import input_group_class_style from "./input_group_ui_class_styles";
import input_ui_class_styles from "./input_ui_class_styles";
import ToasterUIClassStyles from "./toaster_ui_class_styles";
import ButtonUIClassStyles from "./button_ui_class_styles";


const FormViewClassStyles: FormViewClassStylesinterface  = {
    wrapper_class_style: "w-full h-full flex items-center md:justify-end justify-center py-[5%] px-[4%]",
    
    form_box_class_style: "w-full w-sm rounded-lg h-auto bg-white shadow-lg flex items-center justify-start animate-slide-in border-2 border-gray-200 p-6",

    form_box_wrapper_class_style: "w-full h-full flex flex-col",

    header_text_class_style: "font-semibold tracking-tight text-2xl flex",

    // fieldset_class_style: "space-y-6 py-4 w-full h-auto md:max-h-[500px] max-h-[700px] overflow-y-auto overflow-x-hidden",
    fieldset_class_style: "flex-1 overflow-y-auto overflow-x-hidden space-y-6 py-4 pr-2 touch-pan-y h-auto md:max-h-[500px] max-h-[700px]",

    input_group_class_style,

    input_ui_class_styles,

    toaster_ui_class_styles: ToasterUIClassStyles,

    btn_class_styles: ButtonUIClassStyles,

    modal_btn_class_styles: {
        ...ButtonUIClassStyles,
        wrapper_class_style: "border-t border-blue-300 w-full shrink-0"
    },

    spinner_class_style: "w-full flex items-center justify-center"

}

export default FormViewClassStyles;