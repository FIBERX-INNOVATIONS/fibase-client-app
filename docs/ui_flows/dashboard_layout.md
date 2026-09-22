# Dashboard And Layout UI Flow

## Module

Provides the authenticated app shell, sidebar navigation, top bar, modal/event surface, loading overlay, and status alerts.

## Route

| Route        | View                      | Permission          |
| ------------ | ------------------------- | ------------------- |
| `/dashboard` | `views/DashboardView.vue` | Fully authenticated |

## Flow

1. Router guard requires full authentication for dashboard and all protected module routes.
2. Dashboard layout renders sidebar and top bar from content resources.
3. Sidebar menu entries are permission-gated by `menu_permission_text`.
4. Module list views emit `open_modal` events for create, edit, profile, delete, and secondary action flows.
5. The app root listens for loading, modal close, and alert status events.

## API Interactions

The layout itself does not own module data APIs. It depends on auth refresh/logout for session state and each module's service for page data.

## Central Permission Configuration

Frontend permission names are defined once in `src/configs/permissions_config.ts` as module-specific constant objects, including `REGISTERED_APP_PERMISSIONS`, `MEMBER_PROFILE_PERMISSIONS`, and `APP_WEBHOOK_DELIVERY_PERMISSIONS`. Routes, controllers, action menus, and handlers import these constants instead of repeating backend permission strings.

`LIST_VIEW_CREATE_PERMISSIONS` maps content/module keys to the existing create permissions used by the shared list header. A module without a configured create permission receives no default create button. Existing super-admin, ownership, system-role, deletion-state, and record-status checks remain in place alongside permission checks.

Sidebar permission values arrive from the backend content resource and remain serialized backend strings. `MemberAuthenticatorUtil` continues to evaluate those runtime values, as well as the central constants, against the authenticated member's permission list. Adding a frontend permission constant does not grant permission or replace backend enforcement.

The profile-avatar dropdown includes the permission-gated [My Wallets](my_wallet.md) page at `/my-wallets`, before Logout.
