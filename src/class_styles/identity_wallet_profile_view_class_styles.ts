import IdentityProfileViewClassStyles from "@/class_styles/identity_profile_view_class_styles";

import { IdentityProfileViewClassStylesInterface } from "@/ui_types/identity_profile_view_type";

const IdentityWalletProfileViewClassStyles: IdentityProfileViewClassStylesInterface = {
    ...IdentityProfileViewClassStyles,

    wrapper_class_style:
        "w-full space-y-5 px-[2%] py-5 max-h-[720px] md:max-h-[620px] overflow-y-auto overflow-x-hidden bg-gray-100",

    profile_header_class_style:
        "flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-lg",

    association_grid_class_style: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",

    association_card_class_style: "rounded-2xl border border-gray-100 bg-white p-5 shadow-lg space-y-3"
};

export default IdentityWalletProfileViewClassStyles;
