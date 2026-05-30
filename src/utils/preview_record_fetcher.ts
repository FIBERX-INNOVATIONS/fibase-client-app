import {
    InputUIFetchDataParamsInterface,
    SelectOptionInterface
} from "@ui/version_3/ui_types/input_ui_type";

import {
    CurrencyRecordInterface,
    MemberRecordInterface,
    RegisteredAppRecordInterface
} from "@/types/api_service_type";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import MemberAPIService from "@/api_services/member_api_service";

import CurrencyAPIService from "@/api_services/currency_api_service";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";

class PreviewRecordFetcher {
    public static name = "preview_record_fetcher";
    protected static logger: LoggerUtil = new LoggerUtil({ prefix: this.name });

    // Method to handle fetching registered apps preview records
    public static fetchRegisteredAppPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await RegisteredAppAPIService.getRegisteredAppList({
                page,
                filters: {
                    search,
                    preview_only: true,
                    ...extra_params
                }
            });

            const fallback = { records: [], total_pages: 0 };

            if (result.status === "logout") {
                return fallback;
            }

            if (result.status !== "success" || !result.data?.records) {
                return fallback;
            }

            const records = result.data.records.map(
                (obj: RegisteredAppRecordInterface): SelectOptionInterface => {
                    const { name, prefix, public_id } = obj;

                    return {
                        label_text: `${prefix?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                        value: public_id
                    };
                }
            );

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch registered apps preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching currencies preview records
    public static fetchCurrenciesPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await CurrencyAPIService.getCurrencyList({
                page,
                filters: {
                    search,
                    preview_only: true,
                    ...extra_params
                }
            });

            const fallback = { records: [], total_pages: 0 };

            if (result.status === "logout") {
                return fallback;
            }

            if (result.status !== "success" || !result.data?.records) {
                return fallback;
            }

            const records = result.data.records.map(
                (obj: CurrencyRecordInterface): SelectOptionInterface => {
                    const { name, code } = obj;

                    return {
                        label_text: `${code?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                        value: code
                    };
                }
            );

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch currencies preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching members preview records
    public static fetchMemberPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await MemberAPIService.getMemberList({
                page,
                filters: {
                    search,
                    preview_only: true,
                    ...extra_params
                }
            });

            const fallback = { records: [], total_pages: 0 };

            if (result.status === "logout") {
                return fallback;
            }

            if (result.status !== "success" || !result.data?.records) {
                return fallback;
            }

            const records = result.data.records.map(
                (obj: MemberRecordInterface): SelectOptionInterface => {
                    const label = obj.full_name || obj.username || obj.email || "Unknown Member";

                    return {
                        label_text: label,
                        value: obj.public_id
                    };
                }
            );

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch member preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };
}

export default PreviewRecordFetcher;
