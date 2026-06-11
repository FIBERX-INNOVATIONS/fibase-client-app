import { markRaw } from "vue";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";
import { DecisionPromptUIBooleanPropsInterface } from "@ui/version_3/ui_types/decision_prompt_ui_type";

import {
    DeleteViewComponentsInterface,
    DeleteViewComputedDataInterface,
    DeleteViewPropsInterface,
    DeleteViewStateDataInterface,
    DeleteViewContentKeysInterface
} from "@/ui_types/delete_view_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import DecisionPromptUI from "@ui/version_3/components/DecisionPromptUI.vue";

import ButtonUIPropsBuilder from "@ui/version_3/props_builder/button_ui_props_builder";

import DecisionPromptUIPropsBuilder from "@ui/version_3/props_builder/decision_prompt_ui_props_builder";

import DecisionPromptUIClassStyles from "@/class_styles/decision_prompt_ui_class_styles";

import type BaseDeleteViewActionHandler from "@/action_handlers/base_classes/base_delete_view_action_handler";

import StatusAlertTriggerUtil from "@/utils/status_alert_trigger_util";

class BaseDeleteViewController<
    T extends object = Record<string, unknown>,
    Props extends DeleteViewPropsInterface<T> = DeleteViewPropsInterface<T>,
    State extends DeleteViewStateDataInterface = DeleteViewStateDataInterface,
    Computed extends DeleteViewComputedDataInterface = DeleteViewComputedDataInterface,
    Components extends DeleteViewComponentsInterface = DeleteViewComponentsInterface,
    Events extends GlobalEventTypes = GlobalEventTypes
> extends BaseController<Props, State, Computed, Components, Events> {
    public action_handler: BaseDeleteViewActionHandler<
        T,
        Props,
        State,
        Computed,
        Components,
        Events
    > | null = null;

    constructor(props: Props, component_name: string = "delete_view") {
        super(component_name, props, EventBus as any);
    }

    // Method to set the action handler for the delete view, which also sets it as the main action handler for the controller.
    protected setDeleteActionHandler(
        action_handler: BaseDeleteViewActionHandler<T, Props, State, Computed, Components, Events>
    ): void {
        this.action_handler = action_handler;
        this.setActionHandler(action_handler);

        StatusAlertTriggerUtil.event_bus = this.event_bus as any;
    }

    // Method to get the content keys for the delete view, which are used to fetch the appropriate text content for the UI components.
    protected getDeleteContentKeys(
        content_key: string = this.props.content_key
    ): DeleteViewContentKeysInterface {
        return {
            title_text: `${content_key}.content.title_text`,
            message_text: `${content_key}.content.message_text`,
            reason_label_text: `${content_key}.content.reason_label_text`,
            reason_placeholder_text: `${content_key}.content.reason_placeholder_text`,
            reason_helper_text: `${content_key}.content.reason_helper_text`,
            cancel_button_text: `${content_key}.content.cancel_btn_text`,
            confirm_button_text: `${content_key}.content.confirm_btn_text`
        };
    }

    // Method to get the cancel button props, which includes the text, icon, styles, and click action for the cancel button in the decision prompt UI.
    protected getCancelButtonProps(): ButtonUIPropsInterface {
        const content_keys = this.getDeleteContentKeys();
        const record_id = this.props.record_id ?? "record";

        return ButtonUIPropsBuilder.getReactivePropsObject(
            `CancelBtn-${record_id}`,
            content_keys.cancel_button_text,
            "x_circile_svg_icon",
            "button",
            {
                class_styles: DecisionPromptUIClassStyles.cancel_btn_class_style,
                action_props: {}
            }
        );
    }

    // Method to get the confirm button props, which includes the text, icon, styles, and click action for the confirm button in the decision prompt UI.
    protected getConfirmButtonProps() {
        const content_keys = this.getDeleteContentKeys();
        const record_id = this.props.record_id ?? "record";

        return ButtonUIPropsBuilder.getReactivePropsObject(
            `ConfirmBtn-${record_id}`,
            content_keys.confirm_button_text,
            "check_circle_svg_icon",
            "button",
            {
                class_styles: DecisionPromptUIClassStyles.confirm_btn_class_style,
                boolean_props: { disabled: false },
                action_props: {}
            }
        );
    }

    protected getDecisionPromptBooleanProps(): DecisionPromptUIBooleanPropsInterface {
        return {
            show_reason_input: false,
            reason_required: false
        };
    }

    // Method to get the decision prompt props, which compiles all the necessary props for the decision prompt UI component based on the content keys and button props.
    protected getDecisionPromptProps() {
        const content_keys = this.getDeleteContentKeys();
        const boolean_props = this.getDecisionPromptBooleanProps();
        const show_reason_input = Boolean(
            boolean_props.show_reason_input || boolean_props.reason_required
        );

        const decision_prompt_props = DecisionPromptUIPropsBuilder.buildFromContentKeys({
            record: this.props.record,
            title_text_content_key: content_keys.title_text,
            message_text_content_key: content_keys.message_text,
            reason_label_text_content_key: show_reason_input
                ? content_keys.reason_label_text
                : undefined,
            reason_placeholder_text_content_key: show_reason_input
                ? content_keys.reason_placeholder_text
                : undefined,
            reason_helper_text_content_key: show_reason_input
                ? content_keys.reason_helper_text
                : undefined,
            class_styles: DecisionPromptUIClassStyles,
            cancel_button_props: this.getCancelButtonProps(),
            confirm_button_props: this.getConfirmButtonProps(),
            boolean_props
        });

        decision_prompt_props.action_props = {
            on_cancel: this.action_handler?.handleCancelDelete,
            on_confirm: this.action_handler?.handleConfirmDelete
        };

        return decision_prompt_props;
    }

    // Method to get the UI components for the delete view, which includes the DecisionPromptUI component that is used to display the confirmation prompt when deleting a record.
    protected getUIComponents(): Components {
        return {
            DecisionPromptUI: markRaw(DecisionPromptUI)
        } as unknown as Components;
    }

    // Method to get the UI state data for the delete view, which includes the props for the decision prompt UI component.
    protected getUIStateData(): State {
        return {
            decision_prompt_props: this.getDecisionPromptProps()
        } as State;
    }
}

export default BaseDeleteViewController;
