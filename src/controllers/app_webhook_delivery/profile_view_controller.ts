import { AppWebhookDeliveryStatusEnum } from "@/configs/app_webhook_delivery_config";
import AppWebhookDeliveryProfileViewClassStyles from "@/class_styles/app_webhook_delivery_profile_view_class_styles";
import type { ComputedDefinitionType } from "@ui/version_3/types/base_type";
import type { AppWebhookDeliveryRecordInterface } from "@/types/app_webhook_delivery_type";
import type { ProfileViewContentKeysInterface, ProfileViewStateDataInterface } from "@/ui_types/profile_view_type";
import type {
    AppWebhookDeliveryProfileClassStylesInterface,
    AppWebhookDeliveryProfilePropsInterface,
    AppWebhookDeliveryProfileComputedInterface,
    AppWebhookDeliveryProfileSectionConfigInterface
} from "@/ui_types/app_webhook_delivery_view_type";
import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";
import AppWebhookDeliveryProfileViewActionHandler from "@/action_handlers/app_webhook_delivery/profile_view_action_handler";
import DisplayFormatterUtil from "@/utils/display_formatter_util";

class AppWebhookDeliveryProfileViewController extends BaseProfileViewController<
    AppWebhookDeliveryRecordInterface,
    AppWebhookDeliveryProfilePropsInterface,
    ProfileViewStateDataInterface<AppWebhookDeliveryRecordInterface>,
    AppWebhookDeliveryProfileComputedInterface
> {
    public readonly content_key = "app_webhook_delivery";
    public readonly class_styles: AppWebhookDeliveryProfileClassStylesInterface;

    // Method to initialise safe delivery details through the shared profile lifecycle.
    constructor(props: AppWebhookDeliveryProfilePropsInterface) {
        super(props, "app_webhook_delivery_profile_view", AppWebhookDeliveryProfileViewClassStyles);
        this.class_styles = { ...AppWebhookDeliveryProfileViewClassStyles, ...(props.class_styles ?? {}) };
        this.setProfileActionHandler(new AppWebhookDeliveryProfileViewActionHandler(this));
    }

    // Method to bind the profile summary and diagnostic labels to managed content.
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        const base_key = this.getBaseContentKey();
        return {
            delivery_label_text: `${base_key}.header_section.delivery_label_text`,
            endpoint_label_text: `${base_key}.header_section.endpoint_label_text`,
            last_error_label_text: `${base_key}.sections.delivery_information.last_error_label_text`,
            no_error_text: `${base_key}.no_error_text`
        };
    }

    // Method to format delivery detail values without exposing private webhook fields.
    private getFieldValue(key: keyof AppWebhookDeliveryRecordInterface): string {
        const record = this.state_refs.profile_record.value;
        const empty_value = this.content_manager.get<string>(`${this.getBaseContentKey()}.empty_value_text`, "-") ?? "-";
        const value = record[key];
        if (key === "app") {
            return record.app?.name ?? record.app?.public_id ?? empty_value;
        }
        if (key === "status" && record.status) {
            return (
                this.content_manager.get<string>(
                    `content_resource.app_webhook_delivery_view_ui.status_labels.${record.status}`,
                    record.status
                ) ?? record.status
            );
        }
        if (key.endsWith("_at")) {
            return DisplayFormatterUtil.formatDateTime(typeof value === "string" ? value : null, empty_value);
        }
        return value === null || value === undefined ? empty_value : String(value);
    }

    // Method to build status styling, delivery metrics, and detail panels from the current record.
    protected getUIComputedData(): ComputedDefinitionType<AppWebhookDeliveryProfileComputedInterface> {
        const sections: AppWebhookDeliveryProfileSectionConfigInterface[] = [
            {
                key: "event_information",
                fields: ["event_id", "app", "transaction_public_id"]
            },
            { key: "timestamps", fields: ["created_at", "updated_at", "last_attempt_at", "next_attempt_at", "delivered_at"] }
        ];
        return {
            event_title: () => {
                return this.getFieldValue("event_type");
            },
            delivery_id: () => {
                return this.getFieldValue("public_id");
            },
            endpoint_url: () => {
                return this.getFieldValue("endpoint_url");
            },
            status_text: () => {
                return this.getFieldValue("status");
            },
            status_class: () => {
                return (
                    this.class_styles.status_class_styles[this.state_refs.profile_record.value.status] ??
                    this.class_styles.status_class_styles[AppWebhookDeliveryStatusEnum.QUEUED]
                );
            },
            last_error: () => {
                return this.getFieldValue("last_error");
            },
            has_error: () => {
                return Boolean(this.state_refs.profile_record.value.last_error);
            },
            metrics: () => {
                const record = this.state_refs.profile_record.value;
                const base_key = this.getBaseContentKey();
                return [
                    {
                        key: "attempts",
                        label:
                            this.content_manager.get<string>(
                                `${base_key}.sections.delivery_information.attempts_label_text`,
                                "Attempts"
                            ) ?? "Attempts",
                        value: (
                            this.content_manager.get<string>(
                                `${base_key}.metrics.attempts_text`,
                                "{{attempts}} / {{max_attempts}}"
                            ) ?? ""
                        )
                            .replace("{{attempts}}", String(record.attempts ?? 0))
                            .replace("{{max_attempts}}", String(record.max_attempts ?? 0))
                    },
                    {
                        key: "response",
                        label:
                            this.content_manager.get<string>(
                                `${base_key}.sections.delivery_information.response_status_code_label_text`,
                                "HTTP response"
                            ) ?? "HTTP response",
                        value: this.getFieldValue("response_status_code")
                    },
                    {
                        key: "version",
                        label:
                            this.content_manager.get<string>(
                                `${base_key}.sections.event_information.event_version_label_text`,
                                "Event version"
                            ) ?? "Event version",
                        value: this.getFieldValue("event_version")
                    }
                ];
            },
            sections: () => {
                return sections.map((section) => {
                    const content_key = `${this.getBaseContentKey()}.sections.${section.key}`;
                    return {
                        key: section.key,
                        title: this.content_manager.get<string>(`${content_key}.title_text`, "") ?? "",
                        items: section.fields.map((key) => {
                            return {
                                key,
                                label: this.content_manager.get<string>(`${content_key}.${key}_label_text`, key) ?? key,
                                value: this.getFieldValue(key)
                            };
                        })
                    };
                });
            }
        };
    }
}

export default AppWebhookDeliveryProfileViewController;
