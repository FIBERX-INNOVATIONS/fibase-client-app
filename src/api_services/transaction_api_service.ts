import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import {
    TransactionListParams,
    TransactionListResponseInterface,
    TransactionReceiptListParams,
    TransactionReceiptListResponseInterface,
    TransactionReceiptRecordInterface,
    TransactionRecordInterface
} from "@/types/api_service_type";

import { TransactionListViewFiltersInterface } from "@/types/list_view_filter_type";

// Set this to false to restore the real transaction API without changing the view layer.
const USE_DUMMY_TRANSACTION_DATA = true;

const DUMMY_CURRENCIES = [
    { code: "GBP", name: "British Pound", symbol: "£", precision: 2, is_fiat: true, is_active: true },
    { code: "USD", name: "US Dollar", symbol: "$", precision: 2, is_fiat: true, is_active: true },
    { code: "EUR", name: "Euro", symbol: "€", precision: 2, is_fiat: true, is_active: true }
];

const DUMMY_TRANSACTION_TYPES = ["deposit", "withdrawal", "transfer", "payment", "refund"];
const DUMMY_DIRECTIONS = ["inbound", "outbound", "internal"];
const DUMMY_STATUSES = ["pending", "processing", "settled", "failed", "cancelled", "reversed", "refunded"];

const buildDummyIdentity = (index: number, role: "source" | "destination") => ({
    public_id: `IDN-DUMMY-${role.toUpperCase()}-${String(index).padStart(3, "0")}`,
    identity_type: index % 2 === 0 ? "individual" : "business",
    status: "active",
    is_verified: true,
    is_deleted: false,
    created_at: new Date(Date.UTC(2025, 10, 1 + index)).toISOString(),
    primary_profile: {
        public_id: `PRF-DUMMY-${role.toUpperCase()}-${String(index).padStart(3, "0")}`,
        display_name: `${role === "source" ? "Source" : "Destination"} Identity ${index}`
    }
});

