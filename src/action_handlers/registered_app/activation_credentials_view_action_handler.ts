import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";
import BaseController from "@ui/version_3/base_classes/base_controller";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ActivationCredentialsViewComponentsInterface,
    ActivationCredentialsViewComputedDataInterface,
    ActivationCredentialsViewPropsInterface,
    ActivationCredentialsViewStateDataInterface
} from "@/ui_types/activation_credentials_view_type";

class RegisteredAppActivationCredentialsViewActionHandler extends BaseActionHandler<
    ActivationCredentialsViewPropsInterface,
    ActivationCredentialsViewStateDataInterface,
    ActivationCredentialsViewComputedDataInterface,
    ActivationCredentialsViewComponentsInterface,
    GlobalEventTypes
> {
    private copy_timeout_id?: number;

    constructor(
        controller: BaseController<
            ActivationCredentialsViewPropsInterface,
            ActivationCredentialsViewStateDataInterface,
            ActivationCredentialsViewComputedDataInterface,
            ActivationCredentialsViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "registered_app_activation_credentials_view_action_handler");
    }

    // Method to copy activation credential text to the clipboard.
    public handleCopyText = async (value?: string | null): Promise<void> => {
        const text = value ?? "";

        if (!text) {
            return;
        }

        try {
            if (window.navigator.clipboard?.writeText) {
                await window.navigator.clipboard.writeText(text);
            } else {
                this.copyTextWithTextarea(text);
            }

            this.setCopiedValue(text);
        } catch (error: unknown) {
            this.logger.error("Failed to copy activation credential", { error });
        }
    };

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

    private setCopiedValue(text: string): void {
        this.setState("copied_value", text);

        if (this.copy_timeout_id) {
            window.clearTimeout(this.copy_timeout_id);
        }

        this.copy_timeout_id = window.setTimeout(() => {
            if (this.state_refs.copied_value.value === text) {
                this.setState("copied_value", "");
            }
        }, 2000);
    }
}

export default RegisteredAppActivationCredentialsViewActionHandler;
