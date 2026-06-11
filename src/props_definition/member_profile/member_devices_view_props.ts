import { PropType } from "vue";

import {
    MemberDevicesViewPropsInterface,
    MemberProfileProfileViewClassStylesInterface
} from "@/ui_types/member_profile_profile_view_type";

const MemberDevicesViewProps = {
    member_public_id: {
        type: String,
        default: ""
    },

    class_styles: {
        type: Object as PropType<Partial<MemberProfileProfileViewClassStylesInterface>>,
        default: () => ({})
    }
} satisfies Record<keyof MemberDevicesViewPropsInterface, any>;

export default MemberDevicesViewProps;
