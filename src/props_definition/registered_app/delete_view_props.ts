import { PropType } from "vue";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const RegisteredAppDeleteViewProps = {
    record: {
        type: Object as PropType<RegisteredAppRecordInterface>,
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
        type: Function as PropType<DeleteSuccessCallback<RegisteredAppRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<RegisteredAppRecordInterface>, any>;

export default RegisteredAppDeleteViewProps;
