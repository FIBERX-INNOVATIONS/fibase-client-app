import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import PaymentProviderMethodDeleteViewActionHandler from "@/action_handlers/payment_provider_method/delete_view_action_handler";

class PaymentProviderMethodDeleteViewController extends BaseDeleteViewController<
    PaymentProviderMethodRecordInterface,
    DeleteViewPropsInterface<PaymentProviderMethodRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: PaymentProviderMethodDeleteViewActionHandler;

    // Method to initialize delete view controller.
    constructor(props: DeleteViewPropsInterface<PaymentProviderMethodRecordInterface>) {
        super(props, "payment_provider_method_delete_view");

        this.action_handler = new PaymentProviderMethodDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default PaymentProviderMethodDeleteViewController;
