import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

class BaseValidator {
    private static readonly content_manager = ContentManagerUtil.getInstance();

    protected static getContentMessage(message_key: string): string {
        return BaseValidator.content_manager.getAPIResponseValue(message_key);
    }

    protected static normalizeStringInput(value?: string | string[] | null): string {
        return Array.isArray(value) ? value.join("") : (value ?? "");
    }
}

export default BaseValidator;
