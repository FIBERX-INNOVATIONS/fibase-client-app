import { TransactionReceiptViewPropsInterface } from "@/ui_types/transaction_receipt_view_type";

const TransactionReceiptViewProps = {
    transaction_id: {
        type: String,
        default: ""
    }
} satisfies Record<keyof TransactionReceiptViewPropsInterface, any>;

export default TransactionReceiptViewProps;
