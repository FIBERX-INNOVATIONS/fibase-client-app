import BaseController from "@ui/version_3/base_classes/base_controller";
import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    LogoutViewPropsInterface,
    LogoutViewStateDataInterface,
    LogoutViewComputedDataInterface,
    LogoutViewComponentsInterface
} from "@/ui_types/logout_view_type";
import AuthAPIService from "@/api_services/auth_api_service";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

class LogoutViewActionHandler extends BaseActionHandler<
    LogoutViewPropsInterface,
    LogoutViewStateDataInterface,
    LogoutViewComputedDataInterface,
    LogoutViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly name = "logout_view_action_handler";

    private logout_timer: ReturnType<typeof setTimeout> | null = null;

    constructor(
        controller: BaseController<
            LogoutViewPropsInterface,
            LogoutViewStateDataInterface,
            LogoutViewComputedDataInterface,
            LogoutViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "logout_view_action_handler");
    }

    public handleLogoutAction = async (): Promise<void> => {
        this.cleanup();

        this.logout_timer = setTimeout(async () => {
            try {
                await AuthAPIService.logOut();
            } catch (error: unknown) {
                this.logger.error("Failed to log out", error);
            } finally {
                this.logout_timer = null;
                MemberAuthenticatorUtil.onlogoutSuccess();
                await this.controller.router.push("/login");
            }
        }, 2000);
    };

    public cleanup(): void {
        if (!this.logout_timer) {
            return;
        }

        clearTimeout(this.logout_timer);
        this.logout_timer = null;
    }
}

export default LogoutViewActionHandler;
