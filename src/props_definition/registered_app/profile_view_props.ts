import { PropType } from "vue";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewPropsInterface
} from "../../ui_types/profile_view_type";





const RegisteredAppProfileViewProps = {

    record: {
        type: Object as PropType<RegisteredAppRecordInterface>,
        default: () => ({})
    },

    record_id: {
        type: String,
        default: ""
    }

} satisfies Record<keyof ProfileViewPropsInterface, any>;

export default RegisteredAppProfileViewProps;