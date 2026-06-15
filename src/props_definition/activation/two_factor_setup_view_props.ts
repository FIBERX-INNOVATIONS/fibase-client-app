import { PropType } from "vue";

import {
    ActivateAccountContentTextInterface,
    ActivateAccountViewClassStylesInterface
} from "@/ui_types/activate_account_view_type";

import { InputGroupUIPropsInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { ContentCardUIPropsInterface } from "@ui/version_3/ui_types/content_card_ui_type";
import { ToasterUIPropsInterface } from "@ui/version_3/ui_types/toaster_ui_type";

export interface TwoFactorSetupViewPropsInterface {
    class_styles: ActivateAccountViewClassStylesInterface;

    content_text: ActivateAccountContentTextInterface;

    qr_code_data_url: string;

    secret_key_card_props: ContentCardUIPropsInterface;

    otp_input_group_props: InputGroupUIPropsInterface;

    back_btn_props: ButtonUIPropsInterface;

    submit_btn_props: ButtonUIPropsInterface;

    toast_alert_props: ToasterUIPropsInterface;
}

const TwoFactorSetupViewProps = {
    class_styles: {
        type: Object as PropType<ActivateAccountViewClassStylesInterface>,
        required: true
    },

    content_text: {
        type: Object as PropType<ActivateAccountContentTextInterface>,
        required: true
    },

    qr_code_data_url: {
        type: String,
        required: true
    },

    secret_key_card_props: {
        type: Object as PropType<ContentCardUIPropsInterface>,
        required: true
    },

    otp_input_group_props: {
        type: Object as PropType<InputGroupUIPropsInterface>,
        required: true
    },

    back_btn_props: {
        type: Object as PropType<ButtonUIPropsInterface>,
        required: true
    },

    submit_btn_props: {
        type: Object as PropType<ButtonUIPropsInterface>,
        required: true
    },

    toast_alert_props: {
        type: Object as PropType<ToasterUIPropsInterface>,
        required: true
    }
} satisfies Record<keyof TwoFactorSetupViewPropsInterface, any>;

export default TwoFactorSetupViewProps;
