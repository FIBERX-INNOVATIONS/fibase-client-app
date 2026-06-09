import { SVGIconKey, SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

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

import { ListViewContentKeysInterface, ListViewPropsInterface } from "@/ui_types/list_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL } from "@/configs";

import { MemberRecordInterface, getMemberFullName } from "@/types/api_service_type";

import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import MemberProfileListViewActionHandler from "@/action_handlers/member_profile/list_view_action_handler";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import DataTableToggleCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableToggleCellUI.vue";

import DataTableSerialCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableSerialCellUI.vue";

import DataTableAvatarInfoCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableAvatarInfoCellUI.vue";

import DataTableActionIconCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableActionIconCellUI.vue";

import DataTableTextContentCellUI from "@ui/version_3/components/DataTableCellComponents/DataTableTextContentCellUI.vue";

class MemberProfileListViewController extends BaseListViewController<
    MemberRecordInterface,
    "public_id"
> {
    public readonly content_key: string = "member_profile";

    public readonly record_id_key: "public_id" = "public_id" as const;

    public action_handler: MemberProfileListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props, "public_id");

        this.action_handler = new MemberProfileListViewActionHandler(this);
    }

    // Method to get header action button props
    protected getHeaderActionButtons(
        page_key: string,
        content_keys: ListViewContentKeysInterface,
        icons: { create_button: SVGIconKey }
    ): ButtonUIPropsInterface[] {
        void page_key;

        return [
            ButtonUIPropsBuilder.getReactivePropsObject(
                "member_profile_module.create_member",
                content_keys.create_button_text,
                icons.create_button,
                "button",
                {
                    boolean_props: { disabled: false },
                    action_props: this.action_handler?.getActionBtnActionHandlerConfig?.(),
                    class_styles:
                        this.list_view_class_styles.page_header_class_styles
                            .action_button_class_styles
                }
            )
        ];
    }

    // Method to get page filters
    protected getPageFilters(): ListFilterConfig[] {
        const { filters_content_key } = this.getListViewContentKeys(this.content_key);

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
            // Is verified Filter
            {
                key: "is_verified_filter",
                type: "select",
                label_content_key: `${filters_content_key}.verified_filter`,
                input_content_key: `${filters_content_key}.verified_filter`,
                options_content_key: `${filters_content_key}.verified_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_verified ?? ""
                }
            },
            // Is 2fa enabled Filter
            {
                key: "is_2fa_enabled_filter",
                type: "select",
                label_content_key: `${filters_content_key}.two_factor_filter`,
                input_content_key: `${filters_content_key}.two_factor_filter`,
                options_content_key: `${filters_content_key}.two_factor_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_2fa_enabled ?? ""
                }
            },
            // Is Locled Filter
            {
                key: "is_locked_filter",
                type: "select",
                label_content_key: `${filters_content_key}.locked_filter`,
                input_content_key: `${filters_content_key}.locked_filter`,
                options_content_key: `${filters_content_key}.locked_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_locked ?? ""
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
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_deleted ?? "false"
                }
            },
            // Role Id Filter
            {
                key: "role_id_filter",
                type: "text",
                label_content_key: `${filters_content_key}.role_filter`,
                input_content_key: `${filters_content_key}.role_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.role_id ?? ""
                }
            },
            // Gender Filter
            {
                key: "gender_filter",
                type: "select",
                label_content_key: `${filters_content_key}.gender_filter`,
                input_content_key: `${filters_content_key}.gender_filter`,
                options_content_key: `${filters_content_key}.gender_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.gender ?? ""
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

    // Method to get member Display name
    private getMemberDisplayName(record: MemberRecordInterface): string {
        return (
            record.full_name || getMemberFullName(record) || record.username || record.email || "-"
        );
    }

    // Helper Method to get role text
    private getRoleText(record: MemberRecordInterface): string {
        const roles = record.actor_roles ?? [];

        if (!roles.length) {
            return "-";
        }

        return roles.map((role) => role.display_name || role.name || role.symbol).join(", ");
    }

    private getSecurityText(record: MemberRecordInterface): string {
        const enabled_text = "Yes";
        const disabled_text = "No";

        return [
            `2FA: ${record.is_2fa_enabled ? enabled_text : disabled_text}`,
            `Verified: ${record.is_verified ? enabled_text : disabled_text}`,
            `Locked: ${record.is_locked ? enabled_text : disabled_text}`
        ].join(" | ");
    }

    // Method to get table render config
    protected getTableRenderConfig(): DataTableColumnRenderType<MemberRecordInterface>[] {
        const can_change_status = MemberAuthenticatorUtil.memberHasPermissionTo(
            "member_profile_module.update_member_status"
        );

        const columns: DataTableColumnRenderType<MemberRecordInterface>[] = [
            // S/N and Select Checkbox Column
            {
                key: "public_id",
                sortable: false,
                width: "w-[5%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.sn_text"
                },
                cell: {
                    render: () => DataTableSerialCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    is_selected: false,
                    input_model_value: (record?: MemberRecordInterface): InputValue => {
                        const selected_records = this.state_refs.selected_records.value;

                        if (!record?.public_id) {
                            const records = this.state_refs.list_state.value.records ?? [];
                            const public_ids = records.map((row) => row.public_id);

                            return (
                                public_ids.length > 0 &&
                                public_ids.every((public_id) =>
                                    selected_records.includes(public_id)
                                )
                            );
                        }

                        return selected_records.includes(record.public_id);
                    },
                    input_ui_boolean_props: (
                        record?: MemberRecordInterface
                    ): InputUIBooleanPropsInterface => {
                        const selected_records = this.state_refs.selected_records.value;
                        const records = this.state_refs.list_state.value.records ?? [];
                        const public_ids = records.map((row) => row.public_id);
                        const is_checked = record?.public_id
                            ? selected_records.includes(record.public_id)
                            : public_ids.length > 0 &&
                              public_ids.every((public_id) => selected_records.includes(public_id));

                        return {
                            is_checked,
                            required: true,
                            disabled: !record?.public_id && public_ids.length === 0
                        };
                    },
                    input_action_props: (
                        record?: MemberRecordInterface
                    ): InputUIActionPropsInterface => ({
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
                    })
                }
            },

            // Member Name, Public_id and profile photo Column
            {
                key: "full_name",
                sortable: true,
                width: "w-[22%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.member_text"
                },
                cell: {
                    render: () => DataTableAvatarInfoCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getImgAltText: (record: MemberRecordInterface) =>
                        this.getMemberDisplayName(record),
                    getImgSubText: (record: MemberRecordInterface) => record.public_id,
                    getImgContent: (record: MemberRecordInterface) =>
                        this.getMemberDisplayName(record),
                    getImgSrc: (record: MemberRecordInterface) =>
                        record.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL
                }
            },

            // Member Username Column
            {
                key: "username",
                sortable: true,
                width: "w-[11%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.username_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles
                }
            },

            // Member Roles column
            {
                key: "roles",
                sortable: false,
                width: "w-[16%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.roles_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: MemberRecordInterface) => this.getRoleText(record)
                }
            },

            // Member Secuirty column
            {
                key: "is_2fa_enabled",
                sortable: false,
                width: "w-[16%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.security_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: MemberRecordInterface) => this.getSecurityText(record)
                }
            },

            // Member status Column
            {
                key: "is_active",
                sortable: true,
                width: "w-[8%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.status_text"
                },
                cell: {
                    render: () => DataTableToggleCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    input_model_value: (record: MemberRecordInterface): InputValue =>
                        InputTransformerUtil.resolveTypedValue(record.is_active),
                    input_content_props: (): InputUIContentOptionsInterface => ({
                        loader_html_content: RenderHtmlUtil.renderLoaderHtml()
                    }),
                    input_ui_boolean_props: (
                        record: MemberRecordInterface
                    ): InputUIBooleanPropsInterface => ({
                        is_checked: record.is_active,
                        required: true,
                        disabled: true
                    }),
                    input_action_props: (
                        record: MemberRecordInterface
                    ): InputUIActionPropsInterface => ({
                        on_click: async (
                            event?: Event,
                            input_value?: InputValue
                        ): Promise<ActionMethodRetrunInterface> =>
                            this.action_handler.handleStatusToggleChange(record, input_value)
                    })
                }
            },

            // Member Deleted column
            {
                key: "is_deleted",
                sortable: true,
                width: "w-[8%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.deleted_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getTextContent: (record: MemberRecordInterface) =>
                        record.is_deleted ? "Deleted" : "-"
                }
            },

            // Member Created at Column
            {
                key: "created_at",
                sortable: true,
                width: "w-[14%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.created_at_text"
                },
                cell: {
                    render: () => DataTableTextContentCellUI
                },
                props: {
                    class_styles: this.list_view_class_styles.table_cell_components_class_styles,
                    getDateTextContent: (record: MemberRecordInterface) =>
                        record.created_at
                            ? InputTransformerUtil.formatReadableDateTime(record.created_at)
                            : "-"
                }
            },

            // Member Actions column
            {
                key: "public_id",
                sortable: false,
                width: "w-[8%]",
                header: {
                    label_key:
                        "content_resource.member_profile_view_ui.list_view_ui.table.header.actions_text"
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
                    }),
                    button_action_props: (
                        record: MemberRecordInterface,
                        record_index?: number
                    ): ButtonUIActionPropsInterface => ({
                        on_click: async (
                            event?: MouseEvent,
                            config?: { props: ButtonUIPropsInterface }
                        ): Promise<void> => {
                            this.action_handler.toggleActionMenu(record, record_index);
                        }
                    })
                }
            }
        ];

        return columns.filter((column) => can_change_status || column.key !== "is_active");
    }
}

export default MemberProfileListViewController;
