import { Component, Ref } from "vue";

import { 
    ScreenLoaderClassStylesInterface,
    ScreenLoaderUIPropsInterface
} from "@ui/version_3/ui_types/screen_loader_ui_type";

import { 
    StatusAlertUIClassStylesInterface, 
    StatusAlertUIPropsInterface 
} from "@ui/version_3/ui_types/status_alert_ui_type";


export interface AppRootPropsInterface {
}

export interface AppRootStateDataInterface {
    modals:string[];

    screen_loader_props: ScreenLoaderUIPropsInterface;

    status_alert_props: StatusAlertUIPropsInterface
}

export interface AppRootComputedDataInterface {
}

export interface AppRootComponentsInterface {
    ScreenLoaderUI: Component;
    StatusAlertUI: Component;
    LayoutView: Component;
}

export interface AppRootClassStylesInterface {
    screen_loader_ui_class_style: ScreenLoaderClassStylesInterface,
    status_alert_ui_class_style: StatusAlertUIClassStylesInterface
}