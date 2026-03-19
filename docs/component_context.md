<template>
    <div :class="class_styles.wrapper_class_style">
        <select
            :id="id"
            :name="id"
            :class="input_class_style"
            v-model="input_value"
            :placeholder="placeholder_text"
            :required="boolean_props.required"
            :readonly="boolean_props.read_only"
            :disabled="boolean_props.disabled"
            @change="action_handler?.handleOnInpuChange?.($event)"
            @keyup="action_handler?.handleOnKeyup?.($event)"
            @keydown="action_handler?.handleOnKeydown?.($event)"
            @click="action_handler?.handleOnClick?.($event)"
        >
            <option v-if="placeholder_text" disabled value="">
                {{ placeholder_text }}
            </option>
            <option v-for="option in option_props" :key="option.value" :value="option.value">
                {{ option.label_text }}
            </option>
        </select>

        <span 
            v-if="helper_text"
            :class="class_styles.helper_text_class_style"
            v-html="helper_text"
        ></span>

        <span 
            v-if="error_text"
            :class="class_styles.error_text_class_style"
            v-html="error_text"
        ></span>
    </div>

</template>

<script setup lang="ts">
import InputUIProps      from "../../props/input_ui_props";
import InputUIController from "../../controllers/input_ui_controller";

const props         = defineProps(InputUIProps);
const controller    = new InputUIController(props);

const {
    id,
    type,
    placeholder_text,
    helper_text,
    class_styles,
    number_props,
    boolean_props,
    option_props
} = props

const {
    state_refs,
    action_handler
} = controller;

const {
    input_value,
    error_text
} = state_refs

const input_class_style = `
${class_styles.input_class_style}  
${boolean_props.read_only ? class_styles.input_readonly_class_style : ''}
`

</script>

<template>
    <div :class="class_styles.wrapper_class_style">
        <input
            :id="id"
            :name="id"
            :type="type"
            :class="input_class_style"
            v-model="input_value"
            :placeholder="placeholder_text"
            :required="boolean_props.required"
            :readonly="boolean_props.read_only"
            :maxlength="number_props.length"
            :disabled="boolean_props.disabled"
            @input="action_handler?.handleOnInpuChange?.($event)"
            @keyup="action_handler?.handleOnKeyup?.($event)"
            @keydown="action_handler?.handleOnKeydown?.($event)"
            @click="action_handler?.handleOnClick?.($event)"
        />

        <span 
            v-if="helper_text"
            :class="class_styles.helper_text_class_style"
            v-html="helper_text"
        ></span>
        <span 
            v-if="error_text"xs
            :class="class_styles.error_text_class_style"
            v-html="error_text"
        ></span>
    </div>

</template>

<script setup lang="ts">
import InputUIProps      from "../../props/input_ui_props";
import InputUIController from "../../controllers/input_ui_controller";

const props         = defineProps(InputUIProps);
const controller    = new InputUIController(props);

const {
    id,
    type,
    placeholder_text,
    helper_text,
    class_styles,
    number_props,
    boolean_props
} = props

const {
    state_refs,
    action_handler
} = controller;

const {
    input_value,
    error_text
} = state_refs

const input_class_style = `
${class_styles.input_class_style}  
${boolean_props.read_only ? class_styles.input_readonly_class_style : ''}
`

</script>

<template>
    <div :class="class_styles.wrapper_class_style">
        <input
            :id="id"
            :name="id"
            type="number"
            :class="input_class_style"
            v-model="input_value"
            :placeholder="placeholder_text"
            :required="boolean_props.required"
            :readonly="boolean_props.read_only"
            :maxlength="number_props.length"
            :min="number_props.min"
            :max="number_props.max"
            :step="number_props.step"
            @input="action_handler?.handleOnInpuChange?.($event)"
            @keyup="action_handler?.handleOnKeyup?.($event)"
            @keydown="action_handler?.handleOnKeydown?.($event)"
            @click="action_handler?.handleOnClick?.($event)"
        />

        <span 
            v-if="helper_text"
            :class="class_styles.helper_text_class_style"
            v-html="helper_text"
        ></span>

        <span 
            v-if="error_text"
            :class="class_styles.error_text_class_style"
            v-html="error_text"
        ></span>
    </div>

</template>

<script setup lang="ts">
import InputUIProps      from "../../props/input_ui_props";
import InputUIController from "../../controllers/input_ui_controller";

const props         = defineProps(InputUIProps);
const controller    = new InputUIController(props);

const {
    id,
    type,
    placeholder_text,
    helper_text,
    class_styles,
    number_props,
    boolean_props
} = props

const {
    state_refs,
    action_handler
} = controller;

const {
    input_value,
    error_text
} = state_refs

const input_class_style = `
${class_styles.input_class_style}  
${boolean_props.read_only ? class_styles.input_readonly_class_style : ''}
`

</script>


above are exmaples of some of the variants of input i have i want to add some more 
1. search input variant
2. date input variant (can use flow bite date picker)
3. date range input variant with from and to (if you can use flow bite date picker)

for the search input variant it out to be like the text input ui but with type search and would also include a search btn with search icon which can be at the front of the input or at the back or within the input depending on how it styles with class styles