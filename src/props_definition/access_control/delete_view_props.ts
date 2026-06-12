import { PropType } from "vue";

import { RoleRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const AccessControlDeleteViewProps = {
    record: {
        type: Object as PropType<RoleRecordInterface>,
        required: true
    },

    record_id: {
        type: [String, Number] as PropType<string>,
        default: ""
    },

    content_key: {
        type: String,
        required: true
    },

    on_delete_success: {
        type: Function as PropType<DeleteSuccessCallback<RoleRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<RoleRecordInterface>, any>;

export default AccessControlDeleteViewProps;
