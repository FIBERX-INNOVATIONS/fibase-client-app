import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import CurrencyPaymentProviderMethodDeleteViewActionHandler from "@/action_handlers/currency_payment_provider_method/delete_view_action_handler";

class CurrencyPaymentProviderMethodDeleteViewController extends BaseDeleteViewController<
    CurrencyPaymentProviderMethodRecordInterface,
    DeleteViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: CurrencyPaymentProviderMethodDeleteViewActionHandler;

    // Method to initialize delete view controller.
    constructor(props: DeleteViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>) {
        super(props, "currency_payment_provider_method_delete_view");

        this.action_handler = new CurrencyPaymentProviderMethodDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default CurrencyPaymentProviderMethodDeleteViewController;
