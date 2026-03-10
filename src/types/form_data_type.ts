

import { ActionMethodRetruninterface } from "@ui/version_3/ui_types/input_ui_type";

export type FieldValidator<FormData> = (
    value: any,
    form_data: Partial<FormData>
) => Promise<ActionMethodRetruninterface> | ActionMethodRetruninterface;

export interface LoginFormDataInterface {
    csrf_token: string | null;
    username: string | null;
    password: string | null;
}