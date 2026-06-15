import { PropType } from "vue";

import {
    ActivateAccountViewClassStylesInterface,
    ActivateAccountViewPropsInterface
} from "@/ui_types/activate_account_view_type";

const ActivateAccountViewProps = {
    class_styles: {
        type: Object as PropType<ActivateAccountViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof ActivateAccountViewPropsInterface, any>;

export default ActivateAccountViewProps;
