import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { IdentityWalletRecordInterface } from "@/types/api_service_type";

class IdentityWalletAPIService extends BaseAPIService {
    // Method to query a full identity wallet record by numeric or public identifier.
    public static getIdentityWallet = async (
        wallet_id: string | number
    ): Promise<APIResponseInterface<IdentityWalletRecordInterface>> => {
        return await this.queryAPI<IdentityWalletRecordInterface>({
            url: `/wallet/${wallet_id}`,
            method: "GET"
        });
    };
}

export default IdentityWalletAPIService;
