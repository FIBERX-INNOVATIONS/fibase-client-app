
import { LoginViewClassStylesInterface  } from "@/ui_types/login_view_type";
import input_group_class_style from "./input_group_ui_class_styles";
import input_ui_class_styles from "./input_ui_class_styles";
import ToasterUIClassStyles from "./toaster_ui_class_styles";
import ButtonUIClassStyles from "./button_ui_class_styles";


const LoginViewClassStyles: LoginViewClassStylesInterface = {
    wrapper_class_style: "w-full h-full flex items-center md:justify-end justify-center py-[5%] px-[4%]",
    form_box_class_style: "w-full w-sm rounded-lg h-auto bg-white shadow-lg flex items-center justify-start animate-slide-in border-2 border-gray-200 p-6",
    form_box_wrapper_class_style: "w-full flex flex-col space-y-1.5",
    header_text_class_style: "font-semibold tracking-tight text-2xl flex",
    fieldset_class_style: "space-y-6 py-4",
    input_group_class_style,
    input_ui_class_styles,
    toaster_ui_class_styles: ToasterUIClassStyles,
    btn_class_styles: ButtonUIClassStyles
}

export default LoginViewClassStyles;