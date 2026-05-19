import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

import { GlobalEventTypes, OpenModalEventPayloadInterface } from "@/types/global_events_type";

import {
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface
} from "@/ui_types/profile_view_type";

class RegisteredAppProfileViewActionHandler extends BaseProfileViewActionHandler<
    RegisteredAppRecordInterface,
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    GlobalEventTypes
> {
    constructor(controller: BaseProfileViewController<RegisteredAppRecordInterface>) {
        super(controller, "registered_app_profile_view_action_handler", RegisteredAppAPIService.getRegisteredApp);
    }
}

export default RegisteredAppProfileViewActionHandler;
