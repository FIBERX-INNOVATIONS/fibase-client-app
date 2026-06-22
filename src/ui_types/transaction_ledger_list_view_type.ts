import { ListViewClassStylesInterface } from "@/ui_types/list_view_type";

export interface TransactionLedgerListViewPropsInterface {
    transaction_public_id: string;
    class_styles?: ListViewClassStylesInterface;
}
