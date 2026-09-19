import { CSRF_TOKEN_FOR } from "@/configs/csrf_config";

import { APP_WEBHOOK_DELIVERY_PERMISSIONS } from "@/configs/permissions_config";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import type { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import type { AppWebhookDeliveryTestFormDataInterface } from "@/types/form_data_type";

import type { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import type { FormViewComputedDataInterface, FormViewComponentsInterface } from "@/ui_types/form_view_type";

import type {
    AppWebhookDeliveryTestFieldsType,
    AppWebhookDeliveryTestFormPropsInterface,
    AppWebhookDeliveryTestFormStateInterface
} from "@/ui_types/app_webhook_delivery_view_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import AppWebhookDeliveryTestFormViewActionHandler from "@/action_handlers/app_webhook_delivery/test_form_view_action_handler";

class AppWebhookDeliveryTestFormViewController extends BaseFormViewController<
    AppWebhookDeliveryTestFormDataInterface,
    AppWebhookDeliveryTestFieldsType,
    AppWebhookDeliveryTestFormPropsInterface,
    AppWebhookDeliveryTestFormStateInterface,
    FormViewComputedDataInterface,
    FormViewComponentsInterface
> {
    private readonly base_content_key = "content_resource.app_webhook_delivery_view_ui.form_view_ui";

    // Method to initialise the test form using the shared form and CSRF lifecycle.
    constructor(props: AppWebhookDeliveryTestFormPropsInterface) {
        super("app_webhook_delivery_test_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new AppWebhookDeliveryTestFormViewActionHandler(this));

        this.configureFormUI({ toaster_id: "app_webhook_test_toaster", use_modal_button_styles: true });
    }

    // Method to load the translated test form heading.
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to select the destination app from registered-app preview records.
    protected buildFormFieldsUI(): AppWebhookDeliveryTestFieldsType {
        return {
            app_id_input_group_props: this.buildInputGroupProps(
                "app_id",
                "select_search",
                `${this.base_content_key}.fieldset.app_id_field`,
                {
                    model_value: "",
                    input_props: {
                        content_props: { caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon },
                        action_props: {
                            ...this.action_handler.getInputActionHandlersConfig(),
                            fetch_data_method: PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                        }
                    }
                }
            )
        };
    }

    // Method to build the shared submit button for test delivery requests.
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps("app_webhook_test_submit", `${this.base_content_key}.fieldset.btn_text`);
    }

    // Method to prepare CSRF only for members allowed to send test deliveries.
    protected async handleOnMountedLogic(): Promise<void> {
        if (MemberAuthenticatorUtil.memberHasPermissionTo(APP_WEBHOOK_DELIVERY_PERMISSIONS.TEST)) {
            await this.setFormCSRFToken(CSRF_TOKEN_FOR.APP_WEBHOOK_DELIVERY);
        }
    }
}

export default AppWebhookDeliveryTestFormViewController;
