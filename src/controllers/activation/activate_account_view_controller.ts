import { markRaw } from "vue";

import { GlobalEventTypes } from "@/types/global_events_type";

import { ActivateAccountFieldsType } from "@/types/form_fields_type";

import { ActivateAccountFormDataInterface } from "@/types/form_data_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";
import { ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import RenderHtmlUtil from "@ui/version_3/utils/render_html_util";

import ContentCardUI from "@ui/version_3/components/ContentCardUI.vue";

import ContentCardUIPropsBuilder from "@ui/version_3/props_builder/content_card_ui_props_builder";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import ActivateAccountViewActionHandler from "@/action_handlers/activation/activate_account_view_action_handler";

import ActivateAccountViewClassStyles from "@/class_styles/activate_account_view_class_styles";

import TwoFactorSetupView from "@/views/activation/TwoFactorSetupView.vue";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import {
    ActivateAccountContentTextInterface,
    ActivateAccountStepType,
    ActivateAccountViewClassStylesInterface,
    ActivateAccountViewComponentsInterface,
    ActivateAccountViewComputedDataInterface,
    ActivateAccountViewPropsInterface,
    ActivateAccountViewStateDataInterface
} from "@/ui_types/activate_account_view_type";

class ActivateAccountViewController extends BaseFormViewController<
    ActivateAccountFormDataInterface,
    ActivateAccountFieldsType,
    ActivateAccountViewPropsInterface,
    ActivateAccountViewStateDataInterface,
    ActivateAccountViewComputedDataInterface,
    ActivateAccountViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly base_content_key = "content_resource.activate_account_view_ui";

    public readonly class_styles: ActivateAccountViewClassStylesInterface;

    declare public action_handler: ActivateAccountViewActionHandler;

    private readonly local_content_manager = ContentManagerUtil.getInstance();

    // Method to initialize the activate account controller.
    constructor(props: ActivateAccountViewPropsInterface) {
        super("activate_account_view", props, ActivateAccountViewClassStyles);

        this.class_styles = {
            ...ActivateAccountViewClassStyles,
            ...(props.class_styles ?? {})
        };

        this.setFormActionHandler(new ActivateAccountViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "activate_account_toaster"
        });
    }

    // Method to get text content with a fallback.
    private getContent(key: string, fallback: string): string {
        return this.local_content_manager.get<string>(key, fallback) ?? fallback;
    }

    // Method to build button HTML content with fallback text.
    private buildButtonHTMLContent(content_key: string, fallback_text: string, icon: SVGIconKey): string {
        const text = this.getContent(content_key, fallback_text);

        return RenderHtmlUtil.renderHtml({
            text,
            icon,
            icon_class_style: this.class_styles.btn_class_styles.icon_class_style,
            class_style: this.class_styles.btn_class_styles.text_class_style
        });
    }

    // Method to decorate input group props with fallback content.
    private withInputGroupFallbacks(
        input_group_props: ActivateAccountFieldsType[keyof ActivateAccountFieldsType],
        fallback_content: { label_text: string; placeholder_text: string; helper_text?: string }
    ): ActivateAccountFieldsType[keyof ActivateAccountFieldsType] {
        input_group_props.label_text = input_group_props.label_text || fallback_content.label_text;

        if (fallback_content.helper_text) {
            input_group_props.helper_text = input_group_props.helper_text || fallback_content.helper_text;
        }

        if (input_group_props.input_props) {
            input_group_props.input_props.placeholder_text =
                input_group_props.input_props.placeholder_text || fallback_content.placeholder_text;
        }

        return input_group_props;
    }

    // Method to get activation content text.
    private getContentObject(): ActivateAccountContentTextInterface {
        const content_key = `${this.base_content_key}.content`;

        return {
            validating_text: this.getContent(`${content_key}.validating_text`, "Validating activation request..."),
            invalid_token_text: this.getContent(
                `${content_key}.invalid_token_text`,
                "This activation link is invalid or has expired."
            ),
            invalid_token_help_text: this.getContent(
                `${content_key}.invalid_token_help_text`,
                "Please contact your administrator to request a new activation link."
            ),
            password_instruction_text: this.getContent(
                `${content_key}.password_instruction_text`,
                "Create a secure password, then complete two-factor authentication setup to activate your account."
            ),
            two_factor_instruction_text: this.getContent(
                `${content_key}.two_factor_instruction_text`,
                "Use an authenticator app to scan the QR code, or enter the secret key manually, then enter the one-time code."
            ),
            authenticator_apps_title_text: this.getContent(
                `${content_key}.authenticator_apps_title_text`,
                "Authenticator apps"
            ),
            qr_instruction_text: this.getContent(
                `${content_key}.qr_instruction_text`,
                "Scan this QR code with your authenticator app."
            ),
            otp_instruction_text: this.getContent(
                `${content_key}.otp_instruction_text`,
                "Enter the 6-digit code generated by your authenticator app."
            ),
            secret_key_title_text: this.getContent(`${content_key}.secret_key_title_text`, "Secret key"),
            secret_key_empty_text: this.getContent(`${content_key}.secret_key_empty_text`, "Secret key unavailable"),
            copy_button_text: this.getContent(`${content_key}.copy_button_text`, "Copy"),
            copied_button_text: this.getContent(`${content_key}.copied_button_text`, "Copied")
        };
    }

    // Method to build header text ui props.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI.
    protected buildFormFieldsUI(): ActivateAccountFieldsType {
        const form_data = this.action_handler.form_data;
        const password_input_type = this.state_refs.show_password?.value ? "text" : "password";
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        return {
            password_input_group_props: this.withInputGroupFallbacks(
                this.buildInputGroupProps("password", password_input_type, field_content_key("password"), {
                    model_value: form_data.password ?? ""
                }),
                {
                    label_text: "New Password",
                    placeholder_text: "Enter new password"
                }
            ),

            password_confirm_input_group_props: this.withInputGroupFallbacks(
                this.buildInputGroupProps("password_confirm", password_input_type, field_content_key("password_confirm"), {
                    model_value: form_data.password_confirm ?? ""
                }),
                {
                    label_text: "Confirm Password",
                    placeholder_text: "Confirm new password"
                }
            ),

            otp_input_group_props: this.withInputGroupFallbacks(
                this.buildInputGroupProps("otp_code", "otp", field_content_key("otp"), {
                    model_value: form_data.otp_code ?? "",
                    input_props: {
                        number_props: {
                            length: 6
                        }
                    }
                }),
                {
                    label_text: "OTP Code",
                    placeholder_text: "Enter authentication code"
                }
            )
        };
    }

    // Method to expose rebuilt fields to the action handler.
    public buildFields(): ActivateAccountFieldsType {
        return this.buildFormFieldsUI();
    }

    // Method to build the step submit button props.
    public buildStepSubmitButtonProps(step: ActivateAccountStepType): ButtonUIPropsInterface {
        const is_two_factor_step = step === "two_factor";
        const content_key = is_two_factor_step
            ? `${this.base_content_key}.fieldset.submit_btn_text`
            : `${this.base_content_key}.fieldset.next_btn_text`;
        const fallback_text = is_two_factor_step ? "Submit" : "Next";
        const icon_key = is_two_factor_step ? "paper_airplane_send_svg_icon" : "arrow_long_right_svg_icon";

        return this.buildSubmitButtonProps("activate_account_submit", content_key, icon_key, "button", {
            content_props: {
                button_html_content: this.buildButtonHTMLContent(content_key, fallback_text, icon_key),
                loading_html_content: RenderHtmlUtil.renderLoaderHtml()
            }
        });
    }

    // Method to build the form button UI.
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildStepSubmitButtonProps("password");
    }

    // Method to build the back button props.
    public buildBackButtonProps(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "activate_account_back",
            `${this.base_content_key}.fieldset.back_btn_text`,
            "arrow_left_short_circle_svg_icon",
            "button",
            {
                content_props: {
                    button_html_content: this.buildButtonHTMLContent(
                        `${this.base_content_key}.fieldset.back_btn_text`,
                        "Back",
                        "arrow_left_short_circle_svg_icon"
                    ),
                    loading_html_content: RenderHtmlUtil.renderLoaderHtml()
                },
                boolean_props: { disabled: false },
                action_props: {
                    on_click: this.action_handler.handleBackToPasswordStep
                },
                class_styles: {
                    ...this.class_styles.btn_class_styles,
                    button_class_style: this.class_styles.back_button_class_style
                }
            }
        );
    }

    // Method to build the password visibility toggle button props.
    public buildPasswordToggleButtonProps(): ButtonUIPropsInterface {
        const is_visible = this.state_refs.show_password?.value ?? false;
        const fallback_text = is_visible ? "Hide Password" : "Show Password";
        const icon_key = is_visible ? "hidden_eye_slash_svg_icon" : "view_eye_svg_icon";

        return this.buildSubmitButtonProps(
            "activate_account_password_toggle",
            is_visible
                ? `${this.base_content_key}.fieldset.hide_password_btn_text`
                : `${this.base_content_key}.fieldset.show_password_btn_text`,
            icon_key,
            "button",
            {
                content_props: {
                    button_html_content: this.buildButtonHTMLContent(
                        is_visible
                            ? `${this.base_content_key}.fieldset.hide_password_btn_text`
                            : `${this.base_content_key}.fieldset.show_password_btn_text`,
                        fallback_text,
                        icon_key
                    ),
                    loading_html_content: RenderHtmlUtil.renderLoaderHtml()
                },
                boolean_props: { disabled: false },
                action_props: {
                    on_click: this.action_handler.handleTogglePasswordVisibility
                },
                class_styles: {
                    ...this.class_styles.btn_class_styles,
                    ...this.class_styles.password_toggle_button_class_styles
                }
            }
        );
    }

    // Method to build the secret key content card props.
    private buildSecretKeyCardProps(): ContentCardUIPropsInterface {
        const content_text = this.state_refs.content_text.value;
        const secret_key = this.computed_refs.secret_key_text.value;
        const is_copied = Boolean(secret_key) && this.state_refs.copied_secret_key.value === secret_key;

        return ContentCardUIPropsBuilder.getReactivePropsObject("ActivateAccountSecretKey", {
            content_props: {
                title_text: content_text.secret_key_title_text,
                title_icon: "key_svg_icon",
                description_text: secret_key || content_text.secret_key_empty_text,
                button_text: is_copied ? content_text.copied_button_text : content_text.copy_button_text,
                button_icon: is_copied ? "check_circle_svg_icon" : "document_copy_svg_icon"
            },
            boolean_props: {
                disabled: !secret_key
            },
            action_props: {
                on_click: async () => {
                    await this.action_handler.handleCopySecretKey(secret_key);
                }
            },
            class_styles: this.class_styles.secret_key_card_class_styles
        });
    }

    // Method to get ui components.
    protected getUIComponents(): ActivateAccountViewComponentsInterface {
        return {
            ...super.getUIComponents(),
            ContentCardUI: markRaw(ContentCardUI),
            TwoFactorSetupView: markRaw(TwoFactorSetupView)
        };
    }

    // Method to get state data.
    protected getUIStateData(): ActivateAccountViewStateDataInterface {
        const state_data = super.getUIStateData();
        const content_text = this.getContentObject();

        state_data.header_text_props.text_value = state_data.header_text_props.text_value || "Activate Account";

        return {
            ...state_data,
            class_styles: this.class_styles,
            current_step: "loading",
            loader_text: content_text.validating_text,
            spinner_html_content: RenderHtmlUtil.renderLoaderHtml({
                class_style: this.class_styles.spinner_class_style
            }),
            setup_data: null,
            qr_code_data_url: "",
            copied_secret_key: "",
            show_password: false,
            content_text,
            back_btn_props: this.buildBackButtonProps(),
            password_toggle_btn_props: this.buildPasswordToggleButtonProps()
        };
    }

    // Method to get computed data.
    protected getUIComputedData() {
        return {
            member_context: () => this.state_refs.setup_data.value?.member ?? null,

            is_loading_step: () => {
                return ["loading", "invalid"].includes(this.state_refs.current_step.value);
            },

            is_password_step: () => this.state_refs.current_step.value === "password",

            is_two_factor_step: () => this.state_refs.current_step.value === "two_factor",

            secret_key_text: () => {
                const two_factor = this.state_refs.setup_data.value?.two_factor;

                return two_factor?.secret_display_text ?? "";
            },

            secret_key_card_props: () => this.buildSecretKeyCardProps()
        };
    }

    // Method to handle logic when component is mounted.
    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler.initializeActivationFlow();
    }

    // Method to handle logic before component is unmounted.
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.action_handler.clearActivationScheduledTimers();
        await super.handleBeforeUnmountedLogic();
    }
}

export default ActivateAccountViewController;
