# My Wallets content

Copy lives under `content_resource.my_wallet_view_ui`. See
[sample JSON](samples/my_wallet_view_content_sample.json) for the complete payload.

The resource supplies page heading, card branding, currency/balance labels, action
labels and coming-soon explanation, transaction headings, table labels, permission,
loading, empty and retry copy. `pagination_text` accepts `{page}`, `{pages}`, and `{total}`.
`pagination_buttons` supplies `prev_btn_text` and `next_btn_text`.

`api_responses` includes `my_wallet_load_failed_text` and
`my_wallet_transactions_load_failed_text`, merged by ContentManagerUtil like other modules.

The server `client/assets/app_content/en-GB.json` also includes:

- `page_meta.my_wallet_page` for the route title and description.
- `dashboard_layout_ui.top_bar_ui.member_menu_list` entry for `/my-wallets`.

The top-bar controller enforces the wallet-list permission and supplies the menu entry
with a content fallback when an older content payload is cached. Other member-menu
entries retain their existing ordering and behaviour.

`breadcrumb_list` uses the standard menu payload: Home with `home_svg_icon` and
`menu_link: "/dashboard"`, then My Wallets with `greater_than_caret_svg_icon`.
The current page has no link; the component separator is empty because the chevron
is supplied by the content payload.

## Deposit content

`my_wallet_view_ui.modals_ui.deposit_modal_ui` supplies the shared modal title/icon. `my_wallet_view_ui.deposit_flow` supplies field labels, step titles, navigation labels, empty states, precision/selection errors, loading/retry copy, persistence/provisioning errors, and review labels. `description_label_text` labels the required Fibase field; other hosts control requiredness independently. `review_note_text` explains the current review-only boundary. `provider_fee_label_text` labels provider schedules separately from the final total fees. Optional per-step subtitle keys refine the detail, provider, method and review descriptions. `coming_soon_text` now refers only to withdrawals. The sample JSON is the complete payload contract; the same keys are mirrored in the server's `client/assets/app_content/en-GB.json`.

All localized string values use `_text`; navigation URLs use `_link`, and image URLs use `_img`. Existing SVG resource identifiers retain `_icon`. These conventions apply to the wallet page and nested `deposit_flow` payload, including error and retry messages. API record fields and form values keep their existing names.

`deposit_flow.invalid_amount_input_text` is required and supports `{{currency_code}}` and `{{precision}}` placeholders for currency-specific amount validation.
