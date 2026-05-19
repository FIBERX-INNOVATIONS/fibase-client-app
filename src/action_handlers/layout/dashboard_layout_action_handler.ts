import BaseController from "@ui/version_3/base_classes/base_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import {
    CloseModalEventPayloadInterface,
    GlobalEventTypes,
    OpenModalEventPayloadInterface
} from "@/types/global_events_type";

import {
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface
} from "@/ui_types/dashboard_layout_type";
import { ModalUIActionPropsInterface, ModalUIPropsInterface } from "@ui/version_3/ui_types/modal_ui_type";
import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";
import ModalUIPropsBuilder from "@ui/version_3/props_builder/modal_ui_props_builder";

class DashbaordLayoutActionHandler {
    public readonly name = "dashboard_layout_action_handler";

    // Make controller static so it’s shared across all usage
    private controller: BaseController<
        DashboardLayoutPropsInterface,
        DashboardLayoutStateDataInterface,
        DashboardLayoutComputedDataInterface,
        DashboardLayoutComponentsInterface,
        GlobalEventTypes
    >;

    private readonly logger: LoggerUtil = new LoggerUtil({ prefix: this.name, show_timestamp: false });

    constructor(
        controller: BaseController<
            DashboardLayoutPropsInterface,
            DashboardLayoutStateDataInterface,
            DashboardLayoutComputedDataInterface,
            DashboardLayoutComponentsInterface,
            GlobalEventTypes
        >
    ) {
        this.controller = controller;
    }

    // Method to handle getting default modal props
    private getDefaultModalProps = (modal_index: number, content_key: string): ModalUIPropsInterface => {
        return ModalUIPropsBuilder.getReactivePropsObjectFromContentData(modal_index, content_key, {
            class_styles: DashboardLayoutClassStyles.modal_class_style,
            content_props: {
                close_btn_icon_key: "x_circile_svg_icon"
            },
            overlay_props: {
                id: `Modal-${modal_index}-Overlay`,
                class_styles: DashboardLayoutClassStyles.side_bar_class_style.overlay_class_style,
                model_value: true,
                boolean_props: {
                    close_on_overlay_click: false,
                    lock_scroll: true
                }
            }
        });
    };

    // Method to get modal action props config
    private getModalActionPropsConfig = (): ModalUIActionPropsInterface => {
        return {
            on_close: async (event?: Event, config?: { props: ModalUIPropsInterface }): Promise<void> => {
                if (!config?.props?.layer) {
                    return;
                }

                const modal_index = config?.props?.layer - 1;

                this.handleCloseModal({ modal_index });
            }
        };
    };

    // Method to handle closing modal
    public handleCloseModal = (payload: CloseModalEventPayloadInterface): boolean => {
        let { modal_index = 0 } = payload;
        const { modals } = this.controller.state_refs;
        const modal_count = modals.value.length;
        let index_to_close = modal_count - 1;

        if (modal_index && modal_index > 0 && modal_index < modal_count) {
            index_to_close = modal_index;
        }

        this.controller.state_refs.modals?.value.splice(index_to_close, 1);
        return true;
    };

    // Method to handle open modal
    public handleOpenModal = <
        BodyProps extends Record<string, any> = Record<string, any>,
        FooterProps extends Record<string, any> = Record<string, any>
    >(
        payload: OpenModalEventPayloadInterface<BodyProps, FooterProps>
    ): boolean => {
        const { props, state_refs } = this.controller;

        const modal_index = (state_refs.modals.value?.length ?? 0) + 1;

        const {
            content_key,

            animation_type,

            body_component,

            footer_component,

            body_props,

            footer_props
        } = payload;

        const default_modal_props = this.getDefaultModalProps(modal_index, content_key);

        const modal_props = {
            ...default_modal_props,
            layer: modal_index,
            animation_type,
            action_props: this.getModalActionPropsConfig(),
            body_component,
            footer_component,
            body_props,
            footer_props
        };

        this.controller.state_refs.modals.value.push(modal_props);

        return true;
    };
}

export default DashbaordLayoutActionHandler;
