import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { MemberRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class MemberProfileRestoreMemberViewActionHandler extends BaseDeleteViewActionHandler<
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
        super(controller, "member_profile_restore_member_view_action_handler");

        this.delete_record_method = this.restoreMember;

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    protected getRecordId(record: MemberRecordInterface): string | null {
        return record.public_id || this.props.record_id || null;
    }

    private restoreMember = async (
        record_id: string
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        const current_member = MemberAuthenticatorUtil.getLoggedInMember();
        const is_super_admin = MemberAuthenticatorUtil.memberHasSuperAdminRole(current_member);

        if (!is_super_admin) {
            return { status: "error", msg: "permission_denied" };
        }

        const csrf_token = await this.fetchFormCSRFToken(CSRF_TOKEN_FOR.MEMBER_PROFILE);

        if (!csrf_token) {
            return { status: "error", msg: "invalid_csrf_token" };
        }

        return await MemberProfileAPIService.restoreMember(record_id, { csrf_token });
    };
}

export default MemberProfileRestoreMemberViewActionHandler;
