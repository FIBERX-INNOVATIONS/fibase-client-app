import ProfileViewClassStyles from "@/class_styles/profile_view_class_styles";

import { ProfileViewClassStylesInterface } from "@/ui_types/profile_view_type";

const AccessControlProfileViewClassStyles: ProfileViewClassStylesInterface = {
    ...ProfileViewClassStyles,
    header_icon_tile_class_style: "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-900 p-3 text-white",
    active_status_class_style: "text-green-500",
    inactive_status_class_style: "text-gray-500",
    inactive_status_icon_class_style: "text-gray-400"
};

export default AccessControlProfileViewClassStyles;
