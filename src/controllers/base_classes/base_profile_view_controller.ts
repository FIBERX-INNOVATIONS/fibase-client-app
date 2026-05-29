import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { ComputedDefinitionType, WatchersType } from "@ui/version_3/types/base_type";

import {
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    ProfileViewClassStylesInterface,
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface
} from "@/ui_types/profile_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import ProfileViewClassStyles from "@/class_styles/profile_view_class_styles";

import ImageRenderUI from "@ui/version_3/components/ImageRenderUI.vue";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class BaseProfileViewController<
    T extends object = Record<string, unknown>,
    Props extends ProfileViewPropsInterface<T> = ProfileViewPropsInterface<T>,
    State extends ProfileViewStateDataInterface<T> = ProfileViewStateDataInterface<T>,
    Computed extends ProfileViewComputedDataInterface = ProfileViewComputedDataInterface,
    Components extends ProfileViewComponentsInterface = ProfileViewComponentsInterface,
    Events extends GlobalEventTypes = GlobalEventTypes
> extends BaseController<Props, State, Computed, Components, Events> {
    public readonly content_key: string = "";

    public readonly class_styles: ProfileViewClassStylesInterface;

    public content_obj: ProfileViewContentTextInterface = {} as ProfileViewContentTextInterface;

    public action_handler: BaseProfileViewActionHandler<
        T,
        Props,
        State,
        Computed,
        Components,
        Events
    > | null = null;

    protected content_manager = ContentManagerUtil.getInstance();

    constructor(
        props: Props,
        component_name: string = "profile_view",
        default_class_styles: ProfileViewClassStylesInterface = ProfileViewClassStyles
    ) {
        super(component_name, props, EventBus as any);

        this.class_styles = {
            ...default_class_styles,
            ...(props.class_styles ?? {})
        } as ProfileViewClassStylesInterface;
    }

    // Method to set profile action handler and ensure it's properly typed
    protected setProfileActionHandler(
        action_handler: BaseProfileViewActionHandler<T, Props, State, Computed, Components, Events>
    ): void {
        this.action_handler = action_handler;
        this.setActionHandler(action_handler);
    }

    // Method to get the base content key for the profile view, which can be used to fetch content from the content manager
    protected getBaseContentKey(page_key: string = this.content_key): string {
        return `content_resource.${page_key}_view_ui.profile_view_ui`;
    }

    // Method to get the base content keys for the profile view, which can be overridden by child classes to provide specific content keys
    protected getBaseProfileViewContentKeys(): ProfileViewContentKeysInterface {
        const base_content_key = this.getBaseContentKey();

        return {
            loading_text: `${base_content_key}.loading_text`,
            no_description_text: `${base_content_key}.no_description_text`
        };
    }

    // Method to get the child content keys for the profile view, which can be overridden by child classes to provide specific content keys
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        return {};
    }

    // Method to get the final content keys for the profile view by merging the base content keys and the child content keys, with child content keys taking precedence over base content keys
    public getProfileViewContentKeys(): ProfileViewContentKeysInterface {
        const content_keys = this.getBaseProfileViewContentKeys();
        const child_content_keys = this.getChildProfileViewContentKeys();

        Object.entries(child_content_keys).forEach(([key, value]) => {
            if (value !== undefined) {
                content_keys[key] = value;
            }
        });

        return content_keys;
    }

    // Method to get the content text for the profile view based on the content keys and the profile record, with fallbacks for missing content keys or content values
    protected getProfileViewContentFallbacks(): Partial<ProfileViewContentTextInterface> {
        return {
            loading_text: "Loading...",
            no_description_text: ""
        };
    }

    // Method to get the content text for the profile view by fetching the content values from the content manager using the content keys and the profile record, with fallbacks for missing content keys or content values
    protected getProfileViewContentText(
        record: T = this.getProfileRecord()
    ): ProfileViewContentTextInterface {
        const content_keys = this.getProfileViewContentKeys();
        const fallbacks = this.getProfileViewContentFallbacks();

        return Object.keys(content_keys).reduce((content_text, key) => {
            const content_key = content_keys[key];
            const fallback = fallbacks[key] ?? "";

            content_text[key] =
                this.content_manager.getWithRecord<string>(
                    content_key,
                    record as Record<string, unknown>,
                    fallback
                ) ?? fallback;

            return content_text;
        }, {} as ProfileViewContentTextInterface);
    }

    // Method to get the profile record from the state or props, with a fallback to an empty object if the profile record is not available in either the state or props
    protected getProfileRecord(): T {
        return (this.state_refs.profile_record?.value ?? this.props.record ?? {}) as T;
    }

    // Method to get the UI components for the profile view, which can be overridden by child classes to provide specific UI components
    protected getUIComponents(): Components {
        return {
            ImageRenderUI
        } as unknown as Components;
    }

    // Method to get the UI state data for the profile view, which can be overridden by child classes to provide specific UI state data, but by default it initializes the profile record from props and sets the content text based on the profile record
    protected getUIStateData(): State {
        const profile_record = (this.props.record ?? {}) as T;

        this.content_obj = this.getProfileViewContentText(profile_record);

        return {
            is_loading: false,

            profile_record,

            content_keys: this.getProfileViewContentKeys()
        } as State;
    }

    // Method to get the UI computed data for the profile view, which can be overridden by child classes to provide specific UI computed data, but by default it returns an empty object as there are no computed properties defined at the base level
    protected getUIComputedData(): ComputedDefinitionType<Computed> {
        return {} as ComputedDefinitionType<Computed>;
    }

    // Method to handle the logic that should be executed when the profile view component is mounted, which can be overridden by child classes to provide specific logic, but by default it triggers the fetchRecord action handler to fetch the profile record data when the component is mounted
    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler?.fetchRecord();
    }

    // Method to get the UI watchers for the profile view, which can be overridden by child classes to provide specific UI watchers, but by default it sets up a watcher on the record_id prop to trigger the fetchRecord action handler whenever the record_id prop changes, allowing the profile view to reactively fetch new profile data when a different record_id is passed in as a prop
    protected getUIWatchers(): WatchersType<Props, State> {
        return {
            record_id: this.action_handler?.fetchRecord
        };
    }
}

export default BaseProfileViewController;
