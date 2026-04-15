import { PropType } from "vue";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    FormViewClassStylesinterface,
    FormViewPropsInterface
} from "../../ui_types/form_view_type";





const RegisteredAppFormViewProps = {

    record: {
        type: Object as PropType<RegisteredAppRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesinterface>,
        default: () => ({})
    },

} satisfies Record<keyof FormViewPropsInterface, any>;

export default RegisteredAppFormViewProps;