const DUMMY_TRANSACTIONS: TransactionRecordInterface[] = Array.from({ length: 15 }, (_, offset) => {
    const index = offset + 1;
    const currency = DUMMY_CURRENCIES[offset % DUMMY_CURRENCIES.length];
    const transaction_type = DUMMY_TRANSACTION_TYPES[offset % DUMMY_TRANSACTION_TYPES.length];
    const direction = DUMMY_DIRECTIONS[offset % DUMMY_DIRECTIONS.length];
    const status = DUMMY_STATUSES[offset % DUMMY_STATUSES.length];
    const amount = 125 + index * 73.45;
    const fee_amount = Number((amount * 0.015).toFixed(2));
    const net_amount = Number((amount - fee_amount).toFixed(2));
    const created_at = new Date(Date.UTC(2026, 4, index, 8 + (index % 8), index * 3)).toISOString();
    const source_identity = buildDummyIdentity(index, "source");
    const destination_identity = buildDummyIdentity(index, "destination");
    const source_wallet = {
        public_id: `WLT-DUMMY-SRC-${String(index).padStart(3, "0")}`,
        status: "active",
        is_active: true,
        available_balance: 5000 + index * 100,
        locked_balance: 0,
        created_at,
        currency,
        identity: source_identity
    };
    const destination_wallet = {
        public_id: `WLT-DUMMY-DST-${String(index).padStart(3, "0")}`,
        status: "active",
        is_active: true,
        available_balance: 2500 + index * 80,
        locked_balance: 0,
        created_at,
        currency,
        identity: destination_identity
    };
    const is_external = index % 5 === 0;

    return {
        public_id: `TXN-DUMMY-${String(index).padStart(4, "0")}`,
        transaction_type,
        direction,
        status,
        amount: Number(amount.toFixed(2)),
        fee_amount,
        net_amount,
        app_reference: `APP-REF-${String(index).padStart(5, "0")}`,
        provider_reference: `PROVIDER-REF-${String(index).padStart(5, "0")}`,
        external_reference: index % 3 === 0 ? `EXT-REF-${String(index).padStart(5, "0")}` : null,
        initiated_at: created_at,
        settled_at: status === "settled" ? new Date(Date.parse(created_at) + 600_000).toISOString() : null,
        failed_at: status === "failed" ? new Date(Date.parse(created_at) + 420_000).toISOString() : null,
        authorized_at: ["processing", "settled"].includes(status)
            ? new Date(Date.parse(created_at) + 120_000).toISOString()
            : null,
        cancelled_at: status === "cancelled" ? new Date(Date.parse(created_at) + 300_000).toISOString() : null,
        reversed_at: status === "reversed" ? new Date(Date.parse(created_at) + 900_000).toISOString() : null,
        refunded_at: status === "refunded" ? new Date(Date.parse(created_at) + 1_200_000).toISOString() : null,
        created_at,
        updated_at: new Date(Date.parse(created_at) + 60_000).toISOString(),
        app: {
            public_id: `APP-DUMMY-${String((offset % 3) + 1).padStart(3, "0")}`,
            prefix: ["shop", "mobile", "ops"][offset % 3],
            name: ["Demo Store", "Mobile Wallet", "Operations Portal"][offset % 3],
            is_active: true
        },
        currency,
        initiated_by_identity: source_identity,
        source_identity,
        source_wallet,
        destination_identity: is_external ? null : destination_identity,
        destination_wallet: is_external ? null : destination_wallet,
        destination_external_account: is_external
            ? { name: `External Bank Account ${index}`, reference: `BANK-${String(index).padStart(4, "0")}` }
            : null,
        external_destination_type: is_external ? "bank_account" : null,
        external_destination_snapshot: is_external
            ? { name: `External Bank Account ${index}`, bank_name: "Demo Bank", last_four: `${1000 + index}` }
            : null,
        provider: {
            id: (offset % 2) + 1,
            code: offset % 2 === 0 ? "stripe" : "adyen",
            name: offset % 2 === 0 ? "Stripe" : "Adyen"
        },
        payment_method: {
            id: (offset % 3) + 1,
            code: ["card", "bank_transfer", "wallet"][offset % 3],
            name: ["Card", "Bank Transfer", "Wallet"][offset % 3]
        },
        identity_provider_account: {
            public_id: `IPA-DUMMY-${String(index).padStart(4, "0")}`,
            account_reference: `MERCHANT-${String((offset % 3) + 1).padStart(3, "0")}`
        },
        current_receipt:
            status === "settled"
                ? { public_id: `RCT-DUMMY-${String(index).padStart(4, "0")}`, receipt_number: `R-${2026000 + index}` }
                : null,
        description: `Dummy ${transaction_type} transaction ${index} created for UI testing.`,
        reason: status === "failed" ? "Provider declined the simulated request." : `Test ${transaction_type} flow.`,
        provider_instruction_snapshot: {
            capture_mode: "automatic",
            test_mode: true,
            attempt: 1
        },
        initiated_by_member:
            index % 4 === 0
                ? {
                      public_id: `MBR-DUMMY-${String(index).padStart(3, "0")}`,
                      first_name: "Test",
                      last_name: `Operator ${index}`,
                      full_name: `Test Operator ${index}`,
                      email: `operator${index}@example.test`
                  }
                : null,
        parent_transaction_public_id:
            transaction_type === "refund" ? `TXN-DUMMY-${String(Math.max(1, index - 1)).padStart(4, "0")}` : null
    };
});

