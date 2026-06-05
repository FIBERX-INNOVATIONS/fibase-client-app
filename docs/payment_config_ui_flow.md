# Payment Config UI Flow

This document outlines the proposed front-end layout and interaction flow for the payment
configuration modules. It follows the current `registered_app` and `currency` module patterns:
list views as the main workspace, modal-based create/edit/profile/delete flows, content-manager
driven copy, permission-gated actions, and focused confirmation views for destructive/status
changes.

## Sidebar Navigation

Add a top-level sidebar group named `Payment Config`.

Recommended children:

| Label                     | Route                                       | Permission                                                                          |
| ------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Payment Methods           | `/payment-config/methods`                   | `payment_config_module.get_payment_method_list`                                     |
| Payment Providers         | `/payment-config/providers`                 | `payment_config_module.get_payment_provider_list`                                   |
| Provider Configs          | `/payment-config/provider-configs`          | `payment_config_module.get_payment_provider_config_list`                            |
| Provider Methods          | `/payment-config/provider-methods`          | `payment_config_module.get_payment_provider_method_list`                            |
| Currency Provider Methods | `/payment-config/currency-provider-methods` | `currency_payment_provider_method_module.get_currency_payment_provider_method_list` |

Keep the sidebar item structure content-driven through
`content_resource.dashboard_layout_ui.side_bar_ui.nav_menu_list`.

## Shared Page Flow

Each module should use the same page structure as Currency and Registered App:

1. Breadcrumbs.
2. Page header with title, description, and `Create` button when permitted.
3. Collapsible filters panel.
4. Data table with result count, pagination, and row action menu.
5. Modal body views for create/edit/profile/delete/confirmation flows.

Common row actions:

| Action        | Flow                                                                                   |
| ------------- | -------------------------------------------------------------------------------------- |
| View          | Open profile modal with the module profile view.                                       |
| Select        | Toggle row selection. Keep for consistency, even if no bulk actions exist.             |
| Edit          | Open add/edit form modal with existing record.                                         |
| Toggle Status | Use row toggle cell where the module has `update-status`.                              |
| Delete        | Open delete confirmation view using the base delete controller/action handler pattern. |

Common filters:

| Filter     | Type            | Notes                                |
| ---------- | --------------- | ------------------------------------ |
| Search     | `search`        | Goes to `search`.                    |
| Status     | `select`        | Only for modules with `is_active`.   |
| Created By | `select_search` | Uses member preview fetcher.         |
| Date Range | `date_range`    | Same shape as existing list modules. |

`preview_only` should mainly be used by select-search preview fetchers, not as a visible list-page
filter.

## Bulk Actions

Default recommendation: no bulk actions for these modules yet.

Reasoning:

- The backend contract does not define bulk create/update/delete/status endpoints.
- These records are configuration records with higher blast radius than normal catalog entries.
- The current currency bulk flow is specific to assigning/unassigning currencies to an app, not a
  general delete/status pattern.

Still keep row selection support because it is part of the current table behavior and may be useful
later. Hide or disable bulk action menu items unless a module-specific bulk endpoint is introduced.

## Module Plans

### 1. Payment Methods

Purpose: catalog of user-facing payment rails such as card, bank transfer, wallet, mobile money.

Route: `/payment-config/methods`

API service methods:

- `getPaymentMethodList`
- `getPaymentMethod`
- `createPaymentMethod`
- `updatePaymentMethod`
- `updatePaymentMethodStatus`
- `deletePaymentMethod`

List filters:

| Filter              | Type                                               |
| ------------------- | -------------------------------------------------- |
| Search              | `search`                                           |
| Status              | `select`                                           |
| Display Group       | `text` or `select` if backend exposes known groups |
| Supports Deposit    | `select` boolean                                   |
| Supports Withdrawal | `select` boolean                                   |
| Supports Refund     | `select` boolean                                   |
| Requires Redirect   | `select` boolean                                   |
| Created By          | `select_search`                                    |
| Date Range          | `date_range`                                       |

List columns:

| Column        | Render                                             |
| ------------- | -------------------------------------------------- |
| S/N + Select  | `DataTableSerialCellUI`                            |
| Method        | avatar/info cell using `icon_url`, `name`, `code`  |
| Display Group | text from `metadata.display_group`                 |
| Capabilities  | compact text/chips for deposit, withdrawal, refund |
| Sort Order    | text                                               |
| Status        | toggle cell                                        |
| Created By    | link cell                                          |
| Created At    | date text                                          |
| Actions       | action menu                                        |

Form fields:

