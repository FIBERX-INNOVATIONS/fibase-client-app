import dayjs from "dayjs";

import { ComputedDefinitionType } from "@ui/version_3/types/base_type";

import { CSRF_TOKEN_FOR, DEFAULT_MEMBER_PROFILE_PHOTO_URL } from "@/configs";

import { GlobalEventTypes } from "@/types/global_events_type";

import { MemberRecordInterface, getMemberFullName } from "@/types/api_service_type";

import { MyProfileFieldsType } from "@/types/form_fields_type";

import { MyProfileFormDataInterface } from "@/types/form_data_type";

import { ButtonUIPropsInterface } from "@ui/version_3/ui_types/button_ui_type";

import { HeaderTextUIPropsInterface } from "@ui/version_3/ui_types/header_text_ui_type";

import BaseFormViewController from "@/controllers/base_classes/base_form_view_controller";

import MyProfileFormViewActionHandler from "@/action_handlers/my_profile/form_view_action_handler";

import MyProfileViewClassStyles from "@/class_styles/my_profile_view_class_styles";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import {
    MyProfileSummaryItemInterface,
    MyProfileViewClassStylesInterface,
    MyProfileViewComponentsInterface,
    MyProfileViewComputedDataInterface,
    MyProfileViewContentTextInterface,
    MyProfileViewPropsInterface,
    MyProfileViewStateDataInterface,
    MyProfileStatusBadgeInterface
} from "@/ui_types/my_profile_view_type";

class MyProfileFormViewController extends BaseFormViewController<
    MyProfileFormDataInterface,
    MyProfileFieldsType,
    MyProfileViewPropsInterface,
    MyProfileViewStateDataInterface,
    MyProfileViewComputedDataInterface,
    MyProfileViewComponentsInterface,
    GlobalEventTypes
