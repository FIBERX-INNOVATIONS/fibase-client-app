import BaseController from "@ui/version_3/base_classes/base_controller";
import LoggerUtil from "@ui/version_3/utils/logger_util";
import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { FormDataInterface } from "@/types/form_action_type";

import {
    InputUIPropsInterface,
    InputUIActionPropsInterface,
    ActionMethodRetruninterface
} from "@ui/version_3/ui_types/input_ui_type";


class BaseFormActionHandler<
    Props extends Record<string, any> = {},
    State extends Record<string, any> = {},
    Computed extends Record<string, any> = {},
    Components extends Record<string, any> = {}
> {

    public readonly name: string;

    protected controller: BaseController<Props, State, Computed, Components>;

    protected logger: LoggerUtil;

    protected content_manager = ContentManagerUtil.getInstance();

    protected form_data: FormDataInterface = {};

    protected redirect_timer: ReturnType<typeof setTimeout> | null = null;


    constructor(
        controller: BaseController<Props, State, Computed, Components>,
        name: string = "base_form_action_handler"
    ) {

        this.name = name;

        this.controller = controller;

        this.logger = new LoggerUtil({
            prefix: name,
            show_timestamp: false
        });

    }


    /* ---------------------------------- */
    /* Content Helpers                    */
    /* ---------------------------------- */

    protected getContentMessage(message_key: string): string {

        return this.content_manager.getAPIResponseValue(message_key);

    }


    /* ---------------------------------- */
    /* Input Change Handler               */
    /* ---------------------------------- */
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

        this.form_data[formatted_key] = value;

        return {
            status: true,
            msg: ""
        };

    };

    // Method to get form data
    public getFormData(): FormDataInterface { return this.form_data; }

    
    public resetFormData(): void { this.form_data = {};}


    /* ---------------------------------- */
    /* Input Handler Config               */
    /* ---------------------------------- */

    public getInputActionHandlersConfig(): InputUIActionPropsInterface {

        return {
            on_change: this.handleOnInputChanged
        };

    }

}

export default BaseFormActionHandler;