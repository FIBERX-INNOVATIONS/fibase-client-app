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

import { ListViewContentKeysInterface, ListViewPropsInterface } from "@/ui_types/list_view_type";

import { IdentityWalletListViewPropsInterface } from "@/ui_types/identity_wallet_list_view_type";

import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import IdentityWalletListViewActionHandler from "@/action_handlers/identity_wallet/list_view_action_handler";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class IdentityWalletListViewController extends BaseListViewController<IdentityWalletRecordInterface, "public_id"> {
    public readonly content_key = "identity_wallet";

    public readonly record_id_key: "public_id" = "public_id" as const;

    public readonly identity_public_id: string;

    public action_handler: IdentityWalletListViewActionHandler;

    // Method to initialise the wallet table list for the selected identity.
    constructor(props: IdentityWalletListViewPropsInterface) {
        super(props as ListViewPropsInterface, "public_id");

        this.identity_public_id = props.identity_public_id;
        this.action_handler = new IdentityWalletListViewActionHandler(this);
    }

    // Method to remove page-level actions from the read-only wallet list.
    protected getHeaderActionButtons(page_key: string, content_keys: ListViewContentKeysInterface): ButtonUIPropsInterface[] {
        void page_key;
        void content_keys;
        return [];
    }

    // Method to configure wallet filters through the shared filter-panel builder.
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
            // Currency Filter
            {
                key: "currency_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.currency_filter`,
                input_content_key: `${filters_content_key}.currency_filter`,
                overides: {
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                    },
                    model_value: this.route.query.currency_id ?? ""
                }
            },
            // Status Filter
            {
                key: "status_filter",
                type: "select",
                label_content_key: `${filters_content_key}.status_filter`,
                input_content_key: `${filters_content_key}.status_filter`,
                options_content_key: `${filters_content_key}.status_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.status ?? ""
                }
            },
            // Is Active Filter
            {
                key: "is_active_filter",
                type: "select",
                label_content_key: `${filters_content_key}.active_filter`,
                input_content_key: `${filters_content_key}.active_filter`,
                options_content_key: `${filters_content_key}.active_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.is_active ?? ""
                }
            },
            // Is deleted Filter
            {
                key: "is_deleted_filter",
                type: "select",
                label_content_key: `${filters_content_key}.deleted_filter`,
                input_content_key: `${filters_content_key}.deleted_filter`,
                options_content_key: `${filters_content_key}.deleted_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.is_deleted ?? ""
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

    // Method to format a wallet amount with its currency precision and symbol.
    private formatAmount(wallet: IdentityWalletRecordInterface, value?: number): string {
        return DisplayFormatterUtil.formatCurrencyAmount(value, {
            precision: wallet.currency?.precision,
            symbol: wallet.currency?.symbol
        });
    }

    // Method to configure sortable wallet table columns and row actions.
    protected getTableRenderConfig(): DataTableColumnRenderType<IdentityWalletRecordInterface>[] {
        return [
            // Sn and Select Column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: { render: () => DataTableSerialCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: IdentityWalletRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];

                        if (!record?.public_id) {
                            return records.length > 0 && records.every((row) => selected_records.includes(row.public_id));
                        }

                        return selected_records.includes(record.public_id);
                    },
                    input_ui_boolean_props: (record?: IdentityWalletRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const is_checked = record?.public_id
                            ? selected_records.includes(record.public_id)
                            : records.length > 0 && records.every((row) => selected_records.includes(row.public_id));

                        return {
                            is_checked,
                            required: true,
                            disabled: !record?.public_id && records.length === 0
                        };
                    },
                    input_action_props: (record?: IdentityWalletRecordInterface): InputUIActionPropsInterface => ({
                        on_click: async (
                            event?: Event,
                            input_value?: InputValue,
                            input_config?: { props: InputUIPropsInterface }
                        ): Promise<ActionMethodRetrunInterface> => {
                            void event;
                            void input_config;

                            if (record) {
                                return this.action_handler.handleOnRecordRowSelected(record, input_value);
                            }

                            return this.action_handler.handleOnSelectAllRows();
                        }
                    })
                }
            },
            // Wallet Public Id Column
            {
                key: "public_id",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_15,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.wallet_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles
                }
            },
            // Currency column Column
            {
                key: "currency_id",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.currency_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityWalletRecordInterface) =>
                        record.currency ? `${record.currency.code.toUpperCase()} — ${record.currency.name}` : "-"
                }
            },
            // Available Balance Column
            {
                key: "available_balance",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.available_balance_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityWalletRecordInterface) =>
                        this.formatAmount(record, record.available_balance)
                }
            },
            // Locked Balance Column
            {
                key: "locked_balance",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.locked_balance_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityWalletRecordInterface) => this.formatAmount(record, record.locked_balance)
                }
            },
            // Pending Balance Column
            {
                key: "pending_balance",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.pending_balance_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityWalletRecordInterface) => this.formatAmount(record, record.pending_balance)
                }
            },
            // Refunded Balance Column
            {
                key: "refunded_balance",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.refunded_balance_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityWalletRecordInterface) =>
                        this.formatAmount(record, record.refunded_balance)
                }
            },
            // Wallet Status Column
            {
                key: "status",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.status_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityWalletRecordInterface) =>
                        record.is_deleted ? "Deleted" : DisplayFormatterUtil.formatLabel(record.status)
                }
            },
            // IsActive status Column
            {
                key: "is_active",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_7,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.active_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityWalletRecordInterface) => (record.is_active ? "Active" : "Inactive")
                }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: IdentityWalletRecordInterface) =>
                        record.created_at ? InputTransformerUtil.formatReadableDateTime(record.created_at) : "-"
                }
            },
            // Action Menu Column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.identity_wallet_view_ui.list_view_ui.table.header.actions_text"
                },
                cell: { render: () => DataTableActionIconCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    button_content_props: (): ButtonUIContentOptionsInterface => ({
                        button_html_content: RenderHtmlUtil.renderHtml({
                            icon: "vertical_elipsis_svg_icon",
                            class_style:
                                this.list_view_class_styles.table_cell_components_class_styles.button_ui_class_style
                                    ?.content_class_style,
                            icon_class_style:
                                this.list_view_class_styles.table_cell_components_class_styles.button_ui_class_style
                                    ?.icon_class_style
                        }),
                        loading_html_content: RenderHtmlUtil.renderLoaderHtml({
                            class_style:
                                this.list_view_class_styles.table_cell_components_class_styles.button_ui_class_style
                                    ?.icon_class_style
                        })
                    }),
                    button_action_props: (
                        record: IdentityWalletRecordInterface,
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

export default IdentityWalletListViewController;
