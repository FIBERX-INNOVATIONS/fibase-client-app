import type { PaymentStepClassStylesInterface } from "@ui/version_3/ui_types/payment_step_ui_type";

import InputUIClassStyles from "./input_ui_class_styles";

import ButtonUIClassStyles from "./button_ui_class_styles";

const PaymentStepUIClassStyles: PaymentStepClassStylesInterface = {
    flow_wrapper: "space-y-5 min-w-0",
    wrapper: "space-y-5 min-w-0",
    title: "text-xl font-semibold text-slate-900",
    subtitle: "text-sm leading-relaxed text-slate-500",
    field: "space-y-2 min-w-0",
    label: "block text-sm font-medium text-slate-700",
    error: "rounded-xl bg-rose-50 p-3 text-sm text-rose-700",
    options: "space-y-3 border-0 p-0 min-w-0",
    option: "relative flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-500 has-[:disabled]:opacity-60",
    radio: "peer sr-only",
    option_body: "flex-1 min-w-0",
    option_name: "block break-words font-medium text-slate-900",
    option_description: "mt-1 block break-words text-sm text-slate-500",
    check: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 text-transparent transition-all duration-200 peer-checked:scale-110 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white motion-reduce:transition-none",
    row: "flex items-start justify-between gap-5 border-b border-slate-100 py-3 text-sm",
    value: "max-w-[65%] break-words text-right font-medium text-slate-900",
    total: "rounded-xl bg-slate-50 p-4",
    footer: "flex justify-end border-t border-slate-100 pt-5",
    button: ButtonUIClassStyles,
    back_button: {
        wrapper_class_style: "w-[80px] flex items-center flex justify-center",
        loading_class_style: "opacity-70",
        text_class_style: "w-full flex items-center font-bold justify-center text-center",
        button_class_style:
            "w-full h-full p-1 text-sm font-medium text-gray-900 border-2 rounded-xl bg-white transition hover:bg-gray-900 hover:text-white hover:text-slate-900 focus-visible:outline-blue-500 cursor-pointer",
        disabled_class_style: "opacity-50 cursor-not-allowed",
        content_class_style: "flex items-center gap-2",
        icon_class_style: "h-4 w-4 mr-1 flex items-center"
    },
    input: {
        wrapper_class_style: InputUIClassStyles.wrapper_class_style,

        caret_icon_class: InputUIClassStyles.caret_icon_class,

        input_class_style: InputUIClassStyles.input_class_style
    }
};

const MyWalletDepositClassStyles: PaymentStepClassStylesInterface = {
    ...PaymentStepUIClassStyles,
    wrapper: "space-y-5 min-w-0 w-full",
    flow_wrapper: "max-h-[72dvh] overflow-y-auto space-y-5 min-w-0 w-full p-5 sm:p-6",
    title: "text-xl font-semibold tracking-tight text-slate-900",
    row: "grid grid-cols-1 gap-1 border-b border-slate-100 py-3 text-sm sm:flex sm:items-start sm:justify-between sm:gap-5",
    value: "min-w-0 break-words text-left font-medium text-slate-900 sm:max-w-[65%] sm:text-right",
    total: "rounded-2xl border border-slate-200 bg-slate-50 p-4"
};

export default MyWalletDepositClassStyles;
