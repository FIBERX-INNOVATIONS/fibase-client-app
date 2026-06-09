import { PropType } from "vue";

import { MemberRecordInterface } from "@/types/api_service_type";

import { FormViewClassStylesInterface, FormViewPropsInterface } from "@/ui_types/form_view_type";

const MemberProfileFormViewProps = {
    record: {
        type: Object as PropType<MemberRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof FormViewPropsInterface, any>;

export default MemberProfileFormViewProps;
