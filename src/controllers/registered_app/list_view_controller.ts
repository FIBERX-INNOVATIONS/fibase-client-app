
import RegisteredAppListViewActionHandler from "@/action_handlers/registered_app/list_view_action_handler";
import BaseListViewController from "@/controllers/base_classes/base_list_view_controller";
import { ListViewPropsInterface } from "@/ui_types/list_view_type";
import { SVGIcons } from "@ui/version_3/resources/svg_icon_resource";
import { ListFilterConfig } from "@ui/version_3/types/filter_config_type";
import InputTransformerUtil from "@ui/version_3/utils/input_transformer_util";

class RegisteredAppListViewController extends BaseListViewController {

    public action_handler: RegisteredAppListViewActionHandler;

    constructor(props: ListViewPropsInterface) {
        super(props);

        this.action_handler = new RegisteredAppListViewActionHandler(this);

        this.getComponentDefinition();
    }

    protected getPageContentKey(): string {
        return "registered_app";
    }

    protected getPageFilters(): ListFilterConfig[] {
        const page_key            = this.getPageContentKey();
        const filters_content_key = `content_resource.${page_key}_view_ui.list_view_ui.filters_section`
        return [
            {
                key: "search",
                type: "search",
                label_content_key: `${filters_content_key}.search_filter`,
                input_content_key: `${filters_content_key}.search_filter`,
                overides: {
                    content_props: {
                        search_icon_html_content: SVGIcons.search_svg_icon
                    },
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.search ?? "",
                }

            },
            {
                key: "is_active",
                type: "select",
                label_content_key: `${filters_content_key}.status_filter`,
                input_content_key: `${filters_content_key}.status_filter`,
                options_content_key: `${filters_content_key}.status_filter.option_list`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.is_active ?? ""
                }
            },
            {
                key: "created_by",
                type: "select_search",
                label_content_key: `${filters_content_key}.created_by_filter`,
                input_content_key: `${filters_content_key}.created_by_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.created_by ?? "",
                    content_props: {
                        caret_html_contewnt: SVGIcons.trinagular_caret_down_svg_icon
                    }
                }

            },
            {
                key: "key_version",
                type: "number",
                label_content_key: `${filters_content_key}.key_version_filter`,
                input_content_key: `${filters_content_key}.key_version_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: this.route.query?.key_version ?? "",
                }
            },
            {
                key: "date_range",
                type: "date_range",
                label_content_key: `${filters_content_key}.date_range_filter`,
                input_content_key: `${filters_content_key}.date_range_filter`,
                overides: {
                    action_props: this.action_handler.getFilterInputActionHandlersConfig(),
                    model_value: InputTransformerUtil.toJson(this.route.query?.date_range) ?? "",
                    content_props: {
                        seperator_icon_html: "arrow_long_down_svg_icon"
                    }
                }
            }
        ];
    }

    protected getChildUIComponents() {
        return { };
    }

    protected getChildUIStateData() {
        return { };
    }

    protected async handleChildMountedLogic(): Promise<void> {
       
    }

}

export default RegisteredAppListViewController;