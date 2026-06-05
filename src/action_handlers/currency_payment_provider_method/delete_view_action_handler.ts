import { GlobalEventTypes } from "@/types/global_events_type";

import { CurrencyPaymentProviderMethodRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import CurrencyPaymentProviderMethodAPIService from "@/api_services/currency_payment_provider_method_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

class CurrencyPaymentProviderMethodDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    CurrencyPaymentProviderMethodRecordInterface,
    DeleteViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    // Method to initialize delete view action handler.
    constructor(
        controller: BaseDeleteViewController<
            CurrencyPaymentProviderMethodRecordInterface,
            DeleteViewPropsInterface<CurrencyPaymentProviderMethodRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(
            controller,
            "currency_payment_provider_method_delete_view_action_handler",
            CurrencyPaymentProviderMethodAPIService.deleteCurrencyPaymentProviderMethod
        );

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    // Method to get record id from currency payment provider method record.
    protected getRecordId(record: CurrencyPaymentProviderMethodRecordInterface): string | null {
        return record.id?.toString() || this.props.record_id || null;
    }
}

export default CurrencyPaymentProviderMethodDeleteViewActionHandler;
