import { ListViewClassStylesInterface } from "@/ui_types/list_view_type";
import { BreadcrumbUIClassStylesInterface } from "@ui/version_3/ui_types/breadcrumb_ui_type";
import { FiltersPanelUIClassStylesInterface } from "@ui/version_3/ui_types/filters_panel_ui_type";
import { InputGroupUIClassStylesInterface } from "@ui/version_3/ui_types/input_group_ui_type";
import { PageHeaderUIClassStylesInterface } from "@ui/version_3/ui_types/page_header_ui_type";
import input_group_class_style from "./input_group_ui_class_styles";
import { InputUIClassStylesInterface } from "@ui/version_3/ui_types/input_ui_type";
import input_ui_class_styles from "./input_ui_class_styles";
import { DataTableUIClassStylesInterface } from "@ui/version_3/ui_types/data_table_ui_type";
import { DataTableCellComponentUIClassStylesInterface } from "@ui/version_3/ui_types/data_table_cell_component_ui_type";
import { DataTableResultAndBulkActionBarUIClassStylesInterface } from "@ui/version_3/ui_types/data_table_result_and_bulk_action_bar_ui_type";
import { PaginationUIClassStylesInterface } from "@ui/version_3/ui_types/pagination_ui_type";
import ButtonUIClassStyles from "./button_ui_class_styles";
import { ContentCardUIClassStylesInterface } from "@ui/version_3/ui_types/content_card_ui_type";

const list_view_breadcrumb_class_styles: BreadcrumbUIClassStylesInterface = {
    wrapper_class_style: "w-full py-4 px-[2%] rounded-3xl bg-white shadow-lg border border-gray-100 my-2 h-[50px]",

    list_class_style: "inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse",

    item_wrapper_class_style: "inline-flex items-center",

    separator_class_style: "px-2 text-gray-400",

    nav_link_class_styles: {
        wrapper_class_style: "inline-flex items-center text-sm font-medium cursor-pointer text-gray-700 hover:text-blue-600",

        active_menu_class_style: "",

        icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden  w-4 h-4 me-2",

        icon_img_class_style: "w-full h-auto",

        content_class_style: "flex space-x-2 items-center justify-start text-md"
    }
};

const page_header_class_styles: PageHeaderUIClassStylesInterface = {
    wrapper_class_style: "w-full py-4 px-[4%] rounded-3xl bg-white shadow-lg border border-gray-100 my-2",

    top_row_class_style: "flex flex-col md:flex-row md:items-center md:justify-between gap-3",

    header_wrapper_class_style: "flex flex-col gap-1",

    description_class_style: "text-sm text-gray-500 mt-8",

    action_buttons_wrapper_class_style: "flex flex-wrap gap-2",

    header_text_class_styles: {
        text_class_style: "font-bold text-start capitalize text-2xl flex w-full items-center justify-start"
    },

    action_button_class_styles: {
        wrapper_class_style: "w-auto flex",

        button_class_style:
            "w-auto cursor-pointer inline-flex items-center justify-center rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider py-3",

        disabled_class_style: "opacity-50 cursor-not-allowed",

        loading_class_style: "opacity-80",

        icon_class_style: "w-4 h-4 mr-2 flex items-center",

        text_class_style: "flex items-center justify-center",

        content_class_style: "flex items-center justify-center"
    }
};

const filters_class_styles: FiltersPanelUIClassStylesInterface = {
    wrapper_class_style: "w-full mt-4 mb-2 flex flex-col item-center justify-start py-2",

    toggle_btn_wrapper_class_style: "w-full flex items-center justify-start py-2",

    toggle_btn_class_style:
        "w-auto cursor-pointer inline-flex items-center justify-center rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider py-2",

    toggle_btn_icon_class_style: "w-6 h-6 flex items-center mr-2",

    toggle_btn_content_wrapper_class_style: "flex item-center justify-center",

    panel_wrapper_class_style: "w-full flex flex-col items-center justify-center py-2 transition-all duration-500",

    filters_grid_class_style: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full px-4",

    actions_wrapper_class_style: "w-full flex flex-wrap gap-3 pt-2 items-center justify-end",

    clear_filters_btn_class_style: {
        wrapper_class_style: "w-auto flex",

        button_class_style:
            "w-auto cursor-pointer inline-flex items-center justify-center underline  px-4 text-blue-500 hover:text-blue-500 disabled:text-gray-600 disabled:cursor-not-allowed text-md font-semibold tracking-wider py-3",

        disabled_class_style: "opacity-50 cursor-not-allowed",

        loading_class_style: "opacity-80",

        icon_class_style: "w-6 h-6 mr-2 flex items-center",

        text_class_style: "flex items-center justify-center",

        content_class_style: "flex items-center justify-center"
    },

    apply_filters_btn_class_style: {
        wrapper_class_style: "w-auto flex",

        button_class_style:
            "w-auto cursor-pointer inline-flex items-center justify-center rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider py-3",

        disabled_class_style: "opacity-50 cursor-not-allowed",

        loading_class_style: "opacity-80",

        icon_class_style: "w-6 h-6 mr-2 flex items-center",

        text_class_style: "flex items-center justify-center",

        content_class_style: "flex items-center justify-center"
    }
};

const filters_input_group_class_styles: InputGroupUIClassStylesInterface = {
    ...input_group_class_style
};

const filters_input_ui_class_styles: InputUIClassStylesInterface = {
    ...input_ui_class_styles
};

const table_result_and_bulk_action_bar_class_styles: DataTableResultAndBulkActionBarUIClassStylesInterface = {
    wrapper_class_style: "w-full py-4  my-2 flex md:flex-row flex-col items-center md:justify-center justify-between",

    left_container_class_style:
        "md:w-6/12 w-full flex md:items-start items-center flex-col md:justify-start justify-center my-2",

    right_container_class_style: "md:w-6/12 w-full flex md:items-end items-center flex-col md:justify-end justify-center my-2",

    text_class_style: "md:text-start text-center text-sm text-gray-500"
};

const table_class_styles: DataTableUIClassStylesInterface = {
    wrapper_class_style:
        "w-full py-4 px-[4%] overflow-x-auto relative h-auto min-h-[400px] rounded-3xl bg-white shadow-lg border border-gray-100 my-2",
    table_class_style:
        "lg:w-full w-[1200px] border-separate rounded-lg table-auto lg:table-fixed border border-gray-400 border-spacing-y-2 text-sm text-left rtl:text-right text-body",
    thead_class_style: "text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default group/head",
    th_class_style: "first:rounded-tl-lg last:rounded-tr-lg p-2 font-bold uppercase align-middle border-b border-gray-300",
    th_cell_wrapper_class_style: "flex items-center justify-center gap-2 w-full text-xs",
    th_sort_icon_class_style: "",
    tbody_class_style: "",
    tr_class_style: "",
    td_class_style: "p-2 align-middle border-b-2 border-gray-200",
    sortable_header_wrapper_class_style: "flex flex-col leading-none",
    sortable_header_icon_class_style: "w-3 h-3 cursor-pointer flex",
    loading_section_wrapper_class_style: "text-center py-6 animate-pulse relative",
    loader_text_wrapper_class_style: "flex justify-center items-center gap-2 absolute w-full h-full ",
    loader_text_icon_class_style: "animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full",
    loader_skeleton_bar_class_style: "w-full h-12 my-4 bg-gray-300 rounded-lg shadow",
    empty_data_wrapper_class_style: "text-center py-6 opacity-70",
    empty_data_class_style: ""
};

const table_cell_components_class_styles: DataTableCellComponentUIClassStylesInterface = {
    wrapper_class_style: "w-full flex items-center justify-center p-2 text-center",
    text_class_style: "text-sm text-gray-900",
    sub_text_class_style:
        "bg-green-900 truncate font-black uppercase rounded-full shadow px-2 py-1 text-xs text-white w-auto max-w-full",
    img_render_ui_class_style: {
        wrapper_class_style: "w-full flex items-center justify-center gap-2",

        image_class_style:
            "w-[50px] h-[50px] bg-gray-200 object-contain rounded-full border-[#001f3f] border-2 overflow-hidden",

        content_wrapper_class_style: "flex flex-col items-start justify-center w-7/12 h-full",

        content_class_style: "font-bold text-xs text-gray-900 break-word text-start",

        loading_class_style: "",

        error_class_style: ""
    },
    url_link_class_style: {
        wrapper_class_style:
            "w-full flex items-start justify-center gap-2 text-sm text-blue-600 underline hover:text-blue-800 min-w-0",

        icon_class_style: "w-4 h-4 flex-shrink-0 mt-1",

        text_class_style: "break-words whitespace-normal min-w-0 text-left"
    },
    input_ui_class_style: {
        input_class_style: "w-full py-2 px-1",

        wrapper_class_style: "flex flex-col gap-2 justify-center items-center",

        loader_class_style: "w-6 h-6 ml-2 flex items-center",

        switch_btn_class_style: "group inline-flex h-6 w-11 transition items-center rounded-full cursor-pointer",

        knob_class_style: "size-4 rounded-full transition transform bg-white",

        label_text_class_style: "",

        error_text_class_style: "text-xs text-red-500 mt-1 font bold",

        active_class_style: "bg-blue-500",

        inactive_class_style: "bg-gray-500"
    },
    text_content_class_style: {
        text_class_style: "text-xs font-bold text-gray-900 w-full wrap-break-word"
    },
    button_ui_class_style: {
        button_class_style:
            "w-[40px] h-[40px] flex items-center justify-center hover:shadow hover:bg-gray-300 rounded-full p-2 cursor-pointer hover:cursor-pointer",

        disabled_class_style: "",

        loading_class_style: "w-full h-full flex items-center justify-center",

        wrapper_class_style: "w-full h-full flex items-center justify-center",

        icon_class_style: "flex items-center justify-center w-full h-full",

        text_class_style: "",

        content_class_style: "w-full h-full flex items-center"
    }
};

const table_pagination_ui_class_styles: PaginationUIClassStylesInterface = {
    wrapper_class_style: "w-full flex flex-row items-center justify-center p-[5%] my-2",

    button_class_style: `flex p-1 h-10 px-4 flex items-center justify-center border border-gray-300 text-sm font-bold cursor-pointer gap-2 hover:transition-colors hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-900 hover:text-white`,

    active_page_class_style:
        "transition-colors bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 text-white",

    btn_icon_class_style: ButtonUIClassStyles.icon_class_style,

    disabled_class_style:
        "from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed",

    page_container_class_style: "w-auto max-w-5/12 flex items-center justify-center",

    prev_btn_class_style: "rounded-s-lg",

    next_btn_class_style: "rounded-e-lg"
};

const activity_cards_wrapper_class_style = "grid grid-cols-1 gap-3";

const activity_loading_wrapper_class_style =
    "rounded-md border border-gray-200 bg-white px-4 py-8 text-center text-sm font-semibold text-gray-600";

const activity_loading_icon_class_style = "mr-2 inline-block h-4 w-4 animate-spin";

const activity_empty_state_class_style =
    "rounded-md border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm font-semibold text-gray-500";

const activity_card_class_styles: ContentCardUIClassStylesInterface = {
    wrapper_class_style: "rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300",
    header_class_style: "mb-3",
    title_class_style: "flex items-start gap-2 text-sm font-black text-gray-900",
    title_icon_class_style: "mt-0.5 h-4 w-4 shrink-0 text-gray-600",
    title_text_class_style: "break-words",
    media_wrapper_class_style: "",
    media_class_style: "",
    media_description_class_style: "",
    body_class_style: "space-y-3",
    description_class_style: "text-xs font-semibold leading-6 text-gray-700 break-words",
    actions_class_style: "hidden",
    button_class_style: "",
    button_disabled_class_style: "",
    button_loading_class_style: "",
    button_icon_class_style: "",
    button_text_class_style: "",
    error_class_style: "text-xs font-semibold text-red-600"
};

const ListViewClassStyles: ListViewClassStylesInterface = {
    wrapper_class_style: "w-full px-[5%]",
    list_view_breadcrumb_class_styles,
    page_header_class_styles,
    filters_class_styles,
    filters_input_group_class_styles,
    filters_input_ui_class_styles,
    table_result_and_bulk_action_bar_class_styles,
    table_class_styles,
    table_cell_components_class_styles,
    table_pagination_ui_class_styles,
    activity_cards_wrapper_class_style,
    activity_loading_wrapper_class_style,
    activity_loading_icon_class_style,
    activity_empty_state_class_style,
    activity_card_class_styles
};

export default ListViewClassStyles;
