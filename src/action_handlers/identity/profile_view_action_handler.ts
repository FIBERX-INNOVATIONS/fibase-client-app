import { IdentityRecordInterface } from "@/types/api_service_type";

import { ProfileViewPropsInterface } from "@/ui_types/profile_view_type";

import {
    IdentityProfileViewComponentsInterface,
    IdentityProfileViewComputedDataInterface,
    IdentityProfileViewStateDataInterface
} from "@/ui_types/identity_profile_view_type";

import IdentityAPIService from "@/api_services/identity_api_service";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class IdentityProfileViewActionHandler extends BaseProfileViewActionHandler<
    IdentityRecordInterface,
    ProfileViewPropsInterface<IdentityRecordInterface>,
    IdentityProfileViewStateDataInterface,
    IdentityProfileViewComputedDataInterface,
    IdentityProfileViewComponentsInterface
> {
    constructor(
        controller: BaseProfileViewController<
            IdentityRecordInterface,
            ProfileViewPropsInterface<IdentityRecordInterface>,
            IdentityProfileViewStateDataInterface,
            IdentityProfileViewComputedDataInterface,
            IdentityProfileViewComponentsInterface
        >
    ) {
        super(controller, "identity_profile_view_action_handler", IdentityAPIService.getIdentity);
    }
}

export default IdentityProfileViewActionHandler;
