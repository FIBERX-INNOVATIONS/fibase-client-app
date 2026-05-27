import { PropType } from "vue";
import { CurrencyRecordInterface } from "@/types/api_service_type";
import { FormViewClassStylesInterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

const CurrencyFormViewProps = {
    record: {
        type: Object as PropType<CurrencyRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default CurrencyFormViewProps;
