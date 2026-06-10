import { Component } from "vue";

import {
    RegisteredAppRecordInterface,
    RegisteredAppStatusUpdateResponseInterface
} from "@/types/api_service_type";

import {
    PageHeaderUIClassStylesInterface,
    PageHeaderUIPropsInterface
} from "@ui/version_3/ui_types/page_header_ui_type";
import {
    ContentCardUIClassStylesInterface,
    ContentCardUIPropsInterface
} from "@ui/version_3/ui_types/content_card_ui_type";

export interface ActivationCredentialsViewClassStylesInterface {
    wrapper_class_style: string;

    credentials_grid_class_style: string;

    content_card_class_styles: ContentCardUIClassStylesInterface;

    copied_content_card_class_styles: ContentCardUIClassStylesInterface;

    private_key_content_card_class_styles: ContentCardUIClassStylesInterface;

    copied_private_key_content_card_class_styles: ContentCardUIClassStylesInterface;

    page_header_class_styles: PageHeaderUIClassStylesInterface;
}

export interface ActivationCredentialsViewPropsInterface {
    activation_data: RegisteredAppStatusUpdateResponseInterface;

    class_styles?: Partial<ActivationCredentialsViewClassStylesInterface>;
}

export interface ActivationCredentialItemInterface {
    id: string;

    content_key: string;

    label: string;

    value?: string | null;

    icon: string;
}

export interface ActivationCredentialsViewStateDataInterface {
    page_header_props: PageHeaderUIPropsInterface;

    copied_value: string;
}

export interface ActivationCredentialsViewComputedDataInterface {
    safe_app: RegisteredAppRecordInterface;

    private_key: string;

    credential_items: ActivationCredentialItemInterface[];

    credential_card_props_list: ContentCardUIPropsInterface[];

    private_key_card_props: ContentCardUIPropsInterface;
}

export interface ActivationCredentialsViewComponentsInterface {
    PageHeaderUI: Component;

    ContentCardUI: Component;
}
