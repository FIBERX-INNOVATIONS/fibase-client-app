# Fibase Client App

Fibase Client App is the Vue 3 administration interface for managing members, registered applications, identities and wallets, access control, currencies, and payment configuration. It uses a controller/action-handler architecture on top of the shared `fi-ui-toolkit` so application modules remain consistent and content-driven.

## Technology

- Vue 3 and TypeScript
- Vite
- Vue Router
- Tailwind CSS
- Axios through the toolkit API client
- `fi-ui-toolkit` version 3 source components, builders, utilities, and base classes

## Repository Setup

The UI toolkit is a sibling source dependency rather than an installed package. Keep both repositories in this layout so the `@ui` alias resolves correctly:

```text
Projects/
├── fi-ui-toolkit/
└── fibase/
    └── fibase-client-app/
```

Install dependencies in both repositories:

```bash
cd /Users/ojooh/Documents/Projects/fi-ui-toolkit
npm install

cd /Users/ojooh/Documents/Projects/fibase/fibase-client-app
npm install
```

The default development configuration expects:

- API base URL: `http://localhost:2000/api`
- Content resource: `http://localhost:2000/assets/app_content/en-GB.json`
- Vite development server: `http://localhost:5172`

These values are defined in [`src/configs/api_client_config.ts`](./src/configs/api_client_config.ts), [`src/configs/content_urls_config.ts`](./src/configs/content_urls_config.ts), and [`vite.config.mjs`](./vite.config.mjs).

## Development

```bash
# Start the application
npm run dev

# Rebuild Tailwind output while editing styles
npm run devcss

# Run static checks
npm run lint
npm run typecheck
npm run format:check

# Create a production build
npm run build

# Preview the production build
npm run preview
```

`public/assets/css/output.css` and `dist/` are generated output and should not be edited manually.

## Architecture

The application keeps rendering, UI construction, interactions, and transport separate:

```text
Vue view
  └── controller
      ├── toolkit components and props builders
      ├── state, computed values, content, and class styles
      └── action handler
          ├── validation and CSRF handling
          ├── event bus, alerts, and routing
          └── API service
              └── toolkit BaseAPIService/API client
```

Important source directories:

| Directory                                                       | Responsibility                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`src/views`](./src/views)                                      | Thin Vue templates that bind controller definitions                            |
| [`src/controllers`](./src/controllers)                          | UI props, state, computed values, components, watchers, and lifecycle behavior |
| [`src/action_handlers`](./src/action_handlers)                  | User actions, mutations, modal flows, alerts, and state updates                |
| [`src/api_services`](./src/api_services)                        | Typed API endpoint calls through toolkit `BaseAPIService`                      |
| [`src/validators`](./src/validators)                            | Domain validation built on toolkit validation utilities                        |
| [`src/props_definition`](./src/props_definition)                | Vue prop contracts and defaults                                                |
| [`src/types`](./src/types) and [`src/ui_types`](./src/ui_types) | API, form, filter, event, and UI contracts                                     |
| [`src/action_menus`](./src/action_menus)                        | Permission-aware row and bulk actions                                          |
| [`src/class_styles`](./src/class_styles)                        | Shared component class-style configuration                                     |
| [`src/configs`](./src/configs)                                  | API, content, CSRF, storage, and asset configuration                           |
| [`src/utils`](./src/utils)                                      | Fibase-specific reusable utilities                                             |

Application copy is loaded from the content API and organized under `content_resource.<module>_view_ui`. The markdown files under `docs/content_payloads/` describe the expected keys and provide sample payloads.

## UI Toolkit

Before creating UI or common helper logic, search `fi-ui-toolkit/src/version_3`. The toolkit provides reusable components, data-table cells, props builders, class styles, icons, base controllers/action handlers, API utilities, transformers, and validators.

Generic reusable behavior should be added to the toolkit and consumed here through `@ui/version_3/...`. Fibase-specific shared display behavior belongs in [`DisplayFormatterUtil`](./src/utils/display_formatter_util.ts), while shared application validator behavior belongs in [`BaseValidator`](./src/validators/base_validator.ts).

Detailed coding and toolkit rules are in [`AGENTS.md`](./AGENTS.md). Contributors and coding agents should read it before making changes.

## Documentation

The [`documentation index`](./docs/README.md) explains how UI-flow notes, content-payload contracts, sample JSON, and legacy notes are organized.

| Module                                | UI flow                                                                                      | Content payload                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Authentication                        | [`auth.md`](./docs/ui_flows/auth.md)                                                         | [`auth.md`](./docs/content_payloads/auth.md)                                                         |
| Account activation                    | [`activation.md`](./docs/ui_flows/activation.md)                                             | [`activation.md`](./docs/content_payloads/activation.md)                                             |
| Dashboard and layout                  | [`dashboard_layout.md`](./docs/ui_flows/dashboard_layout.md)                                 | [`dashboard_layout.md`](./docs/content_payloads/dashboard_layout.md)                                 |
| Registered applications               | [`registered_app.md`](./docs/ui_flows/registered_app.md)                                     | [`registered_app.md`](./docs/content_payloads/registered_app.md)                                     |
| My profile                            | [`my_profile.md`](./docs/ui_flows/my_profile.md)                                             | [`my_profile.md`](./docs/content_payloads/my_profile.md)                                             |
| Member profiles                       | [`member_profile.md`](./docs/ui_flows/member_profile.md)                                     | [`member_profile.md`](./docs/content_payloads/member_profile.md)                                     |
| Activity                              | [`activity.md`](./docs/ui_flows/activity.md)                                                 | [`activity.md`](./docs/content_payloads/activity.md)                                                 |
| Access control                        | [`access_control.md`](./docs/ui_flows/access_control.md)                                     | [`access_control.md`](./docs/content_payloads/access_control.md)                                     |
| Currency                              | [`currency.md`](./docs/ui_flows/currency.md)                                                 | [`currency.md`](./docs/content_payloads/currency.md)                                                 |
| Payment methods                       | [`payment_method.md`](./docs/ui_flows/payment_method.md)                                     | [`payment_method.md`](./docs/content_payloads/payment_method.md)                                     |
| Payment providers                     | [`payment_provider.md`](./docs/ui_flows/payment_provider.md)                                 | [`payment_provider.md`](./docs/content_payloads/payment_provider.md)                                 |
| Provider configuration                | [`payment_provider_config.md`](./docs/ui_flows/payment_provider_config.md)                   | [`payment_provider_config.md`](./docs/content_payloads/payment_provider_config.md)                   |
| Provider methods                      | [`payment_provider_method.md`](./docs/ui_flows/payment_provider_method.md)                   | [`payment_provider_method.md`](./docs/content_payloads/payment_provider_method.md)                   |
| Currency provider methods             | [`currency_payment_provider_method.md`](./docs/ui_flows/currency_payment_provider_method.md) | [`currency_payment_provider_method.md`](./docs/content_payloads/currency_payment_provider_method.md) |
| Identities, wallets, and transactions | [`identity_wallet_transaction.md`](./docs/ui_flows/identity_wallet_transaction.md)           | Samples are linked from the [`docs index`](./docs/README.md)                                         |

The `docs/content_payloads/samples/` directory contains JSON examples suitable for adapting into application content resources. Files under `docs/_legacy/` are retained for historical context and are not the current implementation contract.

## Adding or Changing a Module

Use a similar existing module as the starting point and keep the full module surface aligned:

1. Add or update the route and permission metadata.
2. Build the thin view and matching controller/action handler pair.
3. Reuse toolkit components, props builders, utilities, and icons.
4. Add typed API service methods, records, payloads, and validators.
5. Add content keys and class-style configuration.
6. Update the module UI-flow and content-payload documentation.
7. Run lint, type-checking, formatting checks, and a production build.

See [`AGENTS.md`](./AGENTS.md) for the complete implementation checklist and coding conventions.
