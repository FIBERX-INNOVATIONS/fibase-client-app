import { PropType } from "vue";

import { MemberRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const MemberProfileDeleteViewProps = {
    record: {
        type: Object as PropType<MemberRecordInterface>,
        required: true
    },

    record_id: {
        type: [String, Number] as PropType<string | number>,
        default: ""
    },

    content_key: {
        type: String,
        required: true
    },

    on_delete_success: {
        type: Function as PropType<DeleteSuccessCallback<MemberRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<MemberRecordInterface>, any>;

export default MemberProfileDeleteViewProps;
