import { CurrencyRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import CurrencyDeleteViewActionHandler from "@/action_handlers/currency/delete_view_action_handler";

class CurrencyDeleteViewController extends BaseDeleteViewController<
    CurrencyRecordInterface,
    DeleteViewPropsInterface<CurrencyRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: CurrencyDeleteViewActionHandler;

    constructor(props: DeleteViewPropsInterface<CurrencyRecordInterface>) {
        super(props, "currency_delete_view");

        this.action_handler = new CurrencyDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default CurrencyDeleteViewController;
