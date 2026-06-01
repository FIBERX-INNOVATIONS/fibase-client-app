import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import PaymentMethodDeleteViewActionHandler from "@/action_handlers/payment_method/delete_view_action_handler";

class PaymentMethodDeleteViewController extends BaseDeleteViewController<
    PaymentMethodRecordInterface,
    DeleteViewPropsInterface<PaymentMethodRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: PaymentMethodDeleteViewActionHandler;

    constructor(props: DeleteViewPropsInterface<PaymentMethodRecordInterface>) {
        super(props, "payment_method_delete_view");

        this.action_handler = new PaymentMethodDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default PaymentMethodDeleteViewController;
