import { PropType } from "vue";

import { IdentityRecordInterface } from "@/types/api_service_type";

import { ProfileViewClassStylesInterface, ProfileViewPropsInterface } from "@/ui_types/profile_view_type";

const IdentityProfileViewProps = {
    record: {
        type: Object as PropType<IdentityRecordInterface>,
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
} satisfies Record<keyof ProfileViewPropsInterface<IdentityRecordInterface>, any>;

export default IdentityProfileViewProps;
