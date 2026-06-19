import { Component } from "vue";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { TabsUIClassStylesInterface, TabsUIPropsInterface } from "@ui/version_3/ui_types/tabs_ui_type";

import { IdentityRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewClassStylesInterface,
    ProfileViewComponentsInterface,
    ProfileViewComputedDataInterface,
    ProfileViewStateDataInterface
} from "@/ui_types/profile_view_type";

export interface IdentityProfileViewClassStylesInterface extends ProfileViewClassStylesInterface {
    tabs_class_styles: TabsUIClassStylesInterface;
    profile_header_class_style: string;
    profile_badge_wrapper_class_style: string;
    active_badge_class_style: string;
    inactive_badge_class_style: string;
    deleted_badge_class_style: string;
    info_row_class_style: string;
    association_grid_class_style: string;
    association_card_class_style: string;
    association_card_header_class_style: string;
    association_card_title_class_style: string;
    association_card_subtitle_class_style: string;
    association_card_body_class_style: string;
    empty_state_class_style: string;
}

export interface IdentityProfileValueItemInterface {
    icon: SVGIconKey;
    label: string;
    value: string | number;
}

export interface IdentityStatusValueItemInterface {
    label: string;
    active: boolean;
    trueText: string;
    falseText: string;
    activeIsDanger?: boolean;
}

export interface IdentityAssociationItemInterface {
    key: string;
    title: string;
    subtitle: string;
    details: string[];
    status: string;
    is_active: boolean;
}

export interface IdentityProfileViewComputedDataInterface extends ProfileViewComputedDataInterface {
    loading_icon_html: string;
    profile_image_props: Record<string, unknown>;
    identity_display_name: string;
    identity_public_id_text: string;
    identity_type_text: string;
    profile_status_text: string;
    profile_status_badge_class: string;
    profile_is_deleted: boolean;
    identity_information_items: IdentityProfileValueItemInterface[];
    profile_information_items: IdentityProfileValueItemInterface[];
    source_app_items: IdentityProfileValueItemInterface[];
    wallet_summary_items: IdentityProfileValueItemInterface[];
    timeline_items: IdentityProfileValueItemInterface[];
    access_status_items: IdentityStatusValueItemInterface[];
    contact_items: IdentityAssociationItemInterface[];
    app_account_items: IdentityAssociationItemInterface[];
}

export interface IdentityProfileViewComponentsInterface extends ProfileViewComponentsInterface {
    TabsUI: Component;
    ProfileValue: Component;
    StatusValue: Component;
}

export interface IdentityProfileViewStateDataInterface extends ProfileViewStateDataInterface<IdentityRecordInterface> {
    tabs_props: TabsUIPropsInterface;
}
