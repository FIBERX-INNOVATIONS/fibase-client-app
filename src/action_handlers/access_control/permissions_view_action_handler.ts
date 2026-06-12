import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { ContentCardUIActionMethodReturnInterface } from "@ui/version_3/ui_types/content_card_ui_type";

import { PermissionRecordInterface } from "@/types/api_service_type";

import { RolePermissionActionResponseInterface } from "@/types/api_service_type";

import { RolePermissionActionPayload } from "@/types/form_data_type";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    AccessControlPermissionsViewComponentsInterface,
    AccessControlPermissionsViewComputedDataInterface,
    AccessControlPermissionsViewPropsInterface,
    AccessControlPermissionsViewStateDataInterface
} from "@/ui_types/access_control_permissions_view_type";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import AccessControlAPIService from "@/api_services/access_control_api_service";

import type AccessControlPermissionsViewController from "@/controllers/access_control/permissions_view_controller";

class AccessControlPermissionsViewActionHandler extends BaseActionHandler<
    AccessControlPermissionsViewPropsInterface,
    AccessControlPermissionsViewStateDataInterface,
    AccessControlPermissionsViewComputedDataInterface,
    AccessControlPermissionsViewComponentsInterface,
    GlobalEventTypes
> {
    protected override controller: AccessControlPermissionsViewController;

    // Method to initialize the permissions view action handler.
    constructor(controller: AccessControlPermissionsViewController) {
        super(controller, "access_control_permissions_view_action_handler");

        this.controller = controller;
        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    // Method to get the active role id.
    private getRoleId(): string | number | null {
        return this.controller.props.record_id || this.controller.props.record?.id || null;
    }

    // Method to remove empty permission ids from a permission id list.
    private normalizePermissionIds(permission_ids: Array<string | number>): Array<string | number> {
        return permission_ids.filter(
            (permission_id) => permission_id !== undefined && permission_id !== null && permission_id !== ""
        );
    }

    // Method to remove unassigned permissions from local state.
    private removePermissionsFromState(permission_ids: Array<string | number>): void {
        const id_set = new Set(permission_ids.map((permission_id) => permission_id.toString()));

        this.setState(
            "permissions",
            this.controller.state_refs.permissions.value.filter((permission) => !id_set.has(permission.id.toString()))
        );

        this.setState(
            "selected_permission_ids",
            this.controller.state_refs.selected_permission_ids.value.filter(
                (permission_id) => !id_set.has(permission_id.toString())
            )
        );

        this.applyPermissionSearchFilter();

        void this.controller.props.on_permissions_changed?.(
            this.controller.props.record,
            this.controller.state_refs.permissions.value
        );
    }

    // Method to normalize search text for permission filtering.
    private normalizeSearchText(value?: unknown): string {
        return String(value ?? "")
            .toLowerCase()
            .replace(/[._-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    // Method to get searchable field values for a permission.
    private getPermissionSearchFields(permission: PermissionRecordInterface): string[] {
        return [
            permission.id,
            permission.module,
            permission.name,
            permission.symbol,
            permission.description,
            permission.created_at,
            permission.updated_at
        ]
            .map((field_value) => this.normalizeSearchText(field_value))
            .filter(Boolean);
    }

    // Method to check if a permission field matches a search term.
    private permissionFieldMatchesSearchTerm(permission_fields: string[], search_term: string): boolean {
        return permission_fields.some((field_value) => field_value.includes(search_term));
    }

    // Method to check if a permission matches all search terms across individual fields.
    private permissionMatchesSearchQuery(permission: PermissionRecordInterface, search_terms: string[]): boolean {
        const permission_fields = this.getPermissionSearchFields(permission);

        return search_terms.every((search_term) => this.permissionFieldMatchesSearchTerm(permission_fields, search_term));
    }

    // Method to apply internal search filtering to already fetched permissions.
    public applyPermissionSearchFilter = (): void => {
        const search_terms = this.normalizeSearchText(this.controller.state_refs.search_query.value).split(" ").filter(Boolean);
        const permissions = this.controller.state_refs.permissions.value;

        if (!search_terms.length) {
            this.setState("filtered_permissions", permissions);
            return;
        }

        this.setState(
            "filtered_permissions",
            permissions.filter((permission) => this.permissionMatchesSearchQuery(permission, search_terms))
        );
    };

    // Method to handle search query changes.
    public handleSearchQueryChanged = (): void => {
        this.applyPermissionSearchFilter();
    };

    // Method to handle a role permission action API result.
    private handleActionResult = async (
        result: APIResponseInterface<RolePermissionActionResponseInterface> | undefined,
        permission_ids: Array<string | number>
    ): Promise<ContentCardUIActionMethodReturnInterface> => {
        if (!result || result.status === "logout") {
            await this.controller.router.push("/logout");
            return { status: false, msg: "session_expired" };
        }

        const msg = result.msg ?? "error_occurred";

        if (result.status !== "success") {
            StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
            return { status: false, msg };
        }

        this.removePermissionsFromState(permission_ids);
        StatusAlertTriggerUtil.triggerAlert("success", msg, 4, undefined, true);

        return { status: true, msg };
    };

    // Method to unassign permissions from the active role.
    private unassignPermissions = async (
        permission_ids: Array<string | number>
    ): Promise<APIResponseInterface<RolePermissionActionResponseInterface>> => {
        const role_id = this.getRoleId();
        const normalized_permission_ids = this.normalizePermissionIds(permission_ids);

        if (!role_id || !normalized_permission_ids.length) {
            return { status: "error", msg: "record_not_found" };
        }

        const payload: RolePermissionActionPayload = {
            csrf_token: null,
            action: "unassign",
            permission_ids: normalized_permission_ids
        };

        return await AccessControlAPIService.handleRolePermissionAction(role_id, payload);
    };

    // Method to fetch all assigned permissions once.
    public fetchAssignedPermissions = async (): Promise<void> => {
        const role_id = this.getRoleId();

        if (!role_id) {
            return;
        }

        this.setState("is_loading", true);

        try {
            const result = await AccessControlAPIService.getRolePermissionList(role_id, "assigned");

            if (!result || result.status === "logout") {
                await this.controller.router.push("/logout");
                return;
            }

            if (result.status === "error") {
                StatusAlertTriggerUtil.triggerAlert("error", result.msg ?? "error_occurred", 4, undefined, true);
                return;
            }

            this.setState("permissions", result.data?.permissions ?? []);
            this.applyPermissionSearchFilter();
            this.setState("selected_permission_ids", []);
        } catch (error: unknown) {
            this.logger.error("Failed to fetch assigned role permissions", { error });
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred", 4, undefined, true);
        } finally {
            this.setState("is_loading", false);
        }
    };

    // Method to toggle a permission selection for bulk actions.
    public handlePermissionSelectionToggle = (permission: PermissionRecordInterface): void => {
        const selected_permission_ids = this.controller.state_refs.selected_permission_ids.value;
        const is_selected = selected_permission_ids.includes(permission.id);

        this.setState(
            "selected_permission_ids",
            is_selected
                ? selected_permission_ids.filter((permission_id) => permission_id !== permission.id)
                : [...selected_permission_ids, permission.id]
        );
    };

    // Method to unassign a single permission.
    public handleUnassignPermissionClicked = async (
        permission: PermissionRecordInterface
    ): Promise<ContentCardUIActionMethodReturnInterface> => {
        this.setState("processing_permission_id", permission.id);

        try {
            const result = await this.unassignPermissions([permission.id]);

            return await this.handleActionResult(result, [permission.id]);
        } catch (error: unknown) {
            this.logger.error("Failed to unassign role permission", { error });
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred", 4, undefined, true);
            return { status: false, msg: "error_occurred" };
        } finally {
            this.setState("processing_permission_id", null);
        }
    };

    // Method to unassign all selected permissions.
    public handleBulkUnassignClicked = async (): Promise<void> => {
        const permission_ids = [...this.controller.state_refs.selected_permission_ids.value];

        if (!permission_ids.length) {
            return;
        }

        this.setState("is_bulk_unassigning", true);

        try {
            const result = await this.unassignPermissions(permission_ids);

            await this.handleActionResult(result, permission_ids);
        } catch (error: unknown) {
            this.logger.error("Failed to bulk unassign role permissions", { error });
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred", 4, undefined, true);
        } finally {
            this.setState("is_bulk_unassigning", false);
        }
    };
}

export default AccessControlPermissionsViewActionHandler;
