import IdentityProfileViewClassStyles from "@/class_styles/identity_profile_view_class_styles";

import { IdentityProfileViewClassStylesInterface } from "@/ui_types/identity_profile_view_type";

const TransactionProfileViewClassStyles: IdentityProfileViewClassStylesInterface = {
    ...IdentityProfileViewClassStyles,

    tabs_class_styles: {
        ...IdentityProfileViewClassStyles.tabs_class_styles,
        tabs_list_class_style: "grid grid-cols-2 gap-2 border-b border-gray-100 w-full"
    }
};

export default TransactionProfileViewClassStyles;
