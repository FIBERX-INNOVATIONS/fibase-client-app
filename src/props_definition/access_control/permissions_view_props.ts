import { PropType } from "vue";

import { PermissionRecordInterface, RoleRecordInterface } from "@/types/api_service_type";

import {
    AccessControlPermissionsViewClassStylesInterface,
    AccessControlPermissionsViewModeType,
    AccessControlPermissionsViewPropsInterface
} from "@/ui_types/access_control_permissions_view_type";

const AccessControlPermissionsViewProps = {
    record: {
        type: Object as PropType<RoleRecordInterface>,
        required: true
    },

    record_id: {
        type: [String, Number] as PropType<string>,
        default: ""
    },

    mode: {
        type: String as PropType<AccessControlPermissionsViewModeType>,
        default: "assigned"
    },

    content_key: {
        type: String,
        default: ""
    },

    class_styles: {
        type: Object as PropType<Partial<AccessControlPermissionsViewClassStylesInterface>>,
        default: undefined
    },

    on_permissions_changed: {
        type: Function as PropType<
            (record: RoleRecordInterface, permissions: PermissionRecordInterface[]) => Promise<void> | void
        >,
        default: undefined
    }
} satisfies Record<keyof AccessControlPermissionsViewPropsInterface, any>;

export default AccessControlPermissionsViewProps;
