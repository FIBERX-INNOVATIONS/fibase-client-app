import {
    InputUIFetchDataParamsInterface,
    SelectOptionInterface
} from "@ui/version_3/ui_types/input_ui_type";

import {
    CurrencyRecordInterface,
    MemberRecordInterface,
    PaymentMethodRecordInterface,
    PaymentProviderRecordInterface,
    RegisteredAppRecordInterface
} from "@/types/api_service_type";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import MemberAPIService from "@/api_services/member_api_service";

import CurrencyAPIService from "@/api_services/currency_api_service";

import PaymentProviderAPIService from "@/api_services/payment_provider_api_service";

import PaymentMethodAPIService from "@/api_services/payment_method_api_service";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";

interface RESTCountryRecordInterface {
    cca2: string;
    name: {
        common: string;
    };
}

class PreviewRecordFetcher {
    public static name = "preview_record_fetcher";
    protected static logger: LoggerUtil = new LoggerUtil({ prefix: this.name });
    private static readonly countries_api_url =
        "https://restcountries.com/v3.1/all?fields=cca2,name";
    private static readonly countries_page_size = 50;
    private static countries_options_promise: Promise<SelectOptionInterface[]> | null = null;

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

    // Method to handle fetching payment providers preview records
    public static fetchPaymentProviderPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await PaymentProviderAPIService.getPaymentProviderList({
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

            const records = result.data.records.flatMap(
                (obj: PaymentProviderRecordInterface): SelectOptionInterface[] => {
                    const { id, code, name } = obj;

                    return id
                        ? [
                              {
                                  label_text: `${code?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                                  value: id
                              }
                          ]
                        : [];
                }
            );

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch payment providers preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching payment methods preview records
    public static fetchPaymentMethodPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await PaymentMethodAPIService.getPaymentMethodList({
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
                (obj: PaymentMethodRecordInterface): SelectOptionInterface => {
                    const { code, name } = obj;
                    const method_id = (obj as PaymentMethodRecordInterface & { id?: number }).id;

                    return {
                        label_text: `${code?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                        value: method_id ?? code
                    };
                }
            );

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch payment methods preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching countries preview records
    public static fetchCountriesPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 1, search = null } = params ?? {};

        try {
            if (!this.countries_options_promise) {
                this.countries_options_promise = fetch(this.countries_api_url)
                    .then(async (response): Promise<RESTCountryRecordInterface[]> => {
                        if (!response.ok) {
                            throw new Error(`REST Countries request failed: ${response.status}`);
                        }

                        return (await response.json()) as RESTCountryRecordInterface[];
                    })
                    .then((countries): SelectOptionInterface[] => {
                        return countries
                            .map(({ cca2, name }): SelectOptionInterface => {
                                const code = cca2.toUpperCase();

                                return {
                                    label_text: `${code} - ${name.common}`,
                                    value: code
                                };
                            })
                            .sort((a, b) => a.label_text.localeCompare(b.label_text));
                    })
                    .catch((error: unknown) => {
                        this.countries_options_promise = null;
                        throw error;
                    });
            }

            const country_options = await this.countries_options_promise;
            const normalized_search = search?.trim().toLowerCase() ?? "";
            const filtered_options = normalized_search
                ? country_options.filter((option) => {
                      return option.label_text.toLowerCase().includes(normalized_search);
                  })
                : country_options;
            const normalized_page = Math.max(1, page);
            const offset = (normalized_page - 1) * this.countries_page_size;

            return {
                records: filtered_options.slice(offset, offset + this.countries_page_size),
                total_pages: Math.ceil(filtered_options.length / this.countries_page_size)
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch countries preview records`, { error });
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
