the next compoennt i want to work on is a breadcrumb component i would like it to make use of the existing navlink component i have atatched the  props an dvue file for the nav link, the breadcrumb would receive a list of nav links

with the above info can you help generate code for the below files for the component
- a type file 
- a props definiton file 
- a class styles file 
- a controller file 
- a vue file 
- a props builder file

<template>
    <component
        :is="computed_refs.component_type.value"
        :to="computed_refs.route_link.value"
        :href="computed_refs.anchor_link.value"
        :target="computed_refs.anchor_target.value"
        :class="[
            class_styles.wrapper_class_style,
            computed_refs.is_active_computed.value
                ? class_styles.active_menu_class_style
                : ''
        ]"
        @click="action_handler?.handleOnClick?.($event)"
    >

        <div
            v-if="img_src || icon"
            :class="class_styles.icon_img_wrapper_class_style"
        >

        <img
            v-if="img_src"
            :src="img_src"
            :alt="img_alt_text"
            :class="class_styles.icon_img_class_style"
        />

        <span
            v-else-if="icon"
            v-html="computed_refs.icon_svg.value"
            :class="class_styles.icon_img_class_style"
        />

        </div>

        <div
            v-if="content"
            :class="class_styles.content_class_style"
            v-html="content"
        ></div>

    </component>
</template>

import { Component } from "vue";
import { SVGIconKey, SVGIconValue } from "../resources/svg_icon_resource";

/* ---------------------------------- */
/* Link Types                         */
/* ---------------------------------- */

export type NavLinkType =
    | "router"
    | "external"
    | "action";


/* ---------------------------------- */
/* Action Return                      */
/* ---------------------------------- */

export interface NavLinkActionReturnInterface {
    status: boolean;
    msg: string;
    data?: Record<string, any>;
}


/* ---------------------------------- */
/* Action Props                       */
/* ---------------------------------- */

export interface NavLinkUIActionPropsInterface {

    on_click?: (
        event?: MouseEvent,
        config?: { props: NavLinkUIPropsInterface }
    ) => Promise<NavLinkActionReturnInterface>;

}


/* ---------------------------------- */
/* Class Styles                       */
/* ---------------------------------- */

export interface NavLinkUIClassStylesInterface {

    wrapper_class_style: string;

    active_menu_class_style: string;

    icon_img_wrapper_class_style: string;

    icon_img_class_style: string;

    content_class_style: string;

}


/* ---------------------------------- */
/* Props Interface                    */
/* ---------------------------------- */

export interface NavLinkUIPropsInterface {

    id?: string;

    link?: string;

    icon?: SVGIconKey | null;

    img_src?: string;

    img_alt_text?: string;

    content?: string;

    action_props?: NavLinkUIActionPropsInterface;

    class_styles?: NavLinkUIClassStylesInterface;

}


/* ---------------------------------- */
/* State                              */
/* ---------------------------------- */

export interface NavLinkUIStateDataInterface {

    is_loading: boolean;

}


/* ---------------------------------- */
/* Computed                           */
/* ---------------------------------- */

export interface NavLinkUIComputedDataInterface {

    component_type: any;

    route_link: string | null;

    anchor_link: string | null;

    anchor_target: string | null;

    is_active_computed: boolean;

    icon_svg: SVGIconValue;

}


/* ---------------------------------- */
/* Components                         */
/* ---------------------------------- */

export interface NavLinkUIComponentsInterface {
    RouterLink: Component;
}

