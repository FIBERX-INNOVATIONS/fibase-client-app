import { Component } from "vue";

export interface LayoutViewPropsInterface {}

export interface LayoutViewStateDataInterface {}

export interface LayoutViewComputedDataInterface {
    is_route_ready: boolean;

    is_auth_layout: boolean;

    active_layout_component: Component | null;

    active_layout_key: string;
}

export interface LayoutViewComponentsInterface {
    AuthLayout: Component;
    DashboardLayout: Component;
}

export interface LayoutViewClassStylesInterface {}
