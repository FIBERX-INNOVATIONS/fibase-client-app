import { MemberRecordInterface } from "@/types/api_service_type";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class MemberProfileProfileViewActionHandler extends BaseProfileViewActionHandler<MemberRecordInterface> {
    constructor(controller: BaseProfileViewController<MemberRecordInterface>) {
        super(
            controller,
            "member_profile_profile_view_action_handler",
            MemberProfileAPIService.getMember
        );
    }
}

export default MemberProfileProfileViewActionHandler;
