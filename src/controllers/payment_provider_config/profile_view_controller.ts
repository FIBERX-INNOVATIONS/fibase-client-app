import {
    PaymentProviderConfigProfileViewContentKeysInterface,
    PaymentProviderConfigProfileViewContentTextInterface,
    PaymentProviderConfigProfileViewComputedDataInterface,
    PaymentProviderConfigProfileEntryInterface,
    PaymentProviderConfigProfileViewStateDataInterface,
    ProfileViewComponentsInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import { DEFAULT_MEMBER_PROFILE_PHOTO_URL, DEFUALT_PAYMENT_PROVIDER_LOGO_URL } from "@/configs";

import {
    PaymentProviderConfigCredentialsInterface,
    PaymentProviderConfigRecordInterface,
    PaymentProviderConfigSettingsInterface
} from "@/types/api_service_type";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import PaymentProviderConfigProfileViewActionHandler from "@/action_handlers/payment_provider_config/profile_view_action_handler";

class PaymentProviderConfigProfileViewController extends BaseProfileViewController<
    PaymentProviderConfigRecordInterface,
    ProfileViewPropsInterface<PaymentProviderConfigRecordInterface>,
    PaymentProviderConfigProfileViewStateDataInterface,
    PaymentProviderConfigProfileViewComputedDataInterface,
    ProfileViewComponentsInterface
> {
    public readonly content_key: string = "payment_provider_config";

    public action_handler: PaymentProviderConfigProfileViewActionHandler;

    public content_obj: PaymentProviderConfigProfileViewContentTextInterface =
        {} as PaymentProviderConfigProfileViewContentTextInterface;

    private readonly setting_fields = [
        { key: "webhook_url", label_key: "webhook_url_label_text" },
        { key: "callback_url", label_key: "callback_url_label_text" },
        { key: "redirect_url", label_key: "redirect_url_label_text" },
        { key: "success_url", label_key: "success_url_label_text" },
        { key: "failure_url", label_key: "failure_url_label_text" },
        { key: "settlement_currency", label_key: "settlement_currency_label_text" },
        { key: "default_currency", label_key: "default_currency_label_text" },
        { key: "payout_schedule", label_key: "payout_schedule_label_text" },
        { key: "capture_mode", label_key: "capture_mode_label_text" },
        { key: "timeout_ms", label_key: "timeout_ms_label_text" }
    ] as const;

    private readonly credential_fields = [
        { key: "api_key", label_key: "api_key_label_text" },
        { key: "secret_key", label_key: "secret_key_label_text" },
        { key: "public_key", label_key: "public_key_label_text" },
        { key: "private_key", label_key: "private_key_label_text" },
        { key: "client_id", label_key: "client_id_label_text" },
        { key: "client_secret", label_key: "client_secret_label_text" },
        { key: "merchant_id", label_key: "merchant_id_label_text" },
        { key: "account_id", label_key: "account_id_label_text" },
        { key: "username", label_key: "username_label_text" },
        { key: "password", label_key: "password_label_text" },
        { key: "webhook_hash", label_key: "webhook_hash_label_text" },
        { key: "webhook_secret", label_key: "webhook_secret_label_text" },
        { key: "signing_secret", label_key: "signing_secret_label_text" }
    ] as const;

    // Method to initialize the provider configuration profile controller.
    constructor(props: ProfileViewPropsInterface<PaymentProviderConfigRecordInterface>) {
        super(props);

        this.action_handler = new PaymentProviderConfigProfileViewActionHandler(this);
        this.setProfileActionHandler(this.action_handler);
    }

    // Method to configure the shared member summary for provider configuration audit fields.
    protected getUIComponents(): ProfileViewComponentsInterface {
        return {
            ...super.getUIComponents(),
            MemberSummary: this.getMemberSummaryComponent({
                always_show_member: true,
                member_name_tag: "p",
                member_email_class_style: this.class_styles.p_class_style
            })
        };
    }

    // Method to determine whether a provider configuration value is present.
    private isPresent(value: unknown): boolean {
        return value !== null && value !== undefined && value !== "";
    }

    // Method to build the visible provider setting entries.
    private getSettingsEntries(): PaymentProviderConfigProfileEntryInterface[] {
        const settings: PaymentProviderConfigSettingsInterface = this.state_refs.profile_record.value?.settings ?? {};

        return this.setting_fields
            .map((field) => {
                return {
                    key: field.key,
                    label: this.content_obj[field.label_key],
                    value: settings[field.key] ?? this.content_obj.empty_value_text
                };
            })
            .filter((entry) => {
                return this.isPresent(settings[entry.key]);
            });
    }

    // Method to build the visible provider credential entries.
    private getCredentialEntries(): PaymentProviderConfigProfileEntryInterface[] {
        const credentials: PaymentProviderConfigCredentialsInterface = this.state_refs.credentials.value ?? {};

        return this.credential_fields
            .map((field) => {
                return {
                    key: field.key,
                    label: this.content_obj[field.label_key],
                    value: credentials[field.key] ?? this.content_obj.empty_value_text
                };
            })
            .filter((entry) => {
                return this.isPresent(credentials[entry.key]);
            });
    }

    // Method to resolve the credential reveal button text from its current state.
    private getCredentialsButtonText(): string {
        if (this.state_refs.is_loading_credentials.value) {
            return this.content_obj.credentials_loading_text;
        }

        if (this.state_refs.credentials_are_visible.value) {
            return this.content_obj.hide_credentials_btn_text;
        }

        return this.content_obj.reveal_credentials_btn_text;
    }

    // Method to map provider configuration content fields to content-resource keys.
    protected getChildProfileViewContentKeys(): Partial<PaymentProviderConfigProfileViewContentKeysInterface> {
        const base_content_key = this.getBaseContentKey();

        return {
            payment_provider_logo_alt_text: `${base_content_key}.header.payment_provider_logo_alt_text`,
            empty_value_text: `${base_content_key}.empty_value_text`,
            config_information_title_text: `${base_content_key}.sections.config_information.title_text`,
            provider_name_label_text: `${base_content_key}.sections.config_information.provider_name_label_text`,
            provider_code_label_text: `${base_content_key}.sections.config_information.provider_code_label_text`,
            provider_id_label_text: `${base_content_key}.sections.config_information.provider_id_label_text`,
            environment_label_text: `${base_content_key}.sections.config_information.environment_label_text`,
            account_reference_label_text: `${base_content_key}.sections.config_information.account_reference_label_text`,
            settings_title_text: `${base_content_key}.sections.settings.title_text`,
            webhook_url_label_text: `${base_content_key}.sections.settings.webhook_url_label_text`,
            callback_url_label_text: `${base_content_key}.sections.settings.callback_url_label_text`,
            redirect_url_label_text: `${base_content_key}.sections.settings.redirect_url_label_text`,
            success_url_label_text: `${base_content_key}.sections.settings.success_url_label_text`,
            failure_url_label_text: `${base_content_key}.sections.settings.failure_url_label_text`,
            settlement_currency_label_text: `${base_content_key}.sections.settings.settlement_currency_label_text`,
            default_currency_label_text: `${base_content_key}.sections.settings.default_currency_label_text`,
            payout_schedule_label_text: `${base_content_key}.sections.settings.payout_schedule_label_text`,
            capture_mode_label_text: `${base_content_key}.sections.settings.capture_mode_label_text`,
            timeout_ms_label_text: `${base_content_key}.sections.settings.timeout_ms_label_text`,
            no_settings_text: `${base_content_key}.sections.settings.no_settings_text`,
            credentials_title_text: `${base_content_key}.sections.credentials.title_text`,
            credentials_hidden_text: `${base_content_key}.sections.credentials.hidden_text`,
            reveal_credentials_btn_text: `${base_content_key}.sections.credentials.reveal_btn_text`,
            hide_credentials_btn_text: `${base_content_key}.sections.credentials.hide_btn_text`,
            credentials_loading_text: `${base_content_key}.sections.credentials.loading_text`,
            credentials_permission_denied_text: `${base_content_key}.sections.credentials.permission_denied_text`,
            no_credentials_text: `${base_content_key}.sections.credentials.no_credentials_text`,
            api_key_label_text: `${base_content_key}.sections.credentials.api_key_label_text`,
            secret_key_label_text: `${base_content_key}.sections.credentials.secret_key_label_text`,
            public_key_label_text: `${base_content_key}.sections.credentials.public_key_label_text`,
            private_key_label_text: `${base_content_key}.sections.credentials.private_key_label_text`,
            client_id_label_text: `${base_content_key}.sections.credentials.client_id_label_text`,
            client_secret_label_text: `${base_content_key}.sections.credentials.client_secret_label_text`,
            merchant_id_label_text: `${base_content_key}.sections.credentials.merchant_id_label_text`,
            account_id_label_text: `${base_content_key}.sections.credentials.account_id_label_text`,
            username_label_text: `${base_content_key}.sections.credentials.username_label_text`,
            password_label_text: `${base_content_key}.sections.credentials.password_label_text`,
            webhook_hash_label_text: `${base_content_key}.sections.credentials.webhook_hash_label_text`,
            webhook_secret_label_text: `${base_content_key}.sections.credentials.webhook_secret_label_text`,
            signing_secret_label_text: `${base_content_key}.sections.credentials.signing_secret_label_text`,
            status_title_text: `${base_content_key}.sections.status.title_text`,
            created_label_text: `${base_content_key}.sections.status.created_label_text`,
            updated_label_text: `${base_content_key}.sections.status.updated_label_text`,
            created_by_title_text: `${base_content_key}.sections.created_by.title_text`,
            updated_by_title_text: `${base_content_key}.sections.updated_by.title_text`
        };
    }

    // Method to provide provider configuration profile fallback content.
    protected getProfileViewContentFallbacks(): Partial<PaymentProviderConfigProfileViewContentTextInterface> {
        return {
            ...super.getProfileViewContentFallbacks(),
            loading_text: "Loading payment provider config...",
            no_description_text: "",
            payment_provider_logo_alt_text: "Payment provider logo",
            empty_value_text: "-",
            config_information_title_text: "Config Information",
            provider_name_label_text: "Provider:",
            provider_code_label_text: "Provider Code:",
            provider_id_label_text: "Provider ID:",
            environment_label_text: "Environment:",
            account_reference_label_text: "Account Reference:",
            settings_title_text: "Settings",
            webhook_url_label_text: "Webhook URL:",
            callback_url_label_text: "Callback URL:",
            redirect_url_label_text: "Redirect URL:",
            success_url_label_text: "Success URL:",
            failure_url_label_text: "Failure URL:",
            settlement_currency_label_text: "Settlement Currency:",
            default_currency_label_text: "Default Currency:",
            payout_schedule_label_text: "Payout Schedule:",
            capture_mode_label_text: "Capture Mode:",
            timeout_ms_label_text: "Timeout (MS):",
            no_settings_text: "No settings configured.",
            credentials_title_text: "Credentials",
            credentials_hidden_text: "Credentials are hidden until you reveal them.",
            reveal_credentials_btn_text: "Reveal Credentials",
            hide_credentials_btn_text: "Hide Credentials",
            credentials_loading_text: "Loading credentials...",
            credentials_permission_denied_text: "You do not have permission to view decrypted credentials.",
            no_credentials_text: "No credentials returned for this provider config.",
            api_key_label_text: "API Key:",
            secret_key_label_text: "Secret Key:",
            public_key_label_text: "Public Key:",
            private_key_label_text: "Private Key:",
            client_id_label_text: "Client ID:",
            client_secret_label_text: "Client Secret:",
            merchant_id_label_text: "Merchant ID:",
            account_id_label_text: "Account ID:",
            username_label_text: "Username:",
            password_label_text: "Password:",
            webhook_hash_label_text: "Webhook Hash:",
            webhook_secret_label_text: "Webhook Secret:",
            signing_secret_label_text: "Signing Secret:",
            status_title_text: "Status",
            created_label_text: "Created:",
            updated_label_text: "Updated:",
            created_by_title_text: "Created By",
            updated_by_title_text: "Updated By"
        };
    }

    // Method to initialize provider configuration profile and credential state.
    protected getUIStateData(): PaymentProviderConfigProfileViewStateDataInterface {
        return {
            ...super.getUIStateData(),
            credentials: null,
            credentials_are_visible: false,
            is_loading_credentials: false,
            credentials_error_msg: null
        } as PaymentProviderConfigProfileViewStateDataInterface;
    }

    // Method to derive provider configuration profile display data.
    protected getUIComputedData(): ComputedDefinitionType<PaymentProviderConfigProfileViewComputedDataInterface> {
        return {
            loading_icon_html: () => {
                return String(getSVGIconValue("loading_svg_icon") ?? "");
            },

            logo_url: () => {
                return this.state_refs.profile_record.value?.provider?.logo_url || DEFUALT_PAYMENT_PROVIDER_LOGO_URL;
            },

            readable_created_at: () => {
                const record = this.state_refs.profile_record.value;
                return record?.created_at
                    ? InputTransformerUtil.formatReadableDateTime(record.created_at)
                    : this.content_obj.empty_value_text;
            },

            readable_updated_at: () => {
                const record = this.state_refs.profile_record.value;
                return record?.updated_at
                    ? InputTransformerUtil.formatReadableDateTime(record.updated_at)
                    : this.content_obj.empty_value_text;
            },

            creator_member_profile_photo_url: () => {
                return this.state_refs.profile_record.value?.creator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            updator_member_profile_photo_url: () => {
                return this.state_refs.profile_record.value?.updator?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
            },

            has_credentials_permission: () => {
                return MemberAuthenticatorUtil.memberHasPermissionTo(
                    "payment_provider_config_module.get_payment_provider_config_credentials"
                );
            },

            settings_entries: () => {
                return this.getSettingsEntries();
            },

            credential_entries: () => {
                return this.getCredentialEntries();
            },

            credentials_button_text: () => {
                return this.getCredentialsButtonText();
            }
        };
    }
}

export default PaymentProviderConfigProfileViewController;
