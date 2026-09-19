import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import type { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import type { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";

import type { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import type { AppWebhookDeliveryRecordInterface } from "@/types/app_webhook_delivery_type";

import type { ListStateInterface, ListViewPropsInterface, ListViewStateDataInterface } from "@/ui_types/list_view_type";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import AppWebhookDeliveryListViewActionHandler from "@/action_handlers/app_webhook_delivery/list_view_action_handler";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class AppWebhookDeliveryListViewController extends BaseListViewController<AppWebhookDeliveryRecordInterface, "public_id"> {
    public readonly content_key = "app_webhook_delivery";

    public action_handler: AppWebhookDeliveryListViewActionHandler;

    // Method to initialise the delivery list with shared list state and actions.
    constructor(props: ListViewPropsInterface) {
        super(props, "public_id");
        this.action_handler = new AppWebhookDeliveryListViewActionHandler(this);
    }

    // Method to start delivery history with the most recently created events.
    protected getDefaultListState(): ListStateInterface<AppWebhookDeliveryRecordInterface> {
        return { ...super.getDefaultListState(), limit: 20, sort_by: "created_at", sort_direction: "desc" };
    }

    // Method to build the permission-gated test webhook header action.
    protected getHeaderActionButtons(): ButtonUIPropsInterface[] {
        return [
            ButtonUIPropsBuilder.getReactivePropsObject(
                APP_WEBHOOK_DELIVERY_PERMISSIONS.TEST,
                "content_resource.app_webhook_delivery_view_ui.list_view_ui.header_section.test_btn.btn_text",
                "paper_airplane_send_svg_icon",
                "button",
                {
                    class_styles: this.list_view_class_styles.page_header_class_styles.action_button_class_styles,
                    action_props: { on_click: this.action_handler.handleTestDeliveryClicked }
                }
            )
        ];
    }

    // Method to retain selection while hiding unsupported bulk operations.
    protected getDataTableResultAndBulkActionBarProps(
        page_key: string,
        list_state: ListStateInterface<AppWebhookDeliveryRecordInterface>
    ): ListViewStateDataInterface<
        AppWebhookDeliveryRecordInterface,
        "public_id"
    >["data_table_result_and_bulk_action_bar_props"] {
        const props = super.getDataTableResultAndBulkActionBarProps(page_key, list_state);

        if (props.selection_props) {
            props.selection_props.show_bulk_button = false;
        }

        return props;
    }

    // Method to configure registered-app preview search and delivery event/status filters.
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return ["app_id", "event_type", "status"].map((key): ListFilterConfig => {
            return {
                key: `${key}_filter`,
                type: key === "app_id" ? "select_search" : "select",
                label_content_key: `${filters_content_key}.${key}_filter`,
                input_content_key: `${filters_content_key}.${key}_filter`,
                options_content_key: key === "app_id" ? undefined : `${filters_content_key}.${key}_filter.option_list`,
                overides: {
                    content_props:
                        key === "app_id" ? { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon } : undefined,
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        ...(key === "app_id"
                            ? { fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords }
                            : {})
                    },
                    model_value: this.route.query[key] ?? ""
                }
            };
        });
    }

    // Method to resolve individual and page-wide checkbox selection state.
    private isRecordSelected(record?: AppWebhookDeliveryRecordInterface): boolean {
        const selected_records = this.state_refs.selected_records.value;

        if (record?.public_id) {
            return selected_records.includes(record.public_id);
        }

        const records = this.getListState().records;

        return (
            records.length > 0 &&
            records.every((row) => {
                return selected_records.includes(row.public_id);
            })
        );
    }

    // Method to configure safe delivery cells and permission-aware row actions.
    protected getTableRenderConfig(): DataTableColumnRenderType<AppWebhookDeliveryRecordInterface>[] {
        const content_manager = ContentManagerUtil.getInstance();

        const cell_styles = this.list_view_class_styles.table_cell_components_class_styles;

        const base_key = "content_resource.app_webhook_delivery_view_ui.list_view_ui.table";

        const empty_value = content_manager.get<string>(`${base_key}.values.empty_value_text`, "-") ?? "-";

        return [
            // S_n column
            {
                key: "public_id",
                sortable: false,
                header: { label_key: `${base_key}.header.sn_text` },
                cell: {
                    render: () => {
                        return DataTableSerialCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    is_selected: false,
                    input_model_value: (record?: AppWebhookDeliveryRecordInterface) => {
                        return this.isRecordSelected(record);
                    },
                    input_ui_boolean_props: (record?: AppWebhookDeliveryRecordInterface) => {
                        return {
                            is_checked: this.isRecordSelected(record),
                            disabled: !MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.LIST)
                        };
                    },
                    input_action_props: (record?: AppWebhookDeliveryRecordInterface) => {
                        return {
                            on_click: async () => {
                                if (!MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.LIST)) {
                                    return { status: false, msg: content_manager.getAPIResponseValue("permission_denied") };
                                }
                                if (record?.public_id) {
                                    return await this.action_handler.handleOnRecordRowSelected(record);
                                }
                                return await this.action_handler.handleOnSelectAllRows();
                            }
                        };
                    }
                }
            },
            // Public Id Column
            {
                key: "public_id",
                sortable: false,
                header: { label_key: `${base_key}.header.public_id_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return record.public_id;
                    }
                }
            },
            // Registered App Column
            {
                key: "app",
                sortable: false,
                header: { label_key: `${base_key}.header.app_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return record.app?.name ?? record.app?.public_id ?? empty_value;
                    }
                }
            },
            // Event Type Column
            {
                key: "event_type",
                sortable: true,
                header: { label_key: `${base_key}.header.event_type_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return record.event_type;
                    }
                }
            },
            // Staus Column
            {
                key: "status",
                sortable: true,
                header: { label_key: `${base_key}.header.status_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return (
                            content_manager.get<string>(
                                `content_resource.app_webhook_delivery_view_ui.status_labels.${record.status}`,
                                record.status
                            ) ?? record.status
                        );
                    }
                }
            },
            // Attempts Column
            {
                key: "attempts",
                sortable: true,
                header: { label_key: `${base_key}.header.attempts_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return (
                            content_manager.get<string>(
                                `${base_key}.values.attempts_text`,
                                "{{attempts}} of {{max_attempts}}"
                            ) ?? ""
                        )
                            .replace("{{attempts}}", String(record.attempts))
                            .replace("{{max_attempts}}", String(record.max_attempts));
                    }
                }
            },
            // Response Staus Code Column
            {
                key: "response_status_code",
                sortable: false,
                header: { label_key: `${base_key}.header.response_status_code_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return String(record.response_status_code ?? empty_value);
                    }
                }
            },
            // Last Attempt At Column
            {
                key: "last_attempt_at",
                sortable: false,
                header: { label_key: `${base_key}.header.last_attempt_at_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return DisplayFormatterUtil.formatDateTime(record.last_attempt_at, empty_value);
                    }
                }
            },
            // Created At Column
            {
                key: "created_at",
                sortable: true,
                header: { label_key: `${base_key}.header.created_at_text` },
                cell: {
                    render: () => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    getTextContent: (record: AppWebhookDeliveryRecordInterface): string => {
                        return DisplayFormatterUtil.formatDateTime(record.created_at, empty_value);
                    }
                }
            },
            // Actions Column
            {
                key: "public_id",
                sortable: false,
                header: { label_key: `${base_key}.header.actions_text` },
                cell: {
                    render: () => {
                        return DataTableActionIconCellUI;
                    }
                },
                props: {
                    class_styles: cell_styles,
                    button_content_props: () => {
                        return {
                            button_html_content: RenderHtmlUtil.renderHtml({
                                icon: "vertical_elipsis_svg_icon",
                                class_style: cell_styles.button_ui_class_style?.content_class_style,
                                icon_class_style: cell_styles.button_ui_class_style?.icon_class_style
                            })
                        };
                    },
                    button_action_props: (record: AppWebhookDeliveryRecordInterface, record_index?: number) => {
                        return {
                            on_click: async (): Promise<void> => {
                                this.action_handler.toggleActionMenu(record, record_index);
                            }
                        };
                    }
                }
            }
        ];
    }
}

export default AppWebhookDeliveryListViewController;
