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

import { getMemberFullName, PaymentMethodRecordInterface } from "@/types/api_service_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import PaymentMethodListViewActionHandler from "@/action_handlers/payment_method/list_view_action_handler";

import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";

import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class PaymentMethodListViewController extends BaseListViewController<PaymentMethodRecordInterface, "id"> {
    public readonly content_key: string = "payment_method";

    public readonly record_id_key: "id" = "id" as const;

    public action_handler: PaymentMethodListViewActionHandler;

    private readonly content_manager = ContentManagerUtil.getInstance();

    constructor(props: ListViewPropsInterface) {
        super(props, "id");

        this.action_handler = new PaymentMethodListViewActionHandler(this);
    }

    // Method to format method capabilities for the table.
    private getCapabilitiesText(record: PaymentMethodRecordInterface): string {
        const capabilities_content_key = "content_resource.payment_method_view_ui.list_view_ui.table.capabilities";
        const capabilities = [
            record.metadata?.supports_deposit
                ? this.content_manager.get<string>(`${capabilities_content_key}.supports_deposit_text`, "Deposit")
                : "",
            record.metadata?.supports_withdrawal
                ? this.content_manager.get<string>(`${capabilities_content_key}.supports_withdrawal_text`, "Withdrawal")
                : "",
            record.metadata?.supports_refund
                ? this.content_manager.get<string>(`${capabilities_content_key}.supports_refund_text`, "Refund")
                : "",
            record.metadata?.requires_redirect
                ? this.content_manager.get<string>(`${capabilities_content_key}.requires_redirect_text`, "Redirect")
                : ""
        ].filter(Boolean);

        return capabilities.length
            ? capabilities.join(this.content_manager.get<string>(`${capabilities_content_key}.separator_text`, ", ") ?? ", ")
            : (this.content_manager.get<string>(`${capabilities_content_key}.empty_text`, "-") ?? "-");
    }

    // Method to get page filters.
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
            // display Ggroup Filter
            {
                key: "display_group_filter",
                type: "select",
                label_content_key: `${filters_content_key}.display_group_filter`,
                input_content_key: `${filters_content_key}.display_group_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.display_group ?? ""
                }
            },
            // Supports Deposit Filter
            {
                key: "supports_deposit_filter",
                type: "select",
                label_content_key: `${filters_content_key}.supports_deposit_filter`,
                input_content_key: `${filters_content_key}.supports_deposit_filter`,
                options_content_key: `${filters_content_key}.supports_deposit_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.supports_deposit ?? ""
                }
            },
            // Supports withdrawal Filter
            {
                key: "supports_withdrawal_filter",
                type: "select",
                label_content_key: `${filters_content_key}.supports_withdrawal_filter`,
                input_content_key: `${filters_content_key}.supports_withdrawal_filter`,
                options_content_key: `${filters_content_key}.supports_withdrawal_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.supports_withdrawal ?? ""
                }
            },
            // Supports Refund Filter
            {
                key: "supports_refund_filter",
                type: "select",
                label_content_key: `${filters_content_key}.supports_refund_filter`,
                input_content_key: `${filters_content_key}.supports_refund_filter`,
                options_content_key: `${filters_content_key}.supports_refund_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.supports_refund ?? ""
                }
            },
            // Requires Redirect Filter
            {
                key: "requires_redirect_filter",
                type: "select",
                label_content_key: `${filters_content_key}.requires_redirect_filter`,
                input_content_key: `${filters_content_key}.requires_redirect_filter`,
                options_content_key: `${filters_content_key}.requires_redirect_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.requires_redirect ?? ""
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
    protected getTableRenderConfig(): DataTableColumnRenderType<PaymentMethodRecordInterface>[] {
        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo(
            "payment_method_module.update_payment_method_status"
        );

        const columns: DataTableColumnRenderType<PaymentMethodRecordInterface>[] = [
            // Code column
            {
                key: "id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: {
                    render: () => {
                        return DataTableSerialCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: PaymentMethodRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.id) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const method_ids = records.map((row) => row.id);

                            return method_ids.length > 0 && method_ids.every((id) => selected_records.includes(id));
                        }

                        return selected_records.includes(record.id);
                    },
                    input_ui_boolean_props: (record?: PaymentMethodRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const method_ids = records.map((row) => row.id);
                        const is_checked = record?.id
                            ? selected_records.includes(record.id)
                            : method_ids.length > 0 && method_ids.every((id) => selected_records.includes(id));

                        return {
                            is_checked,
                            required: true,
                            disabled: false
                        };
                    },
                    input_action_props: (record?: PaymentMethodRecordInterface): InputUIActionPropsInterface => {
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
            // Name column
            {
                key: "name",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_22,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.method_text"
                },
                cell: {
                    render: () => {
                        return DataTableAvatarInfoCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: PaymentMethodRecordInterface) => record.name,
                    getImgSubText: (record: PaymentMethodRecordInterface) => record.code,
                    getImgContent: (record: PaymentMethodRecordInterface) => record.metadata?.display_name || record.name,
                    getImgSrc: (record: PaymentMethodRecordInterface) => record.icon_url ?? ""
                }
            },
            // Display gorup Column
            {
                key: "metadata",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.display_group_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: PaymentMethodRecordInterface) => record.metadata?.display_group ?? "-"
                }
            },
            // Capabilites Column
            {
                key: "metadata",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_15,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.capabilities_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: PaymentMethodRecordInterface) => this.getCapabilitiesText(record)
                }
            },
            // Sort Order column
            {
                key: "sort_order",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.sort_order_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles
                }
            },
            // Is Active Column
            {
                key: "is_active",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_9,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.status_text"
                },
                cell: {
                    render: () => {
                        return DataTableToggleCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    input_model_value: (record: PaymentMethodRecordInterface): InputValue => {
                        return InputTransformerUtil.resolveTypedValue(record.is_active);
                    },
                    input_content_props: (record: PaymentMethodRecordInterface): InputUIContentOptionsInterface => {
                        return {
                            loader_html_content: RenderHtmlUtil.renderLoaderHtml()
                        };
                    },
                    input_ui_boolean_props: (record: PaymentMethodRecordInterface): InputUIBooleanPropsInterface => {
                        return {
                            is_checked: record.is_active,
                            required: true,
                            disabled: false
                        };
                    },
                    input_action_props: (record: PaymentMethodRecordInterface): InputUIActionPropsInterface => {
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
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.creator_text"
                },
                cell: {
                    render: () => {
                        return DataTableLinkCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    icon_key: "member_icon",
                    getImgAltText: (record: PaymentMethodRecordInterface) => getMemberFullName(record?.creator) ?? "",
                    getLinkURL: (record: PaymentMethodRecordInterface) =>
                        this.getRouteQueryLink("member_profile", record?.creator?.public_id),
                    getLinkText: (record: PaymentMethodRecordInterface) => getMemberFullName(record?.creator) || "-"
                }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: PaymentMethodRecordInterface) => {
                        const raw_date = record?.created_at;

                        return raw_date ? InputTransformerUtil.formatReadableDateTime(raw_date) : "-";
                    }
                }
            },
            // Actions column
            {
                key: "id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_6,
                header: {
                    label_key: "content_resource.payment_method_view_ui.list_view_ui.table.header.actions_text"
                },
                cell: {
                    render: () => {
                        return DataTableActionIconCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    button_content_props: (record: PaymentMethodRecordInterface): ButtonUIContentOptionsInterface => {
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
                        record: PaymentMethodRecordInterface,
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

export default PaymentMethodListViewController;
