

import BaseController  from "@ui/version_3/base_classes/base_controller";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { 
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface,
    DashboardLayoutClassStylesInterface,
} from "@/ui_types//dashboard_layout_type";

import DashboardLayoutClassstyles from "@/class_styles/dashboard_layout_class_styles";

import TopBarUI from "@/components/TopBarUI.vue";
import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";



class DashboardLayoutController extends BaseController<
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface
>{
    public class_styles: DashboardLayoutClassStylesInterface = DashboardLayoutClassstyles;

    constructor(props: DashboardLayoutPropsInterface) {

        super("dashbord_layout", props);

        this.getComponentDefinition();

    }

    protected getUIComponents(): DashboardLayoutComponentsInterface {

        return { 
            TopBarUI
        };

    }

    protected getUIStateData(): DashboardLayoutStateDataInterface {
        return { };

    }

    protected getUIComputedData(): ComputedDefinitionType<DashboardLayoutComputedDataInterface> {

        return {};

    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated    = MemberAuthenticatorUtil.isFullyLoggedIn();

        if(!is_fully_authenticated) { 
            await this.router.push("/logout") 
        }
    }

}

export default DashboardLayoutController;