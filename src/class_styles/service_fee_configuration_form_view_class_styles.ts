import type { ButtonUIClassStylesInterface } from "@ui/version_3/ui_types/button_ui_type";

interface ServiceFeeConfigurationFormViewClassStylesInterface {
    range_section_class_style: string;

    range_header_class_style: string;

    range_title_class_style: string;

    range_rows_class_style: string;

    range_row_class_style: string;

    range_fields_class_style: string;

    range_remove_wrapper_class_style: string;

    add_range_btn_class_styles: ButtonUIClassStylesInterface;

    remove_range_btn_class_styles: ButtonUIClassStylesInterface;
}

const ServiceFeeConfigurationFormViewClassStyles: ServiceFeeConfigurationFormViewClassStylesInterface = {
    range_section_class_style: "space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4",

    range_header_class_style: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",

    range_title_class_style: "text-base font-semibold text-gray-900",

    range_rows_class_style: "space-y-4",

    range_row_class_style: "rounded-lg border border-gray-200 bg-white p-4",

    range_fields_class_style: "grid grid-cols-1 gap-4 md:grid-cols-2",

    range_remove_wrapper_class_style: "mt-2 flex justify-end",

    add_range_btn_class_styles: {
        wrapper_class_style: "w-full sm:w-auto",
        button_class_style:
            "inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-blue-700 px-4 text-sm font-semibold text-blue-800 hover:bg-blue-50 sm:w-auto",
        disabled_class_style: "cursor-not-allowed opacity-50",
        loading_class_style: "opacity-80",
        icon_class_style: "ml-2 h-4 w-4",
        text_class_style: "flex items-center justify-center gap-2",
        content_class_style: "flex items-center justify-center gap-2"
    },

    remove_range_btn_class_styles: {
        wrapper_class_style: "w-full sm:w-auto",
        button_class_style:
            "inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border border-red-600 px-3 text-sm font-semibold text-red-700 hover:bg-red-50 sm:w-auto",
        disabled_class_style: "cursor-not-allowed opacity-50",
        loading_class_style: "opacity-80",
        icon_class_style: "ml-2 h-4 w-4",
        text_class_style: "flex items-center justify-center gap-2",
        content_class_style: "flex items-center justify-center gap-2"
    }
};

export type { ServiceFeeConfigurationFormViewClassStylesInterface };

export default ServiceFeeConfigurationFormViewClassStyles;
