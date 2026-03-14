the next component i want to work on is a ModalUi component which makes use of the overlay component we just previosuly designed.
Please note the way i use components in apps is that i can layer them untop each other, so i can have multiple modal open.
Other things to note:
1. Modals are please inside overlays, and have contents
2. contents can be postioned to the extreme right or extreme left or center horizontally, they can also be left, reigh or centered vertically (this should be more up the to the class styles)
3. the content display can be animated to slide in or out or appear and disspaar.
4. inside a content we have 3 sections header body footer. the header and footer usually have fixed heights while the body is scrollable
(you can use the Section ui we designed previoulsy for htis).
5. body and footer are laways customisable by passing slots but the header can have a default or by passing slot.
6. header default is made up of a title text(can include an icon or img to at the start of it) to the left and an ex-close icon to the right

with the above info can you help generate code for the below files for the component
- a type file 
- a props definiton file 
- a class styles file 
- a controller file 
- a vue file 
- a props builder file

previous old modal code you can use as a guide and only a guide for new modal ui design
<template>
    <!-- Overlay -->
    <div v-if="props.is_open" 
        :style="{ zIndex: 100 + props.layer }"
        :class="overlay_class_style"
        @click.self="event_handler?.handleOnModalCloseClick?.($event)"
    >
        <!-- Modal box -->
        <transition :name="modal_transition_name" appear>
            <div
                v-if="is_open"
                :class="[modal_position_class_style, modal_size_class_style, props.modal_box_class_style ]"
            >
                <!-- Modal Header -->
                <div :class="props.header_wrapper_class_style">
                    <div :class="props.header_title_content_class_style">
                        <h3 :class="props.header_title_class_style" v-html="props.title_content"></h3>
                    </div>
                    <div :class="props.header_close_btn_content_class_style">
                        <button 
                            type="button" 
                            :class="props.close_btn_class_style"
                            @click="event_handler?.handleOnModalCloseClick?.($event)"
                            v-html="btn_content ?? props?.close_btn_content"
                        ></button>
                    </div>
                </div>

                <!-- ModalBody -->
                 <div :class="props.body_class_style">
                    <component 
                        v-if="body_component && body_props && Object.keys(body_props).length"  
                        :is="body_component" 
                        v-bind="body_props" 
                    />
                 </div>
            </div>
        </transition>
    </div>

</template>

