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
    InputUIContentOptionsInterface,
    InputUIPropsInterface,
    InputValue
} from "@ui/version_3/ui_types/input_ui_type";

import { ListViewPropsInterface } from "@/ui_types/list_view_type";

import { DEFUALT_CURRENCY_LOGO_URL } from "@/configs";

import { getMemberFullName, CurrencyRecordInterface } from "@/types/api_service_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import CurrencyListViewActionHandler from "@/action_handlers/currency/list_view_action_handler";

import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";

import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class CurrencyListViewController extends BaseListViewController<CurrencyRecordInterface, "code"> {
    public readonly content_key: string = "currency";

    public readonly record_id_key: "code" = "code" as const;

    public action_handler: CurrencyListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "code");

        this.action_handler = new CurrencyListViewActionHandler(this);
    }

    // Method to get page filters
    protected getPageFilters(): ListFilterConfig[] {
        const page_key = this.content_key;
        const { filters_content_key } = this.getListViewContentKeys(page_key);

        return [
            // Search Filter
            {
                key: "search_filter",
                type: "search",
                label_content_key: `${filters_content_key}.search_filter`,
                input_content_key: `${filters_content_key}.search_filter`,
                overides: {
                    content_props: {
                        search_icon_html_content: SVGIcons.search_svg_icon
                    },
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.search ?? ""
                }
            },
            // Precision Filter
            {
                key: "precision_filter",
                type: "number",
                label_content_key: `${filters_content_key}.precision_filter`,
                input_content_key: `${filters_content_key}.precision_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.precision ?? ""
                }
            },
            // Minor unit Filter
            {
                key: "minor_unit_filter",
                type: "number",
                label_content_key: `${filters_content_key}.minor_unit_filter`,
                input_content_key: `${filters_content_key}.minor_unit_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.minor_unit ?? ""
                }
            },
            // numeric Code Filter
            {
                key: "numeric_code_filter",
                type: "text",
                label_content_key: `${filters_content_key}.numeric_code_filter`,
                input_content_key: `${filters_content_key}.numeric_code_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.numeric_code ?? ""
                }
            },
            // Network Symbol Filter
            {
                key: "network_symbol_filter",
                type: "select",
                label_content_key: `${filters_content_key}.network_symbol_filter`,
                input_content_key: `${filters_content_key}.network_symbol_filter`,
                options_content_key: `${filters_content_key}.network_symbol_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.network_symbol ?? ""
                }
            },
            // Is Active filter
            {
                key: "is_active_filter",
                type: "select",
                label_content_key: `${filters_content_key}.status_filter`,
                input_content_key: `${filters_content_key}.status_filter`,
                options_content_key: `${filters_content_key}.status_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_active ?? ""
                }
            },
            // Is Fiat Filter
            {
                key: "is_fiat_filter",
                type: "select",
                label_content_key: `${filters_content_key}.type_filter`,
                input_content_key: `${filters_content_key}.type_filter`,
                options_content_key: `${filters_content_key}.type_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_fiat ?? ""
                }
            },
            // App Id Filter
            {
                key: "app_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.app_id_filter`,
                input_content_key: `${filters_content_key}.app_id_filter`,
                overides: {
                    model_value: this.route.query?.app_id?.toString() ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                    }
                }
            },
            // Assigned/Unassigned to App
            {
                key: "unassigned_to_app_filter",
                type: "select",
                label_content_key: `${filters_content_key}.unassigned_to_app_filter`,
                input_content_key: `${filters_content_key}.unassigned_to_app_filter`,
                options_content_key: `${filters_content_key}.unassigned_to_app_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.unassigned_to_app ?? ""
                }
            },
            // Created By Filter
            {
                key: "created_by_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.created_by_filter`,
                input_content_key: `${filters_content_key}.created_by_filter`,
                overides: {
                    model_value: this.route.query?.created_by ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        fetch_data_method: PreviewRecordFetcher.fetchMemberPreviewRecords
                    }
                }
            },
            // Date Range Filter
            {
                key: "date_range_filter",
                type: "date_range",
                label_content_key: `${filters_content_key}.date_range_filter`,
                input_content_key: `${filters_content_key}.date_range_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: InputTransformerUtil.toJson(this.route.query?.date_range) ?? "",
                    content_props: {
                        seperator_icon_html: "arrow_long_down_svg_icon"
                    }
                }
            }
        ];
    }

    // Method to get table render config
    protected getTableRenderConfig(): DataTableColumnRenderType<CurrencyRecordInterface>[] {
        const content_manager = ContentManagerUtil.getInstance();

        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo("currency_module.update_currency_status");

        const columns: DataTableColumnRenderType<CurrencyRecordInterface>[] = [
            // S/N and Select Checkbox Column
            {
                key: "code",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: {
                    render: (_row, index) => {
                        return DataTableSerialCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    is_selected: false,

                    input_model_value: (record?: CurrencyRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.code) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const currency_codes = records.map((row) => row.code);

                            return currency_codes.length > 0 && currency_codes.every((code) => selected_records.includes(code));
                        }

                        return selected_records.includes(record.code);
                    },

                    input_ui_boolean_props: (record?: CurrencyRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const currency_codes = records.map((row) => row.code);
                        const is_checked = record?.code
                            ? selected_records.includes(record.code)
                            : currency_codes.length > 0 && currency_codes.every((code) => selected_records.includes(code));

                        return {
                            is_checked,

                            required: true,

                            disabled: !record?.code && currency_codes.length === 0
                        };
                    },

                    input_action_props: (record?: CurrencyRecordInterface): InputUIActionPropsInterface => {
                        return {
                            on_click: async (
                                event?: Event,
                                input_value?: InputValue,
                                input_config?: { props: InputUIPropsInterface }
                            ): Promise<ActionMethodRetrunInterface> => {
                                if (record !== undefined) {
                                    return this.action_handler.handleOnRecordRowSelected(record, input_value);
                                }

                                return this.action_handler.handleOnSelectAllRows();
                            }
                        };
                    }
                }
            },

            // Currency Logo Url, Name amd Code column
            {
                key: "name",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_24,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.name_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableAvatarInfoCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: CurrencyRecordInterface) => record.name,

                    getImgSubText: (record: CurrencyRecordInterface) => record.code ?? "-",

                    getImgContent: (record: CurrencyRecordInterface) => record.name,

                    getImgSrc: (record: CurrencyRecordInterface) => {
                        return record?.logo_url || DEFUALT_CURRENCY_LOGO_URL;
                    }
                }
            },

            // Country Code column
            {
                key: "country_code",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.country_code_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles
                }
            },

            // Currency type column
            {
                key: "is_fiat",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.type_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    getTextContent: (record: CurrencyRecordInterface) => {
                        if (record.is_fiat) {
                            return (
                                content_manager?.get<string>?.(
                                    "content_resource.currency_view_ui.list_view_ui.table.body.fiat_currency_type_text",
                                    ""
                                ) ?? ""
                            );
                        }

                        return (
                            content_manager?.get<string>?.(
                                "content_resource.currency_view_ui.list_view_ui.table.body.crypto_currency_type_text",
                                ""
                            ) ?? ""
                        );
                    }
                }
            },

            // Precision Column
            {
                key: "precision",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.precision_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles
                }
            },

            // Sort Order Column
            {
                key: "sort_order",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_7,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.sort_order_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles
                }
            },

            // Is Active column
            {
                key: "is_active",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_7,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.status_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableToggleCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    input_model_value: (record: CurrencyRecordInterface): InputValue => {
                        return InputTransformerUtil.resolveTypedValue(record.is_active);
                    },

                    input_content_props: (record: CurrencyRecordInterface): InputUIContentOptionsInterface => {
                        return {
                            loader_html_content: RenderHtmlUtil.renderLoaderHtml()
                        };
                    },

                    input_ui_boolean_props: (record: CurrencyRecordInterface): InputUIBooleanPropsInterface => {
                        return {
                            is_checked: record.is_active,

                            required: true,

                            disabled: false
                        };
                    },

                    input_action_props: (record: CurrencyRecordInterface): InputUIActionPropsInterface => {
                        return {
                            on_click: async (
                                event?: Event,
                                input_value?: InputValue,
                                input_config?: { props: InputUIPropsInterface }
                            ): Promise<ActionMethodRetrunInterface> => {
                                return this.action_handler.handleStatusToggleChange(record, input_value);
                            }
                        };
                    }
                }
            },

            // Creator column
            {
                key: "creator",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.creator_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableLinkCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    icon_key: "member_icon",

                    getImgAltText: (record: CurrencyRecordInterface) => getMemberFullName(record?.creator) ?? "",

                    getLinkURL: (record: CurrencyRecordInterface) =>
                        this.getRouteQueryLink("member_profile", record?.creator?.public_id),

                    getLinkText: (record: CurrencyRecordInterface) => getMemberFullName(record?.creator) ?? ""
                }
            },

            // Created at Column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    getDateTextContent: (record: CurrencyRecordInterface) => {
                        const raw_date = record?.created_at;

                        if (raw_date) {
                            return InputTransformerUtil.formatReadableDateTime(raw_date);
                        } else {
                            return "-";
                        }
                    }
                }
            },

            // Action column
            {
                key: "code",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_7,
                header: {
                    label_key: "content_resource.currency_view_ui.list_view_ui.table.header.actions_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableActionIconCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    button_content_props: (record: CurrencyRecordInterface): ButtonUIContentOptionsInterface => {
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
                        record: CurrencyRecordInterface,
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

        return columns.filter((col) => {
            if (!can_change_status && col.key === "is_active") {
                return false;
            }
            return true;
        });
    }
}

export default CurrencyListViewController;
