import { MemberRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import MemberProfileRestoreMemberViewActionHandler from "@/action_handlers/member_profile/restore_member_view_action_handler";

class MemberProfileRestoreMemberViewController extends BaseDeleteViewController<
    MemberRecordInterface,
    DeleteViewPropsInterface<MemberRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: MemberProfileRestoreMemberViewActionHandler;

    constructor(props: DeleteViewPropsInterface<MemberRecordInterface>) {
        super(props, "member_profile_restore_member_view");

        this.action_handler = new MemberProfileRestoreMemberViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default MemberProfileRestoreMemberViewController;
