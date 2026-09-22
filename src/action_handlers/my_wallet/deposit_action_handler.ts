import type { Router } from "vue-router";

import { CSRF_TOKEN_FOR } from "@/configs/csrf_config";

import { API_CLIENT_CONFIG } from "@/configs/api_client_config";

import type { APIResponseInterface } from "@ui/version_3/types/util_type";

import type { InternalStorageSchemaType } from "@/configs/storage_schema_config";

import type {
    DepositActionsInterface,
    DepositContextInterface,
    TransactionIntentInterface,
    DepositStorageInterface,
    DepositDetailsInterface,
    PaymentOptionInterface
} from "@ui/version_3/types/deposit_flow_type";

import type {
    MyWalletIntentRecordType,
    MyWalletIntentInputInterface,
    MyWalletPayemntProvicerRecordInterface,
    MyWalletPaymentProviderMethodOptionsInterface
} from "@/types/my_wallet_deposit_type";

import AuthAPIService from "@/api_services/auth_api_service";

import MyWalletAPIService from "@/api_services/my_wallet_api_service";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import DecimalAmountUtil from "@ui/version_3/utils/decimal_amount_util";

import LocalStorageManagerUtil from "@ui/version_3/utils/local_storage_manager_util";

import DepositIntentRejectedError from "@ui/version_3/utils/deposit_intent_rejected_error";
import { FEE_TYPES } from "@/configs/my_wallet_config";

class MyWalletDepositActionHandler {
    private readonly versions = new Map<string, number>();

    private readonly member_id = MemberAuthenticatorUtil.getLoggedInMember()?.public_id;

    // Method to bind deposit callbacks to the current authenticated member.
    constructor(private readonly router: Router) {}

    // Method to handle API failures consistently with the surrounding application.
    private async unwrap<T>(response: APIResponseInterface<T>): Promise<T> {
        if (response.status === "logout") {
            await this.router.push("/logout");
            throw new Error("Session expired");
        }

        if (response.status !== "success" || !response.data) {
            StatusAlertTriggerUtil.triggerAlert("error", response.msg);

            if ([400, 401, 403, 404, 419, 422].includes(response.full_response?.status ?? 0)) {
                throw new DepositIntentRejectedError("Deposit request rejected");
            }

            throw new Error("Deposit request failed");
        }
        return response.data;
    }
    // Method to adapt server amounts without rounding or inferring unresolved fees.
    private normalize(record: MyWalletIntentRecordType): TransactionIntentInterface {
        if (record.transaction_type !== "deposit" || record.status !== "intent") {
            throw new Error("Transaction is not an editable deposit");
        }

        if (!record.currency?.code || record.fee_amount == null || record.net_amount == null) {
            throw new Error("Incomplete intent summary");
        }

        if (Number.isInteger(record.intent_version)) {
            this.versions.set(record.public_id, record.intent_version);
        }

        return {
            public_id: record.public_id,
            currency_code: record.currency.code,
            amount: this.formatAmount(record.amount, record.currency.precision),
            description: record.description ?? "",
            fee_amount: this.formatAmount(record.fee_amount, record.currency.precision),
            net_amount: this.formatAmount(record.net_amount, record.currency.precision),
            provider_id: record.provider?.id == null ? undefined : String(record.provider.id),
            payment_method_id: record.payment_method?.id == null ? undefined : String(record.payment_method.id),
            fee_lines: record.fee_breakdown?.map((fee) => {
                return {
                    label_text: fee.description || fee.fee_code,
                    amount: this.formatAmount(fee.amount, record.currency!.precision)
                };
            })
        };
    }
    // Method to present server decimal strings at currency precision without rounding.
    private formatAmount(value: string, precision: number): string {
        if (typeof value !== "string") {
            throw new Error("Expected an exact decimal string");
        }

        const amount = DecimalAmountUtil.withPrecision(value, precision);

        if (amount === null) {
            throw new Error("Invalid server amount precision");
        }

        return amount;
    }

