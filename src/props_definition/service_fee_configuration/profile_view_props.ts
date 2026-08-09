import type { PropType } from "vue";

import type { ProfileViewClassStylesInterface, ProfileViewPropsInterface } from "@/ui_types/profile_view_type";

import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

const ServiceFeeConfigurationProfileViewProps = {
    record: {
        type: Object as PropType<ServiceFeeConfigurationRecordInterface>,
        default: () => {
            return {};
        }
    },

    record_id: {
        type: String,
        default: ""
    },

    class_styles: {
        type: Object as PropType<Partial<ProfileViewClassStylesInterface>>,
        default: () => {
            return {};
        }
    }
} satisfies Record<keyof ProfileViewPropsInterface, any>;

export default ServiceFeeConfigurationProfileViewProps;
