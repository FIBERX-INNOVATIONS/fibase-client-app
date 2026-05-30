import {
    AppCurrencyDecisionPromptRecordInterface,
    AppCurrencyDecisionViewPropsInterface,
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import AppCurrencyDecisionViewActionHandler from "@/action_handlers/currency/app_currency_decision_view_action_handler";

class AppCurrencyDecisionViewController extends BaseDeleteViewController<
    AppCurrencyDecisionPromptRecordInterface,
    AppCurrencyDecisionViewPropsInterface,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: AppCurrencyDecisionViewActionHandler;

    constructor(props: AppCurrencyDecisionViewPropsInterface) {
        super(props, "app_currency_decision_view");

        this.action_handler = new AppCurrencyDecisionViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default AppCurrencyDecisionViewController;
