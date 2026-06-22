import { TransactionRecordInterface } from "@/types/api_service_type";

import { ProfileViewPropsInterface } from "@/ui_types/profile_view_type";

import {
    TransactionProfileViewComponentsInterface,
    TransactionProfileViewComputedDataInterface,
    TransactionProfileViewStateDataInterface
} from "@/ui_types/transaction_profile_view_type";

import TransactionAPIService from "@/api_services/transaction_api_service";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class TransactionProfileViewActionHandler extends BaseProfileViewActionHandler<
    TransactionRecordInterface,
    ProfileViewPropsInterface<TransactionRecordInterface>,
    TransactionProfileViewStateDataInterface,
    TransactionProfileViewComputedDataInterface,
    TransactionProfileViewComponentsInterface
> {
    // Method to initialise transaction profile actions with the detail request.
    constructor(
        controller: BaseProfileViewController<
            TransactionRecordInterface,
            ProfileViewPropsInterface<TransactionRecordInterface>,
            TransactionProfileViewStateDataInterface,
            TransactionProfileViewComputedDataInterface,
            TransactionProfileViewComponentsInterface
        >
    ) {
        super(controller, "transaction_profile_view_action_handler", TransactionAPIService.getTransaction);
    }
}

export default TransactionProfileViewActionHandler;