const buildDummyReceiptUrl = (receipt_number: string, transaction: TransactionRecordInterface): string => {
    const html = `<!doctype html><html><head><title>${receipt_number}</title><style>body{font-family:Arial,sans-serif;max-width:720px;margin:40px auto;padding:30px;color:#172033}h1{border-bottom:2px solid #172033;padding-bottom:12px}.row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #ddd}.total{font-size:20px;font-weight:bold}</style></head><body><h1>Fibase Transaction Receipt</h1><div class="row"><span>Receipt</span><strong>${receipt_number}</strong></div><div class="row"><span>Transaction</span><strong>${transaction.public_id}</strong></div><div class="row"><span>Type</span><strong>${transaction.transaction_type}</strong></div><div class="row"><span>Status</span><strong>${transaction.status}</strong></div><div class="row total"><span>Amount</span><strong>${transaction.currency?.symbol ?? ""}${transaction.amount.toFixed(transaction.currency?.precision ?? 2)}</strong></div><div class="row"><span>Generated</span><strong>${transaction.created_at}</strong></div></body></html>`;

    return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
};

const DUMMY_TRANSACTION_RECEIPTS: TransactionReceiptRecordInterface[] = DUMMY_TRANSACTIONS.flatMap(
    (transaction, transaction_index) =>
        Array.from({ length: 2 }, (_, receipt_offset) => {
            const receipt_index = transaction_index * 2 + receipt_offset + 1;
            const receipt_number = `RCP-${2026000 + receipt_index}`;
            const generated_at = new Date(Date.parse(transaction.created_at) + (receipt_offset + 1) * 90_000).toISOString();

            return {
                id: receipt_index,
                public_id: `RCT-DUMMY-${String(receipt_index).padStart(4, "0")}`,
                transaction_id: transaction_index + 1,
                receipt_number,
                file_storage_id: receipt_index,
                receipt_url: receipt_index % 7 === 0 ? null : buildDummyReceiptUrl(receipt_number, transaction),
                status: receipt_index % 7 === 0 ? "failed" : "generated",
                generated_by_member_id: 1,
                generated_at,
                processor_attempts: receipt_index % 7 === 0 ? 2 : 1,
                last_error: receipt_index % 7 === 0 ? "Dummy receipt renderer timeout." : null,
                metadata: { dummy: true, format: "html", copy: receipt_offset + 1 },
                created_at: generated_at,
                updated_at: generated_at,
                transaction,
                generated_by_member: {
                    public_id: "MBR-DUMMY-001",
                    first_name: "Receipt",
                    last_name: "Generator",
                    full_name: "Receipt Generator",
                    email: "receipts@example.test"
                }
            };
        })
);

class TransactionAPIService extends BaseAPIService {
    // Method to compare a filter value against numeric or public identifiers.
    private static matchesIdentifier(value: unknown, filter_value: unknown): boolean {
        if (filter_value === undefined || filter_value === null || filter_value === "") return true;
        return String(value ?? "").toLowerCase() === String(filter_value).toLowerCase();
    }

    // Method to parse the date-range filter emitted by the shared filter panel.
    private static parseDateRange(value: TransactionListViewFiltersInterface["date_range"]): {
        start_date?: string;
        end_date?: string;
    } {
        if (!value) return {};

        if (typeof value === "object") return value;

        try {
            const parsed = JSON.parse(value) as { start_date?: string; end_date?: string };
            return parsed && typeof parsed === "object" ? parsed : {};
        } catch {
            const [start_date, end_date] = value.split(",");
            return { start_date, end_date };
        }
    }

