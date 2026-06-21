import { Component } from "vue";

import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

export interface IdentityWalletProfileViewPropsInterface extends ProfileViewPropsInterface<IdentityWalletRecordInterface> {
    identity_public_id?: string;
}

export interface IdentityWalletProfileValueItemInterface {
    icon: SVGIconKey;
    label: string;
    value: string | number;
}

export interface IdentityWalletProfileViewComputedDataInterface extends ProfileViewComputedDataInterface {
    loading_icon_html: string;
    wallet_title: string;
    wallet_subtitle: string;
    wallet_status_text: string;
    wallet_status_badge_class: string;
    wallet_is_deleted: boolean;
    information_items: IdentityWalletProfileValueItemInterface[];
    balance_items: IdentityWalletProfileValueItemInterface[];
    total_items: IdentityWalletProfileValueItemInterface[];
    currency_items: IdentityWalletProfileValueItemInterface[];
    owner_items: IdentityWalletProfileValueItemInterface[];
    timeline_items: IdentityWalletProfileValueItemInterface[];
}

export interface IdentityWalletProfileViewComponentsInterface extends ProfileViewComponentsInterface {
    ProfileValue: Component;
}
