import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import PaymentProviderAPIService from "@/api_services/payment_provider_api_service";

class PaymentProviderProfileViewActionHandler extends BaseProfileViewActionHandler<PaymentProviderRecordInterface> {
    constructor(controller: BaseProfileViewController<PaymentProviderRecordInterface>) {
        super(
            controller,
            "payment_provider_profile_view_action_handler",
            PaymentProviderAPIService.getPaymentProvider
        );
    }
}

export default PaymentProviderProfileViewActionHandler;
