import { GlobalEventTypes } from "@/types/global_events_type";

import { PaymentProviderRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentProviderAPIService from "@/api_services/payment_provider_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class PaymentProviderDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    PaymentProviderRecordInterface,
    DeleteViewPropsInterface<PaymentProviderRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            PaymentProviderRecordInterface,
            DeleteViewPropsInterface<PaymentProviderRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_provider_delete_view_action_handler",
            PaymentProviderAPIService.deletePaymentProvider
        );

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    protected getRecordId(record: PaymentProviderRecordInterface): string | null {
        return record.code || this.props.record_id || null;
    }
}

export default PaymentProviderDeleteViewActionHandler;
