import { GlobalEventTypes } from "@/types/global_events_type";

import {
    FetchRecordMethod,
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface
} from "@/ui_types/profile_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import BaseActionHandler from "@ui/version_3/base_classes/base_action_handler";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

class BaseProfileViewActionHandler<
    T extends object = Record<string, unknown>,
    Props extends ProfileViewPropsInterface<T> = ProfileViewPropsInterface<T>,
    State extends ProfileViewStateDataInterface<T> = ProfileViewStateDataInterface<T>,
    Computed extends ProfileViewComputedDataInterface = ProfileViewComputedDataInterface,
    Components extends ProfileViewComponentsInterface = ProfileViewComponentsInterface,
    Events extends GlobalEventTypes = GlobalEventTypes
> extends BaseActionHandler<Props, State, Computed, Components, Events> {
    public readonly name: string;

    protected override controller: BaseProfileViewController<
        T,
        Props,
        State,
        Computed,
        Components,
        Events
    >;

    protected content_manager = ContentManagerUtil.getInstance();

    protected fetch_profile_record?: FetchRecordMethod<T>;

    constructor(
        controller: BaseProfileViewController<T, Props, State, Computed, Components, Events>,
        name: string = "base_profile_view_action_handler",
        fetch_profile_record?: FetchRecordMethod<T>
    ) {
        super(controller as BaseController<Props, State, Computed, Components, Events>, name);

        this.name = name;

        this.controller = controller;

        this.fetch_profile_record = fetch_profile_record;
    }

    // Method to get content message from content manager util
    protected getContentMessage = (message_key: string): string => {
        return this.content_manager.getAPIResponseValue(message_key);
    };

    // Method to help fetch profile record from API
    public fetchRecord = async (): Promise<void> => {
        this.setState("is_loading", true as State["is_loading"]);

        try {
            if (!this.fetch_profile_record) {
                throw new Error("fetch_profile_record not defined");
            }

            const { record_id } = this.controller.props;

            if (!record_id) {
                return;
            }

            const response = await this.fetch_profile_record(record_id);

            if (!response || response.status === "logout") {
                this.controller.router.push("/logout");
                return;
            }

            if (response.data) {
                const profile_record = {
                    ...(this.controller.props.record ?? {}),
                    ...response.data
                } as T;

                this.setState("profile_record", profile_record as State["profile_record"]);
            }
        } catch (error: unknown) {
            this.logError("fetchRecord", error);
        } finally {
            this.setState("is_loading", false as State["is_loading"]);
        }
    };
}

export default BaseProfileViewActionHandler;
