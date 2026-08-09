import { InputUIFetchDataParamsInterface, SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import {
    CurrencyRecordInterface,
    IdentityRecordInterface,
    MemberRecordInterface,
    PaymentMethodRecordInterface,
    PaymentProviderMethodRecordInterface,
    PaymentProviderRecordInterface,
    RegisteredAppRecordInterface,
    RoleRecordInterface
} from "@/types/api_service_type";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import CountryDataUtil from "@ui/version_3/utils/country_data_util";

import CurrencyAPIService from "@/api_services/currency_api_service";

import PaymentMethodAPIService from "@/api_services/payment_method_api_service";

import MemberProfileAPIService from "@/api_services/member_profile_api_service";

import AccessControlAPIService from "@/api_services/access_control_api_service";

import RegisteredAppAPIService from "@/api_services/registered_app_api_service";

import PaymentProviderAPIService from "@/api_services/payment_provider_api_service";

import PaymentProviderMethodAPIService from "@/api_services/payment_provider_method_api_service";

import IdentityAPIService from "@/api_services/identity_api_service";

class PreviewRecordFetcher {
    public static name = "preview_record_fetcher";

    protected static logger: LoggerUtil = new LoggerUtil({ prefix: this.name });

    private static readonly countries_page_size = 50;

    // Method to prepend a clear option to the first page of optional preview records.
    private static prependOptionalSelection(
        params: InputUIFetchDataParamsInterface<Record<string, unknown>>,
        result: { records: SelectOptionInterface[]; total_pages: number }
    ): { records: SelectOptionInterface[]; total_pages: number } {
        const page = Number(params?.page ?? 1);

        if (page > 1) {
            return result;
        }

        return {
            ...result,
            records: [{ label_text: String(params.optional_selection_label ?? "No selection"), value: "" }, ...result.records]
        };
    }

    // Method to remove optional-selection UI metadata before querying an API.
    private static getOptionalSelectionFetchParams<TParams extends Record<string, unknown>>(
        params: InputUIFetchDataParamsInterface<TParams>
    ): InputUIFetchDataParamsInterface<TParams> {
        const { optional_selection_label, ...fetch_params } = params;

        return fetch_params as InputUIFetchDataParamsInterface<TParams>;
    }

    // Method to fetch identity preview records with an option to clear the selection.
    public static fetchOptionalIdentityPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const result = await this.fetchIdentityPreviewRecords(this.getOptionalSelectionFetchParams(params));

        return this.prependOptionalSelection(params, result);
    };

    // Method to fetch registered app preview records with an option to clear the selection.
    public static fetchOptionalRegisteredAppPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const result = await this.fetchRegisteredAppPreviewRecords(this.getOptionalSelectionFetchParams(params));

        return this.prependOptionalSelection(params, result);
    };

    // Method to fetch payment provider preview records with an option to clear the selection.
    public static fetchOptionalPaymentProviderPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const result = await this.fetchPaymentProviderPreviewRecords(this.getOptionalSelectionFetchParams(params));

        return this.prependOptionalSelection(params, result);
    };

    // Method to handle fetching identity preview records.
    public static fetchIdentityPreviewRecords = async <TParams extends Record<string, unknown> = Record<string, unknown>>(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await IdentityAPIService.getIdentityList({
                page: page + 1,
                filters: {
                    search,
                    preview_only: true,
                    ...extra_params
                }
            });
            const fallback = { records: [], total_pages: 0 };

            if (result.status === "logout" || result.status !== "success" || !result.data?.records) {
                return fallback;
            }

            const records = result.data.records.map((record: IdentityRecordInterface): SelectOptionInterface => {
                const profile = record.primary_profile ?? record.profile;
                const full_name = [profile?.first_name, profile?.middle_name, profile?.last_name].filter(Boolean).join(" ");
                const display_name = profile?.display_name || full_name;

                return {
                    label_text: display_name ? `${display_name} — ${record.public_id}` : record.public_id,
                    value: record.public_id
                };
            });

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error("Failed to fetch identity preview records", { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching registered apps preview records
    public static fetchRegisteredAppPreviewRecords = async <TParams extends Record<string, unknown> = Record<string, unknown>>(
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

            const records = result.data.records.map((obj: RegisteredAppRecordInterface): SelectOptionInterface => {
                const { name, prefix, public_id } = obj;

                return {
                    label_text: `${prefix?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                    value: public_id
                };
            });

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
    public static fetchCurrenciesPreviewRecords = async <TParams extends Record<string, unknown> = Record<string, unknown>>(
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

            const records = result.data.records.map((obj: CurrencyRecordInterface): SelectOptionInterface => {
                const { name, code } = obj;

                return {
                    label_text: `${code?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                    value: code
                };
            });

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

            const records = result.data.records.flatMap((obj: PaymentProviderRecordInterface): SelectOptionInterface[] => {
                const { id, code, name } = obj;

                return id
                    ? [
                          {
                              label_text: `${code?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                              value: id
                          }
                      ]
                    : [];
            });

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
    public static fetchPaymentMethodPreviewRecords = async <TParams extends Record<string, unknown> = Record<string, unknown>>(
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

            const records = result.data.records.map((obj: PaymentMethodRecordInterface): SelectOptionInterface => {
                const { code, name } = obj;
                const method_id = (obj as PaymentMethodRecordInterface & { id?: number }).id;

                return {
                    label_text: `${code?.toUpperCase?.() ?? ""} - ${name ?? ""}`,
                    value: method_id ?? code
                };
            });

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch payment methods preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching payment provider methods preview records
    public static fetchPaymentProviderMethodPreviewRecords = async <
        TParams extends Record<string, unknown> = Record<string, unknown>
    >(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await PaymentProviderMethodAPIService.getPaymentProviderMethodList({
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
                (obj: PaymentProviderMethodRecordInterface): SelectOptionInterface[] => {
                    const { id, direction, provider, payment_method, provider_method_code } = obj;

                    return id
                        ? [
                              {
                                  label_text: [
                                      provider?.code?.toUpperCase?.() ?? provider?.name ?? "",
                                      payment_method?.code?.toUpperCase?.() ?? payment_method?.name ?? "",
                                      direction?.toUpperCase?.() ?? "",
                                      provider_method_code ?? ""
                                  ]
                                      .filter(Boolean)
                                      .join(" - "),
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
            this.logger.error(`Failed to fetch payment provider methods preview records`, {
                error
            });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching countries preview records
    public static fetchCountriesPreviewRecords = async <TParams extends Record<string, unknown> = Record<string, unknown>>(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 1, search = null } = params ?? {};

        try {
            const country_options = CountryDataUtil.getCountryOptions({
                search: search ?? "",
                label_key: "name",
                value_key: "iso2",
                include_data: false,
                map_label: (country) => `${country.iso2.toUpperCase()} - ${country.name}`
            });
            const normalized_page = Math.max(1, page);
            const offset = (normalized_page - 1) * this.countries_page_size;

            return {
                records: country_options.slice(offset, offset + this.countries_page_size),
                total_pages: Math.ceil(country_options.length / this.countries_page_size)
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch countries preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching members preview records
    public static fetchMemberPreviewRecords = async <TParams extends Record<string, unknown> = Record<string, unknown>>(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await MemberProfileAPIService.getMemberList({
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

            const records = result.data.records.map((obj: MemberRecordInterface): SelectOptionInterface => {
                const label =
                    obj.full_name ||
                    [obj.first_name, obj.last_name].filter(Boolean).join(" ") ||
                    obj.username ||
                    obj.email ||
                    "Unknown Member";

                return {
                    label_text: label,
                    value: obj.public_id
                };
            });

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch member preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };

    // Method to handle fetching role preview records
    public static fetchRolePreviewRecords = async <TParams extends Record<string, unknown> = Record<string, unknown>>(
        params: InputUIFetchDataParamsInterface<TParams>
    ): Promise<{ records: SelectOptionInterface[]; total_pages: number }> => {
        const { page = 0, search = null, ...extra_params } = params ?? {};

        try {
            const result = await AccessControlAPIService.getRoleList({
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

            const records = result.data.records.map((obj: RoleRecordInterface): SelectOptionInterface => {
                const label = [obj.symbol, obj.display_name || obj.name].filter(Boolean).join(" - ");

                return {
                    label_text: label,
                    value: obj.id
                };
            });

            return {
                records,
                total_pages: result.data.total_pages ?? 0
            };
        } catch (error: unknown) {
            this.logger.error(`Failed to fetch role preview records`, { error });
            return { records: [], total_pages: 0 };
        }
    };
}

export default PreviewRecordFetcher;
