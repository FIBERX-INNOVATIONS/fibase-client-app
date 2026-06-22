import { PropType } from "vue";

import { ListViewClassStylesInterface } from "@/ui_types/list_view_type";

import { TransactionLedgerListViewPropsInterface } from "@/ui_types/transaction_ledger_list_view_type";

const TransactionLedgerListViewProps = {
    transaction_public_id: {
        type: String,
        default: ""
    },
    class_styles: {
        type: Object as PropType<ListViewClassStylesInterface>,
        default: undefined
    }
} satisfies Record<keyof TransactionLedgerListViewPropsInterface, any>;

export default TransactionLedgerListViewProps;
