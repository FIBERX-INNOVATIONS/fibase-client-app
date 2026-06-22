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

import { ListViewContentKeysInterface, ListViewPropsInterface } from "@/ui_types/list_view_type";

import { getMemberFullName, RoleRecordInterface } from "@/types/api_service_type";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import AccessControlListViewActionHandler from "@/action_handlers/access_control/list_view_action_handler";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import DataTableLinkCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableLinkCellUI.vue";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class AccessControlListViewController extends BaseListViewController<RoleRecordInterface, "id"> {
    public readonly content_key: string = "access_control";

    public readonly record_id_key: "id" = "id" as const;

    public action_handler: AccessControlListViewActionHandler;

    private readonly content_manager = ContentManagerUtil.getInstance();

    private readonly table_content_key = "content_resource.access_control_view_ui.list_view_ui.table";

    constructor(props: ListViewPropsInterface) {
        super(props, "id");

        this.action_handler = new AccessControlListViewActionHandler(this);
    }

    // Method to check if current member is a super admin
    private isCurrentMemberSuperAdmin(): boolean {
        return MemberAuthenticatorUtil.memberHasSuperAdminRole(MemberAuthenticatorUtil.getLoggedInMember());
    }

    // Method to get content from content manager
    private getContent(key: string, fallback: string): string {
        return this.content_manager.get<string>(key, fallback) ?? fallback;
    }

    // Method to get role type text
    private getRoleTypeText(record: RoleRecordInterface): string {
        if (record.is_member_group) {
            return this.getContent(`${this.table_content_key}.role_type.member_group_text`, "Member Group");
        }

        return this.getContent(`${this.table_content_key}.role_type.system_role_text`, "System Role");
    }

    // Method to role sub text badges
    private getRoleSubText(record: RoleRecordInterface): string {
        const badges = [
            record.symbol ? record.symbol.toUpperCase() : "",
            record.is_system_role ? this.getContent(`${this.table_content_key}.role_badges.system_role_text`, "System") : "",
            record.is_member_group
                ? this.getContent(`${this.table_content_key}.role_badges.member_group_text`, "Member Group")
                : ""
        ].filter(Boolean);

        return badges.join(" ");
    }

    // Method to restrict creating role to super admin
    protected getPermittedHeaderActionButtons(buttons: ButtonUIPropsInterface[]): ButtonUIPropsInterface[] {
        if (!this.isCurrentMemberSuperAdmin()) {
            return [];
        }

        return super.getPermittedHeaderActionButtons(buttons);
    }

    // Methdo to get header action buttons
    protected getHeaderActionButtons(page_key: string, content_keys: ListViewContentKeysInterface): ButtonUIPropsInterface[] {
        const { page_header_class_styles } = this.list_view_class_styles;

        return [
            ButtonUIPropsBuilder.getReactivePropsObject(
                "access_control_module.create_role",
                content_keys.create_button_text,
                "plus_circle_svg_icon",
                "button",
                {
                    boolean_props: { disabled: false },
                    action_props: this.action_handler?.getActionBtnActionHandlerConfig?.(),
                    class_styles: page_header_class_styles.action_button_class_styles
                }
            )
        ];
    }

    // Method to get page filters
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

        return [
            // Search Filters
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
            // Is Member group Filters
            {
                key: "is_member_group_filter",
                type: "select",
                label_content_key: `${filters_content_key}.member_group_filter`,
                input_content_key: `${filters_content_key}.member_group_filter`,
                options_content_key: `${filters_content_key}.member_group_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_member_group ?? ""
                }
            }
        ];
    }

    // Method to get table render config
    protected getTableRenderConfig(): DataTableColumnRenderType<RoleRecordInterface>[] {
        const columns: DataTableColumnRenderType<RoleRecordInterface>[] = [
            // S/N and select checkbox column config
            {
                key: "id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_5,
                header: {
                    label_key: `${this.table_content_key}.header.sn_text`
                },
                cell: {
                    render: () => DataTableSerialCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: RoleRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.id) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const role_ids = records.map((row) => row.id);

                            return role_ids.length > 0 && role_ids.every((id) => selected_records.includes(id));
                        }

                        return selected_records.includes(record.id);
                    },
                    input_ui_boolean_props: (record?: RoleRecordInterface): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const role_ids = records.map((row) => row.id);
                        const is_checked = record?.id
                            ? selected_records.includes(record.id)
                            : role_ids.length > 0 && role_ids.every((id) => selected_records.includes(id));

                        return {
                            is_checked,
                            required: true,
                            disabled: !record?.id && role_ids.length === 0
                        };
                    },
                    input_action_props: (record?: RoleRecordInterface): InputUIActionPropsInterface => {
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
            // Role Name and symbol column config
            {
                key: "name",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_23,
                header: {
                    label_key: `${this.table_content_key}.header.role_text`
                },
                cell: {
                    render: () => DataTableAvatarInfoCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: RoleRecordInterface) => record.display_name || record.name,
                    getImgContent: (record: RoleRecordInterface) => record.display_name || record.name,
                    getImgSubText: (record: RoleRecordInterface) => this.getRoleSubText(record)
                }
            },
            // Member Group column config
            {
                key: "is_member_group",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_13,
                header: {
                    label_key: `${this.table_content_key}.header.type_text`
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: RoleRecordInterface) => this.getRoleTypeText(record)
                }
            },
            // Creator Column Group
            {
                key: "creator",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_16,
                header: {
                    label_key: `${this.table_content_key}.header.created_by_text`
                },
                cell: {
                    render: () => DataTableLinkCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    icon_key: "member_icon",
                    getImgAltText: (record: RoleRecordInterface) => getMemberFullName(record?.creator) ?? "",
                    getLinkURL: (record: RoleRecordInterface) =>
                        this.getRouteQueryLink("member_profile", record?.creator?.public_id),
                    getLinkText: (record: RoleRecordInterface) => getMemberFullName(record?.creator) ?? "-"
                }
            },
            // Updator Column Config
            {
                key: "updator",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_16,
                header: {
                    label_key: `${this.table_content_key}.header.updated_by_text`
                },
                cell: {
                    render: () => DataTableLinkCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    icon_key: "member_icon",
                    getImgAltText: (record: RoleRecordInterface) => getMemberFullName(record?.updator) ?? "",
                    getLinkURL: (record: RoleRecordInterface) =>
                        this.getRouteQueryLink("member_profile", record?.updator?.public_id),
                    getLinkText: (record: RoleRecordInterface) => getMemberFullName(record?.updator) ?? "-"
                }
            },
            // Created At Column Config
            {
                key: "created_at",
                sortable: true,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_16,
                header: {
                    label_key: `${this.table_content_key}.header.created_at_text`
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: RoleRecordInterface) => DisplayFormatterUtil.formatDateTime(record.created_at)
                }
            },
            // Actions Column Config
            {
                key: "id",
                sortable: false,
                width: this.list_view_class_styles.table_column_width_class_styles.percent_8,
                header: {
                    label_key: `${this.table_content_key}.header.actions_text`
                },
                cell: {
                    render: () => DataTableActionIconCellUI
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
                    button_action_props: (record: RoleRecordInterface, record_index?: number): ButtonUIActionPropsInterface => {
                        return {
                            on_click: async (): Promise<void> => {
                                this.action_handler.toggleActionMenu(record, record_index);
                            }
                        };
                    }
                }
            }
        ];

        return columns;
    }
}

export default AccessControlListViewController;
