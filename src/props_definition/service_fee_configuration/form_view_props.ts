import type { PropType } from "vue";

import type { FormViewClassStylesInterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

const ServiceFeeConfigurationFormViewProps = {
    record: {
        type: Object as PropType<ServiceFeeConfigurationRecordInterface>,
        default: () => {
            return {};
        }
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => {
            return {};
        }
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default ServiceFeeConfigurationFormViewProps;
