# Fibase Client App Agent Guide

This file is the working agreement for coding agents and contributors in this repository. It applies to the whole repository unless a more specific `AGENTS.md` is added inside a subdirectory.

## Start Here

Before changing code:

1. Read this file and the relevant module documents in [`docs/`](./docs/README.md).
2. Inspect the closest existing module with the same view or interaction pattern.
3. Search the application base classes, utilities, validators, and the UI toolkit before writing new logic.
4. Keep the change inside the existing controller/action-handler/service architecture.
5. Preserve unrelated working-tree changes. Never rewrite or discard code you do not own.

## Toolkit-First Development

The application consumes the sibling UI toolkit source from:

```text
/Users/ojooh/Documents/Projects/fi-ui-toolkit/src/version_3
```

Use `@ui/version_3/...` imports. The `@ui` alias is configured by `vite.config.mjs`; do not replace it with long relative paths.

Before creating a component, builder, utility, validator helper, type, icon, or base class, search these toolkit directories:

- `components/` and `components/DataTableCellComponents/`
- `props_builder/`
- `base_classes/`
- `controllers/` and `action_handlers/`
- `utils/`
- `types/` and `ui_types/`
- `resources/svg_icon_resource`
- `class_styles/`

Common toolkit primitives include `ButtonUI`, `InputGroupUI`, `DataTableUI`, `ContentCardUI`, `ModalUI`, `DecisionPromptUI`, `FiltersPanelUI`, `DropdownMenuUI`, `PaginationUI`, `StatusAlertUI`, `TabsUI`, and their matching props builders.

Follow this decision order:

1. Reuse an existing toolkit component or utility unchanged.
2. Configure it through its props builder, content keys, class styles, slots, and action props.
3. Reuse or extend an application base controller/action handler when the behavior is application-specific but shared by several modules.
4. If the missing behavior is generic and useful across applications, implement it in `fi-ui-toolkit/src/version_3`, then consume it here through `@ui`.
5. Create application-local code only when the behavior is genuinely Fibase-specific.

Do not create a local copy of toolkit logic. In particular, use:

- `InputTransformerUtil` for primitive input/date/number transformations.
- `InputValidatorUtil` for common input validation.
- `ContentManagerUtil` for content-resource lookups and API response messages.
- `RenderHtmlUtil` for shared HTML rendering behavior.
- `BaseAPIService`/`APIClient` for API transport.
- `DisplayFormatterUtil` for Fibase display labels, dates, amounts, booleans, and HTML escaping.
- `BaseValidator` for shared application-validator behavior.

When changing the sibling toolkit, validate both repositories and clearly report the toolkit files changed. Never edit toolkit `node_modules`, generated output, or a copied artifact in this repository.

## Application Architecture

Keep responsibilities separated:

- `views/`: thin Vue templates. Instantiate the controller, call `getComponentDefinition()`, and bind returned refs/components. Do not place API calls or substantial business logic here.
- `controllers/`: construct UI props, content keys, class styles, components, state, computed values, watchers, and lifecycle behavior.
- `action_handlers/`: handle user interactions, form submission, modal events, mutations, alerts, routing, and state updates.
- `api_services/`: define typed endpoint calls through toolkit `BaseAPIService`.
- `validators/`: validate and sanitize form payloads. Extend `BaseValidator`.
- `props_definition/`: define Vue prop contracts and defaults.
- `ui_types/` and `types/`: hold UI contracts, API records, payloads, filters, and events.
- `action_menus/`: construct permission-aware record and bulk-action menus.
- `class_styles/`: centralize reusable class-style objects.
- `configs/`: centralize URLs, CSRF purposes, storage schemas, image fallbacks, and other configuration.
- `utils/`: hold reusable Fibase-specific helpers only.

Prefer the existing base classes:

- `BaseListViewController` and `BaseListViewActionHandler`
- `BaseFormViewController` and `BaseFormActionHandler`
- `BaseProfileViewController` and `BaseProfileViewActionHandler`
- `BaseDeleteViewController` and `BaseDeleteViewActionHandler`

If several subclasses repeat the same method, move it into their nearest base class. If unrelated classes repeat stateless logic, move it into an appropriate static utility. Do not add a helper that merely renames an existing toolkit or application helper.

## Coding Conventions

### Naming

- Variables, parameters, object fields, class fields, and Vue refs use `lower_snake_case`.
- Boolean names should normally start with `is_`, `has_`, `can_`, or `should_`.
- Classes, Vue components, interfaces, and type aliases use `PascalCase`.
- Interfaces normally end in `Interface`; reusable type aliases normally end in `Type` when that improves clarity.
- Constants use `UPPER_SNAKE_CASE`.
- Existing class method names use `camelCase`; follow the surrounding public API and do not introduce a second naming style.
- TypeScript filenames use `lower_snake_case.ts`. Vue view/component filenames use `PascalCase.vue`.
- API fields, form fields, filter keys, route payload keys, and content-resource keys use `lower_snake_case`.

### Methods and comments

