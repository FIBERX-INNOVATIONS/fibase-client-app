

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import LoggerUtil from "@ui/version_3/utils/logger_util";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import {
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    FetchRecordMethod
} from "@/ui_types/profile_view_type";




class BaseProfileViewActionHandler<
    T,
    Props extends ProfileViewPropsInterface,
    State extends ProfileViewStateDataInterface,
    Computed extends ProfileViewComputedDataInterface,
    Components extends ProfileViewComponentsInterface,
    Events extends GlobalEventTypes,
> {

    public readonly name: string;

    protected controller: BaseProfileViewController<T>;

    protected logger: LoggerUtil;

    protected content_manager = ContentManagerUtil.getInstance();


    protected fetch_profile_record?: FetchRecordMethod<T>;


    constructor(
        controller: BaseProfileViewController<T>,
        name: string = "base_profile_view_action_handler",
        fetch_profile_record?: FetchRecordMethod<T>
    ) {

        this.name = name;

        this.controller = controller;

        this.fetch_profile_record = fetch_profile_record;

        this.logger = new LoggerUtil({
            prefix: name,
            show_timestamp: false
        });

    }

    // Method to get content message
    protected getContentMessage = (message_key: string): string => {

        return this.content_manager.getAPIResponseValue(message_key);

    }


    // Method to fetch records from API
    public fetchRecord = async (): Promise<void> => {
        this.controller.state_refs.is_loading.value = true;

        try {
            if (!this.fetch_profile_record) {
                throw new Error("fetch_profile_record not defined");
            }

            const {
                record_id,
                record
            } = this.controller?.props;

            if(!record_id || Object.keys(record).length > 3) {
                return;
            }

            const response = await this.fetch_profile_record(record_id);

            if(!response || response.status === "logout") {
                this.controller.router.push("/logout");
                return;
            }

            if(response.data) {
                const current_record = response.data;

                this.controller.state_refs.profile_record.value = current_record;
                return;
            }
        }
        catch (error: unknown) {
            this.logger.error("Error fetching record:", error);
        }
        finally {
           this.controller.state_refs.is_loading.value = false;
        }

    }

}

export default BaseProfileViewActionHandler