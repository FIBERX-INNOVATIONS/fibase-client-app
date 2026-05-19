import { PropType } from "vue";
import { CurrencyRecordInterface, RegisteredAppPreviewRecordInterface } from "@/types/api_service_type";
import { FormViewClassStylesinterface, AssignCurrencyFormViewPropsInterface } from "@/ui_types/form_view_type";

const AssignCurrencyFormViewProps = {
    app_id: {
        type: String,
        require: false,
        default: ""
    },

    app: {
        type: Object as PropType<RegisteredAppPreviewRecordInterface>,
        require: false,
        default: () => ({})
    },

    currency_codes: {
        type: Array as PropType<string[]>,
        require: false,
        default: () => []
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesinterface>,
        default: () => ({})
    }
} satisfies Record<keyof AssignCurrencyFormViewPropsInterface, any>;

export default AssignCurrencyFormViewProps;
