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

import { ListViewPropsInterface } from "@/ui_types/list_view_type";

import { DEFUALT_PAYMENT_PROVIDER_LOGO_URL } from "@/configs";

import { getMemberFullName, PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import PaymentProviderConfigListViewActionHandler from "@/action_handlers/payment_provider_config/list_view_action_handler";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";

class PaymentProviderConfigListViewController extends BaseListViewController<PaymentProviderConfigRecordInterface, "id"> {
    public readonly content_key: string = "payment_provider_config";

    public readonly record_id_key: "id" = "id" as const;

    public action_handler: PaymentProviderConfigListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "id");

        this.action_handler = new PaymentProviderConfigListViewActionHandler(this);
    }

    // Method to get page filters.
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return [
            // Search filter
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
            // Provider Filter
            {
                key: "provider_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.provider_filter`,
                input_content_key: `${filters_content_key}.provider_filter`,
                overides: {
                    model_value: this.route.query?.provider_id ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        fetch_data_method: PreviewRecordFetcher.fetchPaymentProviderPreviewRecords
                    }
                }
            },
            // Environment Filter
            {
                key: "environment_filter",
                type: "select",
                label_content_key: `${filters_content_key}.environment_filter`,
                input_content_key: `${filters_content_key}.environment_filter`,
                options_content_key: `${filters_content_key}.environment_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.environment ?? ""
                }
            },
            // Account Reference Filter
            {
                key: "account_reference_filter",
                type: "text",
                label_content_key: `${filters_content_key}.account_reference_filter`,
                input_content_key: `${filters_content_key}.account_reference_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.account_reference ?? ""
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

    // Method to get table render config.
    protected getTableRenderConfig(): DataTableColumnRenderType<PaymentProviderConfigRecordInterface>[] {
        return [
            // S_N and Select All Column
            {
                key: "id",
                sortable: false,
                width: "w-[5%]",
                header: {
                    label_key: "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: {
                    render: () => DataTableSerialCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: PaymentProviderConfigRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.id) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const record_ids = records.flatMap((row) => (row.id ? [row.id] : []));

                            return record_ids.length > 0 && record_ids.every((id) => selected_records.includes(id));
                        }

                        return selected_records.includes(record.id);
                    },
                    input_ui_boolean_props: (record?: PaymentProviderConfigRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const record_ids = records.flatMap((row) => (row.id ? [row.id] : []));
                        const is_checked = record?.id
                            ? selected_records.includes(record.id)
                            : record_ids.length > 0 && record_ids.every((id) => selected_records.includes(id));

                        return {
                            is_checked,
                            required: true,
                            disabled: !record?.id && record_ids.length === 0
                        };
                    },
                    input_action_props: (record?: PaymentProviderConfigRecordInterface): InputUIActionPropsInterface => ({
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
                    })
                }
            },
            // Provider Column
            {
                key: "provider",
                sortable: true,
                width: "w-[22%]",
                header: {
                    label_key: "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.provider_text"
                },
                cell: {
                    render: () => DataTableAvatarInfoCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: PaymentProviderConfigRecordInterface) => record.provider?.name ?? "",
                    getImgSubText: (record: PaymentProviderConfigRecordInterface) => record.provider?.code ?? "",
                    getImgContent: (record: PaymentProviderConfigRecordInterface) => record.provider?.name ?? "-",
                    getImgSrc: (record: PaymentProviderConfigRecordInterface) =>
                        record.provider?.logo_url || DEFUALT_PAYMENT_PROVIDER_LOGO_URL
                }
            },
            // Environment Column
            {
                key: "environment",
                sortable: true,
                width: "w-[10%]",
                header: {
                    label_key: "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.environment_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: PaymentProviderConfigRecordInterface) => record.environment?.toUpperCase?.() ?? "-"
                }
            },
            // Account Reference Column
            {
                key: "account_reference",
                sortable: false,
                width: "w-[16%]",
                header: {
                    label_key:
                        "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.account_reference_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: PaymentProviderConfigRecordInterface) =>
                        record.account_reference?.split("_").join(" ") || "-"
                }
            },
            // Settings Settlement Currency Column
            {
                key: "settings",
                sortable: false,
                width: "w-[11%]",
                header: {
                    label_key:
                        "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.settlement_currency_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: PaymentProviderConfigRecordInterface) =>
                        record.settings?.settlement_currency || "-"
                }
            },
            // Settings Default Currency Column
            {
                key: "settings",
                sortable: false,
                width: "w-[11%]",
                header: {
                    label_key:
                        "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.default_currency_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: PaymentProviderConfigRecordInterface) => record.settings?.default_currency || "-"
                }
            },
            // Creator column
            {
                key: "creator",
                sortable: false,
                width: "w-[13%]",
                header: {
                    label_key: "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.creator_text"
                },
                cell: {
                    render: () => {
                        return DataTableLinkCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    icon_key: "member_icon",
                    getImgAltText: (record: PaymentProviderConfigRecordInterface) => getMemberFullName(record?.creator) ?? "",
                    getLinkURL: (record: PaymentProviderConfigRecordInterface) =>
                        this.getRouteQueryLink("member_profile", record?.creator?.public_id),
                    getLinkText: (record: PaymentProviderConfigRecordInterface) => getMemberFullName(record?.creator) || "-"
                }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: "w-[16%]",
                header: {
                    label_key: "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: PaymentProviderConfigRecordInterface) =>
                        record.created_at ? InputTransformerUtil.formatReadableDateTime(record.created_at) : "-"
                }
            },
            // Actions Column
            {
                key: "id",
                sortable: false,
                width: "w-[9%]",
                header: {
                    label_key: "content_resource.payment_provider_config_view_ui.list_view_ui.table.header.actions_text"
                },
                cell: {
                    render: () => DataTableActionIconCellUI
                },
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
                        record: PaymentProviderConfigRecordInterface,
                        record_index?: number
                    ): ButtonUIActionPropsInterface => ({
                        on_click: async (event?: MouseEvent, config?: { props: ButtonUIPropsInterface }): Promise<void> => {
                            this.action_handler.toggleActionMenu(record, record_index);
                        }
                    })
                }
            }
        ];
    }
}

export default PaymentProviderConfigListViewController;
