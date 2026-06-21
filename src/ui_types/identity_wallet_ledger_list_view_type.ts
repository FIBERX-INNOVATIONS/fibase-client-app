import { ListViewClassStylesInterface } from "@/ui_types/list_view_type";

export interface IdentityWalletLedgerListViewPropsInterface {
    wallet_public_id: string;
    identity_public_id?: string;
    class_styles?: ListViewClassStylesInterface;
}
