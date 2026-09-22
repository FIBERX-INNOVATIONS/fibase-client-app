import type { Router } from "vue-router";

import type { DepositCurrencyInterface } from "@ui/version_3/types/deposit_flow_type";

import type { DepositFlowUIPropsInterface } from "@ui/version_3/ui_types/deposit_flow_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import MyWalletDepositClassStyles from "@/class_styles/my_wallet_deposit_class_styles";

import MyWalletDepositActionHandler from "@/action_handlers/my_wallet/deposit_action_handler";

import DepositFlowUIPropsBuilder from "@ui/version_3/props_builder/deposit_flow_ui_props_builder";

class MyWalletDepositController {
    public readonly action_handler: MyWalletDepositActionHandler;
    // Method to connect application deposit props to their API and persistence callbacks.
    constructor(router: Router) {
        this.action_handler = new MyWalletDepositActionHandler(router);
    }

    // Method to provide every required deposit content label.
    private getDefaultContentObject(): DepositFlowUIPropsInterface["content_props"] {
        return {
            title_text: "Deposit",
            subtitle_text: "Choose how you would like to fund your wallet.",
            currency_label_text: "Currency",
            amount_label_text: "Amount",
            description_label_text: "Description (required)",
            next_btn_text: "Continue",
            back_btn_text: "Back",
            empty_text: "No payment options are available for this currency and amount.",
            invalid_text: "Choose a currency, enter a positive amount within its decimal precision, and add a description.",
            invalid_amount_input_text: "Enter a positive {{currency_code}} amount with no more than {{precision}} decimal places.",
            fee_label_text: "Total fees",
            net_label_text: "Net amount",
            reference_label_text: "Transaction reference",
            review_note_text: "No payment has been taken. You can go back to edit your deposit details.",
            search_text: "Search currencies",
            details_title_text: "Deposit details",
            details_subtitle_text: "Choose a currency and enter the amount you want to add.",
            provider_subtitle_text: "Select a provider for your deposit.",
            method_subtitle_text: "Choose how you would like to pay.",
            review_subtitle_text: "Check your deposit details and fees.",
            provider_title_text: "Choose a payment provider",
            method_title_text: "Choose a payment method",
            review_title_text: "Review your deposit",
            loading_text: "Preparing your deposit\u2026",
            retry_text: "Try again",
            request_error_text: "We could not prepare this deposit. Please try again.",
            storage_error_text: "Your draft could not be saved. Allow browser storage and try again.",
            update_unavailable_text: "This draft could not be changed safely. Restore its submitted details or reopen the deposit to reload it.",
            provisioning_unavailable_text: "This provider needs an account setup service that is not available yet.",
            selection_required_text: "Select a payment option to continue."
        };
    }

    // Method to build the reusable flow using Fibase API and encrypted persistence adapters.
    public buildProps(currencies: DepositCurrencyInterface[], currency_code: string): DepositFlowUIPropsInterface {
        const content_manager = ContentManagerUtil.getInstance();
        const default_content_props = this.getDefaultContentObject();

        const provider_fee_label_text =
            content_manager.get<string>("content_resource.my_wallet_view_ui.provider_fee_label_text", "Provider fee") ?? "Provider fee";

        const fetched_content_props = content_manager.get<Partial<DepositFlowUIPropsInterface["content_props"]>>(
            "content_resource.my_wallet_view_ui.deposit_flow",
            {}
        );
        const content_props: DepositFlowUIPropsInterface["content_props"] = { ...default_content_props, ...fetched_content_props };

        return DepositFlowUIPropsBuilder.getReactivePropsObject(
            "MyWalletDepositFlow",
            {
                storage: this.action_handler.getStorage(),
                action_props: this.action_handler.getActions(provider_fee_label_text)
            },
            {
                currencies,
                initial_values: { currency_code, amount: "", description: "" },
                description_required: true,
                class_styles: MyWalletDepositClassStyles,
                content_props
            }
        );
    }
}
export default MyWalletDepositController;
