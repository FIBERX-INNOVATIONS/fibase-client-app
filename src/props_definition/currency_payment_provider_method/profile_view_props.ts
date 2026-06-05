import { PropType } from "vue";

import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewClassStylesInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

const CurrencyPaymentProviderMethodProfileViewProps = {
    record: {
        type: Object as PropType<CurrencyPaymentProviderMethodRecordInterface>,
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

export default CurrencyPaymentProviderMethodProfileViewProps;
