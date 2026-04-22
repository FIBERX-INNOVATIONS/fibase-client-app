
import { FilePreviewUploadUIClassStylesInterface } from "@ui/version_3/ui_types/file_preview_upload_ui_type";

const FilePreviewUploadUIClassStyles: FilePreviewUploadUIClassStylesInterface = {

    wrapper_class_style: "w-full h-full flex flex-col items-center justify-center p-0",

    preview_container_class_style: "w-full h-auto md:max-h-[500px] max-h-[700px] overflow-y-auto overflow-x-hidden",

    file_item_wrapper_class_style: "relative p-2 w-full h-[200px] flex items-center justify-center rounded-md p-[3%]",

    remove_file_btn_content_class_style: "",

    remove_btn_wrapper_class_style: "absolute top-1 right-4 w-10 h-10 flex items-center p-1 justify-center rounded-full bg-gray-300 hover:shadow-lg cursor-pointer",

    remove_btn_loader_class_style: "w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin",

    remove_btn_class_style: "absolute top-1 right-1 text-red-500 cursor-pointer",

    add_more_wrapper_class_style: "border-dashed border-2 p-4 text-center cursor-pointer", 

    bottom_action_wrapper_class_style: "w-full border-t flex items-center justify-center gap-4 py-2 px-4",

    add_more_file_btn_content_class_style: "border-dashed border-2 p-4 text-center cursor-pointer",  
    
    multiple_file_container_class_style: "",

    single_file_container_class_style: "flex flex-col items-center justify-center gap-3 py-4",

};

export default FilePreviewUploadUIClassStyles;