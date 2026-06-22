import { PropType } from "vue";

import { TransactionRecordInterface } from "@/types/api_service_type";

import { ProfileViewClassStylesInterface, ProfileViewPropsInterface } from "@/ui_types/profile_view_type";

const TransactionProfileViewProps = {
    record: {
        type: Object as PropType<TransactionRecordInterface>,
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
} satisfies Record<keyof ProfileViewPropsInterface<TransactionRecordInterface>, any>;

export default TransactionProfileViewProps;
