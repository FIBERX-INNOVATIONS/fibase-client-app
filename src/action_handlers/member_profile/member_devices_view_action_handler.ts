import { markRaw } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { OpenModalEventPayloadInterface, GlobalEventTypes } from "@/types/global_events_type";

import {
    MemberDevicesViewComponentsInterface,
    MemberDevicesViewComputedDataInterface,
    MemberDevicesViewPropsInterface,
    MemberDevicesViewStateDataInterface,
    MemberDeviceSessionViewRecordInterface
} from "@/ui_types/member_profile_profile_view_type";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import type MemberDevicesViewController from "@/controllers/member_profile/member_devices_view_controller";
import MemberDeviceDecisionView from "@/views/member_profile/MemberDeviceDecisionView.vue";

class MemberDevicesViewActionHandler extends BaseActionHandler<
    MemberDevicesViewPropsInterface,
    MemberDevicesViewStateDataInterface,
    MemberDevicesViewComputedDataInterface,
    MemberDevicesViewComponentsInterface,
    GlobalEventTypes
> {
    private search_timer: ReturnType<typeof setTimeout> | null = null;

    protected override controller: MemberDevicesViewController;

    constructor(controller: MemberDevicesViewController) {
        super(controller, "member_devices_view_action_handler");

        this.controller = controller;
    }

    // Method to handle fetching devices
    public fetchDevices = async (
        page = this.controller.state_refs.current_page.value
    ): Promise<void> => {
        const member_public_id = this.controller.props.member_public_id;

        if (!member_public_id) {
            return;
        }

        this.setState("is_loading", true);

        try {
            const result = await MemberProfileAPIService.getMemberDeviceSessionList(
                member_public_id,
                {
                    page,
                    limit: this.controller.state_refs.limit.value,
                    filters: {
                        search: this.controller.state_refs.search_query.value
                    }
                }
            );

            console.log({
                device_id: result.full_response
            });

            if (!result || result.status === "logout") {
                await this.controller.router.push("/logout");
                return;
            }

            if (result.status === "error") {
                StatusAlertTriggerUtil.triggerAlert("error", result.msg ?? "error_occurred");
                return;
            }

            this.setState(
                "devices",
                (result.data?.records ?? []) as MemberDeviceSessionViewRecordInterface[]
            );
            this.setState("current_page", result.data?.current_page ?? page);
            this.setState("total_pages", result.data?.total_pages ?? 1);
            this.setState(
                "total_items",
                result.data?.total_items ?? this.controller.state_refs.devices.value.length
            );

            this.controller.updatePaginationProps();
        } catch (error: unknown) {
            this.logger.error("Failed to fetch member devices", { error });
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred");
        } finally {
            this.setState("is_loading", false);
        }
    };

    // Method to open current device logout confirmation prompt
    private openCurrentDeviceLogoutDecisionModal = (
        device: MemberDeviceSessionViewRecordInterface
    ): void => {
        const content_key =
            "content_resource.member_profile_view_ui.modals_ui.current_device_logout_modal_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,
            animation_type: "slide_top",
            body_component: markRaw(MemberDeviceDecisionView),
            body_props: {
                record: {
                    device_name: device.device_name,
                    device_id: device.device_id
                },
                record_id: device.id,
                content_key,
                on_confirm_action: async () => this.executeLogoutDevice(device),
                on_delete_success: async () => this.fetchDevices()
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    // Method to open logout all devices confirmation prompt
    private openLogoutAllDevicesDecisionModal = (): void => {
        const content_key =
            "content_resource.member_profile_view_ui.modals_ui.logout_all_devices_modal_ui";

        const modal_payload: OpenModalEventPayloadInterface = {
            content_key,
            animation_type: "slide_top",
            body_component: markRaw(MemberDeviceDecisionView),
            body_props: {
                record: {
                    device_count: this.controller.state_refs.total_items.value
                },
                record_id: "all-member-devices",
                content_key,
                on_confirm_action: async () => this.executeLogoutAllDevices(),
                on_delete_success: async () => this.fetchDevices(1)
            }
        };

        this.controller.event_bus?.emit?.("open_modal", modal_payload);
    };

    private handleActionResult = async (
        result: APIResponseInterface<unknown> | undefined,
        on_success: () => Promise<void>
    ): Promise<void> => {
        if (!result || result.status === "logout") {
            await this.controller.router.push("/logout");
            return;
        }

        StatusAlertTriggerUtil.triggerAlert(
            result.status === "success" ? "success" : "error",
            result.msg ?? "error_occurred",
            4,
            undefined,
            false
        );

        if (result.status === "success") {
            await on_success();
        }
    };

    private executeLogoutDevice = async (
        device: MemberDeviceSessionViewRecordInterface
    ): Promise<APIResponseInterface<unknown>> => {
        const member_public_id = this.controller.props.member_public_id;

        if (!member_public_id || !device.id) {
            return { status: "error", msg: "record_not_found" };
        }

        this.setState("processing_session_id", device.id);

        try {
            return await MemberProfileAPIService.logoutMemberDeviceSession(
                member_public_id,
                device.id
            );
        } catch (error: unknown) {
            this.logger.error("Failed to log member device out", { error });
            return { status: "error", msg: "error_occurred" };
        } finally {
            this.setState("processing_session_id", "");
        }
    };

    // Method to handle loging out a device
    public handleLogoutDeviceClicked = async (
        device: MemberDeviceSessionViewRecordInterface
    ): Promise<void> => {
        if (this.controller.isCurrentDevice(device)) {
            this.openCurrentDeviceLogoutDecisionModal(device);
            return;
        }

        const result = await this.executeLogoutDevice(device);

        await this.handleActionResult(result, async () => this.fetchDevices());
    };

    private executeLogoutAllDevices = async (): Promise<APIResponseInterface<unknown>> => {
        const member_public_id = this.controller.props.member_public_id;

        if (!member_public_id) {
            return { status: "error", msg: "record_not_found" };
        }

        this.setState("is_logging_all_out", true);

        try {
            return await MemberProfileAPIService.logoutAllMemberDeviceSessions(member_public_id);
        } catch (error: unknown) {
            this.logger.error("Failed to log all member devices out", { error });
            return { status: "error", msg: "error_occurred" };
        } finally {
            this.setState("is_logging_all_out", false);
        }
    };

    // Method to handle logout all devices
    public handleLogoutAllDevices = async (): Promise<void> => {
        this.openLogoutAllDevicesDecisionModal();
    };

    // Method to handle page change
    public handlePageChange = async (page: number): Promise<void> => {
        await this.fetchDevices(page);
    };

    // Method to handle search field enter
    public handleSearchEnter = async (): Promise<void> => {
        await this.fetchDevices(1);
    };

    // Method to handle search query changed
    public handleSearchQueryChanged = (): void => {
        if (this.search_timer) {
            clearTimeout(this.search_timer);
        }

        this.search_timer = setTimeout(() => {
            void this.fetchDevices(1);
        }, 450);
    };

    // Method to handle search load timer
    public cleanup(): void {
        if (!this.search_timer) {
            return;
        }

        clearTimeout(this.search_timer);
        this.search_timer = null;
    }
}

export default MemberDevicesViewActionHandler;
