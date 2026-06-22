import { Component } from "vue";

import { PermissionRecordInterface, RoleRecordInterface } from "@/types/api_service_type";

import { ContentCardUIClassStylesInterface, ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";

export type AccessControlPermissionsViewModeType = "assigned" | "unassigned";

export interface AccessControlPermissionsViewClassStylesInterface {
    wrapper_class_style: string;
    toolbar_class_style: string;
    search_wrapper_class_style: string;
    search_icon_class_style: string;
    search_input_class_style: string;
    bulk_action_button_class_style: string;
    bulk_assign_action_button_class_style: string;
    bulk_action_button_icon_class_style: string;
    loading_wrapper_class_style: string;
    loading_icon_class_style: string;
    empty_state_class_style: string;
    permissions_grid_class_style: string;
    permission_row_class_style: string;
    permission_checkbox_class_style: string;
    permission_checkbox_selected_class_style: string;
    permission_checkbox_unselected_class_style: string;
    permission_checkbox_icon_class_style: string;
    permission_card_wrapper_class_style: string;
    permission_assign_button_class_style: string;
    permission_processing_icon_class_style: string;
    permission_content_card_class_styles: ContentCardUIClassStylesInterface;
}

export interface AccessControlPermissionsViewPropsInterface {
    record: RoleRecordInterface;
    record_id: string;
    mode?: AccessControlPermissionsViewModeType;
    content_key?: string;
    class_styles?: Partial<AccessControlPermissionsViewClassStylesInterface>;
    on_permissions_changed?: (record: RoleRecordInterface, permissions: PermissionRecordInterface[]) => Promise<void> | void;
}

export interface AccessControlPermissionsViewContentTextInterface {
    loading_text: string;
    empty_state_text: string;
    search_placeholder_text: string;
    bulk_unassign_button_text: string;
    bulk_assign_button_text: string;
    unassign_button_text: string;
    unassigning_button_text: string;
    assign_button_text: string;
    assigning_button_text: string;
    empty_value_text: string;
    labels: {
        description: string;
        created_at: string;
        updated_at: string;
    };
}

export interface AccessControlPermissionsViewStateDataInterface {
    class_styles: AccessControlPermissionsViewClassStylesInterface;
    content_obj: AccessControlPermissionsViewContentTextInterface;
    permissions: PermissionRecordInterface[];
    filtered_permissions: PermissionRecordInterface[];
    selected_permission_ids: Array<string | number>;
    search_query: string;
    is_loading: boolean;
    processing_permission_id: string | number | null;
    is_bulk_action_processing: boolean;
}

export interface AccessControlPermissionsViewComputedDataInterface {
    filtered_permissions: PermissionRecordInterface[];
    has_selected_permissions: boolean;
    is_assign_permissions_mode: boolean;
    can_manage_permissions: boolean;
    can_unassign_permissions: boolean;
    can_assign_permissions: boolean;
    bulk_action_button_text: string;
    bulk_action_button_icon: string;
    bulk_action_button_class_style: string;
}

export interface AccessControlPermissionsViewComponentsInterface {
    ContentCardUI: Component;
}

export interface AccessControlPermissionsViewControllerInterface {
    getPermissionCardProps(permission: PermissionRecordInterface): ContentCardUIPropsInterface;
    permissionIsSelected(permission: PermissionRecordInterface): boolean;
}
