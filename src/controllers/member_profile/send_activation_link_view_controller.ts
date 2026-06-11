import { DecisionPromptUIBooleanPropsInterface } from "@ui/version_3/ui_types/decision_prompt_ui_type";

import { MemberRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import MemberProfileSendActivationLinkViewActionHandler from "@/action_handlers/member_profile/send_activation_link_view_action_handler";

class MemberProfileSendActivationLinkViewController extends BaseDeleteViewController<
    MemberRecordInterface,
    DeleteViewPropsInterface<MemberRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: MemberProfileSendActivationLinkViewActionHandler;

    constructor(props: DeleteViewPropsInterface<MemberRecordInterface>) {
        super(props, "member_profile_send_activation_link_view");

        this.action_handler = new MemberProfileSendActivationLinkViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }

    protected getDecisionPromptBooleanProps(): DecisionPromptUIBooleanPropsInterface {
        return {
            show_reason_input: true,
            reason_required: true
        };
    }
}

export default MemberProfileSendActivationLinkViewController;
