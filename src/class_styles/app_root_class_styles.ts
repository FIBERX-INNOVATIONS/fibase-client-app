import { ScreenLoaderUIClassStylesInterface } from "@ui/version_3/ui_types/screen_loader_ui_type";
import { StatusAlertUIClassStylesInterface } from "@ui/version_3/ui_types/status_alert_ui_type";

import { AppRootClassStylesInterface } from "@/ui_types/app_root_type";

const ScreenLoaderClassStyles: ScreenLoaderUIClassStylesInterface = {
    wrapper_class_style:
        "fixed inset-0 flex items-center justify-center overflow-hidden w-screen h-screen z-[900]",
    loader_class_style:
        "flex flex-col items-center justify-center space-y-4 animate-fade-in bg-[#001f3f] z-[100] w-full h-full",
    loader_symbol_class_style:
        "w-20 h-20 flex items-center justify-center overflow-hidden animate-spin",
    loader_symbol_img_class_style: "object-fit",
    loader_text_class_style:
        "text-white font-bold text-lg tracking-[0.7em] animate-pulse w-full text-center mt-4"
};

const StatusAlertClassstyles: StatusAlertUIClassStylesInterface = {
    wrapper_class_style:
        "fixed inset-0 flex items-start justify-end overflow-hidden bg-[#0d0a0a66] z-[200] p-4 pointer-events-none",
    alert_box_class_style:
        "relative mt-4 mr-4 w-[min(92vw,28rem)] min-h-24 flex items-stretch overflow-visible rounded-lg shadow-2xl pointer-events-auto",
    close_btn_class_style:
        "absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full shadow-lg cursor-pointer ring-2 ring-white/80",
    status_icon_wrapper_class_style:
        "flex items-center justify-center w-16 shrink-0 min-h-full p-4 border-r border-white/25",
    status_icon_class_style: "block w-8 h-8 font-bold",
    status_content_wrapper_class_style: "flex-1 min-w-0 h-full px-4 py-3",
    status_content_class_style: "text-sm leading-5 font-semibold",
    sucess_bg_class_style: "bg-gradient-to-r from-emerald-500 via-green-600 to-teal-700",
    error_bg_class_style: "bg-gradient-to-r from-rose-600 via-red-600 to-red-900",
    info_bg_class_style: "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700",
    sucess_text_class_style: "text-white font-black",
    error_text_class_style: "text-white font-black",
    info_text_class_style: "text-white font-bold"
};

export const StatusAlertVariantClassStyles = {
    success_bg_class_style: StatusAlertClassstyles.sucess_bg_class_style,
    error_bg_class_style: StatusAlertClassstyles.error_bg_class_style,
    info_bg_class_style: StatusAlertClassstyles.info_bg_class_style,
    warning_bg_class_style: "bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-700",
    success_text_class_style: StatusAlertClassstyles.sucess_text_class_style,
    error_text_class_style: StatusAlertClassstyles.error_text_class_style,
    info_text_class_style: StatusAlertClassstyles.info_text_class_style,
    warning_text_class_style: "text-white font-black"
};

const AppRootClassStyles: AppRootClassStylesInterface = {
    screen_loader_ui_class_style: ScreenLoaderClassStyles,
    status_alert_ui_class_style: StatusAlertClassstyles
};

export default AppRootClassStyles;
