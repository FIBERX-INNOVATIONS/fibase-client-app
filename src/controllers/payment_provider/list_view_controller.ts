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

import { DEFUALT_PAYMENT_PROVIDER_LOGO_URL } from "@/configs";

import { getMemberFullName, PaymentProviderRecordInterface } from "@/types/api_service_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import PaymentProviderListViewActionHandler from "@/action_handlers/payment_provider/list_view_action_handler";

import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";

import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class PaymentProviderListViewController extends BaseListViewController<PaymentProviderRecordInterface, "id"> {
    public readonly content_key: string = "payment_provider";

    public readonly record_id_key: "id" = "id" as const;

    public action_handler: PaymentProviderListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "id");

        this.action_handler = new PaymentProviderListViewActionHandler(this);
    }

    // Method to get page filters.
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return [
            // Keyword filter
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
            // Is Active Filter
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
            // Provider Type Filter
            {
                key: "provider_type_filter",
                type: "select",
                label_content_key: `${filters_content_key}.provider_type_filter`,
                input_content_key: `${filters_content_key}.provider_type_filter`,
                options_content_key: `${filters_content_key}.provider_type_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.provider_type ?? ""
                }
            },
            // Created By fIlter
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
    protected getTableRenderConfig(): DataTableColumnRenderType<PaymentProviderRecordInterface>[] {
        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo(
            "payment_provider_module.update_payment_provider_status"
        );

        const columns: DataTableColumnRenderType<PaymentProviderRecordInterface>[] = [
            // S_n and Selection Column
            {
                key: "id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: {
                    render: () => DataTableSerialCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: PaymentProviderRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.id) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const provider_ids = records.map((row) => row.id);

                            return provider_ids.length > 0 && provider_ids.every((id) => selected_records.includes(id));
                        }

                        return selected_records.includes(record.id);
                    },
                    input_ui_boolean_props: (record?: PaymentProviderRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const provider_ids = records.map((row) => row.id);
                        const is_checked = record?.id
                            ? selected_records.includes(record.id)
                            : provider_ids.length > 0 && provider_ids.every((id) => selected_records.includes(id));

                        return {
                            is_checked,
                            required: true,
                            disabled: !record?.id && provider_ids.length === 0
                        };
                    },
                    input_action_props: (record?: PaymentProviderRecordInterface): InputUIActionPropsInterface => ({
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
            // Provider Name Column
            {
                key: "name",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_22,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.provider_text"
                },
                cell: {
                    render: () => DataTableAvatarInfoCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: PaymentProviderRecordInterface) => record.name,
                    getImgSubText: (record: PaymentProviderRecordInterface) => record.code,
                    getImgContent: (record: PaymentProviderRecordInterface) => record.name,
                    getImgSrc: (record: PaymentProviderRecordInterface) => record.logo_url || DEFUALT_PAYMENT_PROVIDER_LOGO_URL
                }
            },
            // Provider Type Column
            {
                key: "provider_type",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.provider_type_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: PaymentProviderRecordInterface) => {
                        return DisplayFormatterUtil.formatLabel(record.provider_type);
                    }
                }
            },
            // Website URL Column
            {
                key: "website_url",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_17,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.website_text"
                },
                cell: {
                    render: () => DataTableLinkCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    link_target: "_blank",
                    getLinkURL: (record: PaymentProviderRecordInterface) => record.website_url ?? "",
                    getLinkText: (record: PaymentProviderRecordInterface) => record.website_url || "-"
                }
            },
            // Is Active Column
            {
                key: "is_active",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.status_text"
                },
                cell: {
                    render: () => DataTableToggleCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    input_model_value: (record: PaymentProviderRecordInterface): InputValue =>
                        InputTransformerUtil.resolveTypedValue(record.is_active),
                    input_content_props: (): InputUIContentOptionsInterface => ({
                        loader_html_content: RenderHtmlUtil.renderLoaderHtml()
                    }),
                    input_ui_boolean_props: (record: PaymentProviderRecordInterface): InputUIBooleanPropsInterface => ({
                        is_checked: record.is_active,
                        required: true,
                        disabled: false
                    }),
                    input_action_props: (record: PaymentProviderRecordInterface): InputUIActionPropsInterface => ({
                        on_click: async (
                            event?: Event,
                            input_value?: InputValue,
                            input_config?: { props: InputUIPropsInterface }
                        ): Promise<ActionMethodRetrunInterface> =>
                            this.action_handler.handleStatusToggleChange(record, input_value)
                    })
                }
            },
            // Created By Column
            {
                key: "creator",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.creator_text"
                },
                cell: {
                    render: () => DataTableLinkCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    icon_key: "member_icon",
                    // link_target: "_blank",
                    getImgAltText: (record: PaymentProviderRecordInterface) => getMemberFullName(record.creator) ?? "",
                    getLinkURL: (record: PaymentProviderRecordInterface) =>
                        this.getRouteQueryLink("member_profile", record?.creator?.public_id),
                    getLinkText: (record: PaymentProviderRecordInterface) => getMemberFullName(record.creator) || "-"
                }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_15,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: PaymentProviderRecordInterface) =>
                        record.created_at ? InputTransformerUtil.formatReadableDateTime(record.created_at) : "-"
                }
            },
            // Actions Column
            {
                key: "id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.payment_provider_view_ui.list_view_ui.table.header.actions_text"
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
                        record: PaymentProviderRecordInterface,
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

export default PaymentProviderListViewController;
