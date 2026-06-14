import { PropType } from "vue";

import { MemberRecordInterface } from "@/types/api_service_type";

import { MyProfileViewClassStylesInterface, MyProfileViewPropsInterface } from "@/ui_types/my_profile_view_type";

const MyProfileFormViewProps = {
    record: {
        type: Object as PropType<MemberRecordInterface>,
        default: () => ({})
    },

    class_styles: {
        type: Object as PropType<MyProfileViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof MyProfileViewPropsInterface, any>;

export default MyProfileFormViewProps;
