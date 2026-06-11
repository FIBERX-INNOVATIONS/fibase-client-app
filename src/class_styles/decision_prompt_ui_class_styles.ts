import { DecisionPromptUIClassStylesInterface } from "@ui/version_3/ui_types/decision_prompt_ui_type";

import DeleteButtonUIClassStyles from "./delete_button_ui_class_styles";
import CancelButtonUIClassStyles from "./cancel_button_class_styles";

const DecisionPromptUIClassStyles: DecisionPromptUIClassStylesInterface = {
    wrapper_class_style: "w-full items-center justify-center flex flex-col gap-4 py-[2%]",

    content_wrapper_class_style:
        "w-full items-center justify-center flex flex-col gap-2 py-[2%] px-[5%]",

    title_class_style: "w-full text-lg font-black text-center",

    message_class_style: "w-full text-sm text-gray-500 text-center",

    reason_wrapper_class_style: "w-full flex flex-col gap-2 px-[5%]",

    reason_label_class_style: "text-xs font-semibold uppercase tracking-wide text-gray-600",

    reason_input_class_style:
        "min-h-28 w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-6 text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500",

    reason_helper_class_style: "text-xs leading-5 text-gray-500",

    actions_wrapper_class_style:
        "w-full border-t border-blue-300 flex justify-between items-center px-2 py-[2%] gap-6",

    confirm_btn_class_style: DeleteButtonUIClassStyles,

    cancel_btn_class_style: CancelButtonUIClassStyles
};

export default DecisionPromptUIClassStyles;
