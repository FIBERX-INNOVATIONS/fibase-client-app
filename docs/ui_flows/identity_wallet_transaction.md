# Identity, Wallet, and Transaction UI Flow

## Purpose

This document defines the first admin read-only experience for identities, wallets, transactions,
receipts, and ledger entries. It refines the proposed screens against the existing Fibase client
patterns and the server contract in
`fibase-server-app/docs/admin_identity_wallet_transaction_api.md`.

The implementation should reuse the repository's existing controller/action-handler split,
content-managed copy, permission-aware sidebar, breadcrumb and page-header components, filter
panel, data table, pagination, tabs, modal host, content cards, status badges, and alert handling.
No create, edit, delete, status-toggle, or bulk mutation is in scope.

## Information Architecture

### Sidebar

Add two permission-gated, top-level items to
`content_resource.dashboard_layout_ui.side_bar_ui.nav_menu_list`:

| Label        | Route           | Visibility permission                     |
| ------------ | --------------- | ----------------------------------------- |
| Identities   | `/identities`   | `identity_module.get_identity_list`       |
| Transactions | `/transactions` | `transaction_module.get_transaction_list` |

Wallets are reached through an identity and do not need a sidebar item. Preserve the current
sidebar ordering; place these items near other operational records rather than inside Payment
Configuration.

### Routes

| Route                                     | Route name                 | View                                        | Route permission                                 | Open behavior |
| ----------------------------------------- | -------------------------- | ------------------------------------------- | ------------------------------------------------ | ------------- |
| `/identities`                             | `IdentityList`             | `views/identity/ListView.vue`               | `identity_module.get_identity_list`              | Same tab      |
| `/identities/:identity_public_id/wallets` | `IdentityWalletList`       | `views/identity_wallet/ListView.vue`        | `identity_module.get_identity_wallet_list`       | Same tab      |
| `/wallets/:wallet_id/ledger`              | `IdentityWalletLedgerList` | `views/identity_wallet_ledger/ListView.vue` | `wallet_module.get_wallet_ledger_list`           | New tab       |
| `/transactions`                           | `TransactionList`          | `views/transaction/ListView.vue`            | `transaction_module.get_transaction_list`        | Same tab      |
| `/transactions/:transaction_id/ledger`    | `TransactionLedgerList`    | `views/transaction/LedgerListView.vue`      | `transaction_module.get_transaction_ledger_list` | New tab       |

Use public IDs in generated URLs. Route parameters still accept numeric IDs because the server
does, but public IDs are safer for visible admin links.

## Shared UX Rules

1. API pagination is zero-based. Pagination controls display page `current_page + 1` and send
   `display_page - 1` to the API.
2. Default list requests use `page=0`, `limit=12`, `sort_by=created_at`,
   `sort_direction=DESC`, and `preview_only=true`. Detail requests use full projections.
3. Applied filters, page, limit, and sort belong in the URL query. This makes filtered pages
   reloadable, shareable, and suitable for opening in a new tab.
4. Omit empty query values instead of sending empty strings. Serialize booleans as `true` or
   `false` and date ranges as `YYYY-MM-DD,YYYY-MM-DD`.
5. Debounce free-text search, but apply select/date filters with the existing explicit **Apply
   Filters** button. Any filter change resets `page` to `0`.
6. Use a shared amount formatter driven by `currency.precision`, `currency.symbol`, and
   `currency.format`. Do not perform arithmetic on formatted values. Preserve the API value in
   tooltips where useful.
7. Dates are ISO-8601 values. Render in the admin's local timezone and show the exact ISO value in
   a tooltip. Use `-` for absent optional values.
8. Long public IDs and references should be copyable and visually truncated, with their complete
   value in a tooltip.
9. Status, direction, verification, active, and deleted values use the existing badge/status
   visual language. Do not communicate state by colour alone.
10. Each independent request has loading, empty, error, and retry states. A wallet-tab failure must
    not replace an already-loaded identity profile; the same applies to receipts in a transaction
    modal.
11. Stale requests should be cancelled or ignored when filters, pages, selected records, tabs, or
    routes change quickly.
