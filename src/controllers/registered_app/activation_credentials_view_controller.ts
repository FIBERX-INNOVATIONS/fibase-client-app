import { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIClassStylesInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import { ContentCardUIClassStylesInterface, ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";
import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ActivationCredentialItemInterface,
    ActivationCredentialsViewClassStylesInterface,
    ActivationCredentialsViewComponentsInterface,
    ActivationCredentialsViewComputedDataInterface,
    ActivationCredentialsViewPropsInterface,
    ActivationCredentialsViewStateDataInterface
} from "@/ui_types/activation_credentials_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import PageHeaderUI from "@ui/version_3/components/PageHeaderUI.vue";

import ContentCardUI from "@ui/version_3/components/ContentCardUI.vue";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import ContentCardUIPropsBuilder from "@ui/version_3/props_builder/content_card_ui_props_builder";

import ActivationCredentialsViewClassStyles from "@/class_styles/activation_credentials_view_class_styles";

import RegisteredAppActivationCredentialsViewActionHandler from "@/action_handlers/registered_app/activation_credentials_view_action_handler";

class RegisteredAppActivationCredentialsViewController extends BaseController<
    ActivationCredentialsViewPropsInterface,
    ActivationCredentialsViewStateDataInterface,
    ActivationCredentialsViewComputedDataInterface,
    ActivationCredentialsViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: ActivationCredentialsViewClassStylesInterface;

    public action_handler: RegisteredAppActivationCredentialsViewActionHandler;

    private readonly base_content_key = "content_resource.registered_app_view_ui.activation_credentials_view_ui";

    private readonly content_manager = ContentManagerUtil.getInstance();

    constructor(props: ActivationCredentialsViewPropsInterface) {
        super("registered_app_activation_credentials_view", props);

        this.class_styles = this.mergeClassStyles(props.class_styles);

        this.action_handler = new RegisteredAppActivationCredentialsViewActionHandler(this);
        this.setActionHandler(this.action_handler);
    }

    protected getUIComponents(): ActivationCredentialsViewComponentsInterface {
        return {
            PageHeaderUI,
            ContentCardUI
        };
    }

    protected getUIStateData(): ActivationCredentialsViewStateDataInterface {
        return {
            page_header_props: this.buildPageHeaderProps(),
            copied_value: ""
        };
    }

    protected getUIComputedData() {
        return {
            registered_app_record: () => this.props.activation_data.registered_app_record,

            private_key: () => this.props.activation_data.private_key ?? "",

            credential_items: (): ActivationCredentialItemInterface[] => {
                const registered_app_record = this.props.activation_data.registered_app_record;

                return [
                    this.buildCredentialItem(
                        "app_id",
                        "App ID",
                        registered_app_record.public_id,
                        "identification_card_svg_icon"
                    ),
                    this.buildCredentialItem("app_prefix", "App Prefix", registered_app_record.prefix, "key_svg_icon"),
                    this.buildCredentialItem(
                        "app_name",
                        "App Name",
                        registered_app_record.name,
                        "rectangle_window_group_svg_icon"
                    ),
                    this.buildCredentialItem("base_url", "Base URL", registered_app_record.base_url, "world_globe_svg_icon"),
                    this.buildCredentialItem(
                        "key_algorithm",
                        "Key Algorithm",
                        registered_app_record.auth?.key_algorithm,
                        "padlock_closed_svg_icon"
                    ),
                    this.buildCredentialItem(
                        "key_version",
                        "Key Version",
                        registered_app_record.auth?.key_version?.toString(),
                        "numbered_list_svg_icon"
                    ),
                    this.buildCredentialItem(
                        "last_key_rotated_at",
                        "Last Key Rotated At",
                        registered_app_record.auth?.last_key_rotated_at,
                        "clock_svg_icon"
                    )
                ];
            },

            credential_card_props_list: (): ContentCardUIPropsInterface[] => {
                return this.computed_refs.credential_items.value.map((credential_item) => {
                    return this.buildCredentialCardProps(credential_item);
                });
            },

            private_key_card_props: (): ContentCardUIPropsInterface => {
                return this.buildPrivateKeyCardProps();
            }
        };
    }

    private buildPageHeaderProps(): ActivationCredentialsViewStateDataInterface["page_header_props"] {
        const header_text = this.getContentText(
            `${this.base_content_key}.header_section.header_text`,
            "Save these activation credentials now."
        );

        const description_text = this.getContentText(
            `${this.base_content_key}.header_section.header_description`,
            "The private key is only shown for this activation response. Copy it before closing this modal."
        );

        return {
            id: "RegisteredAppActivationCredentialsNotice",
            header_props: {
                header_tag: "h3",
                text_value: header_text,
                class_styles: this.class_styles.page_header_class_styles.header_text_class_styles
            },
            description_text,
            action_buttons: [],
            class_styles: this.class_styles.page_header_class_styles
        };
    }

    private getContentText(content_key: string, fallback_text: string): string {
        return this.content_manager.get<string>(content_key, fallback_text) ?? fallback_text;
    }

    private getContentIcon(content_key: string, fallback_icon: SVGIconKey): SVGIconKey {
        return this.content_manager.get<SVGIconKey>(content_key, fallback_icon) ?? fallback_icon;
    }

    private buildCredentialItem(
        content_key: string,
        fallback_label: string,
        value: string | null | undefined,
        fallback_icon: SVGIconKey
    ): ActivationCredentialItemInterface {
        const item_content_key = `${this.base_content_key}.credentials_section.items.${content_key}`;

        return {
            id: content_key,
            content_key,
            label: this.getContentText(`${item_content_key}.title_text`, fallback_label),
            value,
            icon: this.getContentIcon(`${item_content_key}.title_icon`, fallback_icon)
        };
    }

    private buildCredentialCardProps(credential_item: ActivationCredentialItemInterface): ContentCardUIPropsInterface {
        const value = credential_item.value ?? "";
        const is_copied = Boolean(value) && this.state_refs.copied_value.value === value;

        return this.buildContentCardProps({
            id: `RegisteredAppActivationCredential${credential_item.id}`,
            title_text: credential_item.label,
            title_icon: credential_item.icon as SVGIconKey,
            description_text: value || this.getEmptyValueText(),
            button_text: this.getCopyButtonText(is_copied),
            button_icon: this.getCopyButtonIcon(is_copied),
            disabled: !value,
            class_styles: is_copied
                ? this.class_styles.copied_content_card_class_styles
                : this.class_styles.content_card_class_styles,
            value
        });
    }

    private buildPrivateKeyCardProps(): ContentCardUIPropsInterface {
        const private_key = this.props.activation_data.private_key ?? "";
        const private_key_copy_value = this.formatPrivateKeyForCopy(private_key);
        const is_copied = Boolean(private_key_copy_value) && this.state_refs.copied_value.value === private_key_copy_value;
        const content_key = `${this.base_content_key}.private_key_section`;

        return this.buildContentCardProps({
            id: "RegisteredAppActivationPrivateKey",
            title_text: this.getContentText(`${content_key}.title_text`, "Private Key"),
            title_icon: this.getContentIcon(`${content_key}.title_icon`, "key_svg_icon"),
            description_text: private_key || this.getEmptyValueText(),
            button_text: this.getCopyButtonText(is_copied),
            button_icon: this.getCopyButtonIcon(is_copied),
            disabled: !private_key,
            class_styles: is_copied
                ? this.class_styles.copied_private_key_content_card_class_styles
                : this.class_styles.private_key_content_card_class_styles,
            value: private_key_copy_value
        });
    }

    private formatPrivateKeyForCopy(private_key: string): string {
        if (!private_key) {
            return "";
        }

        const normalized_private_key = private_key.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        const private_key_with_trailing_newline = normalized_private_key.endsWith("\n")
            ? normalized_private_key
            : `${normalized_private_key}\n`;

        return JSON.stringify(private_key_with_trailing_newline);
    }

    private buildContentCardProps(params: {
        id: string;
        title_text: string;
        title_icon: SVGIconKey;
        description_text: string;
        button_text: string;
        button_icon: SVGIconKey;
        disabled: boolean;
        class_styles: ContentCardUIClassStylesInterface;
        value: string;
    }): ContentCardUIPropsInterface {
        return ContentCardUIPropsBuilder.getReactivePropsObject(params.id, {
            content_props: {
                title_text: params.title_text,
                title_icon: params.title_icon,
                description_text: params.description_text,
                button_text: params.button_text,
                button_icon: params.button_icon
            },
            boolean_props: {
                disabled: params.disabled
            },
            action_props: {
                on_click: async () => {
                    await this.action_handler.handleCopyText(params.value);
                }
            },
            class_styles: params.class_styles
        });
    }

    private getEmptyValueText(): string {
        return this.getContentText(`${this.base_content_key}.empty_value_text`, "-");
    }

    private getCopyButtonText(is_copied: boolean): string {
        const content_key = is_copied ? "copied_button" : "copy_button";
        const fallback_text = is_copied ? "Copied" : "Copy";

        return this.getContentText(`${this.base_content_key}.${content_key}.text`, fallback_text);
    }

    private getCopyButtonIcon(is_copied: boolean): SVGIconKey {
        const content_key = is_copied ? "copied_button" : "copy_button";
        const fallback_icon = is_copied ? "check_circle_svg_icon" : "document_copy_svg_icon";

        return this.getContentIcon(`${this.base_content_key}.${content_key}.icon`, fallback_icon);
    }

    private mergeClassStyles(
        class_styles?: Partial<ActivationCredentialsViewClassStylesInterface>
    ): ActivationCredentialsViewClassStylesInterface {
        const default_styles = ActivationCredentialsViewClassStyles;
        const page_header_styles = class_styles?.page_header_class_styles;
        const header_text_class_styles: HeaderTextUIClassStylesInterface = {
            ...(default_styles.page_header_class_styles.header_text_class_styles ?? {
                text_class_style: ""
            }),
            ...(page_header_styles?.header_text_class_styles ?? {})
        };
        const action_button_class_styles: ButtonUIClassStylesInterface = {
            ...(default_styles.page_header_class_styles.action_button_class_styles ?? {
                wrapper_class_style: "",
                button_class_style: "",
                disabled_class_style: "",
                loading_class_style: "",
                icon_class_style: "",
                text_class_style: "",
                content_class_style: ""
            }),
            ...(page_header_styles?.action_button_class_styles ?? {})
        };

        return {
            ...default_styles,
            ...(class_styles ?? {}),
            content_card_class_styles: this.mergeContentCardClassStyles(
                default_styles.content_card_class_styles,
                class_styles?.content_card_class_styles
            ),
            copied_content_card_class_styles: this.mergeContentCardClassStyles(
                default_styles.copied_content_card_class_styles,
                class_styles?.copied_content_card_class_styles
            ),
            private_key_content_card_class_styles: this.mergeContentCardClassStyles(
                default_styles.private_key_content_card_class_styles,
                class_styles?.private_key_content_card_class_styles
            ),
            copied_private_key_content_card_class_styles: this.mergeContentCardClassStyles(
                default_styles.copied_private_key_content_card_class_styles,
                class_styles?.copied_private_key_content_card_class_styles
            ),
            page_header_class_styles: {
                ...default_styles.page_header_class_styles,
                ...(page_header_styles ?? {}),
                header_text_class_styles,
                action_button_class_styles
            }
        };
    }

    private mergeContentCardClassStyles(
        default_styles: ContentCardUIClassStylesInterface,
        class_styles?: ContentCardUIClassStylesInterface
    ): ContentCardUIClassStylesInterface {
        return {
            ...default_styles,
            ...(class_styles ?? {})
        };
    }
}

export default RegisteredAppActivationCredentialsViewController;
