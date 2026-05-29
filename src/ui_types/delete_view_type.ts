import { Component } from "vue";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { DecisionPromptUIPropsInterface } from "@ui/version_3/ui_types/decision_prompt_ui_type";

export type DeleteRecordMethod<TResponse = unknown> = (
    record_id: string
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