12. `401`/session expiry follows the existing logout flow. `403` shows a permission message,
    `404` shows a record-not-found state, and other failures use the existing status alert plus an
    inline retry state.

## 1. Identity List View

### Page composition

1. Breadcrumb: **Home / Identities**.
2. Page header: **Identities** plus a short description. There is no create button.
3. Collapsible filters panel.
4. Result/selection bar, data table, pagination, and row action dropdown.

### API

`GET /api/identity/list`

### Filters

| UI filter      | Query parameter     | Control               | Notes                                                          |
| -------------- | ------------------- | --------------------- | -------------------------------------------------------------- |
| Search         | `search`            | Search input          | Searches identity and linked profile/account/contact values.   |
| Identity type  | `identity_type`     | Content-driven select | Values should come from backend/domain content when available. |
| Status         | `status`            | Content-driven select | Do not hard-code server enums in controller logic.             |
| Verified       | `is_verified`       | All/Yes/No select     | Omit for All.                                                  |
| Deleted        | `is_deleted`        | Active/Deleted select | Default `false` for the operational view.                      |
| Source app     | `source_app_id`     | Search/select         | Numeric or public ID.                                          |
| Registered app | `registered_app_id` | Search/select         | Numeric or public ID.                                          |
| Currency       | `currency_id`       | Search/select         | Identities with a wallet in the currency.                      |
| Has wallet     | `has_wallet`        | All/Yes/No select     | Omit for All.                                                  |
| Created date   | `date_range`        | Date-range input      | Inclusive whole days.                                          |

Keep common `page`, `limit`, `sort_by`, `sort_direction`, and `preview_only` parameters outside
the visual filter definition.

### Table

| Column       | Source/render                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| S/N + select | Existing serial/select cell. Serial uses page offset.                                                                 |
| Identity     | Primary profile display name when available, with `public_id` as secondary copyable text. Fall back to the public ID. |
| Type         | `identity_type` badge/text.                                                                                           |
| Source app   | `primary_source_app.name`; show prefix as secondary text and logo when present.                                       |
| Contact      | Preferred email/phone from `contacts` or `profile`; otherwise `-`.                                                    |
| Wallets      | Preview wallet count when supplied; otherwise show `-`, not a fabricated zero.                                        |
| Verified     | `is_verified` status indicator.                                                                                       |
| Status       | `status` badge; visually mark deleted records when `is_deleted=true`.                                                 |
| Created at   | `created_at`.                                                                                                         |
| Actions      | Dropdown menu trigger.                                                                                                |

The list projection may omit associations when `preview_only=true`; render missing associations
defensively.

### Actions

| Action  | Behavior                                                                | Permission                                 |
| ------- | ----------------------------------------------------------------------- | ------------------------------------------ |
| View    | Open the identity modal with the selected public ID and preview record. | `identity_module.get_identity`             |
| Wallets | Navigate to the selected identity's standalone wallet list.             | `identity_module.get_identity_wallet_list` |
| Select  | Toggle that row in the existing table selection model.                  | List permission                            |

Selection is intentionally future-facing. Display the selected count and allow clearing selected
rows, but do not show a bulk-action dropdown or imply that an operation is available.

## 2. Identity Details Modal

Open through the existing global modal host using the `slide_top` animation. Use a large responsive
modal so cards do not become cramped. The modal title should identify the selected identity without
depending on profile data being present.

### Tabs

| Tab     | Request                          | Load strategy     |
| ------- | -------------------------------- | ----------------- |
| Profile | `GET /api/identity/:identity_id` | Load immediately. |

### Profile tab

Present compact sections using the existing profile-value and status-value style:

- Header: display name/public ID, identity type, status, verified, and deleted badges.
- Identity: public ID, type, status, verification, deletion state.
- Primary source app: logo, name, prefix, public ID, active state.
- Profile: render known safe key/value fields; skip secrets and null-only rows.
- App accounts: cards showing app/account references and safe status fields.
- Contacts: cards or grouped values for type, value, verification, and preferred state.
- Wallet summary: `total_wallets` and `active_wallets`.
- Timeline: created and updated dates.

