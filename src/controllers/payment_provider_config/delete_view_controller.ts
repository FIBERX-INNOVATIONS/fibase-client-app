import { PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import PaymentProviderConfigDeleteViewActionHandler from "@/action_handlers/payment_provider_config/delete_view_action_handler";

class PaymentProviderConfigDeleteViewController extends BaseDeleteViewController<
    PaymentProviderConfigRecordInterface,
    DeleteViewPropsInterface<PaymentProviderConfigRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface
> {
    public action_handler: PaymentProviderConfigDeleteViewActionHandler;

    constructor(props: DeleteViewPropsInterface<PaymentProviderConfigRecordInterface>) {
        super(props, "payment_provider_config_delete_view");

        this.action_handler = new PaymentProviderConfigDeleteViewActionHandler(this);
        this.setDeleteActionHandler(this.action_handler);
    }
}

export default PaymentProviderConfigDeleteViewController;
