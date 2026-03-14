
import { DashboardLayoutClassStylesInterface } from "@/ui_types/dashboard_layout_type";
import { SideBarUIClassStyleInterface } from "@/ui_types/side_bar_ui_type";
import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";
import { DropdownMenuUIClassStylesInterface } from "@ui/version_3/ui_types/dropdown_menu_ui_type";
import { ImageRenderUIClassStylesInterface } from "@ui/version_3/ui_types/image_render_ui_type";
import { LayoutSectionsUIClassStylesInterface } from "@ui/version_3/ui_types/layout_sections_ui_type";
import { NavLinkUIClassStylesInterface } from "@ui/version_3/ui_types/nav_link_ui_type";


const TopBarClassStyles: LayoutSectionsUIClassStylesInterface = {
    wrapper_class_style: "w-screen px-4 flex flex-wrap items-center justify-between relative min-h-[70px] h-auto w-full bg-white py-2",

    section_1_wrapper_class_style:  "flex items-center space-x-2 md:w-3/12 w-6/12 overflow-hidden h-full relative",

    section_2_wrapper_class_style: "flex items-center space-x-2 md:w-6/12 w-full overflow-hidden md:order-1 order-2 h-full relative",

    section_3_wrapper_class_style: "flex items-center justify-end space-x-2 md:w-3/12 w-6/12 overflow-hidden md:order-2 order-1 h-full relative"
}

const HamburgerBtnClassStyle: ButtonUIClassStylesInterface = {
    wrapper_class_style: "w-10 h-12 flex items-center justify-center overflow-hidden",

    button_class_style: "w-full h-full p-2 text-black hover:bg-gray-200  cursor-pointer rounded",

    disabled_class_style: "opacity-50 cursor-not-allowed",

    loading_class_style: "opacity-80",

    icon_class_style: "w-6 h-6 flex items-center mr-2",

    text_class_style: ""
}

const TopBarLogoClassstyle: ImageRenderUIClassStylesInterface = {
    wrapper_class_style: "flex items-center cursor-pointer w-10/12 h-full",

    image_class_style: "h-[48px] object-contain",

    content_wrapper_class_style: "hidden",

    loading_class_style: "",

    error_class_style: "",
}

const MemberAvatarClassStyle: ImageRenderUIClassStylesInterface  = {
    wrapper_class_style: "w-auto max-w-8/12 flex items-center justify-end h-full hover:shadow-lg rounded-full cursor-pointer border-[#001f3f] border-2 overflow-hidden",

    image_class_style: "w-[45px] h-[45px] border-4 border-white bg-gray-200 object-fit rounded-full",

    content_wrapper_class_style: "flex items-center justify-center w-[30px] h-full",

    loading_class_style: "",

    error_class_style: "",
}

const ContentClassstyle = {
    icon_class_style: "w-full h-full flex items-center justify-center",
    caret_wrapper_class_style: "h-full w-full flex items-center justify-center"
}

const MemberAvatarDropdownClassStyle: DropdownMenuUIClassStylesInterface = {

    wrapper_class_style: "hidden w-[140px] bg-white p-0 min-h-[114px] m-0 absolute border border-gray-100 rounded-2xl shadow-lg z-[10]",

    menu_class_style: "py-2 w-full border-b-2 border-[#6f7e8d6e] last:border-b-0",

    menu_item_wrapper_class_style: "w-full px-1 m-0",

    visible_class_style: "",
}

const MemberAvatarDropdownMenuListClassStyle: NavLinkUIClassStylesInterface = {
    wrapper_class_style: "flex items-center cursor-pointer p-2 rounded-lg flex justify-between items-center group/link w-full hover:bg-[#f0f4f8]",

    active_menu_class_style: "bg-[#f0f4f8]",

    icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden w-[24px] h-[24px] mr-2",

    icon_img_class_style: "w-full h-auto text-black",

    content_class_style: "flex items-center justify-start text-black text-[16px] text-start w-full"
}

const SideBarUIClassStyle: SideBarUIClassStyleInterface = {
    overlay_class_style: {
        wrapper_class_style: "fixed inset-0 opacity-0 pointer-events-none transition-opacity duration-300 ease-out z-[40]",

        overlay_class_style: "absolute w-full h-full bg-[#000000cc] cursor-pointer z-[41]",

        content_wrapper_class_style: "absolute w-full h-full p-0 m-0 flex items-start justify-start",
    },
    layout_section_class_style: {

        wrapper_class_style: "h-screen bg-[#02182e] shadow-lg w-48 z-[51] ease-out slide-left-enter-active rounded-r-[50px] z-[42]",

        section_1_wrapper_class_style:  "h-[15%] flex items-center justify-center overflow-hidden w-full border-gray-500 border-b p-2",

        section_2_wrapper_class_style: "h-[85%] overflow-x-hidden overflow-y-auto w-full p-0",

        section_3_wrapper_class_style: ""
    }
}

const SideBarLogoClassstyle: ImageRenderUIClassStylesInterface = {
    wrapper_class_style: "flex items-center justify-center cursor-pointer w-full h-full",

    image_class_style: "object-contain h-[56px]",

    content_wrapper_class_style: "hidden",

    loading_class_style: "",

    error_class_style: "",
}

const SideBarMenuListClassStyle: DropdownMenuUIClassStylesInterface = {

    wrapper_class_style: "w-full p-0 m-0 flex flex-col items-center justify-start",

    menu_class_style: "py-2 w-full border-b-2 border-[#6f7e8d6e] last:border-b-0",

    menu_item_wrapper_class_style: "w-full px-1 m-0",

    visible_class_style: "",
}

const SideBarNavMenuClassstyle: NavLinkUIClassStylesInterface = {
    wrapper_class_style: "flex items-center cursor-pointer p-2 rounded-lg flex justify-between items-center group/link w-full h-[50px] hover:bg-[#6f7e8d6e] my-1",

    active_menu_class_style: "bg-[#6f7e8d6e]",

    icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden  w-3/12 h-full p-2",

    icon_img_class_style: "w-[24px] h-[24px] text-white",

    content_class_style: "flex items-center justify-start text-white text-[16px] text-start w-full"
}


// const DashboardLayoutClassstyles: DashboardLayoutClassStylesInterface = {
const DashboardLayoutClassstyles: DashboardLayoutClassStylesInterface = {
    header_class_style: "fixed top-0 left-0 w-screen p-0 m-0 bg-white shadow-md z-[5] border-gray-100 border-b h-auto",

    main_class_style: "pt-[92px] pb-[60px] h-screen overflow-y-auto overflow-x-hidden",

    top_bar_class_style: TopBarClassStyles,

    hamburger_btn_class_style: HamburgerBtnClassStyle,

    topbar_logo_class_style: TopBarLogoClassstyle,

    member_avatar_class_style: MemberAvatarClassStyle,

    // content_class_style: ContentClassstyle,

    member_avatar_drodpwn_class_style: MemberAvatarDropdownClassStyle,

    member_avatar_dropdown_menu_list_class_style: MemberAvatarDropdownMenuListClassStyle,

    side_bar_class_style: SideBarUIClassStyle,

    side_bar_logo_class_style: SideBarLogoClassstyle,

    side_bar_menu_list_class_style: SideBarMenuListClassStyle,

    side_bar_menu_item_class_style: SideBarNavMenuClassstyle,
}

export default DashboardLayoutClassstyles;