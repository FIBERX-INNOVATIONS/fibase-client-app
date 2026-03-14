
import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util"

import {  GlobalEventTypes } from "@/types/global_events_type";

import { sleep } from "@ui/version_3/utils/debounce_util";

import {
    LogoutViewPropsInterface,
    LogoutViewStateDataInterface,
    LogoutViewComputedDataInterface,
    LogoutViewComponentsInterface
} from "@/ui_types/logout_view_type";
import AuthAPIService from "@/api_services/auth_api_service";




class LogoutViewActionHandler {
    public readonly name = "logout_view_action_handler";

    // Make controller static so it’s shared across all usage
    private controller: BaseController<
        LogoutViewPropsInterface, 
        LogoutViewStateDataInterface, 
        LogoutViewComputedDataInterface, 
        LogoutViewComponentsInterface,
        GlobalEventTypes
    >;

    private readonly logger: LoggerUtil = new LoggerUtil({ prefix: this.name, show_timestamp: false });

    constructor(
        controller: BaseController<
            LogoutViewPropsInterface,
            LogoutViewStateDataInterface,
            LogoutViewComputedDataInterface,
            LogoutViewComponentsInterface,
            GlobalEventTypes
        >
    ) {
        this.controller = controller;
    }

    public handleLogoutAction = async () => {
        await sleep(2000)
        await AuthAPIService.logOut();
        await this.controller.router.push("/login");
    }

}

export default LogoutViewActionHandler;