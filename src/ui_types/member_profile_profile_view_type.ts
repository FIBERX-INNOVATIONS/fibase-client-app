import { Component } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { MemberDeviceSessionInterface } from "@/types/api_service_type";
import { DeleteViewPropsInterface } from "@/ui_types/delete_view_type";
import { ProfileViewClassStylesInterface } from "@/ui_types/profile_view_type";

import {
    ContentCardUIClassStylesInterface,
    ContentCardUIPropsInterface
} from "@ui/version_3/ui_types/content_card_ui_type";
import { TabsUIClassStylesInterface } from "@ui/version_3/ui_types/tabs_ui_type";
import {
    PaginationUIClassStylesInterface,
    PaginationUIPropsInterface
} from "@ui/version_3/ui_types/pagination_ui_type";

export interface MemberProfileProfileViewClassStylesInterface extends ProfileViewClassStylesInterface {
    tabs_class_styles: TabsUIClassStylesInterface;
    profile_header_class_style: string;
    profile_badge_wrapper_class_style: string;
    active_badge_class_style: string;
    inactive_badge_class_style: string;
    deleted_badge_class_style: string;
    info_row_class_style: string;
    devices_wrapper_class_style: string;
    devices_toolbar_class_style: string;
    devices_search_wrapper_class_style: string;
    devices_search_icon_class_style: string;
    devices_search_input_class_style: string;
    devices_toolbar_button_class_style: string;
    devices_toolbar_button_icon_class_style: string;
    devices_grid_class_style: string;
    devices_empty_state_class_style: string;
    devices_pagination_class_style: string;
    devices_pagination_text_class_style: string;
    devices_pagination_ui_class_styles: PaginationUIClassStylesInterface;
    device_content_card_class_styles: ContentCardUIClassStylesInterface;
}

export interface MemberDeviceSessionViewRecordInterface extends MemberDeviceSessionInterface {
    origin_url?: string;
    location_info?: string | Record<string, unknown> | null;
    is_2fa_validated?: boolean;
    logout_at?: string | null;
    is_active?: boolean;
    status?: "active" | "expired" | "logged_out" | string;
}

export interface MemberDevicesViewPropsInterface {
    member_public_id: string;
    class_styles?: Partial<MemberProfileProfileViewClassStylesInterface>;
}

export interface MemberDevicesViewContentTextInterface {
    loading_text: string;
    empty_state_text: string;
    search_placeholder_text: string;
    logout_all_button_text: string;
    log_device_out_button_text: string;
    logged_out_button_text: string;
    current_device_badge_text: string;
    pagination_result_text: string;
    empty_value_text: string;
    labels: {
        device_id: string;
        ip_address: string;
        origin_url: string;
        location_info: string;
        is_2fa_validated: string;
        created_at: string;
        logout_at: string;
        status: string;
    };
    bool_text: {
        yes: string;
        no: string;
    };
}

export interface MemberDevicesViewStateDataInterface {
    class_styles: MemberProfileProfileViewClassStylesInterface;
    content_obj: MemberDevicesViewContentTextInterface;
    devices: MemberDeviceSessionViewRecordInterface[];
    current_page: number;
    total_pages: number;
    total_items: number;
    limit: number;
    search_query: string;
    is_loading: boolean;
    processing_session_id: string;
    is_logging_all_out: boolean;
    current_device_id: string;
    pagination_props: PaginationUIPropsInterface;
}

export interface MemberDevicesViewComputedDataInterface {
    is_action_processing: boolean;
    can_logout_device: boolean;
    can_logout_all_devices: boolean;
    pagination_result_text: string;
}

export interface MemberDevicesViewComponentsInterface {
    ContentCardUI: Component;
    PaginationUI: Component;
}

export interface MemberDevicesViewControllerInterface {
    getDeviceCardProps(device: MemberDeviceSessionViewRecordInterface): ContentCardUIPropsInterface;
}

export type MemberDeviceDecisionConfirmActionType = () => Promise<APIResponseInterface<unknown>>;

export interface MemberDeviceDecisionRecordInterface extends Record<string, unknown> {
    title?: string;
    message?: string;
    device_name?: string;
    device_id?: string;
}

export interface MemberDeviceDecisionViewPropsInterface extends DeleteViewPropsInterface<
    MemberDeviceDecisionRecordInterface,
    unknown
> {
    on_confirm_action: MemberDeviceDecisionConfirmActionType;
    on_confirm_success?: () => Promise<void> | void;
}
