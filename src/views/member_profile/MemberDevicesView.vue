<template>
    <section :class="class_styles.devices_wrapper_class_style">
        <div :class="class_styles.devices_toolbar_class_style">
            <label :class="class_styles.devices_search_wrapper_class_style">
                <span
                    :class="class_styles.devices_search_icon_class_style"
                    v-html="getSVGIconValue('search_svg_icon')"
                ></span>

                <input
                    v-model="search_query"
                    type="search"
                    :placeholder="content_obj.search_placeholder_text"
                    :class="class_styles.devices_search_input_class_style"
                    @keyup.enter="action_handler.handleSearchEnter"
                />
            </label>

            <button
                v-if="can_logout_all_devices"
                type="button"
                :class="class_styles.devices_toolbar_button_class_style"
                :disabled="is_loading || is_action_processing || !devices.length"
                @click="action_handler.handleLogoutAllDevices"
            >
                <span
                    :class="class_styles.devices_toolbar_button_icon_class_style"
                    v-html="getSVGIconValue('logout_icon')"
                ></span>

                <span>{{ content_obj.logout_all_button_text }}</span>
            </button>
        </div>

        <div v-if="is_loading" :class="class_styles.loading_wrapper_class_style">
            <span
                :class="class_styles.link_icon_class_style"
                v-html="getSVGIconValue('loading_svg_icon')"
            ></span>

            {{ content_obj.loading_text }}
        </div>

        <div v-else-if="!devices.length" :class="class_styles.devices_empty_state_class_style">
            {{ content_obj.empty_state_text }}
        </div>

        <div v-else :class="class_styles.devices_grid_class_style">
            <ContentCardUI
                v-for="device in devices"
                :key="device.id || device.device_id"
                v-bind="controller.getDeviceCardProps(device)"
            />
        </div>

        <div :class="class_styles.devices_pagination_class_style">
            <p :class="class_styles.devices_pagination_text_class_style">
                {{ pagination_result_text }}
            </p>

            <PaginationUI v-bind="pagination_props" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { getSVGIconValue } from "@ui/version_3/resources/svg_icon_resource";

import MemberDevicesViewProps from "@/props_definition/member_profile/member_devices_view_props";
import MemberDevicesViewController from "@/controllers/member_profile/member_devices_view_controller";

const props = defineProps(MemberDevicesViewProps);
const controller = new MemberDevicesViewController(props);
const component_definition = controller.getComponentDefinition();

const { state_refs, computed_refs, components } = component_definition;
const { ContentCardUI, PaginationUI } = components;
const { action_handler } = controller;

const { class_styles, content_obj, devices, search_query, is_loading, pagination_props } =
    state_refs;

const { is_action_processing, can_logout_all_devices, pagination_result_text } = computed_refs;
</script>
