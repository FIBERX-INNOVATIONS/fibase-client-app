import {
    AuthLayoutClassStylesInterface,
    AuthsViewClassStylesInterface
} from "@/ui_types/auth_layout_type";

import FormViewClassStyles from "./form_view_class_styles";

const AuthViewClassStyle: AuthsViewClassStylesInterface = {
    ...FormViewClassStyles,
    wrapper_class_style:
        "overflow-y-auto overflow-x-hidden w-full h-full flex flex-col md:items-end items-center justify-center px-[10%] py-[5%]"
};

const AuthLayoutClassStyles: AuthLayoutClassStylesInterface = {
    main_bg_class_style: `bg-[url('/assets/img/auth_bg.svg')] bg-cover bg-center bg-no-repeat min-h-screen w-screen h-screen overflow-hidden m-0 p-0`,
    footer_class_style: "w-screen p-0 m-0 bg-white shadow-md z-50",
    auth_view_class_style: AuthViewClassStyle
};

export default AuthLayoutClassStyles;
