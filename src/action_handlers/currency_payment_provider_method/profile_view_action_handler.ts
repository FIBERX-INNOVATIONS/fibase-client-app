import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import CurrencyPaymentProviderMethodAPIService from "@/api_services/currency_payment_provider_method_api_service";

class CurrencyPaymentProviderMethodProfileViewActionHandler extends BaseProfileViewActionHandler<CurrencyPaymentProviderMethodRecordInterface> {
    // Method to initialize profile view action handler.
    constructor(
        controller: BaseProfileViewController<CurrencyPaymentProviderMethodRecordInterface>
    ) {
        super(
            controller,
            "currency_payment_provider_method_profile_view_action_handler",
            CurrencyPaymentProviderMethodAPIService.getCurrencyPaymentProviderMethod
        );
    }
}

export default CurrencyPaymentProviderMethodProfileViewActionHandler;
