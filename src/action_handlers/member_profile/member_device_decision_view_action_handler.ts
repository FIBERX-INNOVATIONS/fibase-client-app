import { APIResponseInterface } from "@ui/version_3/types/util_type";

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
import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class MemberDeviceDecisionViewActionHandler extends BaseDeleteViewActionHandler<
    MemberDeviceDecisionRecordInterface,
    MemberDeviceDecisionViewPropsInterface,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    constructor(
        controller: BaseDeleteViewController<
            MemberDeviceDecisionRecordInterface,
            MemberDeviceDecisionViewPropsInterface,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface
        >
    ) {
        super(controller, "member_device_decision_view_action_handler");

        this.delete_record_method = this.handleConfirmAction;
    }

    protected getRecordId(record: MemberDeviceDecisionRecordInterface): string | null {
        return this.props.record_id || record.device_id?.toString() || "member-device-action";
    }

    private handleConfirmAction = async (): Promise<
        APIResponseInterface<MemberDeviceDecisionRecordInterface>
    > => {
        const result = await this.props.on_confirm_action();

        return result as APIResponseInterface<MemberDeviceDecisionRecordInterface>;
    };
}

export default MemberDeviceDecisionViewActionHandler;
