import { IdentityWalletRecordInterface } from "@/types/api_service_type";

import {
    IdentityWalletProfileViewComponentsInterface,
    IdentityWalletProfileViewComputedDataInterface,
    IdentityWalletProfileViewPropsInterface
} from "@/ui_types/identity_wallet_profile_view_type";

import { ProfileViewStateDataInterface } from "@/ui_types/profile_view_type";

import IdentityWalletAPIService from "@/api_services/identity_wallet_api_service";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class IdentityWalletProfileViewActionHandler extends BaseProfileViewActionHandler<
    IdentityWalletRecordInterface,
    IdentityWalletProfileViewPropsInterface,
    ProfileViewStateDataInterface<IdentityWalletRecordInterface>,
    IdentityWalletProfileViewComputedDataInterface,
    IdentityWalletProfileViewComponentsInterface
> {
    // Method to initialise wallet profile actions with the wallet detail request.
    constructor(
        controller: BaseProfileViewController<
            IdentityWalletRecordInterface,
            IdentityWalletProfileViewPropsInterface,
            ProfileViewStateDataInterface<IdentityWalletRecordInterface>,
            IdentityWalletProfileViewComputedDataInterface,
            IdentityWalletProfileViewComponentsInterface
        >
    ) {
        super(controller, "identity_wallet_profile_view_action_handler", IdentityWalletAPIService.getIdentityWallet);
    }
}

export default IdentityWalletProfileViewActionHandler;
