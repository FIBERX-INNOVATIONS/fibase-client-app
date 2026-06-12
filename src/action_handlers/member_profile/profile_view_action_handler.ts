import { MemberRecordInterface } from "@/types/api_service_type";

import {
    MemberProfileViewComponentsInterface,
    MemberProfileViewComputedDataInterface,
    MemberProfileViewStateDataInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class MemberProfileViewActionHandler extends BaseProfileViewActionHandler<
    MemberRecordInterface,
    ProfileViewPropsInterface,
    MemberProfileViewStateDataInterface,
    MemberProfileViewComputedDataInterface,
    MemberProfileViewComponentsInterface
> {
    constructor(
        controller: BaseProfileViewController<
            MemberRecordInterface,
            ProfileViewPropsInterface,
            MemberProfileViewStateDataInterface,
            MemberProfileViewComputedDataInterface,
            MemberProfileViewComponentsInterface
        >
    ) {
        super(controller, "member_profile_profile_view_action_handler", MemberProfileAPIService.getMember);
    }

    // Method to handle profile view cleanup before unmounting.
    public handleBeforeUnmounted = (): void => {
        this.controller.event_bus?.emit?.("clear_route_query_handler_params", {});
    };
}

export default MemberProfileViewActionHandler;