Because `profile`, `app_accounts`, and `contacts` are open record shapes, use an allow-list of
display-safe keys. Never render tokens, password values, secrets, credentials, raw authentication
metadata, or unknown nested blobs by default.

## Identity Wallet List Page

Route: `/identities/:identity_public_id/wallets`.

Open this page from the Identity list's **Wallets** row action. The page uses the shared list-view
controller and action-handler flow with breadcrumb, page header, filters, result bar, sortable data
table, row action menu, pagination, and URL-synchronised state.

Filters cover search, preview-backed currency selection, status, active state, deleted state, and
created date.

Each wallet card shows:

- Currency name, code, symbol, and optional icon.
- Wallet public ID with copy affordance.
- Status and active/deleted indicators.
- Available, locked, pending, and refunded balances.
- Total credit and total debit when returned by the full projection.
- Created/updated dates.
- **View Wallet Details** action.

The action is permission-gated with `wallet_module.get_wallet` and opens the wallet profile in the
shared dashboard modal without leaving the identity wallet list.

## 3. Wallet Details Modal

### Page composition

1. Shared modal header: **Wallet Details**.
2. Wallet identifier, currency, and status summary.
3. Wallet information, balances, lifetime totals, currency, owner, and timeline cards.

The modal receives the list preview record immediately and then loads the full wallet projection.

### Wallet summary API

`GET /api/wallet/:wallet_id`

Show identity public ID, currency, status, active state, available/locked/pending/refunded balances,
total credit/debit, and created/updated dates. When the linked identity is present and permitted,
offer a return link to `/identities?search=:identity_public_id`.

### Wallet ledger module API and filters

`GET /api/wallet/:wallet_id/ledger`

| UI filter     | Query parameter | Control               |
| ------------- | --------------- | --------------------- |
| Search        | `search`        | Search input          |
| Entry type    | `entry_type`    | Content-driven select |
| Direction     | `direction`     | Content-driven select |
| Balance field | `balance_field` | Content-driven select |
| Created date  | `date_range`    | Date range            |

### Wallet ledger table

| Column        | Source/render                                                                         |
| ------------- | ------------------------------------------------------------------------------------- |
| S/N           | Serial only; no row selection.                                                        |
| Created at    | `created_at`.                                                                         |
| Transaction   | `transaction.public_id`, copyable; link to `/transactions?search=...` when permitted. |
| Entry         | `entry_type` and `direction` badges.                                                  |
| Balance field | `balance_field`.                                                                      |
| Amount        | Currency-aware amount.                                                                |
| Before        | The matching `*_balance_before` value.                                                |
| After         | The matching `*_balance_after` value.                                                 |
| Created by    | Member, identity, or app summary in that priority order; otherwise `System`.          |
| Actions       | Permission-gated **View** action that opens the full list record in a modal.          |

There is no row selection control. The View modal shows the complete in-memory ledger record,
including description, reason, balance context, actor, transaction, and formatted metadata. It
does not make a separate detail request because the API does not expose a single-entry endpoint.

## 4. Transaction List View

### Page composition

1. Breadcrumb: **Home / Transactions**.
2. Page header: **Transactions** plus a short description. There is no create button.
3. Collapsible filters panel.
4. Active-filter chips for deep-linked filters such as wallet or identity ID.
5. Result/selection bar, table, pagination, and row action dropdown.

### API

`GET /api/transaction/list`

### Filters

| UI filter          | Query parameter            | Control                                              |
| ------------------ | -------------------------- | ---------------------------------------------------- |
| Search             | `search`                   | Search input                                         |
| Type               | `transaction_type`         | Content-driven select                                |
| Direction          | `direction`                | Content-driven select                                |
| Status             | `status`                   | Content-driven select                                |
| App                | `app_id`                   | Search/select                                        |
| Currency           | `currency_id`              | Search/select                                        |
| Provider           | `provider_id`              | Search/select                                        |
| Payment method     | `payment_method_id`        | Search/select                                        |
| Any wallet         | `wallet_id`                | ID/search input; source or destination.              |
| Source wallet      | `source_wallet_id`         | ID/search input                                      |
| Destination wallet | `destination_wallet_id`    | ID/search input                                      |
| Any identity       | `identity_id`              | ID/search input; initiating, source, or destination. |
| Initiated by       | `initiated_by_identity_id` | ID/search input                                      |
| Parent transaction | `parent_transaction_id`    | ID/search input                                      |
| Created date       | `date_range`               | Date range                                           |

