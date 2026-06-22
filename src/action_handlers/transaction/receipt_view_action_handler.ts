import { GlobalEventTypes } from "@/types/global_events_type";

import {
    TransactionReceiptViewComponentsInterface,
    TransactionReceiptViewComputedDataInterface,
    TransactionReceiptViewPropsInterface,
    TransactionReceiptViewStateDataInterface
} from "@/ui_types/transaction_receipt_view_type";

import TransactionAPIService from "@/api_services/transaction_api_service";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import type TransactionReceiptViewController from "@/controllers/transaction/receipt_view_controller";

class TransactionReceiptViewActionHandler extends BaseActionHandler<
    TransactionReceiptViewPropsInterface,
    TransactionReceiptViewStateDataInterface,
    TransactionReceiptViewComputedDataInterface,
    TransactionReceiptViewComponentsInterface,
    GlobalEventTypes
> {
    private search_timer: ReturnType<typeof setTimeout> | null = null;

    protected override controller: TransactionReceiptViewController;

    // Method to initialise receipt actions against the receipt view controller.
    constructor(controller: TransactionReceiptViewController) {
        super(controller, "transaction_receipt_view_action_handler");
        this.controller = controller;
    }

    // Method to fetch one page of receipts using the current search query.
    public fetchReceipts = async (page = this.controller.state_refs.current_page.value): Promise<void> => {
        const transaction_id = this.controller.props.transaction_id;

        if (!transaction_id || !this.controller.computed_refs.can_view_receipts.value) return;

        this.setState("is_loading", true);

        try {
            const result = await TransactionAPIService.getTransactionReceiptList(transaction_id, {
                page,
                limit: this.controller.state_refs.limit.value,
                filters: { search: this.controller.state_refs.search_query.value }
            });

            if (!result || result.status === "logout") {
                await this.controller.router.push("/logout");
                return;
            }

            if (result.status !== "success") {
                StatusAlertTriggerUtil.triggerAlert("error", result.msg || "error_occurred");
                return;
            }

            this.setState("receipts", result.data?.records ?? []);
            this.setState("current_page", result.data?.current_page ?? page);
            this.setState("total_pages", result.data?.total_pages ?? 0);
            this.setState("total_items", result.data?.total_items ?? 0);
            this.controller.updatePaginationProps();
        } catch (error: unknown) {
            this.logger.error("Failed to fetch transaction receipts", { error });
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred");
        } finally {
            this.setState("is_loading", false);
        }
    };

    // Method to fetch the selected receipt page.
    public handlePageChange = async (page: number): Promise<void> => {
        await this.fetchReceipts(page);
    };

    // Method to apply receipt search immediately on Enter.
    public handleSearchEnter = async (): Promise<void> => {
        await this.fetchReceipts(1);
    };

    // Method to debounce receipt search while the member types.
    public handleSearchQueryChanged = (): void => {
        if (this.search_timer) clearTimeout(this.search_timer);

        this.search_timer = setTimeout(() => void this.fetchReceipts(1), 450);
    };

    // Method to open a rendered receipt file in a separate browser tab.
    public handleViewReceiptClicked = async (receipt_url?: string | null): Promise<void> => {
        if (!receipt_url) return;

        const receipt_window = window.open(receipt_url, "_blank");
        if (receipt_window) receipt_window.opener = null;
    };

    // Method to clear the pending receipt search debounce timer.
    public cleanup(): void {
        if (this.search_timer) clearTimeout(this.search_timer);
        this.search_timer = null;
    }
}

export default TransactionReceiptViewActionHandler;
