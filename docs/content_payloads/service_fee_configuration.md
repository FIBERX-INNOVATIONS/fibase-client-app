# Service Fee Configuration Content Payload

## Root Key

- `content_resource.service_fee_configuration_view_ui`

## Expected List Content

- Breadcrumb and list header content, including the permission-gated create button.
- Filters for search, status, currency, application, provider, identity, transaction type, configuration level,
  fee type, effective state, amount bounds, creator/updater, and date ranges.
- Table content for currency, transaction type, scope, fee, effective period, status, creation date, and actions.
- Action-menu content and API response messages.

## Expected Form Content

- Modal titles for create and edit flows.
- Currency, optional scope, transaction type, fee type, and effective-period fields.
- Optional application, provider, and identity searches expose a `No selection` option that clears the scope to `null`.
- Flat/percentage amount content and repeatable range-row content with add/remove controls.
- Validation response messages for required values, hierarchical scopes, decimal precision, percentage limits, dates,
  and contiguous ranges that cover every non-negative amount.

## Expected Profile Content

- Profile modal title and loading/empty states.
- Configuration identity, currency, transaction, level, fee, scope, lifecycle, and audit labels.
- Range-tier labels, including the localized open-ended maximum and empty-range text.

## Sample

See [service_fee_configuration_list_view_content_sample.json](./samples/service_fee_configuration_list_view_content_sample.json).
