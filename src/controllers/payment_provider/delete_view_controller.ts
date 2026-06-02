import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import PaymentProviderDeleteViewActionHandler from "@/action_handlers/payment_provider/delete_view_action_handler";

class PaymentProviderDeleteViewController extends BaseDeleteViewController<
    PaymentProviderRecordInterface,
    DeleteViewPropsInterface<PaymentProviderRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: PaymentProviderDeleteViewActionHandler;

    constructor(props: DeleteViewPropsInterface<PaymentProviderRecordInterface>) {
        super(props, "payment_provider_delete_view");

        this.action_handler = new PaymentProviderDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default PaymentProviderDeleteViewController;