    // Method to apply transaction endpoint filters to the local dummy records.
    private static filterDummyTransactions(
        records: TransactionRecordInterface[],
        filters: Partial<TransactionListViewFiltersInterface>
    ): TransactionRecordInterface[] {
        const search = filters.search?.trim().toLowerCase();
        const { start_date, end_date } = this.parseDateRange(filters.date_range);

        return records.filter((record) => {
            const matches_search = !search || JSON.stringify(record).toLowerCase().includes(search);
            const matches_type = this.matchesIdentifier(record.transaction_type, filters.transaction_type);
            const matches_direction = this.matchesIdentifier(record.direction, filters.direction);
            const matches_status = this.matchesIdentifier(record.status, filters.status);
            const matches_app = this.matchesIdentifier(record.app?.public_id, filters.app_id);
            const matches_currency = this.matchesIdentifier(record.currency?.code, filters.currency_id);
            const matches_provider =
                this.matchesIdentifier(record.provider?.id, filters.provider_id) ||
                this.matchesIdentifier(record.provider?.code, filters.provider_id);
            const matches_method =
                this.matchesIdentifier(record.payment_method?.id, filters.payment_method_id) ||
                this.matchesIdentifier(record.payment_method?.code, filters.payment_method_id);
            const matches_wallet =
                !filters.wallet_id ||
                this.matchesIdentifier(record.source_wallet?.public_id, filters.wallet_id) ||
                this.matchesIdentifier(record.destination_wallet?.public_id, filters.wallet_id);
            const matches_source_wallet = this.matchesIdentifier(record.source_wallet?.public_id, filters.source_wallet_id);
            const matches_destination_wallet = this.matchesIdentifier(
                record.destination_wallet?.public_id,
                filters.destination_wallet_id
            );
            const matches_identity =
                !filters.identity_id ||
                this.matchesIdentifier(record.initiated_by_identity?.public_id, filters.identity_id) ||
                this.matchesIdentifier(record.source_identity?.public_id, filters.identity_id) ||
                this.matchesIdentifier(record.destination_identity?.public_id, filters.identity_id);
            const matches_initiator = this.matchesIdentifier(
                record.initiated_by_identity?.public_id,
                filters.initiated_by_identity_id
            );
            const matches_parent =
                !filters.parent_transaction_id ||
                this.matchesIdentifier(record.parent_transaction?.public_id, filters.parent_transaction_id) ||
                this.matchesIdentifier(record.parent_transaction_public_id, filters.parent_transaction_id);
            const created_time = Date.parse(record.created_at);
            const matches_start = !start_date || created_time >= Date.parse(start_date);
            const matches_end = !end_date || created_time <= Date.parse(`${end_date}T23:59:59.999Z`);

            return (
                matches_search &&
                matches_type &&
                matches_direction &&
                matches_status &&
                matches_app &&
                matches_currency &&
                matches_provider &&
                matches_method &&
                matches_wallet &&
                matches_source_wallet &&
                matches_destination_wallet &&
                matches_identity &&
                matches_initiator &&
                matches_parent &&
                matches_start &&
                matches_end
            );
        });
    }

    // Method to sort dummy transaction rows using the requested API sort field.
    private static sortDummyTransactions(
        records: TransactionRecordInterface[],
        sort_by: string,
        sort_direction: "asc" | "desc"
    ): TransactionRecordInterface[] {
        const direction = sort_direction === "asc" ? 1 : -1;

        return [...records].sort((left, right) => {
            const left_value = left[sort_by as keyof TransactionRecordInterface];
            const right_value = right[sort_by as keyof TransactionRecordInterface];

            if (typeof left_value === "number" && typeof right_value === "number") {
                return (left_value - right_value) * direction;
            }

            return String(left_value ?? "").localeCompare(String(right_value ?? "")) * direction;
        });
    }

    // Method to return paginated dummy transactions using the list endpoint response shape.
    private static getDummyTransactionList(
        params?: TransactionListParams
    ): APIResponseInterface<TransactionListResponseInterface> {
        const { page = 1, limit = 12, sort_by = "created_at", sort_direction = "desc", filters = {} } = params ?? {};
        const filtered_records = this.filterDummyTransactions(DUMMY_TRANSACTIONS, filters);
        const sorted_records = this.sortDummyTransactions(filtered_records, sort_by, sort_direction);
        const current_page = Math.max(1, page);
        const total_items = sorted_records.length;
        const total_pages = total_items ? Math.ceil(total_items / limit) : 0;
        const start_index = (current_page - 1) * limit;

        return {
            status: "success",
            msg: "Dummy transactions loaded successfully.",
            data: {
                total_items,
                total_pages,
                current_page,
                records: sorted_records.slice(start_index, start_index + limit)
            }
        };
    }

