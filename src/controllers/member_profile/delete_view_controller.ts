import { DecisionPromptUIBooleanPropsInterface } from "@ui/version_3/ui_types/decision_prompt_ui_type";

import { MemberRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import MemberProfileDeleteViewActionHandler from "@/action_handlers/member_profile/delete_view_action_handler";

class MemberProfileDeleteViewController extends BaseDeleteViewController<
    MemberRecordInterface,
    DeleteViewPropsInterface<MemberRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: MemberProfileDeleteViewActionHandler;

    constructor(props: DeleteViewPropsInterface<MemberRecordInterface>) {
        super(props, "member_profile_delete_view");

        this.action_handler = new MemberProfileDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }

    protected getDecisionPromptBooleanProps(): DecisionPromptUIBooleanPropsInterface {
        return {
            show_reason_input: true,
            reason_required: true
        };
    }
}

export default MemberProfileDeleteViewController;
