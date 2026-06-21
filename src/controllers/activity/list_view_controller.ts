import { ActivityRecordInterface } from "@/types/api_service_type";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { ContentCardUIClassStylesInterface, ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";

import { ListStateInterface, ListViewContentKeysInterface, ListViewPropsInterface } from "@/ui_types/list_view_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

import ActivityListViewActionHandler from "@/action_handlers/activity/list_view_action_handler";

import ContentCardUIPropsBuilder from "@ui/version_3/props_builder/content_card_ui_props_builder";

class ActivityListViewController extends BaseListViewController<ActivityRecordInterface, "id"> {
    public readonly content_key: string = "activity";

    public readonly record_id_key: "id" = "id" as const;

    public action_handler: ActivityListViewActionHandler;

    private readonly content_manager = ContentManagerUtil.getInstance();

    private readonly card_content_key = "content_resource.activity_view_ui.list_view_ui.card";

    constructor(props: ListViewPropsInterface) {
        super(props, "id");

        this.action_handler = new ActivityListViewActionHandler(this);
    }

    // Method to format action text
    private formatActionText(record: ActivityRecordInterface): string {
        return record.action_key
            ? record.action_key
                  .split(".")
                  .map((part, index) => {
                      const words = part
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ");

                      // Replace last section suffix
                      if (index === 1) {
                          return `${words} Action`;
                      }

                      return words;
                  })
                  .join(" - ")
            : "-";
    }

    // Method to get actor text
    private getActorText(record: ActivityRecordInterface): string {
        const actor_type = record.actor_type?.trim();
        const actor_id = record.actor_id?.toString?.()?.trim();

        if (actor_type) {
            return `(${actor_type})`;
        }

        return [actor_type, actor_id].filter(Boolean).join(": ") || "-";
    }

    // Method to get format status text
    private formatStatusText(record: ActivityRecordInterface): string {
        return record.is_success ? "Successful".toUpperCase() : "Failed".toUpperCase();
    }

    // Method to get content from content manager
    private getContent(key: string, fallback: string): string {
        return this.content_manager.get<string>(key, fallback) ?? fallback;
    }

    // Method to get activity loading text content
    public getActivityLoadingText(): string {
        return this.getContent(
            "content_resource.activity_view_ui.list_view_ui.table.loading_section.loader_text",
            "Loading activity records..."
        );
    }

    // Method to get empty state text content
    public getActivityEmptyStateText(): string {
        return this.getContent(
            "content_resource.activity_view_ui.list_view_ui.table.empty_state_section.header_text",
            "No Activity Record Found"
        );
    }

    // Method to build the description content text with html design for the content card
    private buildDescriptionItem(label: string, value?: unknown): string {
        const display_value = value || "-";

        return [
            `<span class="inline-flex items-start gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-700">`,
            `<strong class="font-black text-gray-900">${DisplayFormatterUtil.escapeHtml(label)}:</strong>`,
            `<span>${DisplayFormatterUtil.escapeHtml(display_value)}</span>`,
            `</span>`
        ].join("");
    }

    // Method to build status badge html text
    private buildStatusBadge(label: string, record: ActivityRecordInterface): string {
        const is_success = record.is_success;
        const class_style = is_success ? "bg-green-50 text-green-700 ring-green-200" : "bg-red-50 text-red-700 ring-red-200";

        return [
            `<span class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-black ring-1 ${class_style}">`,
            `<strong>${DisplayFormatterUtil.escapeHtml(label)}:</strong>`,
            DisplayFormatterUtil.escapeHtml(this.formatStatusText(record)),
            `</span>`
        ].join("");
    }

    // Method to build the activity record content card decsription value
    private getActivityCardDescription(record: ActivityRecordInterface): string {
        return [
            `<p class="mb-3 whitespace-pre-line text-sm font-semibold leading-6 text-gray-800">${DisplayFormatterUtil.escapeHtml(
                record.description || "-"
            )}</p>`,
            `<div class="flex flex-wrap gap-2">`,
            this.buildStatusBadge(this.getContent(`${this.card_content_key}.labels.status_text`, "Status"), record),
            this.buildDescriptionItem(
                this.getContent(`${this.card_content_key}.labels.actor_text`, "Actor"),
                this.getActorText(record)
            ),
            this.buildDescriptionItem(
                this.getContent(`${this.card_content_key}.labels.request_id_text`, "Request ID"),
                record.request_id
            ),
            this.buildDescriptionItem(
                this.getContent(`${this.card_content_key}.labels.entity_type_text`, "Entity Type"),
                record.entity_type
            ),
            this.buildDescriptionItem(
                this.getContent(`${this.card_content_key}.labels.ip_address_text`, "IP Address"),
                record.ip_address
            ),
            this.buildDescriptionItem(
                this.getContent(`${this.card_content_key}.labels.user_agent_text`, "User Agent"),
                record.user_agent
            ),
            this.buildDescriptionItem(
                this.getContent(`${this.card_content_key}.labels.created_at_text`, "Created At"),
                DisplayFormatterUtil.formatDateTime(record.created_at)
            ),
            this.buildDescriptionItem(
                this.getContent(`${this.card_content_key}.labels.updated_at_text`, "Updated At"),
                DisplayFormatterUtil.formatDateTime(record.updated_at)
            ),
            `</div>`
        ].join("");
    }

    public getActivityCardProps(record: ActivityRecordInterface): ContentCardUIPropsInterface {
        return ContentCardUIPropsBuilder.getReactivePropsObject(`Activity${record.id}`, {
            content_props: {
                title_text: this.formatActionText(record),
                title_icon: "clock_svg_icon",
                description_text: this.getActivityCardDescription(record)
            },
            class_styles: this.list_view_class_styles.activity_card_class_styles
        });
    }

    // Activities are audit records, so the list header has no create action.
    protected getHeaderActionButtons(page_key: string, content_keys: ListViewContentKeysInterface): ButtonUIPropsInterface[] {
        void page_key;
        void content_keys;

        return [];
    }

    // Method to get default list state
    protected getDefaultListState(): ListStateInterface<ActivityRecordInterface> {
        return {
            ...super.getDefaultListState(),
            limit: 20,
            sort_by: "created_at",
            sort_direction: "desc"
        };
    }

    // Methdo to get data table result and bulk action bar props
    protected getDataTableResultAndBulkActionBarProps(
        page_key: string,
        list_state: ListStateInterface<ActivityRecordInterface>
    ) {
        const props = super.getDataTableResultAndBulkActionBarProps(page_key, list_state);

        if (props.selection_props) {
            props.selection_props.show_bulk_button = false;
        }

        return props;
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
            // Registered App Filter
            {
                key: "registered_app_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.registered_app_filter`,
                input_content_key: `${filters_content_key}.registered_app_filter`,
                overides: {
                    model_value: this.route.query?.registered_app_id ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                    }
                }
            },
            // Member Filter
            {
                key: "member_public_id_filter",
                type: "select_search",
                label_content_key: `${filters_content_key}.member_filter`,
                input_content_key: `${filters_content_key}.member_filter`,
                overides: {
                    model_value: this.route.query?.member_public_id ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        ...this.action_handler.getFilterInputActionHandlersConfig(),
                        fetch_data_method: PreviewRecordFetcher.fetchMemberPreviewRecords
                    }
                }
            },
            // Request Id Filter
            {
                key: "request_id_filter",
                type: "text",
                label_content_key: `${filters_content_key}.request_id_filter`,
                input_content_key: `${filters_content_key}.request_id_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.request_id ?? ""
                }
            },
            // Entity Type Filter
            {
                key: "entity_type_filter",
                type: "select",
                label_content_key: `${filters_content_key}.entity_type_filter`,
                input_content_key: `${filters_content_key}.entity_type_filter`,
                options_content_key: `${filters_content_key}.entity_type_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.entity_type ?? ""
                }
            },
            // Ip Address Filter
            {
                key: "ip_address_filter",
                type: "text",
                label_content_key: `${filters_content_key}.ip_address_filter`,
                input_content_key: `${filters_content_key}.ip_address_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.ip_address ?? ""
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
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.status ?? ""
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

    // Activity records are rendered as content cards instead of table rows.
    protected getTableRenderConfig(): [] {
        return [];
    }
}

export default ActivityListViewController;