> {
    public readonly base_content_key = "content_resource.my_profile_view_ui.form_view_ui";

    declare public action_handler: MyProfileFormViewActionHandler;

    public readonly class_styles: MyProfileViewClassStylesInterface;

    private readonly local_content_manager = ContentManagerUtil.getInstance();

    constructor(props: MyProfileViewPropsInterface) {
        super("my_profile_form_view", props, MyProfileViewClassStyles);

        this.class_styles = {
            ...MyProfileViewClassStyles,
            ...(props.class_styles ?? {})
        } as MyProfileViewClassStylesInterface;

        this.setFormActionHandler(new MyProfileFormViewActionHandler(this));

        this.configureFormUI({
            toaster_id: "my_profile_submit_toaster",
            use_modal_button_styles: false
        });
    }

    private getContent(key: string): string {
        return this.local_content_manager.get<string>(key, key) ?? key;
    }

    // Method to get content object for profile view
    private getContentObject(): MyProfileViewContentTextInterface {
        const content_key = `${this.base_content_key}.content`;

        return {
            eyebrow_text: this.getContent(`${content_key}.eyebrow_text`),
            fallback_title_text: this.getContent(`${content_key}.fallback_title_text`),
            description_text: this.getContent(`${content_key}.description_text`),
            member_id_label_text: this.getContent(`${content_key}.member_id_label_text`),
            unavailable_text: this.getContent(`${content_key}.unavailable_text`),
            profile_information_title_text: this.getContent(`${content_key}.profile_information_title_text`),
            profile_information_description_text: this.getContent(`${content_key}.profile_information_description_text`),
            password_title_text: this.getContent(`${content_key}.password_title_text`),
            password_description_text: this.getContent(`${content_key}.password_description_text`),
            uploading_photo_text: this.getContent(`${content_key}.uploading_photo_text`),
            photo_alt_text: this.getContent(`${content_key}.photo_alt_text`),
            username_label_text: this.getContent(`${content_key}.username_label_text`),
            roles_label_text: this.getContent(`${content_key}.roles_label_text`),
            last_login_label_text: this.getContent(`${content_key}.last_login_label_text`),
            password_changed_label_text: this.getContent(`${content_key}.password_changed_label_text`),
            not_set_text: this.getContent(`${content_key}.not_set_text`),
            no_roles_text: this.getContent(`${content_key}.no_roles_text`),
            not_available_text: this.getContent(`${content_key}.not_available_text`),
            save_profile_hint_text: this.getContent(`${content_key}.save_profile_hint_text`),
            save_password_hint_text: this.getContent(`${content_key}.save_password_hint_text`),
            active_account_text: this.getContent(`${content_key}.active_account_text`),
            inactive_account_text: this.getContent(`${content_key}.inactive_account_text`),
            verified_member_text: this.getContent(`${content_key}.verified_member_text`),
            unverified_member_text: this.getContent(`${content_key}.unverified_member_text`),
            two_factor_enabled_text: this.getContent(`${content_key}.two_factor_enabled_text`),
            two_factor_disabled_text: this.getContent(`${content_key}.two_factor_disabled_text`)
        };
    }

    // Method to convert date to readable strings
    private getReadableDate(value?: string | Date | null): string {
        const content_text = this.state_refs.content_text?.value ?? this.getContentObject();

        if (!value) {
            return content_text.not_available_text;
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return content_text.not_available_text;
        }

        return new Intl.DateTimeFormat("en", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(date);
    }

    // Method to build header text ui props
    protected buildHeaderTextUIProps(): HeaderTextUIPropsInterface {
        return this.buildHeaderTextProps(`${this.base_content_key}.header_text`, "h2");
    }

    // Method to build form fields ui
    protected buildFormFieldsUI(): MyProfileFieldsType {
        const form_data = this.action_handler.form_data;
        const field_content_key = (input_id: string): string => {
            return this.getFieldContentKey(this.base_content_key, input_id);
        };

        return {
            first_name_input_group_props: this.buildInputGroupProps("first_name", "text", field_content_key("first_name"), {
                model_value: form_data.first_name
            }),

            last_name_input_group_props: this.buildInputGroupProps("last_name", "text", field_content_key("last_name"), {
                model_value: form_data.last_name
            }),

            email_input_group_props: this.buildInputGroupProps("email", "email", field_content_key("email"), {
                model_value: form_data.email,
                input_props: {
                    boolean_props: {
                        disabled: true
                    }
                }
            }),

            phone_input_group_props: this.buildInputGroupProps("phone", "phone_number", field_content_key("phone"), {
                model_value: form_data.phone ?? ""
            }),

            dob_input_group_props: this.buildInputGroupProps("dob", "date", field_content_key("dob"), {
                model_value: dayjs(form_data.dob).format("YYYY-MM-DD") ?? ""
            }),

            gender_input_group_props: this.buildInputGroupProps("gender", "select", field_content_key("gender"), {
                model_value: form_data.gender ?? ""
            }),

            profile_photo_link_input_group_props: this.buildInputGroupProps(
                "profile_photo_link",
                "file",
                field_content_key("profile_photo_link"),
                {
                    model_value: form_data.profile_photo_link ?? "",
                    input_props: {
                        action_props: {
                            on_change: this.action_handler.handleOnFileSelected
                        },
                        file_props: {
                            accept: "image/*",
                            multiple: false,
                            enable_preview: true
                        }
                    }
                }
            ),

            new_password_input_group_props: this.buildInputGroupProps(
                "new_password",
                "password",
                field_content_key("new_password"),
                { model_value: form_data.new_password ?? "" }
            ),

            password_confirm_input_group_props: this.buildInputGroupProps(
                "password_confirm",
                "password",
                field_content_key("password_confirm"),
                { model_value: form_data.password_confirm ?? "" }
            ),

            confirm_password_input_group_props: this.buildInputGroupProps(
                "confirm_password",
                "password",
                field_content_key("confirm_password"),
                { model_value: form_data.confirm_password ?? "" }
            )
        };
    }

    // Method to build form btn ui
    protected buildFormBtnUI(): ButtonUIPropsInterface {
        return this.buildSubmitButtonProps(
            "my_profile_submit",
            `${this.base_content_key}.fieldset.btn_text`,
            "paper_airplane_send_svg_icon"
        );
    }

    // Method to build ui state data
    protected getUIStateData(): MyProfileViewStateDataInterface {
        const state_data = super.getUIStateData();
        const content_text = this.getContentObject();
        const member = this.action_handler.member;

        return {
            ...state_data,
            member,
            content_text,
            avatar_src: this.getAvatarSrc(member),
            account_summary: this.buildAccountSummary(member),
            status_badges: this.buildStatusBadges(member),
            is_uploading_photo: false
        };
    }

    // Method to get ui computed data
    protected getUIComputedData(): ComputedDefinitionType<MyProfileViewComputedDataInterface> {
        return {
            full_name: () => {
                const member = this.state_refs.member?.value;
                const form_data = this.action_handler.form_data;
                const form_name = [form_data.first_name, form_data.last_name].filter(Boolean).join(" ");
                const content_text = this.state_refs.content_text.value;

                return getMemberFullName(member) || form_name || content_text.fallback_title_text;
            },

            save_hint: () => {
                const form_data = this.action_handler.form_data;
                const has_password_values =
                    !!form_data.new_password || !!form_data.password_confirm || !!form_data.confirm_password;
                const content_text = this.state_refs.content_text.value;

                return has_password_values ? content_text.save_password_hint_text : content_text.save_profile_hint_text;
            }
        };
    }

    // Method to get onmounted logic
    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler.initializeMyProfileview(CSRF_TOKEN_FOR.MEMBER_PROFILE);
    }

    // Methdo to get avatar src link from member profile
    public getAvatarSrc(member?: MemberRecordInterface | null): string {
        return member?.profile_photo_link || DEFAULT_MEMBER_PROFILE_PHOTO_URL;
    }

    // Method to build status badge form member profile
    public buildStatusBadges(member?: MemberRecordInterface | null): MyProfileStatusBadgeInterface[] {
        const content_text = this.state_refs.content_text?.value ?? this.getContentObject();

        return [
            {
                label: member?.is_active ? content_text.active_account_text : content_text.inactive_account_text
            },
            {
                label: member?.is_verified ? content_text.verified_member_text : content_text.unverified_member_text
            },
            {
                label: member?.is_2fa_enabled ? content_text.two_factor_enabled_text : content_text.two_factor_disabled_text
            }
        ];
    }

    // Method to build account summary
    public buildAccountSummary(member?: MemberRecordInterface | null): MyProfileSummaryItemInterface[] {
        const content_text = this.state_refs.content_text?.value ?? this.getContentObject();
        const roles_array = member?.roles ?? member?.actor_roles?.map((actor_role) => actor_role.role) ?? [];
        const role_names = roles_array.map((role) => role.display_name || role.name || role.symbol).filter(Boolean);

        return [
            {
                label: content_text.username_label_text,
                value: member?.username || content_text.not_set_text
            },
            {
                label: content_text.last_login_label_text,
                value: this.getReadableDate(member?.last_login_at)
            },
            {
                label: content_text.password_changed_label_text,
                value: this.getReadableDate(member?.member_auth?.password_changed_at)
            },
            {
                label: content_text.roles_label_text,
                value: role_names.length ? role_names.join(", ") : content_text.no_roles_text
            }
        ];
    }

    // Nethod to re buikd form fields
    public buildFields(): MyProfileFieldsType {
        return this.buildFormFieldsUI();
    }
}

export default MyProfileFormViewController;
