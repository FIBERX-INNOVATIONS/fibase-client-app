import { PropType } from "vue";

import { ListViewClassStylesInterface } from "@/ui_types/list_view_type";

import { IdentityWalletLedgerListViewPropsInterface } from "@/ui_types/identity_wallet_ledger_list_view_type";

const IdentityWalletLedgerListViewProps = {
    wallet_public_id: {
        type: String,
        default: ""
    },
    identity_public_id: {
        type: String,
        default: ""
    },
    class_styles: {
        type: Object as PropType<ListViewClassStylesInterface>,
        default: undefined
    }
} satisfies Record<keyof IdentityWalletLedgerListViewPropsInterface, any>;

export default IdentityWalletLedgerListViewProps;
