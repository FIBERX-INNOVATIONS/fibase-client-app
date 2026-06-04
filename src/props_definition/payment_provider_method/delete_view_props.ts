import { PropType } from "vue";

import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const PaymentProviderMethodDeleteViewProps = {
    record: {
        type: Object as PropType<PaymentProviderMethodRecordInterface>,
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
        type: Function as PropType<DeleteSuccessCallback<PaymentProviderMethodRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<PaymentProviderMethodRecordInterface>, any>;

export default PaymentProviderMethodDeleteViewProps;
