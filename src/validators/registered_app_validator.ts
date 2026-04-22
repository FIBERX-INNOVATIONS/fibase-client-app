import {
    RegisteredAppFromDataInterface,
    RegisteredAppSocialLinksInterface,
    RegisteredAppValidatedFromDataInterface
} from "@/types/form_data_type";

import { ValidationResultInterface } from "@ui/version_3/types/validator_type";
import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";
import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";

class RegisteredAppValidator {
    protected static content_manager = ContentManagerUtil.getInstance();

    protected static getContentMessage(message_key: string): string {
        return RegisteredAppValidator.content_manager.getAPIResponseValue(message_key);
    }

    // =========================
    // 🔹 FIELD VALIDATIONS
    // =========================

    public static validatePrefixField = (
        value: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_prefix")
            };
        }

        return { status: true, msg: "" };
    };

    public static validateNameField = (
        value: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_name")
            };
        }

        if (value && !InputValidatorUtil.isValidNamey(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_name")
            };
        }

        return { status: true, msg: "" };
    };

    public static validateDescriptionField = (
        value: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_description")
            };
        }

        if (value && !InputValidatorUtil.isValidLongText(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_description")
            };
        }

        return { status: true, msg: "" };
    };

    public static validateBaseUrlField = (
        value: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_base_url")
            };
        }

        if (value && !InputValidatorUtil.isValidURL(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_base_url")
            };
        }

        return { status: true, msg: "" };
    };

    public static validateLogoUrlField = (
        value: string | null
    ): ActionMethodRetrunInterface => {
        if (InputValidatorUtil.isEmpty(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_logo_url")
            };
        }

        if (value && !InputValidatorUtil.isValidURL(value)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_logo_url")
            };
        }

        return { status: true, msg: "" };
    };

    // =========================
    // 🔹 SOCIAL LINKS
    // =========================

    public static validateSocialLinks = (
        social_links: RegisteredAppSocialLinksInterface | null
    ): ActionMethodRetrunInterface => {
        if (!social_links) {
            return { status: true, msg: "" };
        }

        if (typeof social_links !== "object") {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_social_links")
            };
        }

        const invalid_links = Object.entries(social_links).filter(
            ([_, value]) => {
                if (!value) return false;

                return (
                    !InputValidatorUtil.isValidURL(value) &&
                    !InputValidatorUtil.isValidEmail(value)
                );
            }
        );

        if (invalid_links.length) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_social_links_must_be_valid_links")
            };
        }

        return { status: true, msg: "" };
    };

    // =========================
    // 🔹 URLS ARRAY
    // =========================

    public static validateUrls = (
        urls: string | null
    ): ActionMethodRetrunInterface => {
    
        if (!urls) {
            return { status: true, msg: "" };
        }

        const array_urls = urls.split(",").map((url) => url.trim());

        if (!Array.isArray(array_urls)) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_urls")
            };
        }

        const invalid_urls = array_urls.filter(
            (url) => !InputValidatorUtil.isValidURL(url)
        );

        if (invalid_urls.length) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_app_urls_must_be_valid_links")
            };
        }

        return { status: true, msg: "" };
    };

    // =========================
    // 🔹 FULL FORM VALIDATION
    // =========================

    public static validateRegisteredAppInput(
        form_data: RegisteredAppFromDataInterface
    ): ValidationResultInterface<RegisteredAppValidatedFromDataInterface> {
        const {
            csrf_token,
            name,
            prefix,
            description,
            base_url,
            logo_url,
            social_links,
            urls
        } = form_data;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (this.validatePrefixField(prefix).status === false) {
            return { v_state: false, v_msg: "invalid_input_app_prefix" };
        }

        if (this.validateNameField(name).status === false) {
            return { v_state: false, v_msg: "invalid_input_app_name" };
        }

        if (this.validateDescriptionField(description).status === false) {
            return { v_state: false, v_msg: "invalid_input_app_description" };
        }

        if (this.validateBaseUrlField(base_url).status === false) {
            return { v_state: false, v_msg: "invalid_input_app_base_url" };
        }

        if (this.validateLogoUrlField(logo_url).status === false) {
            return { v_state: false, v_msg: "invalid_input_app_logo_url" };
        }

        const social_validation = this.validateSocialLinks(social_links);
        if (!social_validation.status) {
            return { v_state: false, v_msg: "invalid_input_app_social_links_must_be_valid_links" };
        }

        const url_validation = this.validateUrls(urls);
        if (!url_validation.status) {
            return { v_state: false, v_msg: "invalid_input_app_urls_must_be_valid_links" };
        }

        const v_data: RegisteredAppValidatedFromDataInterface = {
            csrf_token,
            name,
            prefix,
            description,
            base_url,
            logo_url,
            social_links,
            urls: urls ? urls.split(",").map((url) => url.trim()) : []
        };

        return { v_state: true, v_msg: "valid_input", v_data };
    }
}

export default RegisteredAppValidator;