<template>
    <section :class="class_styles.wrapper_class_style">
        <div :class="class_styles.toolbar_class_style">
            <label :class="class_styles.search_wrapper_class_style">
                <span :class="class_styles.search_icon_class_style" v-html="getSVGIconValue('search_svg_icon')"></span>

                <input
                    v-model="search_query"
                    type="search"
                    :placeholder="content_obj.search_placeholder_text"
                    :class="class_styles.search_input_class_style"
                />
            </label>

            <button
                v-if="has_selected_permissions && can_unassign_permissions"
                type="button"
                :class="class_styles.bulk_action_button_class_style"
                :disabled="is_loading || is_bulk_unassigning"
                @click="action_handler.handleBulkUnassignClicked"
            >
                <span
                    :class="[class_styles.bulk_action_button_icon_class_style, is_bulk_unassigning ? 'animate-spin' : '']"
                    v-html="getSVGIconValue(is_bulk_unassigning ? 'loading_svg_icon' : 'delete_trash_svg_icon')"
                ></span>

                <span>{{ content_obj.bulk_unassign_button_text }}</span>
            </button>
        </div>

        <div v-if="is_loading" :class="class_styles.loading_wrapper_class_style">
            <span :class="class_styles.loading_icon_class_style" v-html="getSVGIconValue('loading_svg_icon')"></span>

            {{ content_obj.loading_text }}
        </div>

        <div v-else-if="!permissions.length" :class="class_styles.empty_state_class_style">
            {{ content_obj.empty_state_text }}
        </div>

        <div v-else-if="!filtered_permissions.length" :class="class_styles.empty_state_class_style">
            {{ content_obj.empty_state_text }}
        </div>

        <div v-else :class="class_styles.permissions_grid_class_style">
            <div
                v-for="permission in filtered_permissions"
                :key="permission.id"
                :class="class_styles.permission_row_class_style"
            >
                <button
                    v-if="can_unassign_permissions"
                    type="button"
                    :class="[
                        class_styles.permission_checkbox_class_style,
                        controller.permissionIsSelected(permission)
                            ? class_styles.permission_checkbox_selected_class_style
                            : class_styles.permission_checkbox_unselected_class_style
                    ]"
                    :disabled="is_bulk_unassigning || Boolean(processing_permission_id)"
                    @click="action_handler.handlePermissionSelectionToggle(permission)"
                >
                    <span
                        :class="class_styles.permission_checkbox_icon_class_style"
                        v-html="getSVGIconValue('check_circle_svg_icon')"
                    ></span>
                </button>

                <div :class="class_styles.permission_card_wrapper_class_style">
                    <ContentCardUI v-bind="controller.getPermissionCardProps(permission)" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import { AccessControlPermissionsViewPropsInterface } from "@/ui_types/access_control_permissions_view_type";

import AccessControlPermissionsViewProps from "@/props_definition/access_control/permissions_view_props";

import AccessControlPermissionsViewController from "@/controllers/access_control/permissions_view_controller";

const props = defineProps(AccessControlPermissionsViewProps) as AccessControlPermissionsViewPropsInterface;
const controller = new AccessControlPermissionsViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, computed_refs, components } = component_definition;
const { action_handler } = controller;
const { ContentCardUI } = components;

const { class_styles, content_obj, permissions, search_query, is_loading, processing_permission_id, is_bulk_unassigning } =
    state_refs;

const { filtered_permissions, has_selected_permissions, can_unassign_permissions } = computed_refs;
</script>
