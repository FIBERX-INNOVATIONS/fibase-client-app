<template>
    <section id="MyProfileView" :class="class_styles.page_wrapper_class_style">
        <div :class="class_styles.content_wrapper_class_style">
            <div :class="class_styles.shell_class_style">
                <div :class="class_styles.hero_class_style">
                    <div :class="class_styles.hero_content_class_style">
                        <div :class="class_styles.hero_top_row_class_style">
                            <div :class="class_styles.hero_text_wrapper_class_style">
                                <p :class="class_styles.eyebrow_text_class_style">
                                    {{ state_refs.content_text.value.eyebrow_text }}
                                </p>

                                <h1 :class="class_styles.hero_title_class_style">
                                    {{ computed_refs.full_name.value }}
                                </h1>

                                <p :class="class_styles.hero_description_class_style">
                                    {{ state_refs.content_text.value.description_text }}
                                </p>
                            </div>

                            <div :class="class_styles.member_id_box_class_style">
                                <p :class="class_styles.member_id_label_class_style">
                                    {{ state_refs.content_text.value.member_id_label_text }}
                                </p>

                                <p :class="class_styles.member_id_value_class_style">
                                    {{
                                        state_refs.member.value?.public_id?.toUpperCase() ||
                                        state_refs.content_text.value.unavailable_text
                                    }}
                                </p>
                            </div>
                        </div>

                        <div :class="class_styles.badge_list_class_style">
                            <span
                                v-for="badge in state_refs.status_badges.value"
                                :key="badge.label"
                                :class="class_styles.badge_class_style"
                            >
                                {{ badge.label }}
                            </span>
                        </div>
                    </div>
                </div>

                <form @submit.prevent :class="class_styles.form_class_style">
                    <HeaderTextUI v-bind="state_refs.header_text_props.value" />

                    <div :class="class_styles.form_grid_class_style">
                        <aside :class="class_styles.side_panel_class_style">
                            <div :class="class_styles.avatar_card_class_style">
                                <div :class="class_styles.avatar_wrapper_class_style">
                                    <img
                                        :src="state_refs.avatar_src.value"
                                        :alt="state_refs.content_text.value.photo_alt_text"
                                        :class="class_styles.avatar_img_class_style"
                                    />
                                </div>

                                <p :class="class_styles.avatar_name_class_style">
                                    {{ computed_refs.full_name.value }}
                                </p>

                                <p :class="class_styles.avatar_email_class_style">
                                    {{
                                        action_handler.form_data.email ||
                                        state_refs.member.value?.username ||
                                        state_refs.content_text.value.not_set_text
                                    }}
                                </p>

                                <p v-if="state_refs.is_uploading_photo.value" :class="class_styles.upload_text_class_style">
                                    {{ state_refs.content_text.value.uploading_photo_text }}
                                </p>

                                <InputGroupUI v-bind="state_refs.fields.value.profile_photo_link_input_group_props" />

                                <div :class="class_styles.summary_list_class_style">
                                    <div
                                        v-for="item in state_refs.account_summary.value"
                                        :key="item.label"
                                        :class="class_styles.summary_item_class_style"
                                    >
                                        <span :class="class_styles.summary_label_class_style">
                                            {{ item.label }}
                                        </span>

                                        <span :class="class_styles.summary_value_class_style">
                                            {{ item.value }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div :class="class_styles.main_panel_class_style">
                            <section :class="class_styles.panel_class_style">
                                <div :class="class_styles.panel_header_class_style">
                                    <h2 :class="class_styles.panel_title_class_style">
                                        {{ state_refs.content_text.value.profile_information_title_text }}
                                    </h2>

                                    <p :class="class_styles.panel_description_class_style">
                                        {{ state_refs.content_text.value.profile_information_description_text }}
                                    </p>
                                </div>

                                <fieldset :class="class_styles.field_grid_class_style">
                                    <InputGroupUI v-bind="state_refs.fields.value.first_name_input_group_props" />

                                    <InputGroupUI v-bind="state_refs.fields.value.last_name_input_group_props" />

                                    <InputGroupUI v-bind="state_refs.fields.value.email_input_group_props" />

                                    <InputGroupUI v-bind="state_refs.fields.value.phone_input_group_props" />

                                    <InputGroupUI v-bind="state_refs.fields.value.dob_input_group_props" />

                                    <InputGroupUI v-bind="state_refs.fields.value.gender_input_group_props" />
                                </fieldset>
                            </section>

                            <section :class="class_styles.panel_class_style">
                                <div :class="class_styles.panel_header_class_style">
                                    <h2 :class="class_styles.panel_title_class_style">
                                        {{ state_refs.content_text.value.password_title_text }}
                                    </h2>

                                    <p :class="class_styles.panel_description_class_style">
                                        {{ state_refs.content_text.value.password_description_text }}
                                    </p>
                                </div>

                                <fieldset :class="class_styles.field_grid_class_style">
                                    <div :class="class_styles.full_width_field_class_style">
                                        <InputGroupUI v-bind="state_refs.fields.value.new_password_input_group_props" />
                                    </div>

                                    <InputGroupUI v-bind="state_refs.fields.value.password_confirm_input_group_props" />

                                    <InputGroupUI v-bind="state_refs.fields.value.confirm_password_input_group_props" />
                                </fieldset>
                            </section>
                        </div>
                    </div>

                    <ToasterUI v-bind="state_refs.toast_alert_props.value" :class="class_styles.alert_wrapper_class_style" />

                    <div :class="class_styles.action_bar_class_style">
                        <p :class="class_styles.save_hint_class_style">
                            {{ computed_refs.save_hint.value }}
                        </p>

                        <ButtonUI v-bind="state_refs.btn_props.value" />
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import MyProfileFormViewProps from "@/props_definition/my_profile/form_view_props";
import MyProfileFormViewController from "@/controllers/my_profile/form_view_controller";

const props = defineProps(MyProfileFormViewProps);
const controller = new MyProfileFormViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, computed_refs, components } = component_definition;

const { HeaderTextUI, InputGroupUI, ToasterUI, ButtonUI } = components;

const action_handler = controller.action_handler;
const class_styles = controller.class_styles;
</script>
