import { PropType } from "vue";

import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import { FormViewClassStylesInterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

const PaymentMethodFormViewProps = {
    record: {
        type: Object as PropType<PaymentMethodRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default PaymentMethodFormViewProps;
