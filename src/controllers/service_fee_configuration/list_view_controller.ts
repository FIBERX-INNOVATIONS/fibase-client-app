import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import type { ListViewPropsInterface } from "@/ui_types/list_view_type";

import type { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import type { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

import type {
    ButtonUIActionPropsInterface,
    ButtonUIContentOptionsInterface,
    ButtonUIPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import type {
    ActionMethodRetrunInterface,
    InputUIActionPropsInterface,
    InputUIBooleanPropsInterface,
    InputUIPropsInterface,
    InputValue
} from "@ui/version_3/ui_types/input_ui_type";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

import ServiceFeeConfigurationListViewActionHandler from "@/action_handlers/service_fee_configuration/list_view_action_handler";

class ServiceFeeConfigurationListViewController extends BaseListViewController<
    ServiceFeeConfigurationRecordInterface,
    "public_id"
> {
    public readonly content_key = "service_fee_configuration";

    public readonly record_id_key = "public_id" as const;

    public action_handler: ServiceFeeConfigurationListViewActionHandler;

    // Method to initialize the service fee configuration list controller.
    constructor(props: ListViewPropsInterface) {
        super(props, "public_id");

        this.action_handler = new ServiceFeeConfigurationListViewActionHandler(this);
    }

    // Method to build a standard select filter configuration.
    private buildSelectFilter(key: string, model_value: InputValue = ""): ListFilterConfig {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return {
            key: `${key}_filter`,
            type: "select",
            label_content_key: `${filters_content_key}.${key}_filter`,
            input_content_key: `${filters_content_key}.${key}_filter`,
            options_content_key: `${filters_content_key}.${key}_filter.option_list`,
            overides: {
                action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                model_value
            }
        };
    }

    // Method to build a searchable relationship filter configuration.
    private buildRelationshipFilter(
        key: string,
        fetch_data_method: NonNullable<InputUIActionPropsInterface["fetch_data_method"]>
    ): ListFilterConfig {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return {
            key: `${key}_filter`,
            type: "select_search",
            label_content_key: `${filters_content_key}.${key}_filter`,
            input_content_key: `${filters_content_key}.${key}_filter`,
            overides: {
                model_value: this.route.query?.[key] ?? "",
                content_props: { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon },
                action_props: {
                    ...this.action_handler.getFilterInputActionHandlersConfig(),
                    fetch_data_method
                }
            }
        };
    }

    // Method to build a number filter configuration.
    private buildNumberFilter(key: string): ListFilterConfig {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return {
            key: `${key}_filter`,
            type: "number",
            label_content_key: `${filters_content_key}.${key}_filter`,
            input_content_key: `${filters_content_key}.${key}_filter`,
            overides: {
                model_value: this.route.query?.[key] ?? "",
                action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                number_props: { min: 0, step: 0.01 }
            }
        };
    }

    // Method to build a date-range filter configuration.
    private buildDateRangeFilter(key: string): ListFilterConfig {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return {
            key: `${key}_filter`,
            type: "date_range",
            label_content_key: `${filters_content_key}.${key}_filter`,
            input_content_key: `${filters_content_key}.${key}_filter`,
            overides: {
                model_value: InputTransformerUtil.toJson(this.route.query?.[key]) ?? "",
                action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                content_props: { seperator_icon_html: "arrow_long_down_svg_icon" }
            }
        };
    }

    // Method to build the service fee configuration filters.
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return [
            // Search Filter
            {
                key: "search_filter",
                type: "search",
                label_content_key: `${filters_content_key}.search_filter`,
                input_content_key: `${filters_content_key}.search_filter`,
                overides: {
                    model_value: this.route.query?.search ?? "",
                    content_props: { search_icon_html_content: SVGIcons.search_svg_icon },
                    action_props: this.action_handler.getFilterInputActionHandlersConfig()
                }
            },

            // Is Active Filter
            this.buildSelectFilter("is_active", this.route.query?.is_active ?? ""),

            // Currency Filter
            this.buildRelationshipFilter("currency_id", PreviewRecordFetcher.fetchCurrenciesPreviewRecords),

            // Registered APP Filter
            this.buildRelationshipFilter("registered_app_id", PreviewRecordFetcher.fetchRegisteredAppPreviewRecords),

            // Provider Filter
            this.buildRelationshipFilter("provider_id", PreviewRecordFetcher.fetchPaymentProviderPreviewRecords),

            // Identity Filter
            this.buildRelationshipFilter("identity_id", PreviewRecordFetcher.fetchIdentityPreviewRecords),

            // Transaction Type Filter
            this.buildSelectFilter("transaction_type", this.route.query?.transaction_type ?? ""),

            // Configuration Level Filter
            this.buildSelectFilter("configuration_level", this.route.query?.configuration_level ?? ""),

            // Fee Type Filter
            this.buildSelectFilter("fee_type", this.route.query?.fee_type ?? ""),

            // Effective State Filter
            this.buildSelectFilter("effective_state", this.route.query?.effective_state ?? ""),

            // Amount Range Min Amount Filters
            this.buildNumberFilter("min_amount"),

            // Amount Range Max Amount Filter
            this.buildNumberFilter("max_amount"),

            // Created By Filter
            this.buildRelationshipFilter("created_by", PreviewRecordFetcher.fetchMemberPreviewRecords),

            // Updated By Filter
            this.buildRelationshipFilter("updated_by", PreviewRecordFetcher.fetchMemberPreviewRecords),

            // Effective From Range Filter
            this.buildDateRangeFilter("effective_from_range"),

            // Effective Until Range Filter
            this.buildDateRangeFilter("effective_until_range"),

            // Created At Range Filter
            this.buildDateRangeFilter("date_range")
        ];
    }

    // Method to format the fee value for the list table.
    private formatFee(record: ServiceFeeConfigurationRecordInterface): string {
        if (record.fee_type === "range") {
            return `${record.ranges?.length ?? 0} range(s)`;
        }

        if (record.amount === null) {
            return "-";
        }

        return record.fee_type === "percentage"
            ? `${InputTransformerUtil.roundToTwoDecimalPlaces(Number(record.amount))}%`
            : DisplayFormatterUtil.formatCurrencyAmount(record.amount, record.currency);
    }

    // Method to format the configuration scope for the list table.
    private formatScope(record: ServiceFeeConfigurationRecordInterface): string {
        return (
            [record.registered_app?.name, record.provider?.name, record.identity?.public_id].filter(Boolean).join(" · ") ||
            "Global"
        );
    }

    // Method to build the service fee configuration table columns.
    protected getTableRenderConfig(): DataTableColumnRenderType<ServiceFeeConfigurationRecordInterface>[] {
        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo(
            "service_fee_configuration_module.update_service_fee_configuration_status"
        );

        const columns: DataTableColumnRenderType<ServiceFeeConfigurationRecordInterface>[] = [
            // Serial Number Column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: { label_key: "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.sn_text" },
                cell: {
                    render: () => {
                        return DataTableSerialCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: ServiceFeeConfigurationRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const record_ids = records.map((item) => {
                            return item.public_id;
                        });

                        return record
                            ? selected_records.includes(record.public_id)
                            : record_ids.length > 0 &&
                                  record_ids.every((id) => {
                                      return selected_records.includes(id);
                                  });
                    },
                    input_ui_boolean_props: (record?: ServiceFeeConfigurationRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const record_ids = (this.state_refs.list_state.value.records ?? []).map((item) => {
                            return item.public_id;
                        });
                        return {
                            is_checked: record
                                ? selected_records.includes(record.public_id)
                                : record_ids.length > 0 &&
                                  record_ids.every((id) => {
                                      return selected_records.includes(id);
                                  }),
                            required: true,
                            disabled: !record && record_ids.length === 0
                        };
                    },
                    input_action_props: (record?: ServiceFeeConfigurationRecordInterface): InputUIActionPropsInterface => {
                        return {
                            on_click: async (
                                event?: Event,
                                input_value?: InputValue,
                                input_config?: { props: InputUIPropsInterface }
                            ): Promise<ActionMethodRetrunInterface> => {
                                return record
                                    ? this.action_handler.handleOnRecordRowSelected(record, input_value)
                                    : this.action_handler.handleOnSelectAllRows();
                            }
                        };
                    }
                }
            },

            // Currency Column
            {
                key: "currency",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: {
                    label_key: "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.currency_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: ServiceFeeConfigurationRecordInterface) => {
                        return record.currency?.code ?? "-";
                    }
                }
            },

            // Transaction Type Column
            {
                key: "transaction_type",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_10,
                header: {
                    label_key:
                        "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.transaction_type_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: ServiceFeeConfigurationRecordInterface) => {
                        return DisplayFormatterUtil.formatLabel(record.transaction_type);
                    }
                }
            },

            // Configuration Level Column
            {
                key: "configuration_level",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_15,
                header: {
                    label_key: "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.scope_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: ServiceFeeConfigurationRecordInterface) => {
                        return this.formatScope(record);
                    }
                }
            },

            // Fee Type Column
            {
                key: "fee_type",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: { label_key: "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.fee_text" },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: ServiceFeeConfigurationRecordInterface) => {
                        return `${DisplayFormatterUtil.formatLabel(record.fee_type)}: ${this.formatFee(record)}`;
                    }
                }
            },

            // Effective Period Column
            {
                key: "effective_from",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_15,
                header: {
                    label_key:
                        "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.effective_period_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: ServiceFeeConfigurationRecordInterface) => {
                        return `${DisplayFormatterUtil.formatDateTime(record.effective_from)} — ${DisplayFormatterUtil.formatDateTime(record.effective_until)}`;
                    }
                }
            },

            // Status Column
            {
                key: "is_active",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.status_text"
                },
                cell: {
                    render: () => {
                        return DataTableToggleCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    input_model_value: (record: ServiceFeeConfigurationRecordInterface): InputValue => {
                        return record.is_active;
                    },
                    input_ui_boolean_props: (record: ServiceFeeConfigurationRecordInterface): InputUIBooleanPropsInterface => {
                        return { is_checked: record.is_active, required: true, disabled: false };
                    },
                    input_content_props: () => {
                        return { loader_html_content: RenderHtmlUtil.renderLoaderHtml() };
                    },
                    input_action_props: (record: ServiceFeeConfigurationRecordInterface): InputUIActionPropsInterface => {
                        return {
                            on_click: async (event?: Event, input_value?: InputValue) => {
                                return this.action_handler.handleStatusToggleChange(record, input_value);
                            }
                        };
                    }
                }
            },

            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: {
                    label_key: "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: ServiceFeeConfigurationRecordInterface) => {
                        return DisplayFormatterUtil.formatDateTime(record.created_at);
                    }
                }
            },

            // Actions Column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_6,
                header: {
                    label_key: "content_resource.service_fee_configuration_view_ui.list_view_ui.table.header.actions_text"
                },
                cell: {
                    render: () => {
                        return DataTableActionIconCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    button_content_props: (): ButtonUIContentOptionsInterface => {
                        return {
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
                        };
                    },
                    button_action_props: (
                        record: ServiceFeeConfigurationRecordInterface,
                        record_index?: number
                    ): ButtonUIActionPropsInterface => {
                        return {
                            on_click: async (event?: MouseEvent, config?: { props: ButtonUIPropsInterface }): Promise<void> => {
                                this.action_handler.toggleActionMenu(record, record_index);
                            }
                        };
                    }
                }
            }
        ];

        return columns.filter((column) => {
            return can_change_status || column.key !== "is_active";
        });
    }
}

export default ServiceFeeConfigurationListViewController;
