
import BaseController from "@ui/version_3/base_classes/base_controller";

import EventBus from "@/utils/global_event_bus_util";

import {
    AuthLayoutPropsInterface,
    AuthLayoutStateDataInterface,
    AuthLayoutComputedDataInterface,
    AuthLayoutComponentsInterface
} from "@/types/auth_layout_type";

import CopyRightUI from "@ui/version_3/components/CopyRightUI.vue";
import CopyRightUIPropsBuilder from "@ui/version_3/props_builder/copy_right_ui_props_builder";


class AuthLayoutController extends BaseController <
    AuthLayoutPropsInterface,
    AuthLayoutStateDataInterface,
    AuthLayoutComputedDataInterface,
    AuthLayoutComponentsInterface
> {
    private readonly event_bus = EventBus;

    constructor(props: AuthLayoutPropsInterface) {
        super("auth_layout", props);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): AuthLayoutComponentsInterface { 
        return  { CopyRightUI }; 
    }

    // Method to get state data
    protected getUIStateData(): AuthLayoutStateDataInterface {
        return {
            copyright_props: CopyRightUIPropsBuilder.getReactivePropsObject(),
        } as AuthLayoutStateDataInterface;
    }

}

export default AuthLayoutController