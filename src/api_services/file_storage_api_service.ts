import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { StorageFileUploadFormDataInterface } from "@/types/form_data_type";

import { FileStorageRecordInterface } from "@/types/api_service_type";

class FileStorageAPIService extends BaseAPIService {
    // =========================
    // 🔹 UPLOAD
    // =========================
    public static uploadFile = async (
        data: StorageFileUploadFormDataInterface | FormData
    ): Promise<APIResponseInterface<FileStorageRecordInterface>> => {
        return await this.queryAPI<FileStorageRecordInterface>({
            url: `/file-storage/upload`,
            method: "POST",
            data,
            disable_retry: true,
            maxBodyLength: Infinity
        });
    };
}

export default FileStorageAPIService;
