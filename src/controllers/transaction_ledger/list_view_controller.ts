import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ListStateInterface, ListViewContentKeysInterface, ListViewPropsInterface } from "@/ui_types/list_view_type";

import { TransactionLedgerListViewPropsInterface } from "@/ui_types/transaction_ledger_list_view_type";

import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import LedgerDisplayFormatterUtil from "@/utils/ledger_display_formatter_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import TransactionLedgerListViewActionHandler from "@/action_handlers/transaction_ledger/list_view_action_handler";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class TransactionLedgerListViewController extends BaseListViewController<IdentityWalletLedgerRecordInterface, "record_key"> {
    public readonly content_key = "transaction_ledger";

    public readonly record_id_key: "record_key" = "record_key" as const;

    public readonly transaction_public_id: string;

    public action_handler: TransactionLedgerListViewActionHandler;

    // Method to initialise the standalone transaction ledger list module.
    constructor(props: TransactionLedgerListViewPropsInterface) {
        super(props as ListViewPropsInterface, "record_key");

        this.transaction_public_id = props.transaction_public_id;
        this.action_handler = new TransactionLedgerListViewActionHandler(this);
    }

    // Method to remove create actions from the read-only ledger header.
    protected getHeaderActionButtons(page_key: string, content_keys: ListViewContentKeysInterface): ButtonUIPropsInterface[] {
        void page_key;
        void content_keys;

        return [];
    }

    // Method to show the selected transaction identifier in its breadcrumb.
    protected getBreadcrumbProps(content_keys: ListViewContentKeysInterface) {
        const breadcrumb_props = super.getBreadcrumbProps(content_keys);

        const transaction_crumb = breadcrumb_props.breadcrumb_items.find((item) => {
            return item.menu_id === "TransactionBreadcrumb";
        });

        if (transaction_crumb) {
            transaction_crumb.menu_text = this.transaction_public_id;
        }

        return breadcrumb_props;
    }

    // Method to establish ledger pagination and chronological sorting defaults.
    protected getDefaultListState(): ListStateInterface<IdentityWalletLedgerRecordInterface> {
        return {
            ...super.getDefaultListState(),
            limit: 12,
            sort_by: "created_at",
            sort_direction: "desc"
        };
    }

    // Method to hide bulk controls because transaction ledger rows are read-only.
    protected getDataTableResultAndBulkActionBarProps(
        page_key: string,
        list_state: ListStateInterface<IdentityWalletLedgerRecordInterface>
    ) {
        const props = super.getDataTableResultAndBulkActionBarProps(page_key, list_state);

        if (props.selection_props) {
            props.selection_props.show_bulk_button = false;
        }

        return props;
    }

    // Method to configure URL-backed transaction ledger filters.
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        const input_actions = this.action_handler.getFilterInputActionHandlersConfig();

        const searchable_select_content = { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon };

        return [
            // Search Filter
            {
                key: "search_filter",
                type: "search",
                label_content_key: `${filters_content_key}.search_filter`,
                input_content_key: `${filters_content_key}.search_filter`,
                overides: {
                    content_props: { search_icon_html_content: SVGIcons.search_svg_icon },
                    action_props: input_actions,
                    model_value: this.route.query.search ?? ""
                }
            },
            // Entry type Filter
            {
                key: "entry_type_filter",
                type: "select",
                label_content_key: `${filters_content_key}.entry_type_filter`,
                input_content_key: `${filters_content_key}.entry_type_filter`,
                options_content_key: `${filters_content_key}.entry_type_filter.option_list`,
                overides: { action_props: input_actions, model_value: this.route.query.entry_type ?? "" }
            },
            // Direction Filter
            {
                key: "direction_filter",
                type: "select",
                label_content_key: `${filters_content_key}.direction_filter`,
                input_content_key: `${filters_content_key}.direction_filter`,
                options_content_key: `${filters_content_key}.direction_filter.option_list`,
                overides: { action_props: input_actions, model_value: this.route.query.direction ?? "" }
            },
            // Balance Field Filter
            {
                key: "balance_field_filter",
                type: "select",
                label_content_key: `${filters_content_key}.balance_field_filter`,
                input_content_key: `${filters_content_key}.balance_field_filter`,
                options_content_key: `${filters_content_key}.balance_field_filter.option_list`,
                overides: { action_props: input_actions, model_value: this.route.query.balance_field ?? "" }
            },
            // Wallet Filter
            {
                key: "wallet_id_filter",
                type: "search",
                label_content_key: `${filters_content_key}.wallet_filter`,
                input_content_key: `${filters_content_key}.wallet_filter`,
                overides: { action_props: input_actions, model_value: this.route.query.wallet_id ?? "" }
            },
            // Identity Filter
            {
                key: "identity_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.identity_filter`,
                input_content_key: `${filters_content_key}.identity_filter`,
                overides: {
                    content_props: searchable_select_content,
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchIdentityPreviewRecords
                    },
                    model_value: this.route.query.identity_id ?? ""
                }
            },
            // Currency Filter
            {
                key: "currency_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.currency_filter`,
                input_content_key: `${filters_content_key}.currency_filter`,
                overides: {
                    content_props: searchable_select_content,
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                    },
                    model_value: this.route.query.currency_id ?? ""
                }
            },
            // Date Range Filter
            {
                key: "date_range_filter",
                type: "date_range",
                label_content_key: `${filters_content_key}.date_range_filter`,
                input_content_key: `${filters_content_key}.date_range_filter`,
                overides: {
                    action_props: input_actions,
                    model_value: InputTransformerUtil.toJson(this.route.query.date_range) ?? "",
                    content_props: { seperator_icon_html: "arrow_long_down_svg_icon" }
                }
            }
        ];
    }

    // Method to resolve the identity identifier and safe display name.
    private getIdentityText(record: IdentityWalletLedgerRecordInterface): string {
        const identity = record.identity;

        const profile = identity?.primary_profile ?? identity?.profile;

        const full_name = [profile?.first_name, profile?.middle_name, profile?.last_name].filter(Boolean).join(" ");

        const display_name = profile?.display_name || full_name;

        return [identity?.public_id, display_name].filter(Boolean).join(" — ") || "-";
    }

    // Method to resolve the wallet identifier and currency code.
    private getWalletText(record: IdentityWalletLedgerRecordInterface): string {
        const currency_code = record.currency?.code ?? record.wallet?.currency?.code;

        return [record.wallet?.public_id, currency_code].filter(Boolean).join(" — ") || "-";
    }

    // Method to combine optional ledger description and reason text.
    private getDescriptionText(record: IdentityWalletLedgerRecordInterface): string {
        return [record.description, record.reason].filter(Boolean).join(" — ") || "-";
    }

    // Method to configure the sortable transaction ledger data table.
    protected getTableRenderConfig(): DataTableColumnRenderType<IdentityWalletLedgerRecordInterface>[] {
        const base_key = "content_resource.transaction_ledger_view_ui.list_view_ui.table.header";

        const cell_styles = this.list_view_class_styles.table_cell_components_class_styles;

        return [
            // Sn/Select Column
            {
                key: "record_key",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: { label_key: `${base_key}.sn_text` },
                cell: {
                    render: () => {
                        return DataTableSerialCellUI;
                    }
                },
                props: { class_styles: cell_styles, is_selected: false }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: { label_key: `${base_key}.created_at_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getDateTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return DisplayFormatterUtil.formatDateTime(record.created_at);
                    }
                }
            },
            // Wallet Column
            {
                key: "wallet_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_11,
                header: { label_key: `${base_key}.wallet_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return this.getWalletText(record);
                    }
                }
            },
            // identity Column
            {
                key: "identity_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: { label_key: `${base_key}.identity_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return this.getIdentityText(record);
                    }
                }
            },
            // Entry Type Column
            {
                key: "entry_type",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: { label_key: `${base_key}.entry_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return `${DisplayFormatterUtil.formatLabel(record.entry_type)} / ${DisplayFormatterUtil.formatLabel(record.direction)}`;
                    }
                }
            },
            // Balance Field Column
            {
                key: "balance_field",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: { label_key: `${base_key}.balance_field_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return DisplayFormatterUtil.formatLabel(record.balance_field);
                    }
                }
            },
            // Amount Field Column
            {
                key: "amount",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.amount_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return LedgerDisplayFormatterUtil.formatAmount(record, record.amount);
                    }
                }
            },
            // Available Balance Before Column
            {
                key: "available_balance_before",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.before_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return LedgerDisplayFormatterUtil.getBalanceValue(record, "before");
                    }
                }
            },
            // Available Balance After Column
            {
                key: "available_balance_after",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.after_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return LedgerDisplayFormatterUtil.getBalanceValue(record, "after");
                    }
                }
            },
            // Description Column
            {
                key: "description",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: { label_key: `${base_key}.description_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return this.getDescriptionText(record);
                    }
                }
            },
            // Created By Column
            {
                key: "created_by_member_id",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.created_by_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return LedgerDisplayFormatterUtil.getCreatedBy(record);
                    }
                }
            }
        ];
    }
}

export default TransactionLedgerListViewController;
