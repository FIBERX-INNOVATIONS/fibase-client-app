import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import { TransactionLedgerListViewFiltersInterface } from "@/types/list_view_filter_type";

import TransactionLedgerAPIService from "@/api_services/transaction_ledger_api_service";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import BaseListViewActionHandler from "@/action_handlers/base_classes/base_list_view_action_handler";

import type TransactionLedgerListViewController from "@/controllers/transaction_ledger/list_view_controller";

class TransactionLedgerListViewActionHandler extends BaseListViewActionHandler<
    IdentityWalletLedgerRecordInterface,
    "record_key",
    TransactionLedgerListViewFiltersInterface
> {
    // Method to initialise transaction-ledger actions with the transaction-scoped list request.
    constructor(controller: TransactionLedgerListViewController) {
        super(
            controller as BaseListViewController<IdentityWalletLedgerRecordInterface, "record_key">,
            "transaction_ledger_list_view_action_handler",
            {},
            (params) => {
                return TransactionLedgerAPIService.getTransactionLedgerList(controller.transaction_public_id, params);
            }
        );
    }
}

export default TransactionLedgerListViewActionHandler;
