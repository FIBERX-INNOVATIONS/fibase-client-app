import { PropType } from "vue";

import {
    MemberDeviceDecisionConfirmActionType,
    MemberDeviceDecisionRecordInterface,
    MemberDeviceDecisionViewPropsInterface
} from "@/ui_types/member_profile_profile_view_type";

const MemberDeviceDecisionViewProps = {
    record: {
        type: Object as PropType<MemberDeviceDecisionRecordInterface>,
        default: () => ({})
    },

    record_id: {
        type: String,
        default: ""
    },

    content_key: {
        type: String,
        default: ""
    },

    on_delete_success: {
        type: Function as PropType<MemberDeviceDecisionViewPropsInterface["on_delete_success"]>,
        default: undefined
    },

    on_confirm_action: {
        type: Function as PropType<MemberDeviceDecisionConfirmActionType>,
        required: true
    },

    on_confirm_success: {
        type: Function as PropType<MemberDeviceDecisionViewPropsInterface["on_confirm_success"]>,
        default: undefined
    }
} satisfies Record<keyof MemberDeviceDecisionViewPropsInterface, any>;

export default MemberDeviceDecisionViewProps;
