import { PropType } from "vue";

import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import { FormViewClassStylesInterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

const PaymentProviderMethodFormViewProps = {
    record: {
        type: Object as PropType<PaymentProviderMethodRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default PaymentProviderMethodFormViewProps;