    // Method to query the zero-based transaction list while keeping client pagination one-based.
    public static getTransactionList = async (
        params?: TransactionListParams
    ): Promise<APIResponseInterface<TransactionListResponseInterface>> => {
        if (USE_DUMMY_TRANSACTION_DATA) {
            return this.getDummyTransactionList(params);
        }

        const { page = 1, limit = 12, sort_by = "created_at", sort_direction = "desc", filters = {} } = params ?? {};

        const response = await this.queryAPI<TransactionListResponseInterface>({
            url: "/transaction/list",
            method: "GET",
            params: {
                page: Math.max(0, page - 1),
                limit,
                sort_by,
                sort_direction: sort_direction.toUpperCase(),
                ...filters,
                preview_only: filters.preview_only ?? true
            }
        });

        if (response.data) {
            response.data = {
                ...response.data,
                current_page: response.data.current_page + 1
            };
        }

        return response;
    };

    // Method to query a transaction's paginated receipt list or its dummy equivalent.
    public static getTransactionReceiptList = async (
        transaction_id: string | number,
        params?: TransactionReceiptListParams
    ): Promise<APIResponseInterface<TransactionReceiptListResponseInterface>> => {
        const { page = 1, limit = 6, sort_by = "created_at", sort_direction = "desc", filters = {} } = params ?? {};

        if (USE_DUMMY_TRANSACTION_DATA) {
            const normalized_id = String(transaction_id).toLowerCase();
            const transaction_index = DUMMY_TRANSACTIONS.findIndex(
                (transaction, index) =>
                    transaction.public_id.toLowerCase() === normalized_id || String(index + 1) === normalized_id
            );
            const search = filters.search?.trim().toLowerCase();
            const scoped_records = DUMMY_TRANSACTION_RECEIPTS.filter(
                (receipt) =>
                    receipt.transaction_id === transaction_index + 1 &&
                    (!search || JSON.stringify(receipt).toLowerCase().includes(search)) &&
                    (!filters.status || receipt.status === filters.status)
            );
            const direction = sort_direction === "asc" ? 1 : -1;
            const sorted_records = [...scoped_records].sort(
                (left, right) =>
                    String(left[sort_by as keyof TransactionReceiptRecordInterface] ?? "").localeCompare(
                        String(right[sort_by as keyof TransactionReceiptRecordInterface] ?? "")
                    ) * direction
            );
            const current_page = Math.max(1, page);
            const total_items = sorted_records.length;
            const total_pages = total_items ? Math.ceil(total_items / limit) : 0;
            const start_index = (current_page - 1) * limit;

            return {
                status: "success",
                msg: "Dummy transaction receipts loaded successfully.",
                data: {
                    total_items,
                    total_pages,
                    current_page,
                    records: sorted_records.slice(start_index, start_index + limit)
                }
            };
        }

        const response = await this.queryAPI<TransactionReceiptListResponseInterface>({
            url: `/transaction/${transaction_id}/receipts`,
            method: "GET",
            params: {
                page: Math.max(0, page - 1),
                limit,
                sort_by,
                sort_direction: sort_direction.toUpperCase(),
                ...filters,
                preview_only: filters.preview_only ?? false
            }
        });

        if (response.data) {
            response.data = { ...response.data, current_page: response.data.current_page + 1 };
        }

        return response;
    };

    // Method to query a full transaction record by numeric or public identifier.
    public static getTransaction = async (
        transaction_id: string | number
    ): Promise<APIResponseInterface<TransactionRecordInterface>> => {
        if (USE_DUMMY_TRANSACTION_DATA) {
            const normalized_id = String(transaction_id).toLowerCase();
            const record = DUMMY_TRANSACTIONS.find(
                (transaction, index) =>
                    transaction.public_id.toLowerCase() === normalized_id || String(index + 1) === normalized_id
            );

            return {
                status: record ? "success" : "error",
                msg: record ? "Dummy transaction loaded successfully." : "Dummy transaction not found.",
                data: record
            };
        }

        return await this.queryAPI<TransactionRecordInterface>({
            url: `/transaction/${transaction_id}`,
            method: "GET"
        });
    };
}

export default TransactionAPIService;
