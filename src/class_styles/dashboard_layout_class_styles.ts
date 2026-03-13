
import { DashboardLayoutClassStylesInterface } from "@/ui_types/dashboard_layout_type";
import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ImageRenderUIClassStylesInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";


const TopBarClassStyles: LayoutSectionsUIClassStylesInterface = {
    wrapper_class_style: "w-screen px-4 flex flex-wrap items-center justify-between relative h-[70px] w-full bg-white py-2",

    section_1_wrapper_class_style:  "flex items-center space-x-2 md:w-3/12 w-6/12 overflow-hidden h-full relative",

    section_2_wrapper_class_style: "flex items-center space-x-2 md:w-6/12 w-full overflow-hidden md:order-1 order-2 h-full relative",

    section_3_wrapper_class_style: "flex items-center justify-end space-x-2 md:w-3/12 w-6/12 overflow-hidden md:order-2 order-1 h-full relative"
}

const HamburgerBtnClassStyle: ButtonUIClassStylesInterface = {
    wrapper_class_style: "w-10 h-10 flex items-center justify-center overflow-hidden",

    button_class_style: "w-full h-full p-2 text-black hover:bg-gray-200  cursor-pointer rounded",

    disabled_class_style: "opacity-50 cursor-not-allowed",

    loading_class_style: "opacity-80",

    icon_class_style: "w-6 h-6 flex items-center mr-2",

    text_class_style: ""
}

const TopBarLogoClassstyle: ImageRenderUIClassStylesInterface = {
    wrapper_class_style: "flex items-center cursor-pointer w-10/12 h-full",

    image_class_style: "h-full object-contain",

    content_wrapper_class_style: "hidden",

    loading_class_style: "",

    error_class_style: "",
}

const DashboardLayoutClassstyles: DashboardLayoutClassStylesInterface = {
    header_class_style: "fixed top-0 left-0 w-screen p-0 m-0 bg-white shadow-md z-[80] border-b-1",
    main_class_style: "pt-[92px] pb-[60px] h-screen overflow-y-auto overflow-x-hidden",
    top_bar_class_style: TopBarClassStyles,
    hamburger_btn_class_style: HamburgerBtnClassStyle,
    topbar_logo_class_style: TopBarLogoClassstyle


}

export default DashboardLayoutClassstyles;