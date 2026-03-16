import BaseController from "@ui/version_3/base_classes/base_controller";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    ListViewClassStylesInterface
} from "@/ui_types/list_view_type";

import ListViewClassStyles from "@/class_styles/list_view_class_styles";

import BreadcrumbUI from "@ui/version_3/components/BreadcrumbUI.vue"

import BreadcrumbUIPropsBuilder from "@ui/version_3/props_builder/breadcrumb_ui_props_builder";

class BaseListViewController extends BaseController<
    ListViewPropsInterface,
    ListViewStateDataInterface,
    ListViewComputedDataInterface,
    ListViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly list_view_class_styles: ListViewClassStylesInterface = ListViewClassStyles;

    constructor(props: ListViewPropsInterface) {
        super("list_view", props, EventBus);
        this.getComponentDefinition();
    }

    /**
     * Page name used to resolve content paths.
     * Child controllers override this.
     */
    protected getPageContentKey(): string {
        return "registered_app";
    }

    /**
     * Base UI Components
     */
    protected getBaseUIComponents(): ListViewComponentsInterface {
        return {
            BreadcrumbUI
        };
    }

    /**
     * Child controllers can extend components
     */
    protected getChildUIComponents(): Partial<ListViewComponentsInterface> {
        return {};
    }

    /**
     * Merge base + child components
     */
    protected getUIComponents(): ListViewComponentsInterface {
        return {
            ...this.getBaseUIComponents(),
            ...this.getChildUIComponents()
        };
    }

    /**
     * Base state
     */
    protected getBaseUIStateData(): ListViewStateDataInterface {

        const pageKey = this.getPageContentKey();

        return {
            breadcrumb_props: BreadcrumbUIPropsBuilder.getReactivePropsObjectFromContent(
                "PageBreadcrumb",
                `content_resource.${pageKey}_view_ui.list_view_ui.breadcrumb_list`,
                "",
                ListViewClassStyles.list_view_breadcrumb_class_styles
            )
        } as ListViewStateDataInterface;
    }

    /**
     * Child state extension
     */
    protected getChildUIStateData(): Partial<ListViewStateDataInterface> {
        return {};
    }

    /**
     * Merge base + child state
     */
    protected getUIStateData(): ListViewStateDataInterface {
        return {
            ...this.getBaseUIStateData(),
            ...this.getChildUIStateData()
        };
    }

    /**
     * Base mounted logic
     */
    protected async handleOnMountedLogic(): Promise<void> {
        await this.handleChildMountedLogic();
    }

    /**
     * Child mounted logic
     */
    protected async handleChildMountedLogic(): Promise<void> {}
}

export default BaseListViewController;