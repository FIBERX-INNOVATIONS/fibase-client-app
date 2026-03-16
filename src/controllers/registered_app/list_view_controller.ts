
import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";

class RegisteredAppListViewController extends BaseListViewController {

    protected getPageContentKey(): string {
        return "registered_app";
    }

    protected getChildUIComponents() {
        return { };
    }

    protected getChildUIStateData() {
        return { };
    }

    protected async handleChildMountedLogic(): Promise<void> {
       
    }

}

export default RegisteredAppListViewController;