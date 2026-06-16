# Activity UI Flow

## Module

Read-only audit/activity log for platform events across members, registered apps, request IDs, entity types, IP addresses, and status.

## Route

| Route         | View                          | Permission                          |
| ------------- | ----------------------------- | ----------------------------------- |
| `/activities` | `views/activity/ListView.vue` | `activity_module.get_activity_list` |

## Views

- `ListView.vue`

## Flow

1. List view loads activity records with pagination and sorting.
2. Filters support search, registered app, member, request ID, entity type, IP address, status, and date range.
3. Module routes from other modules may prefill filters, for example member profile actions can route to `/activities?member_public_id=:public_id`.
4. The module is read-only and has no create, edit, delete, or status flows.

## API Interactions

| Service Method    | Endpoint         | Method |
| ----------------- | ---------------- | ------ |
| `getActivityList` | `/activity/list` | `GET`  |
