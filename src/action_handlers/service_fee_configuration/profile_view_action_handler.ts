import type { ServiceFeeConfigurationRecordInterface } from "@/types/service_fee_configuration_type";

import type {
    ProfileViewComponentsInterface,
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ServiceFeeConfigurationProfileViewComputedInterface
} from "@/ui_types/profile_view_type";

import ServiceFeeConfigurationAPIService from "@/api_services/service_fee_configuration_api_service";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class ServiceFeeConfigurationProfileViewActionHandler extends BaseProfileViewActionHandler<
    ServiceFeeConfigurationRecordInterface,
    ProfileViewPropsInterface<ServiceFeeConfigurationRecordInterface>,
    ProfileViewStateDataInterface<ServiceFeeConfigurationRecordInterface>,
    ServiceFeeConfigurationProfileViewComputedInterface,
    ProfileViewComponentsInterface
> {
    // Method to initialize the service fee configuration profile action handler.
    constructor(
        controller: BaseProfileViewController<
            ServiceFeeConfigurationRecordInterface,
            ProfileViewPropsInterface<ServiceFeeConfigurationRecordInterface>,
            ProfileViewStateDataInterface<ServiceFeeConfigurationRecordInterface>,
            ServiceFeeConfigurationProfileViewComputedInterface,
            ProfileViewComponentsInterface
        >
    ) {
        super(
            controller,
            "service_fee_configuration_profile_view_action_handler",
            ServiceFeeConfigurationAPIService.getServiceFeeConfiguration
        );
    }
}

export default ServiceFeeConfigurationProfileViewActionHandler;
