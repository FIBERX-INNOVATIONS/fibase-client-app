import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    AuthLayoutPropsInterface,
    AuthLayoutStateDataInterface,
    AuthLayoutComputedDataInterface,
    AuthLayoutComponentsInterface
} from "@/ui_types/auth_layout_type";

import CopyRightUI from "@ui/version_3/components/CopyRightUI.vue";
import CopyRightUIPropsBuilder from "@ui/version_3/props_builder/copy_right_ui_props_builder";
import CopyRightUIClassStyles from "@/class_styles/copy_right_ui_class_styles";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

class AuthLayoutController extends BaseController<
    AuthLayoutPropsInterface,
    AuthLayoutStateDataInterface,
    AuthLayoutComputedDataInterface,
    AuthLayoutComponentsInterface,
    GlobalEventTypes
> {
    constructor(props: AuthLayoutPropsInterface) {
        super("auth_layout", props, EventBus);

        this.getComponentDefinition();
    }

    // Method to get ui components
    protected getUIComponents(): AuthLayoutComponentsInterface {
        return { CopyRightUI };
    }

    // Method to get state data
    protected getUIStateData(): AuthLayoutStateDataInterface {
        CopyRightUIPropsBuilder.configure(CopyRightUIClassStyles);

        return {
            copyright_props: CopyRightUIPropsBuilder.getReactivePropsObject()
        } as AuthLayoutStateDataInterface;
    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();

        if (is_fully_authenticated && this.route.name !== "Logout") {
            await this.router.push("/dashboard");
        }
    }
}

export default AuthLayoutController;
