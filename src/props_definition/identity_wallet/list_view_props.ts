import { PropType } from "vue";

import { IdentityWalletListViewPropsInterface } from "@/ui_types/identity_wallet_list_view_type";

import { ListViewClassStylesInterface } from "@/ui_types/list_view_type";

const IdentityWalletListViewProps = {
    identity_public_id: {
        type: String,
        default: ""
    },
    class_styles: {
        type: Object as PropType<ListViewClassStylesInterface>,
        default: undefined
    }
} satisfies Record<keyof IdentityWalletListViewPropsInterface, any>;

export default IdentityWalletListViewProps;
