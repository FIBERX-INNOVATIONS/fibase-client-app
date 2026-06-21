import { PaymentProviderConfigCredentialsInterface, PaymentProviderConfigRecordInterface } from "@/types/api_service_type";

import {
    PaymentProviderConfigProfileViewStateDataInterface,
    PaymentProviderConfigProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    ProfileViewPropsInterface
} from "@/ui_types/profile_view_type";

import MemberAuthenticatorUtil from "@/utils/member_authenticator_util";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

import BaseProfileViewController from "@/controllers/base_classes/base_profile_view_controller";

import BaseProfileViewActionHandler from "../base_classes/base_profile_view_action_handler";

import PaymentProviderConfigAPIService from "@/api_services/payment_provider_config_api_service";

class PaymentProviderConfigProfileViewActionHandler extends BaseProfileViewActionHandler<
    PaymentProviderConfigRecordInterface,
    ProfileViewPropsInterface<PaymentProviderConfigRecordInterface>,
    PaymentProviderConfigProfileViewStateDataInterface,
    PaymentProviderConfigProfileViewComputedDataInterface,
    ProfileViewComponentsInterface
> {
    // Method to initialize the provider configuration profile action handler.
    constructor(
        controller: BaseProfileViewController<
            PaymentProviderConfigRecordInterface,
            ProfileViewPropsInterface<PaymentProviderConfigRecordInterface>,
            PaymentProviderConfigProfileViewStateDataInterface,
            PaymentProviderConfigProfileViewComputedDataInterface,
            ProfileViewComponentsInterface
        >
    ) {
        super(
            controller,
            "payment_provider_config_profile_view_action_handler",
            PaymentProviderConfigAPIService.getPaymentProviderConfig
        );

        StatusAlertTriggerUtil.event_bus = this.controller.event_bus;
    }

    // Method to resolve the current provider configuration identifier.
    private getConfigId(): string | null {
        return this.controller.state_refs.profile_record.value?.id?.toString() || this.controller.props.record_id || null;
    }

    // Method to reveal, hide, or fetch provider configuration credentials.
    public handleCredentialsButtonClicked = async (): Promise<void> => {
        if (this.controller.state_refs.credentials_are_visible.value) {
            this.setState("credentials_are_visible", false);
            return;
        }

        const has_permission = MemberAuthenticatorUtil.memberHasPermissionTo(
            "payment_provider_config_module.get_payment_provider_config_credentials"
        );

        if (!has_permission) {
            const msg = "permission_denied";
            this.setState("credentials_error_msg", msg);
            StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
            return;
        }

        if (this.controller.state_refs.credentials.value) {
            this.setState("credentials_are_visible", true);
            return;
        }

        const config_id = this.getConfigId();

        if (!config_id) {
            const msg = "record_not_found";
            this.setState("credentials_error_msg", msg);
            StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
            return;
        }

        this.setState("is_loading_credentials", true);
        this.setState("credentials_error_msg", null);

        try {
            const response = await PaymentProviderConfigAPIService.getPaymentProviderConfigCredentials(config_id);

            if (!response || response.status === "error") {
                const msg = response?.msg ?? "error_occurred";
                this.setState("credentials_error_msg", msg);
                StatusAlertTriggerUtil.triggerAlert("error", msg, 4, undefined, true);
                return;
            }

            if (response.status === "logout") {
                this.controller.router.push("/logout");
                return;
            }

            this.setState(
                "credentials",
                (response.data?.credentials ?? null) as PaymentProviderConfigCredentialsInterface | null
            );
            this.setState("credentials_are_visible", true);
        } catch (error: unknown) {
            this.logError("handleCredentialsButtonClicked", error);
            this.setState("credentials_error_msg", "error_occurred");
            StatusAlertTriggerUtil.triggerAlert("error", "error_occurred", 4, undefined, true);
        } finally {
            this.setState("is_loading_credentials", false);
        }
    };
}

export default PaymentProviderConfigProfileViewActionHandler;
