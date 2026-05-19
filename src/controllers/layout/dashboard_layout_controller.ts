import BaseController from "@ui/version_3/base_classes/base_controller";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface,
    DashboardLayoutClassStylesInterface
} from "@/ui_types//dashboard_layout_type";

import { ModalUIPropsExtendedInterface } from "@ui/version_3/ui_types/modal_ui_type";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import TopBarUI from "@/components/TopBarUI.vue";
import SideBarUI from "@/components/SideBarUI.vue";
import ModalUI from "@ui/version_3/components/ModalUI.vue";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";
import ModalUIPropsBuilder from "@ui/version_3/props_builder/modal_ui_props_builder";
import DashbaordLayoutActionHandler from "@/action_handlers/layout/dashboard_layout_action_handler";

class DashboardLayoutController extends BaseController<
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface,
    GlobalEventTypes
> {
    public class_styles: DashboardLayoutClassStylesInterface = DashboardLayoutClassStyles;

    public action_handler: DashbaordLayoutActionHandler = new DashbaordLayoutActionHandler(this);

    constructor(props: DashboardLayoutPropsInterface) {
        super("dashbord_layout", props, EventBus);

        this.getComponentDefinition();
    }

    protected getUIComponents(): DashboardLayoutComponentsInterface {
        return { TopBarUI, SideBarUI, ModalUI };
    }

    protected getUIStateData(): DashboardLayoutStateDataInterface {
        const default_modal_props = ModalUIPropsBuilder.configure({
            class_styles: DashboardLayoutClassStyles.modal_class_style,
            default_overlay_props: {
                id: "",
                class_styles: DashboardLayoutClassStyles.side_bar_class_style.overlay_class_style
            }
        });

        return {
            modals: [] as ModalUIPropsExtendedInterface[]
        };
    }

    protected getUIComputedData(): ComputedDefinitionType<DashboardLayoutComputedDataInterface> {
        return {};
    }

    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated = MemberAuthenticatorUtil.isFullyLoggedIn();

        if (!is_fully_authenticated) {
            await this.router.push("/logout");
        }

        this.event_bus?.on("close_modal", this.action_handler.handleCloseModal);

        this.event_bus?.on("open_modal", this.action_handler.handleOpenModal);
    }
}

export default DashboardLayoutController;
