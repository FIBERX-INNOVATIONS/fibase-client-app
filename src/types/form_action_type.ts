import { ToasterUIPropsInterface } from "@ui/version_3/ui_types/toaster_ui_type";

export interface FormDataInterface {
    [key: string]: any;
}

export interface BaseFormStateInterface {
    toast_alert_props: ToasterUIPropsInterface;
}