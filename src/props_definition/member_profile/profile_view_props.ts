import { PropType } from "vue";

import { MemberRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewClassStylesInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

const MemberProfileProfileViewProps = {
    record: {
        type: Object as PropType<MemberRecordInterface>,
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

export default MemberProfileProfileViewProps;
