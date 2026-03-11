import { Component, createApp, App as VueApp } from "vue";
import { Router } from "vue-router";

import LoggerUtil                   from "@ui/version_2/utils/logger_util";
import ContentManagerUtil           from "@ui/version_3/utils/content_manager_util";
import AppRootComponent             from "@/app_root/AppRoot.vue";
import RouterManager                from "@/router";
import APIClient                    from "@ui/version_3/api_utils/api_client_util";
import RetryManagerUtil             from "@ui/version_3/api_utils/retry_manager_util";
import AuthAPIService               from "@/api_services/auth_api_service";
import EncryptorDecryptorUtil       from "@ui/version_3/utils/encryptor_decryptor_util";
import LocalStorageManagerUtil      from "@ui/version_3/utils/local_storage_manager_util";

import {
    API_CLIENT_CONFIG,
    APP_CONTENT_DATA_URL,
    CHAR_CORPUS,
    DATA_SHIFT_KEY,
    STORAGE_SCHEMA
} from "@/configs/constants";



class FibaseClientApp {
    public readonly name = "fibase_client_app";
    private readonly app_component: Component = AppRootComponent;
    private readonly vue_app: VueApp = createApp(this.app_component);
    
    private route_manager: RouterManager = new RouterManager();
    private readonly router: Router = this.route_manager.getRouter();

    private readonly logger: LoggerUtil = new LoggerUtil({ prefix: this.name, show_timestamp: false });
    private readonly content_manager: ContentManagerUtil = ContentManagerUtil.getInstance();

    constructor() { }

    // Method to get app content_data
    private async getAppContentData(): Promise<void> {
        await this.content_manager.load(APP_CONTENT_DATA_URL, "content_resource"); 
        this.content_manager.mergeAllAPIResponsesObjects();
    }

    // Method to initialize Utils
    private async initUtils (): Promise<void> {
        EncryptorDecryptorUtil.init({
            corpus: CHAR_CORPUS,
            shift_key: DATA_SHIFT_KEY
        });

        LocalStorageManagerUtil.init(STORAGE_SCHEMA);
    }

    // Method to initialize axios api client
    private async initApiClient (): Promise<void> {
        APIClient.init(API_CLIENT_CONFIG);

        RetryManagerUtil.registerRefreshTokenHandler (
            AuthAPIService.refreshAccessTokenRetry
        );
    }

    // Method to mount root app component
    public  async mountApp (selector: string): Promise<void> {
        await this.getAppContentData();

        await this.initUtils();

        await this.initApiClient();

        this.vue_app.use(this.router);
        this.vue_app.mount(selector);
    }

}

export default FibaseClientApp;

// Create and mount the Vue app
const main = async () => {
    const vueApp = new FibaseClientApp();
    await vueApp.mountApp("#app");
};

main();