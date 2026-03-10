
import { 
    ToastStatusType,
    ToasterUIClassStylesInterface  
} from "@ui/version_3/ui_types/toaster_ui_type";


const ToasterUIClassStyles: ToasterUIClassStylesInterface = {
    wrapper_class_style: "w-full flex items-stretch justify-start border-l-4 rounded-lg",

    icon_wrapper_class_style: "flex items-center justify-center w-1/12 p-1",
    
    icon_class_style: "flex items-center justify-center w-6 h-6",
    
    message_class_style: "flex-1 w-11/12 h-full p-2",

    border_class_style: (status?: ToastStatusType): string => {
        switch (status) {

            case "success":
                return "bg-green-100 border-l-green-900";

            case "error":
                return "bg-red-200 border-l-red-900";

            case "warning":
                return "bg-yellow-100 border-l-yellow-900";

            case "info":
                return "bg-blue-300 border-l-blue-900";

            default:
                return "";
        }
    },

    text_class_style: (status?: ToastStatusType): string => {
        switch (status) {

            case "success":
                return "text-sm font-semibold text-green-900 bg-green-100";

            case "error":
                return "text-sm font-semibold text-red-900 bg-red-200";

            case "warning":
                return  "text-sm font-semibold text-amber-900 bg-yellow-100";

            case "info":
                return "text-sm font-semibold text-blue-900 bg-blue-300";

            default:
                return "";
        }
    },
}

export default ToasterUIClassStyles;