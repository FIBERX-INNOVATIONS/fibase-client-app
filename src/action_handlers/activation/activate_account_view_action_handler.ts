import QRCode from "qrcode";

import { CSRF_TOKEN_FOR } from "@/configs";

import { GlobalEventTypes } from "@/types/global_events_type";

import { ActivateAccountFieldsType } from "@/types/form_fields_type";

import { ActivateAccountFormDataInterface, FieldValidator } from "@/types/form_data_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseFormActionHandler from "@/action_handlers/base_classes/base_form_action_handler";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import ActivateAccountValidator from "@/validators/activate_account_validator";
import TwoFactorLoginValidator from "@/validators/two_factor_login_validator";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import { ButtonActionMethodReturnInterface } from "@ui/version_3/ui_types/button_ui_type";

import {
    ActivateAccountViewComponentsInterface,
    ActivateAccountViewComputedDataInterface,
    ActivateAccountViewPropsInterface,
    ActivateAccountViewStateDataInterface
} from "@/ui_types/activate_account_view_type";

import type ActivateAccountViewController from "@/controllers/activation/activate_account_view_controller";

class ActivateAccountViewActionHandler extends BaseFormActionHandler<
    ActivateAccountFormDataInterface,
    ActivateAccountFieldsType,
    ActivateAccountViewPropsInterface,
    ActivateAccountViewStateDataInterface,
    ActivateAccountViewComputedDataInterface,
    ActivateAccountViewComponentsInterface,
    GlobalEventTypes
> {
    private copy_timeout_id?: number;

    // Method to initialize the activate account action handler.
    constructor(
        controller: BaseController<
            ActivateAccountViewPropsInterface,
            ActivateAccountViewStateDataInterface,
            ActivateAccountViewComputedDataInterface,
            ActivateAccountViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "activate_account_view_action_handler", {
            csrf_token: null,
            member_public_id: null,
            password: null,
            password_confirm: null,
            otp_code: null,
            token: null
        });

        this.validators = this.getValidators();
        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to get the typed activation controller.
    private get activation_controller(): ActivateAccountViewController {
        return this.controller as ActivateAccountViewController;
    }

    // Method to get input validators.
    protected getValidators(): Partial<
        Record<keyof ActivateAccountFormDataInterface, FieldValidator<ActivateAccountFormDataInterface>>
    > {
        return {
            password: ActivateAccountValidator.validatePasswordField,
            password_confirm: ActivateAccountValidator.validatePasswordConfirmField,
            otp_code: TwoFactorLoginValidator.validateOtpCodeField
        };
    }

    // Method to keep submit buttons enabled after CSRF is ready.
    protected getSubmitRequiredFields(): (keyof ActivateAccountFormDataInterface & string)[] {
        return [];
    }

    // Method to get the activation token from the route query.
    private getActivationToken(): string {
        const token_value = this.controller.route.query.token;

        if (Array.isArray(token_value)) {
            return token_value[0] ?? "";
        }

        return token_value?.toString() ?? "";
    }

    // Method to get the secret display value from setup data.
    private getSecretDisplayText(): string {
        const two_factor = this.state_refs.setup_data.value?.two_factor;

        return two_factor?.secret_display_text ?? "";
    }

    // Method to generate a QR code image data URL.
    private async generateQRCodeDataURL(otpauth_url?: string | null): Promise<string> {
        if (!otpauth_url) {
            return "";
        }

        return await QRCode.toDataURL(otpauth_url, {
            errorCorrectionLevel: "M",
            margin: 2,
            width: 256
        });
    }

    // Method to set the invalid token state.
    private setInvalidTokenState(message_key = "activation_token_invalid"): void {
        const content_text = this.state_refs.content_text.value;

        this.setState("current_step", "invalid");
        this.setState("loader_text", `${content_text.invalid_token_text} ${content_text.invalid_token_help_text}`);
        this.showErrorAlert("error", message_key, 8);
    }

    // Method to validate the activation token on mount.
    public initializeActivationFlow = async (): Promise<void> => {
        const token = this.getActivationToken();

        this.setState("current_step", "loading");
        this.setState("loader_text", this.state_refs.content_text.value.validating_text);
        this.form_data.token = token;

        if (!token) {
            this.setInvalidTokenState("invalid_activation_token");
            return;
        }

        try {
            // const result = await MemberProfileAPIService.validateMemberSetupToken({ token });

            const result = {
                status: "success",
                msg: "",
                data: {
                    member: {
                        public_id: "ADMS-000001",
                        username: "@fiberxinnovations",
                        first_name: "FiberX",
                        last_name: "Innovations",
                        email: "fiberxinnovations@gmail.com",
                        phone: "+234 7064 874632",
                        dob: "2022-04-04",
                        gender: "Male",
                        profile_photo_link: "https://storage.googleapis.com/fiberx_base/logos/FIBERXLOGO.jpg",
                        is_active: true,
                        is_2fa_enabled: true,
                        is_verified: true,
                        is_deleted: false,
                        delete_reason: null,
                        identity_id: 1,
                        identity_public_id: "IDT-ADMS-000001",
                        last_login_at: new Date(),
                        is_fully_authenticated: true,
                        last_activity_at: new Date(),
                        recent_activity_count: 1
                    },
                    token_public_id: "string",
                    expires_at: "",

                    two_factor: {
                        otpauth_url: "https://testingpu",
                        secret_display_text: "testy"
                    }
                }
            };

            if (result?.status !== "success" || !result.data?.member?.public_id) {
                this.setInvalidTokenState(result?.msg || "activation_token_invalid");
                return;
            }

            const qr_code_data_url = await this.generateQRCodeDataURL(result.data.two_factor?.otpauth_url);

            this.form_data.member_public_id = result.data.member.public_id;
            this.setState("setup_data", result.data);
            this.setState("qr_code_data_url", qr_code_data_url);
            this.setState("current_step", "password");
            this.showErrorAlert("success", result.msg || "activation_token_valid", 5);

            const csrf_is_ready = await this.setCSRFToken(CSRF_TOKEN_FOR.MEMBER_SETUP_LINK);

            if (!csrf_is_ready) {
                this.setInvalidTokenState("invalid_csrf_token");
            }
        } catch (error: unknown) {
            this.logger.error("Failed to validate activation token", { error });
            this.setInvalidTokenState("activation_token_invalid");
        }
    };

    // Method to move from password setup to two-factor setup.
    private handleNextStep = async (): Promise<ButtonActionMethodReturnInterface> => {
        const validation = ActivateAccountValidator.validatePasswordStepInput(this.form_data);

        if (!validation.v_state) {
            this.showErrorAlert("error", validation.v_msg, 6);
            return { status: false, msg: validation.v_msg };
        }

        this.hideErrorAlert();
        this.setState("current_step", "two_factor");
        this.setState("btn_props", this.activation_controller.buildStepSubmitButtonProps("two_factor"));

        return { status: true, msg: "valid_input" };
    };

    // Method to move back to password setup.
    public handleBackToPasswordStep = async (): Promise<ButtonActionMethodReturnInterface> => {
        this.hideErrorAlert();
        this.setState("current_step", "password");
        this.setState("btn_props", this.activation_controller.buildStepSubmitButtonProps("password"));

        return { status: true, msg: "valid_input" };
    };

    // Method to toggle password visibility.
    public handleTogglePasswordVisibility = async (): Promise<ButtonActionMethodReturnInterface> => {
        const next_show_password = !this.state_refs.show_password.value;

        this.setState("show_password", next_show_password);
        this.setState("fields", this.activation_controller.buildFields());
        this.setState("password_toggle_btn_props", this.activation_controller.buildPasswordToggleButtonProps());

        return { status: true, msg: "valid_input" };
    };

    // Method to copy text to the clipboard.
    public handleCopySecretKey = async (value?: string | null): Promise<void> => {
        const text = value ?? this.getSecretDisplayText();

        if (!text) {
            return;
        }

        try {
            if (window.navigator.clipboard?.writeText) {
                await window.navigator.clipboard.writeText(text);
            } else {
                this.copyTextWithTextarea(text);
            }

            this.setState("copied_secret_key", text);

            if (this.copy_timeout_id) {
                window.clearTimeout(this.copy_timeout_id);
            }

            this.copy_timeout_id = window.setTimeout(() => {
                if (this.state_refs.copied_secret_key.value === text) {
                    this.setState("copied_secret_key", "");
                }
            }, 2000);
        } catch (error: unknown) {
            this.logger.error("Failed to copy activation secret key", { error });
        }
    };

    // Method to copy text through a temporary textarea fallback.
    private copyTextWithTextarea(text: string): void {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }

    // Method to submit the completed activation request.
    private handleCompleteSetup = async (): Promise<ButtonActionMethodReturnInterface> => {
        const validation = ActivateAccountValidator.validateCompleteMemberSetupInput(this.form_data);

        if (!validation.v_state || !validation.v_data) {
            this.showErrorAlert("error", validation.v_msg, 6);
            return { status: false, msg: validation.v_msg };
        }

        try {
            this.setState("btn_props", { boolean_props: { disabled: true } } as any);

            const result = await MemberProfileAPIService.completeMemberSetup(validation.v_data);

            if (result?.status !== "success" || !result.data?.member?.public_id) {
                const message_key = result?.msg || "activation_completion_failed";

                this.showErrorAlert("error", message_key, 8);
                return { status: false, msg: message_key };
            }

            const { member, permissions, access_token, expires_in_mins, device_id } = result.data;

            MemberAuthenticatorUtil.onTwoFactorLoginSuccess(
                member,
                permissions,
                access_token,
                expires_in_mins,
                device_id ?? ""
            );

            StatusAlertTriggerUtil.triggerAlert(result.status, result.msg || "activation_completed", 4, "/dashboard");

            return { status: true, msg: result.msg || "activation_completed" };
        } catch (error: unknown) {
            this.logger.error("Failed to complete activation setup", { error });
            this.showErrorAlert("error", "error_occurred", 8);
            return { status: false, msg: "error_occurred" };
        } finally {
            this.syncSubmitButtonState();
        }
    };

    // Method to handle the current step submit button click.
    public handleOnFormSubmitBtnClick = async (): Promise<ButtonActionMethodReturnInterface> => {
        const current_step = this.state_refs.current_step.value;

        if (current_step === "password") {
            return await this.handleNextStep();
        }

        if (current_step === "two_factor") {
            return await this.handleCompleteSetup();
        }

        return { status: false, msg: "invalid_activation_step" };
    };

    // Method to clear activation-specific scheduled timers.
    public clearActivationScheduledTimers = (): boolean => {
        if (this.copy_timeout_id) {
            window.clearTimeout(this.copy_timeout_id);
            this.copy_timeout_id = undefined;
        }

        return true;
    };
}

export default ActivateAccountViewActionHandler;
