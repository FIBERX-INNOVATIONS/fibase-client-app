import { markRaw } from "vue";

import { ComputedDefinitionType, WatchersType } from "@ui/version_3/types/base_type";

import { ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";

import {
    MemberDevicesViewComponentsInterface,
    MemberDevicesViewComputedDataInterface,
    MemberDevicesViewContentTextInterface,
    MemberDevicesViewControllerInterface,
    MemberDevicesViewPropsInterface,
    MemberDevicesViewStateDataInterface,
    MemberDeviceSessionViewRecordInterface,
    MemberProfileProfileViewClassStylesInterface
} from "@/ui_types/member_profile_profile_view_type";

import PaginationUI from "@ui/version_3/components/PaginationUI.vue";

import ContentCardUI from "@ui/version_3/components/ContentCardUI.vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import DisplayFormatterUtil from "@/utils/display_formatter_util";

import PaginationUIPropsBuilder from "@ui/version_3/props_builder/pagination_ui_props_builder";

import ContentCardUIPropsBuilder from "@ui/version_3/props_builder/content_card_ui_props_builder";

import MemberProfileProfileViewClassStyles from "@/class_styles/member_profile_profile_view_class_styles";

import MemberDevicesViewActionHandler from "@/action_handlers/member_profile/member_devices_view_action_handler";
import { EventBus } from "@/utils/global_event_bus_util";
import { GlobalEventTypes } from "@/types/global_events_type";

class MemberDevicesViewController
    extends BaseController<
        MemberDevicesViewPropsInterface,
        MemberDevicesViewStateDataInterface,
        MemberDevicesViewComputedDataInterface,
        MemberDevicesViewComponentsInterface,
        GlobalEventTypes
    >
    implements MemberDevicesViewControllerInterface
{
    public action_handler: MemberDevicesViewActionHandler;

    private readonly content_manager = ContentManagerUtil.getInstance();

    private readonly base_content_key = "content_resource.member_profile_view_ui.profile_view_ui.devices_view";

    constructor(props: MemberDevicesViewPropsInterface) {
        super("member_devices_view", props, EventBus);

        this.action_handler = new MemberDevicesViewActionHandler(this);
        this.setActionHandler(this.action_handler);
    }

    private getContent(key: string, fallback: string): string {
        return this.content_manager.get<string>(key, fallback) ?? fallback;
    }

    private getContentObject(): MemberDevicesViewContentTextInterface {
        return {
            loading_text: this.getContent(`${this.base_content_key}.loading_text`, "Loading devices..."),
            empty_state_text: this.getContent(`${this.base_content_key}.empty_state_text`, "No devices found"),
            search_placeholder_text: this.getContent(`${this.base_content_key}.search_placeholder_text`, "Search devices"),
            logout_all_button_text: this.getContent(`${this.base_content_key}.logout_all_button_text`, "Log All Devices Out"),
            log_device_out_button_text: this.getContent(
                `${this.base_content_key}.log_device_out_button_text`,
                "Log Device Out"
            ),
            logged_out_button_text: this.getContent(`${this.base_content_key}.logged_out_button_text`, "Logged Out"),
            current_device_badge_text: this.getContent(`${this.base_content_key}.current_device_badge_text`, "Current Device"),
            pagination_result_text: this.getContent(
                `${this.base_content_key}.pagination_result_text`,
                "Page {{current_page}} of {{total_pages}} ({{total_items}} devices)"
            ),
            empty_value_text: this.getContent("content_resource.member_profile_view_ui.profile_view_ui.empty_value_text", "-"),
            labels: {
                device_id: this.getContent(`${this.base_content_key}.labels.device_id`, "Device ID"),
                ip_address: this.getContent(`${this.base_content_key}.labels.ip_address`, "IP Address"),
                origin_url: this.getContent(`${this.base_content_key}.labels.origin_url`, "Origin URL"),
                location_info: this.getContent(`${this.base_content_key}.labels.location_info`, "Location"),
                is_2fa_validated: this.getContent(`${this.base_content_key}.labels.is_2fa_validated`, "2FA Validated"),
                created_at: this.getContent(`${this.base_content_key}.labels.created_at`, "Created"),
                logout_at: this.getContent(`${this.base_content_key}.labels.logout_at`, "Logged Out"),
                status: this.getContent(`${this.base_content_key}.labels.status`, "Status")
            },
            bool_text: {
                yes: this.getContent(`${this.base_content_key}.bool_text.yes`, "Yes"),
                no: this.getContent(`${this.base_content_key}.bool_text.no`, "No")
            }
        };
    }

    protected getUIComponents(): MemberDevicesViewComponentsInterface {
        return {
            ContentCardUI: markRaw(ContentCardUI),
            PaginationUI: markRaw(PaginationUI)
        };
    }

    protected getUIStateData(): MemberDevicesViewStateDataInterface {
        const class_styles = {
            ...MemberProfileProfileViewClassStyles,
            ...(this.props.class_styles ?? {})
        } as MemberProfileProfileViewClassStylesInterface;

        const pagination_props = PaginationUIPropsBuilder.getReactivePropsObject(
            "MemberDevicesPagination",
            `${this.base_content_key}.pagination_btn_content`,
            1,
            1,
            {
                content_props: {
                    prev_btn_icon: "arrow_left_short_circle_svg_icon",
                    next_btn_icon: "arrow_right_short_cirlce_svg_icon"
                },
                config_props: {
                    show_numbers: true,
                    max_visible_pages: 2
                },
                action_props: {
                    on_page_change: this.action_handler.handlePageChange
                },
                class_styles: class_styles.devices_pagination_ui_class_styles
            }
        );

        return {
            class_styles,
            content_obj: this.getContentObject(),
            devices: [],
            current_page: 1,
            total_pages: 1,
            total_items: 0,
            limit: 6,
            search_query: "",
            is_loading: false,
            processing_session_id: "",
            is_logging_all_out: false,
            current_device_id: MemberAuthenticatorUtil.getCurrentDeviceID(),
            pagination_props
        };
    }

    protected getUIComputedData(): ComputedDefinitionType<MemberDevicesViewComputedDataInterface> {
        return {
            is_action_processing: () =>
                !!this.state_refs.processing_session_id.value || this.state_refs.is_logging_all_out.value,

            can_logout_device: () =>
                MemberAuthenticatorUtil.memberHasPermissionTo("member_device_module.logout_member_device_login_session"),

            can_logout_all_devices: () =>
                MemberAuthenticatorUtil.memberHasPermissionTo("member_device_module.logout_all_member_device_login_sessions"),

            pagination_result_text: () =>
                this.state_refs.content_obj.value.pagination_result_text
                    .replace("{{current_page}}", this.state_refs.current_page.value.toString())
                    .replace("{{total_pages}}", this.state_refs.total_pages.value.toString())
                    .replace("{{total_items}}", this.state_refs.total_items.value.toString())
        };
    }

    protected getUIWatchers(): WatchersType<MemberDevicesViewPropsInterface, MemberDevicesViewStateDataInterface> {
        return {
            member_public_id: {
                handler: () => {
                    void this.action_handler.fetchDevices(1);
                },
                options: { immediate: false }
            },
            search_query: this.action_handler.handleSearchQueryChanged
        };
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler.fetchDevices();
    }

    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.action_handler.cleanup();
    }

    public updatePaginationProps(): void {
        const pagination_props = this.state_refs.pagination_props.value;

        pagination_props.data_props.current_page = this.state_refs.current_page.value;
        pagination_props.data_props.total_pages = this.state_refs.total_pages.value;

        this.state_refs.pagination_props.value = pagination_props;
    }

    public isCurrentDevice(device: MemberDeviceSessionViewRecordInterface): boolean {
        return Boolean(
            this.state_refs.current_device_id.value &&
            device.device_id &&
            this.state_refs.current_device_id.value === device.device_id
        );
    }

    private formatLocationInfo(location_info?: string | Record<string, unknown> | null): string {
        if (!location_info) {
            return this.state_refs.content_obj.value.empty_value_text;
        }

        if (typeof location_info === "string") {
            return location_info;
        }

        return Object.entries(location_info)
            .filter(([, value]) => value !== undefined && value !== null && value !== "")
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
    }

    private buildDescriptionItem(label: string, value?: unknown): string {
        const display_value = value || this.state_refs.content_obj.value.empty_value_text;

        return [
            `<span class="inline-flex items-start gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-700">`,
            `<strong class="font-black text-gray-900">${DisplayFormatterUtil.escapeHtml(label)}:</strong>`,
            `<span>${DisplayFormatterUtil.escapeHtml(display_value)}</span>`,
            `</span>`
        ].join("");
    }

    private buildCurrentDeviceBadge(): string {
        return [
            `<span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-black text-green-700 ring-1 ring-green-200">`,
            `${DisplayFormatterUtil.escapeHtml(this.state_refs.content_obj.value.current_device_badge_text)}`,
            `</span>`
        ].join("");
    }

    private getDeviceDescription(device: MemberDeviceSessionViewRecordInterface): string {
        const content_obj = this.state_refs.content_obj.value;
        const device_2fa_validated = device.is_2fa_validated ?? device.is_2fa_enabled;

        return [
            this.isCurrentDevice(device) ? this.buildCurrentDeviceBadge() : "",
            this.buildDescriptionItem(content_obj.labels.device_id, device.device_id),
            this.buildDescriptionItem(content_obj.labels.ip_address, device.ip_address),
            this.buildDescriptionItem(content_obj.labels.origin_url, device.origin_url),
            this.buildDescriptionItem(content_obj.labels.location_info, this.formatLocationInfo(device.location_info)),
            this.buildDescriptionItem(
                content_obj.labels.is_2fa_validated,
                DisplayFormatterUtil.formatBoolean(device_2fa_validated, content_obj.bool_text.yes, content_obj.bool_text.no)
            ),
            this.buildDescriptionItem(
                content_obj.labels.created_at,
                DisplayFormatterUtil.formatDateTime(device.created_at, content_obj.empty_value_text)
            ),
            this.buildDescriptionItem(
                content_obj.labels.logout_at,
                DisplayFormatterUtil.formatDateTime(device.logout_at, content_obj.empty_value_text)
            ),
            this.buildDescriptionItem(
                content_obj.labels.status,
                DisplayFormatterUtil.formatBoolean(device.is_active, content_obj.bool_text.yes, content_obj.bool_text.no)
            )
        ].join(" ");
    }

    public getDeviceCardProps(device: MemberDeviceSessionViewRecordInterface): ContentCardUIPropsInterface {
        const content_obj = this.state_refs.content_obj.value;
        const is_logged_out = !!device.logout_at || device.status === "logged_out";
        const has_logout_permission = this.computed_refs.can_logout_device.value;

        return ContentCardUIPropsBuilder.getReactivePropsObject(`MemberDevice${device.id || device.device_id}`, {
            content_props: {
                title_text: device.device_name || content_obj.empty_value_text,
                title_icon: "identification_card_svg_icon",
                description_text: this.getDeviceDescription(device),
                button_text: has_logout_permission
                    ? is_logged_out
                        ? content_obj.logged_out_button_text
                        : content_obj.log_device_out_button_text
                    : "",
                button_icon: has_logout_permission ? "delete_trash_svg_icon" : undefined
            },
            boolean_props: {
                disabled: is_logged_out || this.state_refs.processing_session_id.value === device.id
            },
            action_props: {
                on_click: async () => this.action_handler.handleLogoutDeviceClicked(device)
            },
            class_styles: this.state_refs.class_styles.value.device_content_card_class_styles
        });
    }
}

export default MemberDevicesViewController;
