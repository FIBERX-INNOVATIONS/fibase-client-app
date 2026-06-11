import { ProfileViewClassStylesInterface } from "@/ui_types/profile_view_type";

const ProfileViewClassStyles: ProfileViewClassStylesInterface = {
    wrapper_class_style:
        "py-6 px-[2%] space-y-6 w-full h-auto md:max-h-[470px] max-h-[700px] overflow-y-auto overflow-x-hidden",

    loading_wrapper_class_style:
        "p-6 w-full flex gap-2 items-center justify-center h-auto max-h-[500px] overflow-y-auto overflow-x-hidden",

    header_info_wrapper_class_style: "flex items-start gap-4 w-full",
    image_info_class_style: {
        wrapper_class_style: "w-full flex items-start gap-4",

        image_class_style: "w-14 h-14 rounded-lg object-contain bg-gray-300",

        content_wrapper_class_style: "flex flex-col",

        content_class_style: "",

        loading_class_style: "",

        error_class_style: ""
    },

    link_class_style: "text-blue-500 hover:text-blue-700 text-sm underline break-all flex gap-2",

    link_icon_class_style: "w-6 h-6 flex items-center justify-center",

    h3_class_style: "text-xl font-bold",

    icon_class_style: "w-4 h-4 flex items-center justify-center",

    small_bold_underlined_text_class_style:
        "text-sm uppercase font-black border-b border-gray-800 pb-1 w-full md:text-start text-center",

    small_bold_key_text_class_style: "text-sm font-black text-gray-900 uppercase",

    small_bold_value_text_class_style: "flex gap-2 text-xs font-bold text-black capitalize",

    p_class_style: "text-sm text-gray-400",

    description_class_style:
        "text-xs text-gray-500 mt-1 w-full truncate break-all whitespace-normal wrap-break-word text-wrap",

    member_avatar_img_class_style: "w-10 h-10 rounded-full object-contain bg-gray-300",

    member_name_class_style: "font-semibold uppercase text-sm",

    role_chip_wrapper_class_style: "flex flex-wrap gap-2",

    role_chip_class_style: "px-2 py-1 text-xs bg-gray-800 rounded-full text-white uppercase",

    grid_class_style: {
        two_col_responsive_grid_wrapper_class_style: "grid grid-cols-1 md:grid-cols-2 gap-4",
        grid_wrapper_class_style:
            "space-y-2 w-full flex md:items-start md:justify-start items-center justify-center flex-col py-4 px-2"
    }
};

export default ProfileViewClassStyles;
