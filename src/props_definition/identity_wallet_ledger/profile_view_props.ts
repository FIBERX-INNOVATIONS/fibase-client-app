import { PropType } from "vue";

import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import { ProfileViewClassStylesInterface } from "@/ui_types/profile_view_type";

import { IdentityWalletLedgerProfileViewPropsInterface } from "@/ui_types/identity_wallet_ledger_profile_view_type";

const IdentityWalletLedgerProfileViewProps = {
    record: {
        type: Object as PropType<IdentityWalletLedgerRecordInterface>,
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
} satisfies Record<keyof IdentityWalletLedgerProfileViewPropsInterface, any>;

export default IdentityWalletLedgerProfileViewProps;
