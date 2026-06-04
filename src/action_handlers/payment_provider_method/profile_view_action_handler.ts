import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import PaymentProviderMethodAPIService from "@/api_services/payment_provider_method_api_service";

class PaymentProviderMethodProfileViewActionHandler extends BaseProfileViewActionHandler<PaymentProviderMethodRecordInterface> {
    // Method to initialize profile view action handler.
    constructor(controller: BaseProfileViewController<PaymentProviderMethodRecordInterface>) {
        super(
            controller,
            "payment_provider_method_profile_view_action_handler",
            PaymentProviderMethodAPIService.getPaymentProviderMethod
        );
    }
}

export default PaymentProviderMethodProfileViewActionHandler;
