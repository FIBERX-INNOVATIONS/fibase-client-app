import { Component, defineComponent, h, PropType } from "vue";

import { EventBus } from "@/utils/global_event_bus_util";

import { GlobalEventTypes } from "@/types/global_events_type";

import { ComputedDefinitionType, WatchersType } from "@ui/version_3/types/base_type";

import {
    ProfileViewPropsInterface,
    ProfileViewStateDataInterface,
    ProfileViewComputedDataInterface,
    ProfileViewComponentsInterface,
    ProfileViewClassStylesInterface,
    ProfileViewContentKeysInterface,
    ProfileViewContentTextInterface,
    ProfileValueComponentOptionsInterface,
    StatusValueComponentOptionsInterface,
    MemberSummaryComponentOptionsInterface
} from "@/ui_types/profile_view_type";

import { CreatorUpdatorMemberinterface, getMemberFullName, MemberRecordInterface } from "@/types/api_service_type";

import BaseController from "@ui/version_3/base_classes/base_controller";

import ContentManagerUtil from "@ui/version_3/utils/content_manager_util";

import ProfileViewClassStyles from "@/class_styles/profile_view_class_styles";

import ImageRenderUI from "@ui/version_3/components/ImageRenderUI.vue";

import { getSVGIconValue, SVGIconKey } from "@ui/version_3/resources/svg_icon_resource";

import BaseProfileViewActionHandler from "@/action_handlers/base_classes/base_profile_view_action_handler";

class BaseProfileViewController<
    T extends object = Record<string, unknown>,
    Props extends ProfileViewPropsInterface<T> = ProfileViewPropsInterface<T>,
    State extends ProfileViewStateDataInterface<T> = ProfileViewStateDataInterface<T>,
    Computed extends ProfileViewComputedDataInterface = ProfileViewComputedDataInterface,
    Components extends ProfileViewComponentsInterface = ProfileViewComponentsInterface,
    Events extends GlobalEventTypes = GlobalEventTypes
> extends BaseController<Props, State, Computed, Components, Events> {
    public readonly content_key: string = "";

    public readonly class_styles: ProfileViewClassStylesInterface;

    public content_obj: ProfileViewContentTextInterface = {} as ProfileViewContentTextInterface;

    public action_handler: BaseProfileViewActionHandler<T, Props, State, Computed, Components, Events> | null = null;

    protected content_manager = ContentManagerUtil.getInstance();

    constructor(
        props: Props,
        component_name: string = "profile_view",
        default_class_styles: ProfileViewClassStylesInterface = ProfileViewClassStyles
    ) {
        super(component_name, props, EventBus as any);

        this.class_styles = {
            ...default_class_styles,
            ...(props.class_styles ?? {})
        } as ProfileViewClassStylesInterface;
    }

    // Method to set profile action handler and ensure it's properly typed
    protected setProfileActionHandler(
        action_handler: BaseProfileViewActionHandler<T, Props, State, Computed, Components, Events>
    ): void {
        this.action_handler = action_handler;
        this.setActionHandler(action_handler);
    }

    // Method to get the base content key for the profile view, which can be used to fetch content from the content manager
    protected getBaseContentKey(page_key: string = this.content_key): string {
        return `content_resource.${page_key}_view_ui.profile_view_ui`;
    }

    // Method to get the base content keys for the profile view, which can be overridden by child classes to provide specific content keys
    protected getBaseProfileViewContentKeys(): ProfileViewContentKeysInterface {
        const base_content_key = this.getBaseContentKey();

        return {
            loading_text: `${base_content_key}.loading_text`,
            no_description_text: `${base_content_key}.no_description_text`
        };
    }

    // Method to get the child content keys for the profile view, which can be overridden by child classes to provide specific content keys
    protected getChildProfileViewContentKeys(): Partial<ProfileViewContentKeysInterface> {
        return {};
    }

    // Method to get the final content keys for the profile view by merging the base content keys and the child content keys, with child content keys taking precedence over base content keys
    public getProfileViewContentKeys(): ProfileViewContentKeysInterface {
        const content_keys = this.getBaseProfileViewContentKeys();
        const child_content_keys = this.getChildProfileViewContentKeys();

        Object.entries(child_content_keys).forEach(([key, value]) => {
            if (value !== undefined) {
                content_keys[key] = value;
            }
        });

        return content_keys;
    }

    // Method to get the content text for the profile view based on the content keys and the profile record, with fallbacks for missing content keys or content values
    protected getProfileViewContentFallbacks(): Partial<ProfileViewContentTextInterface> {
        return {
            loading_text: "Loading...",
            no_description_text: ""
        };
    }

    // Method to get the content text for the profile view by fetching the content values from the content manager using the content keys and the profile record, with fallbacks for missing content keys or content values
    protected getProfileViewContentText(record: T = this.getProfileRecord()): ProfileViewContentTextInterface {
        const content_keys = this.getProfileViewContentKeys();
        const fallbacks = this.getProfileViewContentFallbacks();

        return Object.keys(content_keys).reduce((content_text, key) => {
            const content_key = content_keys[key];
            const fallback = fallbacks[key] ?? "";

            content_text[key] =
                this.content_manager.getWithRecord<string>(content_key, record as Record<string, unknown>, fallback) ??
                fallback;

            return content_text;
        }, {} as ProfileViewContentTextInterface);
    }

    // Method to get the profile record from the state or props, with a fallback to an empty object if the profile record is not available in either the state or props
    protected getProfileRecord(): T {
        return (this.state_refs.profile_record?.value ?? this.props.record ?? {}) as T;
    }

    // Method to build the shared profile label-and-value row component.
    protected getProfileValueComponent(options: ProfileValueComponentOptionsInterface = {}): Component {
        const class_styles = this.class_styles;
        const row_class_style = class_styles.info_row_class_style ?? class_styles.small_bold_value_text_class_style;
        const label_class_style =
            class_styles.small_bold_key_text_class_style ?? class_styles.small_bold_value_text_class_style;
        const value_class_style =
            options.value_class_style ??
            (class_styles.info_row_class_style ? class_styles.small_bold_value_text_class_style : undefined);

        return defineComponent({
            name: options.component_name ?? "ProfileValue",
            props: {
                icon: { type: String as PropType<SVGIconKey>, required: true },
                label: { type: String, required: true },
                value: { type: [String, Number], default: "" }
            },
            // Method to render the shared profile value row.
            setup(value_props) {
                return () => {
                    return h("p", { class: row_class_style }, [
                        h("span", {
                            class: class_styles.icon_class_style,
                            innerHTML: String(getSVGIconValue(value_props.icon) ?? "")
                        }),
                        h("span", { class: label_class_style }, value_props.label),
                        h("span", { class: value_class_style }, value_props.value)
                    ]);
                };
            }
        });
    }

    // Method to build the shared boolean status row component.
    protected getStatusValueComponent(options: StatusValueComponentOptionsInterface = {}): Component {
        const class_styles = this.class_styles;
        const row_class_style = class_styles.info_row_class_style ?? class_styles.small_bold_value_text_class_style;
        const label_class_style =
            class_styles.small_bold_key_text_class_style ?? class_styles.small_bold_value_text_class_style;
        const value_class_style = class_styles.info_row_class_style
            ? class_styles.small_bold_value_text_class_style
            : class_styles.status_text_class_style;
        const active_class_style = options.active_class_style ?? class_styles.active_status_class_style ?? "";
        const inactive_class_style = options.inactive_class_style ?? class_styles.inactive_status_class_style ?? "";
        const active_icon_class_style = options.active_icon_class_style ?? active_class_style;
        const inactive_icon_class_style =
            options.inactive_icon_class_style ?? class_styles.inactive_status_icon_class_style ?? inactive_class_style;

        return defineComponent({
            name: options.component_name ?? "StatusValue",
            props: {
                label: { type: String, required: true },
                active: { type: Boolean, required: true },
                value: { type: String, default: "" },
                trueText: { type: String, default: "" },
                falseText: { type: String, default: "" },
                activeIsDanger: { type: Boolean, default: false }
            },
            // Method to render the shared boolean status row.
            setup(status_props) {
                return () => {
                    const positive_class_style = status_props.activeIsDanger ? inactive_class_style : active_class_style;
                    const negative_class_style = status_props.activeIsDanger ? active_class_style : inactive_class_style;
                    const status_class_style = status_props.active ? positive_class_style : negative_class_style;
                    const positive_icon_class_style = status_props.activeIsDanger
                        ? inactive_icon_class_style
                        : active_icon_class_style;
                    const negative_icon_class_style = status_props.activeIsDanger
                        ? active_icon_class_style
                        : inactive_icon_class_style;
                    const status_icon_class_style = status_props.active ? positive_icon_class_style : negative_icon_class_style;
                    const status_text =
                        status_props.value || (status_props.active ? status_props.trueText : status_props.falseText);

                    return h("p", { class: row_class_style }, [
                        h("span", {
                            class: [class_styles.icon_class_style, status_icon_class_style],
                            innerHTML: String(
                                getSVGIconValue(status_props.active ? "check_circle_svg_icon" : "x_circile_svg_icon") ?? ""
                            )
                        }),
                        h("span", { class: label_class_style }, status_props.label),
                        h("span", { class: [value_class_style, status_class_style] }, status_text)
                    ]);
                };
            }
        });
    }

    // Method to build the shared creator or updater member summary component.
    protected getMemberSummaryComponent(options: MemberSummaryComponentOptionsInterface = {}): Component {
        const class_styles = this.class_styles;

        // Method to resolve the current profile empty-value text.
        const get_empty_value = (): string => {
            return this.content_obj.empty_value_text ?? "";
        };
        const member_name_tag = options.member_name_tag ?? "h3";
        const member_email_class_style = options.member_email_class_style ?? class_styles.description_class_style;

        return defineComponent({
            name: options.component_name ?? "MemberSummary",
            props: {
                title: { type: String, required: true },
                member: {
                    type: Object as PropType<CreatorUpdatorMemberinterface | MemberRecordInterface | null | undefined>,
                    default: null
                },
                photoUrl: { type: String, default: "" }
            },
            // Method to render the shared member summary.
            setup(member_props) {
                return () => {
                    const member = member_props.member;
                    const empty_value = get_empty_value();
                    const member_name = getMemberFullName(member ?? undefined) || empty_value;
                    const member_email = member?.email ?? empty_value;
                    let member_content: ReturnType<typeof h> | null = null;

                    if (member || options.always_show_member) {
                        member_content = h("div", { class: class_styles.member_summary_content_class_style }, [
                            h("img", {
                                src: member_props.photoUrl,
                                alt: member_name,
                                class: class_styles.member_avatar_img_class_style
                            }),
                            h("div", [
                                h(member_name_tag, { class: class_styles.member_name_class_style }, member_name),
                                h("p", { class: member_email_class_style }, member_email)
                            ])
                        ]);
                    } else if (options.show_empty_state) {
                        member_content = h("p", { class: class_styles.description_class_style }, empty_value);
                    }

                    return h("div", { class: class_styles.grid_class_style?.grid_wrapper_class_style }, [
                        h("h4", { class: class_styles.small_bold_underlined_text_class_style }, member_props.title),
                        member_content
                    ]);
                };
            }
        });
    }

    // Method to get the UI components for the profile view, which can be overridden by child classes to provide specific UI components
    protected getUIComponents(): Components {
        return {
            ImageRenderUI,
            ProfileValue: this.getProfileValueComponent(),
            StatusValue: this.getStatusValueComponent(),
            MemberSummary: this.getMemberSummaryComponent()
        } as unknown as Components;
    }

    // Method to get the UI state data for the profile view, which can be overridden by child classes to provide specific UI state data, but by default it initializes the profile record from props and sets the content text based on the profile record
    protected getUIStateData(): State {
        const profile_record = (this.props.record ?? {}) as T;

        this.content_obj = this.getProfileViewContentText(profile_record);

        return {
            is_loading: false,

            profile_record,

            content_keys: this.getProfileViewContentKeys()
        } as State;
    }

    // Method to get the UI computed data for the profile view, which can be overridden by child classes to provide specific UI computed data, but by default it returns an empty object as there are no computed properties defined at the base level
    protected getUIComputedData(): ComputedDefinitionType<Computed> {
        return {} as ComputedDefinitionType<Computed>;
    }

    // Method to handle the logic that should be executed when the profile view component is mounted, which can be overridden by child classes to provide specific logic, but by default it triggers the fetchRecord action handler to fetch the profile record data when the component is mounted
    protected async handleOnMountedLogic(): Promise<void> {
        await this.action_handler?.fetchRecord();
    }

    // Method to get the UI watchers for the profile view, which can be overridden by child classes to provide specific UI watchers, but by default it sets up a watcher on the record_id prop to trigger the fetchRecord action handler whenever the record_id prop changes, allowing the profile view to reactively fetch new profile data when a different record_id is passed in as a prop
    protected getUIWatchers(): WatchersType<Props, State> {
        return {
            record_id: this.action_handler?.fetchRecord
        };
    }
}

export default BaseProfileViewController;
