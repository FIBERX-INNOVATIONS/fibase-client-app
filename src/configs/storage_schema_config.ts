import { MemberRecordInterface } from "@/types/api_service_type";
import { StorageFieldType } from "@ui/version_3/types/util_type";

export const STORAGE_SCHEMA = {
    current_member: {
        encrypted_key: "x9a2P0",
        default_value: null
    } as StorageFieldType<MemberRecordInterface | null>,

    current_member_permissions: {
        encrypted_key: "xrafY3G0",
        default_value: []
    } as StorageFieldType<string[]>,

    current_member_access_token: {
        encrypted_key: "xraGdTwRT4G",
        default_value: null
    } as StorageFieldType<string | null>,

    current_member_challenge_token: {
        encrypted_key: "xraGdWkjfo",
        default_value: null
    } as StorageFieldType<string | null>,

    current_member_access_expiry_date: {
        encrypted_key: "xraEXP1",
        default_value: null
    } as StorageFieldType<Date | null>,

    current_member_device_id: {
        encrypted_key: "jrji868",
        default_value: null
    } as StorageFieldType<string | null>
};

export type InternalStorageSchemaType = typeof STORAGE_SCHEMA;
