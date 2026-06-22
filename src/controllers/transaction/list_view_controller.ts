import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import {
    ButtonUIActionPropsInterface,
    ButtonUIContentOptionsInterface,
    ButtonUIPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import {
    ActionMethodRetrunInterface,
    InputUIActionPropsInterface,
    InputUIBooleanPropsInterface,
    InputUIPropsInterface,
    InputValue
} from "@ui/version_3/ui_types/input_ui_type";

import { ListStateInterface, ListViewContentKeysInterface, ListViewPropsInterface } from "@/ui_types/list_view_type";

import { TransactionRecordInterface } from "@/types/api_service_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import TransactionListViewActionHandler from "@/action_handlers/transaction/list_view_action_handler";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class TransactionListViewController extends BaseListViewController<TransactionRecordInterface, "public_id"> {
    public readonly content_key = "transaction";

    public readonly record_id_key: "public_id" = "public_id" as const;

    public action_handler: TransactionListViewActionHandler;

    // Method to initialise the transaction table list module.
    constructor(props: ListViewPropsInterface) {
        super(props, "public_id");

        this.action_handler = new TransactionListViewActionHandler(this);
    }

    // Method to remove create actions from the read-only transaction list.
    protected getHeaderActionButtons(page_key: string, content_keys: ListViewContentKeysInterface): ButtonUIPropsInterface[] {
        void page_key;
        void content_keys;

        return [];
    }

    // Method to establish transaction pagination and chronological sorting defaults.
    protected getDefaultListState(): ListStateInterface<TransactionRecordInterface> {
        return {
            ...super.getDefaultListState(),
            limit: 12,
            sort_by: "created_at",
            sort_direction: "desc"
        };
    }

    // Method to configure every transaction-list endpoint filter with route hydration.
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
            // Trnsaction Type Filter
            {
                key: "transaction_type_filter",
                type: "select",
                label_content_key: `${filters_content_key}.transaction_type_filter`,
                input_content_key: `${filters_content_key}.transaction_type_filter`,
                options_content_key: `${filters_content_key}.transaction_type_filter.option_list`,
                overides: { action_props: input_actions, model_value: this.route.query.transaction_type ?? "" }
            },
            // Direction Type Filter
            {
                key: "direction_filter",
                type: "select",
                label_content_key: `${filters_content_key}.direction_filter`,
                input_content_key: `${filters_content_key}.direction_filter`,
                options_content_key: `${filters_content_key}.direction_filter.option_list`,
                overides: { action_props: input_actions, model_value: this.route.query.direction ?? "" }
            },
            // Status Filter
            {
                key: "status_filter",
                type: "select",
                label_content_key: `${filters_content_key}.status_filter`,
                input_content_key: `${filters_content_key}.status_filter`,
                options_content_key: `${filters_content_key}.status_filter.option_list`,
                overides: { action_props: input_actions, model_value: this.route.query.status ?? "" }
            },
            // App Filter
            {
                key: "app_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.app_filter`,
                input_content_key: `${filters_content_key}.app_filter`,
                overides: {
                    content_props: searchable_select_content,
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                    },
                    model_value: this.route.query.app_id ?? ""
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
            // Provider Filter
            {
                key: "provider_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.provider_filter`,
                input_content_key: `${filters_content_key}.provider_filter`,
                overides: {
                    content_props: searchable_select_content,
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchPaymentProviderPreviewRecords
                    },
                    model_value: this.route.query.provider_id ?? ""
                }
            },
            // Payment Method Filter
            {
                key: "payment_method_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.payment_method_filter`,
                input_content_key: `${filters_content_key}.payment_method_filter`,
                overides: {
                    content_props: searchable_select_content,
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchPaymentMethodPreviewRecords
                    },
                    model_value: this.route.query.payment_method_id ?? ""
                }
            },
            // Wallet Filter
            {
                key: "wallet_id_filter",
                type: "search",
                label_content_key: `${filters_content_key}.wallet_filter`,
                input_content_key: `${filters_content_key}.wallet_filter`,
                overides: { action_props: input_actions, model_value: this.route.query.wallet_id ?? "" }
            },
            // Source Wallet Filter
            {
                key: "source_wallet_id_filter",
                type: "search",
                label_content_key: `${filters_content_key}.source_wallet_filter`,
                input_content_key: `${filters_content_key}.source_wallet_filter`,
                overides: { action_props: input_actions, model_value: this.route.query.source_wallet_id ?? "" }
            },
            // Destination Wallet Filter
            {
                key: "destination_wallet_id_filter",
                type: "search",
                label_content_key: `${filters_content_key}.destination_wallet_filter`,
                input_content_key: `${filters_content_key}.destination_wallet_filter`,
                overides: { action_props: input_actions, model_value: this.route.query.destination_wallet_id ?? "" }
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
            // Initated By Identity Filter
            {
                key: "initiated_by_identity_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.initiated_by_identity_filter`,
                input_content_key: `${filters_content_key}.initiated_by_identity_filter`,
                overides: {
                    content_props: searchable_select_content,
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchIdentityPreviewRecords
                    },
                    model_value: this.route.query.initiated_by_identity_id ?? ""
                }
            },
            // Parent Transaction Filter
            {
                key: "parent_transaction_id_filter",
                type: "search",
                label_content_key: `${filters_content_key}.parent_transaction_filter`,
                input_content_key: `${filters_content_key}.parent_transaction_filter`,
                overides: { action_props: input_actions, model_value: this.route.query.parent_transaction_id ?? "" }
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

    // Method to format a transaction amount with its currency precision and symbol.
    private formatAmount(record: TransactionRecordInterface, value?: number): string {
        return DisplayFormatterUtil.formatCurrencyAmount(value, {
            precision: record.currency?.precision,
            symbol: record.currency?.symbol
        });
    }

    // Method to format the transaction identifier and app reference for compact display.
    private getTransactionText(record: TransactionRecordInterface): string {
        return record.app_reference ? `${record.public_id} — ${record.app_reference}` : record.public_id;
    }

    // Method to resolve a transaction party from its identity and wallet projections.
    private getPartyText(identity_id?: string, wallet_id?: string): string {
        return [identity_id, wallet_id].filter(Boolean).join(" / ") || "-";
    }

    // Method to format the source-to-destination transaction relationship.
    private getPartiesText(record: TransactionRecordInterface): string {
        const source = this.getPartyText(record.source_identity?.public_id, record.source_wallet?.public_id);
        const external_destination = record.destination_external_account;
        const external_text = external_destination
            ? String(
                  external_destination.name ??
                      external_destination.account_name ??
                      external_destination.reference ??
                      "External destination"
              )
            : undefined;
        const destination =
            external_text || this.getPartyText(record.destination_identity?.public_id, record.destination_wallet?.public_id);

        return `${source} → ${destination}`;
    }

    // Method to format primary, fee, and net transaction amounts together.
    private getAmountsText(record: TransactionRecordInterface): string {
        return [
            this.formatAmount(record, record.amount),
            `Fee: ${this.formatAmount(record, record.fee_amount)}`,
            `Net: ${this.formatAmount(record, record.net_amount)}`
        ].join(" | ");
    }

    // Method to format provider and payment-method projections together.
    private getProviderText(record: TransactionRecordInterface): string {
        const provider = record.provider?.name || record.provider?.code;
        const payment_method = record.payment_method?.name || record.payment_method?.code;

        return [provider, payment_method].filter(Boolean).join(" / ") || "-";
    }

    // Method to append the most relevant lifecycle timestamp to transaction status.
    private getStatusText(record: TransactionRecordInterface): string {
        const lifecycle_date = record.settled_at || record.failed_at || record.initiated_at;
        const status = DisplayFormatterUtil.formatLabel(record.status);

        return lifecycle_date ? `${status} — ${DisplayFormatterUtil.formatDateTime(lifecycle_date)}` : status;
    }

    // Method to configure the sortable transaction table and row action menu.
    protected getTableRenderConfig(): DataTableColumnRenderType<TransactionRecordInterface>[] {
        const base_key = "content_resource.transaction_view_ui.list_view_ui.table.header";
        const cell_styles = this.list_view_class_styles.table_cell_components_class_styles;

        return [
            // Sn/Select column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: { label_key: `${base_key}.sn_text` },
                cell: { render: () => DataTableSerialCellUI },
                props: {
                    class_styles: cell_styles,
                    is_selected: false,
                    input_model_value: (record?: TransactionRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];

                        if (!record?.public_id) {
                            return records.length > 0 && records.every((row) => selected_records.includes(row.public_id));
                        }

                        return selected_records.includes(record.public_id);
                    },
                    input_ui_boolean_props: (record?: TransactionRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const is_checked = record?.public_id
                            ? selected_records.includes(record.public_id)
                            : records.length > 0 && records.every((row) => selected_records.includes(row.public_id));

                        return { is_checked, required: true, disabled: !record?.public_id && records.length === 0 };
                    },
                    input_action_props: (record?: TransactionRecordInterface): InputUIActionPropsInterface => ({
                        on_click: async (
                            event?: Event,
                            input_value?: InputValue,
                            input_config?: { props: InputUIPropsInterface }
                        ): Promise<ActionMethodRetrunInterface> => {
                            void event;
                            void input_config;

                            return record
                                ? this.action_handler.handleOnRecordRowSelected(record, input_value)
                                : this.action_handler.handleOnSelectAllRows();
                        }
                    })
                }
            },
            // Transaction Id Column
            {
                key: "public_id",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: { label_key: `${base_key}.transaction_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: { class_styles: cell_styles, getTextContent: (record) => this.getTransactionText(record) }
            },
            // Transaction Type Column
            {
                key: "transaction_type",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.type_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record) =>
                        `${DisplayFormatterUtil.formatLabel(record.transaction_type)} / ${DisplayFormatterUtil.formatLabel(record.direction)}`
                }
            },
            // Source Wallet Column
            {
                key: "source_wallet",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_15,
                header: { label_key: `${base_key}.parties_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: { class_styles: cell_styles, getTextContent: (record) => this.getPartiesText(record) }
            },
            // Amount Column
            {
                key: "amount",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: { label_key: `${base_key}.amount_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: { class_styles: cell_styles, getTextContent: (record) => this.getAmountsText(record) }
            },
            // Currency Column
            {
                key: "currency",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.currency_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record) =>
                        record.currency ? `${record.currency.code.toUpperCase()} — ${record.currency.name}` : "-"
                }
            },
            // Provider Column
            {
                key: "provider",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: { label_key: `${base_key}.provider_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: { class_styles: cell_styles, getTextContent: (record) => this.getProviderText(record) }
            },
            // Status Column
            {
                key: "status",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.status_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: { class_styles: cell_styles, getTextContent: (record) => this.getStatusText(record) }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_11,
                header: { label_key: `${base_key}.created_at_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getDateTextContent: (record) => DisplayFormatterUtil.formatDateTime(record.created_at)
                }
            },
            // Action Menu column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_7,
                header: { label_key: `${base_key}.actions_text` },
                cell: { render: () => DataTableActionIconCellUI },
                props: {
                    class_styles: cell_styles,
                    button_content_props: (): ButtonUIContentOptionsInterface => ({
                        button_html_content: RenderHtmlUtil.renderHtml({
                            icon: "vertical_elipsis_svg_icon",
                            class_style: cell_styles.button_ui_class_style?.content_class_style,
                            icon_class_style: cell_styles.button_ui_class_style?.icon_class_style
                        }),
                        loading_html_content: RenderHtmlUtil.renderLoaderHtml({
                            class_style: cell_styles.button_ui_class_style?.icon_class_style
                        })
                    }),
                    button_action_props: (
                        record: TransactionRecordInterface,
                        record_index?: number
                    ): ButtonUIActionPropsInterface => ({
                        on_click: async (): Promise<void> => this.action_handler.toggleActionMenu(record, record_index)
                    })
                }
            }
        ];
    }
}

export default TransactionListViewController;
