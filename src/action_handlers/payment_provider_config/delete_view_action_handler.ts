import { GlobalEventTypes } from "@/types/global_events_type";

import { PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentProviderConfigAPIService from "@/api_services/payment_provider_config_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class PaymentProviderConfigDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    PaymentProviderConfigRecordInterface,
    DeleteViewPropsInterface<PaymentProviderConfigRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            PaymentProviderConfigRecordInterface,
            DeleteViewPropsInterface<PaymentProviderConfigRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_provider_config_delete_view_action_handler",
            PaymentProviderConfigAPIService.deletePaymentProviderConfig
        );

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }
}

export default PaymentProviderConfigDeleteViewActionHandler;
