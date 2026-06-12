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

import { DEFUALT_CURRENCY_LOGO_URL, DEFUALT_PAYMENT_METHOD_ICON_URL, DEFUALT_PAYMENT_PROVIDER_LOGO_URL } from "@/configs";

import { CurrencyPaymentProviderMethodRecordInterface, getMemberFullName } from "@/types/api_service_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import CurrencyPaymentProviderMethodListViewActionHandler from "@/action_handlers/currency_payment_provider_method/list_view_action_handler";

import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";

import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class CurrencyPaymentProviderMethodListViewController extends BaseListViewController<
    CurrencyPaymentProviderMethodRecordInterface,
    "id"
> {
    public readonly content_key: string = "currency_payment_provider_method";

    public readonly record_id_key: "id" = "id" as const;

    public action_handler: CurrencyPaymentProviderMethodListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "id");

        this.action_handler = new CurrencyPaymentProviderMethodListViewActionHandler(this);
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
            // Status Filter
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
            // Currency Filter
            {
                key: "currency_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.currency_filter`,
                input_content_key: `${filters_content_key}.currency_filter`,
                overides: {
                    model_value: this.route.query?.currency_id ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        fetch_data_method: PreviewRecordFetcher.fetchCurrenciesPreviewRecords
                    }
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
            // Payment Method Filter
            {
                key: "payment_method_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.payment_method_filter`,
                input_content_key: `${filters_content_key}.payment_method_filter`,
                overides: {
                    model_value: this.route.query?.payment_method_id ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        fetch_data_method: PreviewRecordFetcher.fetchPaymentMethodPreviewRecords
                    }
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
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.direction ?? ""
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

    // Method to format amount limit.
    private formatAmountLimit(amount: number | null): string {
        if (amount === null) {
            return "Infinity";
        }

        return InputTransformerUtil.nFormatter(InputTransformerUtil.roundToTwoDecimalPlaces(amount), 2);
    }

    // Method to format min/max limits.
    private formatLimits(record: CurrencyPaymentProviderMethodRecordInterface): string {
        const min_amount = this.formatAmountLimit(Number(record.min_amount));
        const max_amount = this.formatAmountLimit(Number(record.max_amount));

        return `${min_amount} - ${max_amount}`;
    }

    // Method to get table render config.
    protected getTableRenderConfig(): DataTableColumnRenderType<CurrencyPaymentProviderMethodRecordInterface>[] {
        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo(
            "currency_payment_provider_method_module.update_currency_payment_provider_method_status"
        );

        const columns: DataTableColumnRenderType<CurrencyPaymentProviderMethodRecordInterface>[] = [
            // S_N and Select All Column
            {
                key: "id",
                sortable: false,
                width: "w-[5%]",
                header: {
                    label_key: "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: {
                    render: () => DataTableSerialCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: CurrencyPaymentProviderMethodRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.id) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const record_ids = records.flatMap((row) => (row.id ? [row.id] : []));

                            return record_ids.length > 0 && record_ids.every((id) => selected_records.includes(id));
                        }

                        return selected_records.includes(record.id);
                    },
                    input_ui_boolean_props: (
                        record?: CurrencyPaymentProviderMethodRecordInterface
                    ): InputUIBooleanPropsInterface => {
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
                    input_action_props: (
                        record?: CurrencyPaymentProviderMethodRecordInterface
                    ): InputUIActionPropsInterface => ({
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
            // Currency Column
            {
                key: "currency_id",
                sortable: true,
                width: "w-[12%]",
                header: {
                    label_key:
                        "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.currency_text"
                },
                cell: {
                    render: () => DataTableAvatarInfoCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: CurrencyPaymentProviderMethodRecordInterface) => record.currency?.name ?? "",
                    getImgSubText: (record: CurrencyPaymentProviderMethodRecordInterface) => record.currency?.code ?? "",
                    getImgContent: (record: CurrencyPaymentProviderMethodRecordInterface) => record.currency?.name ?? "-",
                    getImgSrc: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.currency?.logo_url || DEFUALT_CURRENCY_LOGO_URL
                }
            },
            // Provider Column
            {
                key: "provider_method",
                sortable: false,
                width: "w-[14%]",
                header: {
                    label_key:
                        "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.provider_text"
                },
                cell: {
                    render: () => DataTableAvatarInfoCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.provider?.name ?? "",
                    getImgSubText: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.provider?.code ?? "",
                    getImgContent: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.provider?.name ?? "-",
                    getImgSrc: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.provider?.logo_url || DEFUALT_PAYMENT_PROVIDER_LOGO_URL
                }
            },
            // Payment Method Column
            {
                key: "provider_method_id",
                sortable: true,
                width: "w-[14%]",
                header: {
                    label_key:
                        "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.payment_method_text"
                },
                cell: {
                    render: () => DataTableAvatarInfoCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.payment_method?.name ?? "",
                    getImgSubText: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.payment_method?.code ?? "",
                    getImgContent: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.payment_method?.name ?? "-",
                    getImgSrc: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.payment_method?.icon_url || DEFUALT_PAYMENT_METHOD_ICON_URL
                }
            },
            // Direction Column
            {
                key: "provider_method",
                sortable: false,
                width: "w-[9%]",
                header: {
                    label_key:
                        "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.direction_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.provider_method?.direction?.toUpperCase?.() ?? "-"
                }
            },
            // Limits Column
            {
                key: "min_amount",
                sortable: false,
                width: "w-[10%]",
                header: {
                    label_key: "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.limits_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: CurrencyPaymentProviderMethodRecordInterface) => this.formatLimits(record)
                }
            },
            // Is Active Column
            {
                key: "is_active",
                sortable: true,
                width: "w-[8%]",
                header: {
                    label_key: "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.status_text"
                },
                cell: {
                    render: () => DataTableToggleCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    input_model_value: (record: CurrencyPaymentProviderMethodRecordInterface): InputValue =>
                        InputTransformerUtil.resolveTypedValue(record.is_active),
                    input_content_props: (): InputUIContentOptionsInterface => ({
                        loader_html_content: RenderHtmlUtil.renderLoaderHtml()
                    }),
                    input_ui_boolean_props: (
                        record: CurrencyPaymentProviderMethodRecordInterface
                    ): InputUIBooleanPropsInterface => ({
                        is_checked: record.is_active,
                        required: true,
                        disabled: false
                    }),
                    input_action_props: (
                        record: CurrencyPaymentProviderMethodRecordInterface
                    ): InputUIActionPropsInterface => ({
                        on_click: async (
                            event?: Event,
                            input_value?: InputValue,
                            input_config?: { props: InputUIPropsInterface }
                        ): Promise<ActionMethodRetrunInterface> =>
                            this.action_handler.handleStatusToggleChange(record, input_value)
                    })
                }
            },
            // Linked By Column
            {
                key: "linked_by_member",
                sortable: false,
                width: "w-[13%]",
                header: {
                    label_key:
                        "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.linked_by_text"
                },
                cell: {
                    render: () => DataTableLinkCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    icon_key: "member_icon",
                    getImgAltText: (record: CurrencyPaymentProviderMethodRecordInterface) => {
                        return getMemberFullName(record.linked_by_member) ?? "";
                    },
                    getLinkURL: (record: CurrencyPaymentProviderMethodRecordInterface) => {
                        return this.getRouteQueryLink("member_profile", record?.linked_by_member?.public_id);
                    },
                    getLinkText: (record: CurrencyPaymentProviderMethodRecordInterface) => {
                        return getMemberFullName(record.linked_by_member) || "-";
                    }
                }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: "w-[11%]",
                header: {
                    label_key:
                        "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: CurrencyPaymentProviderMethodRecordInterface) =>
                        record.created_at ? InputTransformerUtil.formatReadableDateTime(record.created_at) : "-"
                }
            },
            // Actions Column
            {
                key: "id",
                sortable: false,
                width: "w-[5%]",
                header: {
                    label_key:
                        "content_resource.currency_payment_provider_method_view_ui.list_view_ui.table.header.actions_text"
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
                        record: CurrencyPaymentProviderMethodRecordInterface,
                        record_index?: number
                    ): ButtonUIActionPropsInterface => ({
                        on_click: async (event?: MouseEvent, config?: { props: ButtonUIPropsInterface }): Promise<void> => {
                            this.action_handler.toggleActionMenu(record, record_index);
                        }
                    })
                }
            }
        ];

        return columns.filter((column) => can_change_status || column.key !== "is_active");
    }
}

export default CurrencyPaymentProviderMethodListViewController;
