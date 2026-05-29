import { GlobalEventTypes } from "@/types/global_events_type";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface
} from "@/ui_types/delete_view_type";

import CurrencyAPIService from "@/api_services/currency_api_service";

import type BaseDeleteViewController from "@/controllers/base_classes/base_delete_view_controller";

import BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";
import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

class CurrencyDeleteViewActionHandler extends BaseDeleteViewActionHandler<
    CurrencyRecordInterface,
    DeleteViewPropsInterface<CurrencyRecordInterface>,
    DeleteViewStateDataInterface,
    DeleteViewComputedDataInterface,
    DeleteViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(
        controller: BaseDeleteViewController<
            CurrencyRecordInterface,
            DeleteViewPropsInterface<CurrencyRecordInterface>,
            DeleteViewStateDataInterface,
            DeleteViewComputedDataInterface,
            DeleteViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "currency_delete_view_action_handler", CurrencyAPIService.deleteCurrency);

        StatusAlertTriggerUtil.event_bus = controller.event_bus as any;
    }

    protected getRecordId(record: CurrencyRecordInterface): string | null {
        return record.code || this.props.record_id || null;
    }
}

export default CurrencyDeleteViewActionHandler;
