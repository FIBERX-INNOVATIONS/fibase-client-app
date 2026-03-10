
import BaseController from "@ui/version_3/base_classes/base_controller";
import LoggerUtil from "@ui/version_3/utils/logger_util";
import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { FieldValidator } from "@/types/form_data_type";
import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";
import { ToastStatusType } from "@ui/version_3/ui_types/toaster_ui_type";

import { 
    BaseFormStateInterface, 
    FormDataInterface 
} from "@/types/form_action_type";

import {
    InputUIPropsInterface,
    InputUIActionPropsInterface,
    ActionMethodRetruninterface
} from "@ui/version_3/ui_types/input_ui_type";
import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";
import { ButtonActionMethodReturnInterface, ButtonUIActionPropsInterface, ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";




class BaseFormActionHandler<
    FormData extends Record<string, any> = {},
    Props extends Record<string, any> = {},
    State extends BaseFormStateInterface = BaseFormStateInterface,
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

    // Method to retrun status icon
    protected getStatusIcon = (status?: ToastStatusType): SVGIconKey => {
        switch (status) {

            case "success":
                return "check_circle_svg_icon";

            case "error":
                return "x_circile_svg_icon";

            case "warning":
                return "warning_traingle_svg_icon";

            case "info":
                return "exclamation_circle_svg_icon";

            default:
                return "check_circle_svg_icon";
        }
    }

    // Method to hide error alert
    protected hideErrorAlert = (): void => {
        const empty_props = ToasterUIPropsBuilder.getReactivePropsObject();

        Object.assign(
            this.controller.state_refs.toast_alert_props,
            empty_props
        );
    }

    // Method to show error alert
    protected showErrorAlert = (status: ToastStatusType, message: string): void => {
        const status_icon   = this.getStatusIcon(status);
        const new_props     = ToasterUIPropsBuilder.getReactivePropsObject(message, status, status_icon);

        Object.assign(
            this.controller.state_refs.toast_alert_props,
            new_props
        );
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

    public handleOnBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> =>  {
        return { status: true, msg: "" };
    }


    /* ---------------------------------- */
    /* Input and button Handler Config    */
    /* ---------------------------------- */
    public getInputActionHandlersConfig = (): InputUIActionPropsInterface => {

        return {
            on_change: this.handleOnInputChanged
        };

    }

    public getBtnActionHandlerConfig = (): ButtonUIActionPropsInterface => {

        return {
            on_click: this.handleOnBtnClick
        };

    }

    

}

export default BaseFormActionHandler;