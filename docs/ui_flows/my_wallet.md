# My Wallets

The profile-avatar menu includes **My Wallets**, between Profile and Logout, when
`my_wallet_management_module.get_my_wallet_list` is granted. The same permission
protects `/my-wallets` (`MyWallets`). This personal page uses member-scoped endpoints,
not the administrator wallet or transaction services.

The page contains breadcrumbs, a currency-selectable wallet card with the member's
name and available balance, locked/pending balance summaries, Deposit and Withdrawal
buttons, and a paginated recent-transaction table across **all** wallets. Changing
currency only changes the balance overview. There is no third action.

Deposit and Withdrawal are disabled, with visible coming-soon copy, until their
separate flows are implemented. Visiting this page never creates a wallet or submits
a financial mutation. An assigned currency without a wallet displays an unavailable
balance and explanatory copy; it is not presented as a zero balance.

## APIs and permissions

| Endpoint                           | Permission suffix                | Behaviour                                                                |
| ---------------------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `GET /my-wallet/currencies/list`   | `get_my_wallet_currency_list`    | Load every assigned-currency page; select the app default when supplied. |
| `GET /my-wallet/wallets/list`      | `get_my_wallet_list`             | Load every member-wallet page and match by currency code.                |
| `GET /my-wallet/transactions/list` | `get_my_wallet_transaction_list` | Eight records per page, newest first; no currency filter.                |

All permission suffixes use `my_wallet_management_module`. Configured permission
constants cover the provided future API routes too, but no mutation flows are wired.
The frontend constants do not grant permissions; backend roles must include them.

Assigned-currency records wrap their currency in `currency`; wallet/transaction
amounts can be decimal strings. Shared formatting uses the currency symbol and
precision. Lookup requests use `preview_only=false` and page through all records.
API pages are zero-based; displayed transaction pages are one-based.

Wallets and transactions have separate loading, empty, permission, error and retry
states. Outdated or unmounted responses cannot replace current state. Session expiry
routes to `/logout`; failures also use shared application alerts. Transactions remain
available if the wallet overview fails.

The wallet surface and decorative chip use responsive CSS in the typed class-style
module, avoiding a raster image dependency. Inputs, buttons, breadcrumbs, table cells,
and pagination reuse toolkit components. No toolkit files are changed.

## Visual layout

The compact navy wallet card and balance details share one responsive white panel.
Deposit and Withdrawal sit below the balance details; transaction history remains
below the panel. Breadcrumbs use the shared module breadcrumb bar with Home and chevron icons. Action icons are fixed
at 16px and pagination icons at 12px, including their nested SVGs.

The application imports the Tailwind source through Vite in `src/main.ts`, so new
class-style utilities are generated in development and production without relying
on the separately generated `public/assets/css/output.css` file.

## Long text and balances

The closed currency selector and member name truncate with an ellipsis. Native title
tooltips retain the complete selected currency label and member name; currency option
labels remain complete in the native list. The chip sits beside the brand so the
available balance has the full card width.

Wallet amounts use grouped digits and the configured currency precision. Decimal
strings are passed directly to the international number formatter, preserving large
amounts beyond JavaScript's safe integer range. Amounts are never abbreviated to
K/M/B/T or truncated: longer values use smaller typography and can wrap between grouped digits when needed.
The balance text remains selectable.

## Deposit modal

Deposit is enabled for members with payment-options, create-intent, and transaction-view permissions. It opens the shared `DepositFlowUI` through `open_modal`, seeded with the selected wallet currency. Withdrawal remains unavailable.

Flow: currency/amount/required description → provider → embedded payment method → authoritative intent review. Inputs use exact decimal strings, currency precision validation, and grouping on blur. The API adapter uses `GET /my-wallet/currencies/:currency/payment-options?transaction_type=deposit&amount=...`, a fresh `my_wallet` CSRF token, and `POST /my-wallet/transactions/intent` with a stable `Idempotency-Key` and app reference. Edits use `PATCH /my-wallet/transactions/:public_id/intent` with `expected_intent_version`; reopening reads `GET /my-wallet/transactions/:public_id`. Logout responses route to `/logout`; request failures use shared status alerts and inline retry copy. Review does not initiate a payment.

Drafts are encrypted through the existing storage manager under `wallet_deposit_drafts`, scoped by API base URL and member. Scoped drafts are retained across logout; another member uses a different cache entry. The cache retains the public ID and submitted context on Back, modal close and reload. Ambiguous create failures retry with the same reference/payload. Future completion or explicit abandonment must clear the draft; simply closing the modal does not.

The reusable toolkit supports account provisioning before methods or after method selection, caching the returned account ID. The current My Wallet payment-options response does not expose `create_sub_account`/`create_dedicated_account`, and the admin My Wallet routes do not provide account resolution. The signed app identity API is not callable with an admin member token. Therefore Fibase does not infer provisioning requirements or send account-creation calls yet; that adapter needs a member-scoped endpoint and explicit safe provider requirement metadata.
