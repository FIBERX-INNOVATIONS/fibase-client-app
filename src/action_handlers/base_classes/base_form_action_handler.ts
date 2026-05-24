import { markRaw, reactive } from "vue";

import BaseController from "@ui/version_3/base_classes/base_controller";
import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { FieldValidator } from "@/types/form_data_type";

import { SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import { CSRFTokenForType } from "@/configs/constants";

import { GlobalEventTypes, OpenModalEventPayloadInterface } from "@/types/global_events_type";

import { FilePreviewUploadUIPropsInterface } from "@ui/version_3/ui_types/file_preview_upload_ui_type";

import {
    ToasterUIActionPropsInterface,
    ToasterUIPropsInterface,
    ToastStatusType
} from "@ui/version_3/ui_types/toaster_ui_type";

import {
    ButtonActionMethodReturnInterface,
    ButtonUIActionPropsInterface,
    ButtonUIPropsInterface
} from "@ui/version_3/ui_types/button_ui_type";

import { BaseFormStateInterface, FormDataInterface } from "@/types/form_action_type";

import {
    InputUIPropsInterface,
    InputUIActionPropsInterface,
    ActionMethodRetrunInterface,
    InputValue
} from "@ui/version_3/ui_types/input_ui_type";

import FilePreviewUploadUI from "@ui/version_3/components/FilePreviewUploadUI.vue";

import ToasterUIPropsBuilder from "@ui/version_3/props_builder/toaster_ui_props_builder";
import AuthAPIService from "@/api_services/auth_api_service";
import FilePreviewUploadUIClassStyles from "@/class_styles/file_preview_upload_class_styles";
import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";
import ButtonUIClassStyles from "@/class_styles/button_ui_class_styles";

type FormFieldKey<FormData> = Extract<keyof FormData, string>;

class BaseFormActionHandler<
    FormData extends Record<string, any> = {},
    Props extends Record<string, any> = {},
    State extends BaseFormStateInterface = BaseFormStateInterface,
    Computed extends Record<string, any> = {},
    Components extends Record<string, any> = {},
    Events extends GlobalEventTypes = GlobalEventTypes
> extends BaseActionHandler<Props, State, Computed, Components, Events> {
    public readonly name: string;

    protected content_manager = ContentManagerUtil.getInstance();

    public form_data: Partial<FormData> = {};

    private readonly default_form_data: Partial<FormData>;

    private validation_state: Partial<Record<keyof FormData, boolean>> = {};

    private csrf_refresh_timer: ReturnType<typeof setTimeout> | null = null;

    protected validators: Partial<Record<keyof FormData, FieldValidator<FormData>>> = {};

    constructor(
        controller: BaseController<Props, State, Computed, Components, Events>,
        name: string = "base_form_action_handler",
        default_form_data?: Partial<FormData>
    ) {
        super(controller, name);

        this.name = name;

        this.default_form_data = { ...(default_form_data ?? {}) } as Partial<FormData>;
        this.form_data = reactive({ ...this.default_form_data }) as unknown as Partial<FormData>;
    }

    // Method to get content message
    protected getContentMessage = (message_key: string): string => {
        return this.content_manager.getAPIResponseValue(message_key);
    };

    // Method to run validators
    protected runValidator = async (key: keyof FormData, value: any): Promise<ActionMethodRetrunInterface> => {
        const validator = this.validators[key];

        if (!validator) {
            return { status: true, msg: "" };
        }

        return await validator(value, this.form_data);
    };

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
    };

    // Method to hide error alert
    public hideErrorAlert = (): void => {
        const empty_props = ToasterUIPropsBuilder.getReactivePropsObject();

        ToasterUIPropsBuilder.updateProps(this.controller.state_refs.toast_alert_props.value, empty_props, {
            allow_static: true
        });
        return;
    };

    // Method to show error alert
    public showErrorAlert = (status: ToastStatusType, message_key: string, duration?: number): void => {
        const to_ms = duration ? duration * 1000 : undefined;
        const status_icon = this.getStatusIcon(status);
        const message = this.getContentMessage(message_key);
        const new_props = ToasterUIPropsBuilder.getReactivePropsObject(message, status, status_icon, to_ms);

        ToasterUIPropsBuilder.updateProps(this.controller.state_refs.toast_alert_props.value, new_props, {
            allow_static: true
        });
        return;
    };

    // Method to get form data
    public getFormData = (): FormDataInterface => {
        return this.form_data;
    };

    // Method to reset form data
    public resetFormData = (): void => {
        Object.keys(this.form_data).forEach((key) => {
            delete (this.form_data as Record<string, any>)[key];
        });

        Object.assign(this.form_data, this.default_form_data);
        this.validation_state = {};
        this.syncSubmitButtonState();
    };

    // Method to schedule csrf refresh
    private scheduleCsrfRefresh = (expires_at: string, token_for: CSRFTokenForType | null): void => {
        if (!expires_at || !token_for) {
            return;
        }

        this.clearScheduledTimers();

        const expiration_time = new Date(expires_at).getTime();
        const refresh_buffer_ms = 30 * 1000;
        const delay = expiration_time - Date.now() - refresh_buffer_ms;

        if (!Number.isFinite(expiration_time) || delay <= 0) {
            return;
        }

        this.csrf_refresh_timer = setTimeout(async () => {
            this.logger.debug("Refreshing CSRF Token Now");
            await this.setCSRFToken(token_for);
        }, delay);
    };

    // Method to clear scheduled timers
    public clearScheduledTimers = (): boolean => {
        if (this.csrf_refresh_timer) {
            clearTimeout(this.csrf_refresh_timer);
            this.csrf_refresh_timer = null;
        }

        return true;
    };

    protected getSubmitRequiredFields(): FormFieldKey<FormData>[] {
        return [];
    }

    private getFieldKeyFromInputId = (input_id?: string): FormFieldKey<FormData> | null => {
        if (!input_id) {
            return null;
        }

        return input_id.replace(/_\d+$/, "") as FormFieldKey<FormData>;
    };

    private hasValidCSRFToken = (): boolean => {
        return Boolean((this.form_data as Record<string, any>).csrf_token);
    };

    private isSubmitReady = (): boolean => {
        const required_fields = this.getSubmitRequiredFields();

        if (!this.hasValidCSRFToken()) {
            return false;
        }

        return required_fields.every((field) => {
            const value = this.form_data[field];
            const has_value = value !== null && value !== undefined && value !== "";
            const is_valid = this.validation_state[field] !== false;

            return has_value && is_valid;
        });
    };

    protected syncSubmitButtonState = (): void => {
        ButtonUIPropsBuilder.setDisabled(this.controller.state_refs.btn_props.value, !this.isSubmitReady());
    };

    // Method to set csrf_token in form data
    public setCSRFToken = async (token_for: CSRFTokenForType | null): Promise<boolean> => {
        if (!token_for) {
            return false;
        }

        const result = await AuthAPIService.getFormCSRFToken(token_for);

        if (!result || result.status !== "success" || !result?.data) {
            return false;
        }

        const { expires_at, token } = result.data;

        (this.form_data as any)["csrf_token"] = token ?? null;

        this.syncSubmitButtonState();
        this.scheduleCsrfRefresh(expires_at, token_for);

        return true;
    };

    // Method to handle on toaster hide
    public handleOnToasterHide = async (
        event?: MouseEvent,
        visible?: boolean,
        input_config?: { props: ToasterUIPropsInterface }
    ): Promise<ActionMethodRetrunInterface> => {
        if (visible === false) {
            this.hideErrorAlert();
        }

        return { status: true, msg: "" };
    };

    // Method to handle on input and record in form data
    public handleOnInputChanged = async (
        event?: Event,
        input_value?: InputValue,
        input_config?: { props: InputUIPropsInterface }
    ): Promise<ActionMethodRetrunInterface> => {
        const input_props = input_config?.props;

        const target = event?.target as HTMLInputElement | HTMLTextAreaElement | null;

        const value = input_value ?? target?.value;

        const field_key = this.getFieldKeyFromInputId(input_props?.id);

        if (!field_key) {
            return {
                status: false,
                msg: this.getContentMessage("invalid_input_config")
            };
        }

        (this.form_data as Record<string, any>)[field_key] = value;

        const validation_result = await this.runValidator(field_key, value);

        this.validation_state[field_key] = validation_result.status;
        this.syncSubmitButtonState();

        return validation_result;
    };

    // Method to handle on btn clicked
    public handleOnFormSubmitBtnClick = async (
        event?: MouseEvent,
        config?: { props: ButtonUIPropsInterface }
    ): Promise<ButtonActionMethodReturnInterface> => {
        return { status: true, msg: "" };
    };

    // method to handle on file upload
    public handleOnFileUpload = async (files: File[]): Promise<boolean> => {
        return false;
    };

    // Method to open file upload modal on file selected
    public handleOnFileSelected = async (
        event?: Event,
        input_value?: InputValue,
        input_config?: { props: InputUIPropsInterface }
    ): Promise<ActionMethodRetrunInterface> => {
        const base_content_key = "content_resource.global_modal_ui";
        const target = event?.target as HTMLInputElement;
        const props = input_config?.props;
        const multiple = props?.file_props?.multiple ?? false;
        const class_styles = FilePreviewUploadUIClassStyles;

        if (!target?.files) {
            this.logger.warn(`No files selected`);
            return { status: false, msg: this.getContentMessage("no_file_selected") };
        }

        if (!this.handleOnFileUpload) {
            this.logger.warn(`handleOnFileUpload method not implemented in ${this.name}`);
            return { status: false, msg: this.getContentMessage("file_upload_not_supported") };
        }

        const files = Array.from(target.files);

        const action_props = {
            on_file_upload: this.handleOnFileUpload.bind(this)
        };

        const upload_button_props = ButtonUIPropsBuilder.getReactivePropsObject(
            `UploadFile${multiple ? "s" : ""}_${input_config?.props?.id ?? ""}`,
            `${base_content_key}.file_preview_upload_modal.content.upload_btn_text`,
            "file_upload_svg_icon",
            "button",
            {
                class_styles: ButtonUIClassStyles,
                boolean_props: { disabled: false }
            }
        );

        const modal_payload: OpenModalEventPayloadInterface<FilePreviewUploadUIPropsInterface, {}> = {
            content_key: `${base_content_key}.file_preview_upload_modal`,

            animation_type: "slide_top",

            body_component: markRaw(FilePreviewUploadUI),

            body_props: {
                files,
                multiple,
                class_styles,
                upload_button_props,
                action_props
            }
        };

        this.controller?.event_bus?.emit?.("open_modal", modal_payload);

        return { status: true, msg: "" };
    };

    /* ---------------------------------- */
    /* Input and button Handler Config    */
    /* ---------------------------------- */
    public getInputActionHandlersConfig = (): InputUIActionPropsInterface => {
        return {
            on_change: this.handleOnInputChanged
        };
    };

    public getBtnActionHandlerConfig = (): ButtonUIActionPropsInterface => {
        return {
            on_click: this.handleOnFormSubmitBtnClick.bind(this)
        };
    };

    public getToasterActionHandlerConfig = (): ToasterUIActionPropsInterface => {
        return {
            on_click: this.handleOnToasterHide.bind(this),

            on_hide: this.handleOnToasterHide.bind(this)
        };
    };
}

export default BaseFormActionHandler;
