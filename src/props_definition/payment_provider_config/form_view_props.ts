import { PropType } from "vue";

import { PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import { FormViewClassStylesInterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

const PaymentProviderConfigFormViewProps = {
    record: {
        type: Object as PropType<PaymentProviderConfigRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default PaymentProviderConfigFormViewProps;