| Field                        | Type                                            |
| ---------------------------- | ----------------------------------------------- |
| Code                         | text                                            |
| Name                         | text                                            |
| Description                  | textarea                                        |
| Icon URL                     | file/url input, following currency logo pattern |
| Sort Order                   | number                                          |
| Metadata Display Name        | text                                            |
| Metadata Display Description | textarea                                        |
| Display Group                | text/select                                     |
| Processing Time Text         | text                                            |
| Fee Label                    | text                                            |
| Supported Countries          | multi-select/search or tag input                |
| Supported Currencies         | multi-select/search using currency preview      |
| Requires Redirect            | checkbox                                        |
| Supports Deposit             | checkbox                                        |
| Supports Withdrawal          | checkbox                                        |
| Supports Refund              | checkbox                                        |
| Min Amount                   | number                                          |
| Max Amount                   | number                                          |

Profile view sections:

- Header: icon/logo, name, code, description.
- Method Information: code, sort order, display group, processing time, fee label.
- Capabilities: redirect/deposit/withdrawal/refund, min/max amount.
- Supported Scope: supported countries and currencies.
- Status: active state, created/updated dates.
- Created By / Updated By.

Bulk actions: none.

### 2. Payment Providers

Purpose: payment processors or integrations such as Stripe, Paystack, Flutterwave.

Route: `/payment-config/providers`

API service methods:

- `getPaymentProviderList`
- `getPaymentProvider`
- `createPaymentProvider`
- `updatePaymentProvider`
- `updatePaymentProviderStatus`
- `deletePaymentProvider`

List filters:

| Filter        | Type             |
| ------------- | ---------------- |
| Search        | `search`         |
| Status        | `select`         |
| Provider Type | `select` or text |
| Created By    | `select_search`  |
| Date Range    | `date_range`     |

List columns:

| Column        | Render                                            |
| ------------- | ------------------------------------------------- |
| S/N + Select  | `DataTableSerialCellUI`                           |
| Provider      | avatar/info cell using `logo_url`, `name`, `code` |
| Provider Type | text                                              |
| Website       | external link                                     |
| Status        | toggle cell                                       |
| Created By    | link cell                                         |
| Created At    | date text                                         |
| Actions       | action menu                                       |

Form fields:

| Field         | Type           |
| ------------- | -------------- |
| Code          | text           |
| Name          | text           |
| Description   | textarea       |
| Provider Type | select/text    |
| Logo URL      | file/url input |
| Website URL   | text/url       |

Profile view sections:

- Header: logo, name, code, website link, description.
- Provider Information: provider type, website, code.
- Status: active state, created/updated dates.
- Created By / Updated By.

Bulk actions: none.

### 3. Payment Provider Configs

Purpose: environment-specific credentials/settings for a provider account.

Route: `/payment-config/provider-configs`

API service methods:

- `getPaymentProviderConfigList`
- `getPaymentProviderConfig`
- `getPaymentProviderConfigCredentials`
- `createPaymentProviderConfig`
- `updatePaymentProviderConfig`
- `deletePaymentProviderConfig`

Decrypted credentials endpoint:

- `GET /api/payment-config/provider-configs/:config_id/credentials`
- Path param: `config_id`
- Required permission: `payment_provider_config_module.get_payment_provider_config_credentials`
- Response: `{ credentials: PaymentProviderConfigCredentials | null }`

```ts
interface PaymentProviderConfigCredentials {
    api_key?: string | null;
    secret_key?: string | null;
    public_key?: string | null;
    private_key?: string | null;
    client_id?: string | null;
    client_secret?: string | null;
    merchant_id?: string | null;
    account_id?: string | null;
    username?: string | null;
    password?: string | null;
    webhook_hash?: string | null;
    webhook_secret?: string | null;
    signing_secret?: string | null;
}
```

Fetch decrypted credentials only when a permitted member explicitly requests them. Do not include
them in list responses or render credential values in table columns.

This module has no `update-status` endpoint, so do not render a status toggle.

List filters:

| Filter            | Type                                   |
| ----------------- | -------------------------------------- |
| Search            | `search`                               |
| Provider          | `select_search` using provider preview |
| Environment       | `select` with `test`, `live`           |
| Account Reference | text                                   |
| Created By        | `select_search`                        |
| Date Range        | `date_range`                           |

List columns:

| Column              | Render                                   |
| ------------------- | ---------------------------------------- |
| S/N + Select        | `DataTableSerialCellUI`                  |
| Provider            | avatar/info cell from nested `provider`  |
| Environment         | text/badge                               |
| Account Reference   | text                                     |
| Settlement Currency | text from `settings.settlement_currency` |
| Default Currency    | text from `settings.default_currency`    |
| Created At          | date text                                |
| Actions             | action menu                              |

Form fields:

