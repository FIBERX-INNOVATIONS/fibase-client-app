import { markRaw } from "vue";

import { ComputedDefinitionType, WatchersType } from "@ui/version_3/types/base_type";

import { ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";

import { PermissionRecordInterface } from "@/types/api_service_type";

import {
    AccessControlPermissionsViewComponentsInterface,
    AccessControlPermissionsViewComputedDataInterface,
    AccessControlPermissionsViewContentTextInterface,
    AccessControlPermissionsViewControllerInterface,
    AccessControlPermissionsViewPropsInterface,
    AccessControlPermissionsViewStateDataInterface
} from "@/ui_types/access_control_permissions_view_type";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentCardUI from "@ui/version_3/components/ContentCardUI.vue";

import ContentCardUIPropsBuilder from "@ui/version_3/props_builder/content_card_ui_props_builder";

import AccessControlPermissionsViewClassStyles from "@/class_styles/access_control_permissions_view_class_styles";

import AccessControlPermissionsViewActionHandler from "@/action_handlers/access_control/permissions_view_action_handler";

class AccessControlPermissionsViewController
    extends BaseController<
        AccessControlPermissionsViewPropsInterface,
        AccessControlPermissionsViewStateDataInterface,
        AccessControlPermissionsViewComputedDataInterface,
        AccessControlPermissionsViewComponentsInterface,
        GlobalEventTypes
    >
    implements AccessControlPermissionsViewControllerInterface
{
    public action_handler: AccessControlPermissionsViewActionHandler;

    private readonly content_manager = ContentManagerUtil.getInstance();

    private readonly base_content_key = "content_resource.access_control_view_ui.permissions_view_ui";

    // Method to initialize the permissions view controller.
    constructor(props: AccessControlPermissionsViewPropsInterface) {
        super("access_control_permissions_view", props, EventBus);

        this.action_handler = new AccessControlPermissionsViewActionHandler(this);
        this.setActionHandler(this.action_handler);
    }

    // Method to get content text with a fallback value.
    private getContent(key: string, fallback: string): string {
        return this.content_manager.get<string>(key, fallback) ?? fallback;
    }

    // Method to get permissions view content text.
    private getContentObject(): AccessControlPermissionsViewContentTextInterface {
        return {
            loading_text: this.getContent(`${this.base_content_key}.loading_text`, "Loading assigned permissions..."),
            empty_state_text: this.getContent(`${this.base_content_key}.empty_state_text`, "No permissions"),
            search_placeholder_text: this.getContent(`${this.base_content_key}.search_placeholder_text`, "Search permissions"),
            bulk_unassign_button_text: this.getContent(`${this.base_content_key}.bulk_unassign_button_text`, "Remove Selected"),
            unassign_button_text: this.getContent(`${this.base_content_key}.unassign_button_text`, "Remove"),
            unassigning_button_text: this.getContent(`${this.base_content_key}.unassigning_button_text`, "Removing"),
            empty_value_text: this.getContent(`${this.base_content_key}.empty_value_text`, "-"),
            labels: {
                description: this.getContent(`${this.base_content_key}.labels.description`, "Description"),
                created_at: this.getContent(`${this.base_content_key}.labels.created_at`, "Created"),
                updated_at: this.getContent(`${this.base_content_key}.labels.updated_at`, "Updated")
            }
        };
    }

    // Method to get the permissions view UI components.
    protected getUIComponents(): AccessControlPermissionsViewComponentsInterface {
        return {
            ContentCardUI: markRaw(ContentCardUI)
        };
    }

    // Method to get the permissions view state data.
    protected getUIStateData(): AccessControlPermissionsViewStateDataInterface {
        return {
            class_styles: {
                ...AccessControlPermissionsViewClassStyles,
                ...(this.props.class_styles ?? {})
            },
            content_obj: this.getContentObject(),
            permissions: [],
            filtered_permissions: [],
            selected_permission_ids: [],
            search_query: "",
            is_loading: false,
            processing_permission_id: null,
            is_bulk_unassigning: false
        };
    }

    // Method to get the permissions view computed data.
    protected getUIComputedData(): ComputedDefinitionType<AccessControlPermissionsViewComputedDataInterface> {
        return {
            filtered_permissions: () => this.state_refs.filtered_permissions.value,

            has_selected_permissions: () => this.state_refs.selected_permission_ids.value.length > 0,

            can_unassign_permissions: () =>
                MemberAuthenticatorUtil.memberHasPermissionTo("access_control_module.assign_or_unassign_role_permissions") &&
                MemberAuthenticatorUtil.memberHasSuperAdminRole(MemberAuthenticatorUtil.getLoggedInMember())
        };
    }

    // Method to get the permissions view watchers.
    protected getUIWatchers(): WatchersType<
        AccessControlPermissionsViewPropsInterface,
        AccessControlPermissionsViewStateDataInterface
    > {
        return {
            search_query: this.action_handler.handleSearchQueryChanged
        };
    }

    // Method to fetch assigned permissions when the view is mounted.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler.fetchAssignedPermissions();
    }

    // Method to check if a permission is selected.
    public permissionIsSelected(permission: PermissionRecordInterface): boolean {
        return this.state_refs.selected_permission_ids.value.includes(permission.id);
    }

    // Method to escape HTML-sensitive characters.
    private escapeHtml(value: unknown): string {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Method to format a date time value for display.
    private formatDateTime(date_value?: string | null): string {
        return date_value
            ? InputTransformerUtil.formatReadableDateTime(date_value)
            : this.state_refs.content_obj.value.empty_value_text;
    }

    // Method to format a permission title text part.
    private formatTextPart(value?: string): string {
        return (value ?? "")
            .split("_")
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    // Method to format the permission card title.
    private formatPermissionTitle(permission: PermissionRecordInterface): string {
        const action_key = [permission.module, permission.name].filter(Boolean).join(".");

        return action_key
            ? action_key
                  .split(".")
                  .map((part, index) => {
                      const words = this.formatTextPart(part);

                      if (index === 1) {
                          return `${words} Action`;
                      }

                      return words;
                  })
                  .join(" - ")
            : this.state_refs.content_obj.value.empty_value_text;
    }

    // Method to build a permission card description item.
    private buildDescriptionItem(label: string, value?: unknown): string {
        const display_value = value || this.state_refs.content_obj.value.empty_value_text;

        return [
            `<span class="inline-flex items-start gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-700">`,
            `<strong class="font-black text-gray-900">${this.escapeHtml(label)}:</strong>`,
            `<span>${this.escapeHtml(display_value)}</span>`,
            `</span>`
        ].join("");
    }

    // Method to build the permission card description HTML.
    private getPermissionDescription(permission: PermissionRecordInterface): string {
        const content_obj = this.state_refs.content_obj.value;

        return [
            `<p class="mb-3 whitespace-pre-line text-sm font-semibold leading-6 text-gray-800">${this.escapeHtml(
                permission.description || content_obj.empty_value_text
            )}</p>`,
            `<div class="flex flex-wrap gap-2">`,
            this.buildDescriptionItem(content_obj.labels.created_at, this.formatDateTime(permission.created_at)),
            this.buildDescriptionItem(content_obj.labels.updated_at, this.formatDateTime(permission.updated_at)),
            `</div>`
        ].join("");
    }

    // Method to get the permission content card props.
    public getPermissionCardProps(permission: PermissionRecordInterface): ContentCardUIPropsInterface {
        const is_processing = this.state_refs.processing_permission_id.value === permission.id;
        const can_unassign_permissions = this.computed_refs.can_unassign_permissions.value;
        const content_obj = this.state_refs.content_obj.value;
        const class_styles = this.state_refs.class_styles.value.permission_content_card_class_styles;

        return ContentCardUIPropsBuilder.getReactivePropsObject(`RolePermission${permission.id}`, {
            content_props: {
                title_text: this.formatPermissionTitle(permission),
                title_icon: "member_shield_svg_icon",
                description_text: this.getPermissionDescription(permission),
                button_text: can_unassign_permissions
                    ? is_processing
                        ? content_obj.unassigning_button_text
                        : content_obj.unassign_button_text
                    : "",
                button_icon: can_unassign_permissions
                    ? is_processing
                        ? "loading_svg_icon"
                        : "delete_trash_svg_icon"
                    : undefined
            },
            boolean_props: {
                disabled: Boolean(this.state_refs.processing_permission_id.value || this.state_refs.is_bulk_unassigning.value)
            },
            action_props: {
                on_click: async () => this.action_handler.handleUnassignPermissionClicked(permission)
            },
            class_styles: {
                ...class_styles,
                button_icon_class_style: is_processing
                    ? `${class_styles.button_icon_class_style} animate-spin`
                    : class_styles.button_icon_class_style
            }
        });
    }
}

export default AccessControlPermissionsViewController;
