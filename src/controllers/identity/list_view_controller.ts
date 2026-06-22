import { ListViewPropsInterface } from "@/ui_types/list_view_type";

import { IdentityRecordInterface } from "@/types/api_service_type";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_REGISTERED_APP_LOGO_URL } from "@/configs";

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

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import IdentityListViewActionHandler from "@/action_handlers/identity/list_view_action_handler";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class IdentityListViewController extends BaseListViewController<IdentityRecordInterface, "public_id"> {
    public readonly content_key = "identity";

    public readonly record_id_key: "public_id" = "public_id" as const;

    public action_handler: IdentityListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "public_id");
        this.action_handler = new IdentityListViewActionHandler(this);
    }

    // Identities are read-only in this release, so the page has no create action.
    protected getHeaderActionButtons(): ButtonUIPropsInterface[] {
        return [];
    }

    // Build filters from the identity list endpoint's supported query parameters.
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
            // Identity Type Filter
            {
                key: "identity_type_filter",
                type: "select",
                label_content_key: `${filters_content_key}.identity_type_filter`,
                input_content_key: `${filters_content_key}.identity_type_filter`,
                options_content_key: `${filters_content_key}.identity_type_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.identity_type ?? ""
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
            // Is Verified Filter
            {
                key: "is_verified_filter",
                type: "select",
                label_content_key: `${filters_content_key}.verified_filter`,
                input_content_key: `${filters_content_key}.verified_filter`,
                options_content_key: `${filters_content_key}.verified_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.is_verified ?? ""
                }
            },
            // Is Deleted Filter
            {
                key: "is_deleted_filter",
                type: "select",
                label_content_key: `${filters_content_key}.deleted_filter`,
                input_content_key: `${filters_content_key}.deleted_filter`,
                options_content_key: `${filters_content_key}.deleted_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.is_deleted ?? "false"
                }
            },
            // Source App filter
            {
                key: "source_app_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.source_app_filter`,
                input_content_key: `${filters_content_key}.source_app_filter`,
                overides: {
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                    },
                    model_value: this.route.query.source_app_id ?? ""
                }
            },
            // Registered App Filter
            {
                key: "registered_app_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.registered_app_filter`,
                input_content_key: `${filters_content_key}.registered_app_filter`,
                overides: {
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...input_actions,
                        fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                    },
                    model_value: this.route.query.registered_app_id ?? ""
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
            // Has Wallet Filter
            {
                key: "has_wallet_filter",
                type: "select",
                label_content_key: `${filters_content_key}.has_wallet_filter`,
                input_content_key: `${filters_content_key}.has_wallet_filter`,
                options_content_key: `${filters_content_key}.has_wallet_filter.option_list`,
                overides: {
                    action_props: input_actions,
                    model_value: this.route.query.has_wallet ?? ""
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

    // Method to get identity Profile record
    private getProfile(record: IdentityRecordInterface) {
        return record.primary_profile ?? record.profile;
    }

    // Method to get Identity Display Name
    private getIdentityDisplayName(record: IdentityRecordInterface): string {
        const profile = this.getProfile(record);
        const full_name = [profile?.first_name, profile?.middle_name, profile?.last_name].filter(Boolean).join(" ");

        return profile?.display_name || full_name || record.public_id;
    }

    // Method to get Identity Primary Contact
    private getPrimaryContact(record: IdentityRecordInterface): string {
        const profile = this.getProfile(record);
        const primary_contact = record.contacts?.find((contact) => contact.is_primary);

        return (
            profile?.primary_email ||
            profile?.primary_phone ||
            primary_contact?.contact_value ||
            record.contacts?.[0]?.contact_value ||
            "-"
        );
    }

    // Method to get table render config
    protected getTableRenderConfig(): DataTableColumnRenderType<IdentityRecordInterface>[] {
        return [
            // Sn/Selection Column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: { render: () => DataTableSerialCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: IdentityRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];

                        if (!record?.public_id) {
                            return records.length > 0 && records.every((row) => selected_records.includes(row.public_id));
                        }

                        return selected_records.includes(record.public_id);
                    },
                    input_ui_boolean_props: (record?: IdentityRecordInterface): InputUIBooleanPropsInterface => {
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
                    input_action_props: (record?: IdentityRecordInterface): InputUIActionPropsInterface => ({
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
            // Identity name, ID and profile photo Column
            {
                key: "public_id",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_18,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.identity_text"
                },
                cell: { render: () => DataTableAvatarInfoCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: IdentityRecordInterface) => this.getIdentityDisplayName(record),
                    getImgSubText: (record: IdentityRecordInterface) => record.public_id,
                    getImgContent: (record: IdentityRecordInterface) => this.getIdentityDisplayName(record),
                    getImgSrc: (record: IdentityRecordInterface) =>
                        this.getProfile(record)?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL
                }
            },
            // Identity Type Column
            {
                key: "identity_type",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.type_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityRecordInterface) => DisplayFormatterUtil.formatLabel(record.identity_type)
                }
            },
            // Primary Source App column
            {
                key: "primary_source_app_id",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.source_app_text"
                },
                cell: { render: () => DataTableAvatarInfoCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: IdentityRecordInterface) => record.primary_source_app?.name || "Source app",
                    getImgSubText: (record: IdentityRecordInterface) => record.primary_source_app?.prefix || "-",
                    getImgContent: (record: IdentityRecordInterface) => record.primary_source_app?.name || "-",
                    getImgSrc: (record: IdentityRecordInterface) =>
                        record.primary_source_app?.logo_url || DEFUALT_REGISTERED_APP_LOGO_URL
                }
            },
            // Profile Contact Info column
            {
                key: "profile",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_12,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.contact_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityRecordInterface) => this.getPrimaryContact(record)
                }
            },
            // Number of Wallets Info column
            {
                key: "wallets",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_7,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.wallets_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityRecordInterface) => {
                        return record.wallet_count?.toString() ?? "-";
                    }
                }
            },
            // Is Verified column
            {
                key: "is_verified",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.verified_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityRecordInterface) => (record.is_verified ? "Verified" : "Unverified")
                }
            },
            // Status Column
            {
                key: "status",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.status_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: IdentityRecordInterface) =>
                        record.is_deleted ? "Deleted" : DisplayFormatterUtil.formatLabel(record.status)
                }
            },
            // Created At column
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: { render: () => DataTableTextContentCellUI },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: IdentityRecordInterface) =>
                        record.created_at ? InputTransformerUtil.formatReadableDateTime(record.created_at) : "-"
                }
            },
            // Action Menu column
            {
                key: "public_id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: "content_resource.identity_view_ui.list_view_ui.table.header.actions_text"
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
                        record: IdentityRecordInterface,
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

export default IdentityListViewController;