| Field             | Type                              |
| ----------------- | --------------------------------- |
| Provider          | select_search                     |
| Environment       | segmented/select (`test`, `live`) |
| Account Reference | text                              |
| Credentials       | structured grouped fields         |
| Settings          | structured grouped fields         |

Credential fields:

- API Key
- Secret Key
- Public Key
- Private Key
- Client ID
- Client Secret
- Merchant ID
- Account ID
- Username
- Password
- Webhook Hash
- Webhook Secret
- Signing Secret

Settings fields:

- Webhook URL
- Callback URL
- Redirect URL
- Success URL
- Failure URL
- Settlement Currency
- Default Currency
- Payout Schedule
- Capture Mode
- Timeout MS

UI note: sensitive credential values should be masked in profile view. In edit forms, prefer password
inputs or masked text inputs with a reveal control. Avoid rendering secret values in table columns.

Profile view sections:

- Header: provider name/logo, environment, account reference.
- Provider Details: provider code, provider type, website.
- Settings: webhook/callback/redirect/success/failure URLs, currencies, payout schedule, capture
  mode, timeout.
- Credentials: show key names and masked values only.
- Created By / Updated By.

Bulk actions: none.

### 4. Payment Provider Methods

Purpose: maps a payment provider to a payment method for a direction.

Route: `/payment-config/provider-methods`

API service methods:

- `getPaymentProviderMethodList`
- `getPaymentProviderMethod`
- `createPaymentProviderMethod`
- `updatePaymentProviderMethod`
- `updatePaymentProviderMethodStatus`
- `deletePaymentProviderMethod`

List filters:

| Filter         | Type                                                      |
| -------------- | --------------------------------------------------------- |
| Search         | `search`                                                  |
| Status         | `select`                                                  |
| Provider       | `select_search`                                           |
| Payment Method | `select_search`                                           |
| Direction      | `select` with `deposit`, `withdrawal`                     |
| Created By     | `select_search` if backend supports linked user filtering |
| Date Range     | `date_range`                                              |

List columns:

| Column               | Render                                        |
| -------------------- | --------------------------------------------- |
| S/N + Select         | `DataTableSerialCellUI`                       |
| Provider             | avatar/info cell from nested `provider`       |
| Payment Method       | avatar/info cell from nested `payment_method` |
| Direction            | text/badge                                    |
| Provider Method Code | text                                          |
| Limits               | text as `min_amount - max_amount`             |
| Status               | toggle cell                                   |
| Linked By            | link/member cell                              |
| Created At           | date text                                     |
| Actions              | action menu                                   |

Form fields:

| Field                | Type             |
| -------------------- | ---------------- |
| Provider             | select_search    |
| Payment Method       | select_search    |
| Direction            | select/segmented |
| Provider Method Code | text             |
| Min Amount           | number           |
| Max Amount           | number           |

Profile view sections:

- Header: provider + payment method summary.
- Link Details: direction, provider method code.
- Limits: min/max amount.
- Status: active state, created/updated dates.
- Provider Details.
- Payment Method Details.
- Linked By.

Bulk actions: none.

### 5. Currency Payment Provider Methods

Purpose: maps currencies to enabled provider methods and optional limits.

Route: `/payment-config/currency-provider-methods`

API service methods:

- `getCurrencyPaymentProviderMethodList`
- `getCurrencyPaymentProviderMethod`
- `createCurrencyPaymentProviderMethod`
- `updateCurrencyPaymentProviderMethod`
- `updateCurrencyPaymentProviderMethodStatus`
- `deleteCurrencyPaymentProviderMethod`

List filters:

| Filter         | Type                                   |
| -------------- | -------------------------------------- |
| Search         | `search`                               |
| Status         | `select`                               |
| Currency       | `select_search` using currency preview |
| Provider       | `select_search`                        |
| Payment Method | `select_search`                        |
| Direction      | `select` via nested provider method    |
| Date Range     | `date_range`                           |

List columns:

| Column         | Render                                            |
| -------------- | ------------------------------------------------- |
| S/N + Select   | `DataTableSerialCellUI`                           |
| Currency       | avatar/info cell from nested `currency`           |
| Provider       | text/avatar from `provider_method.provider`       |
| Payment Method | text/avatar from `provider_method.payment_method` |
| Direction      | text/badge from `provider_method.direction`       |
| Limits         | text as `min_amount - max_amount`                 |
| Status         | toggle cell                                       |
| Linked By      | link/member cell                                  |
| Created At     | date text                                         |
| Actions        | action menu                                       |

Form fields:

| Field           | Type                                                             |
| --------------- | ---------------------------------------------------------------- |
| Currency        | select_search                                                    |
| Provider Method | select_search, ideally labelled with provider, method, direction |
| Min Amount      | number                                                           |
| Max Amount      | number                                                           |

