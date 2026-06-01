import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import PaymentMethodAPIService from "@/api_services/payment_method_api_service";

class PaymentMethodProfileViewActionHandler extends BaseProfileViewActionHandler<PaymentMethodRecordInterface> {
    constructor(controller: BaseProfileViewController<PaymentMethodRecordInterface>) {
        super(
            controller,
            "payment_method_profile_view_action_handler",
            PaymentMethodAPIService.getPaymentMethod
        );
    }
}

export default PaymentMethodProfileViewActionHandler;