Every new or modified class method or named function must have a short comment immediately above it beginning with `// Method to ...`. Describe the intent, not the implementation.

```ts
// Method to format the member status label.
private formatMemberStatus(status_value?: string | null): string {
    return DisplayFormatterUtil.formatLabel(status_value);
}
```

Add the same style of comment above constructors when their initialization responsibility is not obvious. Keep comments short and current. Do not retain comments that describe removed behavior.

### Control flow

All `if`, `else if`, and `else` blocks must use opening and closing braces, including single-line branches.

```ts
if (!record_id) {
    return null;
} else if (!can_update) {
    return current_record;
}
```

All arrow functions must use braces. Use an explicit `return` when returning a value.

```ts
const active_records = records.filter((record) => {
    return record.is_active;
});
```

Do not add expression-bodied arrows such as `(record) => record.id`.

### TypeScript and formatting

- Keep TypeScript strict and use the existing interfaces rather than weakening types with `any`.
- Use `unknown` for caught errors and narrow values before use.
- Prefer explicit return types on class methods and exported functions.
- Use optional chaining and nullish coalescing where they preserve valid falsey values.
- Import application code through `@/...` and toolkit code through `@ui/version_3/...`.
- Use `import type` when an import is type-only and the surrounding file follows that pattern.
- Follow `.prettierrc.json`: four spaces, double quotes, semicolons, no trailing commas, and a 128-character print width.
- Do not hand-edit generated files such as `dist/` or `public/assets/css/output.css`.

## UI and Content Rules

- Keep Vue views declarative and small. Bind toolkit/application components returned by controllers instead of importing a second implementation into the view.
- Build component props with the matching toolkit props builder where one exists.
- Use toolkit data-table cell components instead of embedding repeated table-cell markup.
- Reuse toolkit SVG icon keys/resources; do not paste standalone SVG markup or add an icon library for one icon.
- Put shared styles in `class_styles/` and pass them through component props. Avoid scattered duplicate Tailwind class strings.
- Treat `src/class_styles/` as the only source of truth for CSS/Tailwind class strings. Do not hardcode `class="..."`, dynamic class literals, table-width utilities, render-function classes, or HTML-template classes in Vue, controllers, handlers, or utilities.
- Add or extend a typed class-style object for every new visual rule, then expose it through the owning controller or component props.
- Do not hard-code CSS or Tailwind class strings in Vue files. Define them in `src/class_styles/` and expose them through
  the relevant controller, reusing an existing class-style module when suitable or creating a dedicated one when needed.
- User-facing copy belongs in the content resource under `content_resource.<module>_view_ui`. Hardcoded text is only a fallback.
- When adding or changing content keys, update the matching file under `docs/content_payloads/` and its sample JSON when applicable.
- When changing a route, modal sequence, permission, or API interaction, update the matching file under `docs/ui_flows/`.
- Keep permission checks in `MemberAuthenticatorUtil` and use the existing module/action permission names.
- Use the shared event bus and typed events for cross-component modal/layout communication.

## Forms, Validation, and API Calls

- Use `BaseFormActionHandler` for form state, field validation, CSRF lifecycle, submission readiness, and input actions.
- Use `InputValidatorUtil` before adding regex or primitive validation logic. Put reusable Fibase validation behavior in `BaseValidator`; keep domain rules in the module validator.
- Use `InputTransformerUtil` and `DisplayFormatterUtil` before adding format/normalize methods.
- Mutating requests must follow the existing CSRF-token flow and use the correct value from `CSRF_TOKEN_FOR`.
- API services must extend toolkit `BaseAPIService` and call `queryAPI`; do not call `axios` or `fetch` directly from views, controllers, or action handlers.
- Keep API request/response types in `types/` and form payload types in `types/form_data_type.ts`.
- Handle `success`, `error`, and `logout` responses consistently. Route expired sessions to `/logout` and use `StatusAlertTriggerUtil` for application alerts.
- Do not log secrets, CSRF tokens, access tokens, challenge tokens, credentials, or private keys.

## Module Change Checklist

For a new module or substantial view, check whether it needs each of the following:

- Route and permission metadata in `src/router.ts`
- View component
- Controller extending the correct application base controller
- Action handler extending the matching base action handler
- Typed API service and record/payload interfaces
- Validator and form props definition
- Action menu with permission checks
- Content keys and fallback text
- Class styles
- UI-flow documentation
- Content-payload documentation and sample JSON

## Validation Before Handoff

Run checks in proportion to the change:

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

At minimum, lint all source changes and build after architectural, routing, toolkit, or component changes. If a check fails because of an unrelated pre-existing issue, report the exact file and error; do not hide it by weakening types or disabling lint rules.

Before finishing:

- Search again for an existing toolkit/application abstraction that can replace new duplicated logic.
- Confirm every changed method has its `// Method to ...` comment.
- Confirm variable names are `lower_snake_case`.
- Confirm every conditional and arrow function uses braces.
- Confirm documentation and content samples still match the implementation.
- Review the diff and preserve unrelated user changes.
