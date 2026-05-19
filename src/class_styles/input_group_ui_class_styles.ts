import { InputGroupUIClassStylesInterface } from "@ui/version_3/ui_types/input_group_ui_type";

const input_group_class_style: InputGroupUIClassStylesInterface = {
    wrapper_class_style: "w-full my-4 flex flex-col space-y-2",

    label_wrapper_class_style: "w-full flex my-2",

    label_text_class_style: "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",

    required_text_class_style: "text-red-500 text-sm italic font-medium",

    group_input_wrapper_class_style: "w-full mt-2"
};

export default input_group_class_style;
