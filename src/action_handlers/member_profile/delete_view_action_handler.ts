import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { MemberRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import { MemberDeletePayload } from "@/types/form_data_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class MemberProfileDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    MemberRecordInterface,
    DeleteViewPropsInterface<MemberRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            MemberRecordInterface,
            DeleteViewPropsInterface<MemberRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "member_profile_delete_view_action_handler");

        this.delete_record_method = this.deleteMember;

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    private deleteMember = async (record_id: string, reason_text?: string) => {
        const csrf_token = await this.fetchFormCSRFToken(CSRF_TOKEN_FOR.MEMBER_PROFILE);

        if (!csrf_token) {
            throw new Error("Failed to fetch member profile delete CSRF token");
        }

        const payload: MemberDeletePayload = {
            csrf_token,
            delete_reason: reason_text?.trim() || null
        };

        return await MemberProfileAPIService.deleteMember(record_id, payload);
    };
}

export default MemberProfileDeleteViewActionHandler;
