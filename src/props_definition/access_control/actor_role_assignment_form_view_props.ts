import { PropType } from "vue";

import {
    ActorRoleAssignmentActorType,
    ActorRoleAssignmentFormViewPropsInterface,
    ActorRoleAssignmentSuccessCallback,
    FormViewClassStylesInterface
} from "@/ui_types/form_view_type";

const ActorRoleAssignmentFormViewProps = {
    actor_type: {
        type: String as PropType<ActorRoleAssignmentActorType>,
        require: false,
        default: "member"
    },

    actor_id: {
        type: [String, Number] as PropType<string | number>,
        require: false,
        default: ""
    },

    role_ids: {
        type: Array as PropType<Array<string | number>>,
        require: false,
        default: () => []
    },

    actor_read_only: {
        type: Boolean,
        require: false,
        default: false
    },

    content_key: {
        type: String,
        require: false,
        default: ""
    },

    record: {
        type: Object as PropType<any>,
        require: false,
        default: undefined
    },

    on_success: {
        type: Function as PropType<ActorRoleAssignmentSuccessCallback>,
        require: false,
        default: undefined
    },

    class_styles: {
        type: Object as PropType<FormViewClassStylesInterface>,
        default: () => ({})
    }
} satisfies Record<keyof ActorRoleAssignmentFormViewPropsInterface, any>;

export default ActorRoleAssignmentFormViewProps;
