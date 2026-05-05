

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import CurrencyAPIService from "@/api_services/currency_api_service";

import { CurrencyRecordInterface } from "@/types/api_service_type";

import { 
    GlobalEventTypes, 
    OpenModalEventPayloadInterface 
} from "@/types/global_events_type";

import {
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface
} from "@/ui_types/profile_view_type";



class CurrencyProfileViewActionHandler extends BaseProfileViewActionHandler<
    CurrencyRecordInterface,
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    GlobalEventTypes
>{
    constructor(controller: BaseProfileViewController<CurrencyRecordInterface>) {
        super(
            controller,
            "currency_profile_view_action_handler",
            CurrencyAPIService.getCurrency
        );
    }
}

export default CurrencyProfileViewActionHandler;