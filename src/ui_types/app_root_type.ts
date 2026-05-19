import { Component } from "vue";

import {
    ScreenLoaderUIClassStylesInterface,
    ScreenLoaderUIPropsInterface
} from "@ui/version_3/ui_types/screen_loader_ui_type";

import { StatusAlertUIClassStylesInterface } from "@ui/version_3/ui_types/status_alert_ui_type";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

export interface AppRootPropsInterface {}

export interface AppRootStateDataInterface {
    screen_loader_visible: boolean;
    screen_loader_symbol: ScreenLoaderUIPropsInterface["loader_symbol"];
    screen_loader_text: ScreenLoaderUIPropsInterface["loader_text"];
    screen_loader_class_styles: ScreenLoaderUIPropsInterface["class_styles"];
    alert_box_id: string;
    alert_status: string | null;
    alert_message: string | null | undefined;
    status_icon: SVGIconKey | null;
    status_alert_ui_class_style: StatusAlertUIClassStylesInterface | null;
    status_alert_close_btn_icon: SVGIconKey | null;
}

export interface AppRootComputedDataInterface {}

export interface AppRootComponentsInterface {
    ScreenLoaderUI: Component;
    StatusAlertUI: Component;
    LayoutView: Component;
}

export interface AppRootClassStylesInterface {
    screen_loader_ui_class_style: ScreenLoaderUIClassStylesInterface;
    status_alert_ui_class_style: StatusAlertUIClassStylesInterface;
}