The initial UI can place the most common filters—search, status, type, direction, wallet,
currency, and date—first and put the remaining filters in an **More filters** section. All API
filters remain supported and URL-addressable.

### Table

| Column       | Source/render                                                                            |
| ------------ | ---------------------------------------------------------------------------------------- |
| S/N + select | Existing serial/select cell.                                                             |
| Transaction  | `public_id`; show `app_reference` as secondary copyable text.                            |
| Type         | `transaction_type` and `direction`.                                                      |
| Parties      | Compact source → destination identity/wallet summary with external destination fallback. |
| Amount       | `amount` prominently; fee and net in secondary text.                                     |
| Currency     | `currency.code`, symbol/name tooltip.                                                    |
| Provider     | Provider/payment-method display values or `-`.                                           |
| Status       | Status badge and relevant lifecycle timestamp.                                           |
| Created at   | `created_at`.                                                                            |
| Actions      | Dropdown menu trigger.                                                                   |

### Actions

| Action | Behavior                                                       | Permission                                       |
| ------ | -------------------------------------------------------------- | ------------------------------------------------ |
| View   | Open transaction details modal.                                | `transaction_module.get_transaction`             |
| Ledger | Open `/transactions/:transaction_id/ledger` in a separate tab. | `transaction_module.get_transaction_ledger_list` |
| Select | Toggle row selection.                                          | List permission                                  |

As with identities, selection exposes only selected count and clear-selection behavior; there are
no bulk actions in this release.

## 5. Transaction Details Modal

Use the existing modal host and a large responsive body.

### Tabs

| Tab      | Request                                         | Load strategy                  |
| -------- | ----------------------------------------------- | ------------------------------ |
| Profile  | `GET /api/transaction/:transaction_id`          | Load immediately.              |
| Receipts | `GET /api/transaction/:transaction_id/receipts` | Lazy-load on first activation. |

### Profile tab

- Header: public ID, type, direction, status, and formatted amount.
- Amounts: amount, fee, net, and currency.
- References: app, provider, and external references with copy controls.
- Parties: initiating member/identity/app, source identity/wallet, destination identity/wallet or
  external destination.
- Processing: app, provider, payment method, and provider account safe summaries.
- Description: description and reason.
- Relationship: parent transaction and current receipt, with safe links where permissions allow.
- Timeline: created, updated, initiated, authorized, settled, failed, cancelled, reversed, and
  refunded timestamps. Hide empty lifecycle rows.

Provider instruction and external destination snapshots may contain sensitive or unstructured
data. Render only approved keys in the main profile. If raw snapshot access is later required,
place it behind an explicit disclosure component and redact secrets.

### Receipts tab

Filters: search, status, generated-by member, and created date. Show receipts as content cards with
pagination.

Each receipt card includes receipt number, public ID, status, generated date, generating member,
processor attempts, created/updated dates, and last error only when present. Show file metadata
when the API supplies it.

The **View Receipt** button is enabled only when a valid `receipt_url` exists. Open `http` or
`https` URLs in a new tab with `noopener,noreferrer`; do not render `javascript:`, `data:`, or other
schemes. Label missing files clearly instead of showing a dead button. The current API exposes a
rendered receipt URL, not a separate template endpoint, so the UI should say **View Receipt** unless
the backend later distinguishes a template URL.

## 6. Transaction Ledger Page

The standalone page copy lives under `content_resource.transaction_ledger_view_ui`; use
`docs/content_payloads/samples/transaction_ledger_list_view_content_sample.json` as its sample payload.

### Page composition

1. Breadcrumb: **Home / Transactions / {transaction_public_id} / Ledger**.
2. Page header with the transaction identifier and a **View Transaction** button when detail
   permission is available.
3. Optional compact transaction context card populated from the preview row passed through route
   state or a detail request. The ledger remains usable if that context request fails.
