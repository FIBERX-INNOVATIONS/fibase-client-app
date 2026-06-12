import { PropType } from "vue";

import { RoleRecordInterface } from "@/types/api_service_type";

import { ProfileViewClassStylesInterface, ProfileViewPropsInterface } from "@/ui_types/profile_view_type";

const AccessControlProfileViewProps = {
    record: {
        type: Object as PropType<RoleRecordInterface>,
        default: () => ({})
    },

    record_id: {
        type: String,
        default: ""
    },

    class_styles: {
        type: Object as PropType<Partial<ProfileViewClassStylesInterface>>,
        default: () => ({})
    }
} satisfies Record<keyof ProfileViewPropsInterface, any>;

export default AccessControlProfileViewProps;
