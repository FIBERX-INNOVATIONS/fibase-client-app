import { markRaw } from "vue";

import { EventBus } from "@/utils/global_event_bus_util";

import type { GlobalEventTypes } from "@/types/global_events_type";

import { MY_WALLET_PERMISSIONS } from "@/configs/permissions_config";

import type { MyWalletTransactionType } from "@/types/my_wallet_type";

import type { MyWalletContentType } from "@/ui_types/my_wallet_view_type";

import type { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import type { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import type { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import type { BreadcrumbUIPropsInterface } from "@ui/version_3/ui_types/breadcrumb_ui_type";

import type { NavLinkContentPayloadResultInterface } from "@ui/version_3/ui_types/nav_link_ui_type";

import type {
    MyWalletViewPropsInterface,
    MyWalletViewStateInterface,
    MyWalletViewComputedInterface,
    MyWalletViewComponentsInterface
} from "@/ui_types/my_wallet_view_type";

import ButtonUI from "@ui/version_3/components/ButtonUI.vue";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import DataTableUI from "@ui/version_3/components/DataTableUI.vue";

import PaginationUI from "@ui/version_3/components/PaginationUI.vue";

import BreadcrumbUI from "@ui/version_3/components/BreadcrumbUI.vue";

import InputUI from "@ui/version_3/components/InputUI/BaseInputUI.vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import MyWalletViewClassStyles from "@/class_styles/my_wallet_view_class_styles";

import InputUIPropsBuilder from "@ui/version_3/props_builder/input_ui_props_builder";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import MyWalletViewActionHandler from "@/action_handlers/my_wallet/view_action_handler";

import DataTableUIPropsBuilder from "@ui/version_3/props_builder/data_table_ui_props_builder";

import PaginationUIPropsBuilder from "@ui/version_3/props_builder/pagination_ui_props_builder";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class MyWalletViewController extends BaseController<
    MyWalletViewPropsInterface,
    MyWalletViewStateInterface,
    MyWalletViewComputedInterface,
    MyWalletViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly content = this.getContent();

    public readonly can_deposit = this.canDeposit();

    public readonly class_styles = MyWalletViewClassStyles;

    public readonly deposit_props = this.getDepositBtnProps();

    public readonly breadcrumb_props = this.getBreadCrumbProps();

    public readonly member_name = this.getCurrentMemberFullName();

    public readonly withdrawal_props = this.getWithdrawalBtnProps();

    public readonly action_handler: MyWalletViewActionHandler;

    public readonly can_view_currencies = MemberAuthenticatorUtil.memberHasPermissionTo(MY_WALLET_PERMISSIONS.CURRENCY_LIST);

    public readonly can_view_transactions = MemberAuthenticatorUtil.memberHasPermissionTo(MY_WALLET_PERMISSIONS.TRANSACTION_LIST);

    // Method to initialise the personal wallet overview and its actions.
    constructor(props: MyWalletViewPropsInterface) {
        super("my_wallet_view", props, EventBus);

        this.action_handler = new MyWalletViewActionHandler(this);

        this.setActionHandler(this.action_handler);
    }

    // Method to resolve the wallet page copy from the application content resource.
    private getContent(): MyWalletContentType {
        const defaults = {
            home_text: "Home",
            title_text: "My Wallets",
            eyebrow_text: "YOUR MONEY, AT A GLANCE",
            subtitle_text: "A home for every currency. Your balances and latest activity, together.",
            brand_text: "FIBASE",
            currency_text: "Wallet currency",
            available_text: "Available balance",
            holder_text: "Wallet holder",
            card_note_text: "Your personal wallet",
            overview_text: "Wallet overview",
            locked_text: "Locked balance",
            pending_text: "Pending balance",
            wallet_id_text: "Wallet reference",
            deposit_text: "Deposit",
            withdrawal_text: "Withdrawal",
            coming_soon_text: "Withdrawals are coming soon.",
            transactions_text: "Recent transactions",
            all_wallets_text: "All wallets",
            transactions_description_text: "Your latest activity across every currency.",
            loading_text: "Loading your wallets…",
            loading_transactions_text: "Loading transactions…",
            empty_text: "No currencies are available yet.",
            no_wallet_text: "No wallet is available for this currency yet.",
            no_transactions_text: "No transactions yet. Your wallet activity will appear here.",
            wallet_error_text: "We could not load your wallets. Please try again.",
            transaction_error_text: "We could not load your transactions. Please try again.",
            permission_text: "You do not have permission to view this section.",
            retry_text: "Try again",
            pagination_text: "Page {page} of {pages} · {total} transactions",
            transaction_text: "Transaction",
            type_text: "Type",
            amount_text: "Amount",
            status_text: "Status",
            date_text: "Date"
        };
        const content_manager = ContentManagerUtil.getInstance();
        for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
            defaults[key] = content_manager.get<string>(`content_resource.my_wallet_view_ui.${key}`, defaults[key]) ?? defaults[key];
        }
        return defaults;
    }

    // Method to return if current member can deposit
    private canDeposit(): boolean {
        return [MY_WALLET_PERMISSIONS.PAYMENT_OPTIONS, MY_WALLET_PERMISSIONS.CREATE_INTENT, MY_WALLET_PERMISSIONS.TRANSACTION_VIEW].every(
            (permission) => {
                return MemberAuthenticatorUtil.memberHasPermissionTo(permission);
            }
        );
    }

    // Method to get current member full name
    private getCurrentMemberFullName(): string {
        return (
            MemberAuthenticatorUtil.getLoggedInMember()?.full_name ||
            MemberAuthenticatorUtil.getLoggedInMember()?.username ||
            this.content.holder_text
        );
    }

    // Method  to get breadcrumb ui props object
    private getBreadCrumbProps(): BreadcrumbUIPropsInterface {
        const content_manager = ContentManagerUtil.getInstance();
        const breadcrumb_items = content_manager.get<NavLinkContentPayloadResultInterface[]>("content_resource.my_wallet_view_ui.breadcrumb_list", [
            { menu_text: this.content.home_text, menu_icon: "home_svg_icon", menu_link: "/dashboard" },
            { menu_text: this.content.title_text, menu_icon: "greater_than_caret_svg_icon" }
        ]);

        return {
            id: "MyWalletBreadcrumb",
            breadcrumb_items: breadcrumb_items ?? [],
            separator: "",
            class_styles: this.class_styles.breadcrumb_styles
        };
    }

    // Methodd to get deposit button props object
    private getDepositBtnProps(): ButtonUIPropsInterface {
        return ButtonUIPropsBuilder.getReactivePropsObject(
            "MyWalletDeposit",
            "content_resource.my_wallet_view_ui.deposit_text",
            "invox_arrow_down_svg_icon",
            "button",
            {
                class_styles: this.class_styles.action_button,
                boolean_props: { disabled: !this.can_deposit },
                action_props: {
                    on_click: async () => {
                        this.action_handler.openDeposit();
                    }
                }
            }
        );
    }

    // Method to get Withdrawak button props object
    private getWithdrawalBtnProps(): ButtonUIPropsInterface {
        return ButtonUIPropsBuilder.getReactivePropsObject(
            "MyWalletWithdrawal",
            "content_resource.my_wallet_view_ui.withdrawal_text",
            "wallet_svg_icon",
            "button",
            {
                class_styles: this.class_styles.action_button,
                boolean_props: { disabled: true }
            }
        );
    }

    // Method to display every wallet balance digit with currency precision and grouping.
    private formatBalance(value?: number | string | null): string {
        return DisplayFormatterUtil.formatCurrencyAmount(value, {
            ...this.computed_refs.currency.value,
            use_grouping: true
        });
    }

    // Method to build transaction columns using shared text cells and display formatters.
    private getTransactionColumns(): DataTableColumnRenderType<MyWalletTransactionType>[] {
        const columns: {
            key: keyof MyWalletTransactionType;
            label: string;
            format: (record: MyWalletTransactionType) => string;
        }[] = [
            {
                key: "public_id",
                label: this.content.transaction_text,
                format: (record) => {
                    return record.app_reference || record.public_id;
                }
            },
            {
                key: "transaction_type",
                label: this.content.type_text,
                format: (record) => {
                    return DisplayFormatterUtil.formatLabel(record.transaction_type);
                }
            },
            {
                key: "amount",
                label: this.content.amount_text,
                format: (record) => {
                    return `${DisplayFormatterUtil.formatCurrencyAmount(record.amount, record.currency ?? {})} ${record.currency?.code ?? ""}`.trim();
                }
            },
            {
                key: "status",
                label: this.content.status_text,
                format: (record) => {
                    return DisplayFormatterUtil.formatLabel(record.status);
                }
            },
            {
                key: "created_at",
                label: this.content.date_text,
                format: (record) => {
                    return DisplayFormatterUtil.formatDateTime(record.created_at);
                }
            }
        ];
        return columns.map((column) => {
            return {
                key: column.key,
                sortable: false,
                header: {
                    render: () => {
                        return DisplayFormatterUtil.escapeHtml(column.label);
                    }
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: { class_styles: this.class_styles.cell_styles, header_tag: "h3", getTextContent: column.format }
            };
        });
    }

    // Method to expose the existing toolkit components used by the wallet page.
    protected getUIComponents(): MyWalletViewComponentsInterface {
        return {
            BreadcrumbUI: markRaw(BreadcrumbUI),
            InputUI: markRaw(InputUI),
            ButtonUI: markRaw(ButtonUI),
            DataTableUI: markRaw(DataTableUI),
            PaginationUI: markRaw(PaginationUI)
        };
    }

    // Method to initialise independent wallet and transaction loading states.
    protected getUIStateData(): MyWalletViewStateInterface {
        return {
            currencies: [],
            wallets: [],
            transactions: [],
            selected_currency: "",
            is_loading_wallets: true,
            is_loading_transactions: true,
            has_wallet_error: false,
            has_transaction_error: false,
            current_page: 1,
            total_pages: 0,
            total_items: 0
        };
    }

    // Method to derive the selected wallet, formatted balances, and toolkit props.
    protected getUIComputedData(): ComputedDefinitionType<MyWalletViewComputedInterface> {
        return {
            currency: () => {
                return this.state_refs.currencies.value.find((currency) => {
                    return currency.code === this.state_refs.selected_currency.value;
                });
            },

            wallet: () => {
                const currency = this.computed_refs.currency.value;
                return this.state_refs.wallets.value.find((wallet) => {
                    return !!currency && wallet.currency?.code === currency.code;
                });
            },

            currency_input: () => {
                return InputUIPropsBuilder.getReactivePropsObject("MyWalletCurrency", "select", undefined, {
                    model_value: this.state_refs.selected_currency.value,
                    option_props: this.state_refs.currencies.value.map((currency) => {
                        return { value: currency.code, label_text: `${currency.code} · ${currency.name}` };
                    }),
                    class_styles: this.class_styles.currency_input,
                    action_props: { on_change: this.action_handler.handleCurrencyChange }
                });
            },

            balance: () => {
                return this.formatBalance(this.computed_refs.wallet.value?.available_balance);
            },

            balance_parts: () => {
                return this.computed_refs.balance.value.split(",").map((part, index, parts) => {
                    return index < parts.length - 1 ? `${part},` : part;
                });
            },

            balance_class_style: () => {
                const balance_length = this.computed_refs.balance.value.length;
                if (balance_length > 24) {
                    return this.class_styles.balance_extra_long;
                }
                if (balance_length > 16) {
                    return this.class_styles.balance_long;
                }
                return this.class_styles.balance;
            },

            locked_balance: () => {
                return this.formatBalance(this.computed_refs.wallet.value?.locked_balance);
            },

            pending_balance: () => {
                return this.formatBalance(this.computed_refs.wallet.value?.pending_balance);
            },

            transaction_table: () => {
                return DataTableUIPropsBuilder.getReactivePropsObject<MyWalletTransactionType>(
                    "public_id",
                    this.getTransactionColumns(),
                    this.state_refs.transactions.value,
                    {
                        section_id: "MyWalletTransactions",
                        table_id: "MyWalletTransactionsTable",
                        class_styles: this.class_styles.table_styles
                    }
                );
            },

            pagination_props: () => {
                return PaginationUIPropsBuilder.getReactivePropsObject(
                    "MyWalletPagination",
                    "content_resource.my_wallet_view_ui.pagination_buttons",
                    this.state_refs.current_page.value,
                    this.state_refs.total_pages.value,
                    {
                        class_styles: this.class_styles.pagination_styles,
                        config_props: { show_numbers: true, max_visible_pages: 3 },
                        content_props: { prev_btn_text: "Previous", next_btn_text: "Next" },
                        action_props: { on_page_change: this.action_handler.handlePageChange }
                    }
                );
            }
        };
    }

    // Method to build the retry button for an independently failed section.
    public getRetryProps(section: "wallets" | "transactions"): ButtonUIPropsInterface {
        return ButtonUIPropsBuilder.getReactivePropsObject(
            `MyWalletRetry${section}`,
            "content_resource.my_wallet_view_ui.retry_text",
            undefined,
            "button",
            {
                class_styles: this.class_styles.retry_button,
                action_props: {
                    on_click: async () => {
                        if (section === "wallets") {
                            await this.action_handler.fetchWallets();
                        } else {
                            await this.action_handler.handlePageChange(this.state_refs.current_page.value);
                        }
                    }
                }
            }
        );
    }

    // Method to load wallet and transaction sections independently when the view mounts.
    protected async handleOnMountedLogic(): Promise<void> {
        await Promise.allSettled([this.action_handler.fetchWallets(), this.action_handler.handlePageChange(1)]);
    }

    // Method to prevent pending responses from updating an unmounted wallet page.
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.action_handler.cleanup();
    }
}
export default MyWalletViewController;