4. Filters, result bar, data table, and pagination.

### API

`GET /api/transaction/:transaction_id/ledger`

### Filters

| UI filter     | Query parameter | Control               |
| ------------- | --------------- | --------------------- |
| Search        | `search`        | Search input          |
| Entry type    | `entry_type`    | Content-driven select |
| Direction     | `direction`     | Content-driven select |
| Balance field | `balance_field` | Content-driven select |
| Wallet        | `wallet_id`     | ID/search input       |
| Identity      | `identity_id`   | Preview select-search |
| Currency      | `currency_id`   | Preview select-search |
| Created date  | `date_range`    | Date range            |

### Table

| Column        | Source/render                                   |
| ------------- | ----------------------------------------------- |
| S/N           | Serial only; no selection.                      |
| Created at    | `created_at`.                                   |
| Wallet        | `wallet.public_id`; currency as secondary text. |
| Identity      | `identity.public_id` and safe profile name.     |
| Entry         | `entry_type` plus `direction`.                  |
| Balance field | `balance_field`.                                |
| Amount        | Currency-aware amount.                          |
| Before        | Matching before-balance field.                  |
| After         | Matching after-balance field.                   |
| Description   | Description and reason.                         |
| Created by    | Member, identity, app, or `System`.             |

There is no action menu and no row selection.

## Suggested Client Structure

```txt
src/
  api_services/
    identity_api_service.ts
    wallet_api_service.ts
    transaction_api_service.ts
  views/
    identity/ListView.vue
    identity/ProfileView.vue
    identity/WalletListView.vue
    wallet/DetailsView.vue
    wallet/LedgerListView.vue
    transaction/ListView.vue
    transaction/ProfileView.vue
    transaction/ReceiptListView.vue
    transaction/LedgerListView.vue
  controllers/{identity,wallet,transaction}/...
  action_handlers/{identity,wallet,transaction}/...
  action_menus/
    identity_action_menu.ts
    transaction_action_menu.ts
  props_definition/{identity,wallet,transaction}/...
  class_styles/{identity,wallet,transaction}_...ts
```

Prefer small list/profile/card subviews over one controller that handles every request. Reuse base
list/profile behavior where the page fits it; extract a shared ledger row formatter because wallet
and transaction ledger records have the same balance-field semantics.

## Content Resource Roots

| Module               | Root key                                   | Sample                                                               |
| -------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| Identity             | `content_resource.identity_view_ui`        | `docs/content_payloads/samples/identity_view_content_sample.json`    |
| Identity Wallet List | `content_resource.identity_wallet_view_ui` | `docs/content_payloads/samples/identity_view_content_sample.json`    |
| Wallet               | `content_resource.wallet_view_ui`          | `docs/content_payloads/samples/wallet_view_content_sample.json`      |
| Transaction          | `content_resource.transaction_view_ui`     | `docs/content_payloads/samples/transaction_view_content_sample.json` |

The samples are copy/reference payloads. Their select options are illustrative; server-backed
domain values should replace them when authoritative enums or lookup endpoints are available.

## Acceptance Checklist

- Sidebar items and routes are permission-gated.
- Identity and transaction list filters survive reload and deep links.
- Identity View opens the Profile modal and exposes a separate Wallets row action.
- The standalone identity-wallet page preserves filters and pagination in its URL.
- Wallet table rows paginate, support balance sorting, and can later open complete wallet details.
- Wallet details include a ledger table and wallet-filtered transaction shortcut.
- Transaction View opens a two-tab Profile/Receipts modal.
- Receipt cards paginate and safely open valid receipt URLs.
- Transaction Ledger opens in a new tab and has no action menu or selection.
- Wallet and transaction ledger tables show the correct before/after value for `balance_field`.
- Identity/transaction Select actions toggle selection without exposing bulk operations.
- Missing preview associations and optional values do not break rendering.
- Loading, empty, permission, not-found, error, retry, and session-expiry states are covered.
- All copy comes from the content resource with sensible controller fallbacks.
- No unsafe profile/snapshot/metadata key or receipt URL scheme is rendered.
