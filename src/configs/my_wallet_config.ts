export const MY_WALLET_CONFIG = {
    route: "/my-wallets",
    api_base: "/my-wallet",
    lookup_limit: 180,
    transaction_limit: 8
} as const;

export const FEE_TYPES = {
    FLAT: "flat",
    PERCENTAGE: "percentage"
} as const;
