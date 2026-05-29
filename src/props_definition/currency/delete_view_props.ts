import { PropType } from "vue";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { DeleteSuccessCallback, DeleteViewPropsInterface } from "@/ui_types/delete_view_type";

const CurrencyDeleteViewProps = {
    record: {
        type: Object as PropType<CurrencyRecordInterface>,
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
        type: Function as PropType<DeleteSuccessCallback<CurrencyRecordInterface>>,
        default: undefined
    }
} satisfies Record<keyof DeleteViewPropsInterface<CurrencyRecordInterface>, any>;

export default CurrencyDeleteViewProps;
