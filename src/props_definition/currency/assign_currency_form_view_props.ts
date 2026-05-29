import { PropType } from "vue";
import {
    CurrencyRecordInterface,
    RegisteredAppPreviewRecordInterface
} from "@/types/api_service_type";
import {
    AppCurrencyActionSuccessCallback,
    AppCurrencyFormActionType,
    FormViewClassStylesInterface,
    AssignCurrencyFormViewPropsInterface
} from "@/ui_types/form_view_type";

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

    action: {
        type: String as PropType<AppCurrencyFormActionType>,
        require: false,
        default: "assign"
    },

    content_key: {
        type: String,
        require: false,
        default: ""
    },

    record: {
        type: Object as PropType<CurrencyRecordInterface>,
        require: false,
        default: undefined
    },

    on_success: {
        type: Function as PropType<AppCurrencyActionSuccessCallback>,
        require: false,
        default: undefined
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof AssignCurrencyFormViewPropsInterface, any>;

export default AssignCurrencyFormViewProps;
