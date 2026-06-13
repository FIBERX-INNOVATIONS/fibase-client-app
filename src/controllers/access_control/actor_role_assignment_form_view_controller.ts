import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";

import {
    ActorRoleInterface,
    MemberActorRoleInterface,
    MemberRecordInterface,
    RegisteredAppRecordInterface
} from "@/types/api_service_type";

import { ActorRoleAssignmentFieldsType } from "@/types/form_fields_type";

import { ActorRoleAssignmentFormDataInterface } from "@/types/form_data_type";

import { SelectOptionInterface } from "@ui/version_3/ui_types/input_ui_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    ActorRoleAssignmentFormState,
    ActorRoleAssignmentFormViewPropsInterface,
    FormViewComponentsInterface,
    FormViewComputedDataInterface
} from "@/ui_types/form_view_type";

import PreviewRecordFetcher from "@/utils/preview_record_fetcher";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import ActorRoleAssignmentFormViewActionHandler from "@/action_handlers/access_control/actor_role_assignment_form_view_action_handler";

type ActorRecord = MemberRecordInterface | RegisteredAppRecordInterface;

class ActorRoleAssignmentFormViewController extends BaseFormViewController<
    ActorRoleAssignmentFormDataInterface,
    ActorRoleAssignmentFieldsType,
    ActorRoleAssignmentFormViewPropsInterface<ActorRecord>,
    ActorRoleAssignmentFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.access_control_view_ui.actor_role_assignment_form_view_ui";

    constructor(props: ActorRoleAssignmentFormViewPropsInterface<ActorRecord>) {
        super("actor_role_assignment_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new ActorRoleAssignmentFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "actor_role_assignment_submit_toaster",
            use_modal_button_styles: true
        });
    }

    // Method to build header text ui
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields UI
    protected buildFormFieldsUI(): ActorRoleAssignmentFieldsType {
        const action_handler = this.action_handler as ActorRoleAssignmentFormViewActionHandler;
        const actor_id = ActorRoleAssignmentFormViewActionHandler?.getActorId?.(this.props);
        const selected_role_ids = ActorRoleAssignmentFormViewActionHandler.getSelectedRoleIds(this.props);
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        return {
            actor_id_input_group_props: this.buildInputGroupProps("actor_id", "select_search", field_content_key("actor_id"), {
                model_value: actor_id,
                input_props: {
                    option_props: action_handler.getActorOption(),
                    boolean_props: {
                        disabled: this.props.actor_read_only,
                        read_only: this.props.actor_read_only
                    },
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    },
                    action_props: {
                        fetch_data_method:
                            this.props.actor_type === "app"
                                ? PreviewRecordFetcher.fetchRegisteredAppPreviewRecords
                                : PreviewRecordFetcher.fetchMemberPreviewRecords
                    }
                }
            }),

            role_ids_input_group_props: this.buildInputGroupProps(
                "role_ids",
                "multi_select_search",
                field_content_key("role_ids"),
                {
                    model_value: selected_role_ids,
                    input_props: {
                        option_props: ActorRoleAssignmentFormViewActionHandler.getRoleOptions(this.props),
                        content_props: {
                            caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                        },
                        action_props: {
                            fetch_data_method: PreviewRecordFetcher.fetchRolePreviewRecords
                        }
                    }
                }
            )
        };
    }

    // Method to build form btn ui
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "actor_role_assignment_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to build mounted logic
    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.ACCESS_CONTROL_ACTOR_ROLE);
    }
}

export default ActorRoleAssignmentFormViewController;
