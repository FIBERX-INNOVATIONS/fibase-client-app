import { DecisionPromptUIClassStylesInterface } from "@ui/version_3/ui_types/decision_prompt_ui_type";

import DeleteButtonUIClassStyles from "./delete_button_ui_class_styles";
import CancelButtonUIClassStyles from "./cancel_button_class_styles";

const DecisionPromptUIClassStyles: DecisionPromptUIClassStylesInterface = {

    wrapper_class_style: "w-full items-center justify-center flex flex-col gap-4 py-[2%]",

    content_wrapper_class_style: "w-full items-center justify-center flex flex-col gap-2 py-[2%] px-[5%]",

    title_class_style: "w-full text-lg font-black text-center",

    message_class_style: "w-full text-sm text-gray-500 text-center",

    actions_wrapper_class_style: "w-full border-t border-blue-300 flex justify-between items-center px-2 py-[2%] gap-6",

    confirm_btn_class_style: DeleteButtonUIClassStyles,

    cancel_btn_class_style: CancelButtonUIClassStyles
};

export default DecisionPromptUIClassStyles;