import { PropType } from "vue";

import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const PaymentMethodDeleteViewProps = {
    record: {
        type: Object as PropType<PaymentMethodRecordInterface>,
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
        type: Function as PropType<DeleteSuccessCallback<PaymentMethodRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<PaymentMethodRecordInterface>, any>;

export default PaymentMethodDeleteViewProps;
