# App Webhook Delivery UI Flow

The routed list, detail modal, test-delivery form, and replay confirmation use the existing list/profile/form/decision controller and action-handler architecture.

## Route and Views

The content sidebar targets `/app-webhook-deliveries` with view ID `AppWebhookDeliveryListView` and permission `app_webhook_delivery_management_module.get_delivery_list`.

- List: filter by registered app, event type, and delivery status; paginate and sort delivery history.
- Profile: inspect safe delivery details, attempts, response status, errors, and timestamps.
- Test form: use the header button to select a registered app and send an `app.webhook.test` event.
- Replay confirmation: replay a delivery only when its status is `failed` or `dead_letter`.

The backend has no create/edit/delete delivery endpoints. Test and replay are the supported mutations.

## API Contract

`AppWebhookDeliveryAPIService` extends toolkit `BaseAPIService`. The configured API client supplies the API base URL.

| Method            | HTTP | Endpoint                                    | Permission suffix   |
| ----------------- | ---- | ------------------------------------------- | ------------------- |
| `getDeliveryList` | GET  | `/app-webhook-delivery/list`                | `get_delivery_list` |
| `getDelivery`     | GET  | `/app-webhook-delivery/:delivery_id`        | `get_delivery`      |
| `testDelivery`    | POST | `/app-webhook-delivery/test`                | `test_delivery`     |
| `replayDelivery`  | POST | `/app-webhook-delivery/:delivery_id/replay` | `replay_delivery`   |

All permissions use the `app_webhook_delivery_management_module` prefix. All endpoints require full authentication.

The action handler passes `AppWebhookDeliveryAPIService.getDeliveryList` directly to the base list handler. The service checks list permission, normalizes sorting/page size, emits translated error alerts, and returns empty paginated data on errors so the shared list handler clears stale rows. It does not depend on a controller.

List params and safe response records are defined in `src/types/app_webhook_delivery_type.ts`. Mutation payloads are defined in `src/types/form_data_type.ts`.

- UI pagination is one-based; the service converts requests and responses to/from backend zero-based pagination.
- Default limit is 20; the backend permits 1–200 records per page.
- Sort fields: `created_at`, `updated_at`, `event_type`, `status`, `attempts`, `delivered_at`. The service converts `asc`/`desc` to `ASC`/`DESC`.
- Filters: `app_id` (numeric or public ID), `event_type` (backend event enum), `status` (backend status enum). Search and date-range filters are not supported by this endpoint.
- Record and replay endpoints accept a delivery **public ID**, encoded as a URL path segment.
- Dates are serialized strings, with nullability matching backend safe fields. App associations and transaction public IDs can be absent, especially in mutation responses.
- Record responses include `endpoint_url` through backend `safe_fields()`. The list projection still omits it, so the shared frontend field is optional. Webhook payloads, signing material, and raw response headers/body remain excluded.

## Mutation and Response Handling

The replay handler obtains a fresh token through `AuthAPIService.getFormCSRFToken(CSRF_TOKEN_FOR.APP_WEBHOOK_DELIVERY)` and include `csrf_token` in either mutation body. The backend maps `app_webhook_delivery` to its internal CSRF purpose and consumes the token. Test also requires `app_id`.

Both mutation endpoints return HTTP 202 with a delivery record. Queuing does not imply successful delivery; refresh history/details to inspect the resulting status. Automatic transport retries are disabled for these mutations.

Use the existing base form lifecycle, `MemberAuthenticatorUtil` permission checks, and `StatusAlertTriggerUtil` response handling. Preserve the shared `success`/`error`/`logout` envelope; route expired sessions to `/logout`. Replay eligibility must also be enforced by the backend because state may change after the list loads.

## List Actions and Permissions

- Route access, list requests, row selection and select-all require `get_delivery_list`.
- View requires `get_delivery` at both the menu and handler. It opens `ProfileView.vue`, which loads fresh safe details from the record endpoint.
- Replay requires `replay_delivery` at the menu and handler, and is offered only for `failed`/`dead_letter` records. `ReplayView.vue` uses the same base decision prompt as the existing member restore flow. Confirmation obtains CSRF and submits the replay; the backend revalidates current eligibility.
- Selection uses the shared serial-cell checkboxes. There is no backend select permission, so selection follows list access. No bulk replay operation is exposed.
- Successful replay refreshes the active filtered list. If the last row leaves a filtered page, pagination moves to the last available page.
- List failures clear stale results and show translated alerts. Record/replay failures show translated alerts; expired API or CSRF sessions route to `/logout`.
- Supported sorting is restricted to the backend allowlist. URL filters, pagination, and sorting use the shared list behaviour. Limit is capped at the backend maximum of 200.

All UI copy comes from the module content resource and shared API messages. Table cells, list styles, profile styles, dropdowns, and confirmation props reuse application/toolkit implementations.

Permission constants live in `src/configs/permissions_config.ts` under `APP_WEBHOOK_DELIVERY_PERMISSIONS`; sort fields remain in `src/configs/app_webhook_delivery_config.ts`.

The registered-app filter uses the toolkit `select_search` input and `PreviewRecordFetcher.fetchRegisteredAppPreviewRecords`, matching the existing identity/transaction filters. The preview fetcher queries the registered-app list with `preview_only: true`, maps records to searchable options, and uses the selected public ID for the URL/API `app_id` filter. Event type and status remain content-backed selects.

## Test Event Form

The header action uses `APP_WEBHOOK_DELIVERY_PERMISSIONS.TEST` (`app_webhook_delivery_management_module.test_delivery`). Both opening the modal and submitting its form recheck permission.

`TestFormView.vue` uses `BaseFormViewController` and `BaseFormActionHandler`, shared field/button/toaster props, and the existing form styles. The required registered-app searchable select uses `PreviewRecordFetcher.fetchRegisteredAppPreviewRecords`. The backend chooses the diagnostic event and configured destination; users do not supply arbitrary payloads or endpoint URLs.

Submission validates the selected app, obtains a fresh `APP_WEBHOOK_DELIVERY` CSRF token for each attempt, and calls `testDelivery`. Duplicate submissions are guarded. Token/API logout responses redirect to `/logout`; validation and API failures keep the form open with translated errors. A successful response closes the modal through the shared status alert and emits `on_new_record_created` with `re_fetch: true`, refreshing the active list and preserving its filters. A test may be hidden by the active event/status/app filters. Acceptance does not mean delivery succeeded.

## Delivery Status and Profile Presentation

`AppWebhookDeliveryStatusEnum` in `src/configs/app_webhook_delivery_config.ts` defines all six backend statuses. Replay eligibility in menus and handlers and profile badge colours reference this enum. `AppWebhookDeliveryStatusType` derives its wire values from the enum.

The profile loads fresh details and presents an event/status header, read-only destination endpoint, attempts/HTTP response/event-version summary cards, event references, delivery timeline, and a separate last-error panel. Long URLs, IDs and error messages wrap; backend values render as escaped text. A missing endpoint or timestamp shows the configured empty value. Profile styles are centralized in `src/class_styles/app_webhook_delivery_profile_view_class_styles.ts` and extend the shared profile styles.
