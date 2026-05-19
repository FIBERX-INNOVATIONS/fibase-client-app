import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";
import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";
import { DataTableColumnRenderType } from "@ui/version_3/ui_types/data_table_ui_type";

import { getMemberFullName, RegisteredAppRecordInterface } from "@/types/api_service_type";

import {
    ActionMethodRetrunInterface,
    InputUIActionPropsInterface,
    InputUIBooleanPropsInterface,
    InputUIContentOptionsInterface,
    InputUIPropsInterface,
    InputValue
} from "@ui/version_3/ui_types/input_ui_type";

import {
    ButtonUIActionPropsInterface,
    ButtonUIContentOptionsInterface,
    ButtonUIPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import { DEFUALT_REGISTERED_APP_LOGO_URL } from "@/configs/constants";

import { ListViewPropsInterface } from "@/ui_types/list_view_type";

import RegisteredAppListViewActionHandler from "@/action_handlers/registered_app/list_view_action_handler";
import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";
import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";
import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";
import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";
import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";
import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

class RegisteredAppListViewController extends BaseListViewController<RegisteredAppRecordInterface, "public_id"> {
    public action_handler: RegisteredAppListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "public_id");

        this.action_handler = new RegisteredAppListViewActionHandler(this);

        this.getComponentDefinition();
    }

    public getPageContentKey(): string {
        return "registered_app";
    }

    protected getPageFilters(): ListFilterConfig[] {
        const page_key = this.getPageContentKey();
        const filters_content_key = `content_resource.${page_key}_view_ui.list_view_ui.filters_section`;
        return [
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
            {
                key: "created_by",
                type: "select_search",
                label_content_key: `${filters_content_key}.created_by_filter`,
                input_content_key: `${filters_content_key}.created_by_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.created_by ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    }
                }
            },
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

    public getTableRowKey(): keyof RegisteredAppRecordInterface {
        return "public_id" as keyof RegisteredAppRecordInterface;
    }

    protected getTableRenderConfig(): DataTableColumnRenderType<RegisteredAppRecordInterface>[] {
        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo(
            "registered_app_module.update_registered_app_status"
        );

        const columns: DataTableColumnRenderType<RegisteredAppRecordInterface>[] = [
            {
                key: "public_id",
                sortable: false,
                width: "w-[5%]",
                header: {
                    label_key: "content_resource.registered_app_view_ui.list_view_ui.table.header.sn_text"
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
                        return this.state_refs.selected_records.value.includes(record.public_id);
                    },

                    input_ui_boolean_props: (record: RegisteredAppRecordInterface): InputUIBooleanPropsInterface => {
                        return {
                            is_checked: this.state_refs.selected_records.value.includes(record.public_id),

                            required: true,

                            disabled: false
                        };
                    },

                    input_action_props: (record?: RegisteredAppRecordInterface): InputUIActionPropsInterface => {
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

            {
                key: "name",
                sortable: true,
                width: "w-[25%]",
                header: {
                    label_key: "content_resource.registered_app_view_ui.list_view_ui.table.header.name_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableAvatarInfoCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: RegisteredAppRecordInterface) => record.name,

                    getImgSubText: (record: RegisteredAppRecordInterface) => record.public_id ?? "-",

                    getImgContent: (record: RegisteredAppRecordInterface) => record.name,

                    getImgSrc: (record: RegisteredAppRecordInterface) => {
                        if (record?.logo_url && !record?.logo_url?.includes("test.com")) {
                            return record.logo_url;
                        }

                        return DEFUALT_REGISTERED_APP_LOGO_URL;
                    }
                }
            },

            {
                key: "base_url",
                sortable: true,
                width: "w-[15%]",
                header: {
                    label_key: "content_resource.registered_app_view_ui.list_view_ui.table.header.base_url_text"
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

            {
                key: "creator",
                sortable: true,
                width: "w-[15%]",
                header: {
                    label_key: "content_resource.registered_app_view_ui.list_view_ui.table.header.creator_text"
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

                    getImgAltText: (record: RegisteredAppRecordInterface) => getMemberFullName(record?.creator) ?? "",

                    getLinkURL: (record: RegisteredAppRecordInterface) =>
                        record?.creator?.public_id ? `/members?member-profile=${record?.creator?.public_id}` : "",

                    getLinkText: (record: RegisteredAppRecordInterface) => getMemberFullName(record?.creator) ?? ""
                }
            },

            {
                key: "is_active",
                sortable: true,
                width: "w-[10%]",
                header: {
                    label_key: "content_resource.registered_app_view_ui.list_view_ui.table.header.status_text"
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

                    input_content_props: (record: RegisteredAppRecordInterface): InputUIContentOptionsInterface => {
                        return {
                            loader_html_content: RenderHtmlUtil.renderLoaderHtml()
                        };
                    },

                    input_ui_boolean_props: (record: RegisteredAppRecordInterface): InputUIBooleanPropsInterface => {
                        return {
                            is_checked: record.is_active,

                            required: true,

                            disabled: false
                        };
                    },

                    input_action_props: (record: RegisteredAppRecordInterface): InputUIActionPropsInterface => {
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

            {
                key: "created_at",
                sortable: true,
                width: "w-[22%]",
                header: {
                    label_key: "content_resource.registered_app_view_ui.list_view_ui.table.header.created_at_text"
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

            {
                key: "public_id",
                sortable: false,
                width: "w-[8%]",
                header: {
                    label_key: "content_resource.registered_app_view_ui.list_view_ui.table.header.actions_text"
                },
                cell: {
                    render: (row) => {
                        return DataTableActionIconCellUI;
                    }
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,

                    button_content_props: (record: RegisteredAppRecordInterface): ButtonUIContentOptionsInterface => {
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

        // ✅ Remove column if no permission
        return columns.filter((col) => {
            if (!can_change_status && col.key === "is_active") {
                return false;
            }
            return true;
        });
    }
}

export default RegisteredAppListViewController;
