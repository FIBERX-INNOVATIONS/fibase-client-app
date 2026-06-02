import { PropType } from "vue";

import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const PaymentProviderDeleteViewProps = {
    record: {
        type: Object as PropType<PaymentProviderRecordInterface>,
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
        type: Function as PropType<DeleteSuccessCallback<PaymentProviderRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<PaymentProviderRecordInterface>, any>;

export default PaymentProviderDeleteViewProps;
