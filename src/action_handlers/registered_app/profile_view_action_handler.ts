import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";

import { RegisteredAppRecordInterface } from "@/types/api_service_type";

class RegisteredAppProfileViewActionHandler extends BaseProfileViewActionHandler<RegisteredAppRecordInterface> {
    constructor(controller: BaseProfileViewController<RegisteredAppRecordInterface>) {
        super(
            controller,
            "registered_app_profile_view_action_handler",
            RegisteredAppAPIService.getRegisteredApp
        );
    }
}

export default RegisteredAppProfileViewActionHandler;
