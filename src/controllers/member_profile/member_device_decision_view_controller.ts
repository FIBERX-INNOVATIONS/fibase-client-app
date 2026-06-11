import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";
import {
    MemberDeviceDecisionRecordInterface,
    MemberDeviceDecisionViewPropsInterface
} from "@/ui_types/member_profile_profile_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import MemberDeviceDecisionViewActionHandler from "@/action_handlers/member_profile/member_device_decision_view_action_handler";

class MemberDeviceDecisionViewController extends BaseDeleteViewController<
    MemberDeviceDecisionRecordInterface,
    MemberDeviceDecisionViewPropsInterface,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: MemberDeviceDecisionViewActionHandler;

    constructor(props: MemberDeviceDecisionViewPropsInterface) {
        super(props, "member_device_decision_view");

        this.action_handler = new MemberDeviceDecisionViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default MemberDeviceDecisionViewController;
