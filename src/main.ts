import { Component, createApp, App as VueApp } from "vue";
import { Router } from "vue-router";

import LoggerUtil                   from "@ui/version_2/utils/logger_util";
import ContentManagerUtil           from "@ui/version_3/utils/content_manager_util";
import AppRootComponent             from "@/app_root/AppRoot.vue";
import RouterManager                from "@/router";

import {
    APP_CONTENT_DATA_URL
} from "@/configs/constants"

class FibaseClientApp {
    public readonly name = "fibase_client_app";
    private readonly app_component: Component = AppRootComponent;
    private readonly vue_app: VueApp = createApp(this.app_component);
    
    private route_manager: RouterManager = new RouterManager();
    private readonly router: Router = this.route_manager.getRouter();

    private readonly logger: LoggerUtil = new LoggerUtil({ prefix: this.name, show_timestamp: false });
    private readonly content_manager: ContentManagerUtil = ContentManagerUtil.getInstance();

    constructor(app_component: any) { }

    // Method to get app content_data
    private async getAppContentData(): Promise<void> {
        await this.content_manager.load(APP_CONTENT_DATA_URL, "content_resource"); 
        this.content_manager.mergeAllAPIResponsesObjects();
    }

    // Method to mount root app component
    public  async mountApp (selector: string): Promise<void> {
        await this.getAppContentData();

        this.vue_app.use(this.router);
        this.vue_app.mount(selector);
    }

}

export default FibaseClientApp;

// Create and mount the Vue app
const main = async () => {
    const vueApp = new FibaseClientApp(AppRootComponent);
    await vueApp.mountApp("#app");
};

main();