import { Component } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { DecisionPromptUIPropsInterface } from "@ui/version_3/ui_types/decision_prompt_ui_type";

import type { CurrencyRecordInterface } from "@/types/api_service_type";

import type {
    AppCurrencyActionType,
    AppCurrencyActionSuccessCallback
} from "@/ui_types/form_view_type";

export type DeleteRecordMethod<TResponse = unknown> = (
    record_id: string,
    reason_text?: string
) => Promise<APIResponseInterface<TResponse>>;

export type DeleteSuccessCallback<
    T extends object = Record<string, unknown>,
    TResponse = unknown
> = (record: T, response?: APIResponseInterface<TResponse>) => Promise<void> | void;

export interface DeleteViewPropsInterface<
    T extends object = Record<string, unknown>,
    TResponse = unknown
> {
    record: T;

    record_id: string;

    content_key: string;

    on_delete_success?: DeleteSuccessCallback<T, TResponse>;
}

export interface DeleteViewStateDataInterface {
    decision_prompt_props: DecisionPromptUIPropsInterface;
}

export interface DeleteViewComputedDataInterface {}

export interface DeleteViewComponentsInterface {
    DecisionPromptUI: Component;
}

export interface DeleteViewContentKeysInterface {
    title_text: string;

    message_text: string;

    cancel_button_text: string;

    confirm_button_text: string;

    [key: string]: string;
}

export type AppCurrencyDecisionActionType = Extract<
    AppCurrencyActionType,
    "unassign" | "set_default"
>;

export interface AppCurrencyDecisionPromptRecordInterface extends Record<string, unknown> {
    code?: string;

    name?: string;

    app?: Record<string, unknown>;

    app_name?: string;

    currencies?: string;

    currency_count?: number;
}

export interface AppCurrencyDecisionViewPropsInterface extends DeleteViewPropsInterface<AppCurrencyDecisionPromptRecordInterface> {
    action: AppCurrencyDecisionActionType;

    app_id: string;

    currency_codes: string[];

    currency_record?: CurrencyRecordInterface;

    on_success?: AppCurrencyActionSuccessCallback;
}
