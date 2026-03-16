
import { ListViewClassStylesInterface } from "@/ui_types/list_view_type";
import { BreadcrumbUIClassStylesInterface } from "@ui/version_3/ui_types/breadcrumb_ui_type";

const list_view_breadcrumb_class_styles: BreadcrumbUIClassStylesInterface = {
    wrapper_class_style: "w-full py-4 px-[2%] rounded-3xl bg-white shadow-lg border border-gray-100 my-2 h-[50px]",

    list_class_style: "inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse",

    item_wrapper_class_style: "inline-flex items-center",

    separator_class_style: "px-2 text-gray-400",

    nav_link_class_styles: {
        wrapper_class_style: "inline-flex items-center text-sm font-medium cursor-pointer text-gray-700 hover:text-blue-600",

        active_menu_class_style: "",

        icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden  w-4 h-4 me-2",

        icon_img_class_style: "w-full h-auto",

        content_class_style: "flex space-x-2 items-center justify-start text-md"
    }
};


const ListViewClassStyles: ListViewClassStylesInterface = { 
    wrapper_class_style: "w-full px-[5%]",
    list_view_breadcrumb_class_styles,

}

export default ListViewClassStyles;