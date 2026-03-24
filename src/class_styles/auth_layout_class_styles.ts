
import { 
    AuthLayoutClassStylesInterface,
    AuthsViewClassStylesInterface
} from "@/ui_types/auth_layout_type";


import FormViewClassStyles from "./form_view_class_styles";


const AuthViewClassStyle: AuthsViewClassStylesInterface = { 
    ...FormViewClassStyles
}


const AuthLayoutClassStyles: AuthLayoutClassStylesInterface = {
    main_bg_class_style: `bg-[url('/assets/img/auth_bg.svg')] bg-cover bg-center bg-no-repeat min-h-screen w-screen h-screen overflow-hidden m-0 p-0`,
    footer_class_style: "w-screen p-0 m-0 bg-white shadow-md z-50",
    auth_view_class_style: AuthViewClassStyle,
    
}

export default AuthLayoutClassStyles;