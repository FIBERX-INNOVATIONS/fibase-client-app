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

import { DEFUALT_REGISTERED_APP_LOGO_URL } from "@/configs";

import { getMemberFullName, RegisteredAppRecordInterface } from "@/types/api_service_type";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import RegisteredAppListViewActionHandler from "@/action_handlers/registered_app/list_view_action_handler";

import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";

import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";
import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

class RegisteredAppListViewController extends BaseListViewController<
    RegisteredAppRecordInterface,
    "public_id"
> {
    public readonly content_key: string = "registered_app";

    public readonly record_id_key: "public_id" = "public_id" as const;

    public action_handler: RegisteredAppListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "public_id");

        this.action_handler = new RegisteredAppListViewActionHandler(this);
    }

    // Method to get page filters
    protected getPageFilters(): ListFilterConfig[] {
        const page_key = this.content_key;
        const { filters_content_key } = this.getListViewContentKeys(page_key);
        return [
            // Search Filter
            {
                key: "search",
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
                key: "is_active",
                type: "select",
                label_content_key: `${filters_content_key}.status_filter`,
                input_content_key: `${filters_content_key}.status_filter`,
                options_content_key: `${filters_content_key}.status_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_active ?? ""
                }
            },
            // Created By Filter
            {
                key: "created_by",
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
            // Key Version Filter
            {
                key: "key_version",
                type: "number",
                label_content_key: `${filters_content_key}.key_version_filter`,
                input_content_key: `${filters_content_key}.key_version_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.key_version ?? ""
                }
            },
            // Date Range Filter
            {
                key: "date_range",
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
    protected getTableRenderConfig(): DataTableColumnRenderType<RegisteredAppRecordInterface>[] {
        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo(
            "registered_app_module.update_registered_app_status"
        );

        const columns: DataTableColumnRenderType<RegisteredAppRecordInterface>[] = [
            // s_n column with select chnage
            {
                key: "public_id",
                sortable: false,
                width: "w-[5%]",
                header: {
                    label_key:
                        "content_resource.registered_app_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: {
                    render: (_row, index) => {
                        return DataTableSerialCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    is_selected: false,

                    input_model_value: (record: RegisteredAppRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.public_id) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const method_public_ids = records.map((row) => row.public_id);

                            return (
                                method_public_ids.length > 0 &&
                                method_public_ids.every((public_id) =>
                                    selected_records.includes(public_id)
                                )
                            );
                        }

                        return selected_records.includes(record.public_id);
                    },

                    input_ui_boolean_props: (
                        record: RegisteredAppRecordInterface
                    ): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const method_public_ids = records.map((row) => row.public_id);
                        const is_checked = record?.public_id
                            ? selected_records.includes(record.public_id)
                            : method_public_ids.length > 0 &&
                              method_public_ids.every((public_id) =>
                                  selected_records.includes(public_id)
                              );

                        return {
                            is_checked,
                            required: true,
                            disabled: false
                        };
                    },

                    input_action_props: (
                        record?: RegisteredAppRecordInterface
                    ): InputUIActionPropsInterface => {
                        return {
                            on_click: async (
                                event?: Event,
                                input_value?: InputValue,
                                input_config?: { props: InputUIPropsInterface }
                            ): Promise<ActionMethodRetrunInterface> => {
                                if (record !== undefined) {
                                    return this.action_handler.handleOnRecordRowSelected(
                                        record,
                                        input_value
                                    );
                                }

                                return this.action_handler.handleOnSelectAllRows();
                            }
                        };
                    }
                }
            },
            // registered app name, logo, public id column
            {
                key: "name",
                sortable: true,
                width: "w-[25%]",
                header: {
                    label_key:
                        "content_resource.registered_app_view_ui.list_view_ui.table.header.name_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableAvatarInfoCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: RegisteredAppRecordInterface) => record.name,

                    getImgSubText: (record: RegisteredAppRecordInterface) =>
                        record.public_id ?? "-",

                    getImgContent: (record: RegisteredAppRecordInterface) => record.name,

                    getImgSrc: (record: RegisteredAppRecordInterface) => {
                        if (record?.logo_url && !record?.logo_url?.includes("test.com")) {
                            return record.logo_url;
                        }

                        return DEFUALT_REGISTERED_APP_LOGO_URL;
                    }
                }
            },
            // Registered App base url column
            {
                key: "base_url",
                sortable: true,
                width: "w-[15%]",
                header: {
                    label_key:
                        "content_resource.registered_app_view_ui.list_view_ui.table.header.base_url_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableLinkCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles
                }
            },
            // Creator Base URL column
            {
                key: "creator",
                sortable: true,
                width: "w-[15%]",
                header: {
                    label_key:
                        "content_resource.registered_app_view_ui.list_view_ui.table.header.creator_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableLinkCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    icon_key: "member_icon",

                    // getImgSrc: (record: RegisteredAppRecordInterface) => record?.creator?.profile_photo_link ?? "",

                    getImgAltText: (record: RegisteredAppRecordInterface) =>
                        getMemberFullName(record?.creator) ?? "",

                    getLinkURL: (record: RegisteredAppRecordInterface) =>
                        record?.creator?.public_id
                            ? `/members?member-profile=${record?.creator?.public_id}`
                            : "",

                    getLinkText: (record: RegisteredAppRecordInterface) =>
                        getMemberFullName(record?.creator) ?? ""
                }
            },
            // Status toggle column
            {
                key: "is_active",
                sortable: true,
                width: "w-[10%]",
                header: {
                    label_key:
                        "content_resource.registered_app_view_ui.list_view_ui.table.header.status_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableToggleCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    input_model_value: (record: RegisteredAppRecordInterface): InputValue => {
                        return InputTransformerUtil.resolveTypedValue(record.is_active);
                    },

                    input_content_props: (
                        record: RegisteredAppRecordInterface
                    ): InputUIContentOptionsInterface => {
                        return {
                            loader_html_content: RenderHtmlUtil.renderLoaderHtml()
                        };
                    },

                    input_ui_boolean_props: (
                        record: RegisteredAppRecordInterface
                    ): InputUIBooleanPropsInterface => {
                        return {
                            is_checked: record.is_active,

                            required: true,

                            disabled: false
                        };
                    },

                    input_action_props: (
                        record: RegisteredAppRecordInterface
                    ): InputUIActionPropsInterface => {
                        return {
                            on_click: async (
                                event?: Event,
                                input_value?: InputValue,
                                input_config?: { props: InputUIPropsInterface }
                            ): Promise<ActionMethodRetrunInterface> => {
                                return this.action_handler.handleStatusToggleChange(
                                    record,
                                    input_value
                                );
                            }
                        };
                    }
                }
            },
            // Created at column
            {
                key: "created_at",
                sortable: true,
                width: "w-[22%]",
                header: {
                    label_key:
                        "content_resource.registered_app_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableTextContentCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    getDateTextContent: (record: RegisteredAppRecordInterface) => {
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
                key: "public_id",
                sortable: false,
                width: "w-[8%]",
                header: {
                    label_key:
                        "content_resource.registered_app_view_ui.list_view_ui.table.header.actions_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableActionIconCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    button_content_props: (
                        record: RegisteredAppRecordInterface
                    ): ButtonUIContentOptionsInterface => {
                        return {
                            button_html_content: RenderHtmlUtil.renderHtml({
                                icon: "vertical_elipsis_svg_icon",
                                class_style:
                                    this.list_view_class_styles.table_cell_components_class_styles
                                        .button_ui_class_style?.content_class_style,
                                icon_class_style:
                                    this.list_view_class_styles.table_cell_components_class_styles
                                        .button_ui_class_style?.icon_class_style
                            }),

                            loading_html_content: RenderHtmlUtil.renderLoaderHtml({
                                class_style:
                                    this.list_view_class_styles.table_cell_components_class_styles
                                        .button_ui_class_style?.icon_class_style
                            })
                        };
                    },

                    button_action_props: (
                        record: RegisteredAppRecordInterface,
                        record_index?: number
                    ): ButtonUIActionPropsInterface => {
                        return {
                            on_click: async (
                                event?: MouseEvent,
                                config?: { props: ButtonUIPropsInterface }
                            ): Promise<void> => {
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

export default RegisteredAppListViewController;