    // Method to persist scoped draft identifiers through the application's encrypted storage manager.
    public getStorage(): DepositStorageInterface {
        const storage = LocalStorageManagerUtil.getInstance<InternalStorageSchemaType>();
        const member_id = this.member_id;

        const scope_key = `${API_CLIENT_CONFIG.base_url}:${member_id}:deposit`;

        if (!member_id) {
            throw new Error("Missing member");
        }

        return {
            load: () => {
                return storage.get("wallet_deposit_drafts")?.[scope_key] ?? null;
            },

            save: (cache) => {
                if (MemberAuthenticatorUtil.getLoggedInMember()?.public_id !== member_id) {
                    throw new Error("Member changed");
                }

                storage.set("wallet_deposit_drafts", { ...(storage.get("wallet_deposit_drafts") ?? {}), [scope_key]: cache });
            }
        };
    }

    // Method to obtain a fresh one-time CSRF token for each draft mutation.
    private async getInput(context: DepositContextInterface): Promise<MyWalletIntentInputInterface> {
        const csrf = await this.unwrap(await AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.MY_WALLET));

        return {
            currency_code: context.currency_code,
            amount: context.amount,
            description: context.description,
            payment_provider_id: context.provider_id,
            payment_method_id: context.payment_method_id,
            csrf_token: csrf.token
        };
    }

    // Method to get fee label text
    private getFeeLabelText = (
        fee: MyWalletPaymentProviderMethodOptionsInterface["transaction_fees"],
        provider_fee_label_text: string,
        currency_code: string
    ): string | undefined => {
        if (fee?.type === FEE_TYPES.FLAT) {
            return `${provider_fee_label_text}: ${fee.fee_amount} ${currency_code}`;
        } else if (fee?.type === FEE_TYPES.PERCENTAGE) {
            return `${provider_fee_label_text}: ${fee.fee_amount}%`;
        } else {
            return undefined;
        }
    };

    // Method to handle fetcging payment providers to handle transaction
    private fetchProviders = async (details: DepositDetailsInterface, provider_fee_label_text: string): Promise<PaymentOptionInterface[]> => {
        // destructure details input
        const { currency_code, amount, description } = details;

        // Make API Request to fetch suitable providers
        const api_response = await MyWalletAPIService.getPaymentOptions(currency_code, amount);

        // Unwrap api response to get necessary information
        const response = await this.unwrap(api_response);

        const { payment_providers } = response;

        return payment_providers.map((provider_options: MyWalletPaymentProviderMethodOptionsInterface) => {
            // Destructure provider_options input
            const { transaction_fees: fee, provider, payment_methods } = provider_options;

            // retrun Payment Options Object
            return {
                id: String(provider.id),
                name: provider.name,
                description: provider.description ?? undefined,
                fee_label_text: this.getFeeLabelText(fee, provider_fee_label_text, currency_code),
                methods: payment_methods.map((method) => {
                    return {
                        id: String(method.id),
                        name: method.name,
                        description: method.description ?? undefined
                    };
                })
            };
        });
    };
    // Method to expose typed provider and draft API callbacks to the reusable coordinator.
    public getActions(provider_fee_label_text: string): DepositActionsInterface {
        return {
            fetch_providers: async (details: DepositDetailsInterface): Promise<PaymentOptionInterface[]> => {
                return this.fetchProviders(details, provider_fee_label_text);
            },

            create_intent: async (context, request_key) => {
                return this.normalize(await this.unwrap(await MyWalletAPIService.createIntent(await this.getInput(context), request_key)));
            },

            read_intent: async (public_id) => {
                return this.normalize(await this.unwrap(await MyWalletAPIService.getIntent(public_id)));
            },

            update_intent: async (public_id, context) => {
                const version = this.versions.get(public_id);
                if (version === undefined) {
                    throw new Error("Missing intent version; reopen the deposit");
                }
                return this.normalize(await this.unwrap(await MyWalletAPIService.updateIntent(public_id, await this.getInput(context), version)));
            }
        };
    }
}
export default MyWalletDepositActionHandler;
