import { markRaw } from "vue";

import type { GlobalEventTypes } from "@/types/global_events_type";

import type { APIResponseInterface } from "@ui/version_3/types/util_type";

import type { PaginatedResponseResultInterface } from "@/types/api_service_type";

import type { InputValue, ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import type {
    MyWalletViewPropsInterface,
    MyWalletViewStateInterface,
    MyWalletViewComputedInterface,
    MyWalletViewComponentsInterface
} from "@/ui_types/my_wallet_view_type";

import MyWalletAPIService from "@/api_services/my_wallet_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import type MyWalletViewController from "@/controllers/my_wallet/view_controller";

import MyWalletDepositController from "@/controllers/my_wallet/deposit_controller";

import DepositFlowUI from "@ui/version_3/components/DepositFlowUI/BaseDepositFlowUI.vue";

class MyWalletViewActionHandler extends BaseActionHandler<
    MyWalletViewPropsInterface,
    MyWalletViewStateInterface,
    MyWalletViewComputedInterface,
    MyWalletViewComponentsInterface,
    GlobalEventTypes
> {
    private wallet_request = 0;

    private transaction_request = 0;

    private is_disposed = false;

    protected override controller: MyWalletViewController;

    // Method to connect personal wallet interactions to the owning controller.
    constructor(controller: MyWalletViewController) {
        super(controller, "my_wallet_view_action_handler");

        this.controller = controller;
    }

    // Method to validate API responses and route expired sessions through logout.
    private async getResponseData<T>(response: APIResponseInterface<T>): Promise<T> {
        if (response?.status === "logout") {
            await this.controller.router.push("/logout");
            throw new Error("Session expired");
        }
        if (response?.status !== "success" || !response.data) {
            throw new Error("Wallet request failed");
        }
        return response.data;
    }

    // Method to collect all lookup pages so currencies and wallets are never silently truncated.
    private async fetchLookupPages<T>(
        fetch_page: (page: number) => Promise<APIResponseInterface<PaginatedResponseResultInterface<T[]>>>,
        request_id: number
    ): Promise<T[]> {
        const records: T[] = [];
        let page = 0;
        let total_pages = 1;
        while (page < total_pages && !this.is_disposed && request_id === this.wallet_request) {
            const data = await this.getResponseData(await fetch_page(page));
            records.push(...data.records);
            total_pages = data.total_pages;
            page += 1;
        }
        return records;
    }

    // Method to fetch the member's currency and wallet catalogues without creating wallets.
    public fetchWallets = async (): Promise<void> => {
        if (!this.controller.can_view_currencies) {
            this.setState("is_loading_wallets", false);
            return;
        }

        const request_id = ++this.wallet_request;

        this.setState("is_loading_wallets", true);
        this.setState("has_wallet_error", false);

        try {
            const [assignments, wallets] = await Promise.all([
                this.fetchLookupPages((page) => {
                    return MyWalletAPIService.getCurrencies(page);
                }, request_id),

                this.fetchLookupPages((page) => {
                    return MyWalletAPIService.getWallets(page);
                }, request_id)
            ]);

            if (this.is_disposed || request_id !== this.wallet_request) {
                return;
            }

            const currencies = assignments.flatMap((assignment) => {
                return assignment.currency ? [assignment.currency] : [];
            });

            const default_currency = assignments.find((assignment) => {
                return assignment.is_default && assignment.currency;
            })?.currency?.code;

            this.setState("currencies", currencies);
            this.setState("wallets", wallets);

            const selected_currency = this.controller.state_refs.selected_currency.value;
            const is_selected_currency = currencies.some((currency) => {
                return currency.code === selected_currency;
            });

            if (!is_selected_currency) {
                this.setState("selected_currency", default_currency ?? currencies[0]?.code ?? "");
            }
        } catch {
            if (!this.is_disposed && request_id === this.wallet_request) {
                this.setState("has_wallet_error", true);
                StatusAlertTriggerUtil.triggerAlert("error", "my_wallet_load_failed_text");
            }
        } finally {
            if (!this.is_disposed && request_id === this.wallet_request) {
                this.setState("is_loading_wallets", false);
            }
        }
    };

    // Method to switch the displayed currency without filtering the transaction feed.
    public handleCurrencyChange = async (_event?: Event, input_value?: InputValue): Promise<ActionMethodRetrunInterface> => {
        const currency_code = String(input_value ?? "");

        const is_valid_currency = this.controller.state_refs.currencies.value.some((currency) => {
            return currency.code === currency_code;
        });

        if (is_valid_currency) {
            this.setState("selected_currency", currency_code);
        }

        return { status: true, msg: "" };
    };

    // Method to load a display page using the API's zero-based pagination.
    public handlePageChange = async (page: number): Promise<void> => {
        if (!this.controller.can_view_transactions) {
            this.setState("is_loading_transactions", false);
            return;
        }

        const request_id = ++this.transaction_request;

        this.setState("is_loading_transactions", true);
        this.setState("has_transaction_error", false);

        try {
            const data = await this.getResponseData(await MyWalletAPIService.getTransactions(page - 1));

            if (this.is_disposed || request_id !== this.transaction_request) {
                return;
            }

            this.setState("transactions", data.records);
            this.setState("current_page", page);
            this.setState("total_pages", data.total_pages);
            this.setState("total_items", data.total_items);
        } catch {
            if (!this.is_disposed && request_id === this.transaction_request) {
                this.setState("has_transaction_error", true);
                StatusAlertTriggerUtil.triggerAlert("error", "my_wallet_transactions_load_failed_text");
            }
        } finally {
            if (!this.is_disposed && request_id === this.transaction_request) {
                this.setState("is_loading_transactions", false);
            }
        }
    };

    // Method to open the shared deposit flow with the selected wallet currency.
    public openDeposit(): void {
        if (!this.controller.can_deposit) {
            return;
        }

        const deposit_controller = new MyWalletDepositController(this.controller.router);

        this.controller.event_bus?.emit("open_modal", {
            content_key: "content_resource.my_wallet_view_ui.modals_ui.deposit_modal_ui",
            body_component: markRaw(DepositFlowUI),
            body_props: deposit_controller.buildProps(this.controller.state_refs.currencies.value, this.controller.state_refs.selected_currency.value)
        });
    }

    // Method to invalidate requests when the wallet view leaves the page.
    public cleanup(): void {
        this.is_disposed = true;
        this.wallet_request += 1;
        this.transaction_request += 1;
    }
}
export default MyWalletViewActionHandler;
