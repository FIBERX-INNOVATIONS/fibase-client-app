

import { ActionMethodRetrunInterface } from "@ui/version_3/ui_types/input_ui_type";

export type FieldValidator<FormData> = (
    value: any,
    form_data: Partial<FormData>
) => Promise<ActionMethodRetrunInterface> | ActionMethodRetrunInterface;

export interface BaseFormData {
    csrf_token: string | null;
}

export interface LoginFormDataInterface extends BaseFormData {
    username: string | null;
    password: string | null;
}

export interface TwoFactorFormDataInterface extends BaseFormData {
    otp_code: string;
}