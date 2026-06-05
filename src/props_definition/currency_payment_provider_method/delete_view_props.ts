import { PropType } from "vue";

import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const CurrencyPaymentProviderMethodDeleteViewProps = {
    record: {
        type: Object as PropType<CurrencyPaymentProviderMethodRecordInterface>,
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
        type: Function as PropType<
            DeleteSuccessCallback<CurrencyPaymentProviderMethodRecordInterface>
        >,
        default: undefined
    }
} satisfies Record<
    keyof DeleteViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>,
    any
>;

export default CurrencyPaymentProviderMethodDeleteViewProps;
