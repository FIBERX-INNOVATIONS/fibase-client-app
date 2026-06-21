import { PropType } from "vue";

import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import { ProfileViewClassStylesInterface } from "@/ui_types/profile_view_type";

import { IdentityWalletProfileViewPropsInterface } from "@/ui_types/identity_wallet_profile_view_type";

const IdentityWalletProfileViewProps = {
    record: {
        type: Object as PropType<IdentityWalletRecordInterface>,
        default: () => ({})
    },
    record_id: {
        type: String,
        default: ""
    },
    identity_public_id: {
        type: String,
        default: ""
    },
    class_styles: {
        type: Object as PropType<Partial<ProfileViewClassStylesInterface>>,
        default: () => ({})
    }
} satisfies Record<keyof IdentityWalletProfileViewPropsInterface, any>;

export default IdentityWalletProfileViewProps;
