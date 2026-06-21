import { GlobalEventTypes } from "@/types/global_events_type";

import { PaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentProviderMethodAPIService from "@/api_services/payment_provider_method_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class PaymentProviderMethodDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    PaymentProviderMethodRecordInterface,
    DeleteViewPropsInterface<PaymentProviderMethodRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    // Method to initialize delete view action handler.
    constructor(
        controller: BaseDeleteViewController<
            PaymentProviderMethodRecordInterface,
            DeleteViewPropsInterface<PaymentProviderMethodRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_provider_method_delete_view_action_handler",
            PaymentProviderMethodAPIService.deletePaymentProviderMethod
        );

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    // Method to get record id from payment provider method record.
}

export default PaymentProviderMethodDeleteViewActionHandler;
