import { GlobalEventTypes } from "@/types/global_events_type";

import { PaymentMethodRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import PaymentMethodAPIService from "@/api_services/payment_method_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class PaymentMethodDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    PaymentMethodRecordInterface,
    DeleteViewPropsInterface<PaymentMethodRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            PaymentMethodRecordInterface,
            DeleteViewPropsInterface<PaymentMethodRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "payment_method_delete_view_action_handler",
            PaymentMethodAPIService.deletePaymentMethod
        );

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    protected getRecordId(record: PaymentMethodRecordInterface): string | null {
        return record.code || this.props.record_id || null;
    }
}

export default PaymentMethodDeleteViewActionHandler;
