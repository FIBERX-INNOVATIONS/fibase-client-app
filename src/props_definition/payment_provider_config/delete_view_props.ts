import { PropType } from "vue";

import { PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const PaymentProviderConfigDeleteViewProps = {
    record: {
        type: Object as PropType<PaymentProviderConfigRecordInterface>,
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
        type: Function as PropType<DeleteSuccessCallback<PaymentProviderConfigRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<PaymentProviderConfigRecordInterface>, any>;

export default PaymentProviderConfigDeleteViewProps;
