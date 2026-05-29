import { PropType } from "vue";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewClassStylesInterface,
    ProfileViewPropsInterface
} from "../../ui_types/profile_view_type";

const CurrencyProfileViewProps = {
    record: {
        type: Object as PropType<CurrencyRecordInterface>,
        default: () => ({})
    },

    record_id: {
        type: String,
        default: ""
    },

    class_styles: {
        type: Object as PropType<Partial<ProfileViewClassStylesInterface>>,
        default: () => ({})
    }
} satisfies Record<keyof ProfileViewPropsInterface, any>;

export default CurrencyProfileViewProps;
