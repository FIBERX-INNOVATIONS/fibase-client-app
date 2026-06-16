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
