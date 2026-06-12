import { GlobalEventTypes } from "@/types/global_events_type";

import { CSRF_TOKEN_FOR } from "@/configs";

import { RoleRecordInterface } from "@/types/api_service_type";

import { RoleFieldsType } from "@/types/form_fields_type";

import { RoleFormDataInterface } from "@/types/form_data_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import {
    FormViewComponentsInterface,
    FormViewComputedDataInterface,
    FormViewPropsInterface,
    RoleFormState
} from "@/ui_types/form_view_type";

import FormViewClassStyles from "@/class_styles/form_view_class_styles";

import AccessControlFormViewActionHandler from "@/action_handlers/access_control/form_view_action_handler";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

class AccessControlFormViewController extends BaseFormViewController<
    RoleFormDataInterface,
    RoleFieldsType,
    FormViewPropsInterface<RoleRecordInterface>,
    RoleFormState,
    FormViewComputedDataInterface,
    FormViewComponentsInterface,
    GlobalEventTypes
> {
    private readonly base_content_key = "content_resource.access_control_view_ui.form_view_ui";

    constructor(props: FormViewPropsInterface<RoleRecordInterface>) {
        super("access_control_form_view", props, FormViewClassStyles);

        this.setFormActionHandler(new AccessControlFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "access_control_role_submit_toaster",
            use_modal_button_styles: true
        });
    }

    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    protected buildFormFieldsUI(): RoleFieldsType {
        const record = this.props?.record;
        const is_editing = Boolean(record?.id);
        const is_system_role = Boolean(record?.is_member_group === false);
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        return {
            name_input_group_props: this.buildInputGroupProps("name", "text", field_content_key("name"), {
                model_value: record?.name ?? ""
            }),

            symbol_input_group_props: this.buildInputGroupProps("symbol", "text", field_content_key("symbol"), {
                model_value: record?.symbol ?? "",
                input_props: {
                    boolean_props: {
                        disabled: is_system_role,
                        read_only: is_system_role
                    }
                }
            })
        };
    }

    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "access_control_role_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    protected async handleOnMountedLogic(): Promise<void> {
        await this.setFormCSRFToken(CSRF_TOKEN_FOR.ACCESS_CONTROL_ROLE);
    }
}

export default AccessControlFormViewController;
