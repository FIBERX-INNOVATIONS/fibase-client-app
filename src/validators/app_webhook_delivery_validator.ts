import type { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import BaseValidator from "@/validators/base_validator";

import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class AppWebhookDeliveryValidator extends BaseValidator {
    // Method to require a registered-app identifier for a diagnostic webhook event.
    public static validateAppId = (value?: string | null): ActionMethodRetrunInterface => {
        const app_id = value?.trim() ?? "";

        if (InputValidatorUtil.isEmpty(app_id) || app_id.length > 200) {
            return { status: false, msg: this.getContentMessage("invalid_registered_app_id") };
        }

        return { status: true, msg: "" };
    };
}

export default AppWebhookDeliveryValidator;
