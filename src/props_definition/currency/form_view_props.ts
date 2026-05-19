import { PropType } from "vue";
import { CurrencyRecordInterface } from "@/types/api_service_type";
import { FormViewClassStylesinterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

const CurrencyFormViewProps = {
    record: {
        type: Object as PropType<CurrencyRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesinterface>,
        default: () => ({})
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default CurrencyFormViewProps;
