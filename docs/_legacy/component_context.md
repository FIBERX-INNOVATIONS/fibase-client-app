i am workin on the modal component and i am not sure how to dynamixally set the modal body and footet with slots, the way modals work is that 1 or more modals can be open and i need to dynamixally pass in the component that would be the body or footer.

<template>
    <OverlayUI :id="overlay_id">

        <div
            :class="class_styles.wrapper_class_style"
            :style="computed_refs.z_index_style.value"
        >

            <transition
                :name="computed_refs.transition_name.value"
                appear
            >

                <div
                    v-if="state_refs.is_visible"
                    :class="class_styles.modal_class_style"
                >

                    <!-- Header -->
                    <div :class="class_styles.header_class_style">

                        <slot name="header">

                            <div :class="class_styles.header_title_wrapper_class_style">

                            <img
                                v-if="title_img"
                                :src="title_img"
                            />

                            <span
                                v-else-if="title_icon"
                                v-html="getSVGIconValue(title_icon)"
                            ></span>

                            <h3
                                :class="class_styles.header_title_class_style"
                                v-html="title_text"
                            ></h3>

                            </div>

                            <div :class="class_styles.header_close_btn_wrapper_class_style">

                                <button
                                    type="button"
                                    :class="class_styles.close_btn_class_style"
                                    @click="action_handler?.handleClose?.($event)"
                                    v-html="content_props?.close_btn_content ?? getSVGIconValue(content_props?.close_btn_icon_key)"
                                >
                                </button>

                            </div>

                        </slot>

                    </div>


                    <!-- Body -->
                    <div :class="class_styles.body_class_style">
                        <slot name="body" />
                    </div>


                    <!-- Footer -->
                    <div :class="class_styles.footer_class_style">
                        <slot name="footer" />
                    </div>

                </div>

            </transition>

        </div>

    </OverlayUI>

</template>

<script setup lang="ts">

import ModalUIProps from "../props/modal_ui_props";
import ModalUIController from "../controllers/modal_ui_controller";

import { getSVGIconValue } from "../resources/svg_icon_resource";

const props = defineProps(ModalUIProps);

const controller = new ModalUIController(props);

const {
    overlay_id,
    title_text,
    title_icon,
    title_img,
    class_styles,
} = props;

const {
    state_refs,
    computed_refs,
    action_handler,
    components
} = controller;

const {
    LayoutSectionsUI,
    OverlayUI
} = components


</script>

import { Component } from "vue";
import { SVGIconKey } from "../resources/svg_icon_resource";

/_ ---------------------------------- _/
/_ Modal Animation _/
/_ ---------------------------------- _/

export type ModalAnimationType =
| "fade"
| "slide_left"
| "slide_right"
| "slide_top"
| "slide_bottom"
| "scale";

/_ ---------------------------------- _/
/_ Class Styles _/
/_ ---------------------------------- _/

export interface ModalUIClassStylesInterface {

    wrapper_class_style: string;

    modal_class_style: string;

    header_class_style: string;

    header_title_wrapper_class_style: string;

    header_title_class_style: string;

    header_close_btn_wrapper_class_style: string;

    close_btn_class_style: string;

    body_class_style: string;

    footer_class_style: string;

}

/_ ---------------------------------- _/
/_ Action Return _/
/_ ---------------------------------- _/

export interface ModalUIActionReturnInterface {

    status: boolean;

    msg: string;

    data?: Record<string, any>;

}

/_ ---------------------------------- _/
/_ Content Props _/
/_ ---------------------------------- _/
export interface ModalUIContentPropsInterface {
close_btn_content?: string;

    close_btn_icon_key?: SVGIconKey;

}

/_ ---------------------------------- _/
/_ Action Props _/
/_ ---------------------------------- _/

export interface ModalUIActionPropsInterface {

    on_close?: (
        event?: MouseEvent,
        config?: { props: ModalUIPropsInterface }
    ) => Promise<ModalUIActionReturnInterface>;

}

/_ ---------------------------------- _/
/_ Props Interface _/
/_ ---------------------------------- _/

export interface ModalUIPropsInterface {

    id?: string;

    overlay_id?: string;

    title_text?: string;

    title_icon?: SVGIconKey | null;

    title_img?: string;

    animation_type?: ModalAnimationType;

    layer?: number;

    content_props?: ModalUIContentPropsInterface;

    action_props?: ModalUIActionPropsInterface;

    class_styles?: ModalUIClassStylesInterface;

}

/_ ---------------------------------- _/
/_ State _/
/_ ---------------------------------- _/

export interface ModalUIStateDataInterface {

    is_visible: boolean;

}

/_ ---------------------------------- _/
/_ Computed _/
/_ ---------------------------------- _/

export interface ModalUIComputedDataInterface {

    transition_name: string;

    z_index_style: Record<string, string>;

}

/_ ---------------------------------- _/
/_ Components _/
/_ ---------------------------------- _/

export interface ModalUIComponentsInterface {

    LayoutSectionsUI: Component;

    OverlayUI: Component;

}

usually i would register it in the app root and link it to a modals array and then update that modal array to render the body or footer
