import { PropType } from "vue";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { AppCurrencyActionSuccessCallback } from "@/ui_types/form_view_type";

import {
    AppCurrencyDecisionActionType,
    AppCurrencyDecisionPromptRecordInterface,
    AppCurrencyDecisionViewPropsInterface,
    DeleteSuccessCallback
} from "@/ui_types/delete_view_type";

const AppCurrencyDecisionViewProps = {
    record: {
        type: Object as PropType<AppCurrencyDecisionPromptRecordInterface>,
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
        type: Function as PropType<DeleteSuccessCallback<AppCurrencyDecisionPromptRecordInterface>>,
        default: undefined
    },

    action: {
        type: String as PropType<AppCurrencyDecisionActionType>,
        required: true
    },

    app_id: {
        type: String,
        required: true
    },

    currency_codes: {
        type: Array as PropType<string[]>,
        required: true
    },

    currency_record: {
        type: Object as PropType<CurrencyRecordInterface>,
        default: undefined
    },

    on_success: {
        type: Function as PropType<AppCurrencyActionSuccessCallback>,
        default: undefined
    }
} satisfies Record<keyof AppCurrencyDecisionViewPropsInterface, any>;

export default AppCurrencyDecisionViewProps;
