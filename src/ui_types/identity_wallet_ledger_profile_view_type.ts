import { Component } from "vue";

import { IdentityWalletLedgerRecordInterface } from "@/types/api_service_type";

import {
    ProfileViewComponentsInterface,
    ProfileViewComputedDataInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

export interface IdentityWalletLedgerProfileViewPropsInterface extends ProfileViewPropsInterface<IdentityWalletLedgerRecordInterface> {}

export interface IdentityWalletLedgerProfileViewComputedDataInterface extends ProfileViewComputedDataInterface {
    entry_type_text: string;
    direction_text: string;
    balance_field_text: string;
    amount_text: string;
    before_balance_text: string;
    after_balance_text: string;
    transaction_text: string;
    wallet_text: string;
    identity_text: string;
    currency_text: string;
    created_at_text: string;
    created_by_text: string;
    metadata_text: string;
}

export interface IdentityWalletLedgerProfileViewComponentsInterface extends ProfileViewComponentsInterface {
    ProfileValue: Component;
}
