import { markRaw } from "vue";

import {
    ClearRouteQueryHandlerParamsEventPayloadInterface,
    CloseModalEventPayloadInterface,
    GlobalEventTypes,
    OpenModalEventPayloadInterface
} from "@/types/global_events_type";

import {
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface,
    DashboardRouteQueryHandler
} from "@/ui_types/dashboard_layout_type";
import {
    ModalUIActionPropsInterface,
    ModalUIPropsExtendedInterface,
    ModalUIPropsInterface
} from "@ui/version_3/ui_types/modal_ui_type";

import { RouteLocationNormalizedLoaded } from "vue-router";

import MemberProfileView from "@/views/member_profile/ProfileView.vue";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import DashboardLayoutClassStyles from "@/class_styles/dashboard_layout_class_styles";

import ModalUIPropsBuilder from "@ui/version_3/props_builder/modal_ui_props_builder";

class DashboardLayoutActionHandler extends BaseActionHandler<
    DashboardLayoutPropsInterface,
    DashboardLayoutStateDataInterface,
    DashboardLayoutComputedDataInterface,
    DashboardLayoutComponentsInterface,
    GlobalEventTypes
> {
    public readonly name = "dashboard_layout_action_handler";

    private last_handled_route_query_action_key: string | null = null;

    constructor(
        controller: BaseController<
            DashboardLayoutPropsInterface,
            DashboardLayoutStateDataInterface,
            DashboardLayoutComputedDataInterface,
            DashboardLayoutComponentsInterface,
            GlobalEventTypes
        >
    ) {
        super(controller, "dashboard_layout_action_handler");
    }

    // Method to handle getting default modal props
    private getDefaultModalProps = (modal_index: number, content_key: string): ModalUIPropsInterface => {
        const { modal_class_style, side_bar_class_style } = DashboardLayoutClassStyles;

        return ModalUIPropsBuilder.getReactivePropsObjectFromContentData(modal_index, content_key, {
            class_styles: modal_class_style,
            content_props: {
                close_btn_icon_key: "x_circile_svg_icon"
            },
            overlay_props: {
                id: `Modal-${modal_index}-Overlay`,
                class_styles: side_bar_class_style.overlay_class_style,
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

    // Method to open member profile view modal
    private openMemberProfileModal = (record_id: string): void => {
        const modal_payload: OpenModalEventPayloadInterface = {
            content_key: "content_resource.member_profile_view_ui.modals_ui.profile_details_modal_ui",
            animation_type: "slide_top",
            body_component: markRaw(MemberProfileView),
            body_props: { record_id }
        };

        this.handleOpenModal(modal_payload);
    };

    // Method to get route query handlers
    private getRouteQueryHandlers(): DashboardRouteQueryHandler[] {
        return [
            {
                query_key: "member_profile",
                handler: this.openMemberProfileModal
            }
        ];
    }

    // Method to get first route query we are watching for
    private getFirstQueryValue(value: RouteLocationNormalizedLoaded["query"][string]): string {
        const query_value = Array.isArray(value) ? value[0] : value;

        return query_value?.toString?.() ?? "";
    }

    // Method to handle closing modal
    public handleCloseModal = (payload: CloseModalEventPayloadInterface): boolean => {
        const modal_index = payload.modal_index;
        const current_modals = this.getState("modals") ?? [];
        const modal_count = current_modals.length;

        if (modal_count <= 0) {
            return true;
        }

        const index_to_close =
            typeof modal_index === "number" && modal_index >= 0 && modal_index < modal_count ? modal_index : modal_count - 1;

        const next_modals = current_modals.filter((_, index) => index !== index_to_close);

        this.setState("modals", next_modals);

        return true;
    };

    // Method to handle open modal
    public handleOpenModal = <
        BodyProps extends Record<string, any> = Record<string, any>,
        FooterProps extends Record<string, any> = Record<string, any>
    >(
        payload: OpenModalEventPayloadInterface<BodyProps, FooterProps>
    ): boolean => {
        const { state_refs } = this.controller;

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
        } as ModalUIPropsExtendedInterface;

        const existing_modals = this.getState("modals") ?? [];

        this.setState("modals", [...existing_modals, modal_props]);

        return true;
    };

    // Method to handle route change event
    public handleRouteQueryActions = (route: RouteLocationNormalizedLoaded): void => {
        const route_query_handlers = this.getRouteQueryHandlers();

        for (const { query_key, handler } of route_query_handlers) {
            const query_value = this.getFirstQueryValue(route.query[query_key]);

            if (!query_value) {
                continue;
            }

            const route_query_action_key = `${query_key}:${query_value}`;

            if (this.last_handled_route_query_action_key === route_query_action_key) {
                return;
            }

            this.last_handled_route_query_action_key = route_query_action_key;
            handler(query_value);
            return;
        }

        this.last_handled_route_query_action_key = null;
    };

    // Method to clear query params that are owned by route query handlers.
    public handleClearRouteQueryHandlerParams = async (
        payload?: ClearRouteQueryHandlerParamsEventPayloadInterface
    ): Promise<void> => {
        const query_keys = payload?.query_keys?.length
            ? payload.query_keys
            : this.getRouteQueryHandlers().map(({ query_key }) => query_key);
        const next_query = { ...this.controller.route.query };
        let has_query_to_remove = false;

        query_keys.forEach((query_key) => {
            if (Object.prototype.hasOwnProperty.call(next_query, query_key)) {
                delete next_query[query_key];
                has_query_to_remove = true;
            }
        });

        if (!has_query_to_remove) {
            return;
        }

        this.last_handled_route_query_action_key = null;
        await this.controller.router.replace({ query: next_query });
    };
}

export default DashboardLayoutActionHandler;
