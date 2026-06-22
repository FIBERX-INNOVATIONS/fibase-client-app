import { Component } from "vue";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { TabsUIPropsInterface } from "@ui/version_3/ui_types/tabs_ui_type";

import { TransactionRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewComponentsInterface,
    ProfileViewComputedDataInterface,
    ProfileViewStateDataInterface
} from "@/ui_types/profile_view_type";

export interface TransactionProfileValueItemInterface {
    icon: SVGIconKey;
    label: string;
    value: string | number;
}

export interface TransactionProfileViewComputedDataInterface extends ProfileViewComputedDataInterface {
    loading_icon_html: string;
    transaction_title: string;
    transaction_subtitle: string;
    status_text: string;
    status_badge_class: string;
    amount_items: TransactionProfileValueItemInterface[];
    reference_items: TransactionProfileValueItemInterface[];
    party_items: TransactionProfileValueItemInterface[];
    processing_items: TransactionProfileValueItemInterface[];
    relationship_items: TransactionProfileValueItemInterface[];
    timeline_items: TransactionProfileValueItemInterface[];
}

export interface TransactionProfileViewComponentsInterface extends ProfileViewComponentsInterface {
    TabsUI: Component;
    ProfileSection: Component;
}

export interface TransactionProfileViewStateDataInterface extends ProfileViewStateDataInterface<TransactionRecordInterface> {
    tabs_props: TabsUIPropsInterface;
}