Profile view sections:

- Header: currency name/code/logo and provider-method summary.
- Currency Details: code, type, precision.
- Provider Method Details: provider, payment method, direction, provider method code.
- Limits: min/max amount.
- Status: active state, created/updated dates.
- Linked By.

Bulk actions: none for v1.

## Modal And View Patterns

Use the same modal event flow as Currency and Registered App:

- `handleHeaderBtnClicked` opens `AddEditFormView`.
- `handleViewActionMenuClicked` opens `ProfileView`.
- `handleEditActionMenuClicked` opens `AddEditFormView` with `record`.
- `handleDeleteActionMenuClicked` opens `DeleteView` with `record`, `record_id`, `content_key`,
  and success callback.
- `handleStatusToggleChange` directly calls the `update-status` API and updates the list record.

Delete views should use:

- `BaseDeleteViewController`
- `BaseDeleteViewActionHandler`
- `DecisionPromptUI`

Profile views should use:

- `BaseProfileViewController`
- `BaseProfileViewActionHandler`
- a module-specific `content_obj` with content keys and fallbacks.

Forms should use:

- `BaseFormViewController`
- `BaseFormActionHandler`
- CSRF token setup on mount.
- Content-driven input labels/placeholders/buttons.

## Suggested File Structure

For each module:

```txt
src/api_services/payment_config_api_service.ts
src/action_menus/<module>_action_menu.ts
src/action_handlers/<module>/list_view_action_handler.ts
src/action_handlers/<module>/form_view_action_handler.ts
src/action_handlers/<module>/profile_view_action_handler.ts
src/action_handlers/<module>/delete_view_action_handler.ts
src/controllers/<module>/list_view_controller.ts
src/controllers/<module>/form_view_controller.ts
src/controllers/<module>/profile_view_controller.ts
src/controllers/<module>/delete_view_controller.ts
src/props_definition/<module>/form_view_props.ts
src/props_definition/<module>/profile_view_props.ts
src/props_definition/<module>/delete_view_props.ts
src/views/<module>/ListView.vue
src/views/<module>/AddEditFormView.vue
src/views/<module>/ProfileView.vue
src/views/<module>/DeleteView.vue
```

Use module folder names:

- `payment_method`
- `payment_provider`
- `payment_provider_config`
- `payment_provider_method`
- `currency_payment_provider_method`

## Content Manager Shape

Each module should follow the existing content-resource naming style:

```txt
content_resource.<module>_view_ui.list_view_ui
content_resource.<module>_view_ui.form_view_ui
content_resource.<module>_view_ui.profile_view_ui
content_resource.<module>_view_ui.modals_ui.add_new_modal_ui
content_resource.<module>_view_ui.modals_ui.update_modal_ui
content_resource.<module>_view_ui.modals_ui.profile_details_modal_ui
content_resource.<module>_view_ui.modals_ui.delete_modal_ui
```

Minimum profile content shape:

```json
{
    "payment_method_view_ui": {
        "profile_view_ui": {
            "loading_text": "Loading payment method...",
            "no_description_text": "No description provided.",
            "empty_value_text": "-",
            "header": {
                "logo_alt_text": "Payment method icon",
                "code_label_text": "Code:"
            },
            "sections": {
                "information": {
                    "title_text": "Method Information"
                },
                "status": {
                    "title_text": "Status",
                    "active_status_text": "Active",
                    "inactive_status_text": "Inactive",
                    "created_label_text": "Created:",
                    "updated_label_text": "Updated:"
                },
                "created_by": {
                    "title_text": "Created By"
                },
                "updated_by": {
                    "title_text": "Updated By"
                }
            }
        }
    }
}
```

Repeat this pattern per module, replacing section names with the module-specific sections listed
above.

## Permission Naming Proposal

Use predictable permission names:

```txt
payment_config_module.get_payment_method_list
payment_config_module.get_payment_method
payment_config_module.create_payment_method
payment_config_module.update_payment_method
payment_config_module.update_payment_method_status
payment_config_module.delete_payment_method
```

Apply the same pattern to:

- `payment_provider`
- `payment_provider_config`
- `payment_provider_method`
- `currency_payment_provider_method`

Provider configs do not need an `update_status` permission unless the backend adds an endpoint.

## Implementation Order

Recommended order:

1. Shared payment config API service and response/form types.
2. Preview fetchers for providers, methods, provider methods, and currencies.
3. Payment Providers.
4. Payment Methods.
5. Provider Configs.
6. Provider Methods.
7. Currency Provider Methods.

This order gives the dependent select-search fields real data as the later modules are built.
