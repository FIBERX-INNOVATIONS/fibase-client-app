import { Component } from "vue";
import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";
import {
    ModalAnimationType,
    ModalUIActionPropsInterface,
    ModalUIClassStylesInterface,
    ModalUIContentPropsInterface
} from "@ui/version_3/ui_types/modal_ui_type";

export type GlobalEventTypes = {
    is_loading: boolean;

    alert_status_updated: AlertStatusChangedEventPayloadInterface;

    close_modal: CloseModalEventPayloadInterface;

    toggle_sidebar: ToggleSidebarEventPayloadInterface;

    open_modal: OpenModalEventPayloadInterface<any, any>;

    on_new_record_created: NewRecordCreated<any>;
};

export interface AlertStatusOptionsInterface {
    duration?: number;
    should_reload?: boolean;
    redirect_url?: string;
    close_modal?: boolean;
}

export interface AlertStatusChangedEventPayloadInterface {
    status: string;
    msg: string;
    options?: AlertStatusOptionsInterface;
}

export interface CloseModalEventPayloadInterface {
    modal_index?: number;
}

export interface ToggleSidebarEventPayloadInterface {
    toggle_state?: boolean;
}

export interface OpenModalEventPayloadInterface<
    BodyProps extends Record<string, any> = Record<string, any>,
    FooterProps extends Record<string, any> = Record<string, any>
> {
    content_key: string;

    animation_type?: ModalAnimationType;

    body_component?: Component;

    footer_component?: Component;

    body_props?: BodyProps;

    footer_props?: FooterProps;
}

export interface NewRecordCreated<T, K = true> {
    record: T;

    re_fetch: K;
}
