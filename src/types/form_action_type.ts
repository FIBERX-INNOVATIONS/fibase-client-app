import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ToasterUIPropsInterface } from "@ui/version_3/ui_types/toaster_ui_type";

export interface FormDataInterface {
    [key: string]: any;
}

export interface BaseFormStateInterface {
    toast_alert_props: ToasterUIPropsInterface;

    btn_props: ButtonUIPropsInterface
}