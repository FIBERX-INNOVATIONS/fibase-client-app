import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import {
    ButtonUIActionPropsInterface,
    ButtonUIContentOptionsInterface,
    ButtonUIPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import { ListStateInterface, ListViewContentKeysInterface, ListViewPropsInterface } from "@/ui_types/list_view_type";

import { IdentityWalletLedgerListViewPropsInterface } from "@/ui_types/identity_wallet_ledger_list_view_type";

import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import LedgerDisplayFormatterUtil from "@/utils/ledger_display_formatter_util";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import IdentityWalletLedgerListViewActionHandler from "@/action_handlers/identity_wallet_ledger/list_view_action_handler";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

class IdentityWalletLedgerListViewController extends BaseListViewController<IdentityWalletLedgerRecordInterface, "record_key"> {
    public readonly content_key = "identity_wallet_ledger";

    public readonly record_id_key: "record_key" = "record_key" as const;

    public readonly wallet_public_id: string;

    public readonly identity_public_id?: string;

    public action_handler: IdentityWalletLedgerListViewActionHandler;

    // Method to initialise the standalone wallet ledger list module.
    constructor(props: IdentityWalletLedgerListViewPropsInterface) {
        super(props as ListViewPropsInterface, "record_key");

        this.wallet_public_id = props.wallet_public_id;
        this.identity_public_id = props.identity_public_id;
        this.action_handler = new IdentityWalletLedgerListViewActionHandler(this);
    }

    // Method to remove create actions from the read-only ledger header.
    protected getHeaderActionButtons(page_key: string, content_keys: ListViewContentKeysInterface): ButtonUIPropsInterface[] {
        void page_key;
        void content_keys;

        return [];
    }

    // Method to link the wallet breadcrumb back to the scoped identity wallet list.
    protected getBreadcrumbProps(content_keys: ListViewContentKeysInterface) {
        const breadcrumb_props = super.getBreadcrumbProps(content_keys);
        const wallets_crumb = breadcrumb_props.breadcrumb_items.find((item) => item.menu_id === "WalletsBreadcrumb");

        if (wallets_crumb && this.identity_public_id) {
            wallets_crumb.menu_link = `/identities/${this.identity_public_id}/wallets`;
        }

        return breadcrumb_props;
    }

    // Method to establish the ledger's default page size and chronological sorting.
    protected getDefaultListState(): ListStateInterface<IdentityWalletLedgerRecordInterface> {
        return {
            ...super.getDefaultListState(),
            limit: 12,
            sort_by: "created_at",
            sort_direction: "desc"
        };
    }

    // Method to hide bulk controls because ledger rows are read-only in this release.
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

    // Method to configure URL-backed ledger search and domain filters.
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);
        const input_actions = this.action_handler.getFilterInputActionHandlersConfig();

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
            // Entry Type Filter
            {
                key: "entry_type_filter",
                type: "select",
                label_content_key: `${filters_content_key}.entry_type_filter`,
                input_content_key: `${filters_content_key}.entry_type_filter`,
                options_content_key: `${filters_content_key}.entry_type_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.entry_type ?? ""
                }
            },
            // Direction Filter
            {
                key: "direction_filter",
                type: "select",
                label_content_key: `${filters_content_key}.direction_filter`,
                input_content_key: `${filters_content_key}.direction_filter`,
                options_content_key: `${filters_content_key}.direction_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.direction ?? ""
                }
            },
            // Balance Field Filter
            {
                key: "balance_field_filter",
                type: "select",
                label_content_key: `${filters_content_key}.balance_field_filter`,
                input_content_key: `${filters_content_key}.balance_field_filter`,
                options_content_key: `${filters_content_key}.balance_field_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.balance_field ?? ""
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

    // Method to configure the sortable, read-only wallet ledger table.
    protected getTableRenderConfig(): DataTableColumnRenderType<IdentityWalletLedgerRecordInterface>[] {
        const base_key = "content_resource.identity_wallet_ledger_view_ui.list_view_ui.table.header";
        const cell_styles = this.list_view_class_styles.table_cell_components_class_styles;

        return [
            // Sn Column
            {
                key: "record_key",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: { label_key: `${base_key}.sn_text` },
                cell: { render: () => DataTableSerialCellUI },
                props: { class_styles: cell_styles, is_selected: false }
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
                    getDateTextContent: (record: IdentityWalletLedgerRecordInterface) =>
                        DisplayFormatterUtil.formatDateTime(record.created_at)
                }
            },
            // Transaction Column
            {
                key: "transaction_id",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: { label_key: `${base_key}.transaction_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => record.transaction?.public_id ?? "-"
                }
            },
            // Entry Type column
            {
                key: "entry_type",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.entry_type_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) =>
                        DisplayFormatterUtil.formatLabel(record.entry_type)
                }
            },
            // Direction Column
            {
                key: "direction",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_7,
                header: { label_key: `${base_key}.direction_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) =>
                        DisplayFormatterUtil.formatLabel(record.direction)
                }
            },
            // Balance Field Column
            {
                key: "balance_field",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: { label_key: `${base_key}.balance_field_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) =>
                        DisplayFormatterUtil.formatLabel(record.balance_field)
                }
            },
            // Amount Column
            {
                key: "amount",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.amount_text` },
                cell: { render: () => DataTableTextContentCellUI },
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
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return LedgerDisplayFormatterUtil.getBalanceValue(record, "before");
                    }
                }
            },
            // Available Balance After column
            {
                key: "available_balance_after",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: { label_key: `${base_key}.after_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return LedgerDisplayFormatterUtil.getBalanceValue(record, "after");
                    }
                }
            },
            // Created By column
            {
                key: "created_by_member_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: { label_key: `${base_key}.created_by_text` },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: IdentityWalletLedgerRecordInterface) => {
                        return LedgerDisplayFormatterUtil.getCreatedBy(record);
                    }
                }
            },
            // Action Menu Column
            {
                key: "record_key",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
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
                        record: IdentityWalletLedgerRecordInterface,
                        record_index?: number
                    ): ButtonUIActionPropsInterface => ({
                        on_click: async (): Promise<void> => {
                            this.action_handler.toggleActionMenu(record, record_index);
                        }
                    })
                }
            }
        ];
    }
}

export default IdentityWalletLedgerListViewController;
