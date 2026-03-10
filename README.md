in my base form action handler i want to include a hideErrorAlert and showErrorAlert which is meant to set and rest the toast alert props of a form but from the base class it cannot see yet that the controller has toaster alert props is there a way to set that all forms would ahve the toaster alert props in state refs


import BaseController from "@ui/version_3/base_classes/base_controller";
import LoggerUtil from "@ui/version_3/utils/logger_util";
import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { FormDataInterface } from "@/types/form_action_type";
import { FieldValidator } from "@/types/form_data_type";

import {
    InputUIPropsInterface,
    InputUIActionPropsInterface,
    ActionMethodRetruninterface
} from "@ui/version_3/ui_types/input_ui_type";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";


class BaseFormActionHandler<
    FormData extends Record<string, any> = {},
    Props extends Record<string, any> = {},
    State extends Record<string, any> = { },
    Computed extends Record<string, any> = {},
    Components extends Record<string, any> = {}
> {

    public readonly name: string;

    protected controller: BaseController<Props, State, Computed, Components>;

    protected logger: LoggerUtil;

    protected content_manager = ContentManagerUtil.getInstance();

    protected form_data: Partial<FormData> = {};

    protected redirect_timer: ReturnType<typeof setTimeout> | null = null;

    protected validators: Partial<Record<keyof FormData, FieldValidator<FormData>>> = {};


    constructor(
        controller: BaseController<Props, State, Computed, Components>,
        name: string = "base_form_action_handler",
        default_form_data?: Partial<FormData>
    ) {

        this.name = name;

        this.controller = controller;

        this.form_data = default_form_data ?? {};

        this.logger = new LoggerUtil({
            prefix: name,
            show_timestamp: false
        });

    }

    // Method to get content message
    protected getContentMessage = (message_key: string): string => {

        return this.content_manager.getAPIResponseValue(message_key);

    }

    // Method to run validators
    protected runValidator = async (
        key: keyof FormData,
        value: any
    ): Promise<ActionMethodRetruninterface>  => {

        const validator = this.validators[key];

        if (!validator) {
            return { status: true, msg: "" };
        }

        return await validator(value, this.form_data);
    }

    // Method to hide error alert
    public hideErrorAlert = (): void => {
        if(!this.controller.state_refs.toast_alert_props) { return }

        this.controller.state_refs.toast_alert_props = ToasterUIPropsBuilder.getReactivePropsObject();
    }

    // Method to show error alert
    private showErrorAlert(status: string, message: string) {
        const new_toast_alert_props = AuthPropsBuilder.getToastAlertProps(this, status, message);
        Object.assign(this.controller.state_refs.toast_alert_props, new_toast_alert_props)
    }

    // Method to get form data
    public getFormData = (): FormDataInterface => { return this.form_data; }

    // Method to reset form data
    public resetFormData = (): void => { this.form_data = {}; }

    // Method to handle on input and record in form data
    public handleOnInputChanged = async (
        event?: Event,
        input_value?: string | number | boolean | Array<any> | File | null,
        input_config?: { props: InputUIPropsInterface }
    ): Promise<ActionMethodRetruninterface> => {

        const input_props = input_config?.props;

        const target =
            event?.target as HTMLInputElement | HTMLTextAreaElement | null;

        const value = input_value ?? target?.value;

        const input_id = input_props?.id;

        if (!input_id) {

            return {
                status: false,
                msg: this.getContentMessage("invalid_input_config")
            };

        }

        const formatted_key = input_id.replace(/_\d+$/, "");

        (this.form_data as any)[formatted_key] = value;

        /* ---------------------------------- */
        /* Run Validator if Exists            */
        /* ---------------------------------- */

        const validation_result = await this.runValidator(
            formatted_key,
            value
        );

        return validation_result;
    };


    /* ---------------------------------- */
    /* Input Handler Config               */
    /* ---------------------------------- */
    public getInputActionHandlersConfig = (): InputUIActionPropsInterface => {

        return {
            on_change: this.handleOnInputChanged
        };

    }

}

export default BaseFormActionHandler;