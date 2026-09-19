# App Webhook Delivery Content Payload

## Source and Runtime Keys

The live source is `fibase-server-app/client/assets/app_content/en-GB.json`. Its top-level keys are loaded under `content_resource` at runtime.

- `content_resource.page_meta.app_webhook_delivery_page`: page title and description.
- `content_resource.dashboard_layout_ui.side_bar_ui.nav_menu_list`: permission-aware `AppWebhookDeliveryListView` entry targeting `/app-webhook-deliveries`.
- `content_resource.app_webhook_delivery_view_ui`: module copy.
- `content_resource.api_responses.app_webhook_delivery_module_responses`: existing backend response messages, merged by `ContentManagerUtil` with general/auth/CSRF responses.

## Module Structure

| Key                            | Content                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `list_view_ui.breadcrumb_list` | Home and App Webhook Deliveries                                                               |
| `list_view_ui.header_section`  | Page heading, description, test and refresh buttons                                           |
| `list_view_ui.filters_section` | App ID, event type and status labels, placeholders and enum options; filter controls          |
| `list_view_ui.table`           | Headers, result count, loading/empty/error states, pagination, select/view/replay menu labels |
| `status_labels`                | Queued, delivering, delivered, retrying, failed and dead-letter labels                        |
| `profile_view_ui`              | Event information, delivery information, timeline labels and refresh/replay buttons           |
| `form_view_ui`                 | Test webhook form heading, app ID label/placeholder/helper, submission and queued copy        |
| `replay_view_ui`               | Replay confirmation, eligibility explanation, progress and queued copy                        |
| `modals_ui`                    | Test, profile and replay modal headings/icons                                                 |

The test event and destination endpoint are chosen by the backend. There are no editable payload, endpoint, create/edit or delete form fields. The profile labels cover only the safe API response.

Placeholder tokens follow existing conventions: `{{showing}}`, `{{total_records}}`, `{{current_page}}`, `{{total_pages}}`, `{{filter_name}}`, `{{attempts}}`, `{{max_attempts}}`, and `{{public_id}}`.

See [the content sample](./samples/app_webhook_delivery_view_content_sample.json). It contains only this module's metadata, navigation entry, view copy and existing response group; merge these sections rather than replacing the entire sidebar or content file.

The list, profile and replay content is consumed by the implemented views described in [the UI flow](../ui_flows/app_webhook_delivery.md). Test form copy is consumed by `TestFormView.vue`. `modals_ui.replay_delivery_modal_ui.content` supplies the title, interpolated message and confirm/cancel text expected by the shared decision prompt.

`list_view_ui.filters_section.app_id_filter` configures the registered-app searchable select: `label_text`, `placeholder_text` ("Search registered apps"), and `selected_text_prefix` ("Selected app"). Options come from `PreviewRecordFetcher.fetchRegisteredAppPreviewRecords`; the selected public ID is sent as `app_id`.

The header test button uses `list_view_ui.header_section.test_btn.btn_text`, and the modal uses `modals_ui.test_delivery_modal_ui`. Test-form fields and submit text use `form_view_ui.fieldset`; `app_id_field.placeholder_text` and `selected_text_prefix` describe the registered-app searchable select.

The redesigned profile uses `profile_view_ui.header_section.delivery_label_text` and `endpoint_label_text` for its summary and destination panel, plus `metrics.attempts_text` with `{{attempts}}` and `{{max_attempts}}`. Existing status labels, event/delivery/timestamp labels, and `no_error_text` supply the remaining copy.
