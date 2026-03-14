
import { 
    CHAR_CORPUS, 
    DATA_SHIFT_KEY, 
    InternalStorageSchemaType, 
    STORAGE_SCHEMA 
} from "@/configs/constants";

import { MemberRecordInterface } from "@/types/api_service_type";

import EncryptorDecryptorUtil from "@ui/version_3/utils/encryptor_decryptor_util";
import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";
import InputValidatorUtil from "@ui/version_3/utils/input_validator_util";
import LocalStorageManagerUtil from "@ui/version_3/utils/local_storage_manager_util";


EncryptorDecryptorUtil.init({ corpus: CHAR_CORPUS, shift_key: DATA_SHIFT_KEY });

LocalStorageManagerUtil.init(STORAGE_SCHEMA);

class MemberAuthenticatorUtil {

    private static readonly storage: LocalStorageManagerUtil<InternalStorageSchemaType> = LocalStorageManagerUtil.getInstance();

    // Get logged in member
    public static getLoggedInMember = (): MemberRecordInterface | null => {
        return MemberAuthenticatorUtil.storage.get("current_member")
    }

    // Get logged in member access token
    public static getLoggedInMemberAccessToekn = (): string | null => {
        return MemberAuthenticatorUtil.storage.get("current_member_access_token") ?? "";
    }

    // Get logged in member access token
    public static getLoggedInMemberChallengeToekn = (): string | null => {
        return MemberAuthenticatorUtil.storage.get("current_member_challenge_token") ?? "";
    }

    // Get logged in member permissions
    public static getLoggedInMemberPermissions = (): string[] => {
        return MemberAuthenticatorUtil.storage.get("current_member_permissions") ?? [];
    }

    // Get logged member access expiry date
    public static getLoggedInMemberAccessExpiryDate = (): Date | null => {
        return MemberAuthenticatorUtil.storage.get("current_member_access_expiry_date");
    }

    // Check is member logged in
    public static isLoggedIn = (): boolean => {
        return !!MemberAuthenticatorUtil.getLoggedInMember()?.public_id
    }

    // Check is member fully logged in
    public static isFullyLoggedIn = (): boolean => {
        const member = MemberAuthenticatorUtil.getLoggedInMember();

        if(!member) { return false }

        return member.is_fully_authenticated;
    }

    // check is member has permisison X
    public static memberHasPermissionTo = (permission: string): boolean => {
        const member_permissions = MemberAuthenticatorUtil.getLoggedInMemberPermissions();

        return member_permissions.includes(permission);
    }

    // Check if member access has expired
    public static isMemberAccessExpired = (): boolean => {
        const access_expire_date = MemberAuthenticatorUtil.getLoggedInMemberAccessExpiryDate();

        if(!access_expire_date) { return false }

        return InputValidatorUtil.isValidFutureDate(access_expire_date?.toISOString());
    }

    // Method to set logged in data
    public static onLoginSuccess = (
        current_member: MemberRecordInterface,
        access_token: string,
        expires_in_mins: number,
        login_challenge_token: string
    ): boolean => {
        const expiry_date = InputTransformerUtil.getFutureDateFromMinutes(expires_in_mins);
        current_member.is_fully_authenticated = false;

        MemberAuthenticatorUtil.storage.set("current_member", current_member);
        MemberAuthenticatorUtil.storage.set("current_member_access_token", access_token);
        MemberAuthenticatorUtil.storage.set("current_member_challenge_token", login_challenge_token);
        MemberAuthenticatorUtil.storage.set("current_member_access_expiry_date", expiry_date);

        return true
    }

    // Method to set two factor logged in data
    public static onTwoFactorLoginSuccess = (
        current_member: MemberRecordInterface,
        permissions: string[],
        access_token: string,
        expires_in_mins: number
    ): boolean => {
        const expiry_date = InputTransformerUtil.getFutureDateFromMinutes(expires_in_mins);
        current_member.is_fully_authenticated = true;

        MemberAuthenticatorUtil.storage.set("current_member", current_member);
        MemberAuthenticatorUtil.storage.set("current_member_permissions", permissions);
        MemberAuthenticatorUtil.storage.set("current_member_access_token", access_token);
        MemberAuthenticatorUtil.storage.set("current_member_access_expiry_date", expiry_date);
        MemberAuthenticatorUtil.storage.remove("current_member_challenge_token");


        return true
    }

    // Method to set refresh data
    public static onAccessRefreshSuccess = (
        access_token: string,
        expires_in_mins: number
    ): boolean => {
        const expiry_date = InputTransformerUtil.getFutureDateFromMinutes(expires_in_mins);
        console.log({ expiry_date, expires_in_mins })

        MemberAuthenticatorUtil.storage.set("current_member_access_token", access_token);
        MemberAuthenticatorUtil.storage.set("current_member_access_expiry_date", expiry_date);

        return true
    }

    // Method to set logged in data
    public static onlogoutSuccess = (): boolean => {
        MemberAuthenticatorUtil.storage.remove("current_member");
        MemberAuthenticatorUtil.storage.remove("current_member_permissions");
        MemberAuthenticatorUtil.storage.remove("current_member_access_token");
        MemberAuthenticatorUtil.storage.remove("current_member_access_expiry_date");

        return true
    }

}

export default MemberAuthenticatorUtil;