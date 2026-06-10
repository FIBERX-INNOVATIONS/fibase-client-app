import { PropType } from "vue";

import { RegisteredAppStatusUpdateResponseInterface } from "@/types/api_service_type";

import {
    ActivationCredentialsViewClassStylesInterface,
    ActivationCredentialsViewPropsInterface
} from "@/ui_types/activation_credentials_view_type";

const RegisteredAppActivationCredentialsViewProps = {
    activation_data: {
        type: Object as PropType<RegisteredAppStatusUpdateResponseInterface>,
        required: true
    },

    class_styles: {
        type: Object as PropType<Partial<ActivationCredentialsViewClassStylesInterface>>,
        default: () => ({})
    }
} satisfies Record<keyof ActivationCredentialsViewPropsInterface, any>;

export default RegisteredAppActivationCredentialsViewProps;
