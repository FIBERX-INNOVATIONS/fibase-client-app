import { PropType } from "vue";

import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import { FormViewClassStylesInterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

const PaymentProviderFormViewProps = {
    record: {
        type: Object as PropType<PaymentProviderRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default PaymentProviderFormViewProps;
