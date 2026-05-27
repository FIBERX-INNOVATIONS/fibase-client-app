import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

import { ComputedDefinitionType, WatchersType } from "@ui/version_3/types/base_type";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    ProfileViewClassStylesInterface
} from "@/ui_types/profile_view_type";

import ProfileViewClassStyles from "@/class_styles/profile_view_class_styles";
import ImageRenderUI from "@ui/version_3/components/ImageRenderUI.vue";

class BaseProfileViewController<T = any> extends BaseController<
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface<T>,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly class_styles: ProfileViewClassStylesInterface = ProfileViewClassStyles;

    public action_handler: BaseProfileViewActionHandler<
        T,
        ProfileViewPropsInterface,
        ProfileViewStateDataInterface,
        ProfileViewComputedDataInterface,
        ProfileViewComponentsInterface,
        GlobalEventTypes
    > | null = null;

    constructor(props: ProfileViewPropsInterface) {
        super("profile_view", props, EventBus);
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
    protected getBaseUIComponents(): ProfileViewComponentsInterface {
        return {
            ImageRenderUI
        };
    }

    /**
     * Child controllers can extend components
     */
    protected getChildUIComponents(): Partial<ProfileViewComponentsInterface> {
        return {};
    }

    /**
     * Merge base + child components
     */
    protected getUIComponents(): ProfileViewComponentsInterface {
        return {
            ...this.getBaseUIComponents(),
            ...this.getChildUIComponents()
        };
    }

    /**
     * Base state
     */
    protected getBaseUIStateData(): ProfileViewStateDataInterface {
        return {
            is_loading: false,

            profile_record: this.props?.record
        } as ProfileViewStateDataInterface;
    }

    /**
     * Child state extension
     */
    protected getChildUIStateData(): Partial<ProfileViewStateDataInterface> {
        return {};
    }

    /**
     * Merge base + child state
     */
    protected getUIStateData(): ProfileViewStateDataInterface {
        return {
            ...this.getBaseUIStateData(),
            ...this.getChildUIStateData()
        };
    }

    /**
     * Base computed
     */
    protected getBaseUIComputedData(): ComputedDefinitionType<ProfileViewComputedDataInterface> {
        return {} as ComputedDefinitionType<ProfileViewComputedDataInterface>;
    }

    /**
     * Child computed
     */
    protected getChildUIComputedData(): ComputedDefinitionType<
        Partial<ProfileViewComputedDataInterface>
    > {
        return {} as ComputedDefinitionType<ProfileViewComputedDataInterface>;
    }

    /**
     * Merge base + child computed data
     */
    protected getUIComputedData(): ComputedDefinitionType<ProfileViewComputedDataInterface> {
        return {
            ...this.getBaseUIComputedData(),
            ...this.getChildUIComputedData()
        } as ComputedDefinitionType<ProfileViewComputedDataInterface>;
    }

    /**
     * Base mounted logic
     */
    protected async handleOnMountedLogic(): Promise<void> {
        await this.handleChildMountedLogic();

        await this.action_handler?.fetchRecord();
    }

    /**
     * Child mounted logic
     */
    protected async handleChildMountedLogic(): Promise<void> {}

    /**
     * Base Mounted logic
     */
    protected getUIWatchers(): WatchersType<
        ProfileViewPropsInterface,
        ProfileViewStateDataInterface
    > {
        return {
            record_id: this.action_handler?.fetchRecord
        };
    }
}

export default BaseProfileViewController;
