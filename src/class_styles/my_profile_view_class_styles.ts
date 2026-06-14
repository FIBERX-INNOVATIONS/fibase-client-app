import input_group_class_style from "./input_group_ui_class_styles";
import input_ui_class_styles from "./input_ui_class_styles";
import ToasterUIClassStyles from "./toaster_ui_class_styles";
import ButtonUIClassStyles from "./button_ui_class_styles";

import { MyProfileViewClassStylesInterface } from "@/ui_types/my_profile_view_type";

const MyProfileViewClassStyles: MyProfileViewClassStylesInterface = {
    wrapper_class_style: "w-full",

    form_box_class_style: "",

    form_box_wrapper_class_style: "relative",

    header_text_class_style: "hidden",

    fieldset_class_style: "contents",

    input_group_class_style: {
        ...input_group_class_style,
        wrapper_class_style: "w-full my-0 flex flex-col space-y-2",
        label_text_class_style: "text-sm font-bold leading-none text-slate-950",
        group_input_wrapper_class_style: "w-full mt-1"
    },

    input_ui_class_styles: {
        ...input_ui_class_styles,
        input_class_style:
            "w-full min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-700 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed",
        file_input_class_style:
            "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-blue-900 file:text-white hover:file:cursor-pointer"
    },

    toaster_ui_class_styles: ToasterUIClassStyles,

    btn_class_styles: {
        ...ButtonUIClassStyles,
        wrapper_class_style: "w-full md:w-auto shrink-0 mt-4",
        button_class_style:
            "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#09233f] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#16446f] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto cursor-pointer",

        icon_class_style: "w-6 h-6 mr-2 flex items-center",
        text_class_style: "flex items-center justify-center"
    },

    spinner_class_style: "w-full flex items-center justify-center",

    modal_btn_class_styles: ButtonUIClassStyles,

    page_wrapper_class_style: "min-h-full w-full bg-[#eef4f8] px-4 py-6 md:px-6",
    content_wrapper_class_style: "mx-auto flex w-full max-w-6xl flex-col gap-5",
    alert_wrapper_class_style: "w-full",
    shell_class_style: "overflow-hidden",
    hero_class_style:
        "relative min-h-[210px] overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-sky-500 via-blue-600 to-blue-900",
    hero_content_class_style: "relative flex h-full min-h-[210px] flex-col justify-between gap-6 p-5 text-white md:p-8",
    hero_top_row_class_style: "flex items-start justify-between gap-4",
    hero_text_wrapper_class_style: "min-w-0",
    eyebrow_text_class_style: "text-xs font-bold uppercase tracking-[0.2em] text-sky-100",
    hero_title_class_style: "mt-2 text-3xl font-black leading-tight md:text-4xl",
    hero_description_class_style: "mt-2 max-w-2xl text-sm font-medium text-sky-50",
    member_id_box_class_style:
        "hidden rounded-md border border-blue-100 bg-white px-4 py-3 text-right text-blue-900 shadow-lg md:block",
    member_id_label_class_style: "text-xs font-bold uppercase tracking-[0.14em] text-blue-700",
    member_id_value_class_style: "mt-1 max-w-[180px] truncate text-sm font-black",
    badge_list_class_style: "flex flex-wrap gap-2",
    badge_class_style: "rounded-md border border-blue-100 bg-white px-3 py-1.5 text-xs font-bold text-blue-900",
    form_class_style: "relative",
    form_grid_class_style: "grid gap-6 py-5 md:grid-cols-[300px_1fr] md:py-8",
    side_panel_class_style: "space-y-5",
    avatar_card_class_style: "rounded-lg border border-slate-200 bg-white p-5 shadow-lg md:sticky",
    avatar_wrapper_class_style:
        "relative mx-auto h-32 w-32 rounded-full border-4 border-white bg-slate-100 shadow-lg ring-4 ring-sky-700/30",
    avatar_img_class_style: "h-full w-full rounded-full object-contain",
    avatar_name_class_style: "mt-4 text-center text-lg font-black text-slate-950",
    avatar_email_class_style: "mt-1 max-w-full truncate text-center text-sm font-semibold text-slate-500",
    upload_text_class_style: "mt-3 text-center text-xs font-bold text-sky-700",
    summary_list_class_style: "mt-6 space-y-3 border-t border-slate-200 pt-5",
    summary_item_class_style: "flex items-start justify-between gap-4 rounded-md bg-slate-50 px-3 py-2",
    summary_label_class_style: "text-xs font-bold uppercase tracking-wide text-slate-500",
    summary_value_class_style: "w-6/12 text-right text-sm font-black text-slate-900",
    main_panel_class_style: "space-y-6",
    panel_class_style: "rounded-lg border border-slate-200 bg-white p-5",
    panel_header_class_style: "flex flex-col gap-1 border-b border-slate-200 pb-4",
    panel_title_class_style: "text-xl font-black text-slate-950",
    panel_description_class_style: "text-sm font-medium text-slate-500",
    field_grid_class_style: "mt-5 grid gap-4 md:grid-cols-2",
    full_width_field_class_style: "md:col-span-2",
    action_bar_class_style:
        "sticky bottom-0 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white/95 px-5 py-4 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between md:px-8 mt-5",
    save_hint_class_style: "text-sm font-semibold text-slate-500"
};

export default MyProfileViewClassStyles;